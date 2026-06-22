"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireProfile } from "@/lib/auth";
import { cartSummary, orderArrivalDays, addDays } from "./pricing";
import type { PwProduct } from "./types";

async function requireCompany() {
  const { user, profile } = await requireProfile("/auth");
  const companyId = (profile?.company_id as string | null) ?? null;
  if (!companyId) throw new Error("No company is associated with this account.");
  const supabase = await createClient();
  return { supabase, userId: user.id, companyId };
}

function revalidatePortal() {
  revalidatePath("/app", "layout");
}

// ───────── Cart ─────────
export async function addToCartAction(sku: string, qty = 1) {
  const { supabase, userId, companyId } = await requireCompany();
  const { data: existing } = await supabase
    .from("pw_cart")
    .select("qty")
    .eq("company_id", companyId)
    .eq("sku", sku)
    .maybeSingle();
  const newQty = (existing?.qty || 0) + qty;
  await supabase
    .from("pw_cart")
    .upsert({ company_id: companyId, sku, qty: newQty, added_by: userId, updated_at: new Date().toISOString() }, { onConflict: "company_id,sku" });
  revalidatePortal();
}

export async function setCartQtyAction(sku: string, qty: number) {
  const { supabase, companyId } = await requireCompany();
  if (qty <= 0) {
    await supabase.from("pw_cart").delete().eq("company_id", companyId).eq("sku", sku);
  } else {
    await supabase
      .from("pw_cart")
      .upsert({ company_id: companyId, sku, qty, updated_at: new Date().toISOString() }, { onConflict: "company_id,sku" });
  }
  revalidatePortal();
}

export async function removeFromCartAction(sku: string) {
  const { supabase, companyId } = await requireCompany();
  await supabase.from("pw_cart").delete().eq("company_id", companyId).eq("sku", sku);
  revalidatePortal();
}

export async function clearCartAction() {
  const { supabase, companyId } = await requireCompany();
  await supabase.from("pw_cart").delete().eq("company_id", companyId);
  revalidatePortal();
}

/** Bulk add SKUs/quantities (e.g. CSV import). rows: {sku?|catalog?, qty}. */
export async function importCartRowsAction(rows: { sku?: string; catalog?: string; qty: number | string }[]) {
  const { supabase, userId, companyId } = await requireCompany();
  const { data: products } = await supabase.from("pw_products").select("sku, catalog_no");
  const bySku: Record<string, { sku: string }> = {};
  const byCat: Record<string, { sku: string }> = {};
  (products || []).forEach((p) => {
    bySku[p.sku] = p;
    if (p.catalog_no) byCat[p.catalog_no.toLowerCase()] = p;
  });
  let added = 0,
    skipped = 0;
  for (const r of rows) {
    const q = parseInt(String(r.qty), 10) || 0;
    if (q <= 0) {
      skipped++;
      continue;
    }
    let sku: string | undefined = r.sku && bySku[r.sku.trim()] ? r.sku.trim() : undefined;
    if (!sku && r.catalog) sku = byCat[String(r.catalog).trim().toLowerCase()]?.sku;
    if (!sku && r.sku) sku = byCat[String(r.sku).trim().toLowerCase()]?.sku;
    if (!sku) {
      skipped++;
      continue;
    }
    const { data: existing } = await supabase.from("pw_cart").select("qty").eq("company_id", companyId).eq("sku", sku).maybeSingle();
    await supabase
      .from("pw_cart")
      .upsert({ company_id: companyId, sku, qty: (existing?.qty || 0) + q, added_by: userId, updated_at: new Date().toISOString() }, { onConflict: "company_id,sku" });
    added++;
  }
  revalidatePortal();
  return { added, skipped };
}

// ───────── Place order ─────────
export async function placeOrderAction(details: { po?: string; ship?: string; notes?: string; urgency?: string; needBy?: string }) {
  const { supabase, userId, companyId } = await requireCompany();

  const [{ data: cartRows }, { data: products }, { data: spendRows }, { count }] = await Promise.all([
    supabase.from("pw_cart").select("sku, qty").eq("company_id", companyId),
    supabase.from("pw_products").select("*"),
    supabase.from("pw_vendor_spend").select("vendor, qtd_spend").eq("company_id", companyId),
    supabase.from("pw_orders").select("*", { count: "exact", head: true }).eq("company_id", companyId),
  ]);

  const cart = (cartRows || []).map((r) => ({ sku: r.sku, qty: r.qty }));
  if (!cart.length) throw new Error("Your cart is empty.");

  const pmap: Record<string, PwProduct> = {};
  (products || []).forEach((p) => (pmap[p.sku] = { ...p, price: Number(p.price), list: Number(p.list), badges: p.badges || [] } as PwProduct));
  const booked: Record<string, number> = {};
  (spendRows || []).forEach((r) => (booked[r.vendor] = Number(r.qtd_spend)));

  const sum = cartSummary(cart, pmap, booked);
  const orderNum = "PW-0" + (4825 + (count || 0));

  const { data: order, error: orderErr } = await supabase
    .from("pw_orders")
    .insert({
      company_id: companyId,
      order_num: orderNum,
      status: "Processing",
      po: details.po || null,
      ship: details.ship || null,
      notes: details.notes || null,
      urgency: details.urgency || "Medium",
      need_by: details.needBy || null,
      arrival: addDays(orderArrivalDays(cart, pmap)),
      total: sum.total,
      saved: sum.volumeOff + sum.spendGuarantee,
      created_by: userId,
    })
    .select("id, order_num")
    .single();
  if (orderErr || !order) throw new Error(orderErr?.message || "Could not create order.");

  // line items (snapshot)
  const items = cart
    .filter((l) => pmap[l.sku])
    .map((l) => ({ order_id: order.id, sku: l.sku, name: pmap[l.sku].name, vendor: pmap[l.sku].vendor, qty: l.qty, unit_price: pmap[l.sku].price }));
  if (items.length) await supabase.from("pw_order_items").insert(items);

  // bump vendor spend (per-vendor net)
  for (const g of sum.vendorGroups) {
    const current = booked[g.vendor] || 0;
    await supabase
      .from("pw_vendor_spend")
      .upsert({ company_id: companyId, vendor: g.vendor, qtd_spend: current + g.net }, { onConflict: "company_id,vendor" });
  }

  // receive into inventory (only items already tracked)
  const { data: inv } = await supabase.from("pw_inventory").select("sku, on_hand").eq("company_id", companyId);
  const invBySku: Record<string, number> = {};
  (inv || []).forEach((r) => (invBySku[r.sku] = r.on_hand));
  for (const l of cart) {
    if (invBySku[l.sku] != null) {
      await supabase
        .from("pw_inventory")
        .update({ on_hand: invBySku[l.sku] + l.qty, updated_at: new Date().toISOString() })
        .eq("company_id", companyId)
        .eq("sku", l.sku);
    }
  }

  // clear cart
  await supabase.from("pw_cart").delete().eq("company_id", companyId);
  revalidatePortal();
  return { id: order.id, orderNum: order.order_num };
}

export async function reorderToCartAction(orderId: string) {
  const { supabase, userId, companyId } = await requireCompany();
  const { data: items } = await supabase.from("pw_order_items").select("sku, qty").eq("order_id", orderId);
  let n = 0;
  for (const it of items || []) {
    const { data: existing } = await supabase.from("pw_cart").select("qty").eq("company_id", companyId).eq("sku", it.sku).maybeSingle();
    await supabase
      .from("pw_cart")
      .upsert({ company_id: companyId, sku: it.sku, qty: (existing?.qty || 0) + it.qty, added_by: userId, updated_at: new Date().toISOString() }, { onConflict: "company_id,sku" });
    n++;
  }
  revalidatePortal();
  return n;
}

// ───────── Inventory ─────────
export async function upsertInventoryAction(row: {
  sku: string; on_hand: number; reorder: number; lot?: string | null; expiry?: string | null; location?: string | null;
}) {
  const { supabase, companyId } = await requireCompany();
  await supabase
    .from("pw_inventory")
    .upsert(
      {
        company_id: companyId,
        sku: row.sku,
        on_hand: Math.max(0, row.on_hand),
        reorder: Math.max(0, row.reorder),
        lot: row.lot ?? null,
        expiry: row.expiry || null,
        location: row.location ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "company_id,sku" }
    );
  revalidatePortal();
}

export async function adjustInventoryAction(sku: string, onHand: number) {
  const { supabase, companyId } = await requireCompany();
  await supabase.from("pw_inventory").update({ on_hand: Math.max(0, onHand), updated_at: new Date().toISOString() }).eq("company_id", companyId).eq("sku", sku);
  revalidatePortal();
}

export async function removeInventoryAction(sku: string) {
  const { supabase, companyId } = await requireCompany();
  await supabase.from("pw_inventory").delete().eq("company_id", companyId).eq("sku", sku);
  revalidatePortal();
}

// ───────── Documents ─────────
export async function addDocumentAction(input: { name: string; doc_type: string; file_ref?: string | null; description?: string | null }) {
  const { supabase, companyId } = await requireCompany();
  const name = input.name.trim();
  if (!name) throw new Error("Document name is required.");
  await supabase.from("pw_documents").insert({
    company_id: companyId,
    name,
    doc_type: input.doc_type || "template",
    file_ref: input.file_ref?.trim() || null,
    description: input.description?.trim() || null,
  });
  revalidatePortal();
}

export async function removeDocumentAction(id: string) {
  const { supabase, companyId } = await requireCompany();
  await supabase.from("pw_documents").delete().eq("id", id).eq("company_id", companyId);
  revalidatePortal();
}
