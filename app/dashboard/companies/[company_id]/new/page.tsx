import NewCompanyOrder from "@/components/NewCompanyOrder";
import { requireProfile } from "@/lib/auth";
import { fetchCompanyData } from "@/lib/companies";
import { redirect } from "next/navigation";

export default async function NewOrderPage({
  params,
}: {
  params: { company_id: string };
}) {
  const { company_id } = await params;

  const { user, profile } = await requireProfile("/auth");

  const isAdmin = profile.role === "app_admin";
  const username = profile.username;

  if (!isAdmin) redirect("/dashboard");

  const company = await fetchCompanyData(company_id);

  return (
    <NewCompanyOrder
      companyName={company.name}
      companyId={company_id}
      username={username}
      app_admin={isAdmin}
    />
  );
}
