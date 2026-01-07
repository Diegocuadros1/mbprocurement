"use server";

import { createClient } from "@/lib/supabase/server";

export type OrderItemInput = {
  supplierName: string;
  sku: string; // maps to item_number
  description: string;
  itemLink: string; // maps to item_link
  units: number;
  uom: string; // maps to unit_of_measure
  unitPrice: number; // maps to unit_price
};

export async function submitOrderAction(items: OrderItemInput[]) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("No items to submit.");
  }

  const supabase = await createClient();

  // 1) Auth check
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userData.user) {
    throw new Error("Unauthorized");
  }

  // 2) Get company_id from profile
  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("company_id")
    .eq("id", userData.user.id)
    .single();

  if (profileErr) throw new Error(profileErr.message);
  if (!profile?.company_id) throw new Error("User has no company_id.");

  // 3) Server-side validation (minimal)
  for (const it of items) {
    if (!it.supplierName?.trim()) throw new Error("Missing supplier name.");
    if (!it.sku?.trim()) throw new Error("Missing item number (SKU).");
    if (!it.description?.trim()) throw new Error("Missing description.");
    if (!Number.isFinite(it.units) || it.units <= 0) throw new Error("Invalid units.");
    if (!it.uom?.trim()) throw new Error("Missing unit of measure.");
    if (!Number.isFinite(it.unitPrice) || it.unitPrice < 0) throw new Error("Invalid unit price.");
  }

  // 4) Create the order (draft by default)
  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .insert({
      company_id: profile.company_id,
      is_placed: false,
      total_cost: null,
      placed_at: null,
      // order_date/order_time have defaults in your DB (if they don't, tell me and we’ll set them here)
    })
    .select("id")
    .single();

  if (orderErr) throw new Error(orderErr.message);
  if (!order?.id) throw new Error("Failed to create order.");

  // 5) Insert order items
  const rows = items.map((it) => ({
    order_id: order.id,
    supplier_name: it.supplierName.trim(),
    item_number: it.sku.trim(),
    description: it.description.trim(),
    item_link: it.itemLink?.trim() ?? "",
    units: it.units,
    unit_of_measure: it.uom.trim(),
    unit_price: it.unitPrice,
    is_ordered: false, 
  }));

  const { error: itemsErr } = await supabase.from("order_items").insert(rows);

  if (itemsErr) {
    // cleanup so you don’t leave an empty order behind
    await supabase.from("orders").delete().eq("id", order.id);
    throw new Error(itemsErr.message);
  }

  return { orderId: order.id as string };
}
