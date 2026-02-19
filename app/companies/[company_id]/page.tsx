import OrdersDashboard from "@/components/CompanyOrders";
import { requireProfile } from "@/lib/auth";
import { fetchCompanyData } from "@/lib/companies";
import { fetchCompanyOrders } from "@/lib/orders";
import { redirect } from "next/navigation";

export default async function OrderPage({
  params,
}: {
  params: { company_id: string };
}) {
  const { company_id } = await params;
  const { profile } = await requireProfile("/auth");

  const isAdmin = profile.role === "app_admin";

  if (!isAdmin) redirect("/dashboard");

  const orders = await fetchCompanyOrders(company_id);
  const company = await fetchCompanyData(company_id);

  return (
    <OrdersDashboard
      companyName={company.name}
      companyId={company_id}
      orders={orders}
      app_admin={isAdmin}
    />
  );
}
