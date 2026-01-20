import NewCompanyOrder from "@/components/NewCompanyOrder";
import { requireProfile } from "@/lib/auth";
import { fetchCompanyData } from "@/lib/companies";
import { redirect } from "next/navigation";
export default async function NewOrderPage() {
  const { user, profile } = await requireProfile("/auth");

  const isAdmin = profile.role === "app_admin";
  const username = profile.username;

  if (isAdmin) redirect("/dashboard");

  const company = await fetchCompanyData(profile.company_id);

  return (
    <NewCompanyOrder
      companyName={company.name}
      companyId={undefined}
      username={username}
      app_admin={isAdmin}
    />
  );
}
