"use server";

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

async function getAuthedUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) throw new Error("Unauthorized");
  return { supabase, user };
}

export async function updateProfileAction(fields: {
  username?: string;
  out_of_office?: boolean;
  out_of_office_message?: string | null;
}) {
  const { user } = await getAuthedUser();

  const { error } = await supabaseAdmin
    .from("profiles")
    .update(fields)
    .eq("id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/settings");
}

export async function updateCompanyInfoAction(fields: {
  contact_email?: string | null;
  address?: string | null;
  delivery_instructions?: string | null;
}) {
  const { supabase, user } = await getAuthedUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("company_id, role")
    .eq("id", user.id)
    .single();

  if (profile?.role === "app_admin") throw new Error("Unauthorized");
  if (!profile?.company_id) throw new Error("No company associated");

  const { error } = await supabaseAdmin
    .from("companies")
    .update(fields)
    .eq("id", profile.company_id);

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/settings");
}
