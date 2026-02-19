"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Bookmark, Check, ExternalLink, Loader2, Package, Plus, Trash2, X } from "lucide-react";

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
import {
  type SavedProduct,
  saveProductAction,
  fetchSavedProductsAction,
} from "@/lib/saved-products/actions";
import { formatSlackNewOrder, money, normalizeUrl } from "@/lib/helpers";
import { notifySlack } from "@/app/actions/slack";

type OrderItem = {
  id: string;
  supplierName: string;
  sku: string;
  description: string;
  itemLink: string;
  units: number;
  uom: string;
  unitPrice: number;

  // Admin fields
  deliveredPrice: number | null;
  orderNumber: string | null;
  sdsLink: string | null;
  trackingLink: string | null;
  ordered: boolean;
};

type Payload = {
  items_amt: number;
  companyName: string;
  userName: string;
  url: string;
};

export default function NewCompanyOrder({
  companyName,
  companyId,
  username,
  app_admin,
}: {
  companyName: string;
  companyId: string | undefined;
  username: string;
  app_admin: boolean;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [items, setItems] = useState<OrderItem[]>([]);

  // Saved products modal state
  const [modalMode, setModalMode] = useState<"new" | "saved">("new");
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]);
  const [loadingSaved, setLoadingSaved] = useState(false);
  const [isSaving, startSaveTransition] = useTransition();

  // Modal form state
  const [supplierName, setSupplierName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [itemLink, setItemLink] = useState("");
  const [units, setUnits] = useState<string>("1");
  const [uom, setUom] = useState("");
  const [unitPrice, setUnitPrice] = useState<string>("");

  // Admin-only modal state
  const [deliveredPrice, setDeliveredPrice] = useState<string>("");
  const [sdsLink, setSdsLink] = useState<string>("");
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [trackingLink, setTrackingLink] = useState<string>("");
  const [markOrdered, setMarkOrdered] = useState<boolean>(false);

  const loadSavedProducts = async () => {
    if (loadingSaved) return;
    setLoadingSaved(true);
    try {
      const products = await fetchSavedProductsAction();
      setSavedProducts(products);
    } catch {
      toast({
        title: "Failed to load saved products",
        variant: "destructive",
      });
    } finally {
      setLoadingSaved(false);
    }
  };

  const onSaveItem = () => {
    const unitsNum = Number(units);
    if (!supplierName.trim())
      return inputErrorsNotify("Supplier name is required.");
    if (!sku.trim()) return inputErrorsNotify("SKU / Item number is required.");
    if (!description.trim())
      return inputErrorsNotify("Description is required.");
    if (!itemLink.trim()) return inputErrorsNotify("Item link is required.");
    if (!Number.isFinite(unitsNum) || unitsNum <= 0)
      return inputErrorsNotify("Units must be a number greater than 0.");
    if (!uom.trim())
      return inputErrorsNotify("Unit of measurement is required.");

    startSaveTransition(async () => {
      try {
        await saveProductAction({
          supplier_name: supplierName.trim(),
          item_number: sku.trim(),
          description: description.trim(),
          item_link: normalizeUrl(itemLink),
          units: unitsNum,
          unit_of_measure: uom.trim(),
          unit_price: unitPrice ? Number(unitPrice) : null,
        });
        toast({
          title: "Product saved!",
          description: "Available in your saved products.",
        });
      } catch (e) {
        toast({
          title: "Save failed",
          description: e instanceof Error ? e.message : "Unknown error",
          variant: "destructive",
        });
      }
    });
  };

  const addFromSaved = (p: SavedProduct) => {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const next: OrderItem = {
      id,
      supplierName: p.supplier_name,
      sku: p.item_number,
      description: p.description,
      itemLink: p.item_link,
      units: p.units,
      uom: p.unit_of_measure,
      unitPrice: p.unit_price ?? 0,
      deliveredPrice: null,
      sdsLink: null,
      orderNumber: null,
      trackingLink: null,
      ordered: false,
    };

    setItems((prev) => [next, ...prev]);
    setOpen(false);
    setModalMode("new");
  };

  const resetForm = () => {
    setSupplierName("");
    setSku("");
    setDescription("");
    setItemLink("");
    setUnits("1");
    setUom("");
    setUnitPrice("");

    setDeliveredPrice("");
    setSdsLink("");
    setOrderNumber("");
    setTrackingLink("");
    setMarkOrdered(false);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  const inputErrorsNotify = (msg = "Please fill out all required fields.") => {
    toast({
      title: "Input Error",
      description: msg,
      variant: "destructive",
    });
  };

  const onAddItem = () => {
    const unitsNum = Number(units);
    const unitPriceNum = Number(unitPrice);

    if (!supplierName.trim())
      return inputErrorsNotify("Supplier name is required.");
    if (!sku.trim()) return inputErrorsNotify("SKU / Item number is required.");
    if (!description.trim())
      return inputErrorsNotify("Description is required.");
    if (!itemLink.trim()) return inputErrorsNotify("Item link is required.");
    if (!Number.isFinite(unitsNum) || unitsNum <= 0)
      return inputErrorsNotify("Units must be a number greater than 0.");
    if (!uom.trim())
      return inputErrorsNotify("Unit of measurement is required.");
    if (!Number.isFinite(unitPriceNum) || unitPriceNum <= 0)
      return inputErrorsNotify("Unit price must be greater than 0.");

    // Admin: parse deliveredPrice if provided
    let deliveredPriceNum: number | null = null;

    if (app_admin) {
      if (deliveredPrice.trim() !== "") {
        const n = Number(deliveredPrice);
        if (!Number.isFinite(n) || n <= 0) {
          return inputErrorsNotify("Delivered price must be greater than 0.");
        }
        deliveredPriceNum = n;
      } else {
        return inputErrorsNotify("Delivered Price is required");
      }

      if (!sdsLink.trim()) return inputErrorsNotify("SDS link is required");
      if (!trackingLink.trim())
        return inputErrorsNotify("Tracking Link is required");
      if (!orderNumber.trim())
        return inputErrorsNotify("Order Number is required");
      if (markOrdered === false)
        return inputErrorsNotify("Ordered must be marked true");
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

      deliveredPrice: app_admin ? deliveredPriceNum : null,
      sdsLink: app_admin && sdsLink.trim() ? normalizeUrl(sdsLink) : null,
      trackingLink:
        app_admin && trackingLink.trim() ? normalizeUrl(trackingLink) : null,
      orderNumber: app_admin && orderNumber.trim() ? orderNumber.trim() : null,
      ordered: app_admin ? markOrdered : false,
    };

    setItems((prev) => [next, ...prev]);
    resetForm();
    setOpen(false);
  };

  const handleSubmitOrder = () => {
    if (items.length === 0) return;

    startTransition(async () => {
      try {
        console.log(companyId);
        const { orderId } = await submitOrderAction(
          items.map((it) => ({
            supplierName: it.supplierName,
            sku: it.sku,
            description: it.description,
            itemLink: it.itemLink,
            units: it.units,
            uom: it.uom,
            unitPrice: it.unitPrice,

            // include admin extras if your action supports them
            deliveredPrice: it.deliveredPrice,
            orderNumber: it.orderNumber,
            sdsLink: it.sdsLink,
            trackingLink: it.trackingLink,
            ordered: it.ordered,
          })),
          companyId
        );

        const origin =
          typeof window !== "undefined" ? window.location.origin : "";
        const payload: Payload = {
          items_amt: items.length,
          companyName,
          userName: username,
          url: `${origin}/orders/${orderId}`,
        };

        const slackText = formatSlackNewOrder(payload);

        await notifySlack(companyName, slackText);

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
    <div className="relative min-h-screen overflow-hidden bg-background pt-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_0%,#000_70%,transparent_115%)]" />
      <div className="absolute top-16 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-16 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="flex items-start gap-3">
            <Button
              type="button"
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
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-2xl cursor-pointer"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Item
            </Button>

            <Button
              type="button"
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
                          type="button"
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
        <Dialog
          open={open}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              resetForm();
              setModalMode("new");
            }
            setOpen(isOpen);
          }}
        >
          <DialogContent className="sm:max-w-[800px] rounded-3xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Item</DialogTitle>
            </DialogHeader>

            {/* Mode toggle — users only */}
            {!app_admin && (
              <div className="flex gap-1 p-1 bg-muted/30 rounded-xl border border-border/50">
                <button
                  type="button"
                  onClick={() => setModalMode("new")}
                  className={cn(
                    "flex-1 py-1.5 text-sm rounded-lg font-medium transition-colors cursor-pointer",
                    modalMode === "new"
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  New Item
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setModalMode("saved");
                    loadSavedProducts();
                  }}
                  className={cn(
                    "flex-1 py-1.5 text-sm rounded-lg font-medium transition-colors cursor-pointer",
                    modalMode === "saved"
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Saved Items
                </button>
              </div>
            )}

            {/* Saved Items list */}
            {modalMode === "saved" && (
              <div className="min-h-[200px]">
                {loadingSaved ? (
                  <div className="flex items-center justify-center py-16">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : savedProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                    <Package className="h-8 w-8 text-muted-foreground/40" />
                    <p className="text-sm text-muted-foreground">
                      No saved products yet. Fill in the form and click{" "}
                      <span className="font-medium">Save Item</span> to save one.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {savedProducts.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-start justify-between gap-3 rounded-xl border border-border bg-muted/20 px-4 py-3"
                      >
                        <div className="flex-1 min-w-0 space-y-0.5">
                          <p className="text-sm font-medium text-foreground truncate">
                            {p.supplier_name}{" "}
                            <span className="font-mono text-xs text-muted-foreground">
                              {p.item_number}
                            </span>
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {p.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {p.units} {p.unit_of_measure}
                            {p.unit_price != null
                              ? ` · ${money(p.unit_price)}`
                              : ""}
                          </p>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          className="rounded-xl shrink-0 cursor-pointer"
                          onClick={() => addFromSaved(p)}
                        >
                          <Plus className="mr-1.5 h-3.5 w-3.5" />
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* New Item form */}
            {modalMode === "new" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>
                  Supplier Name<span className="text-red-600">*</span>
                </Label>
                <Input
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
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
                  placeholder="e.g. AB-12345"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>
                  Description<span className="text-red-600">*</span>
                </Label>
                <Textarea
                  value={description}
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
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label>
                  # Units<span className="text-red-600">*</span>
                </Label>
                <Input
                  type="number"
                  inputMode="numeric"
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

              {app_admin && (
                <>
                  <div className="space-y-2">
                    <Label>Delivered Price (USD)</Label>
                    <Input
                      type="number"
                      inputMode="decimal"
                      step="0.01"
                      min={0}
                      value={deliveredPrice}
                      onChange={(e) => setDeliveredPrice(e.target.value)}
                      placeholder="e.g. 199.99"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>SDS Link</Label>
                    <Input
                      value={sdsLink}
                      onChange={(e) => setSdsLink(e.target.value)}
                      placeholder="link"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tracking Link</Label>
                    <Input
                      value={trackingLink}
                      onChange={(e) => setTrackingLink(e.target.value)}
                      placeholder="link"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Order Number</Label>
                    <Input
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      placeholder="order number"
                    />
                  </div>
                  <div className="space-y-2 flex justify-center items-center">
                    <Label className="pr-4">Ordered:</Label>
                    <Button
                      type="button"
                      variant="secondary"
                      className={cn(
                        "w-1/2 rounded-2xl justify-between cursor-pointer",
                        markOrdered
                          ? "bg-green-400/15 text-foreground"
                          : "bg-accent/15"
                      )}
                      onClick={() => setMarkOrdered((v) => !v)}
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
                  </div>
                </>
              )}
            </div>
            )}

            <DialogFooter className="mt-2 gap-2 sm:gap-0">
              <Button
                type="button"
                variant="ghost"
                className="rounded-2xl cursor-pointer"
                onClick={() => {
                  resetForm();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>

              {modalMode === "new" && (
                <>
                  {!app_admin && (
                    <Button
                      type="button"
                      variant="secondary"
                      className="rounded-2xl cursor-pointer"
                      disabled={isSaving}
                      onClick={onSaveItem}
                    >
                      <Bookmark className="mr-2 h-4 w-4" />
                      {isSaving ? "Saving..." : "Save Item"}
                    </Button>
                  )}

                  <Button
                    type="button"
                    className="rounded-2xl cursor-pointer"
                    onClick={onAddItem}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </>
              )}
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
            </div>

            <DialogFooter className="mt-2 gap-2 sm:gap-0">
              <Button
                type="button"
                variant="ghost"
                className="rounded-2xl cursor-pointer"
                disabled={isPending}
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="button"
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
