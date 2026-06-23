import { getPortalContext, fetchInventory, fetchCatalog, fetchVendors, productMap } from "@/lib/portal/data";
import InventoryScreen from "@/components/portal/screens/InventoryScreen";

export default async function InventoryPage() {
  const ctx = await getPortalContext();
  const [inventory, products, vendors, productMapObj] = await Promise.all([
    fetchInventory(ctx.companyId),
    fetchCatalog(),
    fetchVendors(),
    productMap(ctx.companyId),
  ]);
  return (
    <InventoryScreen
      inventory={inventory}
      products={products}
      vendors={vendors}
      productMapObj={productMapObj}
    />
  );
}
