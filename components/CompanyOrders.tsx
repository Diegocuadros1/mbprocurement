"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import type { OrderRow } from "@/types";

const parseCost = (v: string | null): number => (v == null ? 0 : Number(v));

export default function OrdersDashboard({
  companyName,
  orders,
}: {
  companyName: string;
  orders: OrderRow[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const formatMoney = (v: string | null) =>
    v == null
      ? "—"
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(Number(v));

  const parseDateTime = (o: OrderRow) => {
    const ms = o.order_time.includes(".")
      ? o.order_time.split(".")[1].slice(0, 3).padEnd(3, "0")
      : "000";
    const timeNoFrac = o.order_time.split(".")[0]; // "21:33:15"
    // "2026-01-03T21:33:15.803"
    return new Date(`${o.order_date}T${timeNoFrac}.${ms}`);
  };

  const normalized = useMemo(() => {
    return orders
      .map((o) => ({ ...o, _dt: parseDateTime(o) }))
      .sort((a, b) => b._dt.getTime() - a._dt.getTime());
  }, [orders]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return normalized;

    return normalized.filter((o) => {
      const dateStr = o._dt.toLocaleDateString("en-US");
      const timeStr = o._dt.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const statusStr = o.is_placed ? "completed placed" : "pending unplaced";
      const costStr = o.total_cost == null ? "" : String(o.total_cost);

      return (
        dateStr.toLowerCase().includes(q) ||
        timeStr.toLowerCase().includes(q) ||
        statusStr.includes(q) ||
        costStr.includes(q)
      );
    });
  }, [normalized, query]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_0%,#000_70%,transparent_115%)]" />
      <div className="absolute top-16 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-16 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-10 mt-30 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {companyName}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Review order history and statuses.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              onClick={() => router.push("/dashboard/orders/new")}
              className="rounded-2xl cursor-pointer"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Order
            </Button>

            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by date, time, status, or cost..."
                className="w-full pl-9 sm:w-[320px]"
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
          className="w-full rounded-3xl border border-border bg-card/60 p-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/40 sm:p-4"
        >
          {/* Orders list */}
          <div className="mt-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((order) => (
                <OrderListRow
                  key={order.id}
                  order={order}
                  formatMoney={formatMoney}
                  onClick={() => router.push(`/dashboard/orders/${order.id}`)}
                />
              ))}
            </AnimatePresence>

            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid place-items-center py-14 text-center"
              >
                {query === "" ? (
                  <p className="text-sm text-muted-foreground">
                    No orders present.
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No orders match “{query}”.
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function OrderListRow({
  order,
  onClick,
  formatMoney,
}: {
  order: OrderRow;
  onClick: () => void;
  formatMoney: (v: string | null) => string;
}) {
  const ms = order.order_time.includes(".")
    ? order.order_time.split(".")[1].slice(0, 3).padEnd(3, "0")
    : "000";
  const timeNoFrac = order.order_time.split(".")[0];
  const dt = new Date(`${order.order_date}T${timeNoFrac}.${ms}`);

  const dateStr = dt.toLocaleDateString("en-US"); // 1/3/2026
  const timeStr = dt.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isPending = !order.is_placed;

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.05, ease: "easeOut" }}
      onClick={onClick}
      className={cn(
        "group my-2 w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-left",
        "shadow-sm transition hover:bg-background/80 hover:shadow-md cursor-pointer"
      )}
      type="button"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {dateStr}{" "}
            <span className="font-normal text-muted-foreground">
              • {timeStr}
            </span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Total Cost: {formatMoney(order.total_cost)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={cn(
              "rounded-2xl px-3 py-2 text-xs font-semibold",
              isPending
                ? "bg-destructive/15 text-destructive"
                : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
            )}
          >
            {isPending ? "Order Pending" : "Order Completed"}
          </div>

          <div className="grid h-10 w-10 place-items-center rounded-2xl border border-border bg-card text-muted-foreground transition group-hover:text-foreground">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}
