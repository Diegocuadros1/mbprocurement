"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Package, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  type SavedProduct,
  deleteSavedProductAction,
} from "@/lib/saved-products/actions";
import { money } from "@/lib/helpers";

export default function ProductsPage({
  initialProducts,
}: {
  initialProducts: SavedProduct[];
}) {
  const { toast } = useToast();
  const [products, setProducts] = useState<SavedProduct[]>(initialProducts);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    setDeletingId(id);
    startTransition(async () => {
      try {
        await deleteSavedProductAction(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        toast({ title: "Product removed" });
      } catch (e) {
        toast({
          title: "Delete failed",
          description: e instanceof Error ? e.message : "Unknown error",
          variant: "destructive",
        });
      } finally {
        setDeletingId(null);
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
          className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <Package className="h-6 w-6 text-accent" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Saved Products
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Products you&apos;ve saved for quick reordering
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card */}
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
                  <TableHead>Supplier</TableHead>
                  <TableHead>Item #</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead className="text-right">Units</TableHead>
                  <TableHead>UOM</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="w-[44px]" />
                </TableRow>
              </TableHeader>

              <TableBody>
                <AnimatePresence initial={false}>
                  {products.map((p) => (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="border-b border-border last:border-b-0"
                    >
                      <TableCell className="font-medium">
                        {p.supplier_name}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {p.item_number}
                      </TableCell>
                      <TableCell className="max-w-[300px]">
                        <p className="line-clamp-2 text-sm text-foreground">
                          {p.description}
                        </p>
                      </TableCell>
                      <TableCell>
                        {p.item_link ? (
                          <a
                            href={p.item_link}
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
                      <TableCell className="text-right">{p.units}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {p.unit_of_measure}
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {p.unit_price != null ? money(p.unit_price) : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="rounded-xl cursor-pointer hover:bg-red-300/40"
                          disabled={deletingId === p.id}
                          onClick={() => handleDelete(p.id)}
                          aria-label="Delete product"
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>

                {products.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Package className="h-8 w-8 text-muted-foreground/40" />
                        <p className="text-sm text-muted-foreground">
                          No saved products yet. Use{" "}
                          <span className="font-medium">Save Item</span> when
                          creating an order to save products here.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              Products:{" "}
              <span className="font-medium text-foreground">
                {products.length}
              </span>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
