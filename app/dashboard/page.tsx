import AdminDashboard from "@/components/AdminDashboard";
import UserDashboard from "@/components/UserDashboard";
import { requireProfile } from "@/lib/auth";
import { fetchAllCompanies, fetchCompanyData } from "@/lib/companies";
import { fetchAllOrders, fetchCompanyOrders } from "@/lib/orders";

export default async function Dashboard() {
  const { profile } = await requireProfile("/auth");

  const isAdmin = profile.role === "app_admin";

  if (isAdmin) {
    const [companies, orders] = await Promise.all([
      fetchAllCompanies(),
      fetchAllOrders(),
    ]);

    const nameById = Object.fromEntries(companies.map((c) => [c.id, c.name]));
    const allOrders = orders.map((o) => ({
      ...o,
      company_name: nameById[o.company_id] ?? "Unknown",
    }));

    return (
      <AdminDashboard
        username={profile.username}
        companies={companies}
        allOrders={allOrders}
      />
    );
  }

  const [company, orders] = await Promise.all([
    fetchCompanyData(profile.company_id!),
    fetchCompanyOrders(profile.company_id!),
  ]);

  return (
    <UserDashboard
      companyName={company.name}
      companyId={profile.company_id!}
      orders={orders}
      username={profile.username}
    />
  );
}
