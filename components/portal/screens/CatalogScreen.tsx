"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PW, SLDS_BLUE } from "@/lib/portal/pw";
import {
  PageHeader, SectionCard, AppButton, CsvUpload, QtyStepper, VendorMark, StatusPill,
  Icon, EmptyState, Toast,
} from "@/components/portal/kit";
import { money, lineArrivalDays } from "@/lib/portal/pricing";
import { toCSV, downloadText } from "@/lib/portal/csv";
import type { PwProduct, PwVendor } from "@/lib/portal/types";
import { addToCartAction, importCartRowsAction } from "@/lib/portal/actions";

function setupEase(p: PwProduct): number {
  const c = p.category || "";
  if (/custom|assay|molecular/i.test(c)) return 1;
  if (/reagent|culture|cytometry|antibod/i.test(c)) return 2;
  return 3;
}

function ProductCard({ p, vendor, onHand, qty, onQty, onAdd, recommended }: {
  p: PwProduct; vendor: PwVendor; onHand?: number; qty: number;
  onQty: (n: number) => void; onAdd: () => void; recommended?: string | null;
}) {
  const savePct = Math.round((1 - p.price / p.list) * 100);
  const hasSaving = savePct > 0;
  return (
    <div style={{ background: PW.white, border: `1px solid ${PW.line}`, borderRadius: 4, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", background: "#F4F6F9", borderBottom: `1px solid ${PW.line}` }}>
        <VendorMark vendor={vendor} height={13} withName={false} />
        <span style={{ fontFamily: PW.sans, fontSize: 11, color: PW.ink500, fontWeight: 500 }}>{vendor.name}</span>
        <span style={{ flex: 1 }} />
        <span style={{ fontFamily: PW.sans, fontSize: 10, fontWeight: 600, color: PW.mute, textTransform: "uppercase", letterSpacing: "0.04em" }}>{p.category}</span>
      </div>
      <div style={{ padding: "12px 14px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: PW.sans, fontWeight: 700, fontSize: 14.5, color: PW.ink, letterSpacing: "-0.005em", lineHeight: 1.3 }}>{p.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 5 }}>
          <span style={{ fontFamily: PW.mono, fontSize: 12, color: SLDS_BLUE }}>{p.catalog_no}</span>
          <span style={{ color: PW.mute, fontSize: 11 }}>·</span>
          <span style={{ fontFamily: PW.sans, fontSize: 12, color: PW.ink500 }}>{p.unit}</span>
        </div>
        <div style={{ display: "flex", gap: 4, marginTop: 9, flexWrap: "wrap" }}>
          {p.badges.map((b) => (
            <span key={b} style={{ padding: "2px 7px", borderRadius: 2, background: "#F0EFEB", color: PW.ink500, fontFamily: PW.sans, fontSize: 10.5, fontWeight: 500 }}>{b}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 11, flexWrap: "wrap", fontFamily: PW.sans, fontSize: 11.5, color: PW.mute }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Icon name="truck" size={13} color={PW.mute} /> {p.lead}</span>
          {onHand != null && <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Icon name="box" size={12} color={PW.mute} /> {onHand} on hand</span>}
          <span style={{ marginLeft: "auto" }}><StatusPill tone="success">In stock at vendor</StatusPill></span>
        </div>
        {recommended && (
          <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start", padding: "3px 9px", borderRadius: 3, background: "#EAF1FB", border: "1px solid #9EBEEC" }}>
            <Icon name="bolt" size={12} color={SLDS_BLUE} />
            <span style={{ fontFamily: PW.sans, fontSize: 11, fontWeight: 700, color: "#1E4FB0" }}>{recommended}</span>
          </div>
        )}
        <span style={{ flex: 1 }} />
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${PW.line}`, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 10 }}>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontFamily: PW.sans, fontWeight: 700, fontSize: 19, color: PW.ink, letterSpacing: "-0.01em", fontVariantNumeric: "tabular-nums" }}>{money(p.price)}</span>
              {hasSaving && <span style={{ fontFamily: PW.mono, fontSize: 11, color: PW.mute, textDecoration: "line-through" }}>{money(p.list)}</span>}
            </div>
            <div style={{ marginTop: 3, display: "inline-block", padding: "1px 7px", borderRadius: 2, background: hasSaving ? "#E6F5EC" : "#EDEFF3", color: hasSaving ? "#0A7048" : PW.ink500, fontFamily: PW.sans, fontSize: 10.5, fontWeight: 700 }}>
              {hasSaving ? `Contract price · ${savePct}% off` : "Contract price"}
            </div>
          </div>
        </div>
        <div title="Reflects the last price paid. Vendor rates fluctuate — your final price may be higher or lower."
          style={{ marginTop: 8, display: "flex", alignItems: "flex-start", gap: 6, fontFamily: PW.sans, fontSize: 10.5, lineHeight: 1.45, color: PW.mute, cursor: "help" }}>
          <span style={{ flexShrink: 0, marginTop: 0.5 }}><Icon name="info" size={11} color={PW.mute} /></span>
          <span>Reflects the last price paid. Vendor rates fluctuate — your final price may be higher or lower.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
          <QtyStepper value={qty} onChange={onQty} min={1} size="sm" />
          <AppButton variant="primary" size="md" icon="cart" style={{ flex: 1 }} onClick={onAdd}>Add to cart</AppButton>
        </div>
      </div>
    </div>
  );
}

export default function CatalogScreen({ products, vendors, onHandBySku }: {
  products: PwProduct[]; vendors: Record<string, PwVendor>; onHandBySku: Record<string, number>;
}) {
  const router = useRouter();
  const [q, setQ] = React.useState("");
  const [cat, setCat] = React.useState("All");
  const [sort, setSort] = React.useState("relevance");
  const [priority, setPriority] = React.useState("");
  const [qtys, setQtys] = React.useState<Record<string, number>>({});
  const [pending, startTransition] = React.useTransition();

  const getQty = (sku: string) => qtys[sku] || 1;
  const setQty = (sku: string, v: number) => setQtys((x) => ({ ...x, [sku]: Math.max(1, v) }));

  const categories = React.useMemo(() => {
    const seen: string[] = [];
    products.forEach((p) => { if (p.category && !seen.includes(p.category)) seen.push(p.category); });
    return ["All", ...seen];
  }, [products]);

  const choosePriority = (p: string) => {
    setPriority(p);
    setSort(p === "cost" ? "savings" : p === "speed" ? "speed" : p === "setup" ? "setup" : "relevance");
  };
  const recommendFor = (p: PwProduct): string | null => {
    if (priority === "cost") return Math.round((1 - p.price / p.list) * 100) >= 25 ? "Best value" : null;
    if (priority === "speed") return lineArrivalDays(p) <= 3 ? "Fastest to arrive" : null;
    if (priority === "setup") return setupEase(p) === 3 ? "Easy setup" : null;
    return null;
  };

  let items = products.filter((p) => {
    if (cat !== "All" && p.category !== cat) return false;
    if (q.trim()) {
      const t = (p.name + " " + p.catalog_no + " " + (vendors[p.vendor]?.name || "") + " " + p.category + " " + p.badges.join(" ")).toLowerCase();
      return t.includes(q.trim().toLowerCase());
    }
    return true;
  });
  if (sort === "price") items = [...items].sort((a, b) => a.price - b.price);
  if (sort === "savings") items = [...items].sort((a, b) => (1 - a.price / a.list < 1 - b.price / b.list ? 1 : -1));
  if (sort === "speed") items = [...items].sort((a, b) => lineArrivalDays(a) - lineArrivalDays(b));
  if (sort === "setup") items = [...items].sort((a, b) => setupEase(b) - setupEase(a));
  if (sort === "name") items = [...items].sort((a, b) => a.name.localeCompare(b.name));

  const handleAdd = (p: PwProduct) => {
    const n = getQty(p.sku);
    startTransition(async () => {
      await addToCartAction(p.sku, n);
      Toast.show(`Added ${n} × ${p.name}`, { action: { label: "View cart", onClick: () => router.push("/app/cart") } });
      setQty(p.sku, 1);
    });
  };

  const handleCsv = (rows: Record<string, string>[]) => {
    startTransition(async () => {
      const res = await importCartRowsAction(rows.map((r) => ({ sku: r.sku, catalog: r["catalog #"] || r.catalog, qty: r.qty })));
      if (res.added)
        Toast.show(`Imported ${res.added} line${res.added > 1 ? "s" : ""} to cart${res.skipped ? ` · ${res.skipped} skipped` : ""}`, { action: { label: "View cart", onClick: () => router.push("/app/cart") } });
      else Toast.show("No matching catalog items found in that CSV", { tone: "danger" });
    });
  };

  const downloadTemplate = () => {
    const sample = [
      { "catalog #": "11965-092", sku: "TF-11965", qty: "6" },
      { "catalog #": "4970S", sku: "CS-4970", qty: "2" },
    ];
    downloadText("procurewide-cart-template.csv", toCSV(sample, [{ key: "catalog #", label: "catalog #" }, { key: "sku", label: "sku" }, { key: "qty", label: "qty" }]));
    Toast.show("Template downloaded");
  };

  return (
    <div>
      <PageHeader icon="order" kicker="Ordering" title="Order catalog">
        <CsvUpload label="Upload cart CSV" onRows={handleCsv} />
        <AppButton variant="ghost" icon="download" onClick={downloadTemplate}>Template</AppButton>
      </PageHeader>

      <div style={{ padding: "18px 28px 60px", maxWidth: 1320, margin: "0 auto", opacity: pending ? 0.7 : 1 }}>
        <div style={{ background: "linear-gradient(120deg, #07112A, #122F52)", borderRadius: 6, padding: "14px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: PW.sans, fontSize: 13.5, fontWeight: 700, color: "#fff" }}>What matters most for this order?</div>
            <div style={{ fontFamily: PW.sans, fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 1 }}>We&apos;ll prioritize the catalog and flag the best picks.</div>
          </div>
          <div style={{ display: "flex", gap: 8, marginLeft: "auto", flexWrap: "wrap" }}>
            {([["cost", "tag", "Cost", "Lowest price"], ["speed", "truck", "Speed", "Fastest delivery"], ["setup", "flask", "Setup", "Easiest to use"]] as const).map(([id, ic, lbl, hint]) => {
              const on = priority === id;
              return (
                <button key={id} onClick={() => choosePriority(on ? "" : id)} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 13px", borderRadius: 4, cursor: "pointer", background: on ? "#fff" : "rgba(255,255,255,0.10)", border: `1px solid ${on ? "#fff" : "rgba(255,255,255,0.22)"}`, textAlign: "left" }}>
                  <Icon name={ic} size={16} color={on ? SLDS_BLUE : "#fff"} />
                  <span>
                    <span style={{ display: "block", fontFamily: PW.sans, fontSize: 13, fontWeight: 700, color: on ? PW.ink : "#fff" }}>{lbl}</span>
                    <span style={{ display: "block", fontFamily: PW.sans, fontSize: 11, color: on ? PW.mute : "rgba(255,255,255,0.6)" }}>{hint}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ background: PW.white, border: `1px solid ${PW.line}`, borderRadius: 4, padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: PW.mute }}><Icon name="search" size={16} /></span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by item, catalog #, vendor, or category…"
              style={{ width: "100%", padding: "11px 14px 11px 38px", fontFamily: PW.sans, fontSize: 14, color: PW.ink, background: "#FAFBF7", border: `1px solid ${PW.line2}`, borderRadius: 4, outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            {categories.map((c) => (
              <button key={c} onClick={() => setCat(c)} style={{ padding: "5px 11px", borderRadius: 3, background: cat === c ? "#DDE7F8" : PW.white, color: cat === c ? "#1E4FB0" : PW.ink500, border: `1px solid ${cat === c ? "#9EBEEC" : PW.line2}`, fontFamily: PW.sans, fontSize: 12.5, fontWeight: cat === c ? 600 : 500, cursor: "pointer" }}>{c}</button>
            ))}
            <span style={{ flex: 1 }} />
            <span style={{ fontFamily: PW.sans, fontSize: 12, color: PW.mute, marginRight: 2 }}>Sort</span>
            <div style={{ display: "flex", gap: 2 }}>
              {([["relevance", "Relevance"], ["price", "Price"], ["savings", "Savings"], ["speed", "Speed"], ["setup", "Setup"], ["name", "A–Z"]] as const).map(([id, lbl]) => (
                <button key={id} onClick={() => setSort(id)} style={{ padding: "5px 9px", borderRadius: 3, border: 0, background: sort === id ? "#F0F0EC" : "transparent", color: sort === id ? PW.ink : PW.ink500, fontFamily: PW.sans, fontSize: 12, fontWeight: sort === id ? 600 : 500, cursor: "pointer" }}>{lbl}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "18px 2px 12px" }}>
          <span style={{ fontFamily: PW.sans, fontWeight: 700, fontSize: 15, color: PW.ink }}>{items.length} item{items.length !== 1 ? "s" : ""}</span>
          {(q || cat !== "All") && (
            <button onClick={() => { setQ(""); setCat("All"); }} style={{ background: "transparent", border: 0, color: SLDS_BLUE, cursor: "pointer", fontFamily: PW.sans, fontSize: 12.5, fontWeight: 600 }}>Clear filters</button>
          )}
        </div>

        {items.length === 0 ? (
          <SectionCard>
            <EmptyState icon="search" title="No items match" sub="Try a different search term or clear your filters."
              action={<AppButton variant="secondary" onClick={() => { setQ(""); setCat("All"); }}>Clear filters</AppButton>} />
          </SectionCard>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: 14 }}>
            {items.map((p) => (
              <ProductCard key={p.sku} p={p} vendor={vendors[p.vendor] || { key: p.vendor, name: p.vendor, logo: null }} onHand={onHandBySku[p.sku]}
                qty={getQty(p.sku)} recommended={recommendFor(p)} onQty={(v) => setQty(p.sku, v)} onAdd={() => handleAdd(p)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
