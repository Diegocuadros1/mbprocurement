"use client";

// Viewable documents — the ProcureWide / Prodigy master templates.
//
// • ContractDoc  — Prodigy Scientific "Lab Support Agreement" (the member-facing
//                  procurement agreement). Rendered as a BLANK master template.
// • NDADoc       — Mutual Confidentiality Agreement (Prodigy Scientific +
//                  counterparty), blank master template.
// • InvoiceDoc   — Order invoice. Billed by ProcureWide LLC (Austin, TX),
//                  fulfilled by Prodigy Scientific (San Diego, CA). Includes a
//                  PAID / UNPAID status section.
//
// These three TEMPLATES are ProcureWide-operator material and are gated to
// isPwAdmin in DocumentsScreen. All inline styles. Opened full-screen via
// DocViewer. window.print is allowed here for Print / PDF.

import React from "react";
import { PW } from "@/lib/portal/pw";
import { Icon } from "./kit";
import { money } from "@/lib/portal/pricing";

const PW_GREEN = "#0E9560";
const PW_PAPER_INK = "#07112A";

// Fixed party facts (constants the templates always carry).
const PRODIGY = { name: "Prodigy Scientific", addr1: "5414 Oberlin Drive, Ste. 150", addr2: "San Diego, CA 92121", tel: "512-581-1996" };
const PROCUREWIDE = { name: "ProcureWide LLC", addr1: "5010 South Congress Ave #1402", addr2: "Austin, TX 78745" };

type Entity = { name: string; addr1: string; addr2: string; tel?: string };

export type DocKind = "contract" | "nda" | "invoice";
export type InvoiceLine = { sku: string; name: string; unit: string; qty: number; price: number; list: number };
export type InvoiceMeta = {
  invNo?: string; orderNo?: string; issued?: string; due?: string; billTo?: string; lines?: InvoiceLine[];
};
export type ViewerDoc = {
  id: string; name: string; kind: DocKind; blank?: boolean; paid?: boolean; meta?: InvoiceMeta;
};

// ───────── Shared document primitives ────────────────────────────────
function DvPage({ children, pad = "60px 68px" }: { children: React.ReactNode; pad?: string }) {
  return (
    <div className="pw-doc-page" style={{
      width: "100%", maxWidth: 824, margin: "0 auto", background: "#fff",
      boxShadow: "0 18px 50px -20px rgba(7,17,42,0.35)", borderRadius: 3,
      padding: pad, boxSizing: "border-box",
      fontFamily: PW.sans, color: PW.ink500, fontSize: 12.5, lineHeight: 1.6,
    }}>{children}</div>
  );
}

function DvMark({ entity }: { entity?: Entity }) {
  const e = entity || PROCUREWIDE;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
      <span style={{ width: 22, height: 22, borderRadius: 4, background: PW_GREEN, display: "inline-block", flexShrink: 0 }} />
      <span style={{ fontFamily: PW.display, fontWeight: 700, fontSize: 19, color: PW_PAPER_INK, letterSpacing: "-0.02em" }}>{e.name}</span>
    </div>
  );
}

// Inline fill-in slot — value, or a ruled blank in template mode.
function DvField({ value, w = 150, blank, mono }: { value?: string | null; w?: number; blank?: boolean; mono?: boolean }) {
  if (!blank && value != null && value !== "") {
    return <span style={{ fontFamily: mono ? PW.mono : PW.sans, fontWeight: 600, color: PW.ink }}>{value}</span>;
  }
  return <span style={{ display: "inline-block", minWidth: w, borderBottom: `1px solid ${PW.line2}`, height: "1.05em", verticalAlign: "bottom", margin: "0 3px" }} />;
}

function DvDocTitle({ kicker, title, refNo, blank, effLabel = "Effective", effValue }: {
  kicker: string; title: string; refNo?: string; blank?: boolean; effLabel?: string; effValue?: string;
}) {
  return (
    <div style={{ marginTop: 26, paddingBottom: 16, borderBottom: `2px solid ${PW_PAPER_INK}` }}>
      <div style={{ fontFamily: PW.mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: PW_GREEN, fontWeight: 600 }}>{kicker}</div>
      <h1 style={{ margin: "6px 0 0", fontFamily: PW.display, fontWeight: 700, fontSize: 28, letterSpacing: "-0.02em", color: PW_PAPER_INK, lineHeight: 1.08 }}>{title}</h1>
      <div style={{ marginTop: 10, display: "flex", gap: 22, flexWrap: "wrap", fontFamily: PW.mono, fontSize: 11, color: PW.mute }}>
        {refNo !== undefined && <span>Ref&nbsp; <DvField value={refNo} w={120} blank={blank} mono /></span>}
        <span>{effLabel}&nbsp; <DvField value={effValue} w={120} blank={blank} mono /></span>
      </div>
    </div>
  );
}

// One numbered legal section (paras may begin with "(a)" etc — kept as written).
function DvLegalSection({ n, title, paras }: { n: string; title: string; paras: string[] }) {
  return (
    <section style={{ marginTop: 18, breakInside: "avoid" }}>
      <h3 style={{ margin: "0 0 6px", display: "flex", gap: 9, alignItems: "baseline", fontFamily: PW.sans, fontWeight: 800, fontSize: 13, color: PW_PAPER_INK }}>
        <span style={{ fontFamily: PW.mono, fontSize: 12, color: PW_GREEN, fontWeight: 700 }}>{n}</span>
        <span>{title}</span>
      </h3>
      <div style={{ paddingLeft: 24 }}>
        {paras.map((p, i) => (
          <p key={i} style={{ margin: "0 0 7px", textWrap: "pretty", whiteSpace: "pre-wrap" }}>{p}</p>
        ))}
      </div>
    </section>
  );
}

function DvSig({ org, sub, name, title, date, blank }: {
  org: string; sub?: string; name?: string; title?: string; date?: string; blank?: boolean;
}) {
  return (
    <div style={{ flex: "1 1 230px", minWidth: 210 }}>
      <div style={{ height: 32, borderBottom: `1px solid ${PW_PAPER_INK}`, display: "flex", alignItems: "flex-end", paddingBottom: 3 }}>
        {!blank && name && <span style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: "italic", fontSize: 21, color: "#1B2A52", lineHeight: 1 }}>{name}</span>}
      </div>
      <div style={{ marginTop: 6, fontFamily: PW.sans, fontWeight: 800, fontSize: 12.5, color: PW_PAPER_INK }}>{org}</div>
      {sub && <div style={{ fontFamily: PW.sans, fontSize: 11, color: PW.mute }}>{sub}</div>}
      <div style={{ marginTop: 7, fontSize: 11.5, color: PW.ink500, lineHeight: 1.9 }}>
        <div>By:&nbsp; <DvField value={name} w={130} blank={blank} /></div>
        <div>Name:&nbsp; <DvField value={name} w={130} blank={blank} /></div>
        <div>Title:&nbsp; <DvField value={title} w={120} blank={blank} /></div>
        <div>Date:&nbsp; <DvField value={date} w={90} blank={blank} mono /></div>
      </div>
    </div>
  );
}

// ═════════ LAB SUPPORT AGREEMENT (contract) ══════════════════════════
const CONTRACT_SECTIONS = [
  { n: "1.", title: "Incubator Membership and Laboratory Bench Access.", paras: [
    "(a) Upon execution of this Agreement, Member becomes a member of Prodigy’s scientific incubator program (an “Incubator Member”) for the term of this Agreement.",
    "(b) Prodigy grants Member a non-exclusive, revocable right to access and use designated laboratory bench space at Prodigy’s facility at 5414 Oberlin Drive, Ste. 150, San Diego, CA 92121, or such other Prodigy-operated or Prodigy-affiliated site as Prodigy may designate (the “Bench Space”). This right exists for the full term of this Agreement whether or not Member’s personnel are physically present at the Bench Space and regardless of where Member or its personnel are otherwise located. Member may arrange on-site use of the Bench Space upon reasonable advance notice to Prodigy.",
    "(c) As an Incubator Member, Member is entitled to participate in the vendor, supplier, and procurement programs that Prodigy makes available to its members, and Prodigy may identify Member to vendors as a bona fide member of its incubator program.",
  ]},
  { n: "2.", title: "Administrative and Purchasing Support.", paras: [
    "Prodigy will provide lab administrative support to enable Member to conduct the Research during the term of this Agreement, including ongoing purchasing and accounting support. These supports include, but are not limited to:",
    "• Acting as Member’s purchasing agent to negotiate and place orders on Member’s behalf;\n• Opening new accounts with any lawful vendor as requested by Member;\n• Tracking and following up on backorders, late shipments, and similar matters;\n• Processing returns and similar adjustments as needed, although Member will be required to physically process and ship returned products;\n• Providing a detailed invoice with all billbacks and receipts itemized and attached to simplify accounting.",
  ]},
  { n: "3.", title: "Disclosed Purchasing Agent; No Resale; Title.", paras: [
    "(a) Prodigy acts solely as Member’s disclosed purchasing agent and authorized procurement representative. In every transaction facilitated under this Agreement, Member is the buyer of record, the beneficial owner, and the intended end user of all goods, equipment, materials, and services ordered (“Supplies”).",
    "(b) Prodigy does not purchase Supplies for resale and does not resell, redistribute, or take a product margin on Supplies. Title to and risk of loss of all Supplies pass directly from the vendor to Member; Prodigy does not take title to, hold inventory of, or acquire any ownership interest in the Supplies. The Administrative Fee described in Section 8 is consideration for Prodigy’s facilitation and administrative services only and is not a markup on, or margin from, the price of any Supplies.",
    "(c) Member acknowledges that all Supplies are acquired solely for Member’s own internal research use at the Bench Space or at Member’s own registered site, and not for resale, transfer, or redistribution to any third party.",
    "(d) Member authorizes Prodigy to identify itself to vendors as Member’s purchasing agent and incubator host, and to provide a copy of this Agreement (or an excerpt of Sections 1 and 3) to vendors as evidence of the agency and incubator relationship. In support of the foregoing, Member shall issue a Form W-9 to Prodigy upon activation of this Agreement and shall complete any additional agent-authorization or vendor-onboarding paperwork reasonably requested by vendors while this Agreement is in effect.",
  ]},
  { n: "4.", title: "Regulated and Controlled Materials.", paras: [
    "(a) Member is solely responsible for all regulatory compliance applicable to its own research and facility, including without limitation any registration, license, or permit required for controlled substances, DEA List I or List II chemicals, hazardous materials, select agents, radioactive materials, or export-controlled items.",
    "(b) For any Supply that requires a license, registration, or end-user verification (including DEA-regulated controlled substances and listed chemicals), Member shall be the buyer of record under Member’s own account and registration, the order shall ship only to Member’s own registered and verified address, and Prodigy shall not take title to or possession of such Supply. Any vendor end-user verification is performed by the vendor and not by Prodigy.",
    "(c) Prodigy may decline to place, or may pause, any order that Prodigy reasonably believes is regulated, non-compliant, or outside the scope of Member’s authorizations, without liability to Member.",
  ]},
  { n: "5.", title: "Member Representations and Compliance.", paras: [
    "Member represents and warrants that it is a bona fide research entity; that it will use all Supplies for lawful research purposes; that it holds and will maintain all licenses, registrations, and a valid ship-to address required for its activities; and that the information it provides to Prodigy and to vendors is accurate. Member is responsible for all regulatory compliance for its own facility, including any DEA registrations required for regulated materials.",
  ]},
  { n: "6.", title: "Conditions Outside Prodigy’s Control.", paras: [
    "Member expressly acknowledges that Prodigy is not responsible for conditions or losses outside of its control, including but not limited to items lost or damaged during shipping, damages or losses due to delays in receipt of items, delays in order placement due to technical problems, or incorrect items shipped due to vendor error. Under these or similar circumstances, Prodigy will assist Member in placing replacement claims with vendors and shippers as needed.",
  ]},
  { n: "7.", title: "Personnel Provided by Prodigy.", paras: [
    "Prodigy shall be solely responsible for the personnel necessary to conduct the lab support, which responsibilities shall include but not be limited to: hiring, employment, and termination of said personnel; compensation of said personnel; payment of taxes related to the personnel; and securing insurance relating to the personnel.",
  ]},
  { n: "8.", title: "Payment Terms.", paras: [
    "(a) Member shall pay Prodigy a Deposit of $TBD based on order amount, due prior to order execution. This amount will be referenced in an invoice to Member. This amount represents the value of goods and services that Prodigy will purchase on behalf of Member between invoices. Prodigy shall return the Deposit to Member, within sixty (60) days of termination of this Agreement, upon Member’s payment of all amounts owed under this Agreement. Return of the Deposit may be delayed beyond sixty (60) days pending Prodigy’s receipt of final invoices attributed to Member and Member’s payment of all amounts owed.",
    "(b) In addition to the actual costs of goods and services ordered on its behalf, Member shall pay Prodigy a fee of 10% of the total cost of supplies or services (and any additional service fees, taxes, etc. charged by the vendor(s)) ordered on behalf of Member, or 10% of the total cost of durable equipment (and any additional associated fees charged by the vendor(s)) ordered on behalf of Member (the “Administrative Fee”). Prodigy reserves the right to determine whether an order is for a supply/service or durable equipment for purposes of determining the appropriate fee.",
    "(c) Member will be invoiced either when the total amount of purchases and Administrative Fee reaches or exceeds the value of the Deposit, or on the 25th of the month, whichever comes first. Undisputed invoices shall be paid within ten (10) days of Member’s receipt of an invoice. Prodigy reserves the right to assess a charge equal to 10% of the unpaid invoice if payment is not received within this period. Where invoicing is triggered by the Deposit threshold, Prodigy may, at its sole discretion, pause additional order placement on behalf of Member until payment is received.",
  ]},
  { n: "9.", title: "Start Date, Automatic Renewal, and Termination.", paras: [
    "This Agreement shall commence as of the Effective Date. On the first day of each month thereafter (the “Record Date”), this Agreement will automatically renew for an additional three-month period unless the terminating party sends written notice to the non-terminating party on or prior to the applicable Record Date, in which case this Agreement shall terminate sixty (60) days after the applicable Record Date.",
  ]},
  { n: "10.", title: "Proprietary Rights.", paras: [
    "Prodigy agrees and acknowledges that it shall acquire no rights of any kind whatsoever with respect to any Intellectual Property of Member as a result of the Parties’ performance under this Agreement or otherwise. Prodigy agrees that any invention or know-how conceived or first reduced to practice in the performance of its responsibilities by Prodigy or its employees, alone or jointly with others, together with all Intellectual Property related thereto (collectively, “Inventions”), shall be and remain at all times the sole and exclusive property of Member, and Prodigy hereby agrees to assign to Member its entire right, title, and interest in all Inventions. Prodigy shall perform any and all acts necessary to assist Member in perfecting its rights to any such Inventions; to the extent this requires significant work by Prodigy or its staff, Member will reimburse Prodigy at Prodigy’s reasonable consulting rates.",
  ]},
  { n: "11.", title: "Confidential Information.", paras: [
    "Anything in this Agreement to the contrary notwithstanding, any and all knowledge, know-how, practices, processes, or other information disclosed or submitted in writing or in other tangible form by Member to Prodigy pursuant to this Agreement, or which Prodigy becomes aware of through any means as part of this Agreement (“Confidential Information”), shall be received and maintained by Prodigy in strict confidence. Prodigy shall use its best efforts to ensure that neither it nor its employees disclose Member’s Confidential Information, and in any event will use as much care in protecting Member’s Confidential Information as Prodigy uses in protecting its own. The Inventions shall be considered Member’s Confidential Information. Prodigy shall not use the Confidential Information for any purpose other than those specified in this Agreement and may disclose it solely to employees requiring access for the purposes of this Agreement, provided each such employee is bound by a contractual obligation of confidentiality. The foregoing obligations shall not apply to Confidential Information that Prodigy can establish by competent written proof: (i) was in the public domain at the time of disclosure; (ii) after disclosure, becomes part of the public domain other than by breach of this Agreement by Prodigy; or (iii) was in Prodigy’s possession in documentary form at the time of disclosure.",
  ]},
  { n: "12.", title: "Indemnification.", paras: [
    "The Parties shall each indemnify the other for any claims, losses, damages, costs, and expenses, including reasonable attorneys’ fees but expressly excluding all foreseeable and unforeseeable consequential damages (“Claims”), arising from any third-party claim resulting from the indemnifying party’s gross negligence or willful misconduct in its performance of this Agreement, except that in no event shall either party be liable to the other to the extent such Claim arises out of the gross negligence or willful misconduct of the indemnified party.",
  ]},
  { n: "13.", title: "Disclaimer of Warranties.", paras: [
    "PRODIGY PROVIDES NO WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.",
  ]},
  { n: "14.", title: "Limitation of Liability.", paras: [
    "IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY SPECIAL, INDIRECT, OR CONSEQUENTIAL (WHETHER FORESEEABLE OR UNFORESEEABLE) DAMAGES OF ANY KIND IN CONNECTION WITH THIS AGREEMENT, EVEN IF EITHER PARTY HAS BEEN INFORMED IN ADVANCE OF THE POSSIBILITY OF SUCH DAMAGES.",
  ]},
  { n: "15.", title: "Material Breach.", paras: [
    "Either party may terminate this Agreement for any material breach which is not cured within thirty (30) days following notice from the non-breaching party specifying such breach. Such termination shall be effective at the end of such thirty (30) days.",
  ]},
  { n: "16.", title: "Effect of Termination.", paras: [
    "Termination of this Agreement shall be without prejudice to or limitation on any other remedies or any accrued obligations of either party. The obligations under Proprietary Rights and Confidential Information shall survive any termination, expiration, or completion of this Agreement.",
  ]},
  { n: "17.", title: "No License.", paras: [
    "Nothing in this Agreement shall be construed as conferring on either party an express or implied license or option to license any disclosed Confidential Information, technology, trade secrets, trademarks, copyright, or any patent or patent application owned by the other party.",
  ]},
  { n: "18.", title: "Independent Contractors.", paras: [
    "The Parties shall perform their obligations under this Agreement as independent contractors, and nothing contained herein shall be construed to be inconsistent with such relationship or status. This Agreement shall not constitute, create, or in any way be interpreted as a joint venture or partnership of any kind.",
  ]},
  { n: "19.", title: "Non-Solicitation.", paras: [
    "During the term of this Agreement and for one (1) year after termination, neither party shall directly or indirectly, without the prior written consent of the other party, solicit, recruit, encourage, or induce any employees, directors, consultants, contractors, or subcontractors of such party to leave the employ of such party, either on its own behalf or on behalf of any other person or entity. In the event of a breach of this provision and related hiring, the breaching party will pay to the other, as liquidated damages and not as a penalty, an amount equal to 30% of the first year’s salary and bonus(es) ultimately agreed upon between the person solicited and the new employer. Payment of this amount will be the breaching party’s total liability and the other party’s only remedy for a breach of this provision.",
  ]},
  { n: "20.", title: "Entire Agreement.", paras: [
    "This Agreement sets forth all the covenants, promises, agreements, warranties, representations, conditions, and understandings between the Parties, and supersedes and terminates all prior agreements and understandings between the Parties. There are no binding covenants, promises, agreements, warranties, representations, conditions, or understandings, either oral or written, between the Parties other than as set forth herein. No subsequent alteration, amendment, change, or addition to this Agreement shall be binding upon the Parties unless reduced to writing and signed by the respective authorized officers of each party.",
  ]},
  { n: "21.", title: "Force Majeure.", paras: [
    "Neither party shall be liable for any failure to perform as required by this Agreement to the extent such failure is caused by any unforeseeable reason beyond its control, including without limitation labor disturbances or disputes of any kind, failure of any required governmental approval, civil disorders, acts of national aggression, acts of God, energy or other conservation measures, failure of utilities, mechanical breakdowns, material shortage, disease, or similar occurrences; provided, however, such party shall, as soon as reasonably practicable, (a) provide written notice to the other party of the nature and extent of such condition, and (b) use commercially reasonable efforts to remove any such causes and resume performance as soon as reasonably practicable.",
  ]},
  { n: "22.", title: "Dispute Resolution.", paras: [
    "In the event of any dispute, claim, question, or disagreement arising from or relating to this Agreement or an alleged breach thereof (a “Dispute”), the Parties shall use their best efforts to settle the Dispute. The complaining party shall provide written notice to the other party (the “Initial Notice of Dispute”). Following the Initial Notice of Dispute, the Parties shall consult and negotiate in good faith and attempt to reach a just and equitable solution. If the Parties are unable to reach a resolution within thirty (30) days of the Initial Notice of Dispute, the Dispute shall be resolved as follows:",
    "(a) Mediation. If the Dispute is not resolved through informal negotiations within thirty (30) days of the Initial Notice of Dispute, the Parties agree first to try in good faith to settle the Dispute by mediation administered by JAMS under its mediation rules. Upon written notice to the other party, either party may commence mediation. All offers, promises, conduct, and statements made in the course of the mediation are confidential, privileged, and inadmissible for any purpose in any subsequent proceeding. The Parties will participate in good faith and share the costs of mediation equally; each party will bear its own attorneys’ fees and costs.",
    "(b) Arbitration. If the Dispute cannot be settled through informal negotiations or mediation, the Parties agree to submit the Dispute to binding arbitration, thereby waiving their right to a jury trial. The arbitration shall be conducted before a panel of three mutually agreed neutral arbitrators in San Diego, California, administered by JAMS in accordance with the JAMS Comprehensive Arbitration Rules and Procedures. The arbitrators shall apply the substantive law of California. All aspects of the arbitration shall be confidential, except as necessary to comply with legal or regulatory requirements. The result of the arbitration shall be binding, and judgment on the award may be entered in any court having jurisdiction. The arbitrators shall award the prevailing party, if any, the costs and attorneys’ fees reasonably incurred in connection with the arbitration.",
  ]},
  { n: "23.", title: "Governing Law; Severability.", paras: [
    "This Agreement shall be governed by the laws of the State of California as applied to contracts entered into and to be performed entirely in California by California residents. If any provision of this Agreement is determined to be unenforceable, such provision shall be severed and the remaining provisions shall continue in full force and effect.",
  ]},
  { n: "24.", title: "Counterparts.", paras: [
    "This Agreement may be executed in counterparts, each of which when taken together shall constitute one and the same instrument.",
  ]},
];

function ContractDoc({ blank }: { blank?: boolean }) {
  const filled = !blank;
  return (
    <DvPage>
      {/* Prodigy letterhead */}
      <DvMark entity={PRODIGY} />
      <div style={{ marginTop: 6, fontFamily: PW.sans, fontSize: 11, color: PW.mute }}>
        {PRODIGY.addr1} &nbsp;|&nbsp; {PRODIGY.addr2} &nbsp;|&nbsp; Telephone: {PRODIGY.tel}
      </div>

      <DvDocTitle kicker="Lab Support Agreement" title="Lab Support Agreement"
        refNo={filled ? "PRD-LSA-2026-0142" : ""} blank={blank} effValue={filled ? "11 June 2026" : ""} />

      {/* Date + recipient */}
      <div style={{ marginTop: 16, fontSize: 12.5 }}>
        <div>Date: <DvField value={filled ? "06 / 11 / 2026" : ""} w={120} blank={blank} mono /></div>
        <div style={{ marginTop: 10, lineHeight: 1.5 }}>
          <DvField value={filled ? "Helio Bio, Inc." : ""} w={220} blank={blank} /><br />
          <DvField value="" w={240} blank /><br />
          <DvField value="" w={180} blank />
        </div>
        <p style={{ margin: "12px 0 0" }}>Dear <DvField value={filled ? "Helio Bio, Inc." : ""} w={180} blank={blank} />,:</p>
        <p style={{ margin: "8px 0 0", textWrap: "pretty" }}>
          Pursuant to our recent conversation regarding a Lab Support Agreement (this &ldquo;Agreement&rdquo;) to support the scientific
          pursuits of <DvField value={filled ? "Helio Bio, Inc." : ""} w={150} blank={blank} /> (&ldquo;Member&rdquo;), the terms set forth
          below are effective as of <DvField value={filled ? "June 11th, 2026" : ""} w={120} blank={blank} /> (the &ldquo;Effective Date&rdquo;).
        </p>
      </div>

      {/* Recitals */}
      <div style={{ marginTop: 18, fontSize: 12.5, lineHeight: 1.6 }}>
        <p style={{ margin: "0 0 7px", fontFamily: PW.sans, fontWeight: 800, fontSize: 13, color: PW_PAPER_INK, textTransform: "uppercase", letterSpacing: "0.04em" }}>Lab Support Agreement</p>
        <p style={{ margin: "0 0 7px", textWrap: "pretty" }}>WHEREAS, Prodigy Scientific (&ldquo;Prodigy&rdquo;) operates a scientific incubator and eProcurement program that provides member companies with laboratory bench access, administrative support, and purchasing-agent services; and</p>
        <p style={{ margin: "0 0 7px", textWrap: "pretty" }}>WHEREAS, Member desires to join Prodigy&rsquo;s incubator program as a member in order to obtain laboratory bench access and the lab and administrative supports described below, in accordance with the terms set forth herein, in furtherance of Member&rsquo;s research projects (the &ldquo;Research&rdquo;); and</p>
        <p style={{ margin: "0 0 7px", textWrap: "pretty" }}>WHEREAS, Prodigy and Member (collectively, the &ldquo;Parties&rdquo;) seek a mutually beneficial arrangement consistent with these recitals.</p>
        <p style={{ margin: "0 0 7px", textWrap: "pretty" }}>NOW, THEREFORE, in consideration of the covenants and mutual promises set forth herein, and for other good and valuable consideration, the receipt of which is acknowledged, the Parties agree as follows:</p>
      </div>

      {CONTRACT_SECTIONS.map((s) => <DvLegalSection key={s.n} {...s} />)}

      {/* §25 Notices */}
      <section style={{ marginTop: 18 }}>
        <h3 style={{ margin: "0 0 6px", display: "flex", gap: 9, alignItems: "baseline", fontFamily: PW.sans, fontWeight: 800, fontSize: 13, color: PW_PAPER_INK }}>
          <span style={{ fontFamily: PW.mono, fontSize: 12, color: PW_GREEN, fontWeight: 700 }}>25.</span><span>Notices.</span>
        </h3>
        <div style={{ paddingLeft: 24 }}>
          <p style={{ margin: "0 0 9px" }}>All notices, demands, and other communications under this Agreement shall be in writing and given either by personal delivery or by nationally recognized overnight courier (charges prepaid) and shall be deemed given when actually delivered.</p>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 220px" }}>
              <div style={{ fontFamily: PW.mono, fontSize: 10, color: PW_GREEN, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>If to Member</div>
              <div style={{ marginTop: 5, lineHeight: 1.6 }}>
                <DvField value={filled ? "Helio Bio, Inc." : ""} w={180} blank={blank} /><br />
                <DvField value="" w={200} blank /><br />
                <DvField value="" w={160} blank />
              </div>
            </div>
            <div style={{ flex: "1 1 220px" }}>
              <div style={{ fontFamily: PW.mono, fontSize: 10, color: PW_GREEN, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>If to Prodigy</div>
              <div style={{ marginTop: 5, lineHeight: 1.6 }}>
                James Thompson<br />Prodigy Scientific<br />5414 Oberlin Drive, Ste. 150<br />San Diego, CA 92121
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing + signatures */}
      <div style={{ marginTop: 24, fontSize: 12.5 }}>
        <p style={{ margin: 0 }}>Please indicate your acceptance of this Agreement by signing below and returning it to our office.</p>
        <p style={{ margin: "10px 0 0" }}>Sincerely yours,</p>
        <p style={{ margin: "2px 0 0", fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: "italic", fontSize: 20, color: "#1B2A52" }}>James Thompson</p>
        <p style={{ margin: 0, fontWeight: 700, color: PW_PAPER_INK }}>CEO, Prodigy Scientific</p>
      </div>

      <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px solid ${PW.line}` }}>
        <div style={{ fontFamily: PW.sans, fontWeight: 800, fontSize: 12, color: PW_PAPER_INK, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>Understood and accepted</div>
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap", rowGap: 26 }}>
          <DvSig org="Prodigy Scientific" name={filled ? "Ali Darwish" : ""} title={filled ? "Program Manager, Prodigy Scientific" : ""} date={filled ? "11 Jun 2026" : ""} blank={blank} />
          <DvSig org="Member" sub={filled ? "Helio Bio, Inc." : undefined} name="" title="" date="" blank />
        </div>
      </div>
    </DvPage>
  );
}

// ═════════ MUTUAL CONFIDENTIALITY AGREEMENT (NDA) ═════════════════════
const NDA_SECTIONS = [
  { n: "1.", title: "Background.", paras: [
    "The Counterparty named above and Prodigy Scientific intend to engage in discussions concerning the possible establishment of a mutually acceptable business relationship between them (the “Purpose”). In the course of these discussions, each party may disclose or deliver to the other party certain of its Confidential Information (defined below). The party disclosing Confidential Information is referred to in this Agreement as “Discloser” with respect to that Confidential Information; the party receiving that Confidential Information is referred to as “Recipient”.",
  ]},
  { n: "2.", title: "Definition.", paras: [
    "“Confidential Information” means any and all non-public scientific, technical, financial or business information in whatever form (written, oral or visual) that is furnished or made available to Recipient by or on behalf of Discloser, and that (a) if in tangible form, is labeled in writing as proprietary or confidential; (b) if in oral or visual form, is identified as proprietary or confidential at the time of disclosure or within fifteen (15) days thereafter; or (c) is commonly regarded as confidential or proprietary in the life sciences industry.",
  ]},
  { n: "3.", title: "Obligations.", paras: [
    "Recipient agrees to (a) hold in confidence all of Discloser’s Confidential Information and not disclose such Confidential Information except as expressly provided in Section 4 below, without the prior written consent of Discloser; (b) use Discloser’s Confidential Information solely for the Purpose; (c) treat Discloser’s Confidential Information with the same degree of care Recipient uses to protect Recipient’s own confidential information but in no event with less than a reasonable degree of care; (d) reproduce Discloser’s Confidential Information solely to the extent necessary to accomplish the Purpose, with all such reproductions being considered Discloser’s Confidential Information; (e) not disclose either the fact that discussions are taking place concerning a possible relationship between the parties or any of the terms, conditions, or other facts with respect to the possible relationship, including, without limitation, the status of such discussions and the exchange of Confidential Information; and (f) promptly notify Discloser of any actual and/or suspected unauthorized use or disclosure of Discloser’s Confidential Information of which Recipient becomes aware and reasonably cooperate with Discloser to mitigate the harmful effects of such unauthorized use and/or disclosure and protect against any further unauthorized use and/or disclosure of Discloser’s Confidential Information.",
  ]},
  { n: "4.", title: "Permitted Disclosures.", paras: [
    "Recipient may provide Discloser’s Confidential Information solely to its employees or consultants (“Representatives”) who, in each case, (a) have a need to know such Confidential Information to carry out the Purpose; and (b) are bound by written obligations of non-disclosure and non-use at least as restrictive as those set forth in this Agreement. Recipient will be liable to Discloser for the compliance of its Representatives with Recipient’s obligations under this Agreement. If Recipient is required by a governmental authority or by order of a court of competent jurisdiction to disclose any of Discloser’s Confidential Information, Recipient will give Discloser prompt written notice thereof and Recipient will take all reasonable and lawful actions to avoid or minimize the degree of such disclosure. Recipient will cooperate reasonably with Discloser in any efforts to seek a protective order.",
  ]},
  { n: "5.", title: "Exceptions.", paras: [
    "Recipient’s obligations of non-disclosure and non-use under this Agreement will not apply to any portion of Discloser’s Confidential Information that Recipient can demonstrate, by competent proof:",
    "(a) is generally known to the public at the time of disclosure or becomes generally known through no wrongful act on the part of Recipient;\n(b) is in Recipient’s possession at the time of disclosure other than as a result of Recipient’s breach of any legal obligation;\n(c) becomes known to Recipient on a non-confidential basis through disclosure by sources other than Discloser having the legal right to disclose such Confidential Information; or\n(d) is independently developed by Recipient without reference to or reliance upon Discloser’s Confidential Information.",
  ]},
  { n: "6.", title: "Rights and Licenses.", paras: [
    "Recipient agrees that, as between the parties, Discloser is and will remain the exclusive owner of Discloser’s Confidential Information and all patent, copyright, trademark and other intellectual property rights in such Confidential Information. Except for the right to use Discloser’s Confidential Information for the Purpose, no other right or license is granted to Recipient by this Agreement and the disclosure of Confidential Information does not result in any obligation by Discloser to grant Recipient any right in or to such Confidential Information.",
  ]},
  { n: "7.", title: "Term and Termination.", paras: [
    "This Agreement will be effective for a period of one (1) year following the Effective Date unless earlier terminated by a party upon thirty (30) days’ prior written notice to the other party. The obligations of non-disclosure and non-use in this Agreement will survive any such expiration or termination and continue in full force and effect for a period of five (5) years from the date of expiration or termination. Upon the request of Discloser, Recipient will promptly (a) at Discloser’s option, either destroy or return to Discloser all of Discloser’s Confidential Information, along with any copies of such Confidential Information made by or for Recipient; and (b) if Discloser elects to have Recipient destroy such Confidential Information, provide a written certification to Discloser regarding such destruction. Recipient may, however, retain one (1) copy of Discloser’s Confidential Information in its confidential files, solely for the purpose of monitoring its continuing obligations of non-disclosure and non-use under this Agreement.",
  ]},
  { n: "8.", title: "Remedies.", paras: [
    "Recipient agrees that (a) Discloser may be irreparably injured by a breach of this Agreement by Recipient; (b) money damages would not be an adequate remedy for any such breach; (c) as a remedy for any such breach Discloser will be entitled to seek equitable relief, including injunctive relief and specific performance, without being required by Recipient to post a bond; and (d) such remedy will not be the exclusive remedy for any breach of this Agreement.",
  ]},
  { n: "9.", title: "No Warranties.", paras: [
    "Neither party makes any representations or warranties, express or implied, with respect to the accuracy or completeness of its Confidential Information. Discloser will have no liability with respect to the use or reliance upon Discloser’s Confidential Information by Recipient.",
  ]},
  { n: "10.", title: "Miscellaneous.", paras: [
    "(a) Entire Agreement. This Agreement contains the entire agreement of the parties with regard to its subject matter and supersedes all prior or contemporaneous written or oral representations, agreements and understandings between the parties relating to that subject matter. This Agreement may be changed only by a writing signed by an authorized representative of each party.",
    "(b) Assignment and Binding Effect. This Agreement may not be assigned or transferred by either party without the prior written consent of the other party; provided, however, that either party may transfer or assign this Agreement without the prior written consent of the other party, but with written notice, to an affiliate or in connection with a merger, consolidation, or a sale or transfer of all or substantially all of the assets to which the Purpose relates. Any purported assignment or transfer in violation of this Section is void.",
    "(c) Notices. All notices required or permitted under this Agreement must be in writing and must be given by directing the notice to the address for the receiving party set forth in this Agreement or at such other address as the receiving party may specify in writing. Notices to each party will be marked “Attention: Legal”.",
    "(d) Governing Law. This Agreement and any disputes relating to or arising out of this Agreement will be governed by, construed, and interpreted in accordance with the internal laws of the Commonwealth of Massachusetts, without regard to any choice of law principle that would require the application of the law of another jurisdiction. The parties agree to submit to the exclusive jurisdiction of the state and federal courts located in the Commonwealth of Massachusetts and waive any defense of inconvenient forum.",
    "(e) Severability; Reformation. Each provision in this Agreement is independent and severable from the others, and no provision will be rendered unenforceable because any other provision is found to be invalid or unenforceable in whole or in part. If any provision is found to be invalid or unenforceable in whole or in part, such provision shall be changed and interpreted so as to best accomplish the objectives of such provision and the intent of the parties, within the limits of applicable law.",
    "(f) Waivers. Any delay in enforcing a party’s rights under this Agreement, or any waiver as to a particular default or other matter, will not constitute a waiver of such party’s rights to the future enforcement of its rights under this Agreement, except with respect to an express written waiver signed by an authorized representative of the waiving party.",
    "(g) Counterparts. This Agreement may be executed in one or more counterparts, each of which will be deemed an original, and all of which together will be deemed to be one and the same instrument. A portable document format (“.pdf”) copy or a copy executed using a recognized electronic signature service will each be deemed an original.",
  ]},
];

function NDADoc({ blank }: { blank?: boolean }) {
  const filled = !blank;
  return (
    <DvPage>
      <div style={{ fontFamily: PW.mono, fontSize: 10, letterSpacing: "0.14em", color: PW.mute, fontWeight: 600 }}>CONFIDENTIAL</div>
      <DvMark entity={PRODIGY} />
      <div style={{ marginTop: 6, fontFamily: PW.sans, fontSize: 11, color: PW.mute }}>
        {PRODIGY.addr1} &nbsp;|&nbsp; {PRODIGY.addr2}
      </div>

      <DvDocTitle kicker="Confidentiality" title="Mutual Confidentiality Agreement"
        refNo={filled ? "PRD-NDA-2026-0031" : ""} blank={blank} effValue={filled ? "11 June 2026" : ""} />

      <p style={{ marginTop: 16, textWrap: "pretty" }}>
        THIS MUTUAL CONFIDENTIALITY AGREEMENT (the &ldquo;Agreement&rdquo;) is made as of the Effective Date set out above
        (the &ldquo;Effective Date&rdquo;) by and between <DvField value={filled ? "Helio Bio, Inc." : ""} w={200} blank={blank} />, with an
        office at <DvField value="" w={220} blank /> (the &ldquo;Counterparty&rdquo;), and Prodigy Scientific, a California corporation
        with an office at 5414 Oberlin Drive, Ste. 150, San Diego, CA 92121.
      </p>

      {NDA_SECTIONS.map((s) => <DvLegalSection key={s.n} {...s} />)}

      <div style={{ marginTop: 26, paddingTop: 16, borderTop: `1px solid ${PW.line}` }}>
        <div style={{ fontFamily: PW.sans, fontWeight: 800, fontSize: 12, color: PW_PAPER_INK, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Executed as of the Effective Date</div>
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap", rowGap: 26, marginTop: 14 }}>
          <DvSig org="Counterparty" sub={filled ? "Helio Bio, Inc." : undefined} name="" title="" date="" blank />
          <DvSig org="Prodigy Scientific" name={filled ? "Ali Darwish" : ""} title={filled ? "Program Director" : ""} date={filled ? "11 Jun 2026" : ""} blank={blank} />
        </div>
      </div>
    </DvPage>
  );
}

// ═════════ ORDER INVOICE ══════════════════════════════════════════════
function PaidStamp({ paid, blank }: { paid?: boolean; blank?: boolean }) {
  if (blank) {
    // Template: a status section with both options to mark.
    return (
      <div style={{ display: "inline-flex", gap: 16, alignItems: "center", padding: "8px 14px", border: `1px dashed ${PW.line2}`, borderRadius: 6 }}>
        <span style={{ fontFamily: PW.mono, fontSize: 10, color: PW.mute, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Status</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: PW.sans, fontSize: 12.5, color: PW.ink500, fontWeight: 600 }}>
          <span style={{ width: 14, height: 14, border: `1.5px solid ${PW.line2}`, borderRadius: 3, display: "inline-block" }} /> Paid
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: PW.sans, fontSize: 12.5, color: PW.ink500, fontWeight: 600 }}>
          <span style={{ width: 14, height: 14, border: `1.5px solid ${PW.line2}`, borderRadius: 3, display: "inline-block" }} /> Unpaid
        </span>
      </div>
    );
  }
  const ok = paid;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 6,
      border: `2px solid ${ok ? "#0E9560" : "#C0392B"}`, color: ok ? "#0A7048" : "#A02A1E",
      background: ok ? "#E6F5EC" : "#FBE9E6", fontFamily: PW.sans, fontWeight: 800, fontSize: 14,
      letterSpacing: "0.04em", textTransform: "uppercase",
    }}>
      <span style={{ width: 9, height: 9, borderRadius: 99, background: ok ? "#0E9560" : "#C0392B" }} />
      {ok ? "Paid" : "Unpaid · Balance due"}
    </span>
  );
}

function InvoiceDoc({ blank, paid, meta }: { blank?: boolean; paid?: boolean; meta?: InvoiceMeta }) {
  const m = meta || {};
  const lines: InvoiceLine[] = blank ? [] : (m.lines || [
    { sku: "TF-26140", name: "Fetal Bovine Serum (FBS), US-sourced", unit: "500 mL", qty: 2, price: 489.0, list: 545.0 },
    { sku: "TF-11965", name: "DMEM, high glucose, no glutamine", unit: "500 mL", qty: 6, price: 56.8, list: 63.73 },
    { sku: "CS-4970", name: "β-Actin (13E5) Rabbit mAb", unit: "100 µL", qty: 1, price: 408.0, list: 445.0 },
    { sku: "FS-1256", name: "Pipette Tips, 1000 µL, filtered, sterile", unit: "rack ×96 (×10)", qty: 4, price: 92.0, list: 108.0 },
  ]);
  const blankRows = blank ? Array.from({ length: 6 }) : [];
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const listTotal = lines.reduce((s, l) => s + l.list * l.qty, 0);
  const savings = listTotal - subtotal;
  const fee = blank ? 0 : +(subtotal * 0.1).toFixed(2); // 10% Administrative Fee per Lab Support Agreement §8(b)
  const total = subtotal + fee;
  const COLS = "86px 1fr 78px 50px 88px 92px";

  return (
    <DvPage pad="52px 60px">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
        <div>
          <DvMark entity={PROCUREWIDE} />
          <div style={{ marginTop: 9, fontFamily: PW.sans, fontSize: 11, color: PW.mute, lineHeight: 1.55 }}>
            {PROCUREWIDE.name} · {PROCUREWIDE.addr1}<br />{PROCUREWIDE.addr2} · billing@procurewide.com
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: PW.display, fontWeight: 700, fontSize: 26, letterSpacing: "-0.02em", color: PW_PAPER_INK }}>Invoice</div>
          <table style={{ marginTop: 8, marginLeft: "auto", fontFamily: PW.mono, fontSize: 11, color: PW.ink500, borderCollapse: "collapse" }}>
            <tbody>
              <tr><td style={{ color: PW.mute, paddingRight: 12, textAlign: "right" }}>Invoice #</td><td style={{ textAlign: "right" }}><DvField value={blank ? "" : (m.invNo || "INV-2026-0142")} w={104} blank={blank} mono /></td></tr>
              <tr><td style={{ color: PW.mute, paddingRight: 12, textAlign: "right" }}>Order #</td><td style={{ textAlign: "right" }}><DvField value={blank ? "" : (m.orderNo || "PW-ORD-3318")} w={104} blank={blank} mono /></td></tr>
              <tr><td style={{ color: PW.mute, paddingRight: 12, textAlign: "right" }}>Issued</td><td style={{ textAlign: "right" }}><DvField value={blank ? "" : (m.issued || "12 Jun 2026")} w={104} blank={blank} mono /></td></tr>
              <tr><td style={{ color: PW.mute, paddingRight: 12, textAlign: "right" }}>Due</td><td style={{ textAlign: "right" }}><DvField value={blank ? "" : (m.due || "22 Jun 2026")} w={104} blank={blank} mono /></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* PAID / UNPAID status section */}
      <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end" }}>
        <PaidStamp paid={paid} blank={blank} />
      </div>

      <div style={{ display: "flex", gap: 14, marginTop: 18, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 230px" }}>
          <div style={{ fontFamily: PW.mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: PW_GREEN, fontWeight: 700 }}>Bill to</div>
          <div style={{ marginTop: 5, fontSize: 12.5, color: PW.ink500, lineHeight: 1.55 }}>
            {blank ? <span><DvField value="" w={180} blank /><br /><DvField value="" w={160} blank /><br /><DvField value="" w={140} blank /></span>
              : <span><strong style={{ color: PW_PAPER_INK }}>{m.billTo || "Helio Bio, Inc."}</strong><br />Attn: Research Operations<br />Member of the Prodigy incubator program</span>}
          </div>
        </div>
        <div style={{ flex: "1 1 230px" }}>
          <div style={{ fontFamily: PW.mono, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: PW_GREEN, fontWeight: 700 }}>Fulfilled by</div>
          <div style={{ marginTop: 5, fontSize: 12.5, color: PW.ink500, lineHeight: 1.55 }}>
            <strong style={{ color: PW_PAPER_INK }}>{PRODIGY.name}</strong><br />{PRODIGY.addr1}<br />{PRODIGY.addr2}
          </div>
        </div>
      </div>

      {/* Line items */}
      <div style={{ marginTop: 22, border: `1px solid ${PW.line}`, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: COLS, gap: 10, padding: "9px 14px", background: "#F4F6F9", borderBottom: `1px solid ${PW.line}`, fontFamily: PW.sans, fontSize: 10, fontWeight: 800, color: PW.mute, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          <span>SKU</span><span>Description</span><span>Unit</span><span style={{ textAlign: "right" }}>Qty</span><span style={{ textAlign: "right" }}>Price</span><span style={{ textAlign: "right" }}>Amount</span>
        </div>
        {lines.map((l) => (
          <div key={l.sku} style={{ display: "grid", gridTemplateColumns: COLS, gap: 10, padding: "11px 14px", borderBottom: `1px solid ${PW.line}`, alignItems: "baseline", fontSize: 12 }}>
            <span style={{ fontFamily: PW.mono, fontSize: 11, color: PW.ink500 }}>{l.sku}</span>
            <span style={{ color: PW_PAPER_INK, fontWeight: 600 }}>{l.name}</span>
            <span style={{ color: PW.mute, fontSize: 11.5 }}>{l.unit}</span>
            <span style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{l.qty}</span>
            <span style={{ textAlign: "right", fontFamily: PW.mono, fontSize: 11.5, fontVariantNumeric: "tabular-nums" }}>{money(l.price)}</span>
            <span style={{ textAlign: "right", fontFamily: PW.mono, fontSize: 11.5, fontWeight: 700, color: PW_PAPER_INK, fontVariantNumeric: "tabular-nums" }}>{money(l.price * l.qty)}</span>
          </div>
        ))}
        {blankRows.map((_, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: COLS, gap: 10, padding: "14px", borderBottom: `1px solid ${PW.line}` }}>
            {[0, 1, 2, 3, 4, 5].map((c) => <span key={c} style={{ borderBottom: `1px solid ${PW.paper2}`, height: "1em" }} />)}
          </div>
        ))}
      </div>

      {/* Totals */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
        <table style={{ minWidth: 290, fontFamily: PW.sans, fontSize: 12.5, color: PW.ink500, borderCollapse: "collapse" }}>
          <tbody>
            <tr><td style={{ padding: "4px 0" }}>Subtotal (cost of Supplies)</td><td style={{ textAlign: "right", fontFamily: PW.mono, fontVariantNumeric: "tabular-nums" }}>{blank ? <DvField value="" w={80} blank /> : money(subtotal)}</td></tr>
            <tr><td style={{ padding: "4px 0", color: PW_GREEN }}>Contract savings vs. list</td><td style={{ textAlign: "right", fontFamily: PW.mono, color: PW_GREEN, fontVariantNumeric: "tabular-nums" }}>{blank ? <DvField value="" w={80} blank /> : "−" + money(savings)}</td></tr>
            <tr><td style={{ padding: "4px 0" }}>Administrative Fee (10%)</td><td style={{ textAlign: "right", fontFamily: PW.mono, fontVariantNumeric: "tabular-nums" }}>{blank ? <DvField value="" w={80} blank /> : money(fee)}</td></tr>
            <tr><td style={{ padding: "10px 0 0", borderTop: `2px solid ${PW_PAPER_INK}`, fontWeight: 800, color: PW_PAPER_INK, fontSize: 14 }}>Total due</td>
              <td style={{ padding: "10px 0 0", borderTop: `2px solid ${PW_PAPER_INK}`, textAlign: "right", fontFamily: PW.mono, fontWeight: 800, color: PW_PAPER_INK, fontSize: 15, fontVariantNumeric: "tabular-nums" }}>{blank ? <DvField value="" w={90} blank /> : money(total)}</td></tr>
            {!blank && (
              <tr><td style={{ padding: "6px 0 0", color: paid ? "#0A7048" : "#A02A1E", fontWeight: 700 }}>{paid ? "Amount paid" : "Balance outstanding"}</td>
                <td style={{ padding: "6px 0 0", textAlign: "right", fontFamily: PW.mono, fontWeight: 800, color: paid ? "#0A7048" : "#A02A1E", fontVariantNumeric: "tabular-nums" }}>{money(total)}</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 22, paddingTop: 14, borderTop: `1px solid ${PW.line}`, fontFamily: PW.sans, fontSize: 11, color: PW.mute, lineHeight: 1.6 }}>
        <strong style={{ color: PW.ink500 }}>Payment</strong> — Undisputed invoices are due within ten (10) days of receipt per the Lab Support Agreement (§8c).
        Remit to {PROCUREWIDE.name}, {PROCUREWIDE.addr1}, {PROCUREWIDE.addr2}, or pay through the portal.
        Prices reflect the last-paid contract price; vendor rates may vary at fulfillment. Questions: billing@procurewide.com.
      </div>
    </DvPage>
  );
}

export { ContractDoc, NDADoc, InvoiceDoc };

// ───────── Full-screen viewer shell ──────────────────────────────────
const toolBtn: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 5,
  background: PW_GREEN, color: "#fff", border: "none", cursor: "pointer",
  fontFamily: PW.sans, fontSize: 12.5, fontWeight: 700,
};

export function DocViewer({ doc, onClose }: { doc: ViewerDoc | null; onClose: () => void }) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);
  if (!doc) return null;
  const Body: React.FC<{ blank?: boolean; paid?: boolean; meta?: InvoiceMeta }> =
    doc.kind === "contract" ? ContractDoc : doc.kind === "nda" ? NDADoc : InvoiceDoc;
  const kindLabel = doc.kind === "contract" ? "Agreement" : doc.kind === "nda" ? "NDA" : "Invoice";
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9500, display: "flex", flexDirection: "column", background: "rgba(7,17,42,0.55)", backdropFilter: "blur(3px)" }}>
      <div className="pw-doc-toolbar" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", background: PW_PAPER_INK, color: "#fff", flexShrink: 0 }}>
        <span style={{ fontFamily: PW.mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 3, background: "rgba(255,255,255,0.14)", color: doc.blank ? "#FFD27A" : "#7BE0B0" }}>{doc.blank ? "Master template" : kindLabel}</span>
        <span style={{ fontFamily: PW.sans, fontWeight: 700, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.name}</span>
        <span style={{ flex: 1 }} />
        <button onClick={() => window.print()} style={toolBtn}><Icon name="download" size={15} color="#fff" /> Print / PDF</button>
        <button onClick={onClose} style={{ ...toolBtn, background: "rgba(255,255,255,0.10)" }}><Icon name="x" size={15} color="#fff" /> Close</button>
      </div>
      <div className="pw-doc-scroll" onClick={onClose} style={{ flex: 1, overflow: "auto", padding: "32px 20px 64px" }}>
        <div onClick={(e) => e.stopPropagation()}>
          <Body blank={doc.blank} paid={doc.paid} meta={doc.meta} />
        </div>
      </div>
    </div>
  );
}
