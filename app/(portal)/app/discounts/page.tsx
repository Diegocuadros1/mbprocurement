import { getPortalContext, fetchVendors, fetchBookedSpend } from "@/lib/portal/data";
import DiscountsScreen from "@/components/portal/screens/DiscountsScreen";

export default async function DiscountsPage() {
  const ctx = await getPortalContext();
  const [vendors, bookedSpend] = await Promise.all([
    fetchVendors(),
    fetchBookedSpend(ctx.companyId),
  ]);
  return <DiscountsScreen vendors={vendors} bookedSpend={bookedSpend} />;
}
