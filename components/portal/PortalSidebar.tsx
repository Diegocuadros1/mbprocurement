"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { PW, SLDS_BLUE } from "@/lib/portal/pw";
import { Icon, ObjIcon } from "./kit";
import { money0 } from "@/lib/portal/pricing";

const SIDE_NAV: { sec?: string; items: { href: string; label: string; icon: string; cart?: boolean }[] }[] = [
  { items: [{ href: "/app", label: "Home", icon: "home" }] },
  {
    sec: "Ordering",
    items: [
      { href: "/app/catalog", label: "Order catalog", icon: "order" },
      { href: "/app/cart", label: "Cart", icon: "cart", cart: true },
      { href: "/app/orders", label: "Order history", icon: "clock" },
    ],
  },
  {
    sec: "Operations",
    items: [
      { href: "/app/inventory", label: "Inventory", icon: "box" },
      { href: "/app/discounts", label: "Discounts & forecast", icon: "tag" },
      { href: "/app/documents", label: "Documents & forms", icon: "doc" },
    ],
  },
];

function NavRow({ href, label, icon, isActive, count, cart }: {
  href: string; label: string; icon: string; isActive: boolean; count: number; cart?: boolean;
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <Link href={href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "6px 8px",
        background: isActive ? "#EAF1FB" : hover ? "#F2F1ED" : "transparent",
        color: isActive ? PW.ink : PW.ink500, border: 0, borderRadius: 3, fontFamily: PW.sans, fontSize: 13,
        fontWeight: isActive ? 600 : 500, textAlign: "left", position: "relative", textDecoration: "none" }}>
      {isActive && <span style={{ position: "absolute", left: -12, top: 5, bottom: 5, width: 3, background: SLDS_BLUE, borderRadius: "0 2px 2px 0" }} />}
      <ObjIcon name={icon} size={20} color={isActive ? SLDS_BLUE : "#5A6A8E"} />
      <span style={{ flex: 1, letterSpacing: "-0.005em" }}>{label}</span>
      {cart && count > 0 && (
        <span style={{ minWidth: 18, height: 18, padding: "0 5px", borderRadius: 9, background: SLDS_BLUE, color: "#fff",
          fontFamily: PW.sans, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", fontVariantNumeric: "tabular-nums" }}>
          {count}
        </span>
      )}
    </Link>
  );
}

export default function PortalSidebar({ cartCount, lowCount, savedQtr, account }: {
  cartCount: number; lowCount: number; savedQtr: number;
  account: { name: string; initials: string; plan: string; quarter: string };
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (href: string) => (href === "/app" ? pathname === "/app" : pathname.startsWith(href));

  return (
    <aside style={{ width: 224, minHeight: "100vh", background: "#FAFAF7", borderRight: `1px solid ${PW.line}`,
      display: "flex", flexDirection: "column", padding: "14px 12px", position: "sticky", top: 0, alignSelf: "flex-start",
      maxHeight: "100vh", overflowY: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "4px 8px 12px", borderBottom: `1px solid ${PW.line}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/pw/logo.png" alt="" style={{ width: 22, height: 22, objectFit: "contain" }} />
        <span style={{ fontFamily: PW.sans, fontWeight: 800, fontSize: 13, color: PW.ink, letterSpacing: "-0.01em" }}>ProcureWide</span>
        <span style={{ flex: 1 }} />
        <span style={{ fontFamily: PW.mono, fontSize: 9, color: PW.mute, padding: "2px 5px", background: "#F0F0EC", borderRadius: 3, letterSpacing: "0.02em" }}>
          {account.quarter}
        </span>
      </div>

      <button onClick={() => router.push("/app/catalog")} style={{ margin: "12px 0 6px", padding: "9px 12px", background: SLDS_BLUE,
        color: "#fff", border: 0, borderRadius: 3, display: "flex", alignItems: "center", gap: 8, fontFamily: PW.sans, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
        <Icon name="plus" size={14} stroke={2.4} />
        New order
      </button>

      <nav style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8, flex: 1 }}>
        {SIDE_NAV.map((grp, gi) => (
          <div key={gi}>
            {grp.sec && (
              <div style={{ padding: "8px 8px 4px", fontFamily: PW.sans, fontSize: 10, fontWeight: 700, color: PW.mute, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {grp.sec}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {grp.items.map((it) => (
                <NavRow key={it.href} {...it} isActive={isActive(it.href)} count={cartCount} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {lowCount > 0 && (
        <Link href="/app/inventory" style={{ margin: "4px 0 8px", padding: "9px 10px", textAlign: "left", background: "#FBE3E2",
          border: "1px solid #F0C9C7", borderRadius: 4, display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <Icon name="alert" size={15} color="#D6322D" />
          <span style={{ fontFamily: PW.sans, fontSize: 12, fontWeight: 600, color: "#8B1F1B" }}>
            {lowCount} item{lowCount > 1 ? "s" : ""} low on stock
          </span>
        </Link>
      )}

      <div style={{ marginTop: "auto", padding: 10, background: PW.white, border: `1px solid ${PW.line}`, borderRadius: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 4, background: "linear-gradient(135deg, #0E9560, #07112A)",
            display: "flex", alignItems: "center", justifyContent: "center", fontFamily: PW.sans, fontWeight: 700, fontSize: 10, color: "#fff" }}>
            {account.initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: PW.sans, fontWeight: 600, fontSize: 12, color: PW.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {account.name}
            </div>
            <div style={{ fontFamily: PW.sans, fontSize: 11, color: PW.mute }}>{account.plan} plan</div>
          </div>
        </div>
        <div style={{ marginTop: 9, paddingTop: 9, borderTop: `1px solid ${PW.line}`, display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <span style={{ fontFamily: PW.sans, fontSize: 11, color: PW.mute }}>Guaranteed savings</span>
          <span style={{ fontFamily: PW.mono, fontSize: 13, fontWeight: 600, color: "#0A7048" }}>{money0(savedQtr)}</span>
        </div>
      </div>
    </aside>
  );
}
