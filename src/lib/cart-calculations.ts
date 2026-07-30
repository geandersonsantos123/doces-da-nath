import { addCents, assertValidCents, multiplyCents } from "@/lib/money";
import type {
  CartItem,
  CartItemTotals,
  CartProductSnapshot,
  CartSelectedOption,
  CartVariantSnapshot,
} from "@/types/cart";
import type { CatalogProduct, ProductVariant } from "@/types/product";

function assertValidItemQuantity(quantity: number): void {
  if (!Number.isSafeInteger(quantity) || quantity <= 0) {
    throw new RangeError("A quantidade do item deve ser um inteiro positivo.");
  }
}

function normalizeNotes(notes: string): string {
  return notes.replaceAll("\r\n", "\n").trim();
}

function optionIdentity(option: CartSelectedOption): readonly unknown[] {
  return [
    option.groupId,
    option.type,
    option.optionId,
    option.value.trim(),
    option.priceModifierCents,
  ];
}

export function createCartProductSnapshot(
  product: CatalogProduct,
): CartProductSnapshot {
  let fixedPriceCents: number | null = null;

  if (product.pricing.type === "fixed") {
    fixedPriceCents = product.pricing.amountCents;
  } else if (product.pricing.type === "from") {
    fixedPriceCents = product.pricing.fromAmountCents;
  }

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    categoryId: product.categoryId,
    priceType: product.pricing.type,
    fixedPriceCents,
    image: product.images[0] ?? null,
    requiresWhatsAppConfirmation: product.requiresWhatsAppConfirmation,
  };
}

export function createCartVariantSnapshot(
  variant: ProductVariant,
): CartVariantSnapshot {
  return {
    id: variant.id,
    label: variant.label,
    priceCents: variant.priceCents,
    requiresPriceConfirmation: variant.requiresPriceConfirmation,
  };
}

export function calculateCartItemUnitPriceCents(item: CartItem): number {
  const basePriceCents =
    item.selectedVariant?.priceCents ?? item.product.fixedPriceCents;

  if (basePriceCents === null) {
    throw new Error(
      `O item ${item.productId} não possui preço resolvido para o carrinho.`,
    );
  }

  assertValidCents(basePriceCents);

  return addCents(
    basePriceCents,
    ...item.selectedOptions.map((option) => option.priceModifierCents),
  );
}

export function calculateCartItemTotals(item: CartItem): CartItemTotals {
  assertValidItemQuantity(item.quantity);
  const unitPriceCents = calculateCartItemUnitPriceCents(item);

  return {
    unitPriceCents,
    subtotalCents: multiplyCents(unitPriceCents, item.quantity),
  };
}

export function calculateCartSubtotalCents(
  items: readonly CartItem[],
): number {
  return addCents(
    ...items.map((item) => calculateCartItemTotals(item).subtotalCents),
  );
}

export function createCartItemIdentity(item: CartItem): string {
  const normalizedOptions = [...item.selectedOptions]
    .sort((left, right) => {
      const leftKey = JSON.stringify(optionIdentity(left));
      const rightKey = JSON.stringify(optionIdentity(right));
      return leftKey.localeCompare(rightKey);
    })
    .map(optionIdentity);

  return JSON.stringify([
    item.productId,
    item.selectedVariant?.id ?? null,
    normalizedOptions,
    normalizeNotes(item.notes),
  ]);
}

export function canGroupCartItems(
  left: CartItem,
  right: CartItem,
): boolean {
  return createCartItemIdentity(left) === createCartItemIdentity(right);
}

export function addOrGroupCartItem(
  items: readonly CartItem[],
  incomingItem: CartItem,
): readonly CartItem[] {
  assertValidItemQuantity(incomingItem.quantity);
  const matchingIndex = items.findIndex((item) =>
    canGroupCartItems(item, incomingItem),
  );

  if (matchingIndex === -1) {
    return [...items, incomingItem];
  }

  return items.map((item, index) => {
    if (index !== matchingIndex) {
      return item;
    }

    const quantity = item.quantity + incomingItem.quantity;
    assertValidItemQuantity(quantity);

    return { ...item, quantity };
  });
}
