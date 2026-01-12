import { createClient } from "@/lib/supabase/server";

export async function fetchAllCompanies() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("companies_with_pending_orders") 
    .select("id, name, pending_orders, created_at") 
    .order("pending_orders", { ascending: false });

  if (error) throw new Error(`fetchAllCompanies failed: ${error.message}`);
  return data ?? [];
}

export async function fetchCompanyData(companyId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("companies_with_pending_orders") 
    .select("*")
    .eq("id", companyId)
    .single();

  if (error) throw new Error(`fetchCompanyData failed: ${error.message}`);
  return data;
}
