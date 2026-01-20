"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Download,
  Eye,
  Check,
  X,
  Pencil,
  Loader2,
} from "lucide-react";
import * as XLSX from "xlsx";

import { money, safeTime, toNumber } from "@/lib/helpers";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

import { updateOrderItemAction } from "@/lib/orders/order-item.actions";
import { useToast } from "@/hooks/use-toast";
import type { Order, OrderItem } from "@/types";

export default function ViewOrder({
  order,
  username,
  isAdmin,
}: {
  order: Order;
  username: string | null;
  isAdmin: boolean;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  // Always use local items so admin edits patch instantly
  const [items, setItems] = useState<OrderItem[]>(order.order_items ?? []);

  // Keep in sync if order changes (e.g., navigation / refresh)
  useEffect(() => {
    setItems(order.order_items ?? []);
  }, [order.order_items]);

  // Single modal for both modes
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);

  // Admin edit state
  const [deliveredPriceInput, setDeliveredPriceInput] = useState<string>("");
  const [sdsLink, setSdsLink] = useState<string>("");
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [trackingLink, setTrackingLink] = useState<string>("");
  const [markOrdered, setMarkOrdered] = useState<boolean>(false);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) =>
      (a.supplier_name ?? "").localeCompare(b.supplier_name ?? "", undefined, {
        sensitivity: "base",
      })
    );
  }, [items]);

  const orderTotal = useMemo(() => {
    return items.reduce((sum, it) => {
      const units = toNumber(it.units);
      const unitPrice = toNumber(it.unit_price);
      const lineTotal = it.line_total
        ? toNumber(it.line_total)
        : units * unitPrice;
      return sum + lineTotal;
    }, 0);
  }, [items]);

  const openModal = (item: OrderItem) => {
    setSelectedItem(item);

    if (isAdmin) {
      setDeliveredPriceInput(
        typeof item.delivered_price === "number"
          ? String(item.delivered_price)
          : ""
      );
      setMarkOrdered(!!item.is_ordered);
      setSdsLink(item.sds_link ?? "");
      setOrderNumber(item.order_number ?? "");
      setTrackingLink(item.tracking_link ?? "");
    }

    setModalOpen(true);
  };

  const formatOrderedAtForExport = (val?: string | null) => {
    if (!val) return "";
    const d = new Date(val);
    if (!Number.isNaN(d.getTime())) return d.toLocaleString();
    const t = safeTime(val);
    return t || String(val);
  };

  const downloadXlsx = () => {
    if (!sortedItems.length) return;

    const rows = sortedItems.map((it, idx) => {
      const units = toNumber(it.units);
      const unitPrice = toNumber(it.unit_price);
      const lineTotal = it.line_total
        ? toNumber(it.line_total)
        : units * unitPrice;

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
        // "Line Total (USD)": Number(lineTotal.toFixed(2)),
        Ordered: it.is_ordered ? "Yes" : "No",
        "Ordered At": formatOrderedAtForExport(it.ordered_at),
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
      // { wch: 16 }, // line total
      { wch: 10 }, // ordered
      { wch: 28 }, // ordered at
      { wch: 34 }, // sds
      { wch: 18 }, // order #
      { wch: 34 }, // tracking
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Order Items");

    const file = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([file], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Avoid ":" in filenames on Windows
    const timeSlug =
      (safeTime(order.order_time) || "")
        .replace(/:/g, "-")
        .replace(/\s+/g, "") || "time";
    const filename = `order-${order.order_date}-${timeSlug}.xlsx`;

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const saveEdits = () => {
    if (!isAdmin || !selectedItem) return;

    const raw = deliveredPriceInput.trim();
    const deliveredPrice = raw === "" ? null : Number(raw);

    if (
      deliveredPrice !== null &&
      (!Number.isFinite(deliveredPrice) || deliveredPrice < 0)
    ) {
      toast({ title: "Delivered Price must be a number" });
      return;
    }
    if (!markOrdered) {
      toast({ title: "Mark ordered must be checked" });
      return;
    }
    if (!sdsLink.trim()) {
      toast({ title: "SDS link must be provided" });
      return;
    }
    if (!orderNumber.trim()) {
      toast({ title: "Order number must be provided" });
      return;
    }
    if (!trackingLink.trim()) {
      toast({ title: "Tracking link must be provided" });
      return;
    }

    startTransition(async () => {
      const updated = await updateOrderItemAction({
        orderItemId: selectedItem.id,
        deliveredPrice,
        isOrdered: markOrdered,
        sdsLink,
        orderNumber,
        trackingLink,
      });

      // Patch local state so UI updates immediately
      setItems((prev) =>
        prev.map((it) =>
          it.id === updated.id
            ? {
                ...it,
                delivered_price: updated.delivered_price,
                is_ordered: updated.is_ordered,
                ordered_at: updated.ordered_at,
                sds_link: updated.sds_link,
                order_number: updated.order_number,
                tracking_link: updated.tracking_link,
              }
            : it
        )
      );

      setModalOpen(false);
      setSelectedItem(null);
      router.refresh();
    });
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
                  {order.order_date}{" "}
                  {safeTime(order.order_time)
                    ? `at ${safeTime(order.order_time)}`
                    : ""}
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

              {username ? (
                <p className="mt-1 text-sm text-muted-foreground">
                  Placed by: {username}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              variant="secondary"
              className="rounded-2xl cursor-pointer"
              disabled={items.length === 0}
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
                  <TableHead className="w-[210px] text-right">
                    Pricing
                  </TableHead>
                  <TableHead className="w-[110px]">Ordered</TableHead>
                  <TableHead className="w-[120px] text-right">
                    {isAdmin ? "Order" : "View"}
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <AnimatePresence initial={false}>
                  {sortedItems.map((it) => {
                    const units = toNumber(it.units);
                    const unitPrice = toNumber(it.unit_price);

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

                        {/* Item */}
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
                            ) : (
                              <> • Delivered: —</>
                            )}
                          </div>
                        </TableCell>

                        {/* Ordered */}
                        <TableCell>
                          {it.is_ordered ? (
                            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-green-400/10 px-2 py-1 text-xs text-foreground">
                              <Check className="h-3.5 w-3.5" />
                              Yes
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-red-400/20 px-2 py-1 text-xs text-muted-foreground">
                              <X className="h-3.5 w-3.5" />
                              No
                            </span>
                          )}
                        </TableCell>

                        {/* Action */}
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-xl cursor-pointer"
                            onClick={() => openModal(it)}
                            aria-label={isAdmin ? "Order Item" : "View details"}
                          >
                            {isAdmin ? (
                              <Pencil className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>

                {items.length === 0 && (
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
                {items.length}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Unit Cost Total:{" "}
              <span className="font-medium text-foreground">
                {money(orderTotal)}
              </span>
            </p>
          </div>
        </motion.div>

        {/* Unified Modal */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="sm:max-w-[760px] rounded-3xl">
            <DialogHeader>
              <DialogTitle>
                {isAdmin ? "Order Item" : "Item Details"}
              </DialogTitle>
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

                {/* Non-admin: read-only fields */}
                {!isAdmin ? (
                  <>
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
                      <p className="text-xs text-muted-foreground">
                        Order Number
                      </p>
                      <p className="text-sm">
                        {typeof selectedItem.order_number === "string"
                          ? selectedItem.order_number
                          : "—"}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Tracking Link
                      </p>
                      <p className="text-sm">
                        {typeof selectedItem.tracking_link === "string"
                          ? selectedItem.tracking_link
                          : "—"}
                      </p>
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <p className="text-xs text-muted-foreground">Ordered</p>
                      <p className="text-sm">
                        {selectedItem.is_ordered ? "Yes" : "No"}
                        {selectedItem.ordered_at ? (
                          <span className="text-muted-foreground">
                            {" "}
                            •{" "}
                            {new Date(selectedItem.ordered_at).toLocaleString()}
                          </span>
                        ) : null}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Admin: editable fields */}
                    <div className="space-y-2">
                      <Label>Delivered Price (USD)</Label>
                      <Input
                        type="number"
                        inputMode="decimal"
                        step="0.01"
                        min={0}
                        value={deliveredPriceInput}
                        onChange={(e) => setDeliveredPriceInput(e.target.value)}
                        placeholder="e.g. 199.99"
                        disabled={
                          isPending || selectedItem.delivered_price !== null
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>SDS Link</Label>
                      <Input
                        value={sdsLink}
                        onChange={(e) => setSdsLink(e.target.value)}
                        placeholder="link"
                        disabled={isPending || selectedItem.sds_link !== null}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Tracking Link</Label>
                      <Input
                        value={trackingLink}
                        onChange={(e) => setTrackingLink(e.target.value)}
                        placeholder="link"
                        disabled={
                          isPending || selectedItem.tracking_link !== null
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Order Number</Label>
                      <Input
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        placeholder="order number"
                        disabled={
                          isPending || selectedItem.order_number !== null
                        }
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label className="pr-4">Ordered:</Label>
                      <Button
                        type="button"
                        variant="secondary"
                        className={cn(
                          "w-full sm:w-1/2 rounded-2xl justify-between cursor-pointer",
                          markOrdered
                            ? "bg-green-400/15 text-foreground"
                            : "bg-accent/15"
                        )}
                        onClick={() => setMarkOrdered((v) => !v)}
                        disabled={
                          isPending || selectedItem.is_ordered !== false
                        }
                      >
                        <span className="inline-flex items-center gap-2">
                          {markOrdered ? (
                            <>
                              <Check className="h-4 w-4" /> Ordered
                            </>
                          ) : (
                            <>
                              <X className="h-4 w-4" /> Not Ordered
                            </>
                          )}
                        </span>
                      </Button>

                      {selectedItem.ordered_at ? (
                        <p className="text-xs text-muted-foreground">
                          Last ordered at:{" "}
                          {new Date(selectedItem.ordered_at).toLocaleString()}
                        </p>
                      ) : null}
                    </div>
                  </>
                )}
              </div>
            )}

            <DialogFooter
              className={cn("mt-2", isAdmin ? "gap-2 sm:gap-0" : "")}
            >
              <Button
                variant="ghost"
                className="rounded-2xl"
                onClick={() => setModalOpen(false)}
                disabled={isPending}
              >
                {isAdmin ? "Cancel" : "Close"}
              </Button>

              {isAdmin ? (
                <Button
                  className="rounded-2xl cursor-pointer"
                  onClick={saveEdits}
                  disabled={
                    isPending || !selectedItem || !!selectedItem?.is_ordered
                  }
                >
                  {isPending ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    "Set Order Placed"
                  )}
                </Button>
              ) : null}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
