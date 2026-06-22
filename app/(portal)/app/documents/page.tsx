import { getPortalContext } from "@/lib/portal/data";
import DocumentsScreen from "@/components/portal/screens/DocumentsScreen";

export default async function DocumentsPage() {
  // Auth gate / portal context (documents are static reference content).
  await getPortalContext();
  return <DocumentsScreen />;
}
