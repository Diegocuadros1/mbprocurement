-- ============================================================================
-- ProcureWide portal — v19 features (migration 0002)
-- ----------------------------------------------------------------------------
-- Additive. Adds:
--   1. Custom (non-catalog) item requests — pw_products gets company_id/pending/
--      estimated/link/detail/requested_at. A member can request a non-catalog
--      item; it becomes a company-scoped PENDING product row, flows through cart
--      and orders, and a ProcureWide operator can "officialize" it (move global).
--   2. Categorize — per-member catalog category overrides (pw_cat_overrides).
--   3. pw_admin — ProcureWide-staff flag, SEPARATE from app_admin
--      (profiles.is_pw_admin + pw_is_system_admin()). Gates officialization,
--      catalog soft-delete, and the document master templates.
--
-- Safe to run multiple times.
-- ============================================================================

-- ---------- pw_admin (ProcureWide staff) ------------------------------------
alter table public.profiles add column if not exists is_pw_admin boolean not null default false;

create or replace function public.pw_is_system_admin() returns boolean
  language sql stable security definer set search_path = public as $$
  select coalesce((select is_pw_admin from public.profiles where id = auth.uid()), false)
$$;

-- ---------- custom / non-catalog item requests ------------------------------
alter table public.pw_products add column if not exists company_id   uuid references public.companies(id) on delete cascade;
alter table public.pw_products add column if not exists pending      boolean not null default false;
alter table public.pw_products add column if not exists estimated    boolean not null default false;
alter table public.pw_products add column if not exists link         text;
alter table public.pw_products add column if not exists detail       text;
alter table public.pw_products add column if not exists requested_by uuid references auth.users(id);
alter table public.pw_products add column if not exists requested_at timestamptz;

create index if not exists pw_products_company_idx on public.pw_products(company_id);

-- "ProcureWide will source" placeholder vendor for pending custom items.
insert into public.pw_vendors (key, name, logo) values ('tbd', 'ProcureWide will source', null)
on conflict (key) do nothing;

-- ---------- per-member category overrides (Categorize) ----------------------
create table if not exists public.pw_cat_overrides (
  user_id    uuid not null references auth.users(id) on delete cascade,
  sku        text not null,
  category   text not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, sku)
);

-- ---------- RLS -------------------------------------------------------------
alter table public.pw_cat_overrides enable row level security;

-- pw_products: replace the catalog read policy so members also see their own
-- company's custom items; keep admin/system-admin full access; let members
-- manage their own pending custom items.
drop policy if exists pw_products_read on public.pw_products;
create policy pw_products_read on public.pw_products for select to authenticated
  using (
    (company_id is null)
    or (company_id = public.pw_user_company())
    or public.pw_is_admin()
    or public.pw_is_system_admin()
  );

-- members may create / edit / remove THEIR OWN company's PENDING custom items
drop policy if exists pw_products_member_custom on public.pw_products;
create policy pw_products_member_custom on public.pw_products for all to authenticated
  using (company_id = public.pw_user_company() and pending = true)
  with check (company_id = public.pw_user_company() and pending = true);

-- ProcureWide operators (pw_admin) — full catalog control incl. officializing
drop policy if exists pw_products_admin on public.pw_products;
create policy pw_products_admin on public.pw_products for all to authenticated
  using (public.pw_is_admin() or public.pw_is_system_admin())
  with check (public.pw_is_admin() or public.pw_is_system_admin());

-- category overrides: a member manages only their own
drop policy if exists pw_cat_overrides_rw on public.pw_cat_overrides;
create policy pw_cat_overrides_rw on public.pw_cat_overrides for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
