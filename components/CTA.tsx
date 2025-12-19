"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-secondary/30" />

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        ref={ref}
      >
        <div className="bg-primary rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Inner decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-2xl -translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                Ready to Take Control of Your{" "}
                <span className="text-accent">Procurement?</span>
              </h2>
              <p className="text-lg text-primary-foreground/70 mb-8">
                Our team is here to help you streamline your procurement process
                and answer any questions you may have. Don't hesitate to reach
                out!
              </p>

              {/* Contact info */}
              {/* <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary-foreground/80">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <span>contact@missionbooster.com</span>
                </div>
                <div className="flex items-center gap-3 text-primary-foreground/80">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <span>Schedule a call</span>
                </div>
              </div> */}
            </motion.div>

            {/* Right - CTA Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-2xl p-8 shadow-elevated"
            >
              <h3 className="text-xl font-semibold text-foreground mb-2">
                You Are In Control
              </h3>
              <p className="text-muted-foreground mb-6">
                Enroll in our program and start saving today. No commitments, no
                hidden fees.
              </p>

              <div className="space-y-4">
                <Link href="/contact">
                  <Button
                    variant="hero"
                    size="xl"
                    className="w-full cursor-pointer"
                  >
                    Join Us Today
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                {/* <Button variant="outline" size="lg" className="w-full">
                  Submit a Request
                </Button> */}
              </div>

              <p className="text-xs text-muted-foreground text-center mt-6">
                Transparent pricing • No subscription fees • Cancel anytime
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
