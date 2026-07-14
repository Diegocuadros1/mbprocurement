"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { PW, SLDS_BLUE } from "@/lib/portal/pw";
import { Icon, ObjIcon } from "./kit";
import { money0 } from "@/lib/portal/pricing";
import { signOutAction } from "@/lib/portal/actions";

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

function NewOrderItem({ icon, title, sub, onClick }: {
  icon: string; title: string; sub: string; onClick: () => void;
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 11px",
        background: hover ? "#F2F1ED" : PW.white, border: 0, borderBottom: `1px solid ${PW.line}`,
        cursor: "pointer", textAlign: "left" }}>
      <ObjIcon name={icon} size={26} color={hover ? SLDS_BLUE : "#5A6A8E"} />
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "block", fontFamily: PW.sans, fontSize: 13, fontWeight: 700, color: PW.ink }}>{title}</span>
        <span style={{ display: "block", fontFamily: PW.sans, fontSize: 11.5, color: PW.mute }}>{sub}</span>
      </span>
    </button>
  );
}

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

export default function PortalSidebar({ cartCount, lowCount, savedQtr, account, isAdmin = false, isActing = false }: {
  cartCount: number; lowCount: number; savedQtr: number;
  account: { name: string; initials: string; plan: string; quarter: string };
  isAdmin?: boolean;
  isActing?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (href: string) => (href === "/app" ? pathname === "/app" : pathname.startsWith(href));
  const [newOpen, setNewOpen] = React.useState(false);
  const [loggingOut, startLogout] = React.useTransition();

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

      <div style={{ position: "relative", margin: "12px 0 6px" }}>
        <button onClick={() => setNewOpen((o) => !o)} style={{ width: "100%", padding: "9px 12px", background: SLDS_BLUE,
          color: "#fff", border: 0, borderRadius: 3, display: "flex", alignItems: "center", gap: 8, fontFamily: PW.sans, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          <Icon name="plus" size={14} stroke={2.4} />
          New order
          <span style={{ flex: 1 }} />
          <span style={{ display: "inline-flex", transform: newOpen ? "rotate(180deg)" : "none", transition: "transform 160ms ease" }}>
            <Icon name="chevron" size={14} stroke={2.4} />
          </span>
        </button>
        {newOpen && (
          <>
            <div onClick={() => setNewOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 40 }} />
            <div style={{ position: "absolute", top: "100%", left: 0, right: 0, marginTop: 6, zIndex: 41,
              background: PW.white, border: `1px solid ${PW.line2}`, borderRadius: 6,
              boxShadow: "0 16px 40px -12px rgba(7,17,42,0.32)", overflow: "hidden" }}>
              <div style={{ padding: "8px 11px", background: "#F4F6F9", borderBottom: `1px solid ${PW.line}`,
                fontFamily: PW.sans, fontSize: 10, fontWeight: 700, color: PW.mute,
                textTransform: "uppercase", letterSpacing: "0.06em" }}>Start an order</div>
              <NewOrderItem icon="order" title="From catalog" sub="Browse & compare items"
                onClick={() => { setNewOpen(false); router.push("/app/catalog"); }} />
              <div style={{ marginBottom: -1 }}>
                <NewOrderItem icon="plus" title="Custom item" sub="Request something new—we'll source it"
                  onClick={() => { setNewOpen(false); router.push("/app/catalog?request=1"); }} />
              </div>
            </div>
          </>
        )}
      </div>

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

        {isAdmin && (
          <div>
            <div style={{ padding: "8px 8px 4px", fontFamily: PW.sans, fontSize: 10, fontWeight: 700, color: PW.mute, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Admin
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <NavRow href="/app/accounts" label="Client accounts" icon="building" isActive={isActive("/app/accounts")} count={0} />
            </div>
          </div>
        )}
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

      <div style={{ marginTop: "auto", padding: 10, background: PW.white,
        border: `1px solid ${isActing ? "#E7C98A" : PW.line}`, borderRadius: 4 }}>
        {isActing && (
          <Link href="/app/accounts" style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, padding: "5px 7px",
            background: "#FFF6E8", border: "1px solid #E7C98A", borderRadius: 3, textDecoration: "none" }}>
            <Icon name="lock" size={12} color="#8A6308" />
            <span style={{ fontFamily: PW.sans, fontSize: 10, fontWeight: 700, color: "#8A6308", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Viewing client account
            </span>
          </Link>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 4, background: "linear-gradient(135deg, #0E9560, #07112A)",
            display: "flex", alignItems: "center", justifyContent: "center", fontFamily: PW.sans, fontWeight: 700, fontSize: 10, color: "#fff" }}>
            {account.initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: PW.sans, fontWeight: 600, fontSize: 12.5, color: PW.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {account.name}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 9, paddingTop: 9, borderTop: `1px solid ${PW.line}`, display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <span style={{ fontFamily: PW.sans, fontSize: 11, color: PW.mute }}>Guaranteed savings</span>
          <span style={{ fontFamily: PW.mono, fontSize: 13, fontWeight: 600, color: "#0A7048" }}>{money0(savedQtr)}</span>
        </div>

        <button
          onClick={() => startLogout(() => signOutAction())}
          disabled={loggingOut}
          style={{
            marginTop: 9, width: "100%", padding: "7px 9px", display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
            background: "transparent", border: `1px solid ${PW.line2}`, borderRadius: 4, cursor: loggingOut ? "default" : "pointer",
            fontFamily: PW.sans, fontSize: 12, fontWeight: 600, color: PW.ink500, opacity: loggingOut ? 0.6 : 1,
          }}
        >
          <Icon name="lock" size={13} color={PW.mute} />
          {loggingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </aside>
  );
}
