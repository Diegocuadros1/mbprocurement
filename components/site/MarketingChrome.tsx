"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/vendors", label: "Vendors" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

/**
 * Public marketing chrome: utility strip + sticky nav + footer, with the
 * progressive-enhancement behaviours ported from the design's app.js
 * (sticky-nav shadow, FAQ accordion, hero autoplay, scroll reveals).
 */
export default function MarketingChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.add("js");

    // Sticky nav shadow on scroll
    const nav = document.querySelector(".nav");
    const onScroll = () => nav && nav.classList.toggle("scrolled", window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // FAQ accordion (single-open)
    const faqs = Array.from(document.querySelectorAll<HTMLElement>(".faq-item"));
    const faqHandlers: Array<[HTMLElement, () => void]> = [];
    faqs.forEach((item) => {
      const btn = item.querySelector<HTMLButtonElement>(".faq-q");
      if (!btn) return;
      const handler = () => {
        const isOpen = item.classList.contains("open");
        faqs.forEach((f) => {
          f.classList.remove("open");
          f.querySelector(".faq-q")?.setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("open");
          btn.setAttribute("aria-expanded", "true");
        }
      };
      btn.addEventListener("click", handler);
      faqHandlers.push([btn, handler]);
    });

    // Hero product walkthrough (autoplay slideshow)
    const demo = document.getElementById("heroDemo");
    let timer: ReturnType<typeof setInterval> | null = null;
    if (demo) {
      const scenes = Array.from(demo.querySelectorAll<HTMLElement>(".hd-scene"));
      const segs = Array.from(demo.querySelectorAll<HTMLElement>(".hd-seg"));
      const DUR = 3600;
      let idx = 0;
      const reduceMo = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const setFill = (fill: HTMLElement | null, w: string, ms?: number) => {
        if (!fill) return;
        fill.style.transition = "none";
        fill.style.width = w;
        if (ms) {
          void fill.offsetWidth;
          fill.style.transition = "width " + ms + "ms linear";
          fill.style.width = "100%";
        }
      };
      const paint = (n: number) => {
        scenes.forEach((s, k) => s.classList.toggle("active", k === n));
        segs.forEach((s, k) => {
          s.classList.toggle("done", k < n);
          s.classList.toggle("active", k === n);
          const fill = s.querySelector<HTMLElement>(".hd-seg-fill");
          if (k < n) setFill(fill, "100%");
          else if (k === n) setFill(fill, "0%", reduceMo ? 0 : DUR - 320);
          else setFill(fill, "0%");
        });
      };
      const advance = () => {
        idx = (idx + 1) % scenes.length;
        paint(idx);
      };
      if (!reduceMo) {
        paint(0);
        timer = setInterval(advance, DUR);
      } else {
        scenes.forEach((s, k) => s.classList.toggle("active", k === 0));
      }
    }

    // Scroll reveals
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    let io: IntersectionObserver | null = null;
    let failsafe: ReturnType<typeof setTimeout> | null = null;
    if ("IntersectionObserver" in window && reveals.length) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io!.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      reveals.forEach((el) => io!.observe(el));
      failsafe = setTimeout(() => {
        reveals.forEach((el) => !el.classList.contains("in") && el.classList.add("in"));
      }, 2500);
    } else {
      reveals.forEach((el) => el.classList.add("in"));
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      faqHandlers.forEach(([btn, handler]) => btn.removeEventListener("click", handler));
      if (timer) clearInterval(timer);
      if (io) io.disconnect();
      if (failsafe) clearTimeout(failsafe);
    };
  }, [pathname]);

  return (
    <div className="pw-site">
      <div className="utility">
        <div className="wrap">
          <span className="u-left">
            <span className="dot" /> Pre-launch · onboarding biotech teams now
          </span>
          <span className="u-right">
            <Link href="/about">Prodigy Labs</Link>
            <a href="mailto:hello@procurewide.com?subject=Contact%20sales">Contact sales</a>
          </span>
        </div>
      </div>

      <header className="nav" id="top">
        <div className="wrap">
          <Link className="brand" href="/" aria-label="ProcureWide home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/pw/logo.png" width={30} height={30} alt="" />
            <span>ProcureWide</span>
          </Link>
          <nav className="nav-links" aria-label="Primary">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} aria-current={pathname === n.href ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="nav-cta">
            <Link className="nav-login" href="/auth">
              Login
            </Link>
            <Link className="btn btn-primary" href="/submit-order">
              Submit an order <ArrowRight />
            </Link>
            <button
              className="nav-toggle"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
        <div className={"mobile-menu" + (menuOpen ? " open" : "")}>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={pathname === n.href ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
          <div className="mm-cta">
            <Link className="btn btn-primary btn-lg" href="/submit-order" style={{ width: "100%", justifyContent: "center" }}>
              Submit an order
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <Link className="brand" href="/">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/pw/logo.png" width={28} height={28} alt="" />
                <span>ProcureWide</span>
              </Link>
              <p className="blurb">
                An independent procurement service for early-stage life-sciences companies. We absorb the overhead of
                buying so your team can focus on the science.
              </p>
              <p className="tagline">Made by Scientists, for Science</p>
            </div>
            <div className="col">
              <h5>Platform</h5>
              <Link href="/how-it-works">How it works</Link>
              <Link href="/vendors">Vendor network</Link>
              <Link href="/submit-order">Submit an order</Link>
              <Link href="/auth">Ordering portal</Link>
            </div>
            <div className="col">
              <h5>Company</h5>
              <Link href="/about">About</Link>
              <Link href="/about">Prodigy Labs</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div className="col">
              <h5>Get in touch</h5>
              <a href="mailto:hello@procurewide.com">hello@procurewide.com</a>
              <Link href="/submit-order">Submit an example order</Link>
              <Link href="/auth">Login</Link>
            </div>
          </div>
          <div className="footer-base">
            <span>© 2026 ProcureWide. All rights reserved.</span>
            <span>No hidden fees · No subscription · Cancel anytime</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
