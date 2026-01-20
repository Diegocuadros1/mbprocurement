// app/questionnaire/page.tsx
"use client";

import { useRef, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ClipboardList,
  ShieldCheck,
  Mail,
  ArrowRight,
  Plus,
  ExternalLink,
  Trash2,
} from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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

import { notifySlack } from "../actions/slack";
import {
  getPricingFormatSlackMessage,
  money,
  normalizeUrl,
} from "@/lib/helpers";

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

type QuestionnairePayload = {
  submittedAt: string;
  company: {
    legalName: string;
    contacts: string;
    comments?: string;
  };
  items: OrderItem[];
};

export default function QuestionnairePage() {
  const router = useRouter();
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement | null>(null);

  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<OrderItem[]>([]);

  const [, startTransition] = useTransition();

  // Add-item modal fields
  const [supplierName, setSupplierName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [itemLink, setItemLink] = useState("");
  const [units, setUnits] = useState<string>("1");
  const [uom, setUom] = useState("");
  const [unitPrice, setUnitPrice] = useState<string>("");

  // Contact section
  const [legalName, setLegalName] = useState("");
  const [contacts, setContacts] = useState("");
  const [comments, setComments] = useState("");

  const resetAddItemForm = () => {
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

  const inputErrorsNotify = (msg = "Please fill out all required fields.") => {
    toast({
      title: "Input Error",
      description: msg,
      variant: "destructive",
    });
  };

  const onAddItem = () => {
    const unitsNum = Number(units);
    const unitPriceNum = unitPrice === "" ? 0 : Number(unitPrice);

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
    if (!Number.isFinite(unitPriceNum) || unitPriceNum < 0)
      return inputErrorsNotify("Unit price must be 0 or greater.");

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
    resetAddItemForm();
    setOpen(false);
  };

  const onStart = () => {
    setStarted(true);
    setSubmitted(false);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  const validateBeforeSubmit = (): boolean => {
    if (items.length === 0) {
      inputErrorsNotify("Please add at least one item before submitting.");
      return false;
    }
    if (!legalName.trim()) {
      inputErrorsNotify("Legal name of company is required.");
      return false;
    }
    if (!contacts.trim()) {
      inputErrorsNotify("Contact person(s) & contact info is required.");
      return false;
    }
    return true;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;
    if (!validateBeforeSubmit()) return;

    setSaving(true);
    try {
      const payload: QuestionnairePayload = {
        submittedAt: new Date().toISOString(),
        company: {
          legalName: legalName.trim(),
          contacts: contacts.trim(),
          comments: comments.trim() || undefined,
        },
        items,
      };

      const slackText = getPricingFormatSlackMessage(payload);

      await notifySlack("pricing-Responses", slackText);

      toast({
        title: "Submitted!",
        description: "Thanks — we received your example order.",
      });

      setSubmitted(true);

      // Optional: scroll to top of form area after submit
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    } catch (err: any) {
      toast({
        title: "Submission failed",
        description:
          err?.message ?? "Something went wrong sending your submission.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <ClipboardList className="w-4 h-4" />
              Pricing
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Help us tailor procurement support{" "}
              <span className="text-accent">to your team</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Submit an example order with items that your company will need. We
              will email you with a returned cheaper price range.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <button
                type="button"
                onClick={onStart}
                className="inline-flex cursor-pointer items-center justify-center px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-xl hover:bg-accent/90 transition-colors"
              >
                Submit an example order
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>

              <div className="rounded-xl border border-border bg-card px-5 py-4 text-left">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  Confidential + founder-friendly
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 lg:py-24 bg-card" ref={formRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {!started ? (
                <motion.div
                  key="not-started"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl border border-border bg-background/40 p-8 shadow-soft"
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Ready when you are.
                  </h2>
                  <p className="mt-3 text-muted-foreground">
                    Click{" "}
                    <span className="text-foreground font-semibold">
                      Submit an example order
                    </span>{" "}
                    to reveal the form. You can submit once finished.
                  </p>
                </motion.div>
              ) : submitted ? (
                <motion.div
                  key="submitted"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl border border-accent/20 bg-background/40 p-8 shadow-soft"
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-accent text-sm font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    Submitted
                  </div>

                  <h2 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
                    Thank you — we’ve got your responses.
                  </h2>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors"
                    >
                      Contact Us
                      <Mail className="ml-2 w-4 h-4" />
                    </Link>

                    <Link
                      type="button"
                      href="/"
                      className="inline-flex items-center cursor-pointer justify-center px-6 py-3 rounded-xl border border-border bg-card text-foreground font-semibold hover:border-accent/30 transition-colors"
                    >
                      Done
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmitOrder}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-8"
                >
                  {/* Section: Items */}
                  <div className="rounded-2xl border border-border bg-background/40 p-8 shadow-soft">
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, ease: "easeOut" }}
                      className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-center"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Button
                          type="button"
                          onClick={() => setOpen(true)}
                          className="rounded-2xl cursor-pointer"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add New Item
                        </Button>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="w-full rounded-3xl border border-border bg-card/60 p-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/40 sm:p-4"
                    >
                      <div className="rounded-2xl border border-border bg-background/60 overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-card/40">
                              <TableHead>Supplier Name</TableHead>
                              <TableHead>SKU / Item #</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead>Item Link</TableHead>
                              <TableHead className="text-right">
                                # Units
                              </TableHead>
                              <TableHead>Unit of Measurement</TableHead>
                              <TableHead className="text-right">
                                Unit Price
                              </TableHead>
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
                                  transition={{
                                    duration: 0.2,
                                    ease: "easeOut",
                                  }}
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
                                        Open{" "}
                                        <ExternalLink className="h-3.5 w-3.5" />
                                      </a>
                                    ) : (
                                      <span className="text-sm text-muted-foreground">
                                        —
                                      </span>
                                    )}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {it.units}
                                  </TableCell>
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
                                <TableCell
                                  colSpan={9}
                                  className="py-10 text-center"
                                >
                                  <p className="text-sm text-muted-foreground">
                                    No items yet. Click{" "}
                                    <span className="font-medium">
                                      Add New Item
                                    </span>{" "}
                                    to create your first line item.
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
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogContent className="sm:max-w-[680px] rounded-3xl">
                        <DialogHeader>
                          <DialogTitle>Add New Item</DialogTitle>
                        </DialogHeader>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label>
                              Supplier Name{" "}
                              <span className="text-red-600">*</span>
                            </Label>
                            <Input
                              value={supplierName}
                              onChange={(e) => setSupplierName(e.target.value)}
                              placeholder="e.g. Thermo Fisher"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>
                              SKU / Item Number{" "}
                              <span className="text-red-600">*</span>
                            </Label>
                            <Input
                              value={sku}
                              onChange={(e) => setSku(e.target.value)}
                              placeholder="e.g. AB-12345"
                            />
                          </div>

                          <div className="space-y-2 sm:col-span-2">
                            <Label>
                              Description{" "}
                              <span className="text-red-600">*</span>
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
                              Item Link <span className="text-red-600">*</span>
                            </Label>
                            <Input
                              value={itemLink}
                              onChange={(e) => setItemLink(e.target.value)}
                              placeholder="https://..."
                            />
                            <p className="text-xs text-muted-foreground">
                              Tip: If you paste without “https://”, we’ll add it
                              automatically.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label>
                              # Units <span className="text-red-600">*</span>
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
                              Unit of Measurement{" "}
                              <span className="text-red-600">*</span>
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
                        </div>

                        <DialogFooter className="mt-2 gap-2 sm:gap-0">
                          <Button
                            type="button"
                            variant="ghost"
                            className="rounded-2xl cursor-pointer"
                            onClick={() => {
                              resetAddItemForm();
                              setOpen(false);
                            }}
                          >
                            Cancel
                          </Button>

                          <Button
                            type="button"
                            className="rounded-2xl cursor-pointer"
                            onClick={onAddItem}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Item
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Section: Contact info */}
                  <div className="rounded-2xl border border-border bg-background/40 p-8 shadow-soft">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      Contact
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      Give us some contact information so that we can reach you
                      back.
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Legal name of company{" "}
                          <span className="text-red-600">*</span>
                        </label>
                        <input
                          value={legalName}
                          onChange={(e) => setLegalName(e.target.value)}
                          placeholder="Your company legal name"
                          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
                        />
                      </div>

                      <div className="mt-5">
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Contact Person(s) & Contact Info{" "}
                          <span className="text-red-600">*</span>
                        </label>
                        <textarea
                          value={contacts}
                          onChange={(e) => setContacts(e.target.value)}
                          rows={4}
                          placeholder="Name, email, phone (add multiple if needed)"
                          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
                        />
                      </div>

                      <div className="mt-5">
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Any Extra Comments you might have
                        </label>
                        <textarea
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                          rows={4}
                          placeholder="Anything else we should know?"
                          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setStarted(false);
                        setSubmitted(false);
                      }}
                      className="inline-flex cursor-pointer items-center justify-center px-6 py-3 rounded-xl border border-border bg-card text-foreground font-semibold hover:border-accent/30 transition-colors"
                    >
                      Hide Questionnaire
                    </button>

                    <button
                      type="submit"
                      disabled={saving}
                      className={`inline-flex items-center cursor-pointer justify-center px-8 py-4 rounded-xl font-semibold transition-colors
                        ${
                          saving
                            ? "bg-muted text-muted-foreground cursor-not-allowed"
                            : "bg-accent text-accent-foreground hover:bg-accent/90"
                        }`}
                    >
                      {saving ? "Submitting..." : "Submit Response"}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
