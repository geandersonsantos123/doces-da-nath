import type { CartItem } from "@/types/cart";

export type MetaPixelParameters = Record<string, unknown>;

export type MetaPixelEvent =
  | "AddToCart"
  | "Contact"
  | "CustomizeProduct"
  | "InitiateCheckout"
  | "Lead"
  | "ViewContent";

declare global {
  interface Window {
    fbq?: (
      command: "track",
      eventName: MetaPixelEvent,
      parameters?: MetaPixelParameters,
    ) => void;
  }
}

export function trackMetaPixelEvent(
  eventName: MetaPixelEvent,
  parameters?: MetaPixelParameters,
) {
  if (typeof window !== "undefined") {
    window.fbq?.("track", eventName, parameters);
  }
}

export function getMetaContents(items: readonly CartItem[]) {
  return items.map((item) => ({
    id: item.productId,
    quantity: item.quantity,
  }));
}
