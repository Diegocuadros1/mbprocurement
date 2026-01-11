
export type OrderItemInput = {
  supplierName: string;
  sku: string; // maps to item_number
  description: string;
  itemLink: string; // maps to item_link
  units: number;
  uom: string; // maps to unit_of_measure
  unitPrice: number; // maps to unit_price
};


export type OrderRow = {
  id: string;
  company_id: string;
  order_date: string; // "YYYY-MM-DD"
  order_time: string; // "HH:MM:SS.ssssss"
  is_placed: boolean;
  placed_at: string | null; // ISO timestamp or null
  total_cost: string | null;
  created_at: string;
};


export type Order = {
  id: string;
  company_id: string;
  order_date: string; // "YYYY-MM-DD"
  order_time: string; // "HH:MM:SS.ssssss"
  is_placed: boolean;
  placed_at: string | null; // ISO timestamp or null
  total_cost: string | null;
  created_at: string;
  order_items: {
    id: string;
    supplier_name: string;
    item_number: string;
    description: string;
    item_link: string;
    units: number;
    unit_of_measure: string;
    unit_price: number;
    is_ordered: boolean;
    ordered_at: string | null; // ISO timestamp or null
    line_total: string | null;
    delivered_price: number | null;
    sds_link: string | null;
    order_number: string | null;
    tracking_link: string | null;
  }[];
};

export type OrderItem = Order["order_items"][number];
