"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  CheckCircle2,
  Clock,
  DollarSign,
  Building2,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { formatMoney, toNumber } from "@/lib/helpers";
import type { CompanyOrder } from "@/lib/orders";

type AdminOrder = CompanyOrder & { company_name: string };

type CompanyRow = {
  id: string;
  name: string;
  pending_orders: number;
  created_at: string;
};

type Props = {
  username: string | null;
  companies: CompanyRow[];
  allOrders: AdminOrder[];
};

function parseOrderDate(order: CompanyOrder) {
  const ms = order.order_time.includes(".")
    ? order.order_time.split(".")[1].slice(0, 3).padEnd(3, "0")
    : "000";
  const timeNoFrac = order.order_time.split(".")[0];
  return new Date(`${order.order_date}T${timeNoFrac}.${ms}`);
}

function fmtDate(dt: Date) {
  return dt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function fmtTime(dt: Date) {
  return dt.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export default function AdminDashboard({ username, companies, allOrders }: Props) {
  const router = useRouter();

  const pending = useMemo(
    () =>
      allOrders
        .filter((o) => !o.is_placed)
        .sort((a, b) => parseOrderDate(b).getTime() - parseOrderDate(a).getTime()),
    [allOrders]
  );

  const completed = useMemo(
    () =>
      allOrders
        .filter((o) => o.is_placed)
        .sort((a, b) => parseOrderDate(b).getTime() - parseOrderDate(a).getTime()),
    [allOrders]
  );

  const totalSpend = useMemo(
    () => completed.reduce((sum, o) => sum + toNumber(o.total_cost), 0),
    [completed]
  );

  const recentCompleted = completed.slice(0, 6);

  const stats = [
    {
      label: "Companies",
      value: companies.length,
      icon: Building2,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Pending Orders",
      value: pending.length,
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      label: "Completed Orders",
      value: completed.length,
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      label: "Total Processed",
      value: formatMoney(totalSpend.toFixed(2)),
      icon: DollarSign,
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_0%,#000_70%,transparent_115%)]" />
      <div className="absolute top-20 right-1/4 h-80 w-80 rounded-full bg-accent/8 blur-3xl" />
      <div className="absolute bottom-20 left-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
            Welcome back{username ? `, ${username}` : ""}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Admin Dashboard
          </h1>
        </motion.div>

        {/* Stat cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
                className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur supports-[backdrop-filter]:bg-card/40"
              >
                <div className="mb-3 flex items-start justify-between">
                  <p className="text-xs font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <div className={cn("rounded-lg p-1.5", stat.bg)}>
                    <Icon className={cn("h-3.5 w-3.5", stat.color)} />
                  </div>
                </div>
                <p className="text-2xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Two-column content */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pending orders */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.45, ease: "easeOut" }}
            className="rounded-3xl border border-border bg-card/60 p-5 backdrop-blur supports-[backdrop-filter]:bg-card/40"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">
                Pending Orders
              </h2>
              {pending.length > 0 && (
                <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-xs font-semibold text-amber-400">
                  {pending.length} pending
                </span>
              )}
            </div>

            <div className="space-y-2">
              {pending.length > 0 ? (
                pending.map((order) => (
                  <AdminOrderRow
                    key={order.id}
                    order={order}
                    dt={parseOrderDate(order)}
                    isCompleted={false}
                    onClick={() => router.push(`/orders/${order.id}`)}
                  />
                ))
              ) : (
                <div className="py-10 text-center">
                  <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-emerald-400 opacity-50" />
                  <p className="text-sm text-muted-foreground">
                    All orders are up to date!
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Recent completed */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.45, ease: "easeOut" }}
            className="rounded-3xl border border-border bg-card/60 p-5 backdrop-blur supports-[backdrop-filter]:bg-card/40"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">
                Recent Completed Orders
              </h2>
            </div>

            <div className="space-y-2">
              {recentCompleted.length > 0 ? (
                recentCompleted.map((order) => (
                  <AdminOrderRow
                    key={order.id}
                    order={order}
                    dt={parseOrderDate(order)}
                    isCompleted
                    onClick={() => router.push(`/orders/${order.id}`)}
                  />
                ))
              ) : (
                <div className="py-10 text-center">
                  <ShoppingCart className="mx-auto mb-2 h-8 w-8 text-muted-foreground/30" />
                  <p className="text-sm text-muted-foreground">
                    No completed orders yet.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function AdminOrderRow({
  order,
  dt,
  isCompleted,
  onClick,
}: {
  order: AdminOrder;
  dt: Date;
  isCompleted: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.12 }}
      onClick={onClick}
      type="button"
      className="group w-full cursor-pointer rounded-xl border border-border bg-background/60 px-4 py-3 text-left transition-colors hover:bg-background/80"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <Building2 className="h-3 w-3 shrink-0 text-muted-foreground" />
            <p className="truncate text-xs font-medium text-muted-foreground">
              {order.company_name}
            </p>
          </div>
          <p className="mt-0.5 truncate text-sm font-medium text-foreground">
            {fmtDate(dt)}
            <span className="ml-1.5 text-xs font-normal text-muted-foreground">
              {fmtTime(dt)}
            </span>
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {formatMoney(order.total_cost)}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span
            className={cn(
              "rounded-lg px-2 py-1 text-[10px] font-semibold",
              isCompleted
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-amber-400/15 text-amber-400"
            )}
          >
            {isCompleted ? "Completed" : "Pending"}
          </span>
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-foreground" />
        </div>
      </div>
    </motion.button>
  );
}
