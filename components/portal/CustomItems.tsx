"use client";

// Custom (non-catalog) item requests + item detail drawer.
// ProcureWide sources anything — not just what's already in the catalog. A
// customer can request a brand-new item (SKU #, link, description, qty, optional
// list price); it drops into the cart as a PENDING line and into their custom
// catalog, awaiting an admin to verify and officialize it. Any item — catalog
// or custom — can be clicked to open a full detail drawer.

import React from "react";
import { useRouter } from "next/navigation";
import { PW, SLDS_BLUE } from "@/lib/portal/pw";
import { AppButton, QtyStepper, VendorMark, Icon, Toast } from "@/components/portal/kit";
import { money } from "@/lib/portal/pricing";
import type { PwProduct, PwVendor } from "@/lib/portal/types";
import {
  addCustomItemAction, updateCustomItemAction, removeCustomItemAction, addToCartAction,
} from "@/lib/portal/actions";

// ───────── Shared bits ───────────────────────────────────────────────
export const AMBER = { fg: "#8A6308", bg: "#FBF6E6", line: "#E6D08C", dot: "#E0A60A" };

// A small "awaiting catalog approval" pill for pending custom items.
export function PendingBadge({ size = "sm" }: { size?: "sm" | "md" }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: size === "sm" ? "1px 7px" : "2px 9px", borderRadius: 12,
      background: AMBER.bg, color: AMBER.fg, border: `1px solid ${AMBER.line}`,
      fontFamily: PW.sans, fontSize: size === "sm" ? 10.5 : 11.5, fontWeight: 700, whiteSpace: "nowrap",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: AMBER.dot }} />
      Pending catalog approval
    </span>
  );
}

// Build a readable description from a catalog product's structured fields,
// or use the custom item's own detail text.
function describeProduct(p: PwProduct, vendors: Record<string, PwVendor>): string {
  if (!p) return "";
  if (p.detail) return p.detail;
  if (p.pending) {
    return `Custom request — not yet in your catalog. ProcureWide will source “${p.name}” across 100+ vendors, negotiate pricing, and return a line-by-line comparison for your approval, typically within 24 hours. Add specs or a product link to help us match the exact item.`;
  }
  const blurbs: Record<string, string> = {
    "Cell culture": "Cell-culture reagent for maintaining, feeding, and passaging mammalian cell lines under sterile conditions.",
    Antibodies: "Research-grade antibody, validated for the listed applications and supplied at a working concentration.",
    "Molecular biology": "Molecular-biology reagent for nucleic-acid workflows — amplification, synthesis, or library prep.",
    Reagents: "General laboratory reagent supplied at the stated grade and purity for routine bench use.",
    Plasticware: "Labware consumable supplied sterile and ready to use, in case quantities for ongoing bench work.",
  };
  const lead = (p.category && blurbs[p.category]) || "Laboratory product sourced through the ProcureWide vendor network.";
  const vname = vendors[p.vendor]?.name || p.vendor;
  const storage = p.storage && p.storage !== "—" ? `, stored at ${p.storage}` : "";
  return `${lead} Supplied by ${vname} in ${p.unit} units${storage}. Typical lead time ${p.lead}.`;
}

function SpecRow({ label, value }: { label: string; value?: string | null }) {
  if (value == null || value === "" || value === "—") return null;
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "9px 0", borderBottom: `1px solid ${PW.line}` }}>
      <span style={{ fontFamily: PW.sans, fontSize: 12.5, color: PW.mute }}>{label}</span>
      <span style={{ fontFamily: PW.sans, fontSize: 12.5, color: PW.ink, fontWeight: 600, textAlign: "right", maxWidth: "62%" }}>{value}</span>
    </div>
  );
}

// ───────── Item detail drawer ─────────────────────────────────────────
export function ItemDetailDrawer({ product, vendors, onClose, onAddToCart }: {
  product: PwProduct; vendors: Record<string, PwVendor>;
  onClose: () => void; onAddToCart?: (sku: string, qty: number) => void;
}) {
  const router = useRouter();
  const p = product;
  const [qty, setQty] = React.useState(1);
  const [editing, setEditing] = React.useState(false);
  const [pending, startTransition] = React.useTransition();

  // editable fields (pending customs only)
  const [f, setF] = React.useState({
    name: p.name || "", catalog: p.catalog_no || "", unit: p.unit || "",
    listPrice: p.price ? String(p.price) : "", link: p.link || "", detail: p.detail || "",
  });
  React.useEffect(() => {
    setF({
      name: p.name || "", catalog: p.catalog_no || "", unit: p.unit || "",
      listPrice: p.price ? String(p.price) : "", link: p.link || "", detail: p.detail || "",
    });
    setEditing(false);
    setQty(1);
  }, [p]);

  const savePct = !p.pending && p.list ? Math.round((1 - p.price / p.list) * 100) : 0;
  const vend = vendors[p.vendor] || { key: p.vendor, name: p.vendor, logo: null };

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(p.sku, qty);
    } else {
      startTransition(async () => {
        await addToCartAction(p.sku, qty);
        Toast.show(`Added ${qty} × ${p.name}`);
        router.refresh();
      });
    }
    onClose();
  };

  const saveEdit = () => {
    startTransition(async () => {
      await updateCustomItemAction(p.sku, {
        name: f.name, catalog: f.catalog, unit: f.unit, listPrice: f.listPrice, link: f.link, detail: f.detail,
      });
      Toast.show("Custom item updated");
      router.refresh();
      setEditing(false);
    });
  };

  const removeItem = () => {
    startTransition(async () => {
      await removeCustomItemAction(p.sku);
      Toast.show("Custom item removed");
      router.refresh();
      onClose();
    });
  };

  const field: React.CSSProperties = {
    width: "100%", padding: "8px 11px", fontFamily: PW.sans, fontSize: 13, color: PW.ink,
    background: PW.white, border: `1px solid ${PW.line2}`, borderRadius: 4, outline: "none", boxSizing: "border-box",
  };
  const editLbl: React.CSSProperties = { fontFamily: PW.sans, fontSize: 11.5, fontWeight: 600, color: PW.ink500, marginBottom: 5, display: "block" };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 200, background: "rgba(10,21,48,0.5)",
      backdropFilter: "blur(4px)", display: "flex", justifyContent: "flex-end",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: "100%", maxWidth: 480, height: "100%", background: PW.white,
        boxShadow: "-24px 0 60px -20px rgba(7,17,42,0.4)", display: "flex", flexDirection: "column",
        opacity: pending ? 0.85 : 1,
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 20px", borderBottom: `1px solid ${PW.line}`, background: "#F4F6F9",
          display: "flex", alignItems: "flex-start", gap: 12,
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
              {p.pending ? (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: PW.sans, fontSize: 12, fontWeight: 600, color: PW.ink500 }}>
                  <Icon name="bolt" size={13} color={AMBER.dot} /> Custom request
                </span>
              ) : (
                <VendorMark vendor={vend} height={14} withName={false} />
              )}
              <span style={{
                fontFamily: PW.sans, fontSize: 10, fontWeight: 700, color: PW.mute,
                textTransform: "uppercase", letterSpacing: "0.05em",
              }}>{p.category}</span>
            </div>
            <h2 style={{ margin: 0, fontFamily: PW.sans, fontWeight: 700, fontSize: 18, color: PW.ink, letterSpacing: "-0.01em", lineHeight: 1.25 }}>{p.name}</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
              {p.catalog_no && <span style={{ fontFamily: PW.mono, fontSize: 12, color: SLDS_BLUE }}>{p.catalog_no}</span>}
              {p.pending && <PendingBadge />}
            </div>
          </div>
          <button onClick={onClose} style={{
            width: 30, height: 30, borderRadius: 6, background: "transparent", border: 0,
            cursor: "pointer", color: PW.ink500, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}><Icon name="x" size={18} /></button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "18px 20px" }}>
          {p.pending && !editing && (
            <div style={{ marginBottom: 16, borderRadius: 6, overflow: "hidden", border: `1px solid ${AMBER.line}`, background: AMBER.bg }}>
              <div style={{ padding: "13px 14px", display: "flex", gap: 11, alignItems: "flex-start" }}>
                <span style={{ width: 26, height: 26, borderRadius: 6, background: AMBER.dot, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name="clock" size={15} color="#fff" />
                </span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: PW.sans, fontSize: 13, fontWeight: 700, color: "#5E4708" }}>Awaiting catalog approval</div>
                  <div style={{ fontFamily: PW.sans, fontSize: 12.5, color: "#6E5510", lineHeight: 1.5, marginTop: 3 }}>
                    This item has never been ordered before, so it isn&apos;t in your catalog yet. A ProcureWide admin needs to verify the details and source it before it&apos;s officialized. You can still add it to this order — we&apos;ll confirm pricing and availability first.
                  </div>
                </div>
              </div>
            </div>
          )}

          {editing ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={editLbl}>Item name</label>
                <input value={f.name} onChange={(e) => setF((x) => ({ ...x, name: e.target.value }))} style={field} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={editLbl}>Vendor SKU #</label>
                  <input value={f.catalog} onChange={(e) => setF((x) => ({ ...x, catalog: e.target.value }))} style={{ ...field, fontFamily: PW.mono, fontSize: 12 }} />
                </div>
                <div>
                  <label style={editLbl}>Unit / size</label>
                  <input value={f.unit} onChange={(e) => setF((x) => ({ ...x, unit: e.target.value }))} style={field} />
                </div>
              </div>
              <div>
                <label style={editLbl}>Product link</label>
                <input value={f.link} onChange={(e) => setF((x) => ({ ...x, link: e.target.value }))} style={{ ...field, fontFamily: PW.mono, fontSize: 12 }} />
              </div>
              <div>
                <label style={editLbl}>Est. list price</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", fontFamily: PW.sans, fontSize: 13, color: PW.mute }}>$</span>
                  <input value={f.listPrice} onChange={(e) => setF((x) => ({ ...x, listPrice: e.target.value.replace(/[^0-9.]/g, "") }))} inputMode="decimal" placeholder="0.00" style={{ ...field, paddingLeft: 23, fontFamily: PW.mono, fontSize: 12 }} />
                </div>
              </div>
              <div>
                <label style={editLbl}>Specs &amp; notes</label>
                <textarea value={f.detail} onChange={(e) => setF((x) => ({ ...x, detail: e.target.value }))} rows={3} style={{ ...field, resize: "vertical" }} />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <AppButton variant="green" icon="check" onClick={saveEdit} disabled={pending}>Save changes</AppButton>
                <AppButton variant="secondary" onClick={() => setEditing(false)} disabled={pending}>Cancel</AppButton>
              </div>
            </div>
          ) : (
            <>
              {/* Description */}
              <div style={{ fontFamily: PW.sans, fontSize: 13.5, color: PW.ink500, lineHeight: 1.6 }}>
                {describeProduct(p, vendors)}
              </div>

              {/* Product link */}
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" style={{
                  marginTop: 14, display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 12px",
                  borderRadius: 4, border: `1px solid ${PW.line2}`, background: PW.white, textDecoration: "none",
                  fontFamily: PW.sans, fontSize: 12.5, fontWeight: 600, color: SLDS_BLUE, maxWidth: "100%",
                }}>
                  <Icon name="arrowR" size={14} />
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>View product page</span>
                </a>
              )}

              {/* Specs */}
              <div style={{ marginTop: 18 }}>
                <div style={{
                  fontFamily: PW.sans, fontSize: 10.5, fontWeight: 700, color: PW.mute,
                  textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 2,
                }}>Specifications</div>
                <SpecRow label="Vendor" value={p.pending ? "To be sourced by ProcureWide" : vend.name} />
                <SpecRow label={p.pending ? "Reference #" : "Catalog #"} value={p.catalog_no} />
                <SpecRow label="Unit / size" value={p.unit} />
                <SpecRow label="Storage" value={p.storage} />
                <SpecRow label="Lead time" value={p.lead} />
                {p.badges && p.badges.length > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "9px 0" }}>
                    <span style={{ fontFamily: PW.sans, fontSize: 12.5, color: PW.mute }}>Attributes</span>
                    <span style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end", maxWidth: "70%" }}>
                      {p.badges.map((b) => (
                        <span key={b} style={{ padding: "2px 7px", borderRadius: 2, background: "#F0EFEB", color: PW.ink500, fontFamily: PW.sans, fontSize: 10.5, fontWeight: 500 }}>{b}</span>
                      ))}
                    </span>
                  </div>
                )}
              </div>

              {/* Price block */}
              <div style={{ marginTop: 18, padding: "14px 16px", borderRadius: 6, background: "#FAFBF7", border: `1px solid ${PW.line}` }}>
                {p.pending ? (
                  p.price > 0 ? (
                    <div>
                      <div style={{ fontFamily: PW.sans, fontSize: 12, color: PW.mute }}>Your estimated list price</div>
                      <div style={{ fontFamily: PW.sans, fontSize: 22, fontWeight: 800, color: PW.ink, letterSpacing: "-0.01em", marginTop: 2 }}>{money(p.price)} <span style={{ fontSize: 12, fontWeight: 600, color: PW.mute }}>est.</span></div>
                      <div style={{ fontFamily: PW.sans, fontSize: 11.5, color: PW.ink500, marginTop: 4, lineHeight: 1.45 }}>An estimate you provided. ProcureWide confirms the real negotiated price after sourcing.</div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontFamily: PW.sans, fontSize: 22, fontWeight: 800, color: PW.ink500, letterSpacing: "-0.01em" }}>Price TBD</div>
                      <div style={{ fontFamily: PW.sans, fontSize: 11.5, color: PW.ink500, marginTop: 4, lineHeight: 1.45 }}>We&apos;ll return a negotiated price after sourcing this item — typically within 24 hours.</div>
                    </div>
                  )
                ) : (
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <span style={{ fontFamily: PW.sans, fontSize: 24, fontWeight: 800, color: PW.ink, letterSpacing: "-0.01em" }}>{money(p.price)}</span>
                      {savePct > 0 && <span style={{ fontFamily: PW.mono, fontSize: 12, color: PW.mute, textDecoration: "line-through" }}>{money(p.list)}</span>}
                      {savePct > 0 && <span style={{ marginLeft: "auto", padding: "2px 8px", borderRadius: 2, background: "#E6F5EC", color: "#0A7048", fontFamily: PW.sans, fontSize: 11, fontWeight: 700 }}>{savePct}% off</span>}
                    </div>
                    <div style={{ fontFamily: PW.sans, fontSize: 11.5, color: PW.ink500, marginTop: 6, lineHeight: 1.45 }}>
                      Reflects the last price paid. Vendor rates fluctuate, so your final price may be higher or lower.
                    </div>
                  </div>
                )}
              </div>

              {/* Pending custom — edit / remove controls */}
              {p.pending && (
                <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                  <AppButton variant="secondary" icon="doc" onClick={() => setEditing(true)} disabled={pending}>Edit request</AppButton>
                  <AppButton variant="danger" icon="trash" onClick={removeItem} disabled={pending}>Remove</AppButton>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer — add to cart */}
        {!editing && (
          <div style={{ padding: "14px 20px", borderTop: `1px solid ${PW.line}`, background: PW.white, display: "flex", alignItems: "center", gap: 10 }}>
            <QtyStepper value={qty} onChange={setQty} min={1} />
            <AppButton variant="primary" icon="cart" style={{ flex: 1, justifyContent: "center" }} onClick={handleAdd} disabled={pending}>
              Add to cart
            </AppButton>
          </div>
        )}
      </div>
    </div>
  );
}

// ───────── Request a custom item form ────────────────────────────────
export function CustomRequestForm({ onDone }: { onDone?: () => void }) {
  const router = useRouter();
  const [f, setF] = React.useState({ name: "", catalog: "", link: "", unit: "", listPrice: "", detail: "", qty: 1 });
  const [pending, startTransition] = React.useTransition();

  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((x) => ({ ...x, [k]: v }));
  const canSubmit = !!(f.name.trim() && f.catalog.trim() && f.unit.trim() && f.link.trim() && f.detail.trim());

  const submit = () => {
    if (!canSubmit || pending) return;
    startTransition(async () => {
      await addCustomItemAction(f);
      Toast.show("Custom item added — ProcureWide will source it", {
        action: { label: "View cart", onClick: () => router.push("/app/cart") },
      });
      router.refresh();
      setF({ name: "", catalog: "", link: "", unit: "", listPrice: "", detail: "", qty: 1 });
      onDone?.();
    });
  };

  const lbl: React.CSSProperties = { fontFamily: PW.sans, fontSize: 12, fontWeight: 600, color: PW.ink500, marginBottom: 7, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" };
  const req = <span style={{ color: "#D6322D" }}>*</span>;
  const opt = <span style={{ fontFamily: PW.sans, fontSize: 11, fontWeight: 500, color: PW.mute }}>optional</span>;
  const field: React.CSSProperties = {
    width: "100%", padding: "9px 12px", fontFamily: PW.sans, fontSize: 13, color: PW.ink,
    background: PW.white, border: `1px solid ${PW.line2}`, borderRadius: 4, outline: "none", boxSizing: "border-box",
  };

  return (
    <div onClick={() => onDone?.()} style={{
      position: "fixed", inset: 0, zIndex: 200, background: "rgba(10,21,48,0.55)",
      backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: "100%", maxWidth: 640, maxHeight: "92vh", background: PW.white, borderRadius: 12,
        boxShadow: "0 30px 80px -20px rgba(7,17,42,0.6)", overflow: "hidden", display: "flex", flexDirection: "column",
        opacity: pending ? 0.85 : 1,
      }}>
        {/* Header */}
        <div style={{ padding: "16px 24px", background: PW.ink, color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: PW.sans, fontSize: 11, fontWeight: 600, color: "#7CD9A7", textTransform: "uppercase", letterSpacing: "0.10em" }}>New request</div>
            <div style={{ marginTop: 2, fontFamily: PW.sans, fontSize: 17, fontWeight: 700, color: "#fff" }}>Request a custom item</div>
          </div>
          <button onClick={() => onDone?.()} style={{ width: 30, height: 30, borderRadius: 6, background: "transparent", border: 0, cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="x" size={18} /></button>
        </div>

        <div style={{ padding: 24, overflowY: "auto" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "11px 13px", borderRadius: 6, background: "#EEF4FD", border: "1px solid #9EBEEC", marginBottom: 20 }}>
            <span style={{ flexShrink: 0, marginTop: 1 }}><Icon name="info" size={15} color="#1E4FB0" /></span>
            <span style={{ fontFamily: PW.sans, fontSize: 12.5, color: "#1E4FB0", lineHeight: 1.5 }}>
              Don&apos;t see it in the catalog? Request anything. We&apos;ll source it across 100+ vendors and confirm pricing — the more detail you give, the faster we match the exact item. It&apos;s added as <b>pending</b> until an admin officializes it in your catalog.
            </span>
          </div>

          {/* Item name */}
          <div style={{ marginBottom: 16 }}>
            <label style={lbl}>Item name {req}</label>
            <input autoFocus value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Recombinant Human IL-2, carrier-free, 1 mg" style={field} />
          </div>

          {/* SKU + unit */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={lbl}>Vendor SKU # {req}</label>
              <input value={f.catalog} onChange={(e) => set("catalog", e.target.value)} placeholder="200-02" style={{ ...field, fontFamily: PW.mono, fontSize: 12 }} />
            </div>
            <div>
              <label style={lbl}>Unit / size {req}</label>
              <input value={f.unit} onChange={(e) => set("unit", e.target.value)} placeholder="1 mg" style={field} />
            </div>
          </div>

          {/* Link */}
          <div style={{ marginBottom: 16 }}>
            <label style={lbl}>Product link {req}</label>
            <input value={f.link} onChange={(e) => set("link", e.target.value)} placeholder="https://vendor.com/product/200-02" style={{ ...field, fontFamily: PW.mono, fontSize: 12 }} />
          </div>

          {/* Qty + list price */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16, alignItems: "start" }}>
            <div>
              <label style={lbl}>Quantity {req}</label>
              <QtyStepper value={f.qty} onChange={(v) => set("qty", Math.max(1, v))} min={1} />
            </div>
            <div>
              <label style={lbl}>Est. list price {opt}</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontFamily: PW.sans, fontSize: 13, color: PW.mute }}>$</span>
                <input value={f.listPrice} onChange={(e) => set("listPrice", e.target.value.replace(/[^0-9.]/g, ""))} inputMode="decimal" placeholder="0.00" style={{ ...field, paddingLeft: 24, fontFamily: PW.mono, fontSize: 12 }} />
              </div>
              <div style={{ fontFamily: PW.sans, fontSize: 11, color: PW.mute, marginTop: 5 }}>Leave blank if unknown — we&apos;ll price it.</div>
            </div>
          </div>

          {/* Detail */}
          <div>
            <label style={lbl}>Specs &amp; notes {req}</label>
            <textarea value={f.detail} onChange={(e) => set("detail", e.target.value)} rows={3}
              placeholder="Purity, format, intended use, acceptable substitutes, cold-chain or regulatory requirements…"
              style={{ ...field, resize: "vertical" }} />
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 24px", background: PW.paper, borderTop: `1px solid ${PW.line}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ fontFamily: PW.sans, fontSize: 12, color: PW.mute, display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="clock" size={13} color={PW.mute} /> Sourced &amp; priced, typically within 24 hours.
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <AppButton variant="secondary" onClick={() => onDone?.()} disabled={pending}>Cancel</AppButton>
            <AppButton variant="green" icon="plus" onClick={submit} disabled={!canSubmit || pending}>Add to cart</AppButton>
          </div>
        </div>
      </div>
    </div>
  );
}
