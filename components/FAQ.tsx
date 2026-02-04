"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

const faqs = [
  {
    question: "Will I lose control?",
    answer:
      "No, you maintain full control. We only order what you request, when you request it, ensuring your preferences and needs are met without compromise. If we notice alternative options that would result in reduced cost or faster deliveries, we will bring that to your attention, but only you get to choose what is ordered and from what vendor.",
  },
  {
    question: "Are there hidden fees?",
    answer:
      'No, ProcureWide operates on a transparent pricing model. We add a small administration fee, typically 5%-10% on the pricing of what we order, so you can budget effectively without unexpected costs. We don\'t have "subscription fees" or "licensing fees" that add costs regardless of whether you use the program or not. If you don\'t order things, then there are no ongoing fees.',
  },
  {
    question: "Does this protect my vendor discounts?",
    answer:
      "Absolutely! Your existing vendor relationships remain intact, and you can continue to enjoy any discounts you have negotiated.",
  },
  {
    question: "What if something goes wrong?",
    answer:
      "If any issues arise, ProcureWide will resolve them quickly and efficiently, providing you with timely status updates throughout the process.",
  },
  {
    question: "What if I need to change my order?",
    answer:
      "You can easily modify your order before it is processed. Just reach out to our support team, and they will assist you in making the necessary adjustments without any hassle.",
  },
];

export const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent pointer-events-none" />

      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        ref={ref}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Frequently Asked <span className="text-accent">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Everything you need to know about our procurement services. Can't
              find what you're looking for? Feel free to reach out.
            </p>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 shadow-elevated">
              <Image
                src="/FAQ.png"
                alt="Team collaboration and support"
                width={600}
                height={450}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-primary-foreground text-sm font-medium">
                  Our team is here to help!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-soft transition-shadow"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:text-accent transition-colors py-5 [&[data-state=open]]:text-accent">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
