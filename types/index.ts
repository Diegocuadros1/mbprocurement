
export type OrderItemInput = {
  supplierName: string;
  sku: string; // maps to item_number
  description: string;
  itemLink: string; // maps to item_link
  units: number;
  uom: string; // maps to unit_of_measure
  unitPrice: number; // maps to unit_price
  deliveredPrice: number | null;
  sdsLink: string | null;
  orderNumber: string | null;
  trackingLink: string | null
  ordered: boolean
};

export type OrderItemRow = {
  id: string;
  order_id: string;
  supplier_name: string | null;
  item_number: string | null;
  description: string | null;
  item_link: string | null;
  units: any;
  unit_of_measure: string | null;
  unit_price: any;
  delivered_price: any;
  line_total: any;
  is_ordered: boolean | null;
  ordered_at: string | null;
  sds_link: string | null;
  order_number: string | null;
  tracking_link: string | null;
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

export type NormalizedOrder = OrderRow & {
    _dt: Date;
    _periodKey: string; // stable grouping key
    _periodLabel: string; // header label
    _periodStart: Date; // for sorting groups
  };

export type OrderItem = Order["order_items"][number];

export type ExportOrderItem = {
  id: string;
  order_id: string;

  supplier_name: string | null;
  item_number: string | null;
  description: string | null;
  item_link: string | null;

  units: any;
  unit_of_measure: string | null;
  unit_price: any;
  delivered_price: any;
  line_total: any;

  is_ordered: boolean | null;
  ordered_at: string | null;

  sds_link: string | null;
  order_number: string | null;
  tracking_link: string | null;
};
