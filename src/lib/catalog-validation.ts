import {
  EXPECTED_BRIGADEIRO_PRODUCT_COUNT,
  EXPECTED_CATALOG_PRODUCT_COUNT,
} from "@/constants/commerce";
import { isValidCents } from "@/lib/money";
import type { CatalogCategory, CategoryId } from "@/types/category";
import type { CatalogProduct, ProductVariant } from "@/types/product";

export interface CatalogValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
}

const expectedCategories = [
  { id: "bolos", name: "Bolos" },
  { id: "brigadeiros-docinhos", name: "Brigadeiros e docinhos" },
  { id: "kits-festa", name: "Kits Festa" },
  {
    id: "caixas-produtos-individuais",
    name: "Caixas e produtos individuais",
  },
] as const satisfies readonly { id: CategoryId; name: string }[];

function duplicateValues(values: readonly string[]): readonly string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  }

  return [...duplicates];
}

function validateVariants(
  product: CatalogProduct,
  errors: string[],
): void {
  const duplicateVariantIds = duplicateValues(
    product.variants.map((variant) => variant.id),
  );

  for (const duplicateId of duplicateVariantIds) {
    errors.push(`${product.id}: variante duplicada ${duplicateId}.`);
  }

  for (const variant of product.variants) {
    if (!isValidCents(variant.priceCents)) {
      errors.push(`${product.id}/${variant.id}: preço inválido.`);
    }

    if (
      variant.unitCount !== undefined &&
      (!Number.isSafeInteger(variant.unitCount) || variant.unitCount <= 0)
    ) {
      errors.push(`${product.id}/${variant.id}: quantidade inválida.`);
    }

    if (
      variant.yield !== undefined &&
      (!Number.isSafeInteger(variant.yield.amount) || variant.yield.amount <= 0)
    ) {
      errors.push(`${product.id}/${variant.id}: rendimento inválido.`);
    }
  }
}

function validateOptionGroups(
  product: CatalogProduct,
  errors: string[],
): void {
  const duplicateGroupIds = duplicateValues(
    product.optionGroups.map((group) => group.id),
  );

  for (const duplicateId of duplicateGroupIds) {
    errors.push(`${product.id}: grupo de opções duplicado ${duplicateId}.`);
  }

  for (const group of product.optionGroups) {
    if (group.type !== "text" && group.options.length === 0) {
      errors.push(`${product.id}/${group.id}: opções de escolha estão vazias.`);
    }

    if (group.type === "text" && group.options.length > 0) {
      errors.push(`${product.id}/${group.id}: campo de texto não aceita opções.`);
    }

    if (group.type === "single" && group.maxSelections !== 1) {
      errors.push(`${product.id}/${group.id}: escolha única deve limitar a 1.`);
    }

    if (
      group.type === "multiple" &&
      (group.maxSelections === undefined || group.maxSelections <= 0)
    ) {
      errors.push(`${product.id}/${group.id}: limite múltiplo inválido.`);
    }

    const duplicateOptionIds = duplicateValues(
      group.options.map((option) => option.id),
    );

    for (const duplicateId of duplicateOptionIds) {
      errors.push(
        `${product.id}/${group.id}: opção duplicada ${duplicateId}.`,
      );
    }

    for (const option of group.options) {
      if (!isValidCents(option.priceModifierCents)) {
        errors.push(
          `${product.id}/${group.id}/${option.id}: modificador inválido.`,
        );
      }
    }
  }
}

function validatePricing(product: CatalogProduct, errors: string[]): void {
  switch (product.pricing.type) {
    case "fixed":
      if (!isValidCents(product.pricing.amountCents)) {
        errors.push(`${product.id}: preço fixo inválido.`);
      }
      break;
    case "from":
      if (!isValidCents(product.pricing.fromAmountCents)) {
        errors.push(`${product.id}: preço inicial inválido.`);
      }
      break;
    case "variant":
      if (product.variants.length === 0) {
        errors.push(`${product.id}: preço por variante sem variantes.`);
      }
      if (product.variantGroup?.required !== true) {
        errors.push(`${product.id}: grupo de variante obrigatório ausente.`);
      }
      break;
    case "quote":
      if (!product.pricing.requiresPriceConfirmation) {
        errors.push(`${product.id}: orçamento deve exigir confirmação.`);
      }
      break;
  }
}

function findVariant(
  variants: readonly ProductVariant[],
  id: string,
): ProductVariant | null {
  return variants.find((variant) => variant.id === id) ?? null;
}

function validateCustomCake(
  products: readonly CatalogProduct[],
  errors: string[],
): void {
  const cake = products.find((product) => product.id === "bolo-personalizado");

  if (cake === undefined) {
    errors.push("Bolo personalizado não foi cadastrado.");
    return;
  }

  const expectedVariants = [
    { id: "size-p", priceCents: 12500, yieldAmount: 10 },
    { id: "size-m", priceCents: 25000, yieldAmount: 20 },
    { id: "size-g", priceCents: 30000, yieldAmount: 30 },
  ] as const;

  if (cake.variants.length !== expectedVariants.length) {
    errors.push("Bolo personalizado deve ter exatamente três tamanhos.");
  }

  for (const expected of expectedVariants) {
    const variant = findVariant(cake.variants, expected.id);

    if (
      variant === null ||
      variant.priceCents !== expected.priceCents ||
      variant.yield?.amount !== expected.yieldAmount ||
      variant.yield.unit !== "slices"
    ) {
      errors.push(`Bolo personalizado: variante ${expected.id} inválida.`);
    }
  }

  const flavorGroup = cake.optionGroups.find(
    (group) => group.id === "cake-flavor",
  );

  if (
    flavorGroup === undefined ||
    flavorGroup.required !== true ||
    flavorGroup.type !== "single" ||
    flavorGroup.options.length !== 11
  ) {
    errors.push("Bolo personalizado deve exigir um dos 11 sabores reais.");
  }
}

function validateBrigadeiros(
  products: readonly CatalogProduct[],
  errors: string[],
): void {
  const brigadeiros = products.filter(
    (product) => product.categoryId === "brigadeiros-docinhos",
  );

  if (brigadeiros.length !== EXPECTED_BRIGADEIRO_PRODUCT_COUNT) {
    errors.push(
      `Esperados ${EXPECTED_BRIGADEIRO_PRODUCT_COUNT} brigadeiros/docinhos; encontrados ${brigadeiros.length}.`,
    );
  }

  for (const product of brigadeiros) {
    const unitCounts = product.variants
      .map((variant) => variant.unitCount)
      .sort((left, right) => Number(left) - Number(right));

    if (
      product.pricing.type !== "variant" ||
      product.variants.length !== 3 ||
      unitCounts[0] !== 25 ||
      unitCounts[1] !== 50 ||
      unitCounts[2] !== 100
    ) {
      errors.push(`${product.id}: deve possuir variantes de 25, 50 e 100.`);
    }
  }

  const nutella = products.find(
    (product) => product.id === "brigadeiro-ninho-nutella",
  );
  const hundredUnits = nutella
    ? findVariant(nutella.variants, "qty-100")
    : null;

  if (
    nutella === undefined ||
    nutella.pricing.type !== "variant" ||
    !nutella.pricing.requiresPriceConfirmation ||
    !nutella.pendingFields.includes("price_confirmation") ||
    hundredUnits?.priceCents !== 14500 ||
    hundredUnits.requiresPriceConfirmation !== true
  ) {
    errors.push(
      "Ninho com Nutella deve preservar R$ 145,00 em 100 unidades e marcar confirmação.",
    );
  }
}

export function validateCatalog(
  categories: readonly CatalogCategory[],
  products: readonly CatalogProduct[],
): CatalogValidationResult {
  const errors: string[] = [];

  if (categories.length !== expectedCategories.length) {
    errors.push("O catálogo deve possuir exatamente quatro categorias.");
  }

  for (const expected of expectedCategories) {
    const category = categories.find((item) => item.id === expected.id);
    if (category?.name !== expected.name) {
      errors.push(`Categoria ${expected.id} ausente ou com nome incorreto.`);
    }
  }

  for (const duplicateId of duplicateValues(
    categories.map((category) => category.id),
  )) {
    errors.push(`Categoria com ID duplicado: ${duplicateId}.`);
  }

  for (const duplicateSlug of duplicateValues(
    categories.map((category) => category.slug),
  )) {
    errors.push(`Categoria com slug duplicado: ${duplicateSlug}.`);
  }

  if (products.length !== EXPECTED_CATALOG_PRODUCT_COUNT) {
    errors.push(
      `Esperados ${EXPECTED_CATALOG_PRODUCT_COUNT} produtos; encontrados ${products.length}.`,
    );
  }

  const categoryIds = new Set(categories.map((category) => category.id));

  for (const duplicateId of duplicateValues(
    products.map((product) => product.id),
  )) {
    errors.push(`Produto com ID duplicado: ${duplicateId}.`);
  }

  for (const duplicateSlug of duplicateValues(
    products.map((product) => product.slug),
  )) {
    errors.push(`Produto com slug duplicado: ${duplicateSlug}.`);
  }

  for (const product of products) {
    if (!categoryIds.has(product.categoryId)) {
      errors.push(`${product.id}: categoria inválida ${product.categoryId}.`);
    }

    if (/pudim/i.test(product.name) || /pudim/i.test(product.slug)) {
      errors.push(`${product.id}: produto conceitual não permitido.`);
    }

    if (product.featured) {
      errors.push(`${product.id}: destaque ainda não foi confirmado.`);
    }

    if (!product.requiresWhatsAppConfirmation) {
      errors.push(`${product.id}: pedido deve exigir confirmação no WhatsApp.`);
    }

    for (const duplicatePendingField of duplicateValues(product.pendingFields)) {
      errors.push(
        `${product.id}: pendência duplicada ${duplicatePendingField}.`,
      );
    }

    validatePricing(product, errors);
    validateVariants(product, errors);
    validateOptionGroups(product, errors);
  }

  validateCustomCake(products, errors);
  validateBrigadeiros(products, errors);

  return { valid: errors.length === 0, errors };
}

export function assertCatalogIsValid(
  categories: readonly CatalogCategory[],
  products: readonly CatalogProduct[],
): void {
  const validation = validateCatalog(categories, products);

  if (!validation.valid) {
    throw new Error(`Catálogo inválido:\n${validation.errors.join("\n")}`);
  }
}
