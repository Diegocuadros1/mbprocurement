import { getPortalContext, cartCount, lowStockCount } from "@/lib/portal/data";
import PortalSidebar from "@/components/portal/PortalSidebar";
import { ToastHost } from "@/components/portal/kit";

// Portal shell: object-rail sidebar + content. Gated by Supabase auth
// (getPortalContext → requireProfile redirects to /auth when logged out).
export default async function PortalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const ctx = await getPortalContext();
  const [count, low] = await Promise.all([cartCount(ctx.companyId), lowStockCount(ctx.companyId)]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F6F6F2" }}>
      <PortalSidebar
        cartCount={count}
        lowCount={low}
        account={ctx.account}
        isAdmin={ctx.isMasterAdmin}
        isActing={!!ctx.actingCompanyId}
      />
      <main style={{ flex: 1, minWidth: 0, background: "#F6F6F2", minHeight: "100vh" }}>{children}</main>
      <ToastHost />
    </div>
  );
}
