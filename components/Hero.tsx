"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const highlights = [
  "Total control of your procurement",
  "Major cost savings",
  "No hidden fees",
];

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-black text-white"
    >
      {/* Subtle grid background (monochrome) */}
      <div
        className="absolute inset-0
          bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]
          bg-[size:4rem_4rem]
          [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]
        "
      />

      {/* Soft monochrome haze (optional, replaces colored orbs) */}
      <div className="absolute -top-24 right-0 w-[38rem] h-[38rem] rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-32 left-0 w-[30rem] h-[30rem] rounded-full bg-white/4 blur-3xl" />

      {/* Rocket silhouette */}
      <Image
        src="/rocket.png"
        alt=""
        aria-hidden="true"
        width={500}
        height={500}
        priority
        className="pointer-events-none select-none absolute -left-[15rem] top-1/2 -translate-y-1/2 opacity-[0.30]"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.45 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full
                         bg-white/5 border border-white/10 text-white/80 text-sm font-medium mb-6"
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/10">
                🚀
              </span>
              <span className="tracking-tight">
                Created by a Scientist to Support Science
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 text-balance">
              Control, Savings <span className="text-white/60">&</span>{" "}
              <span className="relative inline-block">
                Peace of Mind
                {/* single “signal” accent stroke (swap to white if you want pure B/W) */}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C50 2 150 2 198 10"
                    stroke="hsl(var(--accent))"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="opacity-50"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-xl mx-auto lg:mx-0">
              Your company will need to buy stuff. We make that easy.
              Procurement made simple so you can focus on what matters.
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
              {highlights.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + index * 0.1, duration: 0.45 }}
                  className="flex items-center gap-2 text-sm text-white/70"
                >
                  <CheckCircle2 className="w-4 h-4 text-white/70" />
                  {item}
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="#process">
                <Button
                  size="xl"
                  className="bg-white text-black hover:bg-white/90 shadow-lg"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  size="xl"
                  variant="outline"
                  className="bg-transparent text-white border-white/20 hover:bg-white/5"
                >
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-white/15 animate-[spin_30s_linear_infinite]" />

              {/* Main image container */}
              <div className="absolute inset-4 rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/10">
                <Image
                  src="/hero.png"
                  alt="Professional business team collaborating"
                  width={900}
                  height={900}
                  priority
                  sizes="(max-width: 1024px) 90vw, 560px"
                  className="object-cover w-full h-full contrast-110 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              </div>

              {/* Floating pill */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 sm:right-0 rounded-2xl px-4 py-2 shadow-lg
                           bg-white text-black"
              >
                <p className="text-sm font-semibold">You are in Control</p>
              </motion.div>

              {/* Optional: small “deck” tag bottom-left (uncomment if you want) */}
              {/*
              <div className="absolute -bottom-4 -left-4 sm:left-0 rounded-2xl p-4 shadow-lg
                              bg-white/5 border border-white/10">
                <p className="text-sm text-white/60">Average Savings</p>
                <p className="text-xl font-bold text-white">15–25%</p>
              </div>
              */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
