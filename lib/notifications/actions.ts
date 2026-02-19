"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

/** Create a notification visible to ALL app_admin users. Safe to call from any context (no user auth required). */
export async function createAdminNotificationAction(
  type: string,
  title: string,
  body?: string,
  link?: string
) {
  try {
    await supabaseAdmin.from("notifications").insert({
      type,
      title,
      body: body ?? null,
      link: link ?? null,
      recipient_role: "app_admin",
      recipient_user_id: null,
      is_read: false,
    });
  } catch {
    // Non-critical — don't block the main flow
  }
}

/** Create a notification for a specific user. */
export async function createUserNotificationAction(
  userId: string,
  type: string,
  title: string,
  body?: string,
  link?: string
) {
  try {
    await supabaseAdmin.from("notifications").insert({
      type,
      title,
      body: body ?? null,
      link: link ?? null,
      recipient_role: "user",
      recipient_user_id: userId,
      is_read: false,
    });
  } catch {
    // Non-critical — don't block the main flow
  }
}

/** Mark all unread notifications as read for the calling user. */
export async function markAllNotificationsReadAction(
  isAdmin: boolean,
  userId: string
) {
  try {
    if (isAdmin) {
      await supabaseAdmin
        .from("notifications")
        .update({ is_read: true })
        .eq("recipient_role", "app_admin")
        .eq("is_read", false);
    } else {
      await supabaseAdmin
        .from("notifications")
        .update({ is_read: true })
        .eq("recipient_user_id", userId)
        .eq("is_read", false);
    }
  } catch {
    // Non-critical
  }
}
