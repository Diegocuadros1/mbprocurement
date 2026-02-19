import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type NotificationRow = {
  id: string;
  type: string;
  title: string;
  body: string | null;
  link: string | null;
  recipient_role: string;
  recipient_user_id: string | null;
  is_read: boolean;
  created_at: string;
};

export async function fetchNotifications(
  isAdmin: boolean,
  userId: string
): Promise<NotificationRow[]> {
  const supabase = await createClient();

  if (isAdmin) {
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("recipient_role", "app_admin")
      .order("created_at", { ascending: false });
    return (data ?? []) as NotificationRow[];
  } else {
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("recipient_user_id", userId)
      .order("created_at", { ascending: false });
    return (data ?? []) as NotificationRow[];
  }
}

/**
 * Called on the first visit after signup. Marks the profile as welcomed and
 * sends a one-time welcome notification. No-op if already welcomed.
 */
export async function checkFirstLogin(
  userId: string,
  username: string | null
): Promise<void> {
  try {
    await supabaseAdmin
      .from("profiles")
      .update({ welcomed_at: new Date().toISOString() })
      .eq("id", userId);

    await supabaseAdmin.from("notifications").insert({
      type: "welcome",
      title: "Welcome to ProcureWide!",
      body: `Welcome${username ? `, ${username}` : ""}! Your account is ready. Start by submitting your first order.`,
      link: "/orders/new",
      recipient_role: "user",
      recipient_user_id: userId,
      is_read: false,
    });
  } catch {
    // Non-critical — don't block page render
  }
}

export async function fetchUnreadCount(
  isAdmin: boolean,
  userId: string
): Promise<number> {
  const supabase = await createClient();

  if (isAdmin) {
    const { count } = await supabase
      .from("notifications")
      .select("id", { count: "exact", head: true })
      .eq("recipient_role", "app_admin")
      .eq("is_read", false);
    return count ?? 0;
  } else {
    const { count } = await supabase
      .from("notifications")
      .select("id", { count: "exact", head: true })
      .eq("recipient_user_id", userId)
      .eq("is_read", false);
    return count ?? 0;
  }
}
