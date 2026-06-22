import {
  getPortalContext,
  fetchOrders,
  fetchInventory,
  fetchBookedSpend,
  fetchCart,
  fetchVendors,
  productMap,
} from "@/lib/portal/data";
import HomeScreen from "@/components/portal/screens/HomeScreen";

export default async function HomePage() {
  const ctx = await getPortalContext();
  const [orders, inventory, bookedSpend, cart, vendors, productMapObj] = await Promise.all([
    fetchOrders(ctx.companyId),
    fetchInventory(ctx.companyId),
    fetchBookedSpend(ctx.companyId),
    fetchCart(ctx.companyId),
    fetchVendors(),
    productMap(),
  ]);

  return (
    <HomeScreen
      account={ctx.account}
      orders={orders}
      inventory={inventory}
      bookedSpend={bookedSpend}
      cart={cart}
      vendors={vendors}
      productMapObj={productMapObj}
    />
  );
}
