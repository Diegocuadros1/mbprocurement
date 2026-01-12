"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Download, Eye, Check, X } from "lucide-react";
import * as XLSX from "xlsx";
import { money, safeTime, toNumber } from "@/lib/helpers";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Order, OrderItem } from "@/types";

export default function ViewOrder({ order }: { order: Order }) {
  const router = useRouter();

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);

  const orderTotal = useMemo(() => {
    return order.order_items.reduce((sum, it) => {
      const units = toNumber(it.units);
      const unitPrice = toNumber(it.unit_price);
      const lineTotal = it.line_total
        ? toNumber(it.line_total)
        : units * unitPrice;
      return sum + lineTotal;
    }, 0);
  }, [order.order_items]);

  const openDetails = (item: OrderItem) => {
    setSelectedItem(item);
    setDetailsOpen(true);
  };

  const sortedItems = useMemo(() => {
    return [...order.order_items].sort((a, b) =>
      (a.supplier_name ?? "").localeCompare(b.supplier_name ?? "", undefined, {
        sensitivity: "base", // case-insensitive-ish
      })
    );
  }, [order.order_items]);

  const downloadXlsx = () => {
    if (!order.order_items?.length) return;

    // Export oldest -> newest (feel free to flip)
    const rows = [...sortedItems].map((it, idx) => {
      const units = toNumber(it.units);
      const unitPrice = toNumber(it.unit_price);
      const lineTotal = it.line_total
        ? toNumber(it.line_total)
        : units * unitPrice;

      console.log(safeTime(it.ordered_at));

      return {
        "#": idx + 1,
        "Supplier Name": it.supplier_name ?? "",
        "SKU / Item #": it.item_number ?? "",
        Description: it.description ?? "",
        "Item Link": it.item_link ?? "",
        Units: units,
        UOM: it.unit_of_measure ?? "",
        "Unit Price (USD)": unitPrice,
        "Delivered Price (USD)": it.delivered_price ?? "",
        "Line Total (USD)": Number(lineTotal.toFixed(2)),
        Ordered: it.is_ordered ? "Yes" : "No",
        "Ordered At": it.ordered_at ? `${safeTime(it.ordered_at)}` : "",
        "SDS Link": it.sds_link ?? "",
        "Order Number": it.order_number ?? "",
        "Tracking Link": it.tracking_link ?? "",
      };
    });

    const ws = XLSX.utils.json_to_sheet(rows);

    ws["!cols"] = [
      { wch: 4 }, // #
      { wch: 22 }, // supplier
      { wch: 18 }, // item #
      { wch: 54 }, // description
      { wch: 40 }, // link
      { wch: 8 }, // units
      { wch: 10 }, // uom
      { wch: 16 }, // unit price
      { wch: 20 }, // delivered
      { wch: 16 }, // line total
      { wch: 10 }, // ordered
      { wch: 24 }, // ordered at
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Order Items");

    const file = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([file], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const filename = `order-${order.order_date}-${safeTime(
      order.order_time
    )}.xlsx`;

    // No file-saver needed
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background mt-30">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_0%,#000_70%,transparent_115%)]" />
      <div className="absolute top-16 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-16 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="flex items-start gap-3">
            <Button
              variant="ghost"
              className="rounded-2xl"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Order •{" "}
                <span className="font-medium text-muted-foreground">
                  {" "}
                  {order.order_date}{" "}
                  {safeTime(order.order_time)
                    ? `at ${safeTime(order.order_time)}`
                    : ""}{" "}
                </span>
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Status:{" "}
                <span className="font-medium text-foreground">
                  {order.is_placed ? "Placed" : "Pending"}
                </span>
                {order.placed_at ? (
                  <span className="text-muted-foreground">
                    {" "}
                    • Placed at {new Date(order.placed_at).toLocaleString()}
                  </span>
                ) : null}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              variant="secondary"
              className="rounded-2xl cursor-pointer"
              disabled={order.order_items.length === 0}
              onClick={downloadXlsx}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full rounded-3xl border border-border bg-card/60 p-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/40 sm:p-4"
        >
          {/* Table */}
          <div className="rounded-2xl border border-border bg-background/60 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-card/40">
                  <TableHead className="w-[220px]">Supplier</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead className="w-[140px] text-right">Qty</TableHead>
                  <TableHead className="w-[190px] text-right">
                    Pricing
                  </TableHead>
                  <TableHead className="w-[110px]">Ordered</TableHead>
                  <TableHead className="w-[120px] text-right">View</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <AnimatePresence initial={false}>
                  {sortedItems.map((it) => {
                    const units = toNumber(it.units);
                    const unitPrice = toNumber(it.unit_price);
                    const lineTotal = it.line_total
                      ? toNumber(it.line_total)
                      : units * unitPrice;

                    return (
                      <motion.tr
                        key={it.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="border-b border-border last:border-b-0 hover:bg-muted/30 transition"
                      >
                        {/* Supplier */}
                        <TableCell className="font-medium">
                          <div className="truncate">{it.supplier_name}</div>
                        </TableCell>

                        {/* Item (SKU + description + link) */}
                        <TableCell>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs text-muted-foreground">
                                {it.item_number}
                              </span>

                              {it.item_link ? (
                                <a
                                  href={it.item_link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className={cn(
                                    "inline-flex items-center gap-1 text-xs",
                                    "text-muted-foreground hover:text-foreground transition"
                                  )}
                                >
                                  Link <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              ) : null}
                            </div>

                            <p className="mt-1 line-clamp-2 text-sm text-foreground">
                              {it.description}
                            </p>
                          </div>
                        </TableCell>

                        {/* Qty */}
                        <TableCell className="text-right">
                          <div className="text-sm text-foreground">
                            {units}{" "}
                            <span className="text-muted-foreground">
                              {it.unit_of_measure}
                            </span>
                          </div>
                        </TableCell>

                        {/* Pricing */}
                        <TableCell className="text-right">
                          <div className="text-sm text-foreground">
                            {money(unitPrice)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {typeof it.delivered_price === "number" ? (
                              <> • Delivered: {money(it.delivered_price)}</>
                            ) : null}
                          </div>
                        </TableCell>

                        {/* Ordered */}
                        <TableCell>
                          <div className="inline-flex items-center gap-2">
                            {it.is_ordered ? (
                              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-green-400/10 px-2 py-1 text-xs text-foreground">
                                <Check className="h-3.5 w-3.5" />
                                Yes
                              </span>
                            ) : (
                              <span className="inline-flex bg-red-400/40 items-center gap-1 rounded-full border border-border bg-muted/40 px-2 py-1 text-xs text-muted-foreground">
                                <X className="h-3.5 w-3.5" />
                                No
                              </span>
                            )}
                          </div>
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-xl cursor-pointer"
                            onClick={() => openDetails(it)}
                            aria-label="View details"
                          >
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>

                {order.order_items.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10 text-center">
                      <p className="text-sm text-muted-foreground">
                        No items found for this order.
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Footer summary */}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Items:{" "}
              <span className="font-medium text-foreground">
                {order.order_items.length}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Estimated Total:{" "}
              <span className="font-medium text-foreground">
                {money(orderTotal)}
              </span>
            </p>
          </div>
        </motion.div>

        {/* Details Modal */}
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="sm:max-w-[760px] rounded-3xl">
            <DialogHeader>
              <DialogTitle>Item Details</DialogTitle>
            </DialogHeader>

            {selectedItem && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Supplier</p>
                  <p className="text-sm font-medium">
                    {selectedItem.supplier_name}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">SKU / Item #</p>
                  <p className="text-sm font-mono">
                    {selectedItem.item_number}
                  </p>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <p className="text-xs text-muted-foreground">Description</p>
                  <p className="text-sm">{selectedItem.description}</p>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <p className="text-xs text-muted-foreground">Item Link</p>
                  {selectedItem.item_link ? (
                    <a
                      href={selectedItem.item_link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                      {selectedItem.item_link}{" "}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">—</p>
                  )}
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Quantity</p>
                  <p className="text-sm">
                    {selectedItem.units}{" "}
                    <span className="text-muted-foreground">
                      {selectedItem.unit_of_measure}
                    </span>
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Unit Price</p>
                  <p className="text-sm">
                    {money(toNumber(selectedItem.unit_price))}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    Delivered Price
                  </p>
                  <p className="text-sm">
                    {typeof selectedItem.delivered_price === "number"
                      ? money(selectedItem.delivered_price)
                      : "—"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">SDS Link</p>
                  <p className="text-sm">
                    {typeof selectedItem.sds_link === "string"
                      ? selectedItem.sds_link
                      : "—"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Order Number</p>
                  <p className="text-sm">
                    {typeof selectedItem.order_number === "string"
                      ? selectedItem.order_number
                      : "—"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Tracking Link</p>
                  <p className="text-sm">
                    {typeof selectedItem.tracking_link === "string"
                      ? selectedItem.tracking_link
                      : "—"}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Ordered</p>
                  <p className="text-sm">
                    {selectedItem.is_ordered ? "Yes" : "No"}
                    {selectedItem.ordered_at ? (
                      <span className="text-muted-foreground">
                        {" "}
                        • {new Date(selectedItem.ordered_at).toLocaleString()}
                      </span>
                    ) : null}
                  </p>
                </div>
              </div>
            )}

            <DialogFooter className="mt-2">
              <Button
                variant="ghost"
                className="rounded-2xl"
                onClick={() => setDetailsOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
