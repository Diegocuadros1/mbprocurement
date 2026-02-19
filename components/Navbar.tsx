// components/Navbar.tsx (SERVER)
import { createClient } from "@/lib/supabase/server";
import { fetchUnreadCount } from "@/lib/notifications";
import NavbarClient from "./NavbarClient";

export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let name: string | null = null;
  let unreadCount = 0;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("username, role")
      .eq("id", user.id)
      .single();

    name = profile?.username ?? null;

    const isAdmin = profile?.role === "app_admin";
    unreadCount = await fetchUnreadCount(isAdmin, user.id);
  }

  return <NavbarClient username={name} unreadCount={unreadCount} />;
}
