"use client";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Target, Users, Lightbulb, Heart } from "lucide-react";
import Image from "next/image";

const values = [
  {
    icon: Target,
    title: "Founder-First Approach",
    description:
      "Built by founders who understand the unique challenges of running a startup.",
  },
  {
    icon: Users,
    title: "Full Control",
    description:
      "You maintain complete oversight while we handle the procurement burden.",
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

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
              Developed By a Founder,{" "}
              <span className="text-accent">to Support Founders</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              At Mission Booster Procurement, we optimize the procurement
              process. You save money. You do more science. Your investors are
              thrilled.
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
                  every Founder the tools to succeed.
                </strong>
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Mission Booster Procurement was born from our founder's
                experience. Launching 6 startups of his own showed our founder,
                Dr. David Kielich, that procurement is critical to best-in-class
                operations management. Worrying about losing control only
                resulted in stolen productivity, time, and focus.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                With only so many hours in the day, every hour on a low-value
                task was an hour lost from building the future.
              </p>

              <div className="my-12 p-8 bg-primary/5 rounded-2xl border border-primary/10">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  He started with a simple goal: Empower Founders to focus on
                  what truly matters
                </h3>
                <p className="text-muted-foreground text-lg">
                  The passionate pursuit of breakthrough science and execution
                  of their critical path, by reducing the constant, low-value
                  burden of procurement.
                </p>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Our founder has seen first-hand how securing reliable supplies,
                navigating vendor relationships, and handling administrative
                hurdles can distract startup teams from pushing the limits of
                innovation. Driven by a deep commitment to the success of
                scientific entrepreneurs, our team designed Mission Booster
                Procurement to be a true partner and co-pilot.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                We combine the rigor of world-class procurement processes with a
                founder-first approach: you keep full control, and we handle the
                rest — from vendor negotiations and error resolution to
                compliance and returns.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                We created this program so founders could reclaim their time,
                reduce stress, and accelerate their impact. By removing
                bottlenecks and ensuring each order is simple, transparent, and
                risk-managed, Mission Booster Procurement arms you with peace of
                mind and the freedom to focus on discovery.
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
              These principles guide everything we do at Mission Booster
              Procurement.
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
            {[
              {
                name: "David Kielich",
                role: "Role / Title",
                bio: "1–2 sentence bio placeholder",
                tags: [],
                imageURL: "/david_kielich.png",
              },
              {
                name: "Ali Darwish",
                role: "Role / Title",
                bio: "1–2 sentence bio placeholder",
                tags: [],
                imageURL: "/ali_darwish.png",
              },
              {
                name: "Diego Alcala",
                role: "Role / Title",
                bio: "1–2 sentence bio placeholder",
                tags: [],
                imageURL: "/diego_alcala.png",
              },
            ].map((member, index) => (
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
                      <div className="flex items-center gap-3">
                        <a
                          href="#"
                          className="text-sm font-medium text-accent hover:underline underline-offset-4"
                        >
                          LinkedIn
                        </a>
                        <span className="text-muted-foreground/50">•</span>
                        <a
                          href="#"
                          className="text-sm font-medium text-accent hover:underline underline-offset-4"
                        >
                          Email
                        </a>
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
                Your investors want this. You deserve this support.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                <strong className="text-foreground">
                  Mission Procurement finds you savings, orders for you,
                  rectifies accounts, manages backorders, does much of your
                  accounting and ensures you have everything at your fingertips.
                </strong>
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Mission Booster Procurement is a service provided by Tomorrow
                Biotech. Tomorrow Biotech operates BADASS Labs, the most
                successful incubator supporting early stage companies across all
                of Biotechnology, with an 89% success rate (49 of 55 company
                successes), Clients have raised over $900M. Tomorrow Biotech has
                65,000 sq ft of laboratory office space with both shared
                operations and private facilities. Clients have raised $900
                million. The success of the startups supported by Tomorrow
                Biotech is 10 X higher than others in Biotechnology
              </p>
            </motion.div>
          </div>
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
              Built for Founders, by Founders. Your investors want this. You
              deserve this support.
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
