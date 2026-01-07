import AdminViewOrder from "@/components/AdminViewOrder";
import ViewOrder from "@/components/ViewOrder";
import { requireProfile } from "@/lib/auth";
import { fetchOrderById } from "@/lib/orders";

export default async function OrderPage({
  params,
}: {
  params: { orderId: string };
}) {
  const { user, profile } = await requireProfile("/auth");

  const { orderId } = await params;

  const order = await fetchOrderById(orderId);

  const isAdmin = profile.role === "app_admin";

  if (!isAdmin) {
    return <ViewOrder order={order} />;
  } else {
    return <AdminViewOrder order={order} />;
  }
}
