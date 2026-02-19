import { requireProfile } from "@/lib/auth";
import { redirect } from "next/navigation";
import { fetchSavedProductsAction } from "@/lib/saved-products/actions";
import ProductsPage from "@/components/ProductsPage";

export default async function ProductsPageRoute() {
  const { profile } = await requireProfile("/auth");

  if (profile.role === "app_admin") redirect("/dashboard");

  const products = await fetchSavedProductsAction();

  return <ProductsPage initialProducts={products} />;
}
