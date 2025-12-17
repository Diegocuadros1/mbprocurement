"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Users, Wallet, Package, FileCheck, Clock } from "lucide-react";

const whyChooseUs = [
  {
    icon: Shield,
    title: "Total Control",
    description:
      "You maintain complete control of your procurement. We only order what you request.",
  },
  {
    icon: Users,
    title: "We Work For You",
    description:
      "Our team is dedicated to supporting your business goals and saving you time.",
  },
  {
    icon: Wallet,
    title: "Cost Savings",
    description:
      "Our collective buying power drives major cost savings for your business.",
  },
  {
    icon: Package,
    title: "Exactly What You Need",
    description:
      "We order only what you want—no upselling, no unnecessary additions.",
  },
];

const howWeSupport = [
  {
    icon: Clock,
    title: "You Request, We Order",
    description:
      "Focus on critical science while we handle all procurement logistics.",
  },
  {
    icon: Package,
    title: "Smooth Supply Chain",
    description:
      "We reduce and eliminate backorders, ensuring smooth operations.",
  },
  {
    icon: Wallet,
    title: "Negotiation Power",
    description:
      "We use our expertise to drive major cost savings on every order.",
  },
  {
    icon: FileCheck,
    title: "Accurate Documentation",
    description:
      "Ensure accounting and regulatory documents are always accessible.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  accent = false,
}: {
  icon: typeof Shield;
  title: string;
  description: string;
  accent?: boolean;
}) => (
  <motion.div
    variants={itemVariants}
    className={`group relative p-6 rounded-2xl transition-all duration-300 ${
      accent
        ? "bg-accent text-accent-foreground hover:shadow-glow"
        : "bg-card hover:bg-secondary border border-border hover:border-accent/30"
    }`}
  >
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
        accent ? "bg-accent-foreground/20" : "bg-accent/10"
      }`}
    >
      <Icon
        className={`w-6 h-6 ${
          accent ? "text-accent-foreground" : "text-accent"
        }`}
      />
    </div>
    <h3
      className={`text-lg font-semibold mb-2 ${
        accent ? "text-accent-foreground" : "text-foreground"
      }`}
    >
      {title}
    </h3>
    <p
      className={`text-sm ${
        accent ? "text-accent-foreground/80" : "text-muted-foreground"
      }`}
    >
      {description}
    </p>
  </motion.div>
);

export const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 lg:py-32 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent pointer-events-none" />

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
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Why Mission Booster?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Procurement That Works <span className="text-accent">For You</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We save your money, save your time, and help you get more done.
            Focus on what matters while we handle the rest.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Why Founders Choose Us */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl font-semibold text-foreground mb-8 flex items-center gap-3"
            >
              <span className="w-10 h-1 bg-accent rounded-full" />
              Why Founders Choose Us
            </motion.h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid sm:grid-cols-2 gap-4"
            >
              {whyChooseUs.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  {...feature}
                  accent={index === 0}
                />
              ))}
            </motion.div>
          </div>

          {/* How We Support You */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl font-semibold text-foreground mb-8 flex items-center gap-3"
            >
              <span className="w-10 h-1 bg-accent rounded-full" />
              How We Support You
            </motion.h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid sm:grid-cols-2 gap-4"
            >
              {howWeSupport.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
