// ProcureWide pricing framework — the discount "parameters" the portal runs on.
// Ported verbatim from the design prototype's store, refactored into pure
// functions that take explicit inputs (no global Store). Safe on server+client.

import type { PwProduct, PwCartLine } from "./types";

// Spend-tier guarantees per vendor (quarter-to-date based).
// "Spend $5,000 on Thermo → we guarantee $1,000 off your order."
export const SPEND_TIERS: Record<string, { at: number; save: number }[]> = {
  thermo: [{ at: 2500, save: 300 }, { at: 5000, save: 1000 }, { at: 10000, save: 2500 }],
  fisher: [{ at: 1500, save: 150 }, { at: 4000, save: 600 }, { at: 8000, save: 1600 }],
  cst: [{ at: 2000, save: 250 }, { at: 5000, save: 850 }],
  abcam: [{ at: 1500, save: 180 }, { at: 4000, save: 640 }],
  biorad: [{ at: 1500, save: 200 }, { at: 4000, save: 720 }],
  sigma: [{ at: 1000, save: 120 }, { at: 3000, save: 480 }],
};

// Per-product volume tiers (buy N+ units, % off your line).
export const VOLUME_TIERS: { qty: number; off: number }[] = [
  { qty: 5, off: 0.05 },
  { qty: 10, off: 0.1 },
  { qty: 25, off: 0.16 },
];

// Whole-order consolidation rate: route your ENTIRE order through this vendor → % off.
export const CONSOLIDATION: Record<string, number> = {
  thermo: 0.28,
  fisher: 0.18,
  biorad: 0.16,
  cst: 0.15,
  abcam: 0.14,
  sigma: 0.12,
};

export type ProductMap = Record<string, PwProduct>;

export function lineVolumeOff(qty: number): number {
  let off = 0;
  for (const t of VOLUME_TIERS) if (qty >= t.qty) off = t.off;
  return off;
}

export function linePricing(product: PwProduct | undefined, qty: number) {
  if (!product) return { gross: 0, off: 0, net: 0, offPct: 0 };
  const gross = product.price * qty;
  const offPct = lineVolumeOff(qty);
  const off = gross * offPct;
  return { gross, off, net: gross - off, offPct };
}

export type SpendStatus = {
  booked: number;
  total: number;
  current: { at: number; save: number } | null;
  next: { at: number; save: number } | null;
  guaranteed: number;
  toNext: number;
  tiers: { at: number; save: number }[];
};

// Spend-tier status for a vendor given booked spend + (optional) cart additions.
export function spendStatus(vendorKey: string, booked: number, extra = 0): SpendStatus {
  const tiers = SPEND_TIERS[vendorKey];
  const total = booked + extra;
  if (!tiers) return { booked, total, current: null, next: null, guaranteed: 0, toNext: 0, tiers: [] };
  let current: { at: number; save: number } | null = null;
  let next: { at: number; save: number } | null = null;
  for (const t of tiers) {
    if (total >= t.at) current = t;
    else {
      next = t;
      break;
    }
  }
  return {
    booked,
    total,
    current,
    next,
    guaranteed: current ? current.save : 0,
    toNext: next ? next.at - total : 0,
    tiers,
  };
}

export type CartVendorGroup = {
  vendor: string;
  lines: (PwCartLine & { p: PwProduct; gross: number; off: number; net: number; offPct: number })[];
  net: number;
  spend: SpendStatus;
  spendBase: SpendStatus;
  tierCredit: number;
};

export type CartSummary = {
  vendorGroups: CartVendorGroup[];
  itemsGross: number;
  volumeOff: number;
  spendGuarantee: number;
  afterVolume: number;
  total: number;
  itemCount: number;
};

// Cart grouped by vendor with discount summary.
export function cartSummary(
  cart: PwCartLine[],
  products: ProductMap,
  bookedSpend: Record<string, number>
): CartSummary {
  const groups: Record<string, CartVendorGroup> = {};
  let itemsGross = 0,
    volumeOff = 0,
    itemCount = 0;
  cart.forEach((line) => {
    const p = products[line.sku];
    if (!p) return;
    const lp = linePricing(p, line.qty);
    itemsGross += lp.gross;
    volumeOff += lp.off;
    itemCount += line.qty;
    if (!groups[p.vendor])
      groups[p.vendor] = {
        vendor: p.vendor,
        lines: [],
        net: 0,
        spend: spendStatus(p.vendor, 0),
        spendBase: spendStatus(p.vendor, 0),
        tierCredit: 0,
      };
    groups[p.vendor].lines.push({ ...line, p, ...lp });
    groups[p.vendor].net += lp.net;
  });
  let spendGuarantee = 0;
  const vendorGroups = Object.values(groups).map((g) => {
    const base = spendStatus(g.vendor, bookedSpend[g.vendor] || 0, 0);
    const st = spendStatus(g.vendor, bookedSpend[g.vendor] || 0, g.net);
    const tierCredit = Math.min(Math.max(0, st.guaranteed - base.guaranteed), g.net);
    spendGuarantee += tierCredit;
    return { ...g, spend: st, spendBase: base, tierCredit };
  });
  const afterVolume = itemsGross - volumeOff;
  const total = Math.max(0, afterVolume - spendGuarantee);
  return { vendorGroups, itemsGross, volumeOff, spendGuarantee, afterVolume, total, itemCount };
}

export function consolidationOffer(summary: CartSummary) {
  const sub = summary.afterVolume;
  if (sub <= 0 || summary.vendorGroups.length < 1) return null;
  type Best = { vendor: string; rate: number; save: number };
  let best: Best | null = null;
  Object.entries(CONSOLIDATION).forEach(([v, rate]) => {
    const save = sub * rate;
    if (!best || save > best.save) best = { vendor: v, rate, save };
  });
  if (!best) return null;
  const chosen: Best = best;
  const grp = summary.vendorGroups.find((g) => g.vendor === chosen.vendor);
  return {
    vendor: chosen.vendor,
    rate: chosen.rate,
    save: chosen.save,
    alreadyPct: grp ? grp.net / sub : 0,
    vendors: summary.vendorGroups.length,
    subtotal: sub,
  };
}

// ---------- lead time / arrival ----------
export function leadMaxDays(p?: PwProduct): number {
  if (!p || !p.lead) return 5;
  const m = String(p.lead).match(/(\d+)(?!.*\d)/);
  return m ? parseInt(m[1], 10) : 5;
}
export function lineArrivalDays(p?: PwProduct): number {
  return leadMaxDays(p);
}
export function orderArrivalDays(lines: PwCartLine[], products: ProductMap): number {
  let d = 0;
  lines.forEach((l) => {
    const p = products[l.sku];
    if (p) d = Math.max(d, lineArrivalDays(p));
  });
  return d;
}
export function addDays(n: number): string {
  const dt = new Date();
  dt.setDate(dt.getDate() + (n || 0));
  return dt.toISOString().slice(0, 10);
}

// ---------- formatting ----------
export function money(n: number): string {
  return "$" + (n || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
export function money0(n: number): string {
  return "$" + Math.round(n || 0).toLocaleString("en-US");
}

export function invStatus(row: { on_hand: number; reorder: number }): "out" | "low" | "ok" {
  if (row.on_hand <= 0) return "out";
  if (row.on_hand <= row.reorder) return "low";
  return "ok";
}
