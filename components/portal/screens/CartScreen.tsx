"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PW, SLDS_BLUE } from "@/lib/portal/pw";
import {
  PageHeader, SectionCard, AppButton, QtyStepper, VendorMark, Progress,
  CsvUpload, EmptyState, Icon, Toast, fmtDate, daysBetween,
} from "@/components/portal/kit";
import {
  cartSummary, consolidationOffer, orderArrivalDays, addDays, money, money0,
  type CartSummary, type CartVendorGroup,
} from "@/lib/portal/pricing";
import { toCSV, downloadText } from "@/lib/portal/csv";
import {
  setCartQtyAction, removeFromCartAction, clearCartAction,
  importCartRowsAction, placeOrderAction, removeCustomItemAction,
} from "@/lib/portal/actions";
import type { PwProduct, PwVendor, PwCartLine } from "@/lib/portal/types";
import { PendingBadge, ItemDetailDrawer, AMBER } from "@/components/portal/CustomItems";

type ProductMapObj = Record<string, PwProduct>;
type VendorMapObj = Record<string, PwVendor>;
type CartLineFull = CartVendorGroup["lines"][number];
type OrderMeta = { urgency: string; needBy: string; priority: string; priorityNote: string };

// ───────── Cart line ────────────────────────────────────────────────
function CartLine({ line, onChange, onRemove, onOpen }: {
  line: CartLineFull; onChange: (sku: string, qty: number) => void; onRemove: (sku: string) => void; onOpen: () => void;
}) {
  const p = line.p;
  const isPending = !!line.pending;
  const unpriced = isPending && !p.price;
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 132px 110px 36px", gap: 12,
      alignItems: "center", padding: "11px 14px", borderBottom: `1px solid ${PW.line}`,
    }}>
      <div style={{ minWidth: 0 }}>
        <div onClick={onOpen} title="View item details" style={{ fontFamily: PW.sans, fontWeight: 600, fontSize: 13.5, color: PW.ink, letterSpacing: "-0.005em", cursor: "pointer", display: "inline-block" }}>{p.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 3, flexWrap: "wrap" }}>
          {p.catalog_no && <span style={{ fontFamily: PW.mono, fontSize: 11.5, color: SLDS_BLUE }}>{p.catalog_no}</span>}
          {p.catalog_no && <span style={{ color: PW.mute, fontSize: 11 }}>·</span>}
          <span style={{ fontFamily: PW.sans, fontSize: 11.5, color: PW.mute }}>{p.unit}</span>
          <span style={{ color: PW.mute, fontSize: 11 }}>·</span>
          {unpriced
            ? <span style={{ fontFamily: PW.sans, fontSize: 11.5, color: PW.mute }}>Price TBD</span>
            : <span style={{ fontFamily: PW.mono, fontSize: 11.5, color: PW.ink500 }}>{money(p.price)} ea{isPending ? " est." : ""}</span>}
          {isPending && <PendingBadge />}
          {line.offPct > 0 && (
            <span style={{
              padding: "0 6px", borderRadius: 2, background: "#E6F5EC", color: "#0A7048",
              fontFamily: PW.sans, fontSize: 10.5, fontWeight: 700,
            }}>−{Math.round(line.offPct * 100)}% volume</span>
          )}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <QtyStepper value={line.qty} onChange={(v) => (v <= 0 ? onRemove(line.sku) : onChange(line.sku, v))} min={0} size="sm" />
      </div>
      <div style={{ textAlign: "right" }}>
        {unpriced
          ? <div style={{ fontFamily: PW.sans, fontWeight: 600, fontSize: 12.5, color: PW.mute }}>TBD</div>
          : <div style={{ fontFamily: PW.sans, fontWeight: 700, fontSize: 14, color: PW.ink, fontVariantNumeric: "tabular-nums" }}>{money(line.net)}{isPending ? <span style={{ fontSize: 10, fontWeight: 600, color: PW.mute }}> est.</span> : null}</div>}
        {line.off > 0 && <div style={{ fontFamily: PW.mono, fontSize: 11, color: PW.mute, textDecoration: "line-through" }}>{money(line.gross)}</div>}
      </div>
      <button onClick={() => onRemove(line.sku)} title="Remove" style={{
        width: 28, height: 28, border: 0, background: "transparent", color: PW.mute,
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 3,
      }}><Icon name="trash" size={15} /></button>
    </div>
  );
}

// ───────── Vendor group ─────────────────────────────────────────────
function VendorGroup({ g, vendors, onChange, onRemove, onOpen }: {
  g: CartVendorGroup; vendors: VendorMapObj;
  onChange: (sku: string, qty: number) => void; onRemove: (sku: string) => void; onOpen: (sku: string) => void;
}) {
  const st = g.spend;
  const isCustom = g.vendor === "tbd";
  const vend = vendors[g.vendor] || { key: g.vendor, name: g.vendor, logo: null };
  const nextPct = st.next ? Math.min(100, (st.total / st.next.at) * 100) : 100;
  return (
    <SectionCard
      title={<span>{isCustom ? "Custom requests" : vend.name}</span>}
      icon={isCustom ? "bolt" : "building"}
      action={<span style={{ fontFamily: PW.sans, fontSize: 12, color: PW.ink500, fontWeight: 600 }}>{isCustom ? (g.net > 0 ? money(g.net) + " est." : "Priced after sourcing") : money(g.net)}</span>}
      style={{ marginBottom: 14 }}
    >
      {g.lines.map((l) => <CartLine key={l.sku} line={l} onChange={onChange} onRemove={onRemove} onOpen={() => onOpen(l.sku)} />)}

      {isCustom && (
        <div style={{ padding: "11px 14px", background: AMBER.bg, borderTop: `1px solid ${AMBER.line}`, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ flexShrink: 0, marginTop: 1 }}><Icon name="info" size={14} color={AMBER.dot} /></span>
          <span style={{ fontFamily: PW.sans, fontSize: 12, color: "#6E5510", lineHeight: 1.5 }}>
            These items aren&apos;t in your catalog yet. A ProcureWide admin verifies and sources each one before it&apos;s officialized — we&apos;ll confirm pricing and availability, typically within 24 hours, before anything ships.
          </span>
        </div>
      )}

      {/* Spend-tier guarantee strip */}
      {st.tiers.length > 0 && (
        <div style={{ padding: "12px 14px", background: "#FAFBF7" }}>
          {g.tierCredit > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ width: 16, height: 16, borderRadius: 4, background: "#0E9560", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name="check" size={10} color="#fff" stroke={3} />
              </span>
              <span style={{ fontFamily: PW.sans, fontSize: 12.5, color: PW.ink }}>
                This order crosses the {money0(st.current!.at)} {vend.name} tier — <b style={{ color: "#0A7048" }}>{money0(g.tierCredit)} credited to this order</b>.
              </span>
            </div>
          )}
          {g.tierCredit === 0 && g.spendBase.current && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: st.next ? 8 : 0 }}>
              <span style={{ width: 16, height: 16, borderRadius: 4, background: "#0E9560", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name="check" size={10} color="#fff" stroke={3} />
              </span>
              <span style={{ fontFamily: PW.sans, fontSize: 12.5, color: PW.ink500 }}>
                <b style={{ color: "#0A7048" }}>{money0(g.spendBase.guaranteed)} quarterly rebate</b> already earned with {vend.name} this quarter — credited at quarter close.
              </span>
            </div>
          )}
          {st.next && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontFamily: PW.sans, fontSize: 12, color: PW.ink500 }}>
                  Add <b style={{ color: PW.ink }}>{money0(st.toNext)}</b> to unlock <b style={{ color: "#0A7048" }}>{money0(st.next.save)} off this order</b>
                </span>
                <span style={{ fontFamily: PW.mono, fontSize: 11, color: PW.mute }}>{money0(st.total)} / {money0(st.next.at)} QTD</span>
              </div>
              <Progress pct={nextPct} color={SLDS_BLUE} />
            </div>
          )}
        </div>
      )}
    </SectionCard>
  );
}

// ───────── Order summary ────────────────────────────────────────────
function Row({ label, value, green }: { label: string; value: string; green?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <span style={{ fontFamily: PW.sans, fontSize: 13, color: PW.ink500 }}>{label}</span>
      <span style={{ fontFamily: PW.mono, fontSize: 13, color: green ? "#0A7048" : PW.ink, fontWeight: green ? 700 : 500, fontVariantNumeric: "tabular-nums" }}>{value}</span>
    </div>
  );
}

function OrderSummary({ summary, cart, products, needBy, cta, onCta, secondary, sticky = true }: {
  summary: CartSummary; cart: PwCartLine[]; products: ProductMapObj; needBy: string;
  cta: string; onCta: () => void; secondary?: React.ReactNode; sticky?: boolean;
}) {
  const days = orderArrivalDays(cart, products);
  const arrival = addDays(days);
  const late = needBy ? daysBetween(arrival, needBy) > 0 : false;
  return (
    <div style={{ position: sticky ? "sticky" : "static", top: 90 }}>
      <SectionCard title="Order summary" icon="tag">
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 9 }}>
          <Row label={`Items (${summary.itemCount})`} value={money(summary.itemsGross)} />
          {summary.volumeOff > 0 && <Row label="Volume discounts" value={"−" + money(summary.volumeOff)} green />}
          {summary.spendGuarantee > 0 && <Row label="Tier credit (this order)" value={"−" + money(summary.spendGuarantee)} green />}
          <div style={{ height: 1, background: PW.line, margin: "4px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontFamily: PW.sans, fontSize: 14, fontWeight: 700, color: PW.ink }}>Total</span>
            <span style={{ fontFamily: PW.sans, fontSize: 22, fontWeight: 800, color: PW.ink, letterSpacing: "-0.01em", fontVariantNumeric: "tabular-nums" }}>{money(summary.total)}</span>
          </div>
          {(summary.volumeOff + summary.spendGuarantee) > 0 && (
            <div style={{
              marginTop: 2, padding: "7px 10px", borderRadius: 3, background: "#E6F5EC",
              fontFamily: PW.sans, fontSize: 12, fontWeight: 600, color: "#0A7048", textAlign: "center",
            }}>You&apos;re saving {money(summary.volumeOff + summary.spendGuarantee)} on this order</div>
          )}
          {summary.itemCount > 0 && (
            <div style={{
              marginTop: 2, display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
              borderRadius: 3, background: late ? "#FBE3E2" : "#FAFBF7", border: `1px solid ${late ? "#F0C9C7" : PW.line}`,
            }}>
              <Icon name="truck" size={15} color={late ? "#D6322D" : PW.mute} />
              <span style={{ fontFamily: PW.sans, fontSize: 12, color: late ? "#8B1F1B" : PW.ink500 }}>
                Est. arrival <b style={{ color: late ? "#8B1F1B" : PW.ink }}>{fmtDate(arrival)}</b> <span style={{ color: PW.mute }}>(~{days} days)</span>
                {late && <span> · after your {fmtDate(needBy)} need-by</span>}
              </span>
            </div>
          )}
          {summary.itemCount > 0 && (
            <div title="Prices reflect the most recent amount paid for each item. Vendor pricing changes over time, so the final invoiced total may be higher or lower than shown."
              style={{
                marginTop: 2, display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 10px",
                borderRadius: 3, background: "#FAFBF7", border: `1px solid ${PW.line}`, cursor: "help",
              }}>
              <span style={{ flexShrink: 0, marginTop: 0.5 }}><Icon name="info" size={14} color={PW.mute} /></span>
              <span style={{ fontFamily: PW.sans, fontSize: 11.5, color: PW.ink500, lineHeight: 1.45 }}>
                Prices reflect the last amount paid. Vendor rates fluctuate, so your final invoiced total may be higher or lower.
              </span>
            </div>
          )}
          <AppButton variant="green" size="lg" onClick={onCta} style={{ width: "100%", justifyContent: "center", marginTop: 6 }}>{cta}</AppButton>
          {secondary}
        </div>
      </SectionCard>
    </div>
  );
}

// ───────── Order urgency + need-by ──────────────────────────────────
function UrgencyCard({ meta, setMeta }: { meta: OrderMeta; setMeta: (p: Partial<OrderMeta>) => void }) {
  const levels: [string, string, string, string][] = [
    ["High", "#D6322D", "#FBE3E2", "#F0C9C7"],
    ["Medium", "#E0A60A", "#FBF0CF", "#EAD8A0"],
    ["Low", "#0E9560", "#E6F5EC", "#9FD9BC"],
  ];
  return (
    <SectionCard title="Order urgency" icon="bolt" style={{ marginBottom: 14 }}>
      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <div style={{ fontFamily: PW.sans, fontSize: 12, fontWeight: 600, color: PW.ink500, marginBottom: 7 }}>How urgent is this order?</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {levels.map(([lvl, fg, bg, br]) => {
              const on = meta.urgency === lvl;
              return (
                <button key={lvl} onClick={() => setMeta({ urgency: lvl })} style={{
                  padding: "9px 8px", borderRadius: 4, cursor: "pointer", textAlign: "center",
                  background: on ? bg : PW.white, border: `1.5px solid ${on ? br : PW.line2}`,
                }}>
                  <span style={{ display: "block", width: 9, height: 9, borderRadius: "50%", background: fg, margin: "0 auto 5px" }} />
                  <span style={{ fontFamily: PW.sans, fontSize: 12.5, fontWeight: on ? 700 : 600, color: on ? PW.ink : PW.ink500 }}>{lvl}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: PW.sans, fontSize: 12, fontWeight: 600, color: PW.ink500, marginBottom: 7 }}>Date needed by</div>
          <input type="date" value={meta.needBy} onChange={(e) => setMeta({ needBy: e.target.value })}
            style={{
              width: "100%", padding: "9px 12px", fontFamily: PW.sans, fontSize: 13, color: PW.ink,
              background: PW.white, border: `1px solid ${PW.line2}`, borderRadius: 4, outline: "none", boxSizing: "border-box",
            }} />
        </div>
      </div>
    </SectionCard>
  );
}

// ───────── Order priority — what matters most ───────────────────────
function PriorityCard({ meta, setMeta }: { meta: OrderMeta; setMeta: (p: Partial<OrderMeta>) => void }) {
  const sel = meta.priority;
  const opts: [string, string, string, string][] = [
    ["leadtime", "truck", "Lead time", "Fastest time to door"],
    ["price", "tag", "Price", "Lowest total landed cost"],
    ["speculative", "box", "Speculative buy", "Stock up ahead of need / hedge price"],
    ["reliability", "check", "Supply reliability", "Avoid backorders & substitutions"],
    ["consolidation", "building", "Fewer vendors", "Consolidate into a single shipment"],
    ["other", "plus", "Other", "Tell us what matters"],
  ];
  return (
    <SectionCard title="What matters most" icon="tag" style={{ marginBottom: 14 }}>
      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontFamily: PW.sans, fontSize: 12, fontWeight: 600, color: PW.ink500 }}>What&apos;s most important for this order?</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {opts.map(([id, ic, lbl, hint]) => {
            const on = sel === id;
            return (
              <button key={id} onClick={() => setMeta({ priority: on ? "" : id })} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "9px 11px", borderRadius: 4, cursor: "pointer",
                textAlign: "left", width: "100%",
                background: on ? "#E6F5EC" : PW.white,
                border: `1.5px solid ${on ? "#9FD9BC" : PW.line2}`,
              }}>
                <span style={{
                  width: 26, height: 26, borderRadius: 5, flexShrink: 0,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  background: on ? "#0E9560" : PW.paper2,
                }}>
                  <Icon name={ic} size={15} color={on ? "#fff" : PW.mute} />
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: "block", fontFamily: PW.sans, fontSize: 13, fontWeight: on ? 700 : 600, color: PW.ink }}>{lbl}</span>
                  <span style={{ display: "block", fontFamily: PW.sans, fontSize: 11.5, color: PW.mute }}>{hint}</span>
                </span>
                <span style={{
                  width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
                  border: `1.5px solid ${on ? "#0E9560" : PW.line2}`,
                  background: on ? "#0E9560" : "transparent",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}>{on && <Icon name="check" size={10} color="#fff" stroke={3} />}</span>
              </button>
            );
          })}
        </div>
        {sel === "other" && (
          <input autoFocus value={meta.priorityNote} onChange={(e) => setMeta({ priorityNote: e.target.value })}
            placeholder="Please specify what matters most…"
            style={{
              width: "100%", padding: "9px 12px", fontFamily: PW.sans, fontSize: 13, color: PW.ink,
              background: PW.white, border: `1px solid ${PW.line2}`, borderRadius: 4, outline: "none", boxSizing: "border-box",
            }} />
        )}
      </div>
    </SectionCard>
  );
}

// ───────── Vendor consolidation note ────────────────────────────────
function ConsolidationNote({ summary, vendors }: { summary: CartSummary; vendors: VendorMapObj }) {
  const offer = consolidationOffer(summary);
  if (!offer || offer.vendors < 2) return null;
  const vend = vendors[offer.vendor] || { key: offer.vendor, name: offer.vendor, logo: null };
  const pct = Math.round(offer.rate * 100);
  return (
    <div style={{
      marginBottom: 14, borderRadius: 6, overflow: "hidden",
      border: "1px solid #C7B98F", background: "linear-gradient(120deg, #FBF7EC, #FDFBF4)",
    }}>
      <div style={{ padding: "13px 16px", display: "flex", alignItems: "flex-start", gap: 12 }}>
        <span style={{ width: 30, height: 30, borderRadius: 6, background: "#1F6F4A", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon name="bolt" size={16} color="#fff" />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: PW.sans, fontSize: 13.5, fontWeight: 700, color: PW.ink }}>
            Consolidation tip: route your entire order through {vend.name} and save ~{pct}% ({money0(offer.save)}).
          </div>
          <div style={{ fontFamily: PW.sans, fontSize: 12, color: PW.ink500, marginTop: 3 }}>
            You&apos;re ordering from {offer.vendors} vendors — {Math.round(offer.alreadyPct * 100)}% of this order is already with them. Estimate based on their whole-order rate.
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────── Checkout ─────────────────────────────────────────────────
function CheckoutForm({ summary, cart, products, vendors, meta, onBack, onPlaced, placing }: {
  summary: CartSummary; cart: PwCartLine[]; products: ProductMapObj; vendors: VendorMapObj;
  meta: OrderMeta; onBack: () => void;
  onPlaced: (details: { po: string; ship: string; notes: string; urgency: string; needBy: string }) => void;
  placing: boolean;
}) {
  const [po, setPo] = React.useState("HELIO-2026-" + (115 + Math.floor(Math.random() * 9)));
  const [ship, setShip] = React.useState("Helio Bio, Inc. · 340 Brannan St, San Francisco, CA 94107");
  const [notes, setNotes] = React.useState("");
  const [needBy, setNeedBy] = React.useState(meta.needBy || "2026-06-20");

  const field: React.CSSProperties = {
    width: "100%", padding: "9px 12px", fontFamily: PW.sans, fontSize: 13, color: PW.ink,
    background: PW.white, border: `1px solid ${PW.line2}`, borderRadius: 4, outline: "none", boxSizing: "border-box",
  };
  const lbl: React.CSSProperties = { fontFamily: PW.sans, fontSize: 12, fontWeight: 600, color: PW.ink500, marginBottom: 6, display: "block" };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 18, alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <SectionCard title="Shipping & PO details" icon="doc" padded>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={lbl}>Ship to</label>
              <input value={ship} onChange={(e) => setShip(e.target.value)} style={field} />
            </div>
            <div>
              <label style={lbl}>PO number</label>
              <input value={po} onChange={(e) => setPo(e.target.value)} style={{ ...field, fontFamily: PW.mono, fontSize: 12 }} />
            </div>
            <div>
              <label style={lbl}>Need by</label>
              <input type="date" value={needBy} onChange={(e) => setNeedBy(e.target.value)} style={field} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={lbl}>Notes for ProcureWide (optional)</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
                placeholder="Cold-chain requirements, dock hours, substitutions allowed…"
                style={{ ...field, resize: "vertical" }} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title={`Review — ${summary.itemCount} items`} icon="cart">
          {summary.vendorGroups.map((g) => (
            <div key={g.vendor}>
              <div style={{
                padding: "8px 14px", background: "#FAFBF7", borderBottom: `1px solid ${PW.line}`,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                {g.vendor === "tbd"
                  ? <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: PW.sans, fontSize: 12, fontWeight: 600, color: PW.ink500 }}><Icon name="bolt" size={13} color="#E0A60A" /> Custom requests</span>
                  : <VendorMark vendor={vendors[g.vendor] || { key: g.vendor, name: g.vendor, logo: null }} height={13} />}
                <span style={{ flex: 1 }} />
                <span style={{ fontFamily: PW.mono, fontSize: 12, color: PW.ink500 }}>{g.vendor === "tbd" && g.net === 0 ? "TBD" : money(g.net)}</span>
              </div>
              {g.lines.map((l) => (
                <div key={l.sku} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "8px 14px",
                  borderBottom: `1px solid ${PW.line}`, fontFamily: PW.sans, fontSize: 13,
                }}>
                  <span style={{ fontFamily: PW.mono, fontSize: 11.5, color: PW.mute, width: 28 }}>{l.qty}×</span>
                  <span style={{ flex: 1, color: PW.ink }}>{l.p.name}</span>
                  <span style={{ fontFamily: PW.mono, fontSize: 12, color: PW.ink500 }}>{money(l.net)}</span>
                </div>
              ))}
            </div>
          ))}
        </SectionCard>
      </div>

      <OrderSummary summary={summary} cart={cart} products={products} needBy={needBy}
        cta={placing ? "Placing…" : "Place order"}
        onCta={() => { if (!placing) onPlaced({ po, ship, notes, urgency: meta.urgency, needBy }); }}
        secondary={<AppButton variant="ghost" icon="arrowR" onClick={onBack} style={{ width: "100%", justifyContent: "center" }}>Back to cart</AppButton>}
      />
    </div>
  );
}

// ───────── Page ──────────────────────────────────────────────────────
export default function CartScreen({ products, vendors, cart, bookedSpend }: {
  products: ProductMapObj; vendors: VendorMapObj; cart: PwCartLine[]; bookedSpend: Record<string, number>;
}) {
  const router = useRouter();
  const [step, setStep] = React.useState<"cart" | "checkout">("cart");
  const [meta, setMetaState] = React.useState<OrderMeta>({ urgency: "Medium", needBy: "", priority: "", priorityNote: "" });
  const [pending, startTransition] = React.useTransition();
  const [placing, setPlacing] = React.useState(false);
  const [detailSku, setDetailSku] = React.useState<string | null>(null);

  const setMeta = (patch: Partial<OrderMeta>) => setMetaState((m) => ({ ...m, ...patch }));
  const summary = React.useMemo(() => cartSummary(cart, products, bookedSpend), [cart, products, bookedSpend]);

  const setQty = (sku: string, qty: number) => startTransition(async () => { await setCartQtyAction(sku, qty); });
  // Pending custom items live in pw_products — removing them deletes the request too.
  const remove = (sku: string) => startTransition(async () => {
    if (products[sku]?.pending) await removeCustomItemAction(sku);
    else await removeFromCartAction(sku);
  });
  const clear = () => startTransition(async () => { await clearCartAction(); Toast.show("Cart cleared"); });

  const handleCsv = (rows: Record<string, string>[]) => {
    startTransition(async () => {
      const res = await importCartRowsAction(rows.map((r) => ({
        sku: r.sku, catalog: r["catalog #"] || r.catalog, name: r.name, link: r.link,
        price: r["list price"] || r.price, qty: r.qty,
      })));
      const parts: string[] = [];
      if (res.added) parts.push(`${res.added} catalog line${res.added > 1 ? "s" : ""}`);
      if (res.custom) parts.push(`${res.custom} custom (pending review)`);
      if (parts.length) Toast.show(`Imported ${parts.join(" · ")}${res.skipped ? ` · ${res.skipped} skipped` : ""}`);
      else Toast.show("Nothing usable in that CSV — add an item name or catalog #", { tone: "danger" });
    });
  };

  const exportCart = () => {
    if (!cart.length) return;
    const rows = cart
      .filter((l) => products[l.sku])
      .map((l) => ({ catalog: products[l.sku].catalog_no || "", sku: l.sku, name: products[l.sku].name, qty: l.qty }));
    downloadText("procurewide-cart.csv", toCSV(rows, [
      { key: "catalog", label: "catalog #" }, { key: "sku", label: "sku" },
      { key: "name", label: "name" }, { key: "qty", label: "qty" },
    ]));
    Toast.show("Cart exported to CSV");
  };

  const placeOrder = (details: { po: string; ship: string; notes: string; urgency: string; needBy: string }) => {
    setPlacing(true);
    startTransition(async () => {
      try {
        const res = await placeOrderAction(details);
        Toast.show("Order " + res.orderNum + " placed");
        router.push("/app/orders");
      } catch (e) {
        setPlacing(false);
        Toast.show(e instanceof Error ? e.message : "Could not place order", { tone: "danger" });
      }
    });
  };

  if (step === "checkout") {
    return (
      <div>
        <PageHeader icon="cart" kicker="Ordering · Checkout" title="Review & place order" />
        <div style={{ padding: "18px 28px 60px", maxWidth: 1100, margin: "0 auto", opacity: pending ? 0.7 : 1 }}>
          <CheckoutForm summary={summary} cart={cart} products={products} vendors={vendors} meta={meta}
            onBack={() => setStep("cart")} onPlaced={placeOrder} placing={placing} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader icon="cart" kicker="Ordering" title="Cart">
        <CsvUpload label="Upload cart CSV" onRows={handleCsv} />
        <AppButton variant="ghost" icon="download" onClick={exportCart} disabled={!cart.length}>Export</AppButton>
      </PageHeader>

      <div style={{ padding: "18px 28px 60px", maxWidth: 1100, margin: "0 auto", opacity: pending ? 0.7 : 1 }}>
        {cart.length === 0 ? (
          <SectionCard>
            <EmptyState icon="cart" title="Your cart is empty"
              sub="Browse the catalog and add items, request a custom item we'll source for you, or bulk-upload a cart from a CSV file."
              action={<div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                <AppButton variant="primary" icon="order" onClick={() => router.push("/app/catalog")}>Browse catalog</AppButton>
                <AppButton variant="secondary" icon="plus" onClick={() => router.push("/app/catalog?request=1")}>Request custom item</AppButton>
                <CsvUpload label="Upload cart CSV" onRows={handleCsv} />
              </div>} />
          </SectionCard>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 18, alignItems: "start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontFamily: PW.sans, fontWeight: 700, fontSize: 15, color: PW.ink }}>
                  {summary.itemCount} item{summary.itemCount !== 1 ? "s" : ""} · {summary.vendorGroups.length} vendor{summary.vendorGroups.length !== 1 ? "s" : ""}
                </span>
                <button onClick={clear} style={{
                  background: "transparent", border: 0, color: PW.mute, cursor: "pointer",
                  fontFamily: PW.sans, fontSize: 12.5, fontWeight: 600,
                }}>Clear cart</button>
              </div>
              {summary.pendingCount > 0 && (
                <div style={{ marginBottom: 12, borderRadius: 6, overflow: "hidden", border: `1px solid ${AMBER.line}`, background: AMBER.bg }}>
                  <div style={{ padding: "12px 14px", display: "flex", gap: 11, alignItems: "flex-start" }}>
                    <span style={{ width: 26, height: 26, borderRadius: 6, background: AMBER.dot, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name="clock" size={15} color="#fff" />
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: PW.sans, fontSize: 13, fontWeight: 700, color: "#5E4708" }}>{summary.pendingCount} custom item{summary.pendingCount !== 1 ? "s" : ""} pending catalog approval</div>
                      <div style={{ fontFamily: PW.sans, fontSize: 12.5, color: "#6E5510", lineHeight: 1.5, marginTop: 2 }}>
                        New items aren&apos;t in your catalog until an admin verifies and sources them. You can place this order — ProcureWide confirms pricing{summary.hasUnpriced ? " for items marked TBD" : ""} and availability before anything ships.
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {summary.vendorGroups.map((g) => <VendorGroup key={g.vendor} g={g} vendors={vendors} onChange={setQty} onRemove={remove} onOpen={setDetailSku} />)}
            </div>
            <div>
              <UrgencyCard meta={meta} setMeta={setMeta} />
              <PriorityCard meta={meta} setMeta={setMeta} />
              <ConsolidationNote summary={summary} vendors={vendors} />
              <OrderSummary summary={summary} cart={cart} products={products} needBy={meta.needBy}
                cta="Proceed to checkout" onCta={() => setStep("checkout")}
                secondary={<AppButton variant="ghost" icon="order" onClick={() => router.push("/app/catalog")} style={{ width: "100%", justifyContent: "center" }}>Add more items</AppButton>} />
            </div>
          </div>
        )}
      </div>

      {detailSku && products[detailSku] && (
        <ItemDetailDrawer product={products[detailSku]} vendors={vendors} onClose={() => setDetailSku(null)} />
      )}
    </div>
  );
}
