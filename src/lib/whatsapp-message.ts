import { PAYMENT_METHOD_TO_CONFIRM } from "@/lib/checkout-validation";
import { formatBRL } from "@/lib/money";
import { formatOrderDateBR } from "@/lib/order-date";
import type { ReconciledCartLine } from "@/lib/cart-reconciliation";
import type { CartOrderDetails, OrderFulfillmentMode } from "@/types/cart";
import type { ProductYield } from "@/types/product";

type WhatsAppOrderMessageInput = {
  readonly lines: readonly ReconciledCartLine[];
  readonly order: CartOrderDetails;
  readonly subtotalCents: number;
};

const FULFILLMENT_LABELS: Record<OrderFulfillmentMode, string> = {
  pickup: "Retirada",
  delivery: "Entrega",
  arrange_on_whatsapp: "Combinar pelo WhatsApp",
};

function formatYield(value: ProductYield): string {
  const unit = value.unit === "slices" ? "fatias" : "pessoas";
  return `${value.approximate ? "aprox. " : ""}${value.amount} ${unit}`;
}

function formatLine(line: ReconciledCartLine, index: number): string {
  const output = [`${index + 1}. *${line.product.name}*`];

  if (line.variant) {
    const variantLabel = line.product.variantGroup?.label ?? "Variação";
    const supportingLabel = line.variant.yield
      ? ` — ${formatYield(line.variant.yield)}`
      : "";
    output.push(`• ${variantLabel}: ${line.variant.label}${supportingLabel}`);
  }

  for (const option of line.options) {
    output.push(`• ${option.groupLabel}: ${option.value}`);
  }

  output.push(`• Quantidade: ${line.item.quantity}`);
  output.push(`• Unitário: ${formatBRL(line.unitPriceCents)}`);
  output.push(`• Subtotal: ${formatBRL(line.subtotalCents)}`);

  if (line.item.notes.trim()) {
    output.push(`• Observações: ${line.item.notes.trim()}`);
  }

  if (line.requiresPriceConfirmation) {
    output.push("• Atenção: valor sujeito à confirmação.");
  }

  if (line.requiresDetailsConfirmation) {
    output.push(
      "• Atenção: personalizações ou detalhes sujeitos à confirmação.",
    );
  }

  return output.join("\n");
}

export function generateWhatsAppOrderMessage({
  lines,
  order,
  subtotalCents,
}: WhatsAppOrderMessageInput): string {
  const customerName = order.customerName.trim();
  const desiredDate = formatOrderDateBR(order.desiredDate);

  if (
    lines.length === 0 ||
    customerName.length < 2 ||
    customerName.length > 80 ||
    order.fulfillmentMode === null ||
    desiredDate === null ||
    order.paymentMethodId !== PAYMENT_METHOD_TO_CONFIRM
  ) {
    throw new Error("O pedido não possui dados válidos para a mensagem.");
  }

  const sections = [
    "Olá, Nath! Vim pelo site da Doces da Nath e gostaria de confirmar este pedido 💛",
    `🍰 *ITENS DO PEDIDO*\n\n${lines.map(formatLine).join("\n\n")}`,
    `🍫 *SUBTOTAL DOS ITENS*\n${formatBRL(subtotalCents)}`,
  ];

  const orderDetails = [
    `• Cliente: ${customerName}`,
    `• Recebimento: ${FULFILLMENT_LABELS[order.fulfillmentMode]}`,
    `• Data desejada: ${desiredDate}`,
    "• Pagamento: A combinar no atendimento",
  ];

  if (order.notes.trim()) {
    orderDetails.push(`• Observações gerais: ${order.notes.trim()}`);
  }

  sections.push(`📅 *DADOS DO PEDIDO*\n${orderDetails.join("\n")}`);
  sections.push(
    "⚠️ *AVISOS*\nO subtotal não inclui taxa de entrega.\nDisponibilidade, prazo, entrega, retirada, pagamento e personalizações serão confirmados no atendimento.",
  );

  return sections.join("\n\n");
}
