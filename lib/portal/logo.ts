/**
 * Company logos live in Supabase Storage (public bucket "logos"), keyed by the
 * company id — so there's no extra column to keep in sync, and Supabase stays
 * the single source of truth. If a lab has no logo the URL simply 404s and the
 * UI falls back to its initials.
 *
 * Safe to import from both server and client (NEXT_PUBLIC_* is exposed).
 */
export function companyLogoUrl(companyId: string | null | undefined): string | null {
  if (!companyId) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  return `${base}/storage/v1/object/public/logos/company/${companyId}`;
}
