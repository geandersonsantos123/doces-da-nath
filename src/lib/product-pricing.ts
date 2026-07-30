import { addCents } from "@/lib/money";
import type {
  CatalogProduct,
  MoneyCents,
  ProductVariant,
} from "@/types/product";

export interface SelectedPriceModifier {
  readonly priceModifierCents: MoneyCents;
}

export type PriceResolution =
  | {
      readonly status: "resolved";
      readonly basePriceCents: MoneyCents;
      readonly modifierTotalCents: MoneyCents;
      readonly unitPriceCents: MoneyCents;
      readonly isStartingPrice: boolean;
      readonly requiresPriceConfirmation: boolean;
    }
  | { readonly status: "variant_required" }
  | { readonly status: "variant_not_found" }
  | { readonly status: "quote_required" };

export function sumPriceModifiers(
  selections: readonly SelectedPriceModifier[],
): MoneyCents {
  return addCents(...selections.map((item) => item.priceModifierCents));
}

export function getProductStartingPriceCents(
  product: CatalogProduct,
): MoneyCents | null {
  switch (product.pricing.type) {
    case "fixed":
      return product.pricing.amountCents;
    case "from":
      return product.pricing.fromAmountCents;
    case "variant":
      return product.variants.length === 0
        ? null
        : Math.min(...product.variants.map((variant) => variant.priceCents));
    case "quote":
      return null;
  }
}

export function findProductVariant(
  product: CatalogProduct,
  variantId: string,
): ProductVariant | null {
  return product.variants.find((variant) => variant.id === variantId) ?? null;
}

export function resolveProductUnitPrice(
  product: CatalogProduct,
  variantId: string | null,
  selections: readonly SelectedPriceModifier[] = [],
): PriceResolution {
  const modifierTotalCents = sumPriceModifiers(selections);

  switch (product.pricing.type) {
    case "fixed": {
      return {
        status: "resolved",
        basePriceCents: product.pricing.amountCents,
        modifierTotalCents,
        unitPriceCents: addCents(
          product.pricing.amountCents,
          modifierTotalCents,
        ),
        isStartingPrice: false,
        requiresPriceConfirmation:
          product.pricing.requiresPriceConfirmation,
      };
    }
    case "from": {
      return {
        status: "resolved",
        basePriceCents: product.pricing.fromAmountCents,
        modifierTotalCents,
        unitPriceCents: addCents(
          product.pricing.fromAmountCents,
          modifierTotalCents,
        ),
        isStartingPrice: true,
        requiresPriceConfirmation:
          product.pricing.requiresPriceConfirmation,
      };
    }
    case "variant": {
      if (variantId === null) {
        return { status: "variant_required" };
      }

      const variant = findProductVariant(product, variantId);

      if (variant === null) {
        return { status: "variant_not_found" };
      }

      return {
        status: "resolved",
        basePriceCents: variant.priceCents,
        modifierTotalCents,
        unitPriceCents: addCents(variant.priceCents, modifierTotalCents),
        isStartingPrice: false,
        requiresPriceConfirmation:
          product.pricing.requiresPriceConfirmation ||
          variant.requiresPriceConfirmation,
      };
    }
    case "quote":
      return { status: "quote_required" };
  }
}
