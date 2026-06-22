"use client";

import React from "react";
import { PW, SLDS_BLUE, SLDS_BLUE_HOVER } from "@/lib/portal/pw";
import type { PwVendor } from "@/lib/portal/types";
import { parseCSV } from "@/lib/portal/csv";

// ───────── Icon set ────────────────────────────────────────────────────
const ICON_PATHS: Record<string, string> = {
  home: "M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10",
  order: "M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6",
  cart: "M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6M9 21a1 1 0 1 0 0 .01M18 21a1 1 0 1 0 0 .01",
  box: "M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8",
  clock: "M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
  tag: "M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-7-7A2 2 0 0 1 3 12.2V5a2 2 0 0 1 2-2h7.2a2 2 0 0 1 1.4.6l7 7a2 2 0 0 1 0 2.8zM7.5 7.5h.01",
  truck: "M1 4h13v11H1zM14 8h4l3 3v4h-7M5.5 18.5a1.5 1.5 0 1 0 0 .01M18.5 18.5a1.5 1.5 0 1 0 0 .01",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  plus: "M12 5v14M5 12h14",
  upload: "M12 16V4M7 9l5-5 5 5M4 20h16",
  download: "M12 4v12M7 11l5 5 5-5M4 20h16",
  check: "M20 6L9 17l-5-5",
  x: "M6 6l12 12M18 6L6 18",
  chevron: "M6 9l6 6 6-6",
  trash: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  alert: "M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8z",
  flask: "M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3",
  doc: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6",
  refresh: "M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5",
  arrowR: "M5 12h14M13 6l6 6-6 6",
  building: "M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01",
  info: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v5M12 7.6h.01",
};

export function Icon({ name, size = 16, color = "currentColor", stroke = 2 }: {
  name: string; size?: number; color?: string; stroke?: number;
}) {
  const d = ICON_PATHS[name] || ICON_PATHS.box;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      {d.split("M").filter(Boolean).map((seg, i) => <path key={i} d={"M" + seg} />)}
    </svg>
  );
}

export function ObjIcon({ name, size = 22, color = "#5A6A8E", glyph = "#fff" }: {
  name: string; size?: number; color?: string; glyph?: string;
}) {
  return (
    <span style={{ width: size, height: size, borderRadius: 3, background: color,
      display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon name={name} size={Math.round(size * 0.58)} color={glyph} stroke={2.1} />
    </span>
  );
}

export function SectionCard({ title, icon, action, children, style, bodyStyle, padded = false }: {
  title?: React.ReactNode; icon?: string; action?: React.ReactNode; children?: React.ReactNode;
  style?: React.CSSProperties; bodyStyle?: React.CSSProperties; padded?: boolean;
}) {
  return (
    <div style={{ background: PW.white, border: `1px solid ${PW.line}`, borderRadius: 4, overflow: "hidden", ...style }}>
      {title != null && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px",
          background: "#F4F6F9", borderBottom: `1px solid ${PW.line}` }}>
          {icon && <ObjIcon name={icon} size={18} />}
          <span style={{ fontFamily: PW.sans, fontSize: 11, fontWeight: 700, color: PW.ink,
            textTransform: "uppercase", letterSpacing: "0.06em" }}>{title}</span>
          <span style={{ flex: 1 }} />
          {action}
        </div>
      )}
      <div style={{ padding: padded ? 14 : 0, ...bodyStyle }}>{children}</div>
    </div>
  );
}

type BtnVariant = "primary" | "ink" | "green" | "secondary" | "ghost" | "danger";
export function AppButton({ children, variant = "primary", size = "md", onClick, style, disabled, title, icon, type }: {
  children?: React.ReactNode; variant?: BtnVariant; size?: "sm" | "md" | "lg";
  onClick?: () => void; style?: React.CSSProperties; disabled?: boolean; title?: string; icon?: string;
  type?: "button" | "submit";
}) {
  const [hover, setHover] = React.useState(false);
  const sizes = {
    sm: { padding: "5px 10px", fontSize: 12 },
    md: { padding: "7px 14px", fontSize: 13 },
    lg: { padding: "10px 18px", fontSize: 14 },
  } as const;
  const variants: Record<BtnVariant, React.CSSProperties> = {
    primary: { background: hover ? SLDS_BLUE_HOVER : SLDS_BLUE, color: "#fff", border: "1px solid transparent" },
    ink: { background: hover ? PW.ink700 : PW.ink, color: "#fff", border: "1px solid transparent" },
    green: { background: hover ? "#0B7E4A" : PW.green, color: "#fff", border: "1px solid transparent" },
    secondary: { background: hover ? "#F4F6F9" : PW.white, color: PW.ink, border: `1px solid ${PW.line2}` },
    ghost: { background: hover ? "#F0F0EC" : "transparent", color: PW.ink500, border: "1px solid transparent" },
    danger: { background: hover ? "#FBE3E2" : PW.white, color: "#8B1F1B", border: `1px solid ${hover ? "#E7A6A6" : PW.line2}` },
  };
  return (
    <button type={type || "button"} onClick={onClick} disabled={disabled} title={title}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
        fontFamily: PW.sans, fontWeight: 600, borderRadius: 3, cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1, whiteSpace: "nowrap", lineHeight: 1.2, transition: "background 120ms ease",
        ...sizes[size], ...variants[variant], ...style }}>
      {icon && <Icon name={icon} size={size === "sm" ? 13 : 14} stroke={2.2} />}
      {children}
    </button>
  );
}

type Tone = "neutral" | "success" | "warning" | "danger" | "info";
export function StatusPill({ tone = "neutral", children, dot = true }: {
  tone?: Tone; children?: React.ReactNode; dot?: boolean;
}) {
  const tones: Record<Tone, { bg: string; fg: string; d: string }> = {
    neutral: { bg: "#F0EFEB", fg: PW.ink500, d: PW.mute },
    success: { bg: "#E6F5EC", fg: "#0A7048", d: "#0E9560" },
    warning: { bg: "#FBF0CF", fg: "#8A6308", d: "#E0A60A" },
    danger: { bg: "#FBE3E2", fg: "#8B1F1B", d: "#D6322D" },
    info: { bg: "#DDE7F8", fg: "#1E4FB0", d: SLDS_BLUE },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "2px 9px",
      borderRadius: 12, background: t.bg, color: t.fg, fontFamily: PW.sans, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.d }} />}
      {children}
    </span>
  );
}

export function QtyStepper({ value, onChange, min = 0, size = "md" }: {
  value: number; onChange: (n: number) => void; min?: number; size?: "sm" | "md";
}) {
  const h = size === "sm" ? 26 : 30;
  const w = size === "sm" ? 38 : 46;
  const btn: React.CSSProperties = { width: h, height: h, border: `1px solid ${PW.line2}`, background: PW.white,
    color: PW.ink, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: PW.sans, fontSize: 15, fontWeight: 600, padding: 0 };
  return (
    <div style={{ display: "inline-flex", alignItems: "stretch" }}>
      <button onClick={() => onChange(Math.max(min, value - 1))} style={{ ...btn, borderRadius: "3px 0 0 3px", borderRight: 0 }}>−</button>
      <input value={value}
        onChange={(e) => { const v = parseInt(e.target.value.replace(/\D/g, ""), 10); onChange(isNaN(v) ? min : v); }}
        style={{ width: w, height: h, border: `1px solid ${PW.line2}`, textAlign: "center",
          fontFamily: PW.mono, fontSize: 13, color: PW.ink, outline: "none", fontVariantNumeric: "tabular-nums", padding: 0 }} />
      <button onClick={() => onChange(value + 1)} style={{ ...btn, borderRadius: "0 3px 3px 0", borderLeft: 0 }}>+</button>
    </div>
  );
}

export function VendorMark({ vendor, height = 14, withName = true, nameStyle }: {
  vendor: PwVendor; height?: number; withName?: boolean; nameStyle?: React.CSSProperties;
}) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 7, minWidth: 0 }}>
      {vendor.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={vendor.logo} alt="" style={{ height, maxWidth: 84, objectFit: "contain" }} />
      ) : (
        <span style={{ height, padding: "0 6px", borderRadius: 2, background: "#EEF0EA", flexShrink: 0,
          display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: PW.sans,
          fontSize: Math.max(9, Math.round(height * 0.62)), fontWeight: 800, color: PW.ink500, letterSpacing: "0.02em" }}>
          {vendor.name.slice(0, 3).toUpperCase()}
        </span>
      )}
      {withName && (
        <span style={{ fontFamily: PW.sans, fontSize: 12, color: PW.ink500, whiteSpace: "nowrap",
          overflow: "hidden", textOverflow: "ellipsis", ...nameStyle }}>{vendor.name}</span>
      )}
    </span>
  );
}

export type KpiDetail = { label: string; value: string; dot?: string; tone?: string; onClick?: () => void };
export function Kpi({ label, value, sub, tone, icon, details, viewAll, maxRows = 5 }: {
  label: string; value: React.ReactNode; sub?: React.ReactNode; tone?: "green" | "blue" | "danger" | "ink";
  icon?: string; details?: KpiDetail[]; viewAll?: { label: string; cta?: string; onClick: () => void }; maxRows?: number;
}) {
  const [open, setOpen] = React.useState(false);
  const toneColors: Record<string, string> = { green: "#0A7048", blue: "#1E4FB0", danger: "#8B1F1B", ink: PW.ink };
  const expandable = (details && details.length > 0) || !!viewAll;
  const shown = details ? details.slice(0, maxRows) : [];
  const more = details ? details.length - shown.length : 0;
  const iconColor = tone === "green" ? "#0E9560" : tone === "danger" ? "#D6322D" : tone === "blue" ? SLDS_BLUE : "#5A6A8E";
  return (
    <div style={{ position: "relative", minWidth: 0 }}>
      <div onClick={expandable ? () => setOpen((o) => !o) : undefined}
        style={{ background: PW.white, border: `1px solid ${open ? PW.line2 : PW.line}`, borderRadius: 4,
          padding: "14px 16px", display: "flex", flexDirection: "column", gap: 4, minWidth: 0,
          cursor: expandable ? "pointer" : "default", boxShadow: open ? PW.shadowMd : "none",
          transition: "box-shadow 120ms ease, border-color 120ms ease" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {icon && <ObjIcon name={icon} size={20} color={iconColor} />}
          <span style={{ fontFamily: PW.sans, fontSize: 11, fontWeight: 700, color: PW.mute,
            textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
          {expandable && (
            <span style={{ marginLeft: "auto", color: PW.mute, display: "inline-flex",
              transform: open ? "rotate(180deg)" : "none", transition: "transform 160ms ease" }}>
              <Icon name="chevron" size={15} />
            </span>
          )}
        </div>
        <div style={{ fontFamily: PW.display, fontWeight: 700, fontSize: 30, lineHeight: 1.05,
          color: (tone && toneColors[tone]) || PW.ink, letterSpacing: "-0.01em", fontVariantNumeric: "tabular-nums", marginTop: 2 }}>
          {value}
        </div>
        {sub && <div style={{ fontFamily: PW.sans, fontSize: 12, color: PW.mute }}>{sub}</div>}
      </div>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 40 }} />
          <div style={{ position: "absolute", top: "100%", left: 0, marginTop: 6, zIndex: 41, minWidth: "100%",
            width: "max-content", maxWidth: 360, background: PW.white, border: `1px solid ${PW.line2}`, borderRadius: 6,
            boxShadow: "0 16px 40px -12px rgba(7,17,42,0.32)", overflow: "hidden" }}>
            <div style={{ padding: "9px 13px", borderBottom: `1px solid ${PW.line}`, background: "#F4F6F9",
              fontFamily: PW.sans, fontSize: 10.5, fontWeight: 700, color: PW.mute, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {label} — breakdown
            </div>
            {shown.length === 0 ? (
              <div style={{ padding: "14px 13px", fontFamily: PW.sans, fontSize: 13, color: PW.mute }}>Nothing to show right now.</div>
            ) : (
              shown.map((row, i) => (
                <div key={i} onClick={row.onClick ? (e) => { e.stopPropagation(); setOpen(false); row.onClick!(); } : undefined}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 13px",
                    borderBottom: `1px solid ${PW.line}`, cursor: row.onClick ? "pointer" : "default" }}>
                  {row.dot && <span style={{ width: 7, height: 7, borderRadius: "50%", background: row.dot, flexShrink: 0 }} />}
                  <span style={{ flex: 1, fontFamily: PW.sans, fontSize: 13, color: PW.ink, minWidth: 0,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.label}</span>
                  <span style={{ fontFamily: PW.mono, fontSize: 12.5, fontWeight: 600, color: row.tone || PW.ink500, whiteSpace: "nowrap" }}>{row.value}</span>
                </div>
              ))
            )}
            {viewAll && (
              <button onClick={(e) => { e.stopPropagation(); setOpen(false); viewAll.onClick(); }}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  padding: "10px 13px", background: "#FAFBF7", border: 0, cursor: "pointer",
                  fontFamily: PW.sans, fontSize: 12.5, fontWeight: 700, color: SLDS_BLUE }}>
                {more > 0 ? `View all ${details!.length} in ${viewAll.label}` : viewAll.cta || `Open ${viewAll.label}`}
                <Icon name="arrowR" size={14} />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export function Progress({ pct, color = SLDS_BLUE, height = 6, track = "#EDEDE8" }: {
  pct: number; color?: string; height?: number; track?: string;
}) {
  return (
    <div style={{ height, background: track, borderRadius: 999, overflow: "hidden", width: "100%" }}>
      <div style={{ width: Math.max(0, Math.min(100, pct)) + "%", height: "100%", background: color, borderRadius: 999, transition: "width 300ms ease" }} />
    </div>
  );
}

export function PageHeader({ icon, kicker, title, children }: {
  icon?: string; kicker?: React.ReactNode; title: React.ReactNode; children?: React.ReactNode;
}) {
  return (
    <div style={{ background: PW.white, borderBottom: `1px solid ${PW.line}`, padding: "16px 28px",
      display: "flex", alignItems: "center", gap: 14, position: "sticky", top: 0, zIndex: 20 }}>
      {icon && <ObjIcon name={icon} size={34} />}
      <div style={{ flex: 1, minWidth: 0 }}>
        {kicker && <div style={{ fontFamily: PW.sans, fontSize: 11, color: PW.mute, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{kicker}</div>}
        <h1 style={{ margin: "1px 0 0", fontFamily: PW.sans, fontWeight: 700, fontSize: 21, color: PW.ink, letterSpacing: "-0.01em" }}>{title}</h1>
      </div>
      {children}
    </div>
  );
}

export function CsvUpload({ label = "Upload CSV", onRows, variant = "secondary", size = "md", icon = "upload" }: {
  label?: string; onRows: (rows: Record<string, string>[], filename: string) => void;
  variant?: BtnVariant; size?: "sm" | "md" | "lg"; icon?: string;
}) {
  const ref = React.useRef<HTMLInputElement>(null);
  return (
    <>
      <input ref={ref} type="file" accept=".csv,text/csv" style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          const reader = new FileReader();
          reader.onload = () => { onRows(parseCSV(String(reader.result)), f.name); if (ref.current) ref.current.value = ""; };
          reader.readAsText(f);
        }} />
      <AppButton variant={variant} size={size} icon={icon} onClick={() => ref.current?.click()}>{label}</AppButton>
    </>
  );
}

export function UrgencyPill({ level }: { level: string }) {
  const map: Record<string, { tone: Tone; label: string }> = {
    High: { tone: "danger", label: "High urgency" },
    Medium: { tone: "warning", label: "Medium urgency" },
    Low: { tone: "neutral", label: "Low urgency" },
  };
  const t = map[level] || map.Medium;
  return <StatusPill tone={t.tone}>{t.label}</StatusPill>;
}

export function EmptyState({ icon = "box", title, sub, action }: {
  icon?: string; title: React.ReactNode; sub?: React.ReactNode; action?: React.ReactNode;
}) {
  return (
    <div style={{ padding: "56px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{ width: 54, height: 54, borderRadius: 8, background: "#F0F0EC", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={icon} size={26} color={PW.mute} />
      </div>
      <div style={{ fontFamily: PW.sans, fontSize: 16, fontWeight: 700, color: PW.ink }}>{title}</div>
      {sub && <div style={{ fontFamily: PW.sans, fontSize: 13, color: PW.mute, maxWidth: 360 }}>{sub}</div>}
      {action && <div style={{ marginTop: 6 }}>{action}</div>}
    </div>
  );
}

export function fmtDate(iso: string | null | undefined, opts?: Intl.DateTimeFormatOptions): string {
  if (!iso) return "—";
  const d = new Date(iso + (iso.length === 10 ? "T00:00:00" : ""));
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", opts || { month: "short", day: "numeric", year: "numeric" });
}
export function daysBetween(aIso: string, bIso: string): number {
  const a = new Date(aIso + "T00:00:00"),
    b = new Date(bIso + "T00:00:00");
  return Math.round((a.getTime() - b.getTime()) / 86400000);
}

// Toast — lightweight client toast bus for the portal.
type ToastItem = { id: number; msg: string; tone?: "danger" | "success"; duration?: number; action?: { label: string; onClick: () => void } };
let pushToast: ((t: ToastItem) => void) | null = null;
export const Toast = {
  show(msg: string, opts: Partial<Omit<ToastItem, "id" | "msg">> = {}) {
    if (pushToast) pushToast({ msg, ...opts, id: Date.now() + Math.random() });
  },
};
export function ToastHost() {
  const [items, setItems] = React.useState<ToastItem[]>([]);
  React.useEffect(() => {
    pushToast = (t) => {
      setItems((x) => [...x, t]);
      setTimeout(() => setItems((x) => x.filter((i) => i.id !== t.id)), t.duration || 2600);
    };
    return () => { pushToast = null; };
  }, []);
  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9000, display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
      {items.map((t) => (
        <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
          background: PW.ink, color: "#fff", borderRadius: 6, boxShadow: "0 10px 30px -8px rgba(7,17,42,0.5)",
          fontFamily: PW.sans, fontSize: 13, fontWeight: 500, animation: "pwToastIn 220ms cubic-bezier(0.22,1,0.36,1)", maxWidth: 360 }}>
          <span style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0,
            background: t.tone === "danger" ? "#D6322D" : "#0E9560", color: "#fff",
            display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name={t.tone === "danger" ? "x" : "check"} size={11} stroke={3} />
          </span>
          <span>{t.msg}</span>
          {t.action && (
            <button onClick={() => { t.action!.onClick(); setItems((x) => x.filter((i) => i.id !== t.id)); }}
              style={{ marginLeft: 4, background: "transparent", border: 0, color: SLDS_BLUE, fontFamily: PW.sans, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              {t.action.label}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
