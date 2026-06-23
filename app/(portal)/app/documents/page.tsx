import { getPortalContext, fetchDocuments } from "@/lib/portal/data";
import DocumentsScreen from "@/components/portal/screens/DocumentsScreen";

export default async function DocumentsPage() {
  const ctx = await getPortalContext();
  const companyDocs = await fetchDocuments(ctx.companyId);
  return <DocumentsScreen companyDocs={companyDocs} isPwAdmin={ctx.isPwAdmin} />;
}
