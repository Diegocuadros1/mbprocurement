"use client";
import { Rocket, Linkedin, Twitter, Mail } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  company: [
    { name: "About", href: "/about" },
    { name: "Process", href: "/#process" },
    { name: "FAQ", href: "/#faq" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [{ name: "Case Studies", href: "/#case-studies" }],
  // legal: [
  //   { name: "Privacy Policy", href: "#" },
  //   { name: "Terms of Service", href: "#" },
  // ],
};

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row justify-between">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="#home" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Rocket className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <span className="font-bold text-lg">ProcureWide</span>
                {/* <span className="block text-xs text-primary-foreground/60 -mt-1">
                  Procurement
                </span> */}
              </div>
            </Link>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              Explore innovative procurement strategies that empower founders to
              streamline operations and maximize savings.
            </p>
            <div className="flex gap-4">
              <a
                href="mailto:cuadrosda21@gmail.com"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="flex gap-30 mt-10 sm:mt-0">
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/70 hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/70 hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Mission Booster Procurement. All rights
            reserved.
          </p>
          <p className="text-sm text-primary-foreground/60">
            Created by a Founder to Support Founders
          </p>
        </div>
      </div>
    </footer>
  );
};
