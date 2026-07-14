import type { NextConfig } from "next";

// The public marketing site is a set of self-contained pages exported from the
// design tool (public/site/*.html). They're served at clean URLs via rewrites.
// Everything else — /auth (login) and /app/* (the portal) — stays a normal
// Next.js React route.
const SITE_PAGES: Record<string, string> = {
  "/": "home",
  "/how-it-works": "how-it-works",
  "/areas-we-serve": "areas-we-serve",
  "/labs-we-support": "labs-we-support",
  "/prodigy-labs": "prodigy-labs",
  "/submit-order": "submit-order",
};

const nextConfig: NextConfig = {
  async rewrites() {
    return Object.entries(SITE_PAGES).map(([source, file]) => ({
      source,
      destination: `/site/${file}.html`,
    }));
  },
};

export default nextConfig;
