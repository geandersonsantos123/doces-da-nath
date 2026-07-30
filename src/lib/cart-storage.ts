import { CART_SCHEMA_VERSION } from "@/constants/commerce";
import { isValidCents } from "@/lib/money";
import type {
  CartItem,
  CartOrderDetails,
  CartProductSnapshot,
  CartSelectedOption,
  CartState,
  CartVariantSnapshot,
} from "@/types/cart";
import type { ProductImage } from "@/types/product";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringOrNull(value: unknown): value is string | null {
  return typeof value === "string" || value === null;
}

function isProductImage(value: unknown): value is ProductImage {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.url === "string" &&
    typeof value.alt === "string" &&
    Number.isSafeInteger(value.width) &&
    Number(value.width) > 0 &&
    Number.isSafeInteger(value.height) &&
    Number(value.height) > 0
  );
}

function isCartProductSnapshot(value: unknown): value is CartProductSnapshot {
  if (!isRecord(value)) {
    return false;
  }

  const validPriceType =
    value.priceType === "fixed" ||
    value.priceType === "variant" ||
    value.priceType === "from" ||
    value.priceType === "quote";
  const validCategory =
    value.categoryId === "bolos" ||
    value.categoryId === "brigadeiros-docinhos" ||
    value.categoryId === "kits-festa" ||
    value.categoryId === "caixas-produtos-individuais";
  const validFixedPrice =
    value.fixedPriceCents === null ||
    (typeof value.fixedPriceCents === "number" &&
      isValidCents(value.fixedPriceCents));
  const validImage = value.image === null || isProductImage(value.image);

  return (
    typeof value.id === "string" &&
    typeof value.slug === "string" &&
    typeof value.name === "string" &&
    validCategory &&
    validPriceType &&
    validFixedPrice &&
    validImage &&
    typeof value.requiresWhatsAppConfirmation === "boolean"
  );
}

function isCartVariantSnapshot(value: unknown): value is CartVariantSnapshot {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.label === "string" &&
    typeof value.priceCents === "number" &&
    isValidCents(value.priceCents) &&
    typeof value.requiresPriceConfirmation === "boolean"
  );
}

function isCartSelectedOption(value: unknown): value is CartSelectedOption {
  if (!isRecord(value)) {
    return false;
  }

  const validType =
    value.type === "single" ||
    value.type === "multiple" ||
    value.type === "text";

  return (
    typeof value.groupId === "string" &&
    typeof value.groupLabel === "string" &&
    validType &&
    isStringOrNull(value.optionId) &&
    typeof value.value === "string" &&
    typeof value.priceModifierCents === "number" &&
    isValidCents(value.priceModifierCents)
  );
}

function isCartItem(value: unknown): value is CartItem {
  if (!isRecord(value)) {
    return false;
  }

  const validVariant =
    value.selectedVariant === null ||
    isCartVariantSnapshot(value.selectedVariant);

  return (
    typeof value.productId === "string" &&
    isCartProductSnapshot(value.product) &&
    value.productId === value.product.id &&
    validVariant &&
    Array.isArray(value.selectedOptions) &&
    value.selectedOptions.every(isCartSelectedOption) &&
    Number.isSafeInteger(value.quantity) &&
    Number(value.quantity) > 0 &&
    typeof value.notes === "string"
  );
}

function hasValidOrderFields(value: Record<string, unknown>): boolean {
  const validFulfillmentMode =
    value.fulfillmentMode === null ||
    value.fulfillmentMode === "delivery" ||
    value.fulfillmentMode === "pickup" ||
    value.fulfillmentMode === "arrange_on_whatsapp";

  return (
    validFulfillmentMode &&
    isStringOrNull(value.desiredDate) &&
    isStringOrNull(value.paymentMethodId) &&
    typeof value.notes === "string"
  );
}

function isCartOrderDetails(value: unknown): value is CartOrderDetails {
  if (!isRecord(value)) {
    return false;
  }

  return typeof value.customerName === "string" && hasValidOrderFields(value);
}

function isVersionOneCartState(
  value: unknown,
): value is Record<string, unknown> & {
  items: readonly CartItem[];
  order: Record<string, unknown> & Omit<CartOrderDetails, "customerName">;
} {
  return (
    isRecord(value) &&
    value.schemaVersion === 1 &&
    Array.isArray(value.items) &&
    value.items.every(isCartItem) &&
    isRecord(value.order) &&
    hasValidOrderFields(value.order)
  );
}

function migrateVersionOneCart(value: unknown): CartState | null {
  if (!isVersionOneCartState(value)) {
    return null;
  }

  return {
    schemaVersion: CART_SCHEMA_VERSION,
    items: value.items,
    order: {
      customerName: "",
      fulfillmentMode: value.order.fulfillmentMode,
      desiredDate: value.order.desiredDate,
      paymentMethodId: value.order.paymentMethodId,
      notes: value.order.notes,
    },
  };
}

export function createEmptyCartState(): CartState {
  return {
    schemaVersion: CART_SCHEMA_VERSION,
    items: [],
    order: {
      customerName: "",
      fulfillmentMode: null,
      desiredDate: null,
      paymentMethodId: null,
      notes: "",
    },
  };
}

export function isCompatibleCartState(value: unknown): value is CartState {
  return (
    isRecord(value) &&
    value.schemaVersion === CART_SCHEMA_VERSION &&
    Array.isArray(value.items) &&
    value.items.every(isCartItem) &&
    isCartOrderDetails(value.order)
  );
}

export function serializeCart(cart: CartState): string {
  if (!isCompatibleCartState(cart)) {
    throw new TypeError("O carrinho não possui uma estrutura serializável válida.");
  }

  return JSON.stringify(cart);
}

export function deserializeCart(serializedCart: string): CartState {
  try {
    const parsed: unknown = JSON.parse(serializedCart);

    if (isCompatibleCartState(parsed)) {
      return parsed;
    }

    return migrateVersionOneCart(parsed) ?? createEmptyCartState();
  } catch {
    return createEmptyCartState();
  }
}
