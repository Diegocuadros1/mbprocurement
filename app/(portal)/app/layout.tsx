import { getPortalContext, cartCount, lowStockCount, fetchBookedSpend } from "@/lib/portal/data";
import { spendStatus, SPEND_TIERS } from "@/lib/portal/pricing";
import PortalSidebar from "@/components/portal/PortalSidebar";
import { ToastHost } from "@/components/portal/kit";

// Portal shell: object-rail sidebar + content. Gated by Supabase auth
// (getPortalContext → requireProfile redirects to /auth when logged out).
export default async function PortalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const ctx = await getPortalContext();
  const [count, low, booked] = await Promise.all([
    cartCount(ctx.companyId),
    lowStockCount(ctx.companyId),
    fetchBookedSpend(ctx.companyId),
  ]);
  const savedQtr = Object.keys(SPEND_TIERS).reduce((a, k) => a + spendStatus(k, booked[k] || 0).guaranteed, 0);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F6F6F2" }}>
      <PortalSidebar cartCount={count} lowCount={low} savedQtr={savedQtr} account={ctx.account} />
      <main style={{ flex: 1, minWidth: 0, background: "#F6F6F2", minHeight: "100vh" }}>{children}</main>
      <ToastHost />
    </div>
  );
}
