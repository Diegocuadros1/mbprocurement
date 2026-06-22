import type { Metadata } from "next";
import { CtaBand } from "@/components/site/sections";

export const metadata: Metadata = {
  title: "FAQ — ProcureWide",
  description:
    "Answers about ProcureWide: is it software or a service, how pricing works, whether there is a contract, and how to get started with an example order.",
};

const FAQS = [
  {
    q: "Is ProcureWide software I log into, or a service?",
    a: "Both. ProcureWide is a managed service backed by an ordering platform. You request items in the dashboard; our team sources, negotiates, and places the orders on your behalf — and you approve every one.",
  },
  {
    q: "Do you mark up orders or take vendor kickbacks?",
    a: "No. You see the real vendor price on every line. We make money on a transparent service fee — never on hidden markups or upselling. No hidden fees, no surprises.",
  },
  {
    q: "How do you get better pricing than ordering ourselves?",
    a: "We aggregate demand across our customer base and negotiate volume tiers with 100+ vendors — adding around ten more every month. You get pricing usually reserved for far larger labs.",
  },
  {
    q: "What does it cost, and is there a contract?",
    a: "A flat, transparent service fee — no subscription tiers and no per-order surprises. You establish a line of credit through a security deposit, and you can cancel anytime.",
  },
  {
    q: "How do we get started?",
    a: "Submit an example order. We return a line-by-line price comparison so you can see the savings before signing anything.",
  },
];

export default function FaqPage() {
  return (
    <>
      <section className="page-hero center">
        <div className="wrap">
          <span className="eyebrow">Got questions?</span>
          <h1>Transparent and simple.</h1>
          <p className="lead">
            The short answers. If yours isn’t here, email{" "}
            <a href="mailto:hello@procurewide.com" style={{ color: "var(--accent-700)", fontWeight: 600 }}>
              hello@procurewide.com
            </a>
            .
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 36 }}>
        <div className="wrap">
          <div className="faq-grid reveal">
            {FAQS.map((f, i) => (
              <div className={"faq-item" + (i === 0 ? " open" : "")} key={f.q}>
                <button className="faq-q" aria-expanded={i === 0}>
                  <span className="faq-ix">{String(i + 1).padStart(2, "0")}</span>
                  <span className="faq-qt">{f.q}</span>
                  <span className="faq-tog" aria-hidden="true" />
                </button>
                <div className="faq-a">
                  <div className="inner">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
