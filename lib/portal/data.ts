import { createClient } from "@/lib/supabase/server";
import { requireProfile } from "@/lib/auth";
import type { PwVendor, PwProduct, PwCartLine, PwOrder, PwInventoryRow } from "./types";

export type PortalContext = {
  userId: string;
  companyId: string | null;
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
  let name = "Your lab";
  if (companyId) {
    const supabase = await createClient();
    const { data } = await supabase.from("companies").select("name").eq("id", companyId).single();
    if (data?.name) name = data.name;
  }
  return {
    userId: user.id,
    companyId,
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

export async function fetchCatalog(): Promise<PwProduct[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("pw_products").select("*").eq("active", true).order("category").order("name");
  return (data || []).map((p) => ({ ...p, price: Number(p.price), list: Number(p.list), badges: p.badges || [] })) as PwProduct[];
}

export async function productMap(): Promise<Record<string, PwProduct>> {
  const list = await fetchCatalog();
  const m: Record<string, PwProduct> = {};
  list.forEach((p) => (m[p.sku] = p));
  return m;
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

export async function cartCount(companyId: string | null): Promise<number> {
  const cart = await fetchCart(companyId);
  return cart.reduce((a, l) => a + l.qty, 0);
}

export async function lowStockCount(companyId: string | null): Promise<number> {
  const inv = await fetchInventory(companyId);
  return inv.filter((r) => r.on_hand <= r.reorder).length;
}
