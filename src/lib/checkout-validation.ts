import { ORDER_MIN_LEAD_DAYS } from "@/constants/commerce";
import type { CartOrderDetails, OrderFulfillmentMode } from "@/types/cart";
import {
  formatOrderDateBR,
  getMinimumOrderDate,
  isBeforeMinimumOrderDate,
  isRealOrderDate,
} from "@/lib/order-date";

export const PAYMENT_METHOD_TO_CONFIRM = "arrange_on_whatsapp" as const;

export type CheckoutField =
  | "customerName"
  | "fulfillmentMode"
  | "desiredDate"
  | "paymentMethodId";

export type CheckoutFieldErrors = Partial<Record<CheckoutField, string>>;

export type CheckoutValidationResult =
  | { readonly isValid: true; readonly errors: CheckoutFieldErrors }
  | {
      readonly isValid: false;
      readonly errors: CheckoutFieldErrors;
      readonly firstInvalidField: CheckoutField;
    };

const VALID_FULFILLMENT_MODES = new Set<OrderFulfillmentMode>([
  "pickup",
  "delivery",
  "arrange_on_whatsapp",
]);

export function validateCheckoutOrder(
  order: CartOrderDetails,
  today = new Date(),
): CheckoutValidationResult {
  const errors: CheckoutFieldErrors = {};
  const normalizedCustomerName = order.customerName.trim();

  if (normalizedCustomerName.length === 0) {
    errors.customerName = "Informe seu nome.";
  } else if (normalizedCustomerName.length < 2) {
    errors.customerName = "Use pelo menos 2 caracteres no nome.";
  } else if (normalizedCustomerName.length > 80) {
    errors.customerName = "Use no máximo 80 caracteres no nome.";
  }

  if (
    order.fulfillmentMode === null ||
    !VALID_FULFILLMENT_MODES.has(order.fulfillmentMode)
  ) {
    errors.fulfillmentMode = "Escolha como deseja receber o pedido.";
  }

  if (!isRealOrderDate(order.desiredDate)) {
    errors.desiredDate = "Informe uma data desejada válida.";
  } else if (isBeforeMinimumOrderDate(order.desiredDate, today)) {
    const minimumDate = getMinimumOrderDate(today);
    const minimumDateLabel = formatOrderDateBR(minimumDate) ?? minimumDate;
    errors.desiredDate = `Escolha uma data a partir de ${minimumDateLabel}. Precisamos de pelo menos ${ORDER_MIN_LEAD_DAYS} dias para preparar seu pedido.`;
  }

  if (order.paymentMethodId !== PAYMENT_METHOD_TO_CONFIRM) {
    errors.paymentMethodId = "Confirme como o pagamento será combinado.";
  }

  const firstInvalidField = (
    [
      "customerName",
      "fulfillmentMode",
      "desiredDate",
      "paymentMethodId",
    ] as const
  ).find((field) => errors[field] !== undefined);

  return firstInvalidField
    ? { isValid: false, errors, firstInvalidField }
    : { isValid: true, errors };
}
