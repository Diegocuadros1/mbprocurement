import { createClient } from "@/lib/supabase/server";

export type CompanyOrder = {
  id: string;
  company_id: string;
  order_date: string;   // date comes back as string
  order_time: string;   // time comes back as string
  is_placed: boolean;
  placed_at: string | null;
  total_cost: string | null; // numeric often comes back as string
  created_at: string;
  items_count?: number;
  ordered_items_count?: number;
  computed_total?: string; // from a view if you add it
};

export async function fetchCompanyOrders(companyId: string): Promise<CompanyOrder[]> {
  const supabase = await createClient();

  // Option A (simple): read directly from orders table
  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      company_id,
      order_date,
      order_time,
      is_placed,
      placed_at,
      total_cost,
      created_at
    `)
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`fetchCompanyOrders failed: ${error.message}`);
  }

  return (data ?? []) as CompanyOrder[];
}
