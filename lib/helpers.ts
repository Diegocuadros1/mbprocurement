export const money = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    Number.isFinite(n) ? n : 0
  );

export function safeTime(t: string | null | undefined) {
  if (!t) return "";

  // supports "HH:MM" or "HH:MM:SS"
  const [hhStr, mmStr] = t.split(":");
  const hh = Number(hhStr);
  const mm = Number(mmStr ?? "0");

  if (!Number.isFinite(hh) || !Number.isFinite(mm)) return "";

  const period = hh >= 12 ? "PM" : "AM";
  const hour12 = ((hh + 11) % 12) + 1; // 0 -> 12, 13 -> 1, etc.
  const minute2 = String(mm).padStart(2, "0");

  return `${hour12}:${minute2} ${period}`;
}

export const toNumber = (v: unknown) => {
  const n = typeof v === "string" ? Number(v) : typeof v === "number" ? v : NaN;
  return Number.isFinite(n) ? n : 0;
};

export const normalizeUrl = (raw: string) => {
  const v = raw.trim();
  if (!v) return "";
  if (v.startsWith("http://") || v.startsWith("https://")) return v;
  return `https://${v}`;
};