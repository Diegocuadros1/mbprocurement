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


export async function getCurrentProfile() {
  const supabase = await createClient();
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, company_id, role, username")
    .eq("id", user.id)
    .single();

  if (error) return null;
  return data;
}

export async function requireProfile(redirectTo = "/auth") {
  const user = await requireUser(redirectTo);
  const profile = await getCurrentProfile();
  if (!profile) redirect(redirectTo);
  return { user, profile };
}

export async function requireAdmin(redirectTo = "/dashboard") {
  const { user, profile } = await requireProfile();
  if (profile.role !== "admin") redirect(redirectTo);
  return { user, profile };
}