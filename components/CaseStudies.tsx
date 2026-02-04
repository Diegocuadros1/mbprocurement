"use client";
import { motion } from "framer-motion";
import { TrendingUp, Clock, DollarSign } from "lucide-react";

const caseStudies = [
  {
    title: "Two Co-Founder, Pre-Seed Startup",
    period: "1 year of procurement",
    orders: "137 orders",
    deliveredCost: "$156,874.88",
    listCost: "$225,608.03",
    highlight: "6 months of extra runway",
    savings: "68,733.15",
    hoursSaved: "70 hours",
  },
  {
    title: "Large, Post Revenue Company",
    period: "1 Year of ~$100,000/month purchasing",
    orders: "~1,600 Orders",
    deliveredCost: "$927,122.83",
    listCost: "$1,293,241.12",
    highlight:
      "Elimination of 5 FTE purchasing agents (~ $800,000 annual salary and benefits)",
    savings: "1,166,118.29",
    // hoursSaved: "~$800,000 annual savings",
  },
];

export const CaseStudies = () => {
  return (
    <section className="py-20 lg:py-32 bg-card" id="case-studies">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Real Results
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Discover Real Success Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore how founders achieved significant savings and efficiency
            gains with ProcureWide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-background rounded-2xl border border-border p-8 hover:border-accent/50 transition-colors group"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {study.title}
                </h3>
                <p className="text-muted-foreground">{study.period}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-card rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Orders</p>
                  <p className="text-lg font-semibold text-foreground">
                    {study.orders}
                  </p>
                </div>
                <div className="p-4 bg-card rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">
                    Delivered Cost
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {study.deliveredCost}
                  </p>
                </div>
                <div className="p-4 bg-card rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">
                    List Cost
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {study.listCost}
                  </p>
                </div>
                <div className="p-4 bg-accent/10 rounded-xl">
                  <p className="text-sm text-accent mb-1">Highlight</p>
                  <p className="text-sm font-semibold text-foreground">
                    {study.highlight}
                  </p>
                </div>
              </div>

              <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
                <p className="text-sm text-muted-foreground mb-2">
                  Purchase Program Savings
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-accent" />
                    <span className="text-xl font-bold text-accent">
                      {study.savings}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {study.hoursSaved ? (
                      <Clock className="w-5 h-5 text-primary" />
                    ) : (
                      ""
                    )}
                    <span className="text-lg font-semibold text-foreground">
                      {study.hoursSaved}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 rounded-full">
            <TrendingUp className="w-5 h-5 text-accent" />
            <span className="text-foreground font-medium">
              Join our growing list of successful founders
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
