import { requireProfile } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { fetchAnalyticsData } from "@/lib/analytics";
import AnalyticsPage from "@/components/AnalyticsPage";

export default async function AnalyticsPageRoute({
  searchParams,
}: {
  searchParams: Promise<{ company?: string }>;
}) {
  const { profile } = await requireProfile("/auth");
  const { company: companyParam } = await searchParams;

  const isAdmin = profile.role === "app_admin";

  let companyId: string;
  let companyName: string | undefined;

  if (isAdmin) {
    // Admin must supply ?company=[id] via sidebar link
    if (!companyParam) redirect("/dashboard");

    const supabase = await createClient();
    const { data: company } = await supabase
      .from("companies")
      .select("id, name")
      .eq("id", companyParam)
      .single();

    if (!company) redirect("/dashboard");

    companyId = company.id;
    companyName = company.name;
  } else {
    if (!profile.company_id) redirect("/dashboard");
    companyId = profile.company_id;
  }

  const data = await fetchAnalyticsData(companyId);

  return <AnalyticsPage data={data} companyName={companyName} />;
}
