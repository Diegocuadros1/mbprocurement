import type { Metadata } from "next";
import { Check } from "@/components/site/icons";
import { CtaBand } from "@/components/site/sections";

export const metadata: Metadata = {
  title: "How it works — ProcureWide",
  description:
    "How ProcureWide works: submit your list, we compare it across 100+ vendors, you approve every order, and we place and track it — then bill once a month.",
};

const FEATURES = [
  {
    flip: false,
    eyebrow: "Best price, every line",
    h: "See every vendor’s price, side by side.",
    p: "Submit your list and we compare it across the network — price and lead time on each item, with the best pick flagged. You never overpay because you didn’t have time to shop around.",
    points: [
      "Sort by price, lead time, or what matters most for the order",
      "Volume tiers applied automatically across your spend",
    ],
    img: "/pw/product-catalog.png",
    alt: "Order catalog comparing items across vendors with price, savings, and lead time",
  },
  {
    flip: true,
    eyebrow: "You stay in control",
    h: "You approve every order. We never upsell.",
    p: "Nothing ships without your sign-off. Set what matters most for the order — lead time, price, or stocking up ahead of need — and we order exactly that. No substitutions you didn’t ask for.",
    points: [
      "Tell us your priority on every order, in your words",
      "Real vendor prices — the service fee is the only thing we add",
    ],
    img: "/pw/product-cart.png",
    alt: "Cart and order summary with urgency, an order-priority question, and volume discounts",
  },
  {
    flip: false,
    eyebrow: "A clean paper trail",
    h: "Track every order, document, and dollar.",
    p: "Live status on everything in transit, full spend history by vendor and category, and the receipts pulled on your behalf. When finance or your board asks, the answer is one screen away.",
    points: ["One monthly bill, itemized — no surprise invoices", "Spend reports ready for finance and diligence"],
    img: "/pw/product-orders.png",
    alt: "Order history with all-time spend, savings versus list, and per-order tracking status",
  },
];

const STEPS = [
  { n: "01", h: "Enroll", p: "Submit an example order. We return a line-by-line price comparison — see the savings first.", d: "" },
  { n: "02", h: "Onboard", p: "Sign, set up a line of credit through a security deposit, and tell us your vendors and standing items.", d: "d1" },
  { n: "03", h: "Request", p: "Request items in the dashboard or hand us a list. Set the priority for each order.", d: "d2" },
  { n: "04", h: "We order", p: "We source, negotiate, and place every order you approve, then track it to your door.", d: "d3" },
  { n: "05", h: "We bill", p: "One transparent invoice each month, with receipts and a full spend report attached.", d: "d3" },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">The platform</span>
          <h1>The work, not just the words.</h1>
          <p className="lead">
            Every order lives in one place. You see the real prices, approve what ships, and keep a clean paper trail —
            without chasing a single vendor.
          </p>
        </div>
      </section>

      <section className="section showcase">
        <div className="wrap">
          {FEATURES.map((f) => (
            <div className={"feature reveal" + (f.flip ? " flip" : "")} key={f.eyebrow}>
              <div className="feature-text">
                <span className="eyebrow">{f.eyebrow}</span>
                <h3>{f.h}</h3>
                <p>{f.p}</p>
                <div className="points">
                  {f.points.map((pt) => (
                    <div className="point" key={pt}>
                      <Check /> {pt}
                    </div>
                  ))}
                </div>
              </div>
              <div className="feature-art">
                <div className="frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.img} width={914} height={530} alt={f.alt} loading="lazy" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section process" id="process">
        <div className="wrap">
          <div className="section-head center reveal">
            <span className="eyebrow">Five steps</span>
            <h2 className="section-title">We are your procurement co-pilot.</h2>
            <p className="lead">From your first example order to a procurement function that runs itself.</p>
          </div>
          <div className="steps">
            {STEPS.map((s) => (
              <div className={"step reveal" + (s.d ? " " + s.d : "")} key={s.n}>
                <div className="num">{s.n}</div>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
