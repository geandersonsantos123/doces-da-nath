import {
  calculateCartItemUnitPriceCents,
  createCartItemIdentity,
} from "@/lib/cart-calculations";
import { addCents, multiplyCents } from "@/lib/money";
import { resolveProductUnitPrice } from "@/lib/product-pricing";
import type { CartItem } from "@/types/cart";
import type {
  CatalogProduct,
  ProductOptionGroup,
  ProductVariant,
} from "@/types/product";

export type ReconciliationIssueType =
  | "invalid_item"
  | "price_changed";

export type CartReconciliationIssue = {
  readonly type: ReconciliationIssueType;
  readonly identity: string;
  readonly productName: string;
  readonly message: string;
  readonly storedUnitPriceCents?: number;
  readonly currentUnitPriceCents?: number;
};

export type ReconciledCartOption = {
  readonly groupLabel: string;
  readonly value: string;
  readonly priceModifierCents: number;
};

export type ReconciledCartLine = {
  readonly identity: string;
  readonly item: CartItem;
  readonly product: CatalogProduct;
  readonly variant: ProductVariant | null;
  readonly options: readonly ReconciledCartOption[];
  readonly unitPriceCents: number;
  readonly subtotalCents: number;
  readonly requiresPriceConfirmation: boolean;
  readonly requiresDetailsConfirmation: boolean;
};

export type CartReconciliationResult = {
  readonly status: "valid" | "blocked";
  readonly lines: readonly ReconciledCartLine[];
  readonly issues: readonly CartReconciliationIssue[];
  readonly subtotalCents: number;
};

const NON_DETAIL_CONFIRMATION_FIELDS = new Set([
  "lead_time",
  "fulfillment_details",
  "price_confirmation",
]);

const RETIRED_OPTION_GROUPS_BY_PRODUCT = new Map<string, ReadonlySet<string>>([
  ["bolo-personalizado", new Set(["personalized-message"])],
  ["bento-cake", new Set(["personalized-message"])],
]);

function invalidIssue(
  item: CartItem,
  identity: string,
  detail: string,
): CartReconciliationIssue {
  return {
    type: "invalid_item",
    identity,
    productName: item.product.name,
    message: `${item.product.name}: ${detail} Remova e configure o item novamente.`,
  };
}

function findCurrentVariant(
  item: CartItem,
  product: CatalogProduct,
): ProductVariant | null {
  if (item.selectedVariant === null) {
    return null;
  }

  return (
    product.variants.find(
      (variant) => variant.id === item.selectedVariant?.id,
    ) ?? null
  );
}

function reconcileSelectedOptions(
  item: CartItem,
  product: CatalogProduct,
):
  | { readonly isValid: true; readonly options: readonly ReconciledCartOption[] }
  | { readonly isValid: false; readonly detail: string } {
  const options: ReconciledCartOption[] = [];

  for (const selectedOption of item.selectedOptions) {
    const group = product.optionGroups.find(
      (candidate) => candidate.id === selectedOption.groupId,
    );

    if (!group || group.type !== selectedOption.type) {
      if (
        RETIRED_OPTION_GROUPS_BY_PRODUCT.get(product.id)?.has(
          selectedOption.groupId,
        ) &&
        selectedOption.priceModifierCents === 0
      ) {
        continue;
      }

      return {
        isValid: false,
        detail: `a opção “${selectedOption.groupLabel}” não existe mais.`,
      };
    }

    if (group.type === "text") {
      if (!selectedOption.value.trim()) {
        return { isValid: false, detail: `a opção “${group.label}” está vazia.` };
      }

      options.push({
        groupLabel: group.label,
        value: selectedOption.value.trim(),
        priceModifierCents: 0,
      });
      continue;
    }

    const currentOption = group.options.find(
      (candidate) => candidate.id === selectedOption.optionId,
    );

    if (!currentOption) {
      return {
        isValid: false,
        detail: `uma escolha de “${group.label}” não existe mais.`,
      };
    }

    options.push({
      groupLabel: group.label,
      value: currentOption.label,
      priceModifierCents: currentOption.priceModifierCents,
    });
  }

  for (const group of product.optionGroups) {
    const selections = item.selectedOptions.filter(
      (selectedOption) => selectedOption.groupId === group.id,
    );
    const hasValidSelection =
      group.type === "text"
        ? selections.some((selection) => selection.value.trim().length > 0)
        : selections.length > 0;

    if (group.required && !hasValidSelection) {
      return {
        isValid: false,
        detail: `a escolha obrigatória “${group.label}” está ausente.`,
      };
    }

    if (
      (group.type === "single" || group.type === "text") &&
      selections.length > 1
    ) {
      return {
        isValid: false,
        detail: `a escolha “${group.label}” possui valores incompatíveis.`,
      };
    }

    if (
      group.type === "multiple" &&
      group.maxSelections !== undefined &&
      selections.length > group.maxSelections
    ) {
      return {
        isValid: false,
        detail: `a escolha “${group.label}” excede o limite atual.`,
      };
    }

    if (
      group.type === "multiple" &&
      new Set(selections.map((selection) => selection.optionId)).size !==
        selections.length
    ) {
      return {
        isValid: false,
        detail: `a escolha “${group.label}” possui valores duplicados.`,
      };
    }
  }

  return { isValid: true, options };
}

function hasSpecificConfirmation(group: ProductOptionGroup): boolean {
  return group.requiresConfirmation;
}

export function reconcileCartItems(
  items: readonly CartItem[],
  catalog: readonly CatalogProduct[],
): CartReconciliationResult {
  const lines: ReconciledCartLine[] = [];
  const issues: CartReconciliationIssue[] = [];

  for (const item of items) {
    const identity = createCartItemIdentity(item);
    const product = catalog.find((candidate) => candidate.id === item.productId);

    if (!product) {
      issues.push(
        invalidIssue(item, identity, "este produto não está mais no cardápio."),
      );
      continue;
    }

    if (
      product.availability === "hidden" ||
      product.availability === "temporarily_unavailable"
    ) {
      issues.push(
        invalidIssue(item, identity, "este produto não está disponível agora."),
      );
      continue;
    }

    const variant = findCurrentVariant(item, product);

    if (product.pricing.type === "variant" && variant === null) {
      issues.push(
        invalidIssue(item, identity, "a variante selecionada não existe mais."),
      );
      continue;
    }

    const reconciledOptions = reconcileSelectedOptions(item, product);

    if (!reconciledOptions.isValid) {
      issues.push(invalidIssue(item, identity, reconciledOptions.detail));
      continue;
    }

    const priceResolution = resolveProductUnitPrice(
      product,
      variant?.id ?? null,
      reconciledOptions.options,
    );

    if (priceResolution.status !== "resolved") {
      issues.push(
        invalidIssue(item, identity, "o preço atual não pôde ser confirmado."),
      );
      continue;
    }

    let storedUnitPriceCents: number;

    try {
      storedUnitPriceCents = calculateCartItemUnitPriceCents(item);
    } catch {
      issues.push(
        invalidIssue(item, identity, "o preço salvo não é mais válido."),
      );
      continue;
    }

    if (storedUnitPriceCents !== priceResolution.unitPriceCents) {
      issues.push({
        type: "price_changed",
        identity,
        productName: product.name,
        message: `${product.name}: o preço salvo difere do cardápio atual. Revise e configure o item novamente.`,
        storedUnitPriceCents,
        currentUnitPriceCents: priceResolution.unitPriceCents,
      });
      continue;
    }

    lines.push({
      identity,
      item,
      product,
      variant,
      options: reconciledOptions.options,
      unitPriceCents: priceResolution.unitPriceCents,
      subtotalCents: multiplyCents(
        priceResolution.unitPriceCents,
        item.quantity,
      ),
      requiresPriceConfirmation: priceResolution.requiresPriceConfirmation,
      requiresDetailsConfirmation:
        product.customization.status !== "not_available" ||
        product.optionGroups.some(hasSpecificConfirmation) ||
        product.pendingFields.some(
          (field) => !NON_DETAIL_CONFIRMATION_FIELDS.has(field),
        ),
    });
  }

  return {
    status: issues.length === 0 ? "valid" : "blocked",
    lines,
    issues,
    subtotalCents: addCents(...lines.map((line) => line.subtotalCents)),
  };
}
