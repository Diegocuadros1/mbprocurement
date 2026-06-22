import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, IconFlask, IconBuilding, IconOS } from "@/components/site/icons";
import { CtaBand, Quote } from "@/components/site/sections";

export const metadata: Metadata = {
  title: "About & Prodigy Labs partnership — ProcureWide",
  description:
    "ProcureWide is built by the operators behind Prodigy Labs — a San Diego research lab, biotech incubator, and Laboratory OS dedicated to lowering the barriers to rigorous science.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Created by scientists, to support science</span>
          <h1>In partnership with Prodigy Labs.</h1>
          <p className="lead">
            ProcureWide grew out of the same operators behind Prodigy Labs. We bring their operational muscle — and their
            belief that scientists should spend their time on science — to your purchasing.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Who Prodigy Labs is</span>
            <h2 className="section-title">A research lab, an incubator, and the software that runs both.</h2>
            <p className="lead">
              Prodigy Labs is a San Diego research organization on a mission to remove the barriers that slow good
              science down. It brings together a working analytical laboratory, a biotech incubator, and a unified
              software platform — so a founder can walk in with an idea and walk out with bench space, instruments,
              testing, and the systems to run an experiment on day one, not in year two.
            </p>
          </div>
          <div className="pillars">
            <div className="pillar is-static reveal">
              <span className="pi">
                <IconFlask />
              </span>
              <h3>Analytical testing</h3>
              <p>
                An accreditation-track analytical lab offering peptide identity and purity, metabolomics, microplastics
                analysis, and pesticide, mycotoxin, and residual-solvent screening — rigorous data founders can stand
                behind.
              </p>
            </div>
            <div className="pillar is-static reveal d1">
              <span className="pi">
                <IconBuilding />
              </span>
              <h3>A biotech incubator</h3>
              <p>
                Flexible lab and office space plus an operator network, so early teams get the room and the guidance to
                build without signing a decade-long lease or raising a megaround first.
              </p>
            </div>
            <div className="pillar is-static reveal d2">
              <span className="pi">
                <IconOS />
              </span>
              <h3>A Laboratory OS</h3>
              <p>
                Software that unifies the electronic notebook, inventory, sample tracking, data, and procurement in one
                place — the operating system Prodigy runs its own lab on.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section prodigy">
        <div className="wrap">
          <div className="prodigy-card reveal">
            <div className="ph">
              <span className="eyebrow">Where ProcureWide fits</span>
              <h2 className="section-title" style={{ fontSize: "clamp(1.6rem,2.8vw,2.2rem)" }}>
                The procurement layer of that ecosystem.
              </h2>
              <p className="lead" style={{ fontSize: "16.5px" }}>
                Buying is one of the quiet time-sinks that pulls scientists off the bench. ProcureWide is the part of the
                Prodigy stack that takes it off your plate — the same operators, the same standard of care, now pointed
                at sourcing, negotiating, and placing every order. And it works for any lab, whether or not you ever set
                foot in a Prodigy space.
              </p>
              <div style={{ marginTop: 8 }}>
                <Link className="btn btn-secondary" href="/submit-order">
                  Submit an example order <ArrowRight />
                </Link>
              </div>
            </div>
            <div className="pimg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pw/team.jpg" width={600} height={450} alt="Scientists collaborating in a lab" loading="lazy" />
            </div>
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
