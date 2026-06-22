import { Navbar } from "@/components/Navbar";
import { createClient } from "@/lib/supabase/server";
import { fetchAllCompanies } from "@/lib/companies";
import Sidebar from "@/components/Sidebar";
import { checkFirstLogin } from "@/lib/notifications";

// Authenticated app shell: slim navbar + role-aware sidebar + content offset.
// (Legacy dashboard/orders/etc. routes live under this group.)
export default async function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoggedIn = !!user;
  let isAdmin = false;
  let companies: { id: string; name: string; pending_orders: number }[] = [];

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, welcomed_at, username")
      .eq("id", user.id)
      .single();

    isAdmin = profile?.role === "app_admin";

    if (!isAdmin && profile?.welcomed_at === null) {
      await checkFirstLogin(user.id, profile?.username ?? null);
    }

    if (isAdmin) {
      companies = await fetchAllCompanies().catch(() => []);
    }
  }

  return (
    <>
      <Navbar />
      {isLoggedIn && <Sidebar isAdmin={isAdmin} companies={companies} />}
      <div className={isLoggedIn ? "ml-60 pt-12" : ""}>{children}</div>
    </>
  );
}
