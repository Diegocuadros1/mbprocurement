// components/NavbarClient.tsx (CLIENT)
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Get Pricing", href: "/get-pricing" },
  { name: "Contact", href: "/contact" },
];

const navLinksLoggedIn = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "About", href: "/about" },
  { name: "Get Pricing", href: "/get-pricing" },
  { name: "Contact", href: "/contact" },
];

export default function NavbarClient({
  username,
}: {
  username: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();

  const isLoggedIn = !!username;

  const links = isLoggedIn ? navLinksLoggedIn : navLinks;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/auth");
    router.refresh();
  };

  return (
    <motion.nav
      initial={{ y: -110 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "theme-deck fixed top-0 left-0 right-0 z-50",
        // Deck-style: dark glass + thin border
        "bg-black/70 backdrop-blur-xl border-b",
        isScrolled ? "border-white/15" : "border-white/10",
      )}
    >
      {/* subtle grid line effect like the hero (very faint) */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-60",
          "bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]",
          "bg-[size:4rem_4rem]",
          "[mask-image:radial-gradient(ellipse_70%_80%_at_50%_0%,#000_70%,transparent_120%)]",
        )}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="Mission Booster Procurement"
                width={46}
                height={46}
                className="transition-transform duration-200 group-hover:scale-105"
                priority
              />
              {/* tiny glow dot (uses accent as a subtle signal) */}
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_18px_rgba(255,255,255,0.15)]" />
            </div>

            <div className="hidden sm:block leading-tight">
              <span className="font-bold text-base lg:text-lg text-white">
                Mission Booster
              </span>
              <span className="block text-xs text-white/60 -mt-0.5">
                Procurement
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white/70 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <Link href="/auth">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/80 hover:text-black cursor-pointer"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/contact">
                  {/* deck primary CTA: white button */}
                  <Button
                    variant="hero"
                    size="sm"
                    className="bg-white text-black hover:bg-white/90 cursor-pointer"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-white/80 hover:text-white"
                >
                  Logout
                </Button>
                <Link href="/dashboard">
                  <Button
                    variant="hero-outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/5"
                  >
                    Welcome {username}!
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl"
          >
            <div className="container mx-auto px-4 py-5 space-y-3">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-white/75 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex gap-3 pt-4">
                {!isLoggedIn ? (
                  <>
                    <Link
                      href="/auth"
                      className="flex-1"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        variant="outline"
                        className="w-full border-white/20 text-white hover:bg-white/5"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link
                      href="/contact"
                      className="flex-1"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        className="w-full bg-white text-black hover:bg-white/90"
                        variant="hero"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Button
                      className="flex-1 border-white/20 text-white hover:bg-white/5"
                      variant="outline"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                    <Link
                      href="/dashboard"
                      className="flex-1"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        variant="hero-outline"
                        className="w-full border-white/20 text-white hover:bg-white/5"
                      >
                        Welcome {username}!
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
