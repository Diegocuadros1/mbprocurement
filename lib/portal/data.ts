import { createClient } from "@/lib/supabase/server";
import { requireProfile } from "@/lib/auth";
import type { PwVendor, PwProduct, PwCartLine, PwOrder, PwInventoryRow, PwDocumentRow, PwCatOverride } from "./types";

export type PortalContext = {
  userId: string;
  companyId: string | null;
  isPwAdmin: boolean; // ProcureWide operator (separate from app_admin)
  account: { name: string; initials: string; plan: string; quarter: string };
};

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
  const { user, profile } = await requireProfile("/auth");
  const companyId = (profile?.company_id as string | null) ?? null;
  const supabase = await createClient();
  let name = "Your lab";
  if (companyId) {
    const { data } = await supabase.from("companies").select("name").eq("id", companyId).single();
    if (data?.name) name = data.name;
  }
  const { data: me } = await supabase.from("profiles").select("is_pw_admin").eq("id", user.id).maybeSingle();
  return {
    userId: user.id,
    companyId,
    isPwAdmin: !!me?.is_pw_admin,
    account: { name, initials: initialsOf(name), plan: "Growth", quarter: quarterLabel() },
  };
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
