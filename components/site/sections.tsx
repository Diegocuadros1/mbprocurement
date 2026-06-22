import Link from "next/link";
import { ArrowRight, VENDOR_LOGOS } from "./icons";

export function CtaBand() {
  return (
    <section className="section cta">
      <div className="wrap">
        <div className="inner reveal">
          <h2>See what we&apos;d save you.</h2>
          <p>
            Send us a real order. We&apos;ll come back with a line-by-line price comparison — no commitment, no sales
            pressure.
          </p>
          <div className="cta-btns">
            <Link className="btn btn-on-dark btn-lg" href="/submit-order">
              Submit an example order <ArrowRight />
            </Link>
            <a className="btn btn-ghost-dark btn-lg" href="mailto:hello@procurewide.com?subject=Intro%20call">
              Book an intro call
            </a>
          </div>
          <p className="micro">Transparent pricing · No subscription fees · Cancel anytime</p>
        </div>
      </div>
    </section>
  );
}

export function VendorCloud({ caption }: { caption: React.ReactNode }) {
  return (
    <section className="vendors" id="vendors">
      <div className="wrap">
        <p className="cap reveal">{caption}</p>
        <div className="logo-grid reveal d1">
          {VENDOR_LOGOS.map((v) => (
            <span className="cell" key={v.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.src} alt={v.alt} loading="lazy" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Quote() {
  return (
    <div className="quote-wrap reveal">
      <div className="mark" aria-hidden="true">
        &ldquo;
      </div>
      <blockquote>
        With only so many hours in the day, every hour on a low-value task was an hour lost from building the future.
        ProcureWide gave those hours back to the science.
      </blockquote>
      <div className="quote-author">
        <span className="av" aria-hidden="true">
          RK
        </span>
        <span className="who">
          <span className="nm">Dr. Riya Kapoor</span>
          <span className="rl">Founder &amp; CEO, early-stage biotech</span>
        </span>
      </div>
    </div>
  );
}
