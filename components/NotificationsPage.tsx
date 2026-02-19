"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Mail,
  DollarSign,
  ClipboardList,
  CheckCircle2,
  Bell,
  ArrowRight,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NotificationRow } from "@/lib/notifications";

type Props = {
  notifications: NotificationRow[];
};

const TYPE_META: Record<
  string,
  { icon: React.ElementType; color: string; bg: string; label: string }
> = {
  new_order: {
    icon: ShoppingCart,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    label: "New Order",
  },
  contact: {
    icon: Mail,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    label: "Contact Message",
  },
  pricing: {
    icon: DollarSign,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    label: "Pricing Request",
  },
  questionnaire: {
    icon: ClipboardList,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    label: "Questionnaire",
  },
  order_placed: {
    icon: CheckCircle2,
    color: "text-accent",
    bg: "bg-accent/10",
    label: "Order Placed",
  },
  billing_cycle: {
    icon: CalendarDays,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    label: "Billing Cycle",
  },
  welcome: {
    icon: Sparkles,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    label: "Welcome",
  },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function NotificationsPage({ notifications }: Props) {
  const unread = useMemo(() => notifications.filter((n) => !n.is_read), [notifications]);
  const read = useMemo(() => notifications.filter((n) => n.is_read), [notifications]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_0%,#000_70%,transparent_115%)]" />
      <div className="absolute top-20 right-1/4 h-80 w-80 rounded-full bg-accent/8 blur-3xl" />

      <main className="relative z-10 mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10">
            <Bell className="h-4 w-4 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Notifications
            </h1>
            {unread.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {unread.length} unread
              </p>
            )}
          </div>
        </motion.div>

        {notifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="rounded-3xl border border-border bg-card/60 p-12 text-center backdrop-blur"
          >
            <Bell className="mx-auto mb-3 h-10 w-10 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">
              No notifications yet.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {unread.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                  Unread
                </p>
                <div className="space-y-2">
                  {unread.map((n, i) => (
                    <NotificationCard key={n.id} notification={n} index={i} />
                  ))}
                </div>
              </motion.section>
            )}

            {read.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                  Earlier
                </p>
                <div className="space-y-2">
                  {read.map((n, i) => (
                    <NotificationCard key={n.id} notification={n} index={i} />
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function NotificationCard({
  notification,
  index,
}: {
  notification: NotificationRow;
  index: number;
}) {
  const meta = TYPE_META[notification.type] ?? {
    icon: Bell,
    color: "text-muted-foreground",
    bg: "bg-muted",
    label: "Notification",
  };
  const Icon = meta.icon;

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className={cn(
        "flex items-start gap-4 rounded-2xl border border-border bg-card/60 px-4 py-4 backdrop-blur transition-colors",
        notification.link && "hover:bg-card/80 cursor-pointer",
        !notification.is_read && "border-accent/20 bg-accent/5"
      )}
    >
      <div className={cn("mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", meta.bg)}>
        <Icon className={cn("h-4 w-4", meta.color)} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">
              {notification.title}
            </p>
            {notification.body && (
              <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">
                {notification.body}
              </p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {timeAgo(notification.created_at)}
            </span>
            {!notification.is_read && (
              <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
            )}
          </div>
        </div>

        <div className="mt-1.5 flex items-center gap-2">
          <span className={cn("rounded-md px-2 py-0.5 text-[10px] font-semibold", meta.bg, meta.color)}>
            {meta.label}
          </span>
          {notification.link && (
            <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
              View <ArrowRight className="h-3 w-3" />
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (notification.link) {
    return <Link href={notification.link}>{inner}</Link>;
  }

  return inner;
}
