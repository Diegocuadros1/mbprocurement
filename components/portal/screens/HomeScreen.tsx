"use client";

// Home — operational overview: KPIs, discount progress, low-stock reorder,
// recent orders, quick actions. No AI, just signal the customer acts on.

import React from "react";
import { useRouter } from "next/navigation";
import { PW, SLDS_BLUE } from "@/lib/portal/pw";
import {
  Icon, ObjIcon, SectionCard, AppButton, StatusPill, VendorMark, Kpi, Progress,
  PageHeader, EmptyState, Toast,
} from "@/components/portal/kit";
import {
  SPEND_TIERS, spendStatus, cartSummary, invStatus, money, money0,
} from "@/lib/portal/pricing";
import { addToCartAction } from "@/lib/portal/actions";
import type {
  PwVendor, PwProduct, PwCartLine, PwInventoryRow, PwOrder,
} from "@/lib/portal/types";

function statusTone(status: string): "neutral" | "success" | "warning" | "danger" | "info" {
  if (status === "Delivered") return "success";
  if (status === "In transit") return "info";
  if (status === "Processing") return "warning";
  if (status === "Cancelled") return "danger";
  return "neutral";
}

function QuickAction({ icon, label, sub, onClick }: {
  icon: string; label: string; sub: React.ReactNode; onClick: () => void;
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", textAlign: "left",
        background: PW.white, border: `1px solid ${hover ? PW.line2 : PW.line}`, borderRadius: 4,
        cursor: "pointer", boxShadow: hover ? PW.shadowMd : "none", transition: "all 140ms ease",
      }}>
      <ObjIcon name={icon} size={34} color={SLDS_BLUE} />
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: PW.sans, fontWeight: 700, fontSize: 14, color: PW.ink }}>{label}</div>
        <div style={{ fontFamily: PW.sans, fontSize: 12, color: PW.mute, marginTop: 1 }}>{sub}</div>
      </div>
      <Icon name="arrowR" size={16} color={PW.mute} />
    </button>
  );
}

export default function HomeScreen({ account, orders, inventory, bookedSpend, cart, vendors, productMapObj }: {
  account: { name: string; initials: string; plan: string; quarter: string };
  orders: PwOrder[];
  inventory: PwInventoryRow[];
  bookedSpend: Record<string, number>;
  cart: PwCartLine[];
  vendors: Record<string, PwVendor>;
  productMapObj: Record<string, PwProduct>;
}) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();

  const vendor = (key: string): PwVendor => vendors[key] || { key, name: key, logo: null };
  const product = (sku: string): PwProduct | undefined => productMapObj[sku];

  const lows = inventory.filter((r) => invStatus(r) !== "ok");
  const cartCount = cart.reduce((a, l) => a + l.qty, 0);
  const openOrders = orders.filter((o) => o.status === "Processing" || o.status === "In transit");
  const qtdSpend = Object.values(bookedSpend).reduce((a, b) => a + b, 0);
  const savedQtr = Object.keys(SPEND_TIERS).reduce((a, k) => a + spendStatus(k, bookedSpend[k] || 0).guaranteed, 0);

  // Best next-tier opportunity
  const nextOpp = Object.keys(SPEND_TIERS)
    .map((k) => ({ k, st: spendStatus(k, bookedSpend[k] || 0) }))
    .filter((x) => x.st.next)
    .sort((a, b) => a.st.toNext - b.st.toNext)[0];

  const recent = orders.slice(0, 4);
  const summary = cartSummary(cart, productMapObj, bookedSpend);

  // KPI breakdown data
  const spendDetails = Object.entries(bookedSpend)
    .map(([k, v]) => ({ label: vendor(k).name, value: money0(v), raw: v }))
    .sort((a, b) => b.raw - a.raw);
  const savingsDetails = Object.keys(SPEND_TIERS)
    .map((k) => ({ k, g: spendStatus(k, bookedSpend[k] || 0).guaranteed }))
    .filter((x) => x.g > 0)
    .sort((a, b) => b.g - a.g)
    .map((x) => ({ label: vendor(x.k).name, value: money0(x.g), tone: "#0A7048" }));
  const openDetails = openOrders.map((o) => ({
    label: o.order_num + " · " + o.status, value: money(o.total),
    dot: o.status === "In transit" ? SLDS_BLUE : "#E0A60A",
    onClick: () => router.push("/app/orders"),
  }));
  const lowDetails = lows.map((r) => {
    const p = product(r.sku);
    return {
      label: p ? p.name : r.sku, value: r.on_hand + " on hand",
      tone: r.on_hand <= 0 ? "#8B1F1B" : "#8A6308",
      dot: r.on_hand <= 0 ? "#D6322D" : "#E0A60A",
      onClick: () => router.push("/app/inventory"),
    };
  });

  const reorder = (sku: string, need: number, name: string) => {
    startTransition(async () => {
      await addToCartAction(sku, need);
      Toast.show(`Added ${need} × ${name} to cart`, { action: { label: "Cart", onClick: () => router.push("/app/cart") } });
    });
  };

  return (
    <div>
      <PageHeader icon="home" kicker={`${account.name} · ${account.quarter}`} title="Welcome back">
        <AppButton variant="primary" icon="order" onClick={() => router.push("/app/catalog")}>New order</AppButton>
      </PageHeader>

      <div style={{ padding: "20px 28px 60px", maxWidth: 1280, margin: "0 auto", opacity: pending ? 0.7 : 1 }}>
        {/* KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 18 }}>
          <Kpi label="Spend this quarter" value={money0(qtdSpend)} icon="tag" sub="across all vendors"
            details={spendDetails} viewAll={{ label: "Discounts & forecast", cta: "Open Discounts & forecast", onClick: () => router.push("/app/discounts") }} />
          <Kpi label="Guaranteed savings" value={money0(savedQtr)} tone="green" icon="bolt" sub="tiers unlocked"
            details={savingsDetails} viewAll={{ label: "Discounts & forecast", cta: "Open Discounts & forecast", onClick: () => router.push("/app/discounts") }} />
          <Kpi label="Open orders" value={openOrders.length} tone={openOrders.length ? "blue" : undefined} icon="truck" sub="in transit or processing"
            details={openDetails} viewAll={{ label: "Order history", cta: "Open Order history", onClick: () => router.push("/app/orders") }} />
          <Kpi label="Low on stock" value={lows.length} tone={lows.length ? "danger" : undefined} icon="alert" sub="below reorder point"
            details={lowDetails} viewAll={{ label: "Inventory", cta: "Open Inventory", onClick: () => router.push("/app/inventory") }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 18, alignItems: "start" }}>
          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Discount opportunity banner */}
            {nextOpp && nextOpp.st.next && (
              <div style={{
                borderRadius: 6, overflow: "hidden",
                background: "linear-gradient(120deg, #07112A 0%, #0B2A4A 60%, #0A5C3D 130%)",
                padding: "20px 22px", color: "#fff", position: "relative",
              }}>
                <div style={{ fontFamily: PW.sans, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#7CD9A7" }}>
                  Savings within reach
                </div>
                <div style={{ fontFamily: PW.sans, fontSize: 19, fontWeight: 700, marginTop: 6, letterSpacing: "-0.01em", textWrap: "pretty" }}>
                  Spend {money0(nextOpp.st.toNext)} more with {vendor(nextOpp.k).name} and we guarantee {money0(nextOpp.st.next.save)} off your order.
                </div>
                <div style={{ marginTop: 14, marginBottom: 6 }}>
                  <Progress pct={Math.min(100, (nextOpp.st.total / nextOpp.st.next.at) * 100)} color="#28B57A" track="rgba(255,255,255,0.18)" height={7} />
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: PW.mono, fontSize: 12, color: "rgba(255,255,255,0.75)" }}>
                    {money0(nextOpp.st.total)} / {money0(nextOpp.st.next.at)} this quarter
                  </span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <AppButton variant="green" size="sm" icon="order" onClick={() => router.push("/app/catalog")}>Shop {vendor(nextOpp.k).name.split(" ")[0]}</AppButton>
                    <AppButton size="sm" onClick={() => router.push("/app/discounts")} style={{ background: "rgba(255,255,255,0.14)", color: "#fff" }}>All programs</AppButton>
                  </div>
                </div>
              </div>
            )}

            {/* Low stock reorder */}
            <SectionCard title="Reorder — low on stock" icon="box"
              action={<button onClick={() => router.push("/app/inventory")} style={{ background: "transparent", border: 0, color: SLDS_BLUE, fontFamily: PW.sans, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View inventory</button>}>
              {lows.length === 0
                ? <EmptyState icon="check" title="Everything's stocked" sub="No items are below their reorder point." />
                : lows.slice(0, 5).map((r, i) => {
                  const p = product(r.sku);
                  const name = p ? p.name : r.sku;
                  const need = Math.max(1, (r.reorder * 2) - r.on_hand);
                  return (
                    <div key={r.sku} style={{
                      display: "flex", alignItems: "center", gap: 12, padding: "11px 16px",
                      borderBottom: i === Math.min(lows.length, 5) - 1 ? 0 : `1px solid ${PW.line}`,
                    }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: PW.sans, fontWeight: 600, fontSize: 13.5, color: PW.ink }}>{name}</div>
                        {p && (
                          <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 2 }}>
                            <VendorMark vendor={vendor(p.vendor)} height={11} nameStyle={{ fontSize: 11.5 }} />
                          </div>
                        )}
                      </div>
                      <StatusPill tone={invStatus(r) === "out" ? "danger" : "warning"}>
                        {r.on_hand} on hand
                      </StatusPill>
                      <AppButton variant="primary" size="sm" icon="cart"
                        onClick={() => reorder(r.sku, need, name)}>
                        Reorder {need}
                      </AppButton>
                    </div>
                  );
                })}
            </SectionCard>

            {/* Recent orders */}
            <SectionCard title="Recent orders" icon="clock"
              action={<button onClick={() => router.push("/app/orders")} style={{ background: "transparent", border: 0, color: SLDS_BLUE, fontFamily: PW.sans, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View all</button>}>
              {recent.length === 0
                ? <EmptyState icon="clock" title="No orders yet" sub="Your placed orders will show up here." />
                : recent.map((o, i) => {
                  const itemCount = (o.pw_order_items || []).reduce((a, l) => a + l.qty, 0);
                  return (
                    <div key={o.id} onClick={() => router.push("/app/orders")} style={{
                      display: "grid", gridTemplateColumns: "110px 1fr 110px 110px", gap: 10, alignItems: "center",
                      padding: "11px 16px", borderBottom: i === recent.length - 1 ? 0 : `1px solid ${PW.line}`, cursor: "pointer",
                    }}>
                      <span style={{ fontFamily: PW.mono, fontSize: 12.5, color: SLDS_BLUE }}>{o.order_num}</span>
                      <span style={{ fontFamily: PW.sans, fontSize: 12.5, color: PW.ink500 }}>{itemCount} items · {fmtCreated(o.created_at)}</span>
                      <span style={{ fontFamily: PW.sans, fontWeight: 700, fontSize: 13, color: PW.ink, fontVariantNumeric: "tabular-nums" }}>{money(o.total)}</span>
                      <span style={{ justifySelf: "start" }}><StatusPill tone={statusTone(o.status)}>{o.status}</StatusPill></span>
                    </div>
                  );
                })}
            </SectionCard>
          </div>

          {/* Right column — quick actions + cart */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, position: "sticky", top: 90 }}>
            {cartCount > 0 && (
              <div style={{
                background: PW.white, border: `1px solid ${PW.line}`, borderRadius: 4, padding: 16,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <ObjIcon name="cart" size={30} color={SLDS_BLUE} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: PW.sans, fontWeight: 700, fontSize: 14, color: PW.ink }}>{cartCount} items in cart</div>
                    <div style={{ fontFamily: PW.sans, fontSize: 12, color: PW.mute }}>{money(summary.total)} · {summary.vendorGroups.length} vendors</div>
                  </div>
                </div>
                <AppButton variant="green" size="md" icon="arrowR" onClick={() => router.push("/app/cart")} style={{ width: "100%", justifyContent: "center", marginTop: 12 }}>Go to cart</AppButton>
              </div>
            )}

            <div style={{ fontFamily: PW.sans, fontSize: 11, fontWeight: 700, color: PW.mute, textTransform: "uppercase", letterSpacing: "0.06em", margin: "4px 2px 0" }}>Quick actions</div>
            <QuickAction icon="order" label="Order catalog" sub="Browse & add items" onClick={() => router.push("/app/catalog")} />
            <QuickAction icon="upload" label="Upload a cart" sub="Bulk add from CSV" onClick={() => router.push("/app/cart")} />
            <QuickAction icon="box" label="Inventory" sub={`${lows.length} need reorder`} onClick={() => router.push("/app/inventory")} />
            <QuickAction icon="tag" label="Discounts & forecast" sub={`${money0(savedQtr)} unlocked`} onClick={() => router.push("/app/discounts")} />
          </div>
        </div>
      </div>
    </div>
  );
}

function fmtCreated(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
