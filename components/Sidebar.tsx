"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Defined outside component so the reference is stable across renders,
// preventing Framer Motion from losing animation state on re-renders.
const panelVariants = {
  enter: (dir: number) => ({ x: dir >= 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? -40 : 40, opacity: 0 }),
};
import {
  LayoutDashboard,
  ShoppingCart,
  BarChart3,
  Bell,
  Settings,
  Plus,
  Search,
  ChevronLeft,
  Building2,
  Package,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CompanyRow = {
  id: string;
  name: string;
  pending_orders: number;
};

const userNavItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Products", href: "/products", icon: Package },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

function adminCompanyNavItems(companyId: string) {
  return [
    {
      name: "Orders",
      href: `/companies/${companyId}`,
      icon: ShoppingCart,
    },
    {
      name: "Analytics",
      href: `/dashboard/analytics?company=${companyId}`,
      icon: BarChart3,
    },
    {
      name: "Company Settings",
      href: `/dashboard/settings?company=${companyId}`,
      icon: Settings,
    },
  ];
}

interface SidebarProps {
  isAdmin: boolean;
  companies: CompanyRow[];
}

export default function Sidebar({ isAdmin, companies }: SidebarProps) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  // Company ID extracted from the URL (only set on /companies/[id] routes)
  const urlCompanyMatch = pathname.match(/\/companies\/([^/]+)/);
  const urlCompanyId = urlCompanyMatch?.[1] ?? null;

  // Pinned company: remembers the last selected company so the sidebar stays
  // on the company detail view when navigating to analytics, settings, etc.
  const [pinnedCompanyId, setPinnedCompanyId] = useState<string | null>(
    urlCompanyId
  );

  // When URL reveals a company, pin it
  useEffect(() => {
    if (urlCompanyId) {
      setPinnedCompanyId(urlCompanyId);
    }
  }, [urlCompanyId]);

  // Clear pin when the admin navigates back to /dashboard (the company list)
  useEffect(() => {
    if (pathname === "/dashboard" && !urlCompanyId) {
      setPinnedCompanyId(null);
    }
  }, [pathname, urlCompanyId]);

  // The effective company: URL takes precedence, then pinned
  const activeCompanyId = urlCompanyId ?? pinnedCompanyId;
  const activeCompany = companies.find((c) => c.id === activeCompanyId);

  // Track slide direction: 1 = forward (list → detail), -1 = back (detail → list).
  // Computed synchronously during render (not in useEffect) so the custom prop
  // passed to AnimatePresence and motion.div is always up-to-date.
  const directionRef = useRef(0);
  // "initial" sentinel means first render — don't animate, just record.
  const prevActiveRef = useRef<string | null | "initial">("initial");

  if (prevActiveRef.current === "initial") {
    prevActiveRef.current = activeCompanyId;
  } else if (prevActiveRef.current !== activeCompanyId) {
    if (activeCompanyId && !prevActiveRef.current) {
      directionRef.current = 1;
    } else if (!activeCompanyId && prevActiveRef.current) {
      directionRef.current = -1;
    }
    prevActiveRef.current = activeCompanyId;
  }

  const filteredCompanies = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter((c) => c.name.toLowerCase().includes(q));
  }, [companies, search]);

  return (
    <motion.aside
      initial={{ x: -240 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed left-0 top-12 bottom-0 w-60 bg-card border-r border-border/50 flex flex-col z-40 overflow-hidden"
    >
      <AnimatePresence mode="wait" custom={directionRef.current}>
        {/* ── Admin: Company List ── */}
        {isAdmin && !activeCompanyId && (
          <motion.div
            key="company-list"
            custom={directionRef.current}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col h-full overflow-hidden"
          >
            <div className="px-3 pt-3 pb-2 border-b border-border/50">
              <Link href="/dashboard">
                <motion.div
                  whileHover={{ x: 3 }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    pathname === "/dashboard"
                      ? "bg-accent/15 text-accent border border-accent/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <LayoutDashboard
                    className={`w-4 h-4 shrink-0 ${pathname === "/dashboard" ? "text-accent" : ""}`}
                  />
                  <span>Dashboard</span>
                  {pathname === "/dashboard" && (
                    <motion.div
                      layoutId="adminListActive"
                      className="ml-auto w-1 h-4 rounded-full bg-accent"
                    />
                  )}
                </motion.div>
              </Link>
            </div>

            <div className="px-3 py-2 border-b border-border/50">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search companies…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-8 text-xs bg-muted/30 border-border/50"
                />
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
              <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                Companies
              </p>

              {filteredCompanies.map((company, i) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.035 + 0.05, duration: 0.2 }}
                >
                  <Link href={`/companies/${company.id}`}>
                    <motion.div
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.12 }}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <Building2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate flex-1 text-xs">
                        {company.name}
                      </span>
                      {company.pending_orders > 0 && (
                        <span className="shrink-0 text-[10px] font-bold bg-accent/20 text-accent px-1.5 py-0.5 rounded-full leading-none">
                          {company.pending_orders}
                        </span>
                      )}
                    </motion.div>
                  </Link>
                </motion.div>
              ))}

              {filteredCompanies.length === 0 && (
                <p className="px-3 py-6 text-xs text-muted-foreground text-center">
                  No companies found
                </p>
              )}
            </nav>
          </motion.div>
        )}

        {/* ── Admin: Company Detail ── */}
        {isAdmin && activeCompanyId && (
          <motion.div
            key={`company-${activeCompanyId}`}
            custom={directionRef.current}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col h-full overflow-hidden"
          >
            <div className="p-3 border-b border-border/50 space-y-2">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPinnedCompanyId(null)}
                  className="gap-1.5 text-xs text-muted-foreground hover:text-foreground w-full justify-start h-7 px-2 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  All Companies
                </Button>
              </Link>
              <div className="flex items-center gap-2 px-1">
                <Building2 className="w-4 h-4 text-accent shrink-0" />
                <span className="text-sm font-semibold text-foreground truncate">
                  {activeCompany?.name ?? "Company"}
                </span>
              </div>
            </div>

            <div className="p-3 border-b border-border/50">
              <Link href={`/companies/${activeCompanyId}/new`}>
                <Button
                  variant="accent"
                  size="sm"
                  className="w-full gap-2 cursor-pointer font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  Add New Order
                </Button>
              </Link>
            </div>

            <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
              {adminCompanyNavItems(activeCompanyId).map((item, i) => {
                const Icon = item.icon;
                // Strip query params for pathname comparison since usePathname()
                // does not include the search string
                const hrefPath = item.href.split("?")[0];
                const isActive =
                  pathname === hrefPath ||
                  (hrefPath !== `/companies/${activeCompanyId}` &&
                    pathname.startsWith(hrefPath + "/"));

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1, duration: 0.22 }}
                  >
                    <Link href={item.href}>
                      <motion.div
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.12 }}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                          isActive
                            ? "bg-accent/15 text-accent border border-accent/20"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 shrink-0 ${isActive ? "text-accent" : ""}`}
                        />
                        <span>{item.name}</span>
                        {isActive && (
                          <motion.div
                            layoutId="adminDetailActive"
                            className="ml-auto w-1 h-4 rounded-full bg-accent"
                          />
                        )}
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}

        {/* ── Regular User Sidebar ── */}
        {!isAdmin && (
          <motion.div
            key="user"
            custom={0}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col h-full overflow-hidden"
          >
            <div className="p-3 border-b border-border/50">
              <Link href="/orders/new">
                <Button
                  variant="accent"
                  size="sm"
                  className="w-full gap-2 cursor-pointer font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  Add New Order
                </Button>
              </Link>
            </div>

            <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
              {userNavItems.map((item, i) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname.startsWith(item.href + "/"));

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.15, duration: 0.25 }}
                  >
                    <Link href={item.href}>
                      <motion.div
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.12 }}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                          isActive
                            ? "bg-accent/15 text-accent border border-accent/20"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 shrink-0 ${isActive ? "text-accent" : ""}`}
                        />
                        <span>{item.name}</span>
                        {isActive && (
                          <motion.div
                            layoutId="userActive"
                            className="ml-auto w-1 h-4 rounded-full bg-accent"
                          />
                        )}
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
