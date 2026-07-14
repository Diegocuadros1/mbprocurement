import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { requireProfile } from "@/lib/auth";
import { companyLogoUrl } from "./logo";
import type { PwVendor, PwProduct, PwCartLine, PwOrder, PwInventoryRow, PwDocumentRow, PwCatOverride } from "./types";

/** Cookie that remembers which client account an admin is currently viewing. */
export const ACTING_COOKIE = "pw_acting_company";

export type PortalContext = {
  userId: string;
  companyId: string | null; // the account the portal is CURRENTLY operating on
  ownCompanyId: string | null; // the admin's own company (if any)
  isPwAdmin: boolean; // ProcureWide operator (document templates)
  isAdmin: boolean; // may manage/switch client accounts (== master admin)
  isMasterAdmin: boolean; // app_admin — the only role that manages accounts
  actingCompanyId: string | null; // set when an admin is viewing someone else's account
  account: { name: string; initials: string; plan: string; quarter: string; logoUrl: string | null };
};

/**
 * Resolve who the caller is and WHICH account the portal should act on.
 *
 * A normal member always acts on their own company. An admin may "enter" any
 * client account — we remember that choice in a cookie, and from then on every
 * screen and every mutation is scoped to that account (RLS already trusts
 * app_admin across companies, so this is a scoping choice, not a privilege one).
 */
export async function resolvePortalIdentity() {
  const { user, profile } = await requireProfile("/auth");
  const supabase = await createClient();

  const { data: me } = await supabase.from("profiles").select("is_pw_admin").eq("id", user.id).maybeSingle();
  const isPwAdmin = !!me?.is_pw_admin;
  const role = (profile?.role as string) ?? "";
  // "Master admin" = app_admin. Only they manage client accounts / add users /
  // switch between accounts. (pw_admin is a separate, narrower operator flag
  // for the document master templates.)
  const isMasterAdmin = role === "app_admin";
  const isAdmin = isMasterAdmin;
  const ownCompanyId = (profile?.company_id as string | null) ?? null;

  let actingCompanyId: string | null = null;
  if (isAdmin) {
    const jar = await cookies();
    const picked = jar.get(ACTING_COOKIE)?.value || null;
    if (picked) {
      const { data } = await supabase.from("companies").select("id").eq("id", picked).maybeSingle();
      if (data) actingCompanyId = picked; // ignore a stale/deleted account
    }
  }

  return {
    supabase,
    userId: user.id,
    isPwAdmin,
    isAdmin,
    isMasterAdmin,
    ownCompanyId,
    actingCompanyId,
    companyId: actingCompanyId ?? ownCompanyId,
  };
}

function quarterLabel(d = new Date()): string {
  return `Q${Math.floor(d.getMonth() / 3) + 1} ${d.getFullYear()}`;
}
function initialsOf(name: string): string {
  return (name || "—")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");
}

/** Auth gate + company/account context for the portal shell and screens. */
export async function getPortalContext(): Promise<PortalContext> {
  const id = await resolvePortalIdentity();

  let name = id.isAdmin && !id.companyId ? "No account selected" : "Your lab";
  let plan = "Growth";
  if (id.companyId) {
    const { data } = await id.supabase.from("companies").select("name").eq("id", id.companyId).single();
    if (data?.name) name = data.name;
    plan = "Lab Support";
  }

  return {
    userId: id.userId,
    companyId: id.companyId,
    ownCompanyId: id.ownCompanyId,
    isPwAdmin: id.isPwAdmin,
    isAdmin: id.isAdmin,
    isMasterAdmin: id.isMasterAdmin,
    actingCompanyId: id.actingCompanyId,
    account: { name, initials: initialsOf(name), plan, quarter: quarterLabel(), logoUrl: companyLogoUrl(id.companyId) },
  };
}

export type PwAccount = {
  id: string;
  name: string;
  contact_email: string | null;
  address: string | null;
  delivery_instructions: string | null;
  allowed_domains: string[] | null;
  logoUrl: string | null;
  members: number;
  orders: number;
  inventory: number;
  cart: number;
  spend: number;
};

export type PwAccountMember = { id: string; email: string; username: string | null; role: string };

/** Members of every account (email lives in auth, so use the admin client). Master admin only. */
export async function fetchAccountMembers(): Promise<Record<string, PwAccountMember[]>> {
  const id = await resolvePortalIdentity();
  if (!id.isMasterAdmin) return {};
  const { supabaseAdmin } = await import("@/lib/supabase/admin");

  const [{ data: profs }, { data: users }] = await Promise.all([
    supabaseAdmin.from("profiles").select("id, company_id, username, role"),
    supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 }),
  ]);
  const emailById: Record<string, string> = {};
  (users?.users || []).forEach((u) => (emailById[u.id] = u.email || ""));

  const out: Record<string, PwAccountMember[]> = {};
  (profs || []).forEach((p) => {
    if (!p.company_id) return;
    (out[p.company_id] = out[p.company_id] || []).push({
      id: p.id,
      email: emailById[p.id] || "",
      username: p.username,
      role: p.role,
    });
  });
  return out;
}

/** Every client account + live stats. Master admin only. */
export async function fetchAccounts(): Promise<PwAccount[]> {
  const id = await resolvePortalIdentity();
  if (!id.isMasterAdmin) return [];
  const sb = id.supabase;

  const [{ data: comps }, { data: profs }, { data: orders }, { data: inv }, { data: cart }, { data: spend }] =
    await Promise.all([
      sb.from("companies").select("id, name, contact_email, address, delivery_instructions, allowed_domains").order("name"),
      sb.from("profiles").select("company_id"),
      sb.from("pw_orders").select("company_id, total"),
      sb.from("pw_inventory").select("company_id"),
      sb.from("pw_cart").select("company_id"),
      sb.from("pw_vendor_spend").select("company_id, qtd_spend"),
    ]);

  const count = (rows: { company_id: string | null }[] | null, cid: string) =>
    (rows || []).filter((r) => r.company_id === cid).length;

  return (comps || []).map((c) => ({
    ...c,
    logoUrl: companyLogoUrl(c.id),
    members: count(profs, c.id),
    orders: count(orders, c.id),
    inventory: count(inv, c.id),
    cart: count(cart, c.id),
    spend: (spend || []).filter((s) => s.company_id === c.id).reduce((a, s) => a + Number(s.qtd_spend || 0), 0),
  })) as PwAccount[];
}

export async function fetchVendors(): Promise<Record<string, PwVendor>> {
  const supabase = await createClient();
  const { data } = await supabase.from("pw_vendors").select("*");
  const map: Record<string, PwVendor> = {};
  (data || []).forEach((v) => (map[v.key] = v as PwVendor));
  return map;
}

const normProduct = (p: Record<string, unknown>): PwProduct =>
  ({ ...p, price: Number(p.price), list: Number(p.list), badges: (p.badges as string[]) || [] }) as PwProduct;

/** Global, officialized catalog (the shared parameters) — for browsing. */
export async function fetchCatalog(): Promise<PwProduct[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("pw_products")
    .select("*")
    .eq("active", true)
    .is("company_id", null)
    .eq("pending", false)
    .order("category")
    .order("name");
  return (data || []).map(normProduct);
}

/** A company's own custom (pending, non-catalog) item requests. */
export async function fetchCustomItems(companyId: string | null): Promise<PwProduct[]> {
  if (!companyId) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("pw_products")
    .select("*")
    .eq("company_id", companyId)
    .order("requested_at", { ascending: false });
  return (data || []).map(normProduct);
}

/** Resolve ANY sku (global catalog OR the company's custom items) → product. */
export async function productMap(companyId?: string | null): Promise<Record<string, PwProduct>> {
  const [global, customs] = await Promise.all([fetchCatalog(), fetchCustomItems(companyId ?? null)]);
  const m: Record<string, PwProduct> = {};
  global.forEach((p) => (m[p.sku] = p));
  customs.forEach((p) => (m[p.sku] = p));
  return m;
}

/** Per-member catalog category overrides (Categorize). */
export async function fetchCatOverrides(): Promise<PwCatOverride[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("pw_cat_overrides").select("sku, category");
  return (data || []) as PwCatOverride[];
}

export async function fetchCart(companyId: string | null): Promise<PwCartLine[]> {
  if (!companyId) return [];
  const supabase = await createClient();
  const { data } = await supabase.from("pw_cart").select("sku, qty").eq("company_id", companyId);
  return (data || []).map((r) => ({ sku: r.sku, qty: r.qty })) as PwCartLine[];
}

export async function fetchOrders(companyId: string | null): Promise<PwOrder[]> {
  if (!companyId) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("pw_orders")
    .select("*, pw_order_items(*)")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });
  return (data || []).map((o) => ({
    ...o,
    total: Number(o.total),
    saved: Number(o.saved),
    pw_order_items: (o.pw_order_items || []).map((i: { unit_price: number; qty: number }) => ({ ...i, unit_price: Number(i.unit_price), qty: Number(i.qty) })),
  })) as PwOrder[];
}

export async function fetchInventory(companyId: string | null): Promise<PwInventoryRow[]> {
  if (!companyId) return [];
  const supabase = await createClient();
  const { data } = await supabase.from("pw_inventory").select("*").eq("company_id", companyId).order("sku");
  return (data || []) as PwInventoryRow[];
}

export async function fetchBookedSpend(companyId: string | null): Promise<Record<string, number>> {
  if (!companyId) return {};
  const supabase = await createClient();
  const { data } = await supabase.from("pw_vendor_spend").select("vendor, qtd_spend").eq("company_id", companyId);
  const m: Record<string, number> = {};
  (data || []).forEach((r) => (m[r.vendor] = Number(r.qtd_spend)));
  return m;
}

export async function fetchDocuments(companyId: string | null): Promise<PwDocumentRow[]> {
  if (!companyId) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("pw_documents")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });
  return (data || []) as PwDocumentRow[];
}

export async function cartCount(companyId: string | null): Promise<number> {
  const cart = await fetchCart(companyId);
  return cart.reduce((a, l) => a + l.qty, 0);
}

export async function lowStockCount(companyId: string | null): Promise<number> {
  const inv = await fetchInventory(companyId);
  return inv.filter((r) => r.on_hand <= r.reorder).length;
}
