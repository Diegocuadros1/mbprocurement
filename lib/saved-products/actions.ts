"use server";

import { createClient } from "@/lib/supabase/server";

export type SavedProduct = {
  id: string;
  user_id: string;
  supplier_name: string;
  item_number: string;
  description: string;
  item_link: string;
  units: number;
  unit_of_measure: string;
  unit_price: number | null;
  created_at: string;
};

export async function saveProductAction(product: {
  supplier_name: string;
  item_number: string;
  description: string;
  item_link: string;
  units: number;
  unit_of_measure: string;
  unit_price: number | null;
}) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr || !user) throw new Error("Unauthorized");

  const { error } = await supabase.from("saved_products").insert({
    user_id: user.id,
    ...product,
  });

  if (error) throw new Error(error.message);
}

export async function fetchSavedProductsAction(): Promise<SavedProduct[]> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr || !user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("saved_products")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as SavedProduct[];
}

export async function deleteSavedProductAction(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr || !user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("saved_products")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
}
