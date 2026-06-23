import { getPortalContext, fetchCatalog, fetchVendors, fetchInventory, fetchCatOverrides, fetchCustomItems } from "@/lib/portal/data";
import CatalogScreen from "@/components/portal/screens/CatalogScreen";

export default async function CatalogPage() {
  const ctx = await getPortalContext();
  const [products, vendors, inventory, catOverrides, customItems] = await Promise.all([
    fetchCatalog(),
    fetchVendors(),
    fetchInventory(ctx.companyId),
    fetchCatOverrides(),
    fetchCustomItems(ctx.companyId),
  ]);
  const onHandBySku: Record<string, number> = {};
  inventory.forEach((r) => (onHandBySku[r.sku] = r.on_hand));
  return (
    <CatalogScreen
      products={products}
      vendors={vendors}
      onHandBySku={onHandBySku}
      catOverrides={catOverrides}
      customItems={customItems}
      isPwAdmin={ctx.isPwAdmin}
    />
  );
}
