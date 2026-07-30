import {
  LEAD_TIME_TO_CONFIRM,
  ORDER_FULFILLMENT_MODES,
} from "@/constants/commerce";
import type {
  CatalogProduct,
  MoneyCents,
  PendingField,
  ProductImage,
  ProductOption,
  ProductVariant,
} from "@/types/product";

const NO_IMAGES = [] as const;
const NO_OPTIONS = [] as const;
const NO_VARIANTS = [] as const;
const NO_CONTENTS = [] as const;
const NO_SPECIFICATIONS = [] as const;

function createProductImage(
  id: string,
  url: string,
  alt: string,
): ProductImage {
  return {
    id,
    url,
    alt,
    width: 1122,
    height: 1402,
  };
}

const BASE_PENDING_FIELDS = [
  "lead_time",
  "fulfillment_details",
] as const satisfies readonly PendingField[];

const cakeFlavorOptions = [
  { id: "chocolate-50", label: "Chocolate 50%", priceModifierCents: 0 },
  {
    id: "chocolate-morango-fruta",
    label: "Chocolate com morango — fruta",
    priceModifierCents: 0,
  },
  {
    id: "brigadeiro-leite-ninho",
    label: "Brigadeiro de Leite Ninho",
    priceModifierCents: 0,
  },
  {
    id: "brigadeiro-morango",
    label: "Brigadeiro de morango",
    priceModifierCents: 0,
  },
  {
    id: "ninho-nutella",
    label: "Ninho com Nutella",
    priceModifierCents: 0,
  },
  {
    id: "brigadeiro-doce-leite",
    label: "Brigadeiro de doce de leite",
    priceModifierCents: 0,
  },
  {
    id: "brigadeiro-maracuja",
    label: "Brigadeiro de maracujá",
    priceModifierCents: 0,
  },
  { id: "prestigio", label: "Prestígio", priceModifierCents: 0 },
  {
    id: "abacaxi-coco",
    label: "Abacaxi com coco",
    priceModifierCents: 0,
  },
  { id: "ferrero", label: "Ferrero", priceModifierCents: 0 },
  {
    id: "brigadeiro-ninho-morango-fruta",
    label: "Brigadeiro de Ninho com morango — fruta",
    priceModifierCents: 0,
  },
] as const satisfies readonly ProductOption[];

const customCake: CatalogProduct = {
  id: "bolo-personalizado",
  slug: "bolo-personalizado",
  name: "Bolo personalizado",
  categoryId: "bolos",
  shortDescription:
    "Bolo artesanal personalizado para celebrar cada ocasião.",
  fullDescription:
    "Bolo artesanal personalizado, preparado com massa, recheio e acabamento escolhidos para cada ocasião.",
  images: [
    createProductImage(
      "bolo-personalizado",
      "/assets/cloudinary/01-bolo-personalizado_wrlyw9.webp",
      "Bolo personalizado artesanal com quatro estilos de decoração",
    ),
  ],
  pricing: {
    type: "variant",
    requiresPriceConfirmation: false,
  },
  variantGroup: {
    id: "size",
    label: "Tamanho",
    required: true,
  },
  variants: [
    {
      id: "size-p",
      label: "P",
      priceCents: 12500,
      yield: { amount: 10, unit: "slices", approximate: true },
      requiresPriceConfirmation: false,
    },
    {
      id: "size-m",
      label: "M",
      priceCents: 25000,
      yield: { amount: 28, unit: "slices", approximate: true },
      requiresPriceConfirmation: false,
    },
    {
      id: "size-g",
      label: "G",
      priceCents: 30000,
      yield: { amount: 42, unit: "slices", approximate: true },
      requiresPriceConfirmation: false,
    },
  ],
  optionGroups: [
    {
      id: "cake-flavor",
      label: "Sabor",
      type: "single",
      required: true,
      options: cakeFlavorOptions,
      maxSelections: 1,
      requiresConfirmation: false,
    },
    {
      id: "occasion-details",
      label: "Ocasião e detalhes da decoração",
      type: "text",
      required: false,
      options: NO_OPTIONS,
      requiresConfirmation: true,
    },
    {
      id: "personalized-message",
      label: "Mensagem personalizada",
      type: "text",
      required: false,
      options: NO_OPTIONS,
      requiresConfirmation: true,
    },
    {
      id: "color-preferences",
      label: "Preferências de cores",
      type: "text",
      required: false,
      options: NO_OPTIONS,
      requiresConfirmation: true,
    },
  ],
  availability: "made_to_order",
  leadTime: LEAD_TIME_TO_CONFIRM,
  allowsNotes: true,
  customization: {
    status: "available_with_confirmation",
    hasAutomaticPrice: false,
  },
  fulfillmentModes: ORDER_FULFILLMENT_MODES,
  featured: false,
  pendingFields: [
    ...BASE_PENDING_FIELDS,
    "cake_flavor_limit",
    "customization_pricing",
  ],
  requiresWhatsAppConfirmation: true,
  contents: NO_CONTENTS,
  specifications: NO_SPECIFICATIONS,
};

interface BrigadeiroDefinition {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly shortDescription: string;
  readonly fullDescription: string;
  readonly image?: ProductImage;
  readonly prices: readonly [MoneyCents, MoneyCents, MoneyCents];
  readonly confirmHundredPrice?: boolean;
}

function createQuantityVariants(
  prices: readonly [MoneyCents, MoneyCents, MoneyCents],
  confirmHundredPrice = false,
): readonly ProductVariant[] {
  return [
    {
      id: "qty-25",
      label: "25 unidades",
      priceCents: prices[0],
      unitCount: 25,
      requiresPriceConfirmation: false,
    },
    {
      id: "qty-50",
      label: "50 unidades",
      priceCents: prices[1],
      unitCount: 50,
      requiresPriceConfirmation: false,
    },
    {
      id: "qty-100",
      label: "100 unidades",
      priceCents: prices[2],
      unitCount: 100,
      requiresPriceConfirmation: confirmHundredPrice,
    },
  ];
}

function createBrigadeiroProduct(
  definition: BrigadeiroDefinition,
): CatalogProduct {
  const requiresPriceConfirmation = definition.confirmHundredPrice === true;

  return {
    id: definition.id,
    slug: definition.slug,
    name: definition.name,
    categoryId: "brigadeiros-docinhos",
    shortDescription: definition.shortDescription,
    fullDescription: definition.fullDescription,
    images: definition.image ? [definition.image] : NO_IMAGES,
    pricing: {
      type: "variant",
      requiresPriceConfirmation,
    },
    variantGroup: {
      id: "quantity",
      label: "Quantidade",
      required: true,
    },
    variants: createQuantityVariants(
      definition.prices,
      requiresPriceConfirmation,
    ),
    optionGroups: NO_OPTIONS,
    availability: "made_to_order",
    leadTime: LEAD_TIME_TO_CONFIRM,
    minimumOrderUnits: 25,
    allowsNotes: true,
    customization: {
      status: "not_available",
      hasAutomaticPrice: false,
    },
    fulfillmentModes: ORDER_FULFILLMENT_MODES,
    featured: false,
    pendingFields: requiresPriceConfirmation
      ? [...BASE_PENDING_FIELDS, "price_confirmation"]
      : BASE_PENDING_FIELDS,
    requiresWhatsAppConfirmation: true,
    contents: NO_CONTENTS,
    specifications: NO_SPECIFICATIONS,
  };
}

const brigadeiroDefinitions = [
  {
    id: "brigadeiro-chocolate-50",
    slug: "brigadeiro-chocolate-50",
    name: "Brigadeiro de Chocolate 50%",
    shortDescription: "Brigadeiro artesanal com chocolate 50%.",
    fullDescription: "Brigadeiro artesanal preparado com chocolate 50%.",
    image: createProductImage(
      "brigadeiro-chocolate-50",
      "/assets/cloudinary/06-brigadeiro-chocolate-50_sexam1.webp",
      "Brigadeiros artesanais de chocolate 50% com granulado de chocolate",
    ),
    prices: [4500, 8500, 16500],
  },
  {
    id: "brigadeiro-ninho-nutella",
    slug: "brigadeiro-ninho-nutella",
    name: "Brigadeiro de Ninho com Nutella",
    shortDescription: "Brigadeiro de Leite Ninho com Nutella.",
    fullDescription:
      "Brigadeiro de Leite Ninho com recheio ou finalização de Nutella.",
    prices: [5000, 9500, 14500],
    confirmHundredPrice: true,
  },
  {
    id: "brigadeiro-limao",
    slug: "brigadeiro-limao",
    name: "Brigadeiro de Limão",
    shortDescription: "Brigadeiro artesanal com sabor de limão.",
    fullDescription: "Brigadeiro artesanal com sabor de limão.",
    image: createProductImage(
      "brigadeiro-limao",
      "/assets/cloudinary/11-brigadeiro-lim-o_hldzqc.webp",
      "Brigadeiros de limão finalizados com raspas de limão",
    ),
    prices: [4000, 7500, 13500],
  },
  {
    id: "brigadeiro-ninho",
    slug: "brigadeiro-ninho",
    name: "Brigadeiro de Ninho",
    shortDescription: "Brigadeiro artesanal preparado com Leite Ninho.",
    fullDescription: "Brigadeiro artesanal preparado com Leite Ninho.",
    prices: [4000, 7500, 13500],
  },
  {
    id: "beijinho-coco",
    slug: "beijinho-coco",
    name: "Beijinho de coco",
    shortDescription: "Docinho artesanal de coco no estilo tradicional.",
    fullDescription: "Docinho artesanal de coco no estilo tradicional.",
    image: createProductImage(
      "beijinho-coco",
      "/assets/cloudinary/10-beijinho-coco_l8nckg.webp",
      "Beijinhos de coco artesanais com cobertura branca",
    ),
    prices: [4500, 8500, 16500],
  },
  {
    id: "brigadeiro-churros",
    slug: "brigadeiro-churros",
    name: "Brigadeiro de Churros",
    shortDescription: "Brigadeiro artesanal inspirado no sabor de churros.",
    fullDescription: "Brigadeiro artesanal inspirado no sabor de churros.",
    image: createProductImage(
      "brigadeiro-churros",
      "/assets/cloudinary/12-brigadeiro-churros_vyeftq.webp",
      "Brigadeiros de churros com doce de leite e canela",
    ),
    prices: [5000, 9500, 18500],
  },
  {
    id: "casadinho",
    slug: "casadinho",
    name: "Casadinho",
    shortDescription: "Combinação de brigadeiro de chocolate e branco.",
    fullDescription:
      "Docinho artesanal que combina brigadeiro de chocolate e brigadeiro branco.",
    image: createProductImage(
      "casadinho",
      "/assets/cloudinary/13-brigadeiro-casadinho_se9grr.webp",
      "Casadinhos artesanais de brigadeiro branco e chocolate",
    ),
    prices: [4000, 7500, 13500],
  },
  {
    id: "brigadeiro-ferrero",
    slug: "brigadeiro-ferrero",
    name: "Brigadeiro Ferrero",
    shortDescription: "Brigadeiro artesanal inspirado no sabor Ferrero.",
    fullDescription: "Brigadeiro artesanal inspirado no sabor Ferrero.",
    image: createProductImage(
      "brigadeiro-ferrero",
      "/assets/cloudinary/08-brigadeiro-ferrero_sysopa.webp",
      "Brigadeiros Ferrero cobertos com castanhas e recheio cremoso",
    ),
    prices: [4500, 8500, 16500],
  },
  {
    id: "brigadeiro-brulee",
    slug: "brigadeiro-brulee",
    name: "Brigadeiro Brûlée",
    shortDescription: "Brigadeiro inspirado no crème brûlée.",
    fullDescription:
      "Brigadeiro artesanal inspirado na sobremesa crème brûlée.",
    image: createProductImage(
      "brigadeiro-brulee",
      "/assets/cloudinary/14-brigadeiro-brulee_zzgzno.webp",
      "Brigadeiros brûlée com cobertura caramelizada",
    ),
    prices: [4500, 8500, 16500],
  },
  {
    id: "brigadeiro-oreo",
    slug: "brigadeiro-oreo",
    name: "Brigadeiro de Oreo",
    shortDescription: "Brigadeiro artesanal preparado com biscoito Oreo.",
    fullDescription: "Brigadeiro artesanal preparado com biscoito Oreo.",
    image: createProductImage(
      "brigadeiro-oreo",
      "/assets/cloudinary/brigadeiro_oreo_wmntkc.webp",
      "Brigadeiros de Oreo cobertos com biscoito triturado",
    ),
    prices: [5000, 9500, 18500],
  },
  {
    id: "brigadeiro-confeti",
    slug: "brigadeiro-confeti",
    name: "Brigadeiro de Confeti",
    shortDescription: "Brigadeiro finalizado com confeitos coloridos.",
    fullDescription:
      "Brigadeiro artesanal finalizado com confeitos coloridos.",
    image: createProductImage(
      "brigadeiro-confeti",
      "/assets/cloudinary/16-brigadeiro-confeti_yauaxt.webp",
      "Brigadeiros de Confeti cobertos com confeitos grandes coloridos",
    ),
    prices: [4500, 8500, 16500],
  },
  {
    id: "brigadeiro-pacoca",
    slug: "brigadeiro-pacoca",
    name: "Brigadeiro de Paçoca",
    shortDescription: "Brigadeiro artesanal preparado com paçoca.",
    fullDescription: "Brigadeiro artesanal preparado com paçoca.",
    image: createProductImage(
      "brigadeiro-pacoca",
      "/assets/cloudinary/17-brigadeiro-pacoca_h5sobv.webp",
      "Brigadeiros de paçoca com acabamento de amendoim",
    ),
    prices: [4500, 8500, 16500],
  },
  {
    id: "surpresa-uva",
    slug: "surpresa-uva",
    name: "Surpresa de Uva",
    shortDescription: "Docinho cremoso com uva no interior.",
    fullDescription:
      "Docinho artesanal com uva no interior e cobertura cremosa.",
    image: createProductImage(
      "surpresa-uva",
      "/assets/cloudinary/19-surpresa-de-uva_wq1bpi.webp",
      "Surpresas de uva com recheio cremoso e uva verde no interior",
    ),
    prices: [5500, 9500, 18500],
  },
  {
    id: "brigadeiro-cafe",
    slug: "brigadeiro-cafe",
    name: "Brigadeiro de Café",
    shortDescription: "Brigadeiro artesanal com sabor de café.",
    fullDescription: "Brigadeiro artesanal com sabor de café.",
    image: createProductImage(
      "brigadeiro-cafe",
      "/assets/cloudinary/18-brigadeiro-cafe_yilu4w.webp",
      "Brigadeiros de café decorados com grãos de café",
    ),
    prices: [4500, 8500, 16500],
  },
] as const satisfies readonly BrigadeiroDefinition[];

const brigadeiroProducts = brigadeiroDefinitions.map(createBrigadeiroProduct);

const partyKitIndividual: CatalogProduct = {
  id: "kit-festa-individual",
  slug: "kit-festa-individual",
  name: "Kit Festa Individual",
  categoryId: "kits-festa",
  shortDescription: "Kit preparado para uma comemoração individual.",
  fullDescription: "Kit preparado para uma comemoração individual.",
  images: [
    createProductImage(
      "kit-festa-individual",
      "/assets/cloudinary/04-kit-festa-individual_fqzmhi.webp",
      "Kit Festa Individual com mini bolo, dois docinhos, dois cookies e vela",
    ),
  ],
  pricing: {
    type: "fixed",
    amountCents: 5000,
    requiresPriceConfirmation: false,
  },
  variants: NO_VARIANTS,
  optionGroups: NO_OPTIONS,
  availability: "made_to_order",
  leadTime: LEAD_TIME_TO_CONFIRM,
  allowsNotes: true,
  customization: {
    status: "confirm_on_whatsapp",
    hasAutomaticPrice: false,
  },
  fulfillmentModes: ORDER_FULFILLMENT_MODES,
  featured: false,
  pendingFields: [
    ...BASE_PENDING_FIELDS,
    "kit_cake_flavors",
    "kit_sweet_flavors",
    "kit_cookie_flavors",
    "customization_rules",
  ],
  requiresWhatsAppConfirmation: true,
  contents: [
    { quantity: 1, label: "mini bolo" },
    { quantity: 2, label: "docinhos" },
    { quantity: 2, label: "cookies" },
    { quantity: 1, label: "vela" },
  ],
  specifications: [{ label: "Serve", value: "1 pessoa" }],
};

const partyKitForFour: CatalogProduct = {
  id: "kit-festa-4-pessoas",
  slug: "kit-festa-4-pessoas",
  name: "Kit Festa para 4 pessoas",
  categoryId: "kits-festa",
  shortDescription: "Kit para pequenas comemorações com até 4 pessoas.",
  fullDescription:
    "Kit preparado para pequenas comemorações com até 4 pessoas.",
  images: [
    createProductImage(
      "kit-festa-4-pessoas",
      "/assets/cloudinary/05-kit-festa-4-pessoas_lndxcf.webp",
      "Kit Festa para quatro pessoas com bolo, oito docinhos, oito cookies e vela",
    ),
  ],
  pricing: {
    type: "fixed",
    amountCents: 8500,
    requiresPriceConfirmation: false,
  },
  variants: NO_VARIANTS,
  optionGroups: NO_OPTIONS,
  availability: "made_to_order",
  leadTime: LEAD_TIME_TO_CONFIRM,
  allowsNotes: true,
  customization: {
    status: "confirm_on_whatsapp",
    hasAutomaticPrice: false,
  },
  fulfillmentModes: ORDER_FULFILLMENT_MODES,
  featured: false,
  pendingFields: [
    ...BASE_PENDING_FIELDS,
    "kit_cake_flavors",
    "kit_sweet_flavors",
    "kit_cookie_flavors",
    "customization_rules",
  ],
  requiresWhatsAppConfirmation: true,
  contents: [
    { quantity: 1, label: "bolo" },
    { quantity: 8, label: "docinhos" },
    { quantity: 8, label: "mini cookies" },
    { quantity: 1, label: "vela" },
  ],
  specifications: [{ label: "Serve", value: "Até 4 pessoas" }],
};

const brigadeiroBox: CatalogProduct = {
  id: "caixa-12-brigadeiros",
  slug: "caixa-12-brigadeiros",
  name: "Caixa com 12 brigadeiros",
  categoryId: "caixas-produtos-individuais",
  shortDescription: "Caixa presenteável com 12 brigadeiros artesanais.",
  fullDescription:
    "Caixa presenteável contendo 12 brigadeiros artesanais.",
  images: [
    createProductImage(
      "caixa-12-brigadeiros",
      "/assets/cloudinary/03-caixa-12-brigadeiro_pizqwf.webp",
      "Caixa aberta com 12 brigadeiros artesanais variados",
    ),
  ],
  pricing: {
    type: "fixed",
    amountCents: 4500,
    requiresPriceConfirmation: false,
  },
  variants: NO_VARIANTS,
  optionGroups: NO_OPTIONS,
  availability: "ready_or_made_to_order",
  leadTime: LEAD_TIME_TO_CONFIRM,
  allowsNotes: true,
  customization: {
    status: "confirm_on_whatsapp",
    hasAutomaticPrice: false,
  },
  fulfillmentModes: ORDER_FULFILLMENT_MODES,
  featured: false,
  pendingFields: [
    ...BASE_PENDING_FIELDS,
    "box_flavors",
    "box_flavor_limit",
    "ready_to_deliver_availability",
    "customization_rules",
  ],
  requiresWhatsAppConfirmation: true,
  contents: [{ quantity: 12, label: "brigadeiros" }],
  specifications: [{ label: "Quantidade", value: "12 brigadeiros" }],
};

const bentoCake: CatalogProduct = {
  id: "bento-cake",
  slug: "bento-cake",
  name: "Bento cake",
  categoryId: "caixas-produtos-individuais",
  shortDescription: "Bolo compacto para comemorações e presentes.",
  fullDescription:
    "Bolo artesanal em tamanho compacto, ideal para pequenas comemorações, presentes e mensagens personalizadas.",
  images: [
    createProductImage(
      "bento-cake",
      "/assets/cloudinary/02-bento-cake_pyfn1d.webp",
      "Bento cake personalizado em embalagem individual",
    ),
  ],
  pricing: {
    type: "fixed",
    amountCents: 6990,
    requiresPriceConfirmation: false,
  },
  variants: NO_VARIANTS,
  optionGroups: [
    {
      id: "personalized-message",
      label: "Mensagem personalizada",
      type: "text",
      required: false,
      options: NO_OPTIONS,
      requiresConfirmation: true,
    },
  ],
  availability: "made_to_order",
  leadTime: LEAD_TIME_TO_CONFIRM,
  allowsNotes: true,
  customization: {
    status: "available_with_confirmation",
    hasAutomaticPrice: false,
  },
  fulfillmentModes: ORDER_FULFILLMENT_MODES,
  featured: false,
  pendingFields: [
    ...BASE_PENDING_FIELDS,
    "bento_flavors",
    "bento_colors",
    "customization_rules",
  ],
  requiresWhatsAppConfirmation: true,
  contents: NO_CONTENTS,
  specifications: [{ label: "Peso aproximado", value: "900 g" }],
};

export const products = [
  customCake,
  ...brigadeiroProducts,
  partyKitIndividual,
  partyKitForFour,
  brigadeiroBox,
  bentoCake,
] as const satisfies readonly CatalogProduct[];
