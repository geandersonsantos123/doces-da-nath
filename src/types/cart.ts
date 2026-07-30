import type { CategoryId } from "@/types/category";
import type {
  FulfillmentMode,
  MoneyCents,
  PriceType,
  ProductImage,
  ProductOptionGroupType,
} from "@/types/product";

export type OrderFulfillmentMode =
  | FulfillmentMode
  | "arrange_on_whatsapp";

export interface CartProductSnapshot {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly categoryId: CategoryId;
  readonly priceType: PriceType;
  readonly fixedPriceCents: MoneyCents | null;
  readonly image: ProductImage | null;
  readonly requiresWhatsAppConfirmation: boolean;
}

export interface CartVariantSnapshot {
  readonly id: string;
  readonly label: string;
  readonly priceCents: MoneyCents;
  readonly requiresPriceConfirmation: boolean;
}

export interface CartSelectedOption {
  readonly groupId: string;
  readonly groupLabel: string;
  readonly type: ProductOptionGroupType;
  readonly optionId: string | null;
  readonly value: string;
  readonly priceModifierCents: MoneyCents;
}

export interface CartItem {
  readonly productId: string;
  readonly product: CartProductSnapshot;
  readonly selectedVariant: CartVariantSnapshot | null;
  readonly selectedOptions: readonly CartSelectedOption[];
  readonly quantity: number;
  readonly notes: string;
}

export interface CartItemTotals {
  readonly unitPriceCents: MoneyCents;
  readonly subtotalCents: MoneyCents;
}

export interface CartOrderDetails {
  readonly customerName: string;
  readonly fulfillmentMode: OrderFulfillmentMode | null;
  readonly desiredDate: string | null;
  readonly paymentMethodId: string | null;
  readonly notes: string;
}

export interface CartState {
  readonly schemaVersion: number;
  readonly items: readonly CartItem[];
  readonly order: CartOrderDetails;
}
