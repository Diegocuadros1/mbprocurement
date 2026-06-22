import { redirect } from "next/navigation";
import { requireProfile } from "@/lib/auth";
import { fetchCompanyData } from "@/lib/companies";
import { fetchCompanyOrders } from "@/lib/orders";
import OrdersDashboard from "@/components/CompanyOrders";

export default async function OrdersPage() {
  const { profile } = await requireProfile("/auth");

  if (profile.role === "app_admin") redirect("/dashboard");

  const [company, orders] = await Promise.all([
    fetchCompanyData(profile.company_id!),
    fetchCompanyOrders(profile.company_id!),
  ]);

  return (
    <OrdersDashboard
      companyName={company.name}
      companyId={profile.company_id}
      orders={orders} 
      app_admin={false}
    />
  );
}
