"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { cn } from "@/lib/utils";

import { useToast } from "@/hooks/use-toast";
import { submitOrderAction } from "@/lib/orders/actions";

type OrderItem = {
  id: string;
  supplierName: string;
  sku: string;
  description: string;
  itemLink: string;
  units: number;
  uom: string;
  unitPrice: number;
};

const money = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    Number.isFinite(n) ? n : 0
  );

const normalizeUrl = (raw: string) => {
  const v = raw.trim();
  if (!v) return "";
  if (v.startsWith("http://") || v.startsWith("https://")) return v;
  return `https://${v}`;
};

export default function NewOrderPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Modal form state
  const [supplierName, setSupplierName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [itemLink, setItemLink] = useState("");
  const [units, setUnits] = useState<string>("1");
  const [uom, setUom] = useState("");
  const [unitPrice, setUnitPrice] = useState<string>("");

  const resetForm = () => {
    setSupplierName("");
    setSku("");
    setDescription("");
    setItemLink("");
    setUnits("1");
    setUom("");
    setUnitPrice("");
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  const inputErrorsNotify = () => {
    toast({
      title: "Input Error",
      description: "Please fill out all required fields.",
    });
  };

  const onAddItem = () => {
    const unitsNum = Number(units);
    const unitPriceNum = Number(unitPrice);

    // very lightweight validation (feel free to tighten)
    if (!supplierName.trim()) {
      inputErrorsNotify();
      return;
    }
    if (!sku.trim()) {
      inputErrorsNotify();
      return;
    }
    if (!description.trim()) {
      inputErrorsNotify();
      return;
    }
    if (!Number.isFinite(unitsNum) || unitsNum <= 0) {
      inputErrorsNotify();
      return;
    }
    if (!uom.trim()) {
      inputErrorsNotify();
      return;
    }
    if (!Number.isFinite(unitPriceNum) || unitPriceNum < 0) {
      inputErrorsNotify();
      return;
    }

    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const next: OrderItem = {
      id,
      supplierName: supplierName.trim(),
      sku: sku.trim(),
      description: description.trim(),
      itemLink: normalizeUrl(itemLink),
      units: unitsNum,
      uom: uom.trim(),
      unitPrice: unitPriceNum,
    };

    setItems((prev) => [next, ...prev]);
    resetForm();
    setOpen(false);
  };

  const handleSubmitOrder = () => {
    if (items.length === 0) return;

    startTransition(async () => {
      try {
        const { orderId } = await submitOrderAction(
          items.map((it) => ({
            supplierName: it.supplierName,
            sku: it.sku,
            description: it.description,
            itemLink: it.itemLink,
            units: it.units,
            uom: it.uom,
            unitPrice: it.unitPrice,
          }))
        );

        toast({
          title: "Order submitted",
          description: "Items will be delivered soon!",
        });
        setItems([]);
        router.push(`/dashboard`);
      } catch (e) {
        toast({
          title: "Submit failed",
          description: e instanceof Error ? e.message : "Unknown error",
          variant: "destructive",
        });
      }
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
                Add New Order
              </h1>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              onClick={() => setOpen(true)}
              className="rounded-2xl cursor-pointer"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Item
            </Button>

            <Button
              className="rounded-2xl cursor-pointer"
              variant={items.length === 0 ? "secondary" : "hero"}
              disabled={items.length === 0}
              onClick={() => setConfirmOpen(true)}
            >
              Submit Order
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
                  <TableHead>Supplier Name</TableHead>
                  <TableHead>SKU / Item #</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Item Link</TableHead>
                  <TableHead className="text-right"># Units</TableHead>
                  <TableHead>Unit of Measurement</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="w-[44px]" />
                </TableRow>
              </TableHeader>

              <TableBody>
                <AnimatePresence initial={false}>
                  {items.map((it) => (
                    <motion.tr
                      key={it.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="border-b border-border last:border-b-0"
                    >
                      <TableCell className="font-medium">
                        {it.supplierName}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {it.sku}
                      </TableCell>
                      <TableCell className="max-w-[340px]">
                        <p className="line-clamp-2 text-sm text-foreground">
                          {it.description}
                        </p>
                      </TableCell>
                      <TableCell>
                        {it.itemLink ? (
                          <a
                            href={it.itemLink}
                            target="_blank"
                            rel="noreferrer"
                            className={cn(
                              "inline-flex items-center gap-1 text-sm",
                              "text-muted-foreground hover:text-foreground transition"
                            )}
                          >
                            Open <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            —
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">{it.units}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {it.uom}
                      </TableCell>
                      <TableCell className="text-right">
                        {money(it.unitPrice)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-xl cursor-pointer hover:bg-red-300/40"
                          onClick={() => removeItem(it.id)}
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>

                {items.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="py-10 text-center">
                      <p className="text-sm text-muted-foreground">
                        No items yet. Click{" "}
                        <span className="font-medium">Add New Item</span> to
                        create your first line item.
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Footer summary */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Items:{" "}
              <span className="font-medium text-foreground">
                {items.length}
              </span>
            </p>
          </div>
        </motion.div>

        {/* Add Item Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[680px] rounded-3xl">
            <DialogHeader>
              <DialogTitle>Add New Item</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>
                  Supplier Name<span className="text-red-600">*</span>
                </Label>
                <Input
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  required
                  placeholder="e.g. Thermo Fisher"
                />
              </div>

              <div className="space-y-2">
                <Label>
                  SKU / Item Number<span className="text-red-600">*</span>
                </Label>
                <Input
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  required
                  placeholder="e.g. AB-12345"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>
                  Description<span className="text-red-600">*</span>
                </Label>
                <Textarea
                  value={description}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description of the item..."
                  className="min-h-[90px]"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>
                  Item Link<span className="text-red-600">*</span>
                </Label>
                <Input
                  value={itemLink}
                  onChange={(e) => setItemLink(e.target.value)}
                  required
                  placeholder="https://..."
                />
                <p className="text-xs text-muted-foreground">
                  Tip: If you paste without “https://”, we’ll add it
                  automatically.
                </p>
              </div>

              <div className="space-y-2">
                <Label>
                  # Units<span className="text-red-600">*</span>
                </Label>
                <Input
                  type="number"
                  inputMode="numeric"
                  required
                  min={1}
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  placeholder="1"
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Unit of Measurement<span className="text-red-600">*</span>
                </Label>
                <Input
                  value={uom}
                  onChange={(e) => setUom(e.target.value)}
                  required
                  placeholder="e.g. ea, box, pack, mL"
                />
              </div>

              <div className="space-y-2">
                <Label>Unit Price</Label>
                <Input
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  min={0}
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                  placeholder="e.g. 149.99"
                />
              </div>
            </div>

            <DialogFooter className="mt-2 gap-2 sm:gap-0">
              <Button
                variant="ghost"
                className="rounded-2xl cursor-pointer"
                onClick={() => {
                  resetForm();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>

              <Button
                className="rounded-2xl cursor-pointer"
                onClick={onAddItem}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Confirm Submit Modal */}
        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogContent className="sm:max-w-[520px] rounded-3xl">
            <DialogHeader>
              <DialogTitle>Submit this order?</DialogTitle>
            </DialogHeader>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                You’re about to submit{" "}
                <span className="font-medium text-foreground">
                  {items.length}
                </span>{" "}
                item{items.length === 1 ? "" : "s"}.
              </p>

              {/* Optional: total */}
              {/* <div className="rounded-2xl border border-border bg-background/60 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Estimated total</span>
                  <span className="font-medium text-foreground">
                    {money(
                      items.reduce(
                        (sum, it) => sum + it.units * it.unitPrice,
                        0
                      )
                    )}
                  </span>
                </div>
              </div> */}

              {/* <p className="text-xs text-muted-foreground">
                Please confirm you want to submit.
              </p> */}
            </div>

            <DialogFooter className="mt-2 gap-2 sm:gap-0">
              <Button
                variant="ghost"
                className="rounded-2xl cursor-pointer"
                disabled={isPending}
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </Button>

              <Button
                className="rounded-2xl cursor-pointer"
                disabled={items.length === 0 || isPending}
                onClick={() => {
                  setConfirmOpen(false);
                  handleSubmitOrder();
                }}
              >
                {isPending ? "Submitting..." : "Yes, submit"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
