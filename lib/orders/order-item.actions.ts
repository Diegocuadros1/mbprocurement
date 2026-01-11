"use server";

import { createClient } from "@/lib/supabase/server";

const uuidRe =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function updateOrderItemAction(input: {
  orderItemId: string;
  deliveredPrice: number | null;
  isOrdered: boolean;
  sdsLink: string | null;
  orderNumber: string | null;
  trackingLink: string | null;
}) {
  const { orderItemId, deliveredPrice, isOrdered, sdsLink, orderNumber, trackingLink } = input;

  if (!uuidRe.test(orderItemId)) {
    throw new Error(`Invalid orderItemId: "${orderItemId}"`);
  }
  if (
    deliveredPrice !== null &&
    (!Number.isFinite(deliveredPrice) || deliveredPrice < 0)
  ) {
    throw new Error("Delivered price must be a non-negative number (or empty).");
  }
  if(!sdsLink) {
    throw new Error("SDS link must be provided");
  }
  if(!orderNumber) {
    throw new Error("Order number must be provided");
  }
  if(!trackingLink) {
    throw new Error("Tracking link must be provided");
  }

  const supabase = await createClient();

  // Read existing ordered_at so we don't overwrite it if already set
  const { data: existing, error: readErr } = await supabase
    .from("order_items")
    .select("id, ordered_at")
    .eq("id", orderItemId)
    .single();

  if (readErr) throw new Error(readErr.message);

  const nextOrderedAt =
    isOrdered ? existing?.ordered_at ?? new Date().toISOString() : null;

  const { data, error } = await supabase
    .from("order_items")
    .update({
      delivered_price: deliveredPrice,
      is_ordered: isOrdered,
      ordered_at: nextOrderedAt,
      sds_link: input.sdsLink,
      order_number: input.orderNumber,
      tracking_link: input.trackingLink,
    })
    .eq("id", orderItemId)
    .select("id, delivered_price, is_ordered, ordered_at, sds_link, order_number, tracking_link")
    .single();

  if (error) throw new Error(error.message);

  return data; // { id, delivered_price, is_ordered, ordered_at }
}
