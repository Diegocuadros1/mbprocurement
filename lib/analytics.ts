import { createClient } from "@/lib/supabase/server";
import { getBillingPeriod } from "@/lib/helpers";

export type CycleSpend = {
  label: string;
  shortLabel: string;
  total: number;
};

export type TopSupplier = {
  name: string;
  total: number;
  itemCount: number;
};

export type TopItem = {
  supplier: string;
  itemNumber: string;
  description: string;
  count: number;
};

export type AnalyticsData = {
  totalSpend: number;
  currentCycleSpend: number;
  pendingItemsCount: number;
  totalOrdersCount: number;
  avgCycleSpend: number;
  cycleSpend: CycleSpend[];
  topSuppliers: TopSupplier[];
  orderedCount: number;
  pendingCount: number;
  topItems: TopItem[];
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const EMPTY: AnalyticsData = {
  totalSpend: 0,
  currentCycleSpend: 0,
  pendingItemsCount: 0,
  totalOrdersCount: 0,
  avgCycleSpend: 0,
  cycleSpend: [],
  topSuppliers: [],
  orderedCount: 0,
  pendingCount: 0,
  topItems: [],
};

export async function fetchAnalyticsData(
  companyId: string
): Promise<AnalyticsData> {
  const supabase = await createClient();

  // Fetch all orders for this company
  const { data: orders, error: ordersErr } = await supabase
    .from("orders")
    .select("id, created_at")
    .eq("company_id", companyId);

  if (ordersErr) throw new Error(ordersErr.message);
  if (!orders || orders.length === 0) return EMPTY;

  // Build a map: order id → created_at timestamp
  const orderDateMap = new Map<string, string>();
  for (const o of orders) orderDateMap.set(o.id, o.created_at);

  // Fetch all order items for those orders
  const orderIds = orders.map((o) => o.id);
  const { data: items, error: itemsErr } = await supabase
    .from("order_items")
    .select(
      "supplier_name, item_number, description, line_total, is_ordered, order_id"
    )
    .in("order_id", orderIds);

  if (itemsErr) throw new Error(itemsErr.message);
  const allItems = items ?? [];

  // ── Spend per billing cycle ──────────────────────────────────────────────
  const cycleMap = new Map<
    string,
    { label: string; shortLabel: string; total: number; start: Date }
  >();

  for (const item of allItems) {
    const createdAt = orderDateMap.get(item.order_id);
    if (!createdAt) continue;

    const { key, label, start } = getBillingPeriod(new Date(createdAt));
    const shortLabel = `${MONTHS[start.getMonth()]} '${String(start.getFullYear()).slice(2)}`;

    if (!cycleMap.has(key)) {
      cycleMap.set(key, { label, shortLabel, total: 0, start });
    }
    cycleMap.get(key)!.total += Number(item.line_total ?? 0);
  }

  const cycleSpend = [...cycleMap.values()]
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .map(({ label, shortLabel, total }) => ({ label, shortLabel, total }));

  // ── Top suppliers ─────────────────────────────────────────────────────────
  const supplierMap = new Map<string, { total: number; itemCount: number }>();
  for (const item of allItems) {
    const name = item.supplier_name ?? "Unknown";
    if (!supplierMap.has(name)) supplierMap.set(name, { total: 0, itemCount: 0 });
    const s = supplierMap.get(name)!;
    s.total += Number(item.line_total ?? 0);
    s.itemCount++;
  }

  const topSuppliers: TopSupplier[] = [...supplierMap.entries()]
    .sort(([, a], [, b]) => b.total - a.total)
    .slice(0, 8)
    .map(([name, { total, itemCount }]) => ({ name, total, itemCount }));

  // ── Ordered vs Pending ────────────────────────────────────────────────────
  const orderedCount = allItems.filter((i) => i.is_ordered).length;
  const pendingCount = allItems.length - orderedCount;

  // ── Top items (most frequently ordered) ──────────────────────────────────
  const itemMap = new Map<
    string,
    { supplier: string; itemNumber: string; description: string; count: number }
  >();

  for (const item of allItems) {
    const key = `${item.supplier_name}||${item.item_number}`;
    if (!itemMap.has(key)) {
      itemMap.set(key, {
        supplier: item.supplier_name ?? "",
        itemNumber: item.item_number ?? "",
        description: item.description ?? "",
        count: 0,
      });
    }
    itemMap.get(key)!.count++;
  }

  const topItems: TopItem[] = [...itemMap.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  // ── KPIs ──────────────────────────────────────────────────────────────────
  const totalSpend = allItems.reduce(
    (sum, i) => sum + Number(i.line_total ?? 0),
    0
  );
  const currentCycleKey = getBillingPeriod(new Date()).key;
  const currentCycleSpend = cycleMap.get(currentCycleKey)?.total ?? 0;
  const avgCycleSpend = cycleSpend.length > 0 ? totalSpend / cycleSpend.length : 0;

  return {
    totalSpend,
    currentCycleSpend,
    pendingItemsCount: pendingCount,
    totalOrdersCount: orders.length,
    avgCycleSpend,
    cycleSpend,
    topSuppliers,
    orderedCount,
    pendingCount,
    topItems,
  };
}
