// components/NavbarClient.tsx (CLIENT)
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

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
  const supabase = createClient();
  const router = useRouter();

  const isLoggedIn = !!username;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/auth");
    router.refresh();
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="Mission Booster Procurement"
              width={50}
              height={50}
              className="group-hover:scale-105 transition-transform"
            />
            <div className="hidden sm:block">
              <span className="font-bold text-lg text-foreground">
                Mission Booster
              </span>
              <span className="block text-xs text-muted-foreground -mt-1">
                Procurement
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {(isLoggedIn ? navLinksLoggedIn : navLinks).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <Link href="/auth">
                  <Button variant="ghost" className="cursor-pointer" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/questionnaire">
                  <Button variant="accent" className="cursor-pointer" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="cursor-pointer"
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <Link href="/dashboard">
                  <Button variant="accent" className="cursor-pointer" size="sm">
                    Welcome {username}!
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-card border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              {(isLoggedIn ? navLinksLoggedIn : navLinks).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex gap-3 pt-4">
                {!isLoggedIn ? (
                  <>
                    <Link href="/auth" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/questionnaire" className="flex-1">
                      <Button variant="accent" className="w-full">
                        Get Started
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Button
                      className="flex-1 cursor-pointer"
                      variant="outline"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                    <Link href="/dashboard" className="flex-1 cursor-pointer">
                      <Button variant="accent" className="w-full">
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
