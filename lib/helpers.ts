import { useToast } from "@/hooks/use-toast";
import { OrderRow } from "@/types";
import { useMemo } from "react";

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

export const sanitizeFilename = (s: string) =>
  s
    .replace(/[^\w\-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");

export const formatMoney = (v: string | null) =>
    v == null
      ? "—"
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(Number(v));

export const parseDateTime = (o: OrderRow) => {
    const ms = o.order_time.includes(".")
      ? o.order_time.split(".")[1].slice(0, 3).padEnd(3, "0")
      : "000";
    const timeNoFrac = o.order_time.split(".")[0]; // "21:33:15"
    // "2026-01-03T21:33:15.803"
    return new Date(`${o.order_date}T${timeNoFrac}.${ms}`);
  };

export const getBillingPeriod = (dt: Date) => {
    const y = dt.getFullYear();
    const m = dt.getMonth(); // 0-11
    const d = dt.getDate(); // 1-31

    // If it's the 21st or later, period starts this month on the 21st.
    // Otherwise, period starts last month on the 21st.
    const start = d >= 21 ? new Date(y, m, 21) : new Date(y, m - 1, 21);

    // Period ends on the 20th of the next month
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 20);

    const fmt = (x: Date) =>
      x.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

    const label = `${fmt(start)} – ${fmt(end)}`;

    // Key by the start date (always unique for each period)
    const key = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(
      2,
      "0"
    )}-21`;

    return { start, end, key, label };
  };

// Drop-in: validation + toast-driven safety check for your questionnaire submit.
// Assumes you already have: const { toast } = useToast();

type Frequency = "weekly" | "monthly" | "rarely" | "never" | "";

type QuestionnairePayload = {
  pains: string[];
  painOther: string | null;
  orderingProcess: string | null;
  orderingPeople: string | null;
  categories: string[];
  frequencies: {
    rushOrders: Frequency | null;
    stockouts: Frequency | null;
    duplicatePurchases: Frequency | null;
  };
  contract: {
    legalName: string | null;
    preferredStartDate: string | null;
    monthlySpend: string | null;
    mailingAddress: string | null;
    contacts: string | null;
  };
};


export function useQuestionnaireValidation({
  pains,
  painOther,
  orderingProcess,
  orderingPeople,
  categories,
  rushOrders,
  stockouts,
  duplicates,
  legalName,
  preferredStartDate,
  monthlySpend,
  mailingAddress,
  contacts,
}: {
  pains: string[];
  painOther: string;
  orderingProcess: string;
  orderingPeople: string;
  categories: string[];
  rushOrders: Frequency;
  stockouts: Frequency;
  duplicates: Frequency;
  legalName: string;
  preferredStartDate: string;
  monthlySpend: string;
  mailingAddress: string;
  contacts: string;
}) {
  const { toast } = useToast();

  // If you later add an explicit "Other" checkbox, make this conditional on that.
  const otherIsRequired = false; // set true only if you add an "Other" option checkbox

  const validateOrToast = (): { ok: true; payload: QuestionnairePayload } | { ok: false } => {
    // Gather missing fields in a friendly order
    const missing: string[] = [];

    if (!pains.length) missing.push("At least one pain point");
    if (otherIsRequired && !painOther.trim()) missing.push("Other pain description");

    if (!orderingProcess.trim()) missing.push("Current ordering process");
    if (!orderingPeople.trim()) missing.push("Who is in charge of ordering");

    if (!categories.length) missing.push("At least one important category");

    if (!rushOrders) missing.push("Rush orders frequency");
    if (!stockouts) missing.push("Stockouts/backorders frequency");
    if (!duplicates) missing.push("Duplicate purchases frequency");

    if (!legalName.trim()) missing.push("Legal name of company");
    if (!preferredStartDate.trim()) missing.push("Preferred start date");
    if (!monthlySpend.trim()) missing.push("Monthly spend estimate");
    if (!mailingAddress.trim()) missing.push("Permanent mailing address");
    if (!contacts.trim()) missing.push("Contact person(s) & contact info");

    if (missing.length) {
      toast({
        title: "Input Error",
        description:
          missing.length === 1
            ? `Missing: ${missing[0]}`
            : `Please fill out: ${missing.slice(0, 4).join(", ")}${
                missing.length > 4 ? ` +${missing.length - 4} more` : ""
              }`,
      });
      return { ok: false };
    }

    const payload: QuestionnairePayload = {
      pains,
      painOther: painOther.trim() || null,
      orderingProcess: orderingProcess.trim() || null,
      orderingPeople: orderingPeople.trim() || null,
      categories,
      frequencies: {
        rushOrders: rushOrders || null,
        stockouts: stockouts || null,
        duplicatePurchases: duplicates || null,
      },
      contract: {
        legalName: legalName.trim() || null,
        preferredStartDate: preferredStartDate.trim() || null,
        monthlySpend: monthlySpend.trim() || null,
        mailingAddress: mailingAddress.trim() || null,
        contacts: contacts.trim() || null,
      },
    };

    return { ok: true, payload };
  };

  // Optional: disable submit button until valid
  const canSubmit = useMemo(() => {
    return (
      pains.length > 0 &&
      orderingProcess.trim().length > 0 &&
      orderingPeople.trim().length > 0 &&
      categories.length > 0 &&
      rushOrders !== "" &&
      stockouts !== "" &&
      duplicates !== "" &&
      legalName.trim().length > 0 &&
      preferredStartDate.trim().length > 0 &&
      monthlySpend.trim().length > 0 &&
      mailingAddress.trim().length > 0 &&
      contacts.trim().length > 0 &&
      (!otherIsRequired || painOther.trim().length > 0)
    );
  }, [
    pains,
    orderingProcess,
    orderingPeople,
    categories,
    rushOrders,
    stockouts,
    duplicates,
    legalName,
    preferredStartDate,
    monthlySpend,
    mailingAddress,
    contacts,
    painOther,
    otherIsRequired,
  ]);

  return { canSubmit, validateOrToast };
}


// Formatting Slack Messages ----------------------------------------------------------------------
const clamp = (s: string, max = 3500) => (s.length > max ? s.slice(0, max) + "…" : s);
const lines: string[] = [];
const safe = (v: any) => (v ? String(v) : "_(missing)_");

type OrderItem = {
  id: string;
  supplierName: string;
  sku: string;
  description: string;
  itemLink: string;
  units: number;
  uom: string;
  unitPrice: number;
};


export const getPricingFormatSlackMessage = (payload: any) => {

  lines.push(`*Get Pricing Form Submitted!* :memo:`);
  lines.push(`*Company:* ${payload.company.legalName} `);
  lines.push(`\n*Contacts:*`);
  lines.push(payload.company.contacts);
  lines.push("*Comments*")
  lines.push(payload.company.comments ? clamp(payload.company.comments) : "_(missing)_");

   const items = (payload?.items ?? []) as OrderItem[];
  lines.push(`\n*Items:*`);
  if (!items.length) {
    lines.push("_(none)_");
  } else {
    items.forEach((it, idx) => {
      const qty = Number(it.units);
      const unit = Number(it.unitPrice);

      // Slack link format: <url|text>
      const link = it.itemLink ? `<${it.itemLink}|link>` : "_(missing)_";

      // One item = one (wrapped) bullet entry
      lines.push(
        `• *${idx + 1}.* ${safe(it.description)}\n` +
          `  Supplier: ${safe(it.supplierName)} | Item Number: ${it.sku ? `\`${it.sku}\`` : "_(missing)_"}\n` +
          `  Quantity: *${Number.isFinite(qty) ? qty : "_(missing)_"}* | Unit of Measure: ${safe(it.uom)} | Unit Price: ${money(unit)}}\n` +
          `  Link: ${link}`
      );
    });
  }
  return lines.join("\n");
};

export const formatSlackMessage = (payload: any) => {

  lines.push(`*Questionnaire Form Submitted!* :memo:`);
  lines.push(`*Company:* ${payload.contract?.legalName ? `\`${payload.contract.legalName}\`` : "_(missing)_"} `);
  lines.push(`*Preferred start date:* ${payload.contract?.preferredStartDate ? `\`${payload.contract.preferredStartDate}\`` : "_(missing)_"}`);
  lines.push(`*Monthly spend estimate:* ${payload.contract?.monthlySpend ? `\`${payload.contract.monthlySpend}\`` : "_(missing)_"}`);
  lines.push(`*Mailing address:* ${payload.contract?.mailingAddress ? `\`${payload.contract.mailingAddress}\`` : "_(missing)_"}`);

  lines.push(`\n*Ordering owners:* ${payload.orderingPeople ? payload.orderingPeople : "_(missing)_"}\n`);

  if (payload.pains?.length) {
    lines.push(`*Pains:*`);
    for (const p of payload.pains) lines.push(`• ${p}`);
  } else {
    lines.push(`*Pains:* _(none selected)_`);
  }

  if (payload.painOther) lines.push(`• Other: ${payload.painOther}`);

  if (payload.categories?.length) {
    lines.push(`\n*Key categories:* ${payload.categories.map((c: string) => `\`${c}\``).join(", ")}`);
  }

  lines.push(
    `\n*Frequency:*\n• Rush orders: \`${payload.frequencies?.rushOrders ?? "—"}\`\n• Stockouts: \`${payload.frequencies?.stockouts ?? "—"}\`\n• Duplicate purchases: \`${payload.frequencies?.duplicatePurchases ?? "—"}\``
  );

  lines.push(`\n*Ordering process summary:*`);
  lines.push(payload.orderingProcess ? clamp(payload.orderingProcess) : "_(missing)_");

  // const raw = JSON.stringify(payload, null, 2);
  // lines.push(`\n*Raw JSON (debug):*\n\`\`\`${clamp(raw, 3500)}\`\`\``);

  return lines.join("\n");
};

export const formatSlackNewOrder = (payload: any) => {
  const msg =
  `*New Order Submitted!* :package:\n` +
  `• *Items:* ${payload.items_amt}\n` +
  `• *Company:* ${payload.companyName}\n` +
  `• *User:* ${payload.userName}`;
  `• *Go to Order:* ${payload.url}`

  return msg
}