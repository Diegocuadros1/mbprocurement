import { redirect } from "next/navigation";
import { getPortalContext, fetchAccounts } from "@/lib/portal/data";
import AccountsScreen from "@/components/portal/screens/AccountsScreen";

export default async function AccountsPage() {
  const ctx = await getPortalContext();
  if (!ctx.isAdmin) redirect("/app"); // members never see other labs
  const accounts = await fetchAccounts();
  return (
    <AccountsScreen accounts={accounts} actingCompanyId={ctx.actingCompanyId} ownCompanyId={ctx.ownCompanyId} />
  );
}
