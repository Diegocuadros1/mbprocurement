"use server";

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createUserNotificationAction } from "@/lib/notifications/actions";

export async function markOrderPlacedAction(orderId: string) {
  const supabase = await createClient();

  // Auth — must be admin
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr || !user) throw new Error("Unauthorized");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "app_admin") throw new Error("Unauthorized");

  // Fetch order
  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .select("id, company_id, order_date, is_placed")
    .eq("id", orderId)
    .single();

  if (orderErr || !order) throw new Error("Order not found");
  if (order.is_placed) throw new Error("Order is already placed");

  // Mark placed
  const { error: updateErr } = await supabase
    .from("orders")
    .update({ is_placed: true, placed_at: new Date().toISOString() })
    .eq("id", orderId);

  if (updateErr) throw new Error(updateErr.message);

  // Notify all users in the company — must use admin client to bypass profiles RLS
  const { data: companyUsers } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("company_id", order.company_id)
    .neq("role", "app_admin");

  if (companyUsers && companyUsers.length > 0) {
    await Promise.all(
      companyUsers.map((u) =>
        createUserNotificationAction(
          u.id,
          "order_placed",
          "Order Placed!",
          `Your order from ${order.order_date} has been placed and is on its way.`,
          `/orders/${orderId}`
        )
      )
    );
  }

  return { success: true };
}
