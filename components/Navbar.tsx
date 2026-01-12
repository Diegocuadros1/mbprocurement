// components/Navbar.tsx (SERVER)
import { createClient } from "@/lib/supabase/server";
import NavbarClient from "./NavbarClient";

export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let name: string | null = null

  if (user) {
    const {data: profile} = await supabase.from("profiles").select("username").eq("id", user.id).single();
    name = profile?.username || profile?.username || null;
  }

  return <NavbarClient username={name} />;
}
