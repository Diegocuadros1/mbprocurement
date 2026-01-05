import CompaniesDashboard from "@/components/CompanyDashboard";
import OrdersDashboard from "@/components/CompanyOrders";
import { requireProfile } from "@/lib/auth";
import { fetchAllCompanies, fetchCompanyData } from "@/lib/companies";
import { fetchCompanyOrders } from "@/lib/orders";

export default async function Dashboard() {
  const { user, profile } = await requireProfile("/auth");

  const isAdmin = profile.role === "app_admin";

  if (isAdmin) {
    const list_of_companies = await fetchAllCompanies();

    return (
      <CompaniesDashboard
        companies={list_of_companies}
        userName={profile.username}
      />
    );
  } else {
    const company = await fetchCompanyData(profile.company_id);

    const orders = await fetchCompanyOrders(profile.company_id);

    return <OrdersDashboard companyName={company.name} orders={orders} />;
  }
}
