import { getPortalContext, productMap, fetchVendors, fetchCart, fetchBookedSpend } from "@/lib/portal/data";
import CartScreen from "@/components/portal/screens/CartScreen";

export default async function CartPage() {
  const ctx = await getPortalContext();
  const [products, vendors, cart, bookedSpend] = await Promise.all([
    productMap(),
    fetchVendors(),
    fetchCart(ctx.companyId),
    fetchBookedSpend(ctx.companyId),
  ]);
  return <CartScreen products={products} vendors={vendors} cart={cart} bookedSpend={bookedSpend} />;
}
