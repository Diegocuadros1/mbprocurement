"use client";

import React from "react";
import { PW, SLDS_BLUE } from "@/lib/portal/pw";
import {
  PageHeader, SectionCard, AppButton, EmptyState, Icon, Toast, fmtDate,
} from "@/components/portal/kit";

type DocType = "pdf" | "xlsx" | "docx" | "form" | "checklist";
type PortalDoc = {
  id: string;
  name: string;
  cat: string;
  type: DocType;
  date: string;
  size: string;
  url: string;
  tags: string[];
};

const DOCUMENT_CATEGORIES = ["All", "Templates", "Guidelines", "Compliance", "Agreements", "Quotes"];

// Static reference content (templates, guidelines, regulatory docs, quote-request
// forms, vendor agreements) — these are parameters/templates, not user data.
const SEED_DOCUMENTS: PortalDoc[] = [
  // Templates
  { id: "doc-001", name: "Lab Safety Checklist", cat: "Templates", type: "checklist", date: "2026-05-10", size: "48 KB", url: "#", tags: ["safety", "lab"] },
  { id: "doc-002", name: "Order Requisition Form", cat: "Templates", type: "form", date: "2026-04-28", size: "92 KB", url: "#", tags: ["ordering", "form"] },
  { id: "doc-003", name: "Sample Submission Checklist", cat: "Templates", type: "checklist", date: "2026-03-15", size: "64 KB", url: "#", tags: ["samples", "protocol"] },

  // Guidelines
  { id: "doc-004", name: "Procurement Policy v3.2", cat: "Guidelines", type: "pdf", date: "2026-05-01", size: "1.2 MB", url: "#", tags: ["policy", "procurement"] },
  { id: "doc-005", name: "Lab Material Storage Guide", cat: "Guidelines", type: "pdf", date: "2026-02-20", size: "3.4 MB", url: "#", tags: ["storage", "safety", "materials"] },
  { id: "doc-006", name: "Vendor Evaluation Criteria", cat: "Guidelines", type: "docx", date: "2026-01-15", size: "256 KB", url: "#", tags: ["vendor", "evaluation"] },

  // Compliance
  { id: "doc-007", name: "GMP Compliance Checklist", cat: "Compliance", type: "checklist", date: "2026-05-08", size: "112 KB", url: "#", tags: ["GMP", "compliance", "quality"] },
  { id: "doc-008", name: "ISO 9001 Documentation", cat: "Compliance", type: "pdf", date: "2026-04-01", size: "2.1 MB", url: "#", tags: ["ISO", "quality", "certification"] },
  { id: "doc-009", name: "Data Privacy & GDPR Notice", cat: "Compliance", type: "pdf", date: "2026-03-01", size: "384 KB", url: "#", tags: ["privacy", "GDPR", "legal"] },

  // Agreements
  { id: "doc-010", name: "Thermo Fisher Master Agreement 2026", cat: "Agreements", type: "pdf", date: "2026-03-20", size: "1.8 MB", url: "#", tags: ["thermo", "vendor", "agreement"] },
  { id: "doc-011", name: "Fisher Scientific Volume Discount Schedule", cat: "Agreements", type: "xlsx", date: "2026-02-15", size: "156 KB", url: "#", tags: ["fisher", "pricing", "discounts"] },
  { id: "doc-012", name: "Sigma-Aldrich SLA & Support Terms", cat: "Agreements", type: "pdf", date: "2026-01-10", size: "892 KB", url: "#", tags: ["sigma", "vendor", "SLA"] },

  // Quotes
  { id: "doc-013", name: "Q2 2026 Budget Allocation", cat: "Quotes", type: "xlsx", date: "2026-04-30", size: "234 KB", url: "#", tags: ["budget", "planning", "Q2"] },
  { id: "doc-014", name: "Equipment Quotes – Centrifuges", cat: "Quotes", type: "pdf", date: "2026-04-15", size: "645 KB", url: "#", tags: ["equipment", "quotes", "capex"] },
  { id: "doc-015", name: "Annual Forecast 2026-2027", cat: "Quotes", type: "xlsx", date: "2026-03-30", size: "512 KB", url: "#", tags: ["forecast", "planning", "annual"] },
];

function DocIcon({ type }: { type: DocType }) {
  const icons: Record<DocType, string> = { pdf: "doc", xlsx: "tag", docx: "doc", form: "doc", checklist: "doc" };
  const colors: Record<DocType, string> = { pdf: "#D6322D", xlsx: "#0A7048", docx: "#1E4FB0", form: SLDS_BLUE, checklist: "#8A6308" };
  // Colored type-square (mirrors the prototype's ObjIcon styling) using the kit Icon.
  return (
    <span style={{ width: 20, height: 20, borderRadius: 3, background: colors[type], display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon name={icons[type]} size={Math.round(20 * 0.58)} color="#fff" stroke={2.1} />
    </span>
  );
}

function DocRow({ doc, onDownload, onPreview }: {
  doc: PortalDoc; onDownload: (d: PortalDoc) => void; onPreview: (d: PortalDoc) => void;
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      display: "grid", gridTemplateColumns: "24px 1.6fr 1fr 110px 120px 140px",
      gap: 12, alignItems: "center", padding: "12px 16px", borderBottom: `1px solid ${PW.line}`,
      background: hover ? "#FAFBF7" : "transparent",
    }}>
      <DocIcon type={doc.type} />

      <div style={{ minWidth: 0 }}>
        <button onClick={() => onPreview(doc)} style={{
          background: "transparent", border: 0, textAlign: "left", color: SLDS_BLUE,
          fontFamily: PW.sans, fontWeight: 600, fontSize: 13.5, cursor: "pointer", padding: 0,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{doc.name}</button>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 3, flexWrap: "wrap" }}>
          {doc.tags.map((t) => (
            <span key={t} style={{
              padding: "1px 6px", borderRadius: 2, background: "#F0F0EC", color: PW.ink500,
              fontFamily: PW.sans, fontSize: 10.5, fontWeight: 500,
            }}>{t}</span>
          ))}
        </div>
      </div>

      <span style={{ fontFamily: PW.sans, fontSize: 12, color: PW.mute }}>{doc.cat}</span>
      <span style={{ fontFamily: PW.mono, fontSize: 12, color: PW.mute }}>{doc.size}</span>
      <span style={{ fontFamily: PW.sans, fontSize: 12, color: PW.mute }}>{fmtDate(doc.date)}</span>

      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
        <AppButton variant="ghost" size="sm" icon="download" onClick={() => onDownload(doc)} />
        <AppButton variant="secondary" size="sm" onClick={() => onPreview(doc)}>View</AppButton>
      </div>
    </div>
  );
}

export default function DocumentsScreen() {
  const [q, setQ] = React.useState("");
  const [cat, setCat] = React.useState("All");

  const docs = SEED_DOCUMENTS.filter((d) => {
    if (cat !== "All" && d.cat !== cat) return false;
    if (q.trim()) {
      const t = (d.name + " " + d.cat + " " + d.tags.join(" ")).toLowerCase();
      return t.includes(q.trim().toLowerCase());
    }
    return true;
  });

  // No documents server action yet — actions surface a Toast rather than persisting.
  const handleDownload = (doc: PortalDoc) => {
    Toast.show(`Downloaded ${doc.name}`);
  };
  const handlePreview = (doc: PortalDoc) => {
    Toast.show(`Opening ${doc.name}…`);
  };

  return (
    <div>
      <PageHeader icon="doc" kicker="Operations" title="Documents & forms">
        <AppButton variant="primary" icon="upload" onClick={() => Toast.show("Coming soon")}>Upload document</AppButton>
      </PageHeader>

      <div style={{ padding: "18px 28px 60px", maxWidth: 1200, margin: "0 auto" }}>
        {/* Search + filter */}
        <div style={{
          background: PW.white, border: `1px solid ${PW.line}`, borderRadius: 4,
          padding: 14, display: "flex", flexDirection: "column", gap: 12, marginBottom: 18,
        }}>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: PW.mute }}>
              <Icon name="search" size={16} />
            </span>
            <input value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, category, or tag…"
              style={{
                width: "100%", padding: "11px 14px 11px 38px", fontFamily: PW.sans, fontSize: 14,
                color: PW.ink, background: "#FAFBF7", border: `1px solid ${PW.line2}`, borderRadius: 4,
                outline: "none", boxSizing: "border-box",
              }} />
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {DOCUMENT_CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCat(c)} style={{
                padding: "5px 11px", borderRadius: 3,
                background: cat === c ? "#DDE7F8" : PW.white,
                color: cat === c ? "#1E4FB0" : PW.ink500,
                border: `1px solid ${cat === c ? "#9EBEEC" : PW.line2}`,
                fontFamily: PW.sans, fontSize: 12.5, fontWeight: cat === c ? 600 : 500, cursor: "pointer",
              }}>{c}</button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
          <span style={{ fontFamily: PW.sans, fontWeight: 700, fontSize: 15, color: PW.ink }}>
            {docs.length} document{docs.length !== 1 ? "s" : ""}
          </span>
          {(q || cat !== "All") && (
            <button onClick={() => { setQ(""); setCat("All"); }} style={{
              background: "transparent", border: 0, color: SLDS_BLUE, cursor: "pointer",
              fontFamily: PW.sans, fontSize: 12.5, fontWeight: 600,
            }}>Clear filters</button>
          )}
        </div>

        {/* Table */}
        <SectionCard>
          <div style={{
            display: "grid", gridTemplateColumns: "24px 1.6fr 1fr 110px 120px 140px", gap: 12,
            padding: "9px 16px", background: "#F4F6F9", borderBottom: `1px solid ${PW.line}`,
            fontFamily: PW.sans, fontSize: 10.5, fontWeight: 700, color: PW.mute,
            textTransform: "uppercase", letterSpacing: "0.05em",
          }}>
            <span></span><span>Document</span><span>Category</span><span>Size</span><span>Date</span><span style={{ textAlign: "right" }}>Action</span>
          </div>
          {docs.length === 0
            ? <EmptyState icon="doc" title="No documents match" sub="Try a different search term or filter." />
            : docs.map((d) => <DocRow key={d.id} doc={d} onDownload={handleDownload} onPreview={handlePreview} />)}
        </SectionCard>

        {/* Quick actions */}
        <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
          <SectionCard title="Templates" icon="doc" padded style={{ textAlign: "center" }}>
            <p style={{ margin: "0 0 12px", fontFamily: PW.sans, fontSize: 13, color: PW.ink500 }}>
              Standardized forms & checklists for your team.
            </p>
            <AppButton variant="secondary" size="sm" icon="download" onClick={() => setCat("Templates")}>Browse templates</AppButton>
          </SectionCard>
          <SectionCard title="Compliance" icon="alert" padded style={{ textAlign: "center" }}>
            <p style={{ margin: "0 0 12px", fontFamily: PW.sans, fontSize: 13, color: PW.ink500 }}>
              GMP, ISO, and regulatory documentation.
            </p>
            <AppButton variant="secondary" size="sm" icon="download" onClick={() => setCat("Compliance")}>View compliance docs</AppButton>
          </SectionCard>
          <SectionCard title="Vendor Agreements" icon="building" padded style={{ textAlign: "center" }}>
            <p style={{ margin: "0 0 12px", fontFamily: PW.sans, fontSize: 13, color: PW.ink500 }}>
              Master agreements & pricing terms.
            </p>
            <AppButton variant="secondary" size="sm" icon="download" onClick={() => setCat("Agreements")}>See agreements</AppButton>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
