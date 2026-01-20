
"use server";

import { createClient } from "@/lib/supabase/server";
import { ExportOrderItem, OrderItemInput } from "@/types";

export async function submitOrderAction(
  items: OrderItemInput[],
  companyId?: string
) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("No items to submit.");
  }

  const supabase = await createClient();

  // 1) Auth check
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userData.user) {
    throw new Error("Unauthorized");
  }

  // 2) Get role + company_id from profile
  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("company_id, role")
    .eq("id", userData.user.id)
    .single();

  if (profileErr) throw new Error(profileErr.message);

  const role = profile?.role ?? null;
  const isAdmin = role === "app_admin";
  const profileCompanyId = profile?.company_id ?? null;

  // 3) Determine which company this order is for
  let targetCompanyId: string | null = null;

  if (isAdmin) {
    // Admin can submit for any company (passed from the route)
    targetCompanyId = companyId ?? profileCompanyId;
  } else {
    // Non-admin must be scoped to their own company
    targetCompanyId = profileCompanyId;

    if (companyId && companyId !== profileCompanyId) {
      throw new Error("Unauthorized: cannot submit orders for another company.");
    }
  }

  if (!targetCompanyId) {
    throw new Error("Missing company_id for order.");
  }

  // 4) Server-side validation (minimal)
  for (const it of items) {
    if (!it.supplierName?.trim()) throw new Error("Missing supplier name.");
    if (!it.sku?.trim()) throw new Error("Missing item number (SKU).");
    if (!it.description?.trim()) throw new Error("Missing description.");
    if (!Number.isFinite(it.units) || it.units <= 0) throw new Error("Invalid units.");
    if (!it.uom?.trim()) throw new Error("Missing unit of measure.");
    if (!Number.isFinite(it.unitPrice) || it.unitPrice < 0)
      throw new Error("Invalid unit price.");

    // Admin-only field validation (only if admin AND fields provided)
    if (isAdmin) {
      if (it.deliveredPrice != null) {
        if (!Number.isFinite(it.deliveredPrice) || it.deliveredPrice < 0) {
          throw new Error("Invalid delivered price.");
        }
      }
      if (it.ordered != null && typeof it.ordered !== "boolean") {
        throw new Error("Invalid ordered flag.");
      }
    }
  }

  // 5) Create the order (draft by default)
  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .insert({
      company_id: targetCompanyId,
      is_placed: false,
      total_cost: null,
      placed_at: null,
    })
    .select("id")
    .single();

  if (orderErr) throw new Error(orderErr.message);
  if (!order?.id) throw new Error("Failed to create order.");

  const nowIso = new Date().toISOString();

  // 6) Insert order items
  const rows = items.map((it) => {
    const ordered = isAdmin ? (it.ordered ?? false) : false;

    return {
      order_id: order.id,
      supplier_name: it.supplierName.trim(),
      item_number: it.sku.trim(),
      description: it.description.trim(),
      item_link: it.itemLink?.trim() ?? "",
      units: it.units,
      unit_of_measure: it.uom.trim(),
      unit_price: it.unitPrice,

      // Admin extras (only admins can set these)
      delivered_price: isAdmin ? (it.deliveredPrice ?? null) : null,
      sds_link: isAdmin ? (it.sdsLink?.trim() ?? null) : null,
      order_number: isAdmin ? (it.orderNumber?.trim() ?? null) : null,
      tracking_link: isAdmin ? (it.trackingLink?.trim() ?? null) : null,

      is_ordered: ordered,
      ordered_at: ordered ? nowIso : null,
    };
  });

  const { error: itemsErr } = await supabase.from("order_items").insert(rows);

  if (itemsErr) {
    await supabase.from("orders").delete().eq("id", order.id);
    throw new Error(itemsErr.message);
  }

  return { orderId: order.id as string };
}

export async function exportOrderItemsForOrdersAction(orderIds: string[]) {
  if (!Array.isArray(orderIds) || orderIds.length === 0) {
    return { items: [] as ExportOrderItem[] };
  }

  const supabase = await createClient();

  // 1) Auth check
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userData.user) {
    throw new Error("Unauthorized");
  }

  // 2) Get role + company scope
  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("company_id, role")
    .eq("id", userData.user.id)
    .single();

  if (profileErr) throw new Error(profileErr.message);

  const { company_id, role } = (profile ?? {}) as {
    company_id: string | null;
    role: string | null
  };

  const isAdmin = role === "app_admin";

  // 3) Determine which order IDs are allowed
  let safeOrderIds: string[] = [];

  if (isAdmin) {
    // Admins can export requested orders (still validate existence)
    const { data: existingOrders, error: existingErr } = await supabase
      .from("orders")
      .select("id")
      .in("id", orderIds);

    if (existingErr) throw new Error(existingErr.message);

    const existingIds = new Set((existingOrders ?? []).map((o) => o.id));
    safeOrderIds = orderIds.filter((id) => existingIds.has(id));
  } else {
    // Non-admins must be scoped to a company
    if (!company_id) {
      throw new Error("User has no company_id and is not an admin.");
    }

    const { data: allowedOrders, error: allowedErr } = await supabase
      .from("orders")
      .select("id")
      .eq("company_id", company_id)
      .in("id", orderIds);

    if (allowedErr) throw new Error(allowedErr.message);

    const allowedIds = new Set((allowedOrders ?? []).map((o) => o.id));
    safeOrderIds = orderIds.filter((id) => allowedIds.has(id));
  }

  if (safeOrderIds.length === 0) {
    return { items: [] as ExportOrderItem[] };
  }

  // 4) Fetch all items for those orders in one query
  const { data: items, error: itemsErr } = await supabase
    .from("order_items")
    .select(
      `
      id,
      order_id,
      supplier_name,
      item_number,
      description,
      item_link,
      units,
      unit_of_measure,
      unit_price,
      delivered_price,
      line_total,
      is_ordered,
      ordered_at,
      sds_link,
      order_number,
      tracking_link
    `
    )
    .in("order_id", safeOrderIds);

  if (itemsErr) throw new Error(itemsErr.message);

  return { items: (items ?? []) as ExportOrderItem[] };
}
