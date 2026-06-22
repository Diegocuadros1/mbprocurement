-- ============================================================================
-- ProcureWide portal data model  (migration 0001)
-- ----------------------------------------------------------------------------
-- ADDITIVE & NON-DESTRUCTIVE. Creates a new `pw_*` schema for the redesigned
-- ordering portal. Does NOT touch the legacy `orders` / `order_items` tables.
--
-- Global, shared (the "parameters" a customer fills against):
--   pw_vendors, pw_products        -- catalog (seeded below)
-- Per-company operational data (starts EMPTY — a blank template):
--   pw_inventory, pw_orders, pw_order_items, pw_vendor_spend, pw_cart, pw_documents
--
-- Spend tiers / volume tiers / consolidation rates live in code
-- (lib/portal/pricing.ts) as the pricing framework.
--
-- Safe to run multiple times.
-- ============================================================================

-- ---------- helper functions (used by RLS) ----------------------------------
create or replace function public.pw_user_company() returns uuid
  language sql stable security definer set search_path = public as $$
  select company_id from public.profiles where id = auth.uid()
$$;

create or replace function public.pw_is_admin() returns boolean
  language sql stable security definer set search_path = public as $$
  select coalesce((select role = 'app_admin' from public.profiles where id = auth.uid()), false)
$$;

-- ---------- global catalog --------------------------------------------------
create table if not exists public.pw_vendors (
  key   text primary key,
  name  text not null,
  logo  text
);

create table if not exists public.pw_products (
  sku        text primary key,
  name       text not null,
  vendor     text not null references public.pw_vendors(key),
  catalog_no text,
  category   text,
  unit       text,
  price      numeric(12,2) not null default 0,   -- negotiated price
  list       numeric(12,2) not null default 0,   -- catalog list price
  lead       text,
  badges     text[] not null default '{}',
  storage    text,
  active     boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- per-company operational data ------------------------------------
create table if not exists public.pw_inventory (
  id         uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  sku        text not null references public.pw_products(sku),
  on_hand    integer not null default 0,
  reorder    integer not null default 0,
  lot        text,
  expiry     date,
  location   text,
  updated_at timestamptz not null default now(),
  unique (company_id, sku)
);

create table if not exists public.pw_orders (
  id          uuid primary key default gen_random_uuid(),
  company_id  uuid not null references public.companies(id) on delete cascade,
  order_num   text not null,                       -- display id, e.g. PW-04825
  status      text not null default 'Processing',  -- Processing|In transit|Delivered|Backordered|Cancelled
  po          text,
  ship        text,
  notes       text,
  tracking    text,
  carrier     text,
  urgency     text default 'Medium',
  need_by     date,
  arrival     date,
  total       numeric(12,2) not null default 0,
  saved       numeric(12,2) not null default 0,
  created_by  uuid references auth.users(id),
  created_at  timestamptz not null default now()
);

create table if not exists public.pw_order_items (
  id         uuid primary key default gen_random_uuid(),
  order_id   uuid not null references public.pw_orders(id) on delete cascade,
  sku        text not null,
  name       text,                                  -- snapshot at order time
  vendor     text,                                  -- snapshot
  qty        integer not null default 1,
  unit_price numeric(12,2) not null default 0       -- snapshot of negotiated price
);

create table if not exists public.pw_vendor_spend (
  company_id uuid not null references public.companies(id) on delete cascade,
  vendor     text not null references public.pw_vendors(key),
  qtd_spend  numeric(14,2) not null default 0,
  primary key (company_id, vendor)
);

create table if not exists public.pw_cart (
  id         uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  sku        text not null references public.pw_products(sku),
  qty        integer not null default 1,
  added_by   uuid references auth.users(id),
  updated_at timestamptz not null default now(),
  unique (company_id, sku)
);

create table if not exists public.pw_documents (
  id          uuid primary key default gen_random_uuid(),
  company_id  uuid references public.companies(id) on delete cascade,  -- null = global template
  doc_type    text not null,        -- template|guideline|regulatory|quote
  name        text not null,
  description text,
  file_ref    text,
  created_at  timestamptz not null default now()
);

create index if not exists pw_inventory_company_idx   on public.pw_inventory(company_id);
create index if not exists pw_orders_company_idx       on public.pw_orders(company_id);
create index if not exists pw_order_items_order_idx    on public.pw_order_items(order_id);
create index if not exists pw_cart_company_idx         on public.pw_cart(company_id);

-- ---------- RLS -------------------------------------------------------------
alter table public.pw_vendors      enable row level security;
alter table public.pw_products     enable row level security;
alter table public.pw_inventory    enable row level security;
alter table public.pw_orders       enable row level security;
alter table public.pw_order_items  enable row level security;
alter table public.pw_vendor_spend enable row level security;
alter table public.pw_cart         enable row level security;
alter table public.pw_documents    enable row level security;

-- Catalog: any authenticated user may read; only admins write.
drop policy if exists pw_vendors_read on public.pw_vendors;
create policy pw_vendors_read on public.pw_vendors for select to authenticated using (true);
drop policy if exists pw_vendors_admin on public.pw_vendors;
create policy pw_vendors_admin on public.pw_vendors for all to authenticated
  using (public.pw_is_admin()) with check (public.pw_is_admin());

drop policy if exists pw_products_read on public.pw_products;
create policy pw_products_read on public.pw_products for select to authenticated using (true);
drop policy if exists pw_products_admin on public.pw_products;
create policy pw_products_admin on public.pw_products for all to authenticated
  using (public.pw_is_admin()) with check (public.pw_is_admin());

-- Per-company tables: a user sees/edits only their company's rows; admins see all.
do $$
declare t text;
begin
  foreach t in array array['pw_inventory','pw_orders','pw_vendor_spend','pw_cart'] loop
    execute format('drop policy if exists %I_rw on public.%I', t, t);
    execute format(
      'create policy %I_rw on public.%I for all to authenticated
         using (company_id = public.pw_user_company() or public.pw_is_admin())
         with check (company_id = public.pw_user_company() or public.pw_is_admin())',
      t, t);
  end loop;
end $$;

-- order_items: scoped through their parent order's company.
drop policy if exists pw_order_items_rw on public.pw_order_items;
create policy pw_order_items_rw on public.pw_order_items for all to authenticated
  using (exists (select 1 from public.pw_orders o
                 where o.id = order_id
                   and (o.company_id = public.pw_user_company() or public.pw_is_admin())))
  with check (exists (select 1 from public.pw_orders o
                 where o.id = order_id
                   and (o.company_id = public.pw_user_company() or public.pw_is_admin())));

-- documents: global templates (company_id null) readable by all; company docs scoped.
drop policy if exists pw_documents_read on public.pw_documents;
create policy pw_documents_read on public.pw_documents for select to authenticated
  using (company_id is null or company_id = public.pw_user_company() or public.pw_is_admin());
drop policy if exists pw_documents_admin on public.pw_documents;
create policy pw_documents_admin on public.pw_documents for all to authenticated
  using (public.pw_is_admin() or company_id = public.pw_user_company())
  with check (public.pw_is_admin() or company_id = public.pw_user_company());

-- ============================================================================
-- SEED — global catalog (the template "parameters"). NO orders/inventory/spend.
-- ============================================================================
insert into public.pw_vendors (key, name, logo) values
  ('thermo',   'Thermo Fisher Scientific',    '/pw/vendors/thermo-fisher.png'),
  ('fisher',   'Fisher Scientific',           '/pw/vendors/fisher-scientific.png'),
  ('sigma',    'Sigma-Aldrich',               null),
  ('biorad',   'Bio-Rad',                     '/pw/vendors/biorad.png'),
  ('cst',      'Cell Signaling Technology',   '/pw/vendors/cell-signaling.png'),
  ('abcam',    'Abcam',                       '/pw/vendors/abcam.png'),
  ('agilent',  'Agilent',                     '/pw/vendors/agilent.png'),
  ('genscript','GenScript',                   '/pw/vendors/genscript.avif'),
  ('takara',   'Takara Bio',                  '/pw/vendors/takara.webp'),
  ('stemcell', 'STEMCELL Technologies',       '/pw/vendors/stemcell.png'),
  ('goldbio',  'Gold Biotechnology',          '/pw/vendors/goldbio.webp'),
  ('beckman',  'Beckman Coulter',             '/pw/vendors/beckman-coulter.png')
on conflict (key) do update set name = excluded.name, logo = excluded.logo;

insert into public.pw_products (sku, name, vendor, catalog_no, category, unit, price, list, lead, badges, storage) values
  ('TF-11965','DMEM, high glucose, no glutamine','thermo','11965-092','Cell culture','500 mL',56.80,63.73,'3–5 days','{GMP,ISO 9001}','2–8 °C'),
  ('TF-26140','Fetal Bovine Serum (FBS), US-sourced','thermo','26140-079','Cell culture','500 mL',489.00,545.00,'5–7 days','{Heat-inactivated,Gamma-irradiated}','−20 °C'),
  ('TF-25200','Trypsin-EDTA (0.25%), phenol red','thermo','25200-056','Cell culture','100 mL',24.40,28.10,'3–5 days','{Sterile}','−20 °C'),
  ('TF-15140','Penicillin-Streptomycin (10,000 U/mL)','thermo','15140-122','Cell culture','100 mL',31.20,35.90,'3–5 days','{Sterile}','−20 °C'),
  ('TF-11875','RPMI 1640 Medium, with L-glutamine','thermo','11875-093','Cell culture','500 mL',41.90,47.00,'3–5 days','{GMP}','2–8 °C'),
  ('SC-07920','mTeSR Plus hPSC Maintenance Medium','stemcell','100-0276','Cell culture','500 mL kit',372.00,415.00,'4–6 days','{Feeder-free}','−20 °C'),
  ('SI-D8537','DPBS, no calcium, no magnesium','sigma','D8537-500ML','Cell culture','500 mL',18.60,22.40,'2–4 days','{Sterile-filtered}','RT'),
  ('CS-4970','β-Actin (13E5) Rabbit mAb','cst','4970S','Antibodies','100 µL',408.00,445.00,'2–3 days','{WB,Validated}','−20 °C'),
  ('CS-9664','Cleaved Caspase-3 (Asp175) Rabbit mAb','cst','9664T','Antibodies','100 µL',425.00,462.00,'2–3 days','{WB,IHC}','−20 °C'),
  ('AB-ab8245','Anti-GAPDH antibody [6C5]','abcam','ab8245','Antibodies','100 µg',389.00,432.00,'3–5 days','{WB,"Loading control"}','−20 °C'),
  ('AB-ab32124','Anti-PD-L1 antibody [28-8]','abcam','ab205921','Antibodies','100 µL',510.00,565.00,'4–6 days','{IHC,Validated}','−20 °C'),
  ('TK-R001A','TaKaRa Taq DNA Polymerase','takara','R001A','Molecular biology','250 U',78.00,92.00,'3–5 days','{Hot-start}','−20 °C'),
  ('BR-1725271','SsoAdvanced SYBR Green Supermix','biorad','1725271','Molecular biology','500 rxn',312.00,358.00,'3–5 days','{qPCR}','−20 °C'),
  ('GS-SC1696','GenScript Gene Synthesis (per kb)','genscript','SC1696','Molecular biology','per kb',89.00,99.00,'7–10 days','{Sequence-verified}','RT'),
  ('TF-18080','SuperScript IV Reverse Transcriptase','thermo','18090-010','Molecular biology','10,000 U',398.00,441.00,'3–5 days','{cDNA}','−20 °C'),
  ('AG-5067','Agilent High Sensitivity DNA Kit','agilent','5067-4626','Molecular biology','25 assays',248.00,276.00,'4–6 days','{Bioanalyzer}','4 °C'),
  ('GB-A555','IPTG, Dioxane-free (≥99%)','goldbio','I2481C25','Reagents','25 g',64.00,74.00,'2–4 days','{"Molecular grade"}','RT'),
  ('GB-A777','Ampicillin, Sodium Salt','goldbio','A-301-25','Reagents','25 g',42.00,49.00,'2–4 days','{"Cell culture tested"}','−20 °C'),
  ('SI-E7023','Ethanol, 200 proof, molecular biology','sigma','E7023-500ML','Reagents','500 mL',38.50,44.00,'2–4 days','{"ACS grade"}','RT'),
  ('FS-1256','Pipette Tips, 1000 µL, filtered, sterile','fisher','02-707-404','Plasticware','rack ×96 (×10)',92.00,108.00,'1–3 days','{RNase-free,Sterile}','RT'),
  ('FS-3375','Conical Tubes, 50 mL, sterile','fisher','14-432-22','Plasticware','case ×500',168.00,192.00,'1–3 days','{Sterile}','RT'),
  ('FS-1538','Conical Tubes, 15 mL, sterile','fisher','14-959-53A','Plasticware','case ×500',142.00,164.00,'1–3 days','{Sterile}','RT'),
  ('FS-T75','Cell Culture Flask, T75, vented cap','fisher','13-680-65','Plasticware','case ×100',214.00,248.00,'1–3 days','{TC-treated,Sterile}','RT'),
  ('FS-96WP','96-Well Plate, flat bottom, TC-treated','fisher','12-565-501','Plasticware','case ×50',186.00,210.00,'1–3 days','{TC-treated,Sterile}','RT'),
  ('FS-MCT15','Microcentrifuge Tubes, 1.5 mL','fisher','05-408-129','Plasticware','bag ×500',36.00,43.00,'1–3 days','{DNase/RNase-free}','RT'),
  ('FS-NGL','Nitrile Exam Gloves, powder-free (M)','fisher','19-130-1597B','Plasticware','box ×200 (×10)',118.00,134.00,'1–3 days','{Powder-free}','RT')
on conflict (sku) do update set
  name = excluded.name, vendor = excluded.vendor, catalog_no = excluded.catalog_no,
  category = excluded.category, unit = excluded.unit, price = excluded.price,
  list = excluded.list, lead = excluded.lead, badges = excluded.badges, storage = excluded.storage;
