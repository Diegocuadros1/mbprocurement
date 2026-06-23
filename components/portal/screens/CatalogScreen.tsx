"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PW, SLDS_BLUE } from "@/lib/portal/pw";
import {
  PageHeader, SectionCard, AppButton, CsvUpload, QtyStepper, VendorMark, StatusPill,
  Icon, EmptyState, Toast,
} from "@/components/portal/kit";
import { money, lineArrivalDays } from "@/lib/portal/pricing";
import { toCSV, downloadText } from "@/lib/portal/csv";
import type { PwProduct, PwVendor, PwCatOverride } from "@/lib/portal/types";
import {
  addToCartAction, importCartRowsAction, setCategoryOverrideAction, softDeleteProductAction,
} from "@/lib/portal/actions";
import { CustomRequestForm, ItemDetailDrawer } from "@/components/portal/CustomItems";

function setupEase(p: PwProduct): number {
  const c = p.category || "";
  if (/custom|assay|molecular/i.test(c)) return 1;
  if (/reagent|culture|cytometry|antibod/i.test(c)) return 2;
  return 3;
}

// ───────── Categorize toggle ────────────────────────────────────────
function CategorizeSwitch({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  const accent = "#0A7048";
  const track = "#0E9560";
  const ring = on ? "#9FD9BC" : PW.line2;
  const bg = on ? "#E6F5EC" : "#fff";
  return (
    <button onClick={() => onChange(!on)} title="Turn on to file your catalog items into categories — just for organizing your orders."
      style={{
        display: "inline-flex", alignItems: "center", gap: 9, padding: "5px 13px 5px 7px",
        borderRadius: 999, border: `1px solid ${ring}`, background: bg, cursor: "pointer",
      }}>
      <span style={{ width: 36, height: 21, borderRadius: 999, flexShrink: 0, background: on ? track : "#C8CCC1", position: "relative", transition: "background 180ms" }}>
        <span style={{ position: "absolute", top: 2, left: on ? 17 : 2, width: 17, height: 17, borderRadius: 999, background: "#fff", transition: "left 180ms cubic-bezier(.4,1.3,.6,1)", boxShadow: "0 1px 3px rgba(7,17,42,0.35)" }} />
      </span>
      <Icon name="tag" size={14} color={on ? accent : PW.mute} />
      <span style={{ fontFamily: PW.sans, fontSize: 12.5, fontWeight: 700, color: on ? accent : PW.ink500, whiteSpace: "nowrap" }}>Categorize{on ? " · on" : ""}</span>
    </button>
  );
}

// Inline "File as <category>" selector, persisted via setCategoryOverrideAction.
function CategoryEditor({ sku, value, options, onSaved }: {
  sku: string; value: string; options: string[]; onSaved: () => void;
}) {
  const [pending, startTransition] = React.useTransition();
  const opts = options.includes(value) ? options : [value, ...options];
  return (
    <label onClick={(e) => e.stopPropagation()} style={{
      display: "inline-flex", alignItems: "center", gap: 6, padding: "2px 4px 2px 8px",
      borderRadius: 4, background: "#FFF6E8", border: "1px solid #E7C98A", opacity: pending ? 0.6 : 1,
    }}>
      <span style={{ fontFamily: PW.sans, fontSize: 10, fontWeight: 700, color: "#8A6308", textTransform: "uppercase", letterSpacing: "0.05em" }}>File as</span>
      <select value={value} disabled={pending}
        onChange={(e) => {
          const cat = e.target.value;
          startTransition(async () => { await setCategoryOverrideAction(sku, cat); onSaved(); });
        }}
        style={{ fontFamily: PW.sans, fontSize: 11.5, fontWeight: 600, color: PW.ink, background: "#fff", border: "1px solid #E7C98A", borderRadius: 3, padding: "3px 6px", cursor: "pointer", outline: "none" }}>
        {opts.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function ProductCard({ p, vendor, onHand, qty, onQty, onAdd, recommended, onOpen, displayCat, categorize, catOptions, onSaved, isPwAdmin, onDelete }: {
  p: PwProduct; vendor: PwVendor; onHand?: number; qty: number;
  onQty: (n: number) => void; onAdd: () => void; recommended?: string | null;
  onOpen: () => void; displayCat: string; categorize: boolean; catOptions: string[]; onSaved: () => void;
  isPwAdmin: boolean; onDelete: () => void;
}) {
  const savePct = Math.round((1 - p.price / p.list) * 100);
  const hasSaving = savePct > 0;
  return (
    <div style={{ background: PW.white, border: `1px solid ${PW.line}`, borderRadius: 4, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", background: "#F4F6F9", borderBottom: `1px solid ${PW.line}` }}>
        <VendorMark vendor={vendor} height={13} withName={false} />
        <span style={{ fontFamily: PW.sans, fontSize: 11, color: PW.ink500, fontWeight: 500 }}>{vendor.name}</span>
        <span style={{ flex: 1 }} />
        <span style={{ fontFamily: PW.sans, fontSize: 10, fontWeight: 600, color: PW.mute, textTransform: "uppercase", letterSpacing: "0.04em" }}>{displayCat}</span>
      </div>

      {(categorize || isPwAdmin) && (
        <div style={{ padding: "8px 12px", background: "#FFFBF2", borderBottom: `1px solid ${PW.line}`, display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}>
          {categorize && <CategoryEditor sku={p.sku} value={displayCat} options={catOptions} onSaved={onSaved} />}
          {isPwAdmin && (
            <button onClick={onDelete} title="Delete catalog item (ProcureWide admin)" style={{
              display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 9px", borderRadius: 4,
              background: "#FBE9E6", border: "1px solid #E7B6AE", color: "#A02A1E", cursor: "pointer",
              fontFamily: PW.sans, fontSize: 11.5, fontWeight: 700,
            }}><Icon name="trash" size={13} color="#A02A1E" /> Delete</button>
          )}
        </div>
      )}

      <div style={{ padding: "12px 14px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div onClick={onOpen} title="View item details" style={{ fontFamily: PW.sans, fontWeight: 700, fontSize: 14.5, color: PW.ink, letterSpacing: "-0.005em", lineHeight: 1.3, cursor: "pointer" }}>{p.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 5 }}>
          <button onClick={onOpen} style={{ background: "transparent", border: 0, padding: 0, cursor: "pointer", fontFamily: PW.mono, fontSize: 12, color: SLDS_BLUE }}>{p.catalog_no}</button>
          <span style={{ color: PW.mute, fontSize: 11 }}>·</span>
          <span style={{ fontFamily: PW.sans, fontSize: 12, color: PW.ink500 }}>{p.unit}</span>
          <button onClick={onOpen} style={{ marginLeft: "auto", background: "transparent", border: 0, padding: 0, cursor: "pointer", fontFamily: PW.sans, fontSize: 11.5, fontWeight: 600, color: SLDS_BLUE }}>Details</button>
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

type ViewMode = "cards" | "rows" | "classic";

const pwDeleteBtnSm: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 8px", borderRadius: 4,
  background: "#FBE9E6", border: "1px solid #E7B6AE", color: "#A02A1E", cursor: "pointer",
};

// Cards / Horizontal / Classic switcher
function ViewSwitch({ value, onChange }: { value: ViewMode; onChange: (v: ViewMode) => void }) {
  const opts: [ViewMode, string, string][] = [["cards", "Cards", "grid"], ["rows", "Horizontal", "rows"], ["classic", "Classic", "table"]];
  return (
    <div style={{ display: "inline-flex", gap: 2, background: PW.white, border: `1px solid ${PW.line2}`, borderRadius: 6, padding: 2 }}>
      {opts.map(([id, label, icon]) => (
        <button key={id} onClick={() => onChange(id)} title={label}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 11px", borderRadius: 4, border: 0,
            background: value === id ? "#EAF1FB" : "transparent", color: value === id ? PW.ink : PW.ink500,
            fontFamily: PW.sans, fontSize: 12.5, fontWeight: value === id ? 700 : 500, cursor: "pointer",
          }}>
          <Icon name={icon} size={14} color={value === id ? SLDS_BLUE : PW.mute} />{label}
        </button>
      ))}
    </div>
  );
}

// Horizontal (wide list) row
function ProductRow({ p, vendor, vendorName, qty, onQty, onAdd, displayCat, categorize, catOptions, onSaved, isPwAdmin, onDelete, onOpen }: {
  p: PwProduct; vendor: PwVendor; vendorName: string; qty: number; onQty: (n: number) => void; onAdd: () => void;
  displayCat: string; categorize: boolean; catOptions: string[]; onSaved: () => void; isPwAdmin: boolean; onDelete: () => void; onOpen: () => void;
}) {
  const savePct = Math.round((1 - p.price / p.list) * 100);
  const hasSaving = savePct > 0;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "2.3fr 120px 130px minmax(280px, auto)", gap: 14, alignItems: "center", padding: "12px 16px", borderBottom: `1px solid ${PW.line}`, background: PW.white }}>
      <div style={{ minWidth: 0, display: "flex", gap: 10, alignItems: "flex-start" }}>
        <VendorMark vendor={vendor} height={14} withName={false} />
        <div style={{ minWidth: 0 }}>
          <div onClick={onOpen} title="View item details" style={{ fontFamily: PW.sans, fontWeight: 700, fontSize: 13.5, color: PW.ink, cursor: "pointer", lineHeight: 1.3 }}>{p.name}</div>
          <div style={{ display: "flex", gap: 8, marginTop: 3, alignItems: "center", flexWrap: "wrap" }}>
            <button onClick={onOpen} style={{ background: "transparent", border: 0, padding: 0, cursor: "pointer", fontFamily: PW.mono, fontSize: 11.5, color: SLDS_BLUE }}>{p.catalog_no}</button>
            <span style={{ fontFamily: PW.sans, fontSize: 11.5, color: PW.ink500 }}>{p.unit}</span>
            <span style={{ fontFamily: PW.sans, fontSize: 10, fontWeight: 600, color: PW.mute, textTransform: "uppercase", letterSpacing: "0.04em" }}>{vendorName} · {displayCat}</span>
          </div>
        </div>
      </div>
      <div style={{ fontFamily: PW.sans, fontSize: 11.5, color: PW.mute, display: "flex", alignItems: "center", gap: 5 }}><Icon name="truck" size={13} color={PW.mute} /> {p.lead}</div>
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontFamily: PW.sans, fontWeight: 700, fontSize: 16, color: PW.ink, fontVariantNumeric: "tabular-nums" }}>{money(p.price)}</span>
          {hasSaving && <span style={{ fontFamily: PW.mono, fontSize: 10.5, color: PW.mute, textDecoration: "line-through" }}>{money(p.list)}</span>}
        </div>
        {hasSaving && <span style={{ fontFamily: PW.sans, fontSize: 10, fontWeight: 700, color: "#0A7048" }}>{savePct}% off list</span>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end", flexWrap: "wrap" }}>
        {categorize && <CategoryEditor sku={p.sku} value={displayCat} options={catOptions} onSaved={onSaved} />}
        {isPwAdmin && <button onClick={onDelete} title="Delete catalog item" style={pwDeleteBtnSm}><Icon name="trash" size={13} color="#A02A1E" /></button>}
        <QtyStepper value={qty} onChange={onQty} min={1} size="sm" />
        <AppButton variant="primary" size="sm" icon="cart" onClick={onAdd}>Add</AppButton>
      </div>
    </div>
  );
}

// Classic (dense table) view
function ClassicTable({ items, vendors, getQty, onAdd, catOf, catOptions, onDelete, onOpen, categorize, isPwAdmin, onSaved }: {
  items: PwProduct[]; vendors: Record<string, PwVendor>; getQty: (sku: string) => number; onAdd: (p: PwProduct) => void;
  catOf: (p: PwProduct) => string; catOptions: string[]; onDelete: (p: PwProduct) => void; onOpen: (sku: string) => void;
  categorize: boolean; isPwAdmin: boolean; onSaved: () => void;
}) {
  void getQty;
  const cols = "78px 1.35fr 120px 180px 58px 84px 110px";
  return (
    <SectionCard>
      <div style={{ display: "grid", gridTemplateColumns: cols, gap: 10, padding: "9px 14px", background: "#F4F6F9", borderBottom: `1px solid ${PW.line}`, fontFamily: PW.sans, fontSize: 10, fontWeight: 800, color: PW.mute, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        <span>SKU</span><span>Item</span><span>Vendor</span><span>Category</span><span>Lead</span><span style={{ textAlign: "right" }}>Price</span><span style={{ textAlign: "right" }}>Add</span>
      </div>
      {items.map((p) => (
        <div key={p.sku} style={{ display: "grid", gridTemplateColumns: cols, gap: 10, padding: "9px 14px", borderBottom: `1px solid ${PW.line}`, alignItems: "center", fontSize: 12 }}>
          <span style={{ fontFamily: PW.mono, fontSize: 11, color: PW.ink500 }}>{p.sku}</span>
          <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            <span onClick={() => onOpen(p.sku)} style={{ color: PW.ink, fontWeight: 600, cursor: "pointer" }}>{p.name}</span>
          </span>
          <span style={{ color: PW.ink500, fontSize: 11.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{vendors[p.vendor]?.name || p.vendor}</span>
          <span>{categorize ? <CategoryEditor sku={p.sku} value={catOf(p)} options={catOptions} onSaved={onSaved} /> : <span style={{ color: PW.mute, fontSize: 11.5 }}>{catOf(p)}</span>}</span>
          <span style={{ color: PW.mute, fontSize: 11.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.lead}</span>
          <span style={{ textAlign: "right", fontFamily: PW.mono, fontWeight: 700, color: PW.ink, fontVariantNumeric: "tabular-nums" }}>{money(p.price)}</span>
          <span style={{ display: "flex", gap: 6, justifyContent: "flex-end", alignItems: "center" }}>
            {isPwAdmin && <button onClick={() => onDelete(p)} title="Delete" style={{ ...pwDeleteBtnSm, padding: "4px 7px" }}><Icon name="trash" size={12} color="#A02A1E" /></button>}
            <AppButton variant="primary" size="sm" icon="cart" onClick={() => onAdd(p)}>Add</AppButton>
          </span>
        </div>
      ))}
    </SectionCard>
  );
}

export default function CatalogScreen({ products, vendors, onHandBySku, catOverrides, customItems, isPwAdmin }: {
  products: PwProduct[]; vendors: Record<string, PwVendor>; onHandBySku: Record<string, number>;
  catOverrides: PwCatOverride[]; customItems: PwProduct[]; isPwAdmin: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = React.useState("");
  const [cat, setCat] = React.useState("All");
  const [sort, setSort] = React.useState("relevance");
  const [priority, setPriority] = React.useState("");
  const [qtys, setQtys] = React.useState<Record<string, number>>({});
  const [pending, startTransition] = React.useTransition();
  const [categorize, setCategorize] = React.useState(false);
  const [showRequest, setShowRequest] = React.useState(false);
  const [detailSku, setDetailSku] = React.useState<string | null>(null);
  const [view, setView] = React.useState<ViewMode>("cards");

  // Auto-open the request form when the sidebar deep-links /app/catalog?request=1
  React.useEffect(() => {
    if (searchParams.get("request")) setShowRequest(true);
  }, [searchParams]);

  // Restore the saved view preference (client-only, avoids hydration mismatch).
  React.useEffect(() => {
    try {
      const v = localStorage.getItem("pw_view_catalog");
      if (v === "cards" || v === "rows" || v === "classic") setView(v);
    } catch {}
  }, []);
  const changeView = (v: ViewMode) => {
    setView(v);
    try { localStorage.setItem("pw_view_catalog", v); } catch {}
  };

  const overrideBySku = React.useMemo(() => {
    const m: Record<string, string> = {};
    catOverrides.forEach((o) => (m[o.sku] = o.category));
    return m;
  }, [catOverrides]);
  const catOf = React.useCallback((p: PwProduct) => overrideBySku[p.sku] || p.category || "Uncategorized", [overrideBySku]);

  // Resolve a sku to a product (catalog or this company's custom items) for the drawer.
  const productBySku = React.useMemo(() => {
    const m: Record<string, PwProduct> = {};
    products.forEach((p) => (m[p.sku] = p));
    customItems.forEach((p) => (m[p.sku] = p));
    return m;
  }, [products, customItems]);

  const getQty = (sku: string) => qtys[sku] || 1;
  const setQty = (sku: string, v: number) => setQtys((x) => ({ ...x, [sku]: Math.max(1, v) }));

  const baseCats = React.useMemo(() => {
    const seen: string[] = [];
    products.forEach((p) => { if (p.category && !seen.includes(p.category)) seen.push(p.category); });
    return seen;
  }, [products]);
  const categories = React.useMemo(() => {
    const seen: string[] = [];
    products.forEach((p) => { const c = catOf(p); if (c && !seen.includes(c)) seen.push(c); });
    return ["All", ...seen];
  }, [products, catOf]);

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
    if (cat !== "All" && catOf(p) !== cat) return false;
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

  const handleDelete = (p: PwProduct) => {
    startTransition(async () => {
      await softDeleteProductAction(p.sku);
      Toast.show(`Removed ${p.name} from the catalog`);
      router.refresh();
    });
  };

  const handleCsv = (rows: Record<string, string>[]) => {
    startTransition(async () => {
      const res = await importCartRowsAction(rows.map((r) => ({
        sku: r.sku, catalog: r["catalog #"] || r.catalog, name: r.name, link: r.link,
        price: r["list price"] || r.price, qty: r.qty,
      })));
      const parts: string[] = [];
      if (res.added) parts.push(`${res.added} catalog line${res.added > 1 ? "s" : ""}`);
      if (res.custom) parts.push(`${res.custom} custom (pending review)`);
      if (parts.length)
        Toast.show(`Imported ${parts.join(" · ")}${res.skipped ? ` · ${res.skipped} skipped` : ""}`, { action: { label: "View cart", onClick: () => router.push("/app/cart") } });
      else Toast.show("Nothing usable in that CSV — add an item name or catalog #", { tone: "danger" });
    });
  };

  const downloadTemplate = () => {
    const sample = [
      { "catalog #": "11965-092", sku: "TF-11965", name: "", link: "", "list price": "", qty: "6" },
      { "catalog #": "4970S", sku: "CS-4970", name: "", link: "", "list price": "", qty: "2" },
      { "catalog #": "", sku: "", name: "Recombinant Human IL-2, carrier-free, 1 mg", link: "https://vendor.com/il-2", "list price": "320", qty: "1" },
    ];
    downloadText("procurewide-cart-template.csv", toCSV(sample, [
      { key: "catalog #", label: "catalog #" }, { key: "sku", label: "sku" },
      { key: "name", label: "name" }, { key: "link", label: "link" },
      { key: "list price", label: "list price" }, { key: "qty", label: "qty" },
    ]));
    Toast.show("Template downloaded — rows without a catalog match become custom requests");
  };

  const detailProduct = detailSku ? productBySku[detailSku] : null;

  return (
    <div>
      <PageHeader icon="order" kicker="Ordering" title="Order catalog">
        <CategorizeSwitch on={categorize} onChange={(v) => { setCategorize(v); Toast.show(v ? "Categorize on — sort items into categories" : "Categorize off"); }} />
        <AppButton variant="secondary" icon="plus" onClick={() => setShowRequest(true)}>Request custom item</AppButton>
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

        <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "18px 2px 12px" }}>
          <span style={{ fontFamily: PW.sans, fontWeight: 700, fontSize: 15, color: PW.ink }}>{items.length} item{items.length !== 1 ? "s" : ""}</span>
          {(q || cat !== "All") && (
            <button onClick={() => { setQ(""); setCat("All"); }} style={{ background: "transparent", border: 0, color: SLDS_BLUE, cursor: "pointer", fontFamily: PW.sans, fontSize: 12.5, fontWeight: 600 }}>Clear filters</button>
          )}
          <span style={{ flex: 1 }} />
          <ViewSwitch value={view} onChange={changeView} />
        </div>

        {items.length === 0 ? (
          <SectionCard>
            <EmptyState icon="search" title="No items match" sub="Try a different search term, clear your filters, or request it as a custom item — we'll source anything."
              action={<div style={{ display: "flex", gap: 8 }}>
                <AppButton variant="secondary" onClick={() => { setQ(""); setCat("All"); }}>Clear filters</AppButton>
                <AppButton variant="primary" icon="plus" onClick={() => setShowRequest(true)}>Request a custom item</AppButton>
              </div>} />
          </SectionCard>
        ) : view === "classic" ? (
          <ClassicTable items={items} vendors={vendors} getQty={getQty} onAdd={handleAdd} catOf={catOf} catOptions={baseCats}
            onDelete={handleDelete} onOpen={setDetailSku} categorize={categorize} isPwAdmin={isPwAdmin} onSaved={() => router.refresh()} />
        ) : view === "rows" ? (
          <SectionCard>
            {items.map((p) => (
              <ProductRow key={p.sku} p={p} vendor={vendors[p.vendor] || { key: p.vendor, name: p.vendor, logo: null }}
                vendorName={vendors[p.vendor]?.name || p.vendor} qty={getQty(p.sku)} onQty={(v) => setQty(p.sku, v)} onAdd={() => handleAdd(p)}
                displayCat={catOf(p)} categorize={categorize} catOptions={baseCats} onSaved={() => router.refresh()}
                isPwAdmin={isPwAdmin} onDelete={() => handleDelete(p)} onOpen={() => setDetailSku(p.sku)} />
            ))}
          </SectionCard>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: 14 }}>
            {items.map((p) => (
              <ProductCard key={p.sku} p={p} vendor={vendors[p.vendor] || { key: p.vendor, name: p.vendor, logo: null }} onHand={onHandBySku[p.sku]}
                qty={getQty(p.sku)} recommended={recommendFor(p)} onQty={(v) => setQty(p.sku, v)} onAdd={() => handleAdd(p)}
                onOpen={() => setDetailSku(p.sku)} displayCat={catOf(p)} categorize={categorize} catOptions={baseCats}
                onSaved={() => router.refresh()} isPwAdmin={isPwAdmin} onDelete={() => handleDelete(p)} />
            ))}
          </div>
        )}
      </div>

      {showRequest && <CustomRequestForm onDone={() => setShowRequest(false)} />}
      {detailProduct && (
        <ItemDetailDrawer product={detailProduct} vendors={vendors} onClose={() => setDetailSku(null)}
          onAddToCart={(sku, n) => {
            startTransition(async () => {
              await addToCartAction(sku, n);
              Toast.show(`Added ${n} × ${detailProduct.name}`, { action: { label: "View cart", onClick: () => router.push("/app/cart") } });
            });
          }} />
      )}
    </div>
  );
}
