"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PW, SLDS_BLUE } from "@/lib/portal/pw";
import {
  PageHeader, SectionCard, AppButton, CsvUpload, StatusPill, VendorMark,
  Icon, ObjIcon, EmptyState, Toast, Kpi, Progress, UrgencyPill, fmtDate,
} from "@/components/portal/kit";
import { money, money0 } from "@/lib/portal/pricing";
import { toCSV, downloadText } from "@/lib/portal/csv";
import { reorderToCartAction, importCartRowsAction } from "@/lib/portal/actions";
import type { PwOrder, PwOrderItem, PwVendor, PwProduct } from "@/lib/portal/types";

type Account = { name: string; initials: string; plan: string; quarter: string };
type Tone = "neutral" | "success" | "warning" | "danger" | "info";

function statusTone(status: string): Tone {
  return (
    {
      Delivered: "success",
      "In transit": "info",
      Processing: "warning",
      Backordered: "danger",
      Cancelled: "danger",
    } as Record<string, Tone>
  )[status] || "neutral";
}

// The order "date" in the new data model is created_at (an ISO timestamp).
function orderDate(o: PwOrder): string {
  return (o.created_at || "").slice(0, 10);
}

// Reference "now" anchored to the latest order so date ranges partition seed data
// sensibly regardless of the runtime clock.
function refNow(orders: PwOrder[]): number {
  const ds = orders
    .map((o) => new Date(orderDate(o) + "T00:00:00").getTime())
    .filter((n) => !isNaN(n));
  return Math.max(ds.length ? Math.max(...ds) : Date.now(), Date.now());
}

const RANGES: [string, string, number][] = [
  ["30d", "Last 30 days", 30],
  ["60d", "Last 60 days", 60],
  ["90d", "Last 90 days", 90],
  ["6m", "Last 6 months", 182],
  ["1y", "Last year", 365],
  ["3y", "Last 3 years", 1095],
  ["all", "All time", Infinity],
];

function orderLines(o: PwOrder): PwOrderItem[] {
  return o.pw_order_items || [];
}
function lineTotal(l: PwOrderItem): number {
  return (l.unit_price || 0) * (l.qty || 0);
}

function OrderRow({
  o, expanded, onToggle, onReorder, vendors, productMapObj, pending,
}: {
  o: PwOrder;
  expanded: boolean;
  onToggle: () => void;
  onReorder: (o: PwOrder) => void;
  vendors: Record<string, PwVendor>;
  productMapObj: Record<string, PwProduct>;
  pending: boolean;
}) {
  const lines = orderLines(o);
  const vendorKeys = [...new Set(lines.map((l) => l.vendor).filter(Boolean))] as string[];
  const itemCount = lines.reduce((a, l) => a + l.qty, 0);
  const date = orderDate(o);
  return (
    <div style={{ borderBottom: `1px solid ${PW.line}` }}>
      <div onClick={onToggle} style={{
        display: "grid", gridTemplateColumns: "110px 1fr 150px 120px 100px 110px 36px",
        gap: 12, alignItems: "center", padding: "12px 16px", cursor: "pointer",
        background: expanded ? "#FAFBF7" : PW.white,
      }}>
        <span style={{ fontFamily: PW.mono, fontSize: 12.5, color: SLDS_BLUE, fontWeight: 500 }}>{o.order_num}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
          <div style={{ display: "flex", gap: 4 }}>
            {vendorKeys.slice(0, 3).map((v) => (
              <VendorMark key={v} vendor={vendors[v] || { key: v, name: v, logo: null }} height={13} withName={false} />
            ))}
          </div>
          <span style={{ fontFamily: PW.sans, fontSize: 12.5, color: PW.ink500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {itemCount} item{itemCount !== 1 ? "s" : ""} · {lines.length} line{lines.length !== 1 ? "s" : ""}
          </span>
        </div>
        {/* Tracking */}
        <span style={{ minWidth: 0 }}>
          {o.tracking ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Icon name="truck" size={12} color={PW.mute} />
              <span style={{ fontFamily: PW.mono, fontSize: 11, color: PW.ink500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.tracking}</span>
            </span>
          ) : (
            <span style={{ fontFamily: PW.sans, fontSize: 11.5, color: PW.mute }}>—</span>
          )}
        </span>
        <span style={{ fontFamily: PW.sans, fontSize: 12.5, color: PW.mute }}>{fmtDate(date)}</span>
        <span style={{ fontFamily: PW.sans, fontWeight: 700, fontSize: 13.5, color: PW.ink, fontVariantNumeric: "tabular-nums" }}>{money(o.total)}</span>
        <span><StatusPill tone={statusTone(o.status)}>{o.status}</StatusPill></span>
        <span style={{ display: "flex", justifyContent: "flex-end", color: PW.mute, transform: expanded ? "rotate(180deg)" : "none", transition: "transform 160ms ease" }}>
          <Icon name="chevron" size={16} />
        </span>
      </div>

      {expanded && (
        <div style={{ padding: "4px 16px 16px", background: "#FAFBF7" }}>
          {/* Meta strip */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", margin: "6px 0 12px" }}>
            {o.urgency && <UrgencyPill level={o.urgency} />}
            {o.tracking && (
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 9px", borderRadius: 12,
                background: "#EAF1FB", fontFamily: PW.sans, fontSize: 11.5, color: "#1E4FB0", fontWeight: 600,
              }}>
                <Icon name="truck" size={12} /> {o.carrier ? o.carrier + " · " : ""}{o.tracking}
              </span>
            )}
            {o.need_by && <span style={{ fontFamily: PW.sans, fontSize: 12, color: PW.mute }}>Needed by <b style={{ color: PW.ink500 }}>{fmtDate(o.need_by)}</b></span>}
            {o.arrival && o.status !== "Delivered" && <span style={{ fontFamily: PW.sans, fontSize: 12, color: PW.mute }}>Est. arrival <b style={{ color: PW.ink500 }}>{fmtDate(o.arrival)}</b></span>}
          </div>

          <div style={{ border: `1px solid ${PW.line}`, borderRadius: 4, overflow: "hidden", background: PW.white }}>
            {lines.map((l, i) => {
              const p = productMapObj[l.sku];
              const vendorKey = l.vendor || (p ? p.vendor : "");
              return (
                <div key={l.sku} style={{
                  display: "grid", gridTemplateColumns: "40px 1fr 130px 90px", gap: 10, alignItems: "center",
                  padding: "9px 14px", borderBottom: i === lines.length - 1 ? 0 : `1px solid ${PW.line}`,
                  fontFamily: PW.sans, fontSize: 13,
                }}>
                  <span style={{ fontFamily: PW.mono, fontSize: 12, color: PW.mute }}>{l.qty}×</span>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ color: PW.ink, fontWeight: 500 }}>{l.name || (p ? p.name : l.sku)}</span>
                    {p && p.catalog_no && <span style={{ fontFamily: PW.mono, fontSize: 11, color: PW.mute, marginLeft: 8 }}>{p.catalog_no}</span>}
                  </div>
                  <span style={{ fontFamily: PW.sans, fontSize: 12, color: PW.ink500 }}>{vendors[vendorKey]?.name || vendorKey || "—"}</span>
                  <span style={{ fontFamily: PW.mono, fontSize: 12.5, color: PW.ink, textAlign: "right" }}>{money(lineTotal(l))}</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
            {o.po && <span style={{ fontFamily: PW.sans, fontSize: 12, color: PW.mute }}>PO <b style={{ fontFamily: PW.mono, color: PW.ink500 }}>{o.po}</b></span>}
            {o.saved > 0 && <span style={{ fontFamily: PW.sans, fontSize: 12, color: "#0A7048", fontWeight: 600 }}>Saved {money(o.saved)}</span>}
            <span style={{ flex: 1 }} />
            <AppButton variant="secondary" size="sm" icon="refresh" disabled={pending}
              onClick={() => onReorder(o)}>
              Reorder
            </AppButton>
          </div>
        </div>
      )}
    </div>
  );
}

// ───────── Spend report (cost to run experiments) ───────────────────
type Agg = {
  total: number; saved: number; units: number;
  byVendor: Record<string, number>; byCategory: Record<string, number>; byMonth: Record<string, number>;
  orderCount: number;
};
function aggregateOrders(orders: PwOrder[], productMapObj: Record<string, PwProduct>): Agg {
  let total = 0, saved = 0, units = 0;
  const byVendor: Record<string, number> = {}, byCategory: Record<string, number> = {}, byMonth: Record<string, number> = {};
  orders.forEach((o) => {
    total += o.total || 0;
    saved += o.saved || 0;
    orderLines(o).forEach((l) => {
      const p = productMapObj[l.sku];
      const amt = lineTotal(l);
      units += l.qty;
      const vendorKey = l.vendor || (p ? p.vendor : "—");
      const cat = (p && p.category) || "Other";
      byVendor[vendorKey] = (byVendor[vendorKey] || 0) + amt;
      byCategory[cat] = (byCategory[cat] || 0) + amt;
      const m = orderDate(o).slice(0, 7);
      byMonth[m] = (byMonth[m] || 0) + amt;
    });
  });
  return { total, saved, units, byVendor, byCategory, byMonth, orderCount: orders.length };
}

function ReportTable({ title, rows, total }: {
  title: string; rows: { label: string; value: number }[]; total: number;
}) {
  return (
    <div style={{ marginTop: 18 }}>
      <div style={{ fontFamily: PW.sans, fontSize: 11, fontWeight: 700, color: PW.mute, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{title}</div>
      <div style={{ border: `1px solid ${PW.line}`, borderRadius: 4, overflow: "hidden" }}>
        {rows.map((r, i) => {
          const pct = total > 0 ? (r.value / total) * 100 : 0;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 14px", borderBottom: i === rows.length - 1 ? 0 : `1px solid ${PW.line}` }}>
              <span style={{ width: 180, fontFamily: PW.sans, fontSize: 13, color: PW.ink, fontWeight: 500, flexShrink: 0 }}>{r.label}</span>
              <div style={{ flex: 1 }}><Progress pct={pct} color={SLDS_BLUE} height={6} /></div>
              <span style={{ width: 44, textAlign: "right", fontFamily: PW.sans, fontSize: 11.5, color: PW.mute }}>{Math.round(pct)}%</span>
              <span style={{ width: 90, textAlign: "right", fontFamily: PW.mono, fontSize: 12.5, color: PW.ink, fontWeight: 600 }}>{money0(r.value)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SpendReport({ orders, rangeLabel, account, vendors, productMapObj, onClose }: {
  orders: PwOrder[]; rangeLabel: string; account: Account;
  vendors: Record<string, PwVendor>; productMapObj: Record<string, PwProduct>; onClose: () => void;
}) {
  const agg = aggregateOrders(orders, productMapObj);
  const vendorName = (k: string) => vendors[k]?.name || k;
  const vendorRows = Object.entries(agg.byVendor).map(([k, v]) => ({ label: vendorName(k), value: v })).sort((a, b) => b.value - a.value);
  const catRows = Object.entries(agg.byCategory).map(([k, v]) => ({ label: k, value: v })).sort((a, b) => b.value - a.value);
  const monthRows = Object.entries(agg.byMonth).map(([k, v]) => ({ label: fmtDate(k + "-01", { month: "short", year: "numeric" }), value: v })).sort((a, b) => (a.label < b.label ? 1 : -1));
  const avg = agg.orderCount ? agg.total / agg.orderCount : 0;

  const exportCsv = () => {
    const rows: Record<string, string | number>[] = [];
    orders.forEach((o) =>
      orderLines(o).forEach((l) => {
        const p = productMapObj[l.sku];
        rows.push({
          order: o.order_num,
          date: orderDate(o),
          vendor: vendorName(l.vendor || (p ? p.vendor : "")),
          category: (p && p.category) || "Other",
          catalog: (p && p.catalog_no) || "",
          item: l.name || (p ? p.name : l.sku),
          qty: l.qty,
          unit: (l.unit_price || 0).toFixed(2),
          total: lineTotal(l).toFixed(2),
        });
      })
    );
    downloadText(
      "procurewide-spend-report.csv",
      toCSV(rows, [
        { key: "order", label: "order id" }, { key: "date", label: "date" }, { key: "vendor", label: "vendor" },
        { key: "category", label: "category" }, { key: "catalog", label: "catalog #" }, { key: "item", label: "item" },
        { key: "qty", label: "qty" }, { key: "unit", label: "unit price" }, { key: "total", label: "line total" },
      ])
    );
    Toast.show("Spend report exported to CSV");
  };

  // Printable HTML report — generated as a downloadable .html document (no window.* access).
  const printReport = () => {
    const row = (label: string, val: number, pct: number) =>
      `<tr><td>${label}</td><td class="bar"><span style="width:${pct}%"></span></td><td class="n">${money0(val)}</td></tr>`;
    const vendorHtml = vendorRows.map((r) => row(r.label, r.value, agg.total ? (r.value / agg.total) * 100 : 0)).join("");
    const catHtml = catRows.map((r) => row(r.label, r.value, agg.total ? (r.value / agg.total) * 100 : 0)).join("");
    const monthHtml = monthRows.map((r) => row(r.label, r.value, agg.total ? (r.value / agg.total) * 100 : 0)).join("");
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>ProcureWide — Cost to Run Experiments</title>
      <style>
        * { box-sizing: border-box; }
        body { font-family: -apple-system, Segoe UI, Roboto, sans-serif; color: #0E1525; margin: 40px; }
        h1 { font-size: 22px; margin: 0; letter-spacing: -0.01em; }
        .sub { color: #6B7280; font-size: 13px; margin-top: 4px; }
        .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 24px 0; }
        .kpi { border: 1px solid #E5E7EB; border-radius: 6px; padding: 12px 14px; }
        .kpi .l { font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: #9CA3AF; font-weight: 700; }
        .kpi .v { font-size: 24px; font-weight: 800; margin-top: 4px; letter-spacing: -0.01em; }
        h2 { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #9CA3AF; margin: 22px 0 8px; }
        table { width: 100%; border-collapse: collapse; border: 1px solid #E5E7EB; border-radius: 6px; overflow: hidden; }
        td { padding: 8px 12px; border-bottom: 1px solid #F0F0EC; font-size: 13px; }
        td.n { text-align: right; font-variant-numeric: tabular-nums; font-weight: 700; width: 110px; }
        td.bar { width: 50%; } td.bar span { display: block; height: 7px; background: #1B96FF; border-radius: 99px; }
        tr:last-child td { border-bottom: 0; }
        .foot { margin-top: 28px; color: #9CA3AF; font-size: 11px; border-top: 1px solid #E5E7EB; padding-top: 12px; }
        @media print { body { margin: 16px; } }
      </style></head><body>
      <h1>Cost to Run Experiments</h1>
      <div class="sub">${account.name} · ${rangeLabel} · ${agg.orderCount} orders · generated ${fmtDate(new Date().toISOString().slice(0, 10))}</div>
      <div class="kpis">
        <div class="kpi"><div class="l">Total spend</div><div class="v">${money0(agg.total)}</div></div>
        <div class="kpi"><div class="l">Total saved</div><div class="v" style="color:#0A7048">${money0(agg.saved)}</div></div>
        <div class="kpi"><div class="l">Orders</div><div class="v">${agg.orderCount}</div></div>
        <div class="kpi"><div class="l">Avg order</div><div class="v">${money0(avg)}</div></div>
      </div>
      <h2>Spend by vendor</h2><table>${vendorHtml}</table>
      <h2>Spend by category</h2><table>${catHtml}</table>
      <h2>Spend by month</h2><table>${monthHtml}</table>
      <div class="foot">ProcureWide · ${agg.units} units across ${agg.orderCount} orders · This document summarizes procurement spend for the selected period.</div>
      </body></html>`;
    downloadText("procurewide-cost-to-run-experiments.html", html, "text/html");
    Toast.show("Printable report downloaded — open it to print or save as PDF");
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 5000, background: "rgba(7,17,42,0.45)", display: "flex", alignItems: "flex-start", justifyContent: "center", overflowY: "auto", padding: "40px 20px" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 760, background: PW.white, borderRadius: 8, overflow: "hidden", boxShadow: "0 30px 80px -20px rgba(7,17,42,0.6)" }}>
        {/* Header */}
        <div style={{ padding: "20px 26px", borderBottom: `1px solid ${PW.line}`, display: "flex", alignItems: "center", gap: 14 }}>
          <ObjIcon name="doc" size={34} />
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, fontFamily: PW.sans, fontWeight: 700, fontSize: 19, color: PW.ink, letterSpacing: "-0.01em" }}>Cost to run experiments</h2>
            <div style={{ fontFamily: PW.sans, fontSize: 12.5, color: PW.mute, marginTop: 2 }}>{account.name} · {rangeLabel} · {agg.orderCount} orders</div>
          </div>
          <AppButton variant="secondary" size="sm" icon="download" onClick={exportCsv}>Export CSV</AppButton>
          <AppButton variant="primary" size="sm" icon="doc" onClick={printReport}>Print / PDF</AppButton>
          <button onClick={onClose} style={{ width: 30, height: 30, border: 0, background: "transparent", color: PW.mute, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4 }}><Icon name="x" size={17} /></button>
        </div>

        <div style={{ padding: "22px 26px 28px" }}>
          {/* KPIs */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {([["Total spend", money0(agg.total), PW.ink], ["Total saved", money0(agg.saved), "#0A7048"], ["Orders", String(agg.orderCount), PW.ink], ["Avg order", money0(avg), PW.ink]] as const).map(([l, v, c]) => (
              <div key={l} style={{ border: `1px solid ${PW.line}`, borderRadius: 6, padding: "12px 14px" }}>
                <div style={{ fontFamily: PW.sans, fontSize: 10, fontWeight: 700, color: PW.mute, textTransform: "uppercase", letterSpacing: "0.05em" }}>{l}</div>
                <div style={{ fontFamily: PW.display, fontWeight: 700, fontSize: 23, color: c, marginTop: 4, letterSpacing: "-0.01em" }}>{v}</div>
              </div>
            ))}
          </div>

          {vendorRows.length === 0 ? (
            <EmptyState icon="doc" title="No spend in this period" sub="Pick a wider date range to see your experiment costs." />
          ) : (
            <>
              <ReportTable title="Spend by vendor" rows={vendorRows} total={agg.total} />
              <ReportTable title="Spend by category" rows={catRows} total={agg.total} />
              <ReportTable title="Spend by month" rows={monthRows} total={agg.total} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OrdersScreen({ orders, vendors, productMapObj, account }: {
  orders: PwOrder[];
  vendors: Record<string, PwVendor>;
  productMapObj: Record<string, PwProduct>;
  account: Account;
}) {
  const router = useRouter();
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState("all");
  const [range, setRange] = React.useState("all");
  const [report, setReport] = React.useState(false);
  const [pending, startTransition] = React.useTransition();

  const now = refNow(orders);
  const rangeDef = RANGES.find((r) => r[0] === range) || RANGES[6];
  const cutoff = rangeDef[2] === Infinity ? -Infinity : now - rangeDef[2] * 86400000;

  const inRange = orders.filter((o) => new Date(orderDate(o) + "T00:00:00").getTime() >= cutoff);
  const visible = inRange.filter((o) => status === "all" || o.status === status);

  const totalSpend = inRange.reduce((a, o) => a + (o.total || 0), 0);
  const totalSaved = inRange.reduce((a, o) => a + (o.saved || 0), 0);
  const openCount = inRange.filter((o) => o.status === "Processing" || o.status === "In transit").length;
  const rangeLabel = rangeDef[1];

  const statuses = ["all", "Processing", "In transit", "Delivered"];

  const handleReorder = (o: PwOrder) => {
    startTransition(async () => {
      const n = await reorderToCartAction(o.id);
      Toast.show(`Re-added ${n} line${n !== 1 ? "s" : ""} to cart`, {
        action: { label: "View cart", onClick: () => router.push("/app/cart") },
      });
    });
  };

  // No order-import action exists; route uploaded rows into the cart (the only bulk importer).
  const handleCsv = (rows: Record<string, string>[]) => {
    startTransition(async () => {
      const res = await importCartRowsAction(rows.map((r) => ({ sku: r.sku, catalog: r["catalog #"] || r.catalog, qty: r.qty })));
      if (res.added)
        Toast.show(`Imported ${res.added} line${res.added !== 1 ? "s" : ""} to cart${res.skipped ? ` · ${res.skipped} skipped` : ""}`, {
          action: { label: "View cart", onClick: () => router.push("/app/cart") },
        });
      else Toast.show("No matching catalog items found in that CSV", { tone: "danger" });
    });
  };

  const downloadTemplate = () => {
    const sample = [
      { "catalog #": "11965-092", sku: "TF-11965", qty: "6" },
      { "catalog #": "4970S", sku: "CS-4970", qty: "2" },
    ];
    downloadText(
      "procurewide-past-orders-template.csv",
      toCSV(sample, [{ key: "catalog #", label: "catalog #" }, { key: "sku", label: "sku" }, { key: "qty", label: "qty" }])
    );
    Toast.show("Template downloaded");
  };

  const hasOrders = orders.length > 0;

  return (
    <div>
      <PageHeader icon="clock" kicker="Ordering" title="Order history">
        <AppButton variant="primary" icon="doc" onClick={() => setReport(true)} disabled={!hasOrders}>Spend report</AppButton>
        <CsvUpload label="Upload past orders" onRows={handleCsv} />
        <AppButton variant="ghost" icon="download" onClick={downloadTemplate}>Template</AppButton>
      </PageHeader>

      <div style={{ padding: "18px 28px 60px", maxWidth: 1240, margin: "0 auto", opacity: pending ? 0.7 : 1 }}>
        {!hasOrders ? (
          <SectionCard>
            <EmptyState
              icon="clock"
              title="No orders yet"
              sub="When you place orders from the catalog, they'll show up here with status, tracking, and a printable spend report."
              action={<AppButton variant="primary" icon="cart" onClick={() => router.push("/app/catalog")}>Browse catalog</AppButton>}
            />
          </SectionCard>
        ) : (
          <>
            {/* KPIs (range-aware) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 16 }}>
              <Kpi label={`Spend · ${rangeLabel.toLowerCase()}`} value={money0(totalSpend)} icon="tag" sub={`${inRange.length} orders`} />
              <Kpi label="Saved vs. list" value={money0(totalSaved)} tone="green" icon="bolt" sub="in this period" />
              <Kpi label="Open orders" value={openCount} tone={openCount ? "blue" : undefined} icon="truck" sub="processing or in transit" />
            </div>

            {/* Cost-to-run-experiments banner */}
            <div onClick={() => setReport(true)} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", marginBottom: 16, cursor: "pointer",
              borderRadius: 6, background: "linear-gradient(120deg, #07112A, #0B2A4A)", color: "#fff",
            }}>
              <ObjIcon name="doc" size={32} color="#1B96FF" glyph="#fff" />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: PW.sans, fontSize: 14.5, fontWeight: 700 }}>This is what it costs to run experiments</div>
                <div style={{ fontFamily: PW.sans, fontSize: 12.5, color: "rgba(255,255,255,0.7)", marginTop: 1 }}>
                  {money0(totalSpend)} across {inRange.length} orders · {rangeLabel.toLowerCase()} — full breakdown by vendor, category &amp; month.
                </div>
              </div>
              <AppButton variant="primary" size="sm" icon="arrowR" onClick={() => setReport(true)}>Open report</AppButton>
            </div>

            {/* Filters */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 2, background: PW.white, border: `1px solid ${PW.line2}`, borderRadius: 4, padding: 2 }}>
                {statuses.map((st) => (
                  <button key={st} onClick={() => setStatus(st)} style={{
                    padding: "6px 12px", borderRadius: 3, border: 0,
                    background: status === st ? "#EAF1FB" : "transparent", color: status === st ? PW.ink : PW.ink500,
                    fontFamily: PW.sans, fontSize: 12.5, fontWeight: status === st ? 600 : 500, cursor: "pointer",
                  }}>{st === "all" ? "All orders" : st}</button>
                ))}
              </div>
              <span style={{ flex: 1 }} />
              {/* Date range */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: PW.sans, fontSize: 12, color: PW.mute }}>Period</span>
                <select value={range} onChange={(e) => setRange(e.target.value)} style={{
                  padding: "7px 10px", fontFamily: PW.sans, fontSize: 12.5, color: PW.ink, fontWeight: 600,
                  background: PW.white, border: `1px solid ${PW.line2}`, borderRadius: 4, outline: "none", cursor: "pointer",
                }}>
                  {RANGES.map(([id, lbl]) => <option key={id} value={id}>{lbl}</option>)}
                </select>
              </div>
            </div>

            {/* Table */}
            <SectionCard>
              <div style={{
                display: "grid", gridTemplateColumns: "110px 1fr 150px 120px 100px 110px 36px", gap: 12,
                padding: "9px 16px", background: "#F4F6F9", borderBottom: `1px solid ${PW.line}`,
                fontFamily: PW.sans, fontSize: 10.5, fontWeight: 700, color: PW.mute,
                textTransform: "uppercase", letterSpacing: "0.05em",
              }}>
                <span>Order</span><span>Items</span><span>Tracking</span><span>Date</span><span>Total</span><span>Status</span><span></span>
              </div>
              {visible.length === 0 ? (
                <EmptyState icon="clock" title="No orders in this period" sub="Try a wider date range, or import past orders from a CSV." />
              ) : (
                visible.map((o) => (
                  <OrderRow key={o.id} o={o} expanded={expanded === o.id}
                    onToggle={() => setExpanded(expanded === o.id ? null : o.id)}
                    onReorder={handleReorder} vendors={vendors} productMapObj={productMapObj} pending={pending} />
                ))
              )}
            </SectionCard>
          </>
        )}
      </div>

      {report && (
        <SpendReport orders={inRange} rangeLabel={rangeLabel} account={account}
          vendors={vendors} productMapObj={productMapObj} onClose={() => setReport(false)} />
      )}
    </div>
  );
}
