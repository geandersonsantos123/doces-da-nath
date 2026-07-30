import type { FulfillmentMode, LeadTime } from "@/types/product";

export const CART_SCHEMA_VERSION = 2 as const;
export const ORDER_MIN_LEAD_DAYS = 5 as const;
export const ORDER_DATE_FUTURE_YEARS = 5 as const;
export const EXPECTED_CATALOG_PRODUCT_COUNT = 19 as const;
export const EXPECTED_BRIGADEIRO_PRODUCT_COUNT = 14 as const;
export const CATALOG_CURRENCY = "BRL" as const;
export const CATALOG_LOCALE = "pt-BR" as const;

export const ORDER_FULFILLMENT_MODES = [
  "pickup",
  "delivery",
] as const satisfies readonly FulfillmentMode[];

export const LEAD_TIME_TO_CONFIRM = {
  type: "confirm_on_whatsapp",
} as const satisfies LeadTime;
