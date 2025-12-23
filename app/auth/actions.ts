"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function signUpAction(formData: FormData) {
  const name = String(formData.get("name") ?? "")
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const companyKey = String(formData.get("companyKey") ?? "");

  const origin = (await headers()).get("origin") ?? "http://localhost:3000";
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: origin, // used as {{ .RedirectTo }} in the email template
      data: {
        full_name: name,
        signup_key: companyKey, // your “special key” (used by your hook/RPC to validate)
        email
      },
    },
  });

  if (error) {
    console.log(error.message)
  }
  return { error: error?.message ?? null };
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "")
  const password = String(formData.get("password") ?? "")

  const origin = (await headers()).get("origin") ?? "https://localhost:3000";
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) {
    console.log(error.message)
  }
  return { error: error?.message ?? null };
}