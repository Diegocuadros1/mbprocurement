// Shared types for the ProcureWide ordering portal (new data model).

export type PwVendor = { key: string; name: string; logo: string | null };

export type PwProduct = {
  sku: string;
  name: string;
  vendor: string; // vendor key
  catalog_no: string | null;
  category: string | null;
  unit: string | null;
  price: number; // negotiated price
  list: number; // catalog list price
  lead: string | null;
  badges: string[];
  storage: string | null;
  // v19 — custom (non-catalog) item requests
  company_id?: string | null; // null = global catalog; set = company custom request
  pending?: boolean; // awaiting ProcureWide officialization
  estimated?: boolean; // price is a member estimate, not yet sourced
  link?: string | null;
  detail?: string | null;
};

export type PwCatOverride = { sku: string; category: string };

export type PwCartLine = { sku: string; qty: number };

export type PwInventoryRow = {
  id: string;
  company_id: string;
  sku: string;
  on_hand: number;
  reorder: number;
  lot: string | null;
  expiry: string | null;
  location: string | null;
};

export type PwOrder = {
  id: string;
  company_id: string;
  order_num: string;
  status: string;
  po: string | null;
  ship: string | null;
  notes: string | null;
  tracking: string | null;
  carrier: string | null;
  urgency: string | null;
  need_by: string | null;
  arrival: string | null;
  total: number;
  saved: number;
  created_by: string | null;
  created_at: string;
  pw_order_items?: PwOrderItem[];
};

export type PwOrderItem = {
  id: string;
  order_id: string;
  sku: string;
  name: string | null;
  vendor: string | null;
  qty: number;
  unit_price: number;
};

export type PwVendorSpend = { company_id: string; vendor: string; qtd_spend: number };

export type PwDocumentRow = {
  id: string;
  company_id: string | null;
  doc_type: string;
  name: string;
  description: string | null;
  file_ref: string | null;
  created_at: string;
};
