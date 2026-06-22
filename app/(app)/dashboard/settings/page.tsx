import { requireProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import SettingsPage from "@/components/SettingsPage";

export default async function SettingsRoute({
  searchParams,
}: {
  searchParams: Promise<{ company?: string }>;
}) {
  const { user } = await requireProfile("/auth");
  const supabase = await createClient();
  const params = await searchParams;

  const { data: profile } = await supabase
    .from("profiles")
    .select("company_id, role, username, out_of_office, out_of_office_message")
    .eq("id", user.id)
    .single();

  if (!profile) return null;

  const isAppAdmin = profile.role === "app_admin";

  let company: {
    id: string;
    name: string;
    contact_email: string | null;
    address: string | null;
    delivery_instructions: string | null;
  } | null = null;

  // For regular users, fetch their own company.
  // For admins viewing a specific company via ?company= param, fetch that company.
  const companyIdToFetch = isAppAdmin
    ? (params.company ?? null)
    : (profile.company_id ?? null);

  if (companyIdToFetch) {
    const { data } = await supabaseAdmin
      .from("companies")
      .select("id, name, contact_email, address, delivery_instructions")
      .eq("id", companyIdToFetch)
      .single();
    company = data ?? null;
  }

  type Member = { id: string; username: string | null; email: string };
  let members: Member[] = [];

  const memberCompanyId = isAppAdmin
    ? (params.company ?? null)
    : (profile.company_id ?? null);

  if (memberCompanyId) {
    const { data: profileRows } = await supabaseAdmin
      .from("profiles")
      .select("id, username")
      .eq("company_id", memberCompanyId)
      .neq("role", "app_admin");

    if (profileRows && profileRows.length > 0) {
      const emailMap: Record<string, string> = {};
      await Promise.all(
        profileRows.map(async (p) => {
          const { data } = await supabaseAdmin.auth.admin.getUserById(p.id);
          if (data.user?.email) emailMap[p.id] = data.user.email;
        })
      );
      members = profileRows.map((p) => ({
        id: p.id,
        username: p.username,
        email: emailMap[p.id] ?? "",
      }));
    }
  }

  return (
    <SettingsPage
      user={{ id: user.id, email: user.email ?? "" }}
      profile={{
        username: profile.username ?? "",
        out_of_office: profile.out_of_office ?? false,
        out_of_office_message: profile.out_of_office_message ?? null,
      }}
      company={company}
      isAppAdmin={isAppAdmin}
      members={members}
    />
  );
}
