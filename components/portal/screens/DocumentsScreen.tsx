"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PW, SLDS_BLUE } from "@/lib/portal/pw";
import { PageHeader, SectionCard, AppButton, EmptyState, Icon, Toast, fmtDate } from "@/components/portal/kit";
import { addDocumentAction, removeDocumentAction } from "@/lib/portal/actions";
import type { PwDocumentRow } from "@/lib/portal/types";
import { DocViewer, type ViewerDoc, type DocKind } from "@/components/portal/DocViewer";

const CATEGORIES = ["All", "Templates", "Guidelines", "Compliance", "Agreements", "Quotes"];
const UPLOAD_CATEGORIES = ["Templates", "Guidelines", "Compliance", "Agreements", "Quotes"];

const TYPE_COLOR: Record<string, string> = {
  Templates: SLDS_BLUE,
  Guidelines: "#0A7048",
  Compliance: "#8A6308",
  Agreements: "#1E4FB0",
  Quotes: "#D6322D",
};

function DocIconSquare({ cat }: { cat: string }) {
  return (
    <span style={{ width: 20, height: 20, borderRadius: 3, background: TYPE_COLOR[cat] || SLDS_BLUE, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon name="doc" size={Math.round(20 * 0.58)} color="#fff" stroke={2.1} />
    </span>
  );
}

function DocRow({ doc, onView, onRemove, busy }: {
  doc: PwDocumentRow; onView: (d: PwDocumentRow) => void; onRemove: (d: PwDocumentRow) => void; busy: boolean;
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "grid", gridTemplateColumns: "24px 1.8fr 1fr 130px 150px", gap: 12, alignItems: "center",
        padding: "12px 16px", borderBottom: `1px solid ${PW.line}`, background: hover ? "#FAFBF7" : "transparent",
        opacity: busy ? 0.5 : 1,
      }}
    >
      <DocIconSquare cat={doc.doc_type} />
      <div style={{ minWidth: 0 }}>
        <button
          onClick={() => onView(doc)}
          style={{ background: "transparent", border: 0, textAlign: "left", color: SLDS_BLUE, fontFamily: PW.sans, fontWeight: 600, fontSize: 13.5, cursor: "pointer", padding: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}
        >
          {doc.name}
        </button>
        {doc.description && (
          <div style={{ marginTop: 3, fontFamily: PW.sans, fontSize: 11.5, color: PW.mute, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.description}</div>
        )}
      </div>
      <span style={{ fontFamily: PW.sans, fontSize: 12, color: PW.mute }}>{doc.doc_type}</span>
      <span style={{ fontFamily: PW.sans, fontSize: 12, color: PW.mute }}>{fmtDate(doc.created_at.slice(0, 10))}</span>
      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
        <AppButton variant="secondary" size="sm" onClick={() => onView(doc)}>View</AppButton>
        <AppButton variant="ghost" size="sm" icon="trash" onClick={() => onRemove(doc)} />
      </div>
    </div>
  );
}

const field: React.CSSProperties = {
  width: "100%", padding: "10px 12px", fontFamily: PW.sans, fontSize: 13.5, color: PW.ink,
  background: PW.white, border: `1px solid ${PW.line2}`, borderRadius: 4, outline: "none", boxSizing: "border-box",
};
const labelStyle: React.CSSProperties = { fontFamily: PW.sans, fontSize: 11.5, fontWeight: 600, color: PW.ink500, marginBottom: 5, display: "block" };

// ProcureWide-operator master templates (static content rendered by DocViewer —
// no DB). Gated to isPwAdmin. Mirrors the prototype DocumentsPage layout.
const MASTER_TEMPLATES: { id: string; kind: DocKind; title: string; sub: string }[] = [
  { id: "tpl-contract", kind: "contract", title: "Lab Support Agreement", sub: "Blank Prodigy ↔ member agreement." },
  { id: "tpl-nda", kind: "nda", title: "Mutual NDA", sub: "Blank confidentiality agreement." },
  { id: "tpl-invoice", kind: "invoice", title: "Order Invoice", sub: "Blank invoice, ready to fill." },
];

export default function DocumentsScreen({ companyDocs, isPwAdmin }: { companyDocs: PwDocumentRow[]; isPwAdmin: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();
  const [q, setQ] = React.useState("");
  const [cat, setCat] = React.useState("All");
  const [showUpload, setShowUpload] = React.useState(false);
  const [removingId, setRemovingId] = React.useState<string | null>(null);
  const [viewing, setViewing] = React.useState<ViewerDoc | null>(null);

  const [name, setName] = React.useState("");
  const [docType, setDocType] = React.useState("Templates");
  const [link, setLink] = React.useState("");
  const [desc, setDesc] = React.useState("");

  const docs = companyDocs.filter((d) => {
    if (cat !== "All" && d.doc_type !== cat) return false;
    if (q.trim()) {
      const t = (d.name + " " + d.doc_type + " " + (d.description || "")).toLowerCase();
      return t.includes(q.trim().toLowerCase());
    }
    return true;
  });

  const submitUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      Toast.show("Please enter a document name");
      return;
    }
    startTransition(async () => {
      try {
        await addDocumentAction({ name, doc_type: docType, file_ref: link || null, description: desc || null });
        Toast.show(`Added “${name.trim()}”`);
        setName(""); setLink(""); setDesc(""); setDocType("Templates"); setShowUpload(false);
        router.refresh();
      } catch (err) {
        Toast.show(err instanceof Error ? err.message : "Could not add document");
      }
    });
  };

  const onView = (d: PwDocumentRow) => {
    if (d.file_ref) window.open(d.file_ref, "_blank", "noopener,noreferrer");
    else Toast.show("No link attached to this document");
  };
  const onRemove = (d: PwDocumentRow) => {
    setRemovingId(d.id);
    startTransition(async () => {
      try {
        await removeDocumentAction(d.id);
        Toast.show(`Removed “${d.name}”`);
        router.refresh();
      } catch {
        Toast.show("Could not remove document");
      } finally {
        setRemovingId(null);
      }
    });
  };

  return (
    <div>
      <PageHeader icon="doc" kicker="Operations" title="Documents & forms">
        <AppButton variant="primary" icon="upload" onClick={() => setShowUpload((s) => !s)}>
          {showUpload ? "Close" : "Add document"}
        </AppButton>
      </PageHeader>

      <div style={{ padding: "18px 28px 60px", maxWidth: 1200, margin: "0 auto" }}>
        {/* ProcureWide operator notice */}
        {isPwAdmin && (
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14, padding: "10px 14px", background: "#FFF6E8", border: "1px solid #E7C98A", borderRadius: 6 }}>
            <Icon name="lock" size={15} color="#8A6308" />
            <span style={{ fontFamily: PW.sans, fontSize: 12.5, color: "#6E4F12", fontWeight: 600 }}>
              ProcureWide admin — master document templates are visible below. Members never see this section.
            </span>
          </div>
        )}

        {/* Upload form */}
        {showUpload && (
          <SectionCard title="Add a document" icon="upload" padded style={{ marginBottom: 18 }}>
            <form onSubmit={submitUpload} style={{ display: "grid", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14 }}>
                <div>
                  <label style={labelStyle}>Document name</label>
                  <input style={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Lab Safety Checklist" />
                </div>
                <div>
                  <label style={labelStyle}>Category</label>
                  <select style={field} value={docType} onChange={(e) => setDocType(e.target.value)}>
                    {UPLOAD_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Link / file URL <span style={{ color: PW.mute, fontWeight: 500 }}>(optional)</span></label>
                <input style={field} value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://…  (Drive, S3, SharePoint, etc.)" />
              </div>
              <div>
                <label style={labelStyle}>Notes <span style={{ color: PW.mute, fontWeight: 500 }}>(optional)</span></label>
                <input style={field} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Short description" />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <AppButton variant="primary" size="sm" type="submit" disabled={pending}>
                  {pending ? "Saving…" : "Save document"}
                </AppButton>
                <AppButton variant="ghost" size="sm" onClick={() => setShowUpload(false)}>Cancel</AppButton>
              </div>
            </form>
          </SectionCard>
        )}

        {/* Search + filter */}
        <div style={{ background: PW.white, border: `1px solid ${PW.line}`, borderRadius: 4, padding: 14, display: "flex", flexDirection: "column", gap: 12, marginBottom: 18 }}>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: PW.mute }}>
              <Icon name="search" size={16} />
            </span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, category, or notes…"
              style={{ width: "100%", padding: "11px 14px 11px 38px", fontFamily: PW.sans, fontSize: 14, color: PW.ink, background: "#FAFBF7", border: `1px solid ${PW.line2}`, borderRadius: 4, outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                style={{ padding: "5px 11px", borderRadius: 3, background: cat === c ? "#DDE7F8" : PW.white, color: cat === c ? "#1E4FB0" : PW.ink500, border: `1px solid ${cat === c ? "#9EBEEC" : PW.line2}`, fontFamily: PW.sans, fontSize: 12.5, fontWeight: cat === c ? 600 : 500, cursor: "pointer" }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
          <span style={{ fontFamily: PW.sans, fontWeight: 700, fontSize: 15, color: PW.ink }}>
            {docs.length} document{docs.length !== 1 ? "s" : ""}
          </span>
          {(q || cat !== "All") && (
            <button onClick={() => { setQ(""); setCat("All"); }} style={{ background: "transparent", border: 0, color: SLDS_BLUE, cursor: "pointer", fontFamily: PW.sans, fontSize: 12.5, fontWeight: 600 }}>
              Clear filters
            </button>
          )}
        </div>

        {/* Table */}
        <SectionCard>
          <div style={{ display: "grid", gridTemplateColumns: "24px 1.8fr 1fr 130px 150px", gap: 12, padding: "9px 16px", background: "#F4F6F9", borderBottom: `1px solid ${PW.line}`, fontFamily: PW.sans, fontSize: 10.5, fontWeight: 700, color: PW.mute, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            <span></span><span>Document</span><span>Category</span><span>Added</span><span style={{ textAlign: "right" }}>Action</span>
          </div>
          {companyDocs.length === 0 ? (
            <EmptyState icon="doc" title="No documents yet" sub="Add agreements, quotes, compliance docs, or templates — they’ll live here for your whole team." />
          ) : docs.length === 0 ? (
            <EmptyState icon="doc" title="No documents match" sub="Try a different search term or filter." />
          ) : (
            docs.map((d) => <DocRow key={d.id} doc={d} onView={onView} onRemove={onRemove} busy={removingId === d.id} />)
          )}
        </SectionCard>

        {/* Master template quick-links — ProcureWide operators only */}
        {isPwAdmin && (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontFamily: PW.sans, fontWeight: 700, fontSize: 13, color: PW.ink, marginBottom: 10, display: "flex", alignItems: "center", gap: 7 }}>
              <Icon name="lock" size={14} color="#8A6308" /> Master templates{" "}
              <span style={{ fontFamily: PW.sans, fontSize: 11.5, fontWeight: 500, color: PW.mute }}>· ProcureWide admin only</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
              {MASTER_TEMPLATES.map((t) => (
                <SectionCard key={t.id} title={t.title} icon="doc" padded style={{ textAlign: "center" }}>
                  <p style={{ margin: "0 0 12px", fontFamily: PW.sans, fontSize: 13, color: PW.ink500 }}>{t.sub}</p>
                  <AppButton
                    variant="secondary"
                    size="sm"
                    onClick={() => setViewing({ id: t.id, name: `${t.title} — Master Template`, kind: t.kind, blank: true })}
                  >
                    Open template
                  </AppButton>
                </SectionCard>
              ))}
            </div>
          </div>
        )}
      </div>

      <DocViewer doc={viewing} onClose={() => setViewing(null)} />
    </div>
  );
}
