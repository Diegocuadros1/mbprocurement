"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import {
  BarChart3,
  DollarSign,
  Clock,
  ShoppingBag,
  TrendingUp,
  Package,
} from "lucide-react";
import { money } from "@/lib/helpers";
import type { AnalyticsData } from "@/lib/analytics";

// Brand accent: hsl(153, 73%, 44%)
const ACCENT = "hsl(153, 73%, 44%)";
const ACCENT_DIM = "hsl(153, 73%, 34%)";
const AMBER = "hsl(38, 92%, 50%)";
const MUTED = "hsl(215, 16%, 40%)";

// ── Custom Tooltip ────────────────────────────────────────────────────────────
function BarTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2 shadow-lg text-sm">
      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
      <p className="font-semibold text-foreground">{money(payload[0].value)}</p>
    </div>
  );
}

// ── KPI Card ──────────────────────────────────────────────────────────────────
function KpiCard({
  label,
  value,
  icon: Icon,
  delay,
  highlight,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  delay: number;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur"
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
        <div
          className={`p-1.5 rounded-lg ${
            highlight ? "bg-accent/15" : "bg-muted/40"
          }`}
        >
          <Icon
            className={`h-3.5 w-3.5 ${
              highlight ? "text-accent" : "text-muted-foreground"
            }`}
          />
        </div>
      </div>
      <p
        className={`text-2xl font-bold tracking-tight ${
          highlight ? "text-accent" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function AnalyticsPage({
  data,
  companyName,
}: {
  data: AnalyticsData;
  companyName?: string;
}) {
  const {
    totalSpend,
    currentCycleSpend,
    pendingItemsCount,
    totalOrdersCount,
    avgCycleSpend,
    cycleSpend,
    topSuppliers,
    orderedCount,
    pendingCount,
    topItems,
  } = data;

  const maxSupplierSpend = topSuppliers[0]?.total ?? 1;
  const totalItems = orderedCount + pendingCount;

  const donutData = [
    { name: "Ordered", value: orderedCount, fill: ACCENT },
    { name: "Pending", value: pendingCount, fill: AMBER },
  ];

  const hasData = totalOrdersCount > 0;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background pt-8">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_0%,#000_70%,transparent_115%)]" />
      <div className="absolute top-16 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-16 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 flex items-center gap-3"
        >
          <BarChart3 className="h-6 w-6 text-accent" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Analytics
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {companyName ? `Procurement insights for ${companyName}` : "Procurement insights for your company"}
            </p>
          </div>
        </motion.div>

        {!hasData ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center gap-4 py-32 text-center"
          >
            <BarChart3 className="h-10 w-10 text-muted-foreground/30" />
            <p className="text-muted-foreground text-sm">
              No order data yet. Submit your first order to see analytics.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* ── KPI Cards ── */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <KpiCard
                label="Total Spend"
                value={money(totalSpend)}
                icon={DollarSign}
                delay={0.05}
                highlight
              />
              <KpiCard
                label="Current Cycle"
                value={money(currentCycleSpend)}
                icon={TrendingUp}
                delay={0.1}
              />
              <KpiCard
                label="Pending Items"
                value={String(pendingItemsCount)}
                icon={Clock}
                delay={0.15}
              />
              <KpiCard
                label="Total Orders"
                value={String(totalOrdersCount)}
                icon={ShoppingBag}
                delay={0.2}
              />
            </div>

            {/* ── Bar Chart + Donut ── */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Spend per Billing Cycle */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
                className="lg:col-span-2 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur"
              >
                <div className="mb-1">
                  <p className="text-sm font-semibold text-foreground">
                    Spend per Billing Cycle
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Avg {money(avgCycleSpend)} / cycle
                  </p>
                </div>

                {cycleSpend.length === 0 ? (
                  <div className="flex items-center justify-center h-48 text-sm text-muted-foreground">
                    No data
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart
                      data={cycleSpend}
                      margin={{ top: 12, right: 4, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="shortLabel"
                        tick={{
                          fontSize: 11,
                          fill: "hsl(var(--muted-foreground))",
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tickFormatter={(v) =>
                          v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
                        }
                        tick={{
                          fontSize: 11,
                          fill: "hsl(var(--muted-foreground))",
                        }}
                        axisLine={false}
                        tickLine={false}
                        width={48}
                      />
                      <Tooltip content={<BarTooltip />} cursor={{ fill: "hsl(var(--muted)/0.3)" }} />
                      <Bar
                        dataKey="total"
                        fill={ACCENT}
                        radius={[6, 6, 0, 0]}
                        maxBarSize={56}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </motion.div>

              {/* Ordered vs Pending Donut */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur"
              >
                <p className="text-sm font-semibold text-foreground mb-1">
                  Fulfillment Status
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  {totalItems} total line items
                </p>

                {totalItems === 0 ? (
                  <div className="flex items-center justify-center h-48 text-sm text-muted-foreground">
                    No data
                  </div>
                ) : (
                  <>
                    <ResponsiveContainer width="100%" height={180}>
                      <PieChart>
                        <Pie
                          data={donutData}
                          cx="50%"
                          cy="50%"
                          innerRadius={52}
                          outerRadius={76}
                          dataKey="value"
                          paddingAngle={3}
                          strokeWidth={0}
                        />

                        <Tooltip
                          formatter={(value) => [
                            `${value} items`,
                          ]}
                          contentStyle={{
                            background: "hsl(180, 100%, 100%)",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "12px",
                            fontSize: "12px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>

                    <div className="flex justify-center gap-4 mt-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="h-2.5 w-2.5 rounded-full shrink-0"
                          style={{ background: ACCENT }}
                        />
                        <span className="text-xs text-muted-foreground">
                          Ordered{" "}
                          <span className="font-medium text-foreground">
                            {orderedCount}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="h-2.5 w-2.5 rounded-full shrink-0"
                          style={{ background: AMBER }}
                        />
                        <span className="text-xs text-muted-foreground">
                          Pending{" "}
                          <span className="font-medium text-foreground">
                            {pendingCount}
                          </span>
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </div>

            {/* ── Top Suppliers + Top Items ── */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Top Suppliers */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
                className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur"
              >
                <p className="text-sm font-semibold text-foreground mb-4">
                  Top Suppliers
                </p>

                {topSuppliers.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-8 text-center">
                    No data
                  </p>
                ) : (
                  <div className="space-y-3">
                    {topSuppliers.map((s, i) => (
                      <div key={s.name}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-xs font-mono text-muted-foreground/60 w-4 shrink-0">
                              {i + 1}
                            </span>
                            <span className="text-sm font-medium text-foreground truncate">
                              {s.name}
                            </span>
                          </div>
                          <div className="text-right shrink-0 ml-3">
                            <p className="text-sm font-semibold text-foreground">
                              {money(s.total)}
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              {s.itemCount} item{s.itemCount !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                        {/* Progress bar */}
                        <div className="h-1.5 w-full rounded-full bg-muted/40 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${(s.total / maxSupplierSpend) * 100}%`,
                              background:
                                i === 0
                                  ? ACCENT
                                  : i === 1
                                  ? ACCENT_DIM
                                  : MUTED,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Top Items */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
                className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur"
              >
                <p className="text-sm font-semibold text-foreground mb-4">
                  Most Reordered Items
                </p>

                {topItems.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-8 text-center">
                    No data
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {topItems.map((item, i) => (
                      <div
                        key={`${item.supplier}-${item.itemNumber}`}
                        className="flex items-start gap-3 rounded-xl bg-muted/20 px-3 py-2.5"
                      >
                        <span className="text-xs font-mono text-muted-foreground/60 mt-0.5 w-4 shrink-0">
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-accent shrink-0">
                              {item.itemNumber}
                            </span>
                            <span className="text-xs text-muted-foreground truncate">
                              {item.supplier}
                            </span>
                          </div>
                          <p className="text-sm text-foreground line-clamp-1 mt-0.5">
                            {item.description}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
                            <Package className="h-3 w-3" />
                            {item.count}×
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
