import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser(); // validated on server
  if (error) return null;
  return data.user ?? null;
}

export async function requireUser(redirectTo = "/auth") {
  const user = await getCurrentUser();
  if (!user) redirect(redirectTo);
  return user;
}
