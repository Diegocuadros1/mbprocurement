"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type CompanyRow = {
  id: string;
  name: string;
  pending_orders: number;
  created_at: string;
};

export default function CompaniesDashboard({
  companies,
}: {
  userName: string;
  companies: CompanyRow[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter((c) => c.name.toLowerCase().includes(q));
  }, [companies, query]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Pattern (same vibe as your Hero) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_0%,#000_70%,transparent_115%)]" />

      {/* Gradient Orbs */}
      <div className="absolute top-16 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-16 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

      {/* Content */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-30 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Companies
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Select a company to review and place orders.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search companies..."
                className="w-full pl-9 sm:w-[260px]"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.06, delayChildren: 0.08 },
            },
          }}
          className="rounded-3xl border w-full border-border bg-card/60 p-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/40 sm:p-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((company) => (
              <CompanyRow
                key={company.id}
                company={company}
                onClick={() =>
                  router.push(`/dashboard/companies/${company.id}`)
                }
              />
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid place-items-center py-14 text-center"
            >
              <p className="text-sm text-muted-foreground">
                No companies match “{query}”.
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

function CompanyRow({
  company,
  onClick,
}: {
  company: { id: string; name: string; pending_orders: number };
  onClick: () => void;
}) {
  const hasPending = company.pending_orders > 0;

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={onClick}
      className={cn(
        "group w-full rounded-2xl border border-border bg-background/60 px-4 py-4 my-2 cursor-pointer text-left",
        "shadow-sm transition hover:bg-background/80 hover:shadow-md"
      )}
      type="button"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-foreground">
            {company.name}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Click to view orders, history, and suppliers
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={cn(
              "rounded-2xl px-3 py-2 text-sm font-semibold",
              hasPending
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            Pending orders: {company.pending_orders}
          </div>

          <div className="grid h-10 w-10 place-items-center rounded-2xl border border-border bg-card text-muted-foreground transition group-hover:text-foreground">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}
