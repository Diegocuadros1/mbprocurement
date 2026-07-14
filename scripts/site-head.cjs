/**
 * The design tool exports the site pages with an empty <head> — no <title>,
 * no favicon, no description. That's why the browser tab showed a bare URL and
 * a generic globe icon (and search engines had nothing to show either).
 *
 * This injects proper metadata into every static page in public/site.
 * Re-run it any time the pages are re-exported:  node scripts/site-head.cjs
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE = path.join(ROOT, "public", "site");
const ORIGIN = "https://www.procurewide.com";

const PAGES = {
  "home.html": {
    url: "/",
    title: "ProcureWide — Lab supply, equipment & software for San Diego biotech",
    desc: "San Diego's lab supply, equipment, and software partner. Sourced across our vendor network, consolidated at our facility, delivered on our own routes. Stock the bench. Scale the science.",
  },
  "how-it-works.html": {
    url: "/how-it-works",
    title: "How it works — ProcureWide",
    desc: "Request items, we source them across our vendor network, consolidate at our facility, and deliver on our own routes — with one itemized bill a month.",
  },
  "areas-we-serve.html": {
    url: "/areas-we-serve",
    title: "Areas we serve — ProcureWide",
    desc: "Scheduled delivery routes across San Diego — from Sorrento Valley and Torrey Pines to Carlsbad and beyond.",
  },
  "labs-we-support.html": {
    url: "/labs-we-support",
    title: "Labs we support — ProcureWide",
    desc: "From early-stage biotech and academic cores to diagnostics and manufacturing — the labs ProcureWide keeps stocked.",
  },
  "prodigy-labs.html": {
    url: "/prodigy-labs",
    title: "Prodigy Labs — ProcureWide",
    desc: "ProcureWide is an affiliate of Prodigy Labs — a San Diego research lab, biotech incubator, and laboratory software platform.",
  },
  "submit-order.html": {
    url: "/submit-order",
    title: "Submit an order — ProcureWide",
    desc: "Send us what your lab buys and we'll come back with pricing across our vendor network — no commitment.",
  },
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

let done = 0;
for (const [file, meta] of Object.entries(PAGES)) {
  const p = path.join(SITE, file);
  if (!fs.existsSync(p)) continue;
  let html = fs.readFileSync(p, "utf8");

  // remove anything we previously injected so this is idempotent
  html = html.replace(/\n?<!-- pw:head -->[\s\S]*?<!-- \/pw:head -->/g, "");
  // and strip any pre-existing title/icon so we don't double up
  html = html.replace(/<title>[\s\S]*?<\/title>/gi, "");

  const head = `
<!-- pw:head -->
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.desc)}">
<link rel="canonical" href="${ORIGIN}${meta.url}">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta name="theme-color" content="#0A1530">
<meta property="og:type" content="website">
<meta property="og:site_name" content="ProcureWide">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.desc)}">
<meta property="og:url" content="${ORIGIN}${meta.url}">
<meta property="og:image" content="${ORIGIN}/apple-touch-icon.png">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(meta.title)}">
<meta name="twitter:description" content="${esc(meta.desc)}">
<!-- /pw:head -->`;

  // inject right after <head>
  html = html.replace(/<head>/i, "<head>" + head);
  fs.writeFileSync(p, html);
  done++;
  console.log("  " + file.padEnd(24) + '"' + meta.title + '"');
}
console.log("\ninjected <head> metadata into " + done + " pages");
