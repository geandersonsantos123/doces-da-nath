import type { CategoryId } from "@/types/category";

export type MoneyCents = number;

export type PriceType = "fixed" | "variant" | "from" | "quote";

export type AvailabilityStatus =
  | "made_to_order"
  | "ready_or_made_to_order"
  | "ready_to_deliver"
  | "temporarily_unavailable"
  | "hidden";

export type FulfillmentMode = "delivery" | "pickup";

export type PendingField =
  | "lead_time"
  | "fulfillment_details"
  | "customization_rules"
  | "customization_pricing"
  | "cake_flavor_limit"
  | "kit_cake_flavors"
  | "kit_sweet_flavors"
  | "kit_cookie_flavors"
  | "box_flavors"
  | "box_flavor_limit"
  | "bento_flavors"
  | "bento_colors"
  | "ready_to_deliver_availability"
  | "price_confirmation";

export interface ProductImage {
  readonly id: string;
  readonly url: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface FixedPricing {
  readonly type: "fixed";
  readonly amountCents: MoneyCents;
  readonly requiresPriceConfirmation: boolean;
}

export interface VariantPricing {
  readonly type: "variant";
  readonly requiresPriceConfirmation: boolean;
}

export interface FromPricing {
  readonly type: "from";
  readonly fromAmountCents: MoneyCents;
  readonly requiresPriceConfirmation: boolean;
}

export interface QuotePricing {
  readonly type: "quote";
  readonly requiresPriceConfirmation: true;
}

export type ProductPricing =
  | FixedPricing
  | VariantPricing
  | FromPricing
  | QuotePricing;

export interface ProductVariantGroup {
  readonly id: string;
  readonly label: string;
  readonly required: boolean;
}

export interface ProductYield {
  readonly amount: number;
  readonly unit: "slices" | "people";
  readonly approximate: boolean;
}

export interface ProductVariant {
  readonly id: string;
  readonly label: string;
  readonly priceCents: MoneyCents;
  readonly unitCount?: number;
  readonly yield?: ProductYield;
  readonly requiresPriceConfirmation: boolean;
}

export type ProductOptionGroupType = "single" | "multiple" | "text";

export interface ProductOption {
  readonly id: string;
  readonly label: string;
  readonly priceModifierCents: MoneyCents;
}

export interface ProductOptionGroup {
  readonly id: string;
  readonly label: string;
  readonly type: ProductOptionGroupType;
  readonly required: boolean;
  readonly options: readonly ProductOption[];
  readonly maxSelections?: number;
  readonly requiresConfirmation: boolean;
}

export type CustomizationStatus =
  | "not_available"
  | "available_with_confirmation"
  | "confirm_on_whatsapp";

export interface CustomizationPolicy {
  readonly status: CustomizationStatus;
  readonly hasAutomaticPrice: false;
}

export interface ProductContentItem {
  readonly quantity: number;
  readonly label: string;
}

export interface ProductSpecification {
  readonly label: string;
  readonly value: string;
}

export type LeadTime =
  | { readonly type: "confirm_on_whatsapp" }
  | {
      readonly type: "range_in_days";
      readonly minimumDays: number;
      readonly maximumDays?: number;
    };

export interface CatalogProduct {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly categoryId: CategoryId;
  readonly shortDescription: string;
  readonly fullDescription: string;
  readonly images: readonly ProductImage[];
  readonly pricing: ProductPricing;
  readonly variantGroup?: ProductVariantGroup;
  readonly variants: readonly ProductVariant[];
  readonly optionGroups: readonly ProductOptionGroup[];
  readonly availability: AvailabilityStatus;
  readonly leadTime: LeadTime;
  readonly minimumOrderUnits?: number;
  readonly allowsNotes: boolean;
  readonly customization: CustomizationPolicy;
  readonly fulfillmentModes: readonly FulfillmentMode[];
  readonly featured: boolean;
  readonly pendingFields: readonly PendingField[];
  readonly requiresWhatsAppConfirmation: boolean;
  readonly contents: readonly ProductContentItem[];
  readonly specifications: readonly ProductSpecification[];
}
