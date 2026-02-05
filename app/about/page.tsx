"use client";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { Handshake, Users, Lightbulb, Heart } from "lucide-react";
import Image from "next/image";
import VenderGrid from "@/components/VenderGrid";
import Link from "next/link";

const values = [
  {
    icon: Handshake,
    title: "Strategic Partnership",
    description:
      "We move beyond transactional ordering. We are committed to your success, acting as a true partner in your scientific journey.",
  },
  {
    icon: Users,
    title: "Extension of Your Team",
    description:
      "We aren't just a vendor. We embed directly into your operations, acting as your dedicated procurement arm so you don't have to hire one.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Focused",
    description: "Freeing you to focus on breakthrough science and discovery.",
  },
  {
    icon: Heart,
    title: "Transparent Partnership",
    description: "No hidden fees, no surprises—just honest, reliable support.",
  },
];

const employees = [
  {
    name: "Ali Darwish",
    role: "Program Director",
    bio: "",
    tags: [],
    imageURL: "/ali_darwish.png",
    linkedIn: "https://www.linkedin.com/in/alidarwish1",
    email: "adarwish@mbprocurement.com",
    phone: "(512)-581-1996",
  },
  {
    name: "Diego Alcala",
    role: "Program Director",
    bio: "",
    tags: [],
    imageURL: "/diego_alcala.png",
    linkedIn: "https://www.linkedin.com/in/diego-alcala-416915297",
    email: "dalcala@mbprocurement.com",
    phone: "(562)-704-9157",
  },
];

const challenges = [
  {
    title: "Fragmented Spend",
    description:
      "Purchasing is scattered across multiple vendors, individual credit cards, and disjointed POs, making tracking impossible.",
  },
  {
    title: "Rush Orders & Costs",
    description:
      'Reactive ordering leads to constant "rush" fees and expensive expediting costs just to keep the lab running.',
  },
  {
    title: "Price Leakage",
    description:
      "Labs choose vendors ad hoc without negotiated rates, paying list prices and missing bulk discount opportunities.",
  },
  {
    title: "Inconsistent Quotes",
    description:
      "Equipment quotes are often inconsistent and under-negotiated, leaving significant capital savings on the table.",
  },
  {
    title: "Stockouts & Disruption",
    description:
      "Unexpected backorders and stockouts halt experiments, wasting valuable researcher time and samples.",
  },
  {
    title: "No Visibility",
    description:
      "Zero visibility into spend by category, project, or grant makes budgeting a guessing game.",
  },
];

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: 'url("/hero-about.jpg")' }}
        >
          <div className="absolute inset-0 bg-black opacity-60 z-10" />{" "}
          {/* Dark tint overlay */}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Created by Scientists,{" "}
              <span className="text-accent">to Support Science</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              At ProcureWide, we optimize the procurement process. You save
              money. You do more science. Your investors are thrilled.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                Our Purpose is Clear
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                <strong className="text-foreground">
                  Maximize your runway, Minimize your distractions, and give
                  every startup the tools to succeed.
                </strong>
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                ProcureWide is an independent procurements service. We help
                teams save on equipment + recurring supplies and absorb their
                procurement overhead. Our goal is to accelerate technologies
                that heal people and preserve the planet - because the two are
                inseparable. Let's be relentless in our pursuit of improvement.
                Only then can we achieve the version of the future we all want.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                With only so many hours in the day, every hour on a low-value
                task was an hour lost from building the future.
              </p>

              <div className="my-12 p-8 bg-primary/5 rounded-2xl border border-primary/10">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  We started with a simple goal: Empower Scientists to focus on
                  what truly matters
                </h3>
                <p className="text-muted-foreground text-lg">
                  The passionate pursuit of breakthrough science and execution
                  of their critical path, by reducing the constant, low-value
                  burden of procurement.
                </p>
                <br />
                <p className="font-bold text-lg text-foreground">
                  With Purpose, We Source Smarter. With Vision, We Propel
                  Unstoppable Science
                </p>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                We combine the rigor of world-class procurement processes with a
                company-first approach: you keep full control, and we handle the
                rest — from vendor negotiations and error resolution to
                compliance and returns.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                We created this program so companies could reclaim their time,
                reduce stress, and accelerate their impact. By removing
                bottlenecks and ensuring each order is simple, transparent, and
                risk-managed, ProcureWide arms you with peace of mind and the
                freedom to focus on discovery.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our innovative platform is designed to streamline operations,
                reduce risks, and maximize savings, ensuring that you can focus
                on what truly matters—fueling your scientific discovery. With
                our commitment to transparency and efficiency, we provide a
                risk-free procurement experience that allows you control over
                every order while minimizing your time spent. Join us to
                transform your procurement. Experience the peace of mind that
                comes with knowing you have full oversight and support, every
                step of the way. With this system, you can fund more science and
                staff, all the while unlocking your time to focus. You get more
                done.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenges Section (replicates screenshot layout) */}
      <section className="relative py-16 lg:py-24 text-primary overflow-hidden">
        {/* soft accent glow */}
        <div className="pointer-events-none absolute -top-4 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_30%_30%,hsl(var(--accent)/0.25),transparent_60%)] blur-2xl" />
        <div className="pointer-events-none absolute -bottom-8 -right-24 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_30%_30%,hsl(var(--accent)/0.18),transparent_60%)] blur-2xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
                The Hidden Cost of <br className="hidden sm:block" />
                Legacy Procurement
              </h2>
            </motion.div>

            <motion.div
              variants={gridVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {challenges.map((item) => (
                <motion.div
                  key={item.title}
                  variants={cardVariants}
                  className="group relative overflow-hidden rounded-2xl border border-primary-foreground/10 bg-white backdrop-blur-sm p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated hover:border-accent/30"
                >
                  {/* glow (CONSTRAINED to the card) */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,hsl(var(--accent)/0.18),transparent_65%)]" />
                  </div>

                  {/* tiny top accent line */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent/60 via-accent/15 to-transparent opacity-70 z-10" />

                  {/* content above glow */}
                  <div className="relative z-10">
                    <h3 className="text-base font-semibold text-primary-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                Your investors want this. You deserve this support.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                <strong className="text-foreground">
                  ProcureWide finds you savings, orders for you, rectifies
                  accounts, manages backorders, does much of your accounting and
                  ensures you have everything at your fingertips.
                </strong>
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                ProcureWide is a service provided by the most successful
                incubator supporting early stage companies across all of
                Biotechnology, with an 89% success rate (49 of 55 company
                successes), Clients have raised over $900M. 65,000 sq ft of
                laboratory office space with both shared operations and private
                facilities. Clients have raised $900 million. The success of the
                startups is 10 X higher than others in Biotechnology
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at ProcureWide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 bg-card rounded-2xl border border-border hover:border-accent/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto italic">
              "Only together, we can do amazing things. We can do well, by doing
              good."
            </p>
          </motion.div>

          {/* Team list (stacked) */}
          <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            {employees.map((member, index) => (
              <motion.div
                key={`${member.name}-${index}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-background/40 p-6 shadow-soft hover:shadow-elevated transition-all"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent/60 via-accent/20 to-transparent" />

                <div className="flex flex-col sm:flex-row gap-5">
                  {/* Bigger picture placeholder */}
                  <Image
                    src={member.imageURL}
                    alt={`${member.name} headshot`}
                    width={70}
                    height={70}
                    className="h-30 w-30 rounded-2xl object-cover border border-accent/20"
                  />

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground leading-tight">
                          {member.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {member.role}
                        </p>
                      </div>

                      {/* Links placeholder */}
                      <div className="flex flex-col md:flex-row items-start lg:items-center gap-3">
                        <div>
                          <span className="text-muted-foreground/50 lg:hidden">
                            •
                          </span>{" "}
                          <Link
                            href={member.linkedIn}
                            className="text-sm font-medium text-accent hover:underline underline-offset-4"
                          >
                            LinkedIn
                          </Link>
                        </div>
                        <div>
                          <span className="text-muted-foreground/50">•</span>{" "}
                          <Link
                            href={`mailto:${member.email}`}
                            className="text-sm font-medium text-accent hover:underline underline-offset-4"
                          >
                            {member.email}
                          </Link>
                        </div>
                        <div>
                          {member.phone && (
                            <>
                              <span className="text-muted-foreground/50">
                                •{" "}
                              </span>
                              <Link
                                href={`tel:${member.phone}`}
                                className="text-sm font-medium text-accent hover:underline underline-offset-4"
                              >
                                {member.phone}
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {member.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground group-hover:border-accent/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* subtle hover glow */}
                <div className="pointer-events-none absolute -inset-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,hsl(var(--accent)/0.18),transparent_55%)]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendors Section */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary-foreground)/0.08)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary-foreground)/0.08)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_65%,transparent_110%)]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            -
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              200+ Vendors: Currently Adding 10 Vendors/Month!
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We partner with the best in the industry, offering diverse and
              high-quality products for every need.
            </p>
          </motion.div>

          <VenderGrid />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Join Us and Experience Procurement Reimagined
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Created for Scientists, to support Scientists. Your investors want
              this. You deserve this support.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-xl hover:bg-accent/90 transition-colors"
            >
              Get Started Today
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
