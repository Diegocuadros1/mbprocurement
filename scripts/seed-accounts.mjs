#!/usr/bin/env node
/**
 * Seed 3 sample client accounts an admin can open, inspect and edit.
 * Each gets: a company, a member login, inventory, order history, and QTD spend.
 * Idempotent-ish: re-running skips companies/users that already exist.
 *
 *   node scripts/seed-accounts.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { createHash, randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
readFileSync(join(root, ".env.local"), "utf8").split("\n").forEach((l) => {
  const i = l.indexOf("=");
  if (i > 0 && !l.trim().startsWith("#")) process.env[l.slice(0, i).trim()] ??= l.slice(i + 1).trim();
});
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// NEVER hardcode a password here — this repo is public and these are live
// accounts on the production project. Supply one, or we generate a strong
// random one and print it once:
//     SEED_PASSWORD='...' node scripts/seed-accounts.mjs
const PASSWORD = process.env.SEED_PASSWORD || randomBytes(12).toString("base64url") + "aA1!";

const sha = (s) => "\\x" + createHash("sha256").update(s).digest("hex");
const day = (n) => new Date(Date.now() - n * 864e5).toISOString();
const dstr = (n) => day(n).slice(0, 10);

// ── the three sample labs ────────────────────────────────────────────
const ACCOUNTS = [
  {
    name: "San Diego–Based Incubator",
    contact_email: "james@sd-incubator.com",
    address: "5414 Oberlin Drive, Ste. 150, San Diego, CA 92121",
    delivery_instructions: "Loading dock rear; cold-chain items to Suite 150 fridge. Contact James on arrival.",
    login: "james@sd-incubator.com",
    user: "James (SD Incubator)",
    signupKey: "SDINC-2026",
    inventory: [
      { sku: "TF-11965", on_hand: 2, reorder: 6, lot: "L2451-09", expiry: "2026-11-30", location: "Cold room A · Shelf 2" },
      { sku: "TF-26140", on_hand: 1, reorder: 4, lot: "FBS-3318", expiry: "2027-02-28", location: "Freezer −20 · Rack 1" },
      { sku: "SI-E7023", on_hand: 9, reorder: 4, lot: "—", expiry: null, location: "Solvent cabinet" },
      { sku: "FS-MCT15", on_hand: 18, reorder: 8, lot: "—", expiry: null, location: "Consumables · Bay 3" },
      { sku: "AG-5067", on_hand: 1, reorder: 2, lot: "AG-7781", expiry: "2027-01-31", location: "Bench 4" },
    ],
    orders: [
      { num: "PW-05001", status: "Delivered", po: "SDI-2026-114", carrier: "UPS", tracking: "1Z 99X 471 02 8841 330", urgency: "Medium", ago: 26, lines: [["TF-11965", 6], ["SI-E7023", 4]] },
      { num: "PW-05007", status: "In transit", po: "SDI-2026-121", carrier: "FedEx", tracking: "7712 0049 8830", urgency: "High", ago: 5, lines: [["AG-5067", 2], ["FS-MCT15", 6]] },
      { num: "PW-05012", status: "Processing", po: "SDI-2026-124", carrier: "", tracking: "", urgency: "Medium", ago: 1, lines: [["TF-26140", 2]] },
    ],
  },
  {
    name: "Helio Bio, Inc.",
    contact_email: "ops@heliobio.com",
    address: "10578 Science Center Dr, San Diego, CA 92121",
    delivery_instructions: "Front desk M–F 9–5. Antibodies must go to −20 immediately.",
    login: "ops@heliobio.com",
    user: "Helio Bio Ops",
    signupKey: "HELIO-2026",
    inventory: [
      { sku: "CS-4970", on_hand: 3, reorder: 2, lot: "AB-9914", expiry: "2027-06-30", location: "Freezer −20 · Box 7" },
      { sku: "CS-9664", on_hand: 1, reorder: 2, lot: "AB-7740", expiry: "2027-03-31", location: "Freezer −20 · Box 7" },
      { sku: "TF-25200", on_hand: 8, reorder: 6, lot: "TR-8841", expiry: "2026-09-15", location: "Freezer −20 · Rack 2" },
      { sku: "FS-T75", on_hand: 5, reorder: 3, lot: "—", expiry: null, location: "Consumables · Bay 1" },
    ],
    orders: [
      { num: "PW-05002", status: "Delivered", po: "HELIO-2026-088", carrier: "UPS", tracking: "1Z 99X 471 02 8612 904", urgency: "Low", ago: 34, lines: [["CS-4970", 2], ["AB-ab8245", 1]] },
      { num: "PW-05009", status: "Delivered", po: "HELIO-2026-093", carrier: "FedEx", tracking: "7712 0033 1180", urgency: "Medium", ago: 12, lines: [["TF-25200", 4], ["FS-T75", 2], ["TF-15140", 3]] },
    ],
  },
  {
    name: "Coastal Diagnostics",
    contact_email: "lab@coastaldx.com",
    address: "2510 Faraday Ave, Carlsbad, CA 92008",
    delivery_instructions: "Dock 3, 7am–2pm. Signature required.",
    login: "lab@coastaldx.com",
    user: "Coastal Dx Lab",
    signupKey: "COASTAL-2026",
    // deliberately below reorder points -> exercises the low-stock alerts
    inventory: [
      { sku: "BR-1725271", on_hand: 0, reorder: 2, lot: "SG-5521", expiry: "2026-10-31", location: "Freezer −20 · Rack 4" },
      { sku: "TK-R001A", on_hand: 1, reorder: 3, lot: "TK-2210", expiry: "2027-04-30", location: "Freezer −20 · Rack 3" },
      { sku: "FS-1256", on_hand: 4, reorder: 10, lot: "—", expiry: null, location: "Consumables · Bay 3" },
      { sku: "FS-96WP", on_hand: 2, reorder: 4, lot: "—", expiry: null, location: "Consumables · Bay 2" },
      { sku: "GB-A777", on_hand: 6, reorder: 2, lot: "AMP-1180", expiry: "2027-01-31", location: "Freezer −20 · Box 2" },
    ],
    orders: [
      { num: "PW-05004", status: "Delivered", po: "CDX-2026-041", carrier: "USPS", tracking: "9261 2910 4471 9920", urgency: "Medium", ago: 40, lines: [["FS-1256", 3], ["FS-96WP", 2]] },
      { num: "PW-05011", status: "Backordered", po: "CDX-2026-047", carrier: "", tracking: "", urgency: "High", ago: 3, lines: [["BR-1725271", 2], ["TK-R001A", 3]] },
    ],
  },
];

// ── helpers ──────────────────────────────────────────────────────────
async function ensureCompany(a) {
  const { data: existing } = await sb.from("companies").select("id,name").eq("name", a.name).maybeSingle();
  if (existing) return existing;
  const { data, error } = await sb
    .from("companies")
    .insert({
      name: a.name,
      contact_email: a.contact_email,
      address: a.address,
      delivery_instructions: a.delivery_instructions,
      allowed_domains: [],
    })
    .select("id,name")
    .single();
  if (error) throw new Error("company " + a.name + ": " + error.message);
  return data;
}

async function ensureLogin(a, company) {
  const { data: list } = await sb.auth.admin.listUsers({ page: 1, perPage: 200 });
  const found = list.users.find((u) => u.email === a.login);
  if (found) {
    await sb.auth.admin.updateUserById(found.id, { password: PASSWORD, email_confirm: true });
    return found;
  }
  // create through the real signup path: mint a one-time key, use it, burn it
  const tmp = "TMP-" + randomBytes(10).toString("hex");
  const { data: key } = await sb
    .from("signup_keys")
    .insert({ company_id: company.id, key_hash: sha(tmp), key_type: "company", is_active: true, max_uses: 1, uses: 0 })
    .select("id")
    .single();
  const { data, error } = await sb.auth.admin.createUser({
    email: a.login,
    password: PASSWORD,
    email_confirm: true,
    user_metadata: { full_name: a.user, signup_key: tmp },
  });
  await sb.from("signup_keys").delete().eq("id", key.id);
  if (error) throw new Error("login " + a.login + ": " + error.message);
  return data.user;
}

async function seedData(a, company, user, prices) {
  // wipe this account's operational rows so re-running is clean
  const { data: old } = await sb.from("pw_orders").select("id").eq("company_id", company.id);
  for (const o of old || []) await sb.from("pw_order_items").delete().eq("order_id", o.id);
  await sb.from("pw_orders").delete().eq("company_id", company.id);
  await sb.from("pw_inventory").delete().eq("company_id", company.id);
  await sb.from("pw_vendor_spend").delete().eq("company_id", company.id);

  // inventory
  if (a.inventory.length) {
    await sb.from("pw_inventory").insert(
      a.inventory.map((r) => ({ company_id: company.id, ...r, updated_at: new Date().toISOString() }))
    );
  }

  // orders + line items, and roll spend up per vendor
  const spend = {};
  for (const o of a.orders) {
    let total = 0, saved = 0;
    const items = o.lines.map(([sku, qty]) => {
      const p = prices[sku];
      total += p.price * qty;
      saved += (p.list - p.price) * qty;
      spend[p.vendor] = (spend[p.vendor] || 0) + p.price * qty;
      return { sku, name: p.name, vendor: p.vendor, qty, unit_price: p.price };
    });
    const { data: order, error } = await sb
      .from("pw_orders")
      .insert({
        company_id: company.id,
        order_num: o.num,
        status: o.status,
        po: o.po,
        ship: a.address,
        tracking: o.tracking || null,
        carrier: o.carrier || null,
        urgency: o.urgency,
        arrival: dstr(o.ago - 7),
        total,
        saved,
        created_by: user.id,
        created_at: day(o.ago),
      })
      .select("id")
      .single();
    if (error) throw new Error("order " + o.num + ": " + error.message);
    await sb.from("pw_order_items").insert(items.map((i) => ({ order_id: order.id, ...i })));
  }

  const spendRows = Object.entries(spend).map(([vendor, qtd_spend]) => ({ company_id: company.id, vendor, qtd_spend }));
  if (spendRows.length) await sb.from("pw_vendor_spend").upsert(spendRows, { onConflict: "company_id,vendor" });

  // a reusable signup key so more of their staff can self-register
  await sb.from("signup_keys").insert({
    company_id: company.id,
    key_hash: sha(a.signupKey),
    key_type: "company",
    is_active: true,
    max_uses: null,
    uses: 0,
  });
}

// ── run ──────────────────────────────────────────────────────────────
const { data: prodRows } = await sb.from("pw_products").select("sku,name,vendor,price,list").is("company_id", null);
const prices = Object.fromEntries((prodRows || []).map((p) => [p.sku, { ...p, price: Number(p.price), list: Number(p.list) }]));

console.log("Seeding 3 sample client accounts…\n");
const out = [];
for (const a of ACCOUNTS) {
  const company = await ensureCompany(a);
  const user = await ensureLogin(a, company);
  await seedData(a, company, user, prices);
  out.push([a.name, a.login, a.signupKey, a.orders.length, a.inventory.length]);
  console.log("✓ " + a.name);
}

console.log("\n" + "ACCOUNT".padEnd(28) + "LOGIN".padEnd(28) + "SIGNUP KEY".padEnd(16) + "ORDERS  INVENTORY");
for (const r of out) console.log(String(r[0]).padEnd(28) + String(r[1]).padEnd(28) + String(r[2]).padEnd(16) + String(r[3]).padEnd(8) + r[4]);
console.log("\nPassword for every sample login: " + PASSWORD);
if (!process.env.SEED_PASSWORD) {
  console.log("(generated — save it now. Set SEED_PASSWORD to choose your own.)");
}
