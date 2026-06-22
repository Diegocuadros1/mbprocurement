"use client";

// Discounts & forecast — vendor spend-tier guarantees with live progress,
// product volume tiers, and a forecast of what to buy to unlock the next tier.

import React from "react";
import { useRouter } from "next/navigation";
import { PW, SLDS_BLUE } from "@/lib/portal/pw";
import {
  PageHeader, SectionCard, AppButton, StatusPill, Progress, VendorMark, Icon, Kpi,
} from "@/components/portal/kit";
import { SPEND_TIERS, VOLUME_TIERS, spendStatus, money0 } from "@/lib/portal/pricing";
import type { PwVendor } from "@/lib/portal/types";

function vendorFor(vendors: Record<string, PwVendor>, key: string): PwVendor {
  return vendors[key] || { key, name: key, logo: null };
}

function VendorTierCard({ vendorKey, vendor, booked }: {
  vendorKey: string; vendor: PwVendor; booked: number;
}) {
  const st = spendStatus(vendorKey, booked);
  const maxAt = st.tiers[st.tiers.length - 1].at;
  const pct = Math.min(100, (st.total / maxAt) * 100);

  return (
    <SectionCard
      title={vendor.name}
      icon="building"
      action={st.guaranteed > 0
        ? <StatusPill tone="success">{money0(st.guaranteed)} unlocked</StatusPill>
        : <StatusPill tone="neutral">No tier yet</StatusPill>}
    >
      <div style={{ padding: "16px 16px 18px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
          <div>
            <span style={{ fontFamily: PW.display, fontWeight: 700, fontSize: 26, color: PW.ink, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em" }}>{money0(st.total)}</span>
            <span style={{ fontFamily: PW.sans, fontSize: 12.5, color: PW.mute, marginLeft: 6 }}>spend this quarter</span>
          </div>
          {st.next && (
            <span style={{ fontFamily: PW.sans, fontSize: 12.5, color: PW.ink500 }}>
              <b style={{ color: PW.ink }}>{money0(st.toNext)}</b> to next tier
            </span>
          )}
        </div>

        {/* Tiered track */}
        <div style={{ position: "relative", marginBottom: 8 }}>
          <Progress pct={pct} color={SLDS_BLUE} height={8} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {st.tiers.map((t, i) => {
            const hit = st.total >= t.at;
            return (
              <div key={i} style={{
                flex: 1, padding: "8px 10px", borderRadius: 4,
                border: `1px solid ${hit ? "#9FD9BC" : PW.line}`,
                background: hit ? "#E6F5EC" : PW.white,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  {hit && <span style={{ width: 14, height: 14, borderRadius: 3, background: "#0E9560", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="check" size={9} color="#fff" stroke={3} /></span>}
                  <span style={{ fontFamily: PW.sans, fontSize: 11.5, fontWeight: 700, color: hit ? "#0A7048" : PW.ink500 }}>Spend {money0(t.at)}</span>
                </div>
                <div style={{ fontFamily: PW.sans, fontSize: 12.5, color: hit ? "#0A7048" : PW.mute, marginTop: 3, fontWeight: 600 }}>
                  Save {money0(t.save)}
                </div>
              </div>
            );
          })}
        </div>

        {st.next && (
          <div style={{
            marginTop: 12, padding: "9px 12px", borderRadius: 4, background: "#FAFBF7",
            border: `1px solid ${PW.line}`, display: "flex", alignItems: "center", gap: 8,
            fontFamily: PW.sans, fontSize: 12.5, color: PW.ink500,
          }}>
            <Icon name="bolt" size={15} color={SLDS_BLUE} />
            Spend <b style={{ color: PW.ink }}>{money0(st.toNext)}</b> more with {vendor.name} and we guarantee <b style={{ color: "#0A7048" }}>{money0(st.next.save)}</b> off — that&apos;s {Math.round((st.next.save / st.next.at) * 100)}% back on your tier spend.
          </div>
        )}
      </div>
    </SectionCard>
  );
}

export default function DiscountsScreen({ vendors, bookedSpend }: {
  vendors: Record<string, PwVendor>; bookedSpend: Record<string, number>;
}) {
  const router = useRouter();
  const vendorKeys = Object.keys(SPEND_TIERS);
  const booked = (k: string) => bookedSpend[k] || 0;

  const totalGuaranteed = vendorKeys.reduce((a, k) => a + spendStatus(k, booked(k)).guaranteed, 0);
  const totalPotential = vendorKeys.reduce((a, k) => {
    const st = spendStatus(k, booked(k));
    return a + (st.next ? st.next.save : st.guaranteed);
  }, 0);

  // Forecast: closest-to-next-tier vendors
  const forecast = vendorKeys
    .map((k) => ({ k, st: spendStatus(k, booked(k)) }))
    .filter((x) => x.st.next)
    .sort((a, b) => a.st.toNext - b.st.toNext)
    .slice(0, 3);

  return (
    <div>
      <PageHeader icon="tag" kicker="Operations" title="Discounts & forecast" />

      <div style={{ padding: "18px 28px 60px", maxWidth: 1200, margin: "0 auto" }}>
        {/* Hero KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>
          <Kpi label="Guaranteed savings unlocked" value={money0(totalGuaranteed)} tone="green" icon="check" sub="this quarter, across vendors" />
          <Kpi label="Reachable this quarter" value={money0(totalPotential)} tone="blue" icon="bolt" sub="if you hit the next tier" />
          <Kpi label="Active programs" value={vendorKeys.length} icon="building" sub="vendor spend agreements" />
        </div>

        {/* Forecast */}
        {forecast.length > 0 && (
          <SectionCard title="Forecast — closest savings to unlock" icon="bolt" style={{ marginBottom: 20 }}>
            <div style={{ padding: 14, display: "grid", gridTemplateColumns: `repeat(${forecast.length}, 1fr)`, gap: 12 }}>
              {forecast.map(({ k, st }) => {
                const v = vendorFor(vendors, k);
                return (
                  <div key={k} style={{
                    padding: 14, border: `1px solid ${PW.line}`, borderRadius: 4, background: "#FAFBF7",
                    display: "flex", flexDirection: "column", gap: 8,
                  }}>
                    <VendorMark vendor={v} height={15} withName={false} />
                    <div style={{ fontFamily: PW.sans, fontSize: 13, color: PW.ink500 }}>
                      Add <b style={{ color: PW.ink }}>{money0(st.toNext)}</b> → save <b style={{ color: "#0A7048" }}>{money0(st.next!.save)}</b>
                    </div>
                    <Progress pct={Math.min(100, (st.total / st.next!.at) * 100)} color={SLDS_BLUE} />
                    <AppButton variant="secondary" size="sm" icon="order" onClick={() => router.push("/app/catalog")} style={{ marginTop: 2, justifyContent: "center" }}>
                      Shop {v.name.split(" ")[0]}
                    </AppButton>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        )}

        {/* Vendor tier cards */}
        <div style={{ fontFamily: PW.sans, fontSize: 11, fontWeight: 700, color: PW.mute, textTransform: "uppercase", letterSpacing: "0.06em", margin: "4px 2px 12px" }}>
          Vendor spend-tier guarantees
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(440px, 1fr))", gap: 14, marginBottom: 22 }}>
          {vendorKeys.map((k) => <VendorTierCard key={k} vendorKey={k} vendor={vendorFor(vendors, k)} booked={booked(k)} />)}
        </div>

        {/* Volume tiers */}
        <SectionCard title="Per-order volume discounts" icon="tag">
          <div style={{ padding: "14px 16px", fontFamily: PW.sans, fontSize: 13, color: PW.ink500, borderBottom: `1px solid ${PW.line}` }}>
            These apply automatically per line in your cart — the more units of an item you order, the deeper the discount.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
            {VOLUME_TIERS.map((t, i) => (
              <div key={i} style={{
                padding: "18px 20px", textAlign: "center",
                borderRight: i < VOLUME_TIERS.length - 1 ? `1px solid ${PW.line}` : 0,
              }}>
                <div style={{ fontFamily: PW.display, fontWeight: 700, fontSize: 34, color: PW.green, letterSpacing: "-0.01em" }}>{Math.round(t.off * 100)}%</div>
                <div style={{ fontFamily: PW.sans, fontSize: 13, color: PW.ink500, marginTop: 2 }}>off any line of <b style={{ color: PW.ink }}>{t.qty}+ units</b></div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
