import { getPortalContext, fetchCatalog, fetchVendors, fetchInventory } from "@/lib/portal/data";
import CatalogScreen from "@/components/portal/screens/CatalogScreen";

export default async function CatalogPage() {
  const ctx = await getPortalContext();
  const [products, vendors, inventory] = await Promise.all([
    fetchCatalog(),
    fetchVendors(),
    fetchInventory(ctx.companyId),
  ]);
  const onHandBySku: Record<string, number> = {};
  inventory.forEach((r) => (onHandBySku[r.sku] = r.on_hand));
  return <CatalogScreen products={products} vendors={vendors} onHandBySku={onHandBySku} />;
}
