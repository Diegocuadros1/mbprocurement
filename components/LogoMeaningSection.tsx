"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/* ── notebook ruled-line background ──────────────────────────────── */
const NotebookLines = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    {Array.from({ length: 40 }).map((_, i) => (
      <line
        key={i}
        x1="0"
        y1={`${(i + 1) * 32}px`}
        x2="100%"
        y2={`${(i + 1) * 32}px`}
        stroke="hsl(220 40% 88%)"
        strokeWidth="1"
      />
    ))}
    <line x1="60" y1="0" x2="60" y2="100%" stroke="hsl(0 60% 88%)" strokeWidth="1.5" />
  </svg>
);

/* ── card data ────────────────────────────────────────────────────── */
const items = [
  {
    label: "The Double Helix",
    image: { src: "/double-helix.png", width: 120, height: 120 },
    imageClass: "",
    rotate: false,
    text: "Mimics a double helix in its form. This is widely known to represent biotechnology, science, and innovation; serving as a visual metaphor for the genetic blueprint of life.",
  },
  {
    label: "Directional Arrows",
    image: { src: "/arrow.png", width: 120, height: 120 },
    imageClass: "",
    rotate: false,
    text: "Arrows symbolize direction and progress, guiding the viewer's eye to convey a sense of action. We want them to represent our end-to-end process of procurement. We take action to help our clients grow and thrive in their industry, and keep them on track.",
  },
  {
    label: 'The "W" in Wide',
    image: { src: "/procurewide-logo.png", width: 120, height: 120 },
    imageClass: "",
    rotate: true,
    text: 'Once rotated, the logo icon looks very similar to the "W" in "wide." We want this to represent that our procurement is for a wide network of people. It brings endless possibilities.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const LogoMeaningSection = () => {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-[hsl(220_30%_98%)]">
      {/* notebook ruled lines */}
      <div className="absolute inset-0 opacity-40">
        <NotebookLines />
      </div>

      {/* soft accent glows */}
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-accent/8 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* heading row */}
        <div className="flex items-start justify-between gap-6 mb-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wide uppercase mb-4">
              Brand Identity
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              The Meaning Behind Our Logo
            </h2>
          </motion.div>

          {/* sticky-note sketch — desktop only */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="hidden md:flex shrink-0 flex-col items-center gap-1.5 bg-yellow-50 border border-yellow-200 shadow-md rounded-sm p-3 w-30"
            style={{ transform: "rotate(45deg)" }}
          >
            <Image
              src="/logo-drawing.png"
              alt="Original logo sketch"
              width={88}
              height={88}
              className="object-contain w-20 h-20"
            />
          </motion.div>
        </div>

        {/* 3-column horizontal card row */}
        <div className="flex flex-row gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="group relative rounded-2xl border border-slate-200 bg-white shadow-sm p-6 flex flex-col items-center text-center hover:border-accent/40 hover:shadow-md transition-all"
            >
              {/* top accent line */}
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-accent/50 via-accent/10 to-transparent rounded-t-2xl" />

              {/* image */}
              <div
                className="mb-5 flex items-center justify-center h-28 w-28"
                style={item.rotate ? { transform: "rotate(-60deg)" } : undefined}
              >
                <Image
                  src={item.image.src}
                  alt={item.label}
                  width={item.image.width}
                  height={item.image.height}
                  className="object-contain h-full w-full"
                />
              </div>
              {/* label */}
              <span className="text-xs font-semibold text-accent tracking-widest uppercase mb-3">
                {item.label}
              </span>

              {/* divider */}
              <div className="w-8 h-px bg-slate-200 mb-4" />

              {/* text */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
