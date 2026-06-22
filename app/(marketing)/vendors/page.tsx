import type { Metadata } from "next";
import { Check, IconChart, IconTag, IconDollar } from "@/components/site/icons";
import { CtaBand, VendorCloud } from "@/components/site/sections";

export const metadata: Metadata = {
  title: "Vendor network — ProcureWide",
  description:
    "One relationship, 100+ life-sciences vendors. ProcureWide aggregates demand and negotiates volume tiers, then passes the real vendor price through to you — no markups.",
};

export default function VendorsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">The network</span>
          <h1>One relationship. 100+ vendors.</h1>
          <p className="lead">
            We maintain the accounts, negotiate the pricing, and place the orders across the entire life-sciences supply
            chain — and we add around ten new vendors every month.
          </p>
        </div>
      </section>

      <VendorCloud caption="Trusted suppliers already in the network" />

      <section className="section">
        <div className="wrap">
          <div className="section-head center reveal">
            <span className="eyebrow">Why our pricing beats ordering yourself</span>
            <h2 className="section-title">Buying power you couldn’t build alone.</h2>
            <p className="lead">
              A single early-stage lab doesn’t order enough to earn volume pricing. Pooled across our customers, you do.
            </p>
          </div>
          <div className="pillars">
            <div className="pillar is-static reveal">
              <span className="pi">
                <IconChart />
              </span>
              <h3>We aggregate demand</h3>
              <p>
                Every order across our customer base counts toward the same vendor relationships, so small labs reach
                tiers normally reserved for large ones.
              </p>
            </div>
            <div className="pillar is-static reveal d1">
              <span className="pi">
                <IconTag />
              </span>
              <h3>We negotiate the tiers</h3>
              <p>
                We hold the accounts and negotiate volume pricing and rebates with 100+ vendors — and apply them
                automatically to your orders.
              </p>
            </div>
            <div className="pillar is-static reveal d2">
              <span className="pi">
                <IconDollar />
              </span>
              <h3>You see the real price</h3>
              <p>
                The negotiated vendor price is what you pay — line by line. Our flat service fee is the only thing we
                add. No markups, ever.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section showcase" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="feature reveal">
            <div className="feature-text">
              <span className="eyebrow">Price comparison</span>
              <h3>Every vendor’s price on one screen.</h3>
              <p>
                Submit a list and we line it up across the network — price and lead time per item, with the best pick
                flagged and volume tiers already applied.
              </p>
              <div className="points">
                <div className="point">
                  <Check /> Best price highlighted on every line
                </div>
                <div className="point">
                  <Check /> Sort by price, lead time, or order priority
                </div>
              </div>
            </div>
            <div className="feature-art">
              <div className="frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/pw/product-catalog.png"
                  width={914}
                  height={530}
                  alt="Order catalog comparing items across vendors with price and lead time"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
