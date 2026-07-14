#!/usr/bin/env node
/**
 * ProcureWide — account management.
 *
 * Creating an account isn't just "insert an auth user": a DB trigger
 * (handle_new_user) requires a valid signup key and uses it to derive the
 * role + company. This tool works WITH that trigger — it mints a one-time key,
 * creates the user with it, then burns the key.
 *
 *   node scripts/pw-account.mjs list
 *   node scripts/pw-account.mjs create-user  --email a@b.com --password 'x' --company third_test_company [--name "Jane Doe"] [--pw-admin]
 *   node scripts/pw-account.mjs create-admin --email a@b.com --password 'x' [--name "Jane Doe"]
 *   node scripts/pw-account.mjs set-pw-admin --email a@b.com [--off]
 *   node scripts/pw-account.mjs reset-password --email a@b.com --password 'newpass'
 *   node scripts/pw-account.mjs mint-key --type company --company third_test_company --key 'LAB-2026-XYZ' [--max-uses 5]
 *   node scripts/pw-account.mjs delete-user --email a@b.com
 */
import { createClient } from "@supabase/supabase-js";
import { createHash, randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// ── env ──────────────────────────────────────────────────────────────
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
try {
  readFileSync(join(root, ".env.local"), "utf8").split("\n").forEach((l) => {
    const i = l.indexOf("=");
    if (i > 0 && !l.trim().startsWith("#")) process.env[l.slice(0, i).trim()] ??= l.slice(i + 1).trim();
  });
} catch {}

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !SERVICE) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (.env.local)");
  process.exit(1);
}
const sb = createClient(URL, SERVICE, { auth: { persistSession: false } });

// ── args ─────────────────────────────────────────────────────────────
const [cmd, ...rest] = process.argv.slice(2);
const arg = (n, d = undefined) => {
  const i = rest.indexOf("--" + n);
  return i === -1 ? d : rest[i + 1];
};
const flag = (n) => rest.includes("--" + n);

const sha = (s) => "\\x" + createHash("sha256").update(s).digest("hex");
const die = (m) => { console.error("✗ " + m); process.exit(1); };
const ok = (m) => console.log("✓ " + m);

async function findCompany(nameOrId) {
  if (!nameOrId) return null;
  const { data } = await sb.from("companies").select("id,name");
  return (data || []).find((c) => c.id === nameOrId || c.name.toLowerCase() === String(nameOrId).toLowerCase()) || null;
}

/** Mint a temp one-time key, create the user through the trigger, burn the key. */
async function createAccount({ email, password, name, keyType, company }) {
  if (!email || !password) die("--email and --password are required");

  const plaintext = "TMP-" + randomBytes(12).toString("hex");
  const { data: key, error: kerr } = await sb
    .from("signup_keys")
    .insert({
      company_id: company?.id ?? null,
      key_hash: sha(plaintext),
      key_type: keyType,
      is_active: true,
      max_uses: 1,
      uses: 0,
    })
    .select("id")
    .single();
  if (kerr) die("could not mint signup key: " + kerr.message);

  const { data, error } = await sb.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // no confirmation email needed
    user_metadata: { full_name: name || email.split("@")[0], signup_key: plaintext },
  });

  // burn the temp key no matter what
  await sb.from("signup_keys").delete().eq("id", key.id);

  if (error) die("createUser failed: " + error.message);

  const { data: prof } = await sb.from("profiles").select("role, company_id, username").eq("id", data.user.id).maybeSingle();
  if (!prof) die("user created but no profile row — the trigger rejected the key");

  ok(`created ${email}`);
  console.log(`    role:     ${prof.role}`);
  console.log(`    company:  ${company ? company.name : "(none)"}`);
  console.log(`    password: ${password}`);
  return data.user;
}

// ── commands ─────────────────────────────────────────────────────────
switch (cmd) {
  case "list": {
    const { data: users } = await sb.auth.admin.listUsers({ page: 1, perPage: 200 });
    const { data: profs } = await sb.from("profiles").select("id, username, role, company_id, is_pw_admin");
    const { data: comps } = await sb.from("companies").select("id, name");
    const cname = Object.fromEntries((comps || []).map((c) => [c.id, c.name]));
    const byId = Object.fromEntries((profs || []).map((p) => [p.id, p]));

    console.log("\nCOMPANIES");
    (comps || []).forEach((c) => console.log("  " + c.name));

    console.log("\nACCOUNTS");
    console.log("  " + "EMAIL".padEnd(34) + "ROLE".padEnd(16) + "COMPANY".padEnd(22) + "PW-ADMIN");
    for (const u of users.users) {
      const p = byId[u.id];
      console.log(
        "  " +
          (u.email || "?").padEnd(34) +
          (p?.role || "NO PROFILE").padEnd(16) +
          (p?.company_id ? cname[p.company_id] || "?" : "-").padEnd(22) +
          (p?.is_pw_admin ? "YES" : "")
      );
    }
    console.log("");
    break;
  }

  case "create-user": {
    const company = await findCompany(arg("company"));
    if (!company) die("--company is required (name or id). Run `list` to see them.");
    const user = await createAccount({
      email: arg("email"), password: arg("password"), name: arg("name"),
      keyType: "company", company,
    });
    if (flag("pw-admin")) {
      await sb.from("profiles").update({ is_pw_admin: true }).eq("id", user.id);
      ok("also granted ProcureWide operator (is_pw_admin)");
    }
    break;
  }

  case "create-admin": {
    await createAccount({
      email: arg("email"), password: arg("password"), name: arg("name"),
      keyType: "app_admin", company: null,
    });
    console.log("    note: app_admin has no company, so it uses /dashboard.");
    console.log("          For a PORTAL admin, prefer: create-user --pw-admin");
    break;
  }

  case "set-pw-admin": {
    const email = arg("email") || die("--email required");
    const { data: users } = await sb.auth.admin.listUsers({ page: 1, perPage: 200 });
    const u = users.users.find((x) => x.email === email) || die("no such user: " + email);
    const on = !flag("off");
    const { error } = await sb.from("profiles").update({ is_pw_admin: on }).eq("id", u.id);
    if (error) die(error.message);
    ok(`${email} is_pw_admin = ${on}`);
    break;
  }

  case "reset-password": {
    const email = arg("email") || die("--email required");
    const password = arg("password") || die("--password required");
    const { data: users } = await sb.auth.admin.listUsers({ page: 1, perPage: 200 });
    const u = users.users.find((x) => x.email === email) || die("no such user: " + email);
    const { error } = await sb.auth.admin.updateUserById(u.id, { password, email_confirm: true });
    if (error) die(error.message);
    ok(`password reset for ${email} -> ${password}`);
    break;
  }

  case "mint-key": {
    // A reusable key you hand to a lab so THEY can self-signup at /auth.
    const type = arg("type", "company");
    const keyPlain = arg("key") || die("--key 'SOME-PLAINTEXT' required (this is what you hand out)");
    const company = type === "company" ? await findCompany(arg("company")) : null;
    if (type === "company" && !company) die("--company required for a company key");
    const { error } = await sb.from("signup_keys").insert({
      company_id: company?.id ?? null,
      key_hash: sha(keyPlain),
      key_type: type,
      is_active: true,
      max_uses: arg("max-uses") ? Number(arg("max-uses")) : null,
      uses: 0,
    });
    if (error) die(error.message);
    ok(`minted ${type} key for ${company ? company.name : "(no company)"}`);
    console.log(`    key: ${keyPlain}   <- give this to the person signing up at /auth`);
    console.log("    (only the hash is stored — save this now, it can't be recovered)");
    break;
  }

  case "delete-user": {
    const email = arg("email") || die("--email required");
    const { data: users } = await sb.auth.admin.listUsers({ page: 1, perPage: 200 });
    const u = users.users.find((x) => x.email === email) || die("no such user: " + email);
    const { error } = await sb.auth.admin.deleteUser(u.id);
    if (error) die(error.message);
    ok("deleted " + email);
    break;
  }

  default:
    console.log(readFileSync(fileURLToPath(import.meta.url), "utf8").split("*/")[0].split("/**")[1].replace(/^\s*\*ic?/gm, "").replace(/^\s*\* ?/gm, ""));
}
