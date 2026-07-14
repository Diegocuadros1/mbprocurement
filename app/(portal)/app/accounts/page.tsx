import { redirect } from "next/navigation";
import { getPortalContext, fetchAccounts, fetchAccountMembers } from "@/lib/portal/data";
import AccountsScreen from "@/components/portal/screens/AccountsScreen";

export default async function AccountsPage() {
  const ctx = await getPortalContext();
  if (!ctx.isMasterAdmin) redirect("/app"); // only the master admin manages accounts
  const [accounts, members] = await Promise.all([fetchAccounts(), fetchAccountMembers()]);
  return (
    <AccountsScreen accounts={accounts} members={members} actingCompanyId={ctx.actingCompanyId} ownCompanyId={ctx.ownCompanyId} />
  );
}
