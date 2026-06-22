import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, IconTag, IconShieldCheck, IconDoc } from "@/components/site/icons";
import { CtaBand, VendorCloud, Quote } from "@/components/site/sections";

export const metadata: Metadata = {
  title: "ProcureWide — Procurement that runs on your behalf, for life-sciences labs",
  description:
    "ProcureWide is an independent procurement service for early-stage biotech. We compare 100+ vendors, place every order you approve, track documentation, and bill once a month — so your scientists stay at the bench.",
};

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="pill">
              <span className="tag">New</span> Procurement-as-a-service for life sciences
            </span>
            <h1 className="display">
              Procurement that runs on your behalf —<br />
              <span className="accent">never against you.</span>
            </h1>
            <p className="lead">
              ProcureWide is an independent service that absorbs vendor sourcing, price negotiation, and documentation —
              so your scientists stay at the bench. We compare 100+ vendors, place every order you approve, and bill
              once a month. No markups. No upselling.
            </p>
            <div className="hero-cta">
              <Link className="btn btn-primary btn-lg" href="/submit-order">
                Submit an example order <ArrowRight />
              </Link>
              <Link className="btn btn-secondary btn-lg" href="/how-it-works">
                See how it works
              </Link>
            </div>
            <div className="trust">
              <span className="label">Built by</span>
              <span className="items">
                <span>the team behind Prodigy Labs</span>
                <span className="sep">·</span>
                <span>100+ vendors in the network</span>
                <span className="sep">·</span>
                <span>No markups, ever</span>
              </span>
            </div>
          </div>

          <div className="hero-art reveal d1">
            <div className="frame">
              <div className="frame-bar">
                <span className="d" />
                <span className="d" />
                <span className="d" />
                <span className="url">app.procurewide.com</span>
              </div>
              <div className="hero-demo" id="heroDemo">
                <div className="hd-stage">
                  <span className="hd-badge">
                    <span className="live" /> Product tour
                  </span>
                  {[
                    { src: "/pw/product-catalog.png", ix: "01", cap: "Search & compare 100+ vendors, side by side", active: true },
                    { src: "/pw/product-cart.png", ix: "02", cap: "Set your priority — we order exactly that" },
                    { src: "/pw/product-orders.png", ix: "03", cap: "Track every order to your door" },
                    { src: "/pw/product-dashboard.png", ix: "04", cap: "See spend, savings & reorders at a glance" },
                  ].map((s) => (
                    <div className={"hd-scene" + (s.active ? " active" : "")} key={s.ix}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.src} width={914} height={530} alt={s.cap} loading={s.active ? "eager" : "lazy"} />
                      <span className="hd-cap">
                        <span className="ix">{s.ix}</span> {s.cap}
                      </span>
                    </div>
                  ))}
                  <div className="hd-bar" aria-hidden="true">
                    {[0, 1, 2, 3].map((i) => (
                      <span className={"hd-seg" + (i === 0 ? " active" : "")} key={i}>
                        <span className="hd-seg-fill" />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VendorCloud
        caption={
          <>
            One relationship, <strong>100+ vendors</strong> — and we add around ten every month
          </>
        }
      />

      <section className="section">
        <div className="wrap">
          <div className="section-head center reveal">
            <span className="eyebrow">What we do</span>
            <h2 className="section-title">The work, not just the words.</h2>
            <p className="lead">
              Every order lives in one place. You see the real prices, approve what ships, and keep a clean paper trail —
              without chasing a single vendor.
            </p>
          </div>
          <div className="pillars">
            <Link className="pillar reveal" href="/how-it-works">
              <span className="pi">
                <IconTag />
              </span>
              <h3>Best price, every line</h3>
              <p>
                Submit your list and we compare it across the network — price and lead time on each item, with the best
                pick flagged.
              </p>
              <span className="more">
                See the comparison <ArrowRight />
              </span>
            </Link>
            <Link className="pillar reveal d1" href="/how-it-works">
              <span className="pi">
                <IconShieldCheck />
              </span>
              <h3>You stay in control</h3>
              <p>
                Nothing ships without your sign-off. Tell us what matters most for each order and we order exactly that —
                no upsell.
              </p>
              <span className="more">
                How approvals work <ArrowRight />
              </span>
            </Link>
            <Link className="pillar reveal d2" href="/how-it-works">
              <span className="pi">
                <IconDoc />
              </span>
              <h3>A clean paper trail</h3>
              <p>
                Live status on everything in transit, spend history by vendor and category, and one itemized bill each
                month.
              </p>
              <span className="more">
                See the dashboard <ArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Quote />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
