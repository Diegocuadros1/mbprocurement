import { getPortalContext, fetchOrders, fetchVendors, productMap } from "@/lib/portal/data";
import OrdersScreen from "@/components/portal/screens/OrdersScreen";

export default async function OrdersPage() {
  const ctx = await getPortalContext();
  const [orders, vendors, products] = await Promise.all([
    fetchOrders(ctx.companyId),
    fetchVendors(),
    productMap(),
  ]);
  return (
    <OrdersScreen
      orders={orders}
      vendors={vendors}
      productMapObj={products}
      account={ctx.account}
    />
  );
}
