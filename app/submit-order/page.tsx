"use client";

import { useState } from "react";

type Item = { name: string; cat: string; vendor: string; qty: string };

const PRIO: Array<{ id: string; label: string; desc: string; path: React.ReactNode }> = [
  { id: "leadtime", label: "Lead time", desc: "Fastest time to door", path: (<><path d="M3 7h11v8H3z" /><path d="M14 10h4l3 3v2h-7z" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></>) },
  { id: "price", label: "Price", desc: "Lowest total landed cost", path: (<><path d="M20 12V8H6a2 2 0 0 1 0-4h12v4" /><path d="M4 6v12a2 2 0 0 0 2 2h14v-4" /><path d="M18 12a2 2 0 0 0 0 4h4v-4z" /></>) },
  { id: "speculative", label: "Speculative buy", desc: "Stock up ahead of need / hedge price", path: (<><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></>) },
  { id: "reliability", label: "Supply reliability", desc: "Avoid backorders & substitutions", path: (<><path d="M12 3l7 4v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V7z" /><path d="M9 12l2 2 4-4" /></>) },
  { id: "consolidation", label: "Fewer vendors", desc: "Consolidate into a single shipment", path: (<><path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6" /></>) },
  { id: "other", label: "Other", desc: "Something else — tell us", path: (<><circle cx="12" cy="12" r="9" /><path d="M12 8h.01M11 12h1v4h1" /></>) },
];

const ArrowR = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

export default function SubmitOrderPage() {
  const [items, setItems] = useState<Item[]>([
    { name: "", cat: "", vendor: "", qty: "" },
    { name: "", cat: "", vendor: "", qty: "" },
  ]);
  const [priority, setPriority] = useState("");
  const [priorityOther, setPriorityOther] = useState("");
  const [form, setForm] = useState({ company: "", contactName: "", email: "", phone: "", address: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [itemsErr, setItemsErr] = useState(false);
  const [success, setSuccess] = useState<{ email: string; href: string } | null>(null);

  const setField = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: false }));
  };
  const setItem = (i: number, k: keyof Item, v: string) => {
    setItems((rows) => rows.map((r, idx) => (idx === i ? { ...r, [k]: v } : r)));
    setItemsErr(false);
  };
  const addRow = () => setItems((r) => [...r, { name: "", cat: "", vendor: "", qty: "" }]);
  const removeRow = (i: number) => setItems((r) => (r.length > 1 ? r.filter((_, idx) => idx !== i) : r));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, boolean> = {};
    if (!form.company.trim()) next.company = true;
    if (!form.contactName.trim()) next.contactName = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = true;
    if (!form.address.trim()) next.address = true;
    if (!form.notes.trim()) next.notes = true;

    const validItems = items.filter((it) => it.name.trim());
    const itemBad = validItems.length === 0;
    setItemsErr(itemBad);

    next.priority = !priority;

    setErrors(next);
    if (Object.values(next).some(Boolean) || itemBad) return;

    let prioLabel = PRIO.find((p) => p.id === priority)?.label || priority;
    if (priority === "other") prioLabel = priorityOther.trim() ? "Other — " + priorityOther.trim() : "Other";

    const lines: string[] = [];
    lines.push("SAMPLE ORDER — PRICE COMPARISON REQUEST", "");
    lines.push("Company: " + form.company);
    lines.push("Contact: " + form.contactName + (form.phone.trim() ? "  ·  " + form.phone.trim() : ""));
    lines.push("Email: " + form.email);
    lines.push("Address: " + form.address.replace(/\n/g, ", "));
    lines.push("");
    lines.push("What matters most: " + prioLabel);
    lines.push("");
    lines.push("ITEMS (" + validItems.length + "):");
    validItems.forEach((it, i) => {
      lines.push(`${i + 1}. ${it.name} — qty ${it.qty || "1"}${it.cat ? "  ·  cat# " + it.cat : ""}${it.vendor ? "  ·  vendor: " + it.vendor : ""}`);
    });
    lines.push("", "NOTES:", form.notes);

    const subject = "Sample order — " + form.company;
    const href = "mailto:hello@procurewide.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
    setSuccess({ email: form.email, href });
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.location.href = href;
  };

  return (
    <div className="pw-site">
      <div className="auth auth-form-page">
        {/* Brand panel */}
        <aside className="auth-brand">
          <div className="auth-brand-top">
            <a className="brand" href="/" aria-label="ProcureWide home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pw/logo.png" width={30} height={30} alt="" />
              <span>ProcureWide</span>
            </a>
            <a className="auth-back" href="/">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" />
                <path d="M11 18l-6-6 6-6" />
              </svg>
              Back to site
            </a>
          </div>
          <div className="auth-brand-mid">
            <span className="eyebrow">Get pricing · No commitment</span>
            <h2 className="auth-headline">
              See what we&apos;d save you, <span className="accent">line by line.</span>
            </h2>
            <p className="auth-sub">
              Send us a sample order. We compare every item across 100+ vendors and email back a price comparison against
              what you pay today — before you sign anything.
            </p>
            <div className="auth-points">
              {[
                "No account or login required",
                "Your list stays private — we never auto-place an order",
                "The comparison is free and yours to keep",
              ].map((t) => (
                <div className="auth-point" key={t}>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>{" "}
                  {t}
                </div>
              ))}
            </div>
            <div className="auth-shot">
              <div className="auth-shot-bar">
                <i />
                <i />
                <i />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pw/product-catalog.png" width={914} height={530} alt="Order catalog comparing items across vendors by price and lead time" loading="lazy" />
            </div>
          </div>
          <div className="auth-brand-foot">
            <span className="tag">Made by Scientists, for Science</span>
            <span>100+ vendors · One relationship</span>
          </div>
        </aside>

        {/* Form panel */}
        <main className="auth-pane">
          <div className="auth-card">
            {success ? (
              <div className="order-success show">
                <div className="tick">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h1>Sample order ready to send.</h1>
                <p>
                  We&apos;ve opened a pre-filled email to our team with your order — just hit send and we&apos;ll take it
                  from there. We&apos;ll reply to <b>{success.email}</b> with a line-by-line comparison.
                </p>
                <p style={{ fontSize: "13.5px", color: "var(--mute)" }}>
                  Didn&apos;t see the email open?{" "}
                  <a className="link-accent" href={success.href}>
                    Click here to send it
                  </a>
                  , or email{" "}
                  <a className="link-accent" href="mailto:hello@procurewide.com">
                    hello@procurewide.com
                  </a>
                  .
                </p>
                <div className="auth-actions" style={{ marginTop: 26 }}>
                  <a className="btn btn-secondary btn-lg btn-block" href="/">
                    Back to home
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <span className="eyebrow">Sample order</span>
                <h1>Request a price comparison.</h1>
                <p className="sub">
                  Tell us what you buy and we&apos;ll email back a line-by-line comparison. It takes a few minutes — no
                  account needed.
                </p>

                <div className="contact-note">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>
                    If you prefer to speak with the team directly before inputting a sample order item(s), go to the{" "}
                    <a href="/contact">Contact us page</a>.
                  </span>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  {/* 1. Company */}
                  <div className="form-section">
                    <div className="fs-head">
                      <span className="fs-n">01</span>
                      <h2>Your company</h2>
                    </div>
                    <div className="grid-2">
                      <div className={"field" + (errors.company ? " is-invalid" : "")}>
                        <label htmlFor="company">
                          Company name <span className="req">*</span>
                        </label>
                        <div className="input">
                          <input type="text" id="company" placeholder="Helio Bio, Inc." value={form.company} onChange={(e) => setField("company", e.target.value)} />
                        </div>
                      </div>
                      <div className={"field" + (errors.contactName ? " is-invalid" : "")}>
                        <label htmlFor="contactName">
                          Your name <span className="req">*</span>
                        </label>
                        <div className="input">
                          <input type="text" id="contactName" placeholder="Jane Doe" value={form.contactName} onChange={(e) => setField("contactName", e.target.value)} />
                        </div>
                      </div>
                    </div>
                    <div className="grid-2" style={{ marginTop: 16 }}>
                      <div className={"field" + (errors.email ? " is-invalid" : "")}>
                        <label htmlFor="email">
                          Work email <span className="req">*</span>
                        </label>
                        <div className="input">
                          <svg className="lead-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <path d="m3 7 9 6 9-6" />
                          </svg>
                          <input type="email" id="email" placeholder="you@yourlab.com" value={form.email} onChange={(e) => setField("email", e.target.value)} />
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="phone">
                          Phone <span className="opt">optional</span>
                        </label>
                        <div className="input">
                          <input type="tel" id="phone" placeholder="(555) 000-0000" value={form.phone} onChange={(e) => setField("phone", e.target.value)} />
                        </div>
                      </div>
                    </div>
                    <div className={"field" + (errors.address ? " is-invalid" : "")} style={{ marginTop: 16 }}>
                      <label htmlFor="address">
                        Company address <span className="req">*</span>
                      </label>
                      <div className="input">
                        <textarea id="address" placeholder="Street, city, state/region, ZIP, country" value={form.address} onChange={(e) => setField("address", e.target.value)} />
                      </div>
                    </div>
                  </div>

                  {/* 2. Items */}
                  <div className="form-section">
                    <div className="fs-head">
                      <span className="fs-n">02</span>
                      <h2>
                        What you&apos;d like priced <span className="req">*</span>
                      </h2>
                    </div>
                    <div className="ir-labels">
                      <span className="full">Item / description</span>
                      <span>Catalog #</span>
                      <span>Preferred vendor</span>
                      <span>Qty</span>
                      <span />
                    </div>
                    <div className="item-rows">
                      {items.map((it, i) => (
                        <div className="item-row" key={i}>
                          <div className="ir-cell full">
                            <input type="text" className="ir-name" placeholder="e.g. DMEM, high glucose, 500 mL" value={it.name} onChange={(e) => setItem(i, "name", e.target.value)} />
                          </div>
                          <div className="ir-cell">
                            <input type="text" className="ir-cat" placeholder="11965-092" value={it.cat} onChange={(e) => setItem(i, "cat", e.target.value)} />
                          </div>
                          <div className="ir-cell">
                            <input type="text" className="ir-vendor" placeholder="Any / Thermo Fisher" value={it.vendor} onChange={(e) => setItem(i, "vendor", e.target.value)} />
                          </div>
                          <div className="ir-cell">
                            <input type="number" className="ir-qty" min={1} placeholder="1" value={it.qty} onChange={(e) => setItem(i, "qty", e.target.value)} />
                          </div>
                          <button type="button" className="ir-del" aria-label="Remove item" disabled={items.length === 1} onClick={() => removeRow(i)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                    <button type="button" className="add-item" onClick={addRow}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                      Add another item
                    </button>
                    {itemsErr && (
                      <span className="err-msg" style={{ display: "block" }}>
                        Please add at least one item with a description and quantity.
                      </span>
                    )}
                  </div>

                  {/* 3. Priority */}
                  <div className="form-section">
                    <div className="fs-head">
                      <span className="fs-n">03</span>
                      <h2>
                        What matters most? <span className="req">*</span>
                      </h2>
                    </div>
                    <div className={"prio-group field" + (errors.priority ? " is-invalid" : "")}>
                      <div className="prio-list">
                        {PRIO.map((o) => (
                          <button
                            type="button"
                            key={o.id}
                            className={"prio-opt" + (priority === o.id ? " sel" : "")}
                            onClick={() => {
                              setPriority(o.id);
                              setErrors((e) => ({ ...e, priority: false }));
                            }}
                          >
                            <span className="pr-radio" />
                            <svg className="pr-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                              {o.path}
                            </svg>
                            <span className="pr-tx">
                              <b>{o.label}</b>
                              <span>{o.desc}</span>
                            </span>
                          </button>
                        ))}
                      </div>
                      {priority === "other" && (
                        <div className="input" style={{ marginTop: 10 }}>
                          <input type="text" placeholder="Please specify what matters most…" value={priorityOther} onChange={(e) => setPriorityOther(e.target.value)} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 4. Notes */}
                  <div className="form-section">
                    <div className="fs-head">
                      <span className="fs-n">04</span>
                      <h2>
                        Notes on this order <span className="req">*</span>
                      </h2>
                    </div>
                    <div className={"field" + (errors.notes ? " is-invalid" : "")}>
                      <label htmlFor="notes" style={{ fontWeight: 500, color: "var(--ink-500)", fontSize: 13 }}>
                        Anything we should know — grade, storage, deadlines, budget, your current pricing, substitutions
                        you&apos;ll/won&apos;t accept. <span className="req">Required.</span>
                      </label>
                      <div className="input">
                        <textarea
                          id="notes"
                          placeholder="e.g. Need GMP grade for DMEM; cold-chain on antibodies; ideally delivered before month-end; currently paying ~$190/unit."
                          value={form.notes}
                          onChange={(e) => setField("notes", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="auth-actions" style={{ marginTop: 30 }}>
                    <button type="submit" className="btn btn-primary btn-lg btn-block">
                      Send my sample order <ArrowR />
                    </button>
                    <p className="micro">We reply by email with your comparison · Your list stays private · We never auto-place an order</p>
                  </div>
                </form>

                <p className="auth-switch">
                  Already a customer? <a href="/auth">Log in</a>
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
