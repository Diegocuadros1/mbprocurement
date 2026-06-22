import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "@/components/site/icons";

export const metadata: Metadata = {
  title: "Contact us — ProcureWide",
  description:
    "Talk to the ProcureWide team before submitting a sample order. Email us, book an intro call, or send your questions — we reply fast.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero center">
        <div className="wrap">
          <span className="eyebrow">We&apos;d love to hear from you</span>
          <h1>Talk to a human first.</h1>
          <p className="lead">
            No bots, no phone tree. Tell us what your lab buys and what&apos;s slowing you down — we&apos;ll point you in
            the right direction, whether or not you&apos;re ready to submit an order.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 36 }}>
        <div className="wrap">
          <div className="pillars">
            <a className="pillar" href="mailto:hello@procurewide.com?subject=Question%20for%20ProcureWide">
              <span className="pi">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
              <h3>Email us</h3>
              <p>The fastest way to reach us. Send your questions or a list to talk through, and we&apos;ll reply quickly.</p>
              <span className="more">
                hello@procurewide.com <ArrowRight />
              </span>
            </a>
            <a
              className="pillar"
              href="mailto:hello@procurewide.com?subject=Book%20an%20intro%20call&body=Hi%20ProcureWide%20team%2C%20I%27d%20like%20to%20book%20an%20intro%20call.%20Here%20are%20a%20few%20times%20that%20work%20for%20me%3A"
            >
              <span className="pi">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </span>
              <h3>Book an intro call</h3>
              <p>Prefer to talk it through? Grab 20 minutes with us to see if ProcureWide is a fit for your lab.</p>
              <span className="more">
                Request a time <ArrowRight />
              </span>
            </a>
            <Link className="pillar" href="/about">
              <span className="pi">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l7 4v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V7z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </span>
              <h3>About ProcureWide</h3>
              <p>Want the background first? See who we are and how we partner with Prodigy Labs.</p>
              <span className="more">
                Read about us <ArrowRight />
              </span>
            </Link>
          </div>

          <div className="order-launch" style={{ marginTop: 24 }}>
            <div className="ol-card dark" style={{ gridColumn: "1 / -1" }}>
              <div className="ol-launch-inner">
                <span className="eyebrow" style={{ color: "var(--accent-500)" }}>
                  Ready when you are
                </span>
                <h2>Already know what you buy?</h2>
                <p>Skip the call and submit a sample order — we&apos;ll email back a line-by-line price comparison, no commitment.</p>
              </div>
              <div className="ol-launch-inner" style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link className="btn btn-on-dark btn-lg" href="/submit-order">
                  Get pricing — submit a sample order <ArrowRight />
                </Link>
                <Link className="btn btn-ghost-dark btn-lg" href="/auth">
                  Customer login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
