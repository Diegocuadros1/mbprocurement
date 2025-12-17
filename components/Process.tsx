"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  FileText,
  CreditCard,
  Users,
  ShoppingCart,
  ClipboardCheck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Enroll",
    description: "Enroll in the system with a simple contract.",
  },
  {
    number: "02",
    icon: CreditCard,
    title: "Security Deposit",
    description: "Establish a line of credit through a security deposit.",
  },
  {
    number: "03",
    icon: Users,
    title: "Onboarding",
    description:
      "We set you up in our system and have an onboarding call to walk you, and your team, through the process of requesting items.",
  },
  {
    number: "04",
    icon: ShoppingCart,
    title: "We Order",
    description: "We order the product(s) from your requested vendor(s).",
  },
  {
    number: "05",
    icon: ClipboardCheck,
    title: "Track & Document",
    description:
      "We update the form with the order number, date it was ordered and final pricing, as well as any regulatory/safety documentation. You can view this form at any time.",
  },
];

const faqs = [
  {
    question: "How does the billing process work?",
    answer:
      'Each month, you will receive an itemized invoice with all of the bill backs and receipts attached. All receipts are specifically for your company and will only include items purchased for your company (no absurd "redacted" receipts).',
  },
  {
    question: "What is the purpose of the security deposit?",
    answer:
      "To ensure the lowest possible cost and fastest onboarding timelines, we use the security deposit to establish a line of credit for your company to order against. We will order up to that amount on your behalf without an invoice to you. The security deposit is returned after you terminate the contract, assuming all outstanding invoices are paid.",
  },
  {
    question: "What is the timeline for placing orders?",
    answer:
      "Most orders will go in same day there is a request. Since we have more than 150 vendors, and each has their own cutoff time, there may be a delay of one day if orders are received close to a vendor's cutoff time.",
  },
  {
    question: "How do you manage backorders?",
    answer:
      "When an item is backordered, we will immediately notify you of the projected timeline for approval. If the delay is unacceptable, we will attempt to find the exact same item with another vendor. We will not substitute an item or vendor without your explicit approval.",
  },
];

export const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="process"
      className="py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary-foreground))_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        ref={ref}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
            Transparent and Simple
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            We are your <span className="text-accent">"Co-Pilot"</span>
          </h2>
          <p className="text-lg text-primary-foreground/70">
            A step-by-step process that's transparent, simple, and designed to
            save you time and money.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Connector line (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+1.5rem)] w-[calc(100%-1.5rem)] h-0.5 bg-gradient-to-r from-accent/50 to-accent/10" />
                )}

                <div className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-5 hover:bg-primary-foreground/10 transition-all duration-300 group-hover:scale-105 h-full">
                  {/* Number badge */}
                  <div className="absolute -top-3 left-5 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-3 group-hover:bg-accent/30 transition-colors">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-primary-foreground/60">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-center mb-10">
            Common Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-5"
              >
                <h4 className="font-semibold text-accent mb-2">
                  {faq.question}
                </h4>
                <p className="text-sm text-primary-foreground/70">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
