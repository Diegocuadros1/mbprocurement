"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PW, SLDS_BLUE } from "@/lib/portal/pw";
import {
  PageHeader, SectionCard, AppButton, StatusPill, QtyStepper, VendorMark,
  Kpi, ObjIcon, CsvUpload, EmptyState, Icon, Toast,
} from "@/components/portal/kit";
import { invStatus, money, money0 } from "@/lib/portal/pricing";
import { toCSV, downloadText } from "@/lib/portal/csv";
import type { PwInventoryRow, PwProduct, PwVendor } from "@/lib/portal/types";
import {
  upsertInventoryAction, adjustInventoryAction, removeInventoryAction, addToCartAction,
} from "@/lib/portal/actions";

type ProdMap = Record<string, PwProduct>;
type VendorMap = Record<string, PwVendor>;

function vendorOf(vendors: VendorMap, key: string | null | undefined): PwVendor {
  return (key && vendors[key]) || { key: key || "", name: key || "—", logo: null };
}

// ───────── Row ───────────────────────────────────────────────────────
function InvRow({ row, productMapObj, vendors, onEdit, onReorder, onOrder, onAdjust }: {
  row: PwInventoryRow;
  productMapObj: ProdMap;
  vendors: VendorMap;
  onEdit: (row: PwInventoryRow) => void;
  onReorder: (row: PwInventoryRow, p: PwProduct, qty: number) => void;
  onOrder: (row: PwInventoryRow, p: PwProduct) => void;
  onAdjust: (sku: string, onHand: number) => void;
}) {
  const p = productMapObj[row.sku];
  if (!p) return null;
  const status = invStatus(row);
  const tone = status === "out" ? "danger" : status === "low" ? "warning" : "success";
  const label = status === "out" ? "Out of stock" : status === "low" ? "Low" : "In stock";
  const suggest = Math.max(1, row.reorder * 2 - row.on_hand);

  return (
    <div style={{
      display: "grid", gridTemplateColumns: "2.4fr 1fr 0.9fr 1.1fr 1.3fr 190px",
      gap: 12, alignItems: "center", padding: "11px 16px", borderBottom: `1px solid ${PW.line}`,
    }}>
      {/* Item */}
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: PW.sans, fontWeight: 600, fontSize: 13.5, color: PW.ink, letterSpacing: "-0.005em" }}>{p.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 3 }}>
          <span style={{ fontFamily: PW.mono, fontSize: 11.5, color: SLDS_BLUE }}>{p.catalog_no}</span>
          <span style={{ color: PW.mute, fontSize: 11 }}>·</span>
          <VendorMark vendor={vendorOf(vendors, p.vendor)} height={11} withName nameStyle={{ fontSize: 11.5 }} />
        </div>
      </div>

      {/* Stock / status */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <StatusPill tone={tone}>{label}</StatusPill>
        <span style={{ fontFamily: PW.mono, fontSize: 11, color: PW.mute }}>reorder @ {row.reorder}</span>
      </div>

      {/* On hand stepper */}
      <div>
        <QtyStepper value={row.on_hand} onChange={(v) => onAdjust(row.sku, v)} min={0} size="sm" />
      </div>

      {/* Lot / expiry */}
      <div>
        <div style={{ fontFamily: PW.mono, fontSize: 12, color: PW.ink500 }}>{row.lot || "—"}</div>
        <div style={{ fontFamily: PW.sans, fontSize: 11, color: PW.mute }}>{row.expiry ? "exp " + row.expiry : "no expiry"}</div>
      </div>

      {/* Location */}
      <div style={{ fontFamily: PW.sans, fontSize: 12, color: PW.ink500 }}>{row.location || "—"}</div>

      {/* Action */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 6 }}>
        <button onClick={() => onEdit(row)} title="Edit item" style={{
          width: 30, height: 30, border: `1px solid ${PW.line2}`, background: PW.white, borderRadius: 3,
          color: PW.ink500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}><Icon name="doc" size={14} /></button>
        {status !== "ok" ? (
          <AppButton variant="primary" size="sm" icon="cart" onClick={() => onReorder(row, p, suggest)}>
            Reorder {suggest}
          </AppButton>
        ) : (
          <AppButton variant="secondary" size="sm" icon="cart" onClick={() => onOrder(row, p)}>
            Order
          </AppButton>
        )}
      </div>
    </div>
  );
}

// ───────── Shared field styles ─────────────────────────────────────────
const invField: React.CSSProperties = {
  width: "100%", padding: "9px 12px", fontFamily: "inherit", fontSize: 13, color: "#0E1525",
  background: "#fff", border: "1px solid #D7DAD0", borderRadius: 4, outline: "none", boxSizing: "border-box",
};
function InvLabel({ children }: { children: React.ReactNode }) {
  return <label style={{ fontFamily: PW.sans, fontSize: 12, fontWeight: 600, color: PW.ink500, marginBottom: 6, display: "block" }}>{children}</label>;
}
function InvModalShell({ title, icon, onClose, children, footer }: {
  title: string; icon: string; onClose: () => void; children: React.ReactNode; footer: React.ReactNode;
}) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 5000, background: "rgba(7,17,42,0.45)", display: "flex", alignItems: "flex-start", justifyContent: "center", overflowY: "auto", padding: "50px 20px" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 520, background: PW.white, borderRadius: 8, overflow: "hidden", boxShadow: "0 30px 80px -20px rgba(7,17,42,0.6)" }}>
        <div style={{ padding: "16px 22px", borderBottom: `1px solid ${PW.line}`, display: "flex", alignItems: "center", gap: 12 }}>
          <ObjIcon name={icon} size={26} />
          <h2 style={{ margin: 0, flex: 1, fontFamily: PW.sans, fontWeight: 700, fontSize: 17, color: PW.ink }}>{title}</h2>
          <button onClick={onClose} style={{ width: 30, height: 30, border: 0, background: "transparent", color: PW.mute, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4 }}><Icon name="x" size={17} /></button>
        </div>
        <div style={{ padding: "20px 22px" }}>{children}</div>
        <div style={{ padding: "14px 22px", borderTop: `1px solid ${PW.line}`, background: "#FAFBF7", display: "flex", alignItems: "center", gap: 10 }}>{footer}</div>
      </div>
    </div>
  );
}

// ───────── Edit existing inventory item ────────────────────────────────
function InventoryEditModal({ row, productMapObj, vendors, busy, onClose, onSave, onDelete }: {
  row: PwInventoryRow; productMapObj: ProdMap; vendors: VendorMap; busy: boolean;
  onClose: () => void;
  onSave: (patch: { sku: string; on_hand: number; reorder: number; lot: string | null; expiry: string | null; location: string | null }) => void;
  onDelete: (sku: string) => void;
}) {
  const p = productMapObj[row.sku];
  const [onHand, setOnHand] = React.useState(String(row.on_hand));
  const [reorder, setReorder] = React.useState(String(row.reorder));
  const [location, setLocation] = React.useState(row.location || "");
  const [lot, setLot] = React.useState(row.lot || "");
  const [expiry, setExpiry] = React.useState(row.expiry || "");

  const save = () => {
    onSave({
      sku: row.sku,
      on_hand: Math.max(0, parseInt(onHand, 10) || 0),
      reorder: Math.max(0, parseInt(reorder, 10) || 0),
      location: location.trim() || null,
      lot: lot.trim() || null,
      expiry: expiry || null,
    });
  };

  return (
    <InvModalShell title="Edit inventory item" icon="box" onClose={onClose}
      footer={<>
        <AppButton variant="danger" icon="trash" disabled={busy} onClick={() => onDelete(row.sku)}>Remove</AppButton>
        <span style={{ flex: 1 }} />
        <AppButton variant="secondary" disabled={busy} onClick={onClose}>Cancel</AppButton>
        <AppButton variant="primary" icon="check" disabled={busy} onClick={save}>Save changes</AppButton>
      </>}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: PW.sans, fontWeight: 700, fontSize: 14, color: PW.ink }}>{p ? p.name : row.sku}</div>
        {p && <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 3 }}>
          <span style={{ fontFamily: PW.mono, fontSize: 12, color: SLDS_BLUE }}>{p.catalog_no}</span>
          <span style={{ color: PW.mute }}>·</span><VendorMark vendor={vendorOf(vendors, p.vendor)} height={12} />
        </div>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div><InvLabel>On hand</InvLabel><input type="number" min="0" value={onHand} onChange={(e) => setOnHand(e.target.value)} style={invField} /></div>
        <div><InvLabel>Reorder point</InvLabel><input type="number" min="0" value={reorder} onChange={(e) => setReorder(e.target.value)} style={invField} /></div>
        <div style={{ gridColumn: "1 / -1" }}><InvLabel>Location</InvLabel><input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Freezer −20 · Rack 2" style={invField} /></div>
        <div><InvLabel>Lot #</InvLabel><input value={lot} onChange={(e) => setLot(e.target.value)} placeholder="—" style={{ ...invField, fontFamily: PW.mono, fontSize: 12 }} /></div>
        <div><InvLabel>Expiry</InvLabel><input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} style={invField} /></div>
      </div>
    </InvModalShell>
  );
}

// ───────── Add a new inventory item ────────────────────────────────────
function InventoryAddModal({ products, vendors, tracked, busy, onClose, onAdd }: {
  products: PwProduct[]; vendors: VendorMap; tracked: Set<string>; busy: boolean;
  onClose: () => void;
  onAdd: (patch: { sku: string; on_hand: number; reorder: number; lot: string | null; expiry: string | null; location: string | null }) => void;
}) {
  const options = products.filter((p) => !tracked.has(p.sku));
  const [sku, setSku] = React.useState(options[0] ? options[0].sku : "");
  const [onHand, setOnHand] = React.useState("1");
  const [reorder, setReorder] = React.useState("2");
  const [location, setLocation] = React.useState("");
  const [lot, setLot] = React.useState("");
  const [expiry, setExpiry] = React.useState("");
  const p = products.find((x) => x.sku === sku);

  const add = () => {
    if (!sku) { Toast.show("Pick a catalog item first", { tone: "danger" }); return; }
    onAdd({
      sku,
      on_hand: Math.max(0, parseInt(onHand, 10) || 0),
      reorder: Math.max(0, parseInt(reorder, 10) || 0),
      location: location.trim() || null,
      lot: lot.trim() || null,
      expiry: expiry || null,
    });
  };

  if (options.length === 0) {
    return (
      <InvModalShell title="Add inventory item" icon="plus" onClose={onClose}
        footer={<><span style={{ flex: 1 }} /><AppButton variant="secondary" onClick={onClose}>Close</AppButton></>}>
        <EmptyState icon="check" title="Everything's already tracked" sub="All catalog items are in your inventory." />
      </InvModalShell>
    );
  }

  return (
    <InvModalShell title="Add inventory item" icon="plus" onClose={onClose}
      footer={<>
        <span style={{ flex: 1 }} />
        <AppButton variant="secondary" disabled={busy} onClick={onClose}>Cancel</AppButton>
        <AppButton variant="primary" icon="plus" disabled={busy} onClick={add}>Add to inventory</AppButton>
      </>}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <InvLabel>Catalog item</InvLabel>
          <select value={sku} onChange={(e) => setSku(e.target.value)} style={{ ...invField, cursor: "pointer" }}>
            {options.map((o) => <option key={o.sku} value={o.sku}>{o.name} — {o.catalog_no}</option>)}
          </select>
          {p && <div style={{ marginTop: 6, fontFamily: PW.sans, fontSize: 12, color: PW.mute }}>{vendorOf(vendors, p.vendor).name} · {p.unit} · {money(p.price)}</div>}
        </div>
        <div><InvLabel>On hand</InvLabel><input type="number" min="0" value={onHand} onChange={(e) => setOnHand(e.target.value)} style={invField} /></div>
        <div><InvLabel>Reorder point</InvLabel><input type="number" min="0" value={reorder} onChange={(e) => setReorder(e.target.value)} style={invField} /></div>
        <div style={{ gridColumn: "1 / -1" }}><InvLabel>Location</InvLabel><input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Cold room A · Shelf 2" style={invField} /></div>
        <div><InvLabel>Lot # (optional)</InvLabel><input value={lot} onChange={(e) => setLot(e.target.value)} placeholder="—" style={{ ...invField, fontFamily: PW.mono, fontSize: 12 }} /></div>
        <div><InvLabel>Expiry (optional)</InvLabel><input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} style={invField} /></div>
      </div>
    </InvModalShell>
  );
}

// ───────── Screen ──────────────────────────────────────────────────────
export default function InventoryScreen({ inventory, products, vendors, productMapObj }: {
  inventory: PwInventoryRow[];
  products: PwProduct[];
  vendors: VendorMap;
  productMapObj: ProdMap;
}) {
  const router = useRouter();
  const [filter, setFilter] = React.useState<"all" | "low" | "ok">("all");
  const [q, setQ] = React.useState("");
  const [editing, setEditing] = React.useState<PwInventoryRow | null>(null);
  const [adding, setAdding] = React.useState(false);
  const [pending, startTransition] = React.useTransition();

  const tracked = React.useMemo(() => new Set(inventory.map((r) => r.sku)), [inventory]);

  let rows = inventory.filter((r) => {
    const p = productMapObj[r.sku];
    if (!p) return false;
    if (filter === "low" && invStatus(r) === "ok") return false;
    if (filter === "ok" && invStatus(r) !== "ok") return false;
    if (q.trim()) {
      const t = (p.name + " " + (p.catalog_no || "") + " " + vendorOf(vendors, p.vendor).name + " " + (r.location || "")).toLowerCase();
      return t.includes(q.trim().toLowerCase());
    }
    return true;
  });
  rows = [...rows].sort((a, b) => {
    const order = { out: 0, low: 1, ok: 2 } as const;
    return order[invStatus(a)] - order[invStatus(b)];
  });

  const lows = inventory.filter((r) => productMapObj[r.sku] && invStatus(r) !== "ok");
  const outs = inventory.filter((r) => productMapObj[r.sku] && invStatus(r) === "out");
  const totalValue = inventory.reduce((a, r) => { const p = productMapObj[r.sku]; return a + (p ? p.price * r.on_hand : 0); }, 0);

  // ── mutations ──
  const onAdjust = (sku: string, onHand: number) => {
    startTransition(async () => { await adjustInventoryAction(sku, onHand); });
  };

  const onReorder = (row: PwInventoryRow, p: PwProduct, qty: number) => {
    startTransition(async () => {
      await addToCartAction(row.sku, qty);
      Toast.show(`Added ${qty} × ${p.name} to cart`, { action: { label: "Cart", onClick: () => router.push("/app/cart") } });
    });
  };
  const onOrder = (row: PwInventoryRow, p: PwProduct) => {
    startTransition(async () => {
      await addToCartAction(row.sku, 1);
      Toast.show(`Added 1 × ${p.name} to cart`);
    });
  };

  const reorderAll = () => {
    if (!lows.length) return;
    startTransition(async () => {
      let n = 0;
      for (const r of lows) {
        const need = Math.max(1, r.reorder * 2 - r.on_hand);
        await addToCartAction(r.sku, need);
        n += need;
      }
      Toast.show(`Added ${n} units across ${lows.length} low items to cart`, { action: { label: "View cart", onClick: () => router.push("/app/cart") } });
    });
  };

  const saveEdit = (patch: { sku: string; on_hand: number; reorder: number; lot: string | null; expiry: string | null; location: string | null }) => {
    const name = productMapObj[patch.sku]?.name || patch.sku;
    startTransition(async () => {
      await upsertInventoryAction(patch);
      Toast.show(`Updated ${name}`);
      setEditing(null);
    });
  };
  const deleteItem = (sku: string) => {
    const name = productMapObj[sku]?.name || sku;
    startTransition(async () => {
      await removeInventoryAction(sku);
      Toast.show(`Removed ${name} from inventory`, { tone: "danger" });
      setEditing(null);
    });
  };
  const addItem = (patch: { sku: string; on_hand: number; reorder: number; lot: string | null; expiry: string | null; location: string | null }) => {
    const name = productMapObj[patch.sku]?.name || patch.sku;
    startTransition(async () => {
      await upsertInventoryAction(patch);
      Toast.show(`Added ${name} to inventory`);
      setAdding(false);
    });
  };

  const handleCsv = (csvRows: Record<string, string>[]) => {
    const bySku = productMapObj;
    const byCat: Record<string, PwProduct> = {};
    products.forEach((p) => { if (p.catalog_no) byCat[p.catalog_no.toLowerCase()] = p; });
    const onHandBySku: Record<string, number> = {};
    inventory.forEach((r) => (onHandBySku[r.sku] = r.on_hand));
    const reorderBySku: Record<string, number> = {};
    inventory.forEach((r) => (reorderBySku[r.sku] = r.reorder));

    const ops: { sku: string; on_hand: number; reorder: number }[] = [];
    csvRows.forEach((r) => {
      const p =
        (r.sku && bySku[r.sku.trim()]) ||
        byCat[String(r.catalog || r["catalog #"] || r.sku || "").trim().toLowerCase()];
      if (!p) return;
      const rawOnHand = r.onhand ?? r["on hand"];
      const onHand = rawOnHand != null ? parseInt(rawOnHand, 10) : NaN;
      const rawReorder = r.reorder;
      const reorder = rawReorder != null ? parseInt(rawReorder, 10) : NaN;
      ops.push({
        sku: p.sku,
        on_hand: !isNaN(onHand) ? Math.max(0, onHand) : (onHandBySku[p.sku] ?? 0),
        reorder: !isNaN(reorder) ? Math.max(0, reorder) : (reorderBySku[p.sku] ?? 0),
      });
    });
    if (!ops.length) { Toast.show("No matching items in that CSV", { tone: "danger" }); return; }
    startTransition(async () => {
      for (const op of ops) await upsertInventoryAction(op);
      Toast.show(`Synced ${ops.length} inventory item${ops.length > 1 ? "s" : ""} from CSV`);
    });
  };

  const exportInv = () => {
    const data = inventory
      .filter((r) => productMapObj[r.sku])
      .map((r) => {
        const p = productMapObj[r.sku];
        return {
          catalog: p.catalog_no || "",
          sku: r.sku,
          name: p.name,
          onhand: r.on_hand,
          reorder: r.reorder,
          lot: r.lot || "",
          expiry: r.expiry || "",
          location: r.location || "",
          status: invStatus(r),
        };
      });
    downloadText("procurewide-inventory.csv", toCSV(data, [
      { key: "catalog", label: "catalog #" }, { key: "sku", label: "sku" }, { key: "name", label: "name" },
      { key: "onhand", label: "on hand" }, { key: "reorder", label: "reorder" },
      { key: "lot", label: "lot" }, { key: "expiry", label: "expiry" }, { key: "location", label: "location" }, { key: "status", label: "status" },
    ]));
    Toast.show("Inventory exported to CSV");
  };

  const isEmpty = inventory.length === 0;

  return (
    <div>
      <PageHeader icon="box" kicker="Operations" title="Inventory">
        <AppButton variant="primary" icon="plus" onClick={() => setAdding(true)}>Add item</AppButton>
        <CsvUpload label="Sync from CSV" onRows={handleCsv} />
        <AppButton variant="ghost" icon="download" onClick={exportInv}>Export</AppButton>
      </PageHeader>

      <div style={{ padding: "18px 28px 60px", maxWidth: 1320, margin: "0 auto", opacity: pending ? 0.7 : 1 }}>
        {/* KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 18 }}>
          <Kpi label="Tracked SKUs" value={inventory.length} icon="box" />
          <Kpi label="Low stock" value={lows.length - outs.length} tone={(lows.length - outs.length) ? "blue" : undefined} icon="alert" sub="below reorder point" />
          <Kpi label="Out of stock" value={outs.length} tone={outs.length ? "danger" : undefined} icon="alert" />
          <Kpi label="On-hand value" value={money0(totalValue)} icon="tag" sub="at contract price" />
        </div>

        {isEmpty ? (
          <SectionCard>
            <EmptyState icon="box" title="No inventory tracked yet"
              sub="Add the catalog items you keep on the shelf to track stock, get low-stock alerts, and reorder in one click."
              action={<AppButton variant="primary" icon="plus" onClick={() => setAdding(true)}>Add item</AppButton>} />
          </SectionCard>
        ) : (
          <>
            {/* Reorder banner */}
            {lows.length > 0 && (
              <div style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", marginBottom: 16,
                background: "#FBE3E2", border: "1px solid #F0C9C7", borderRadius: 4,
              }}>
                <Icon name="alert" size={18} color="#D6322D" />
                <div style={{ flex: 1, fontFamily: PW.sans, fontSize: 13, color: "#8B1F1B" }}>
                  <b>{lows.length} item{lows.length > 1 ? "s are" : " is"} at or below reorder point.</b> Push the suggested quantities straight to your cart.
                </div>
                <AppButton variant="ink" size="sm" icon="cart" onClick={reorderAll}>Reorder all low items</AppButton>
              </div>
            )}

            {/* Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
              <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
                <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: PW.mute }}><Icon name="search" size={15} /></span>
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search inventory…"
                  style={{ width: "100%", padding: "9px 12px 9px 34px", fontFamily: PW.sans, fontSize: 13, color: PW.ink, background: PW.white, border: `1px solid ${PW.line2}`, borderRadius: 4, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div style={{ display: "flex", gap: 2, background: PW.white, border: `1px solid ${PW.line2}`, borderRadius: 4, padding: 2 }}>
                {([["all", "All"], ["low", "Needs reorder"], ["ok", "In stock"]] as const).map(([id, lbl]) => (
                  <button key={id} onClick={() => setFilter(id)} style={{
                    padding: "6px 12px", borderRadius: 3, border: 0,
                    background: filter === id ? "#EAF1FB" : "transparent",
                    color: filter === id ? PW.ink : PW.ink500,
                    fontFamily: PW.sans, fontSize: 12.5, fontWeight: filter === id ? 600 : 500, cursor: "pointer",
                  }}>{lbl}</button>
                ))}
              </div>
            </div>

            {/* Table */}
            <SectionCard>
              <div style={{
                display: "grid", gridTemplateColumns: "2.4fr 1fr 0.9fr 1.1fr 1.3fr 190px", gap: 12,
                padding: "9px 16px", background: "#F4F6F9", borderBottom: `1px solid ${PW.line}`,
                fontFamily: PW.sans, fontSize: 10.5, fontWeight: 700, color: PW.mute,
                textTransform: "uppercase", letterSpacing: "0.05em",
              }}>
                <span>Item</span><span>Status</span><span>On hand</span><span>Lot / expiry</span><span>Location</span><span style={{ textAlign: "right" }}>Action</span>
              </div>
              {rows.length === 0
                ? <EmptyState icon="box" title="No items match" sub="Try a different filter or search, or add a new item."
                    action={<AppButton variant="primary" icon="plus" onClick={() => setAdding(true)}>Add item</AppButton>} />
                : rows.map((r) => (
                    <InvRow key={r.sku} row={r} productMapObj={productMapObj} vendors={vendors}
                      onEdit={setEditing} onReorder={onReorder} onOrder={onOrder} onAdjust={onAdjust} />
                  ))}
            </SectionCard>
          </>
        )}
      </div>

      {editing && (
        <InventoryEditModal row={editing} productMapObj={productMapObj} vendors={vendors} busy={pending}
          onClose={() => setEditing(null)} onSave={saveEdit} onDelete={deleteItem} />
      )}
      {adding && (
        <InventoryAddModal products={products} vendors={vendors} tracked={tracked} busy={pending}
          onClose={() => setAdding(false)} onAdd={addItem} />
      )}
    </div>
  );
}
