"use client";

import { AlertTriangle, CheckCircle2, MessageCircleMore } from "lucide-react";

import { formatBRL } from "@/lib/money";
import { formatOrderDateBR } from "@/lib/order-date";
import type { CartReconciliationResult } from "@/lib/cart-reconciliation";
import type { CartOrderDetails, OrderFulfillmentMode } from "@/types/cart";

type CheckoutReviewProps = {
  reconciliation: CartReconciliationResult;
  order: CartOrderDetails;
  sendFeedback: string | null;
  onBack: () => void;
  onBackToCart: () => void;
  onSend: () => void;
};

const FULFILLMENT_LABELS: Record<OrderFulfillmentMode, string> = {
  pickup: "Retirada",
  delivery: "Entrega",
  arrange_on_whatsapp: "Combinar pelo WhatsApp",
};

export function CheckoutReview({
  reconciliation,
  order,
  sendFeedback,
  onBack,
  onBackToCart,
  onSend,
}: CheckoutReviewProps) {
  const isBlocked = reconciliation.status === "blocked";

  return (
    <div className="checkout-stage">
      <div className="checkout-stage__body checkout-review">
        {isBlocked ? (
          <section className="checkout-reconciliation" aria-labelledby="reconciliation-title">
            <AlertTriangle aria-hidden="true" size={22} />
            <div>
              <h3 id="reconciliation-title">O carrinho precisa de revisão</h3>
              <p>
                Nenhum preço foi alterado automaticamente e o WhatsApp continua
                bloqueado.
              </p>
              <ul>
                {reconciliation.issues.map((issue) => (
                  <li key={`${issue.identity}-${issue.type}`}>
                    {issue.message}
                    {issue.type === "price_changed" &&
                    issue.storedUnitPriceCents !== undefined &&
                    issue.currentUnitPriceCents !== undefined ? (
                      <span>
                        Salvo: {formatBRL(issue.storedUnitPriceCents)} · Atual:{" "}
                        {formatBRL(issue.currentUnitPriceCents)}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : (
          <>
            <section className="checkout-review__section" aria-labelledby="review-items-title">
              <div className="checkout-review__heading">
                <span>01</span>
                <h3 id="review-items-title">Itens do pedido</h3>
              </div>
              <div className="checkout-review__items">
                {reconciliation.lines.map((line) => (
                  <article key={line.identity} className="checkout-review-item">
                    <div className="checkout-review-item__heading">
                      <h4>{line.product.name}</h4>
                      <strong>{formatBRL(line.subtotalCents)}</strong>
                    </div>
                    {line.variant ? (
                      <p>
                        {line.product.variantGroup?.label ?? "Variação"}:{" "}
                        {line.variant.label}
                      </p>
                    ) : null}
                    {line.options.map((option) => (
                      <p key={`${option.groupLabel}-${option.value}`}>
                        {option.groupLabel}: {option.value}
                      </p>
                    ))}
                    <p>Quantidade no carrinho: {line.item.quantity}</p>
                    <p>Unitário: {formatBRL(line.unitPriceCents)}</p>
                    {line.item.notes ? (
                      <p>Observações: {line.item.notes}</p>
                    ) : null}
                    {line.requiresPriceConfirmation ? (
                      <p className="checkout-review-item__warning">
                        Valor sujeito à confirmação.
                      </p>
                    ) : null}
                    {line.requiresDetailsConfirmation ? (
                      <p className="checkout-review-item__warning">
                        Personalizações ou detalhes sujeitos à confirmação.
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>

            <section className="checkout-review__section" aria-labelledby="review-details-title">
              <div className="checkout-review__heading">
                <span>02</span>
                <h3 id="review-details-title">Dados do pedido</h3>
              </div>
              <dl className="checkout-review__details">
                {order.customerName.trim() ? (
                  <div>
                    <dt>Cliente</dt>
                    <dd>{order.customerName.trim()}</dd>
                  </div>
                ) : null}
                <div>
                  <dt>Recebimento</dt>
                  <dd>
                    {order.fulfillmentMode
                      ? FULFILLMENT_LABELS[order.fulfillmentMode]
                      : "Não informado"}
                  </dd>
                </div>
                <div>
                  <dt>Data desejada</dt>
                  <dd>{formatOrderDateBR(order.desiredDate) ?? "Não informada"}</dd>
                </div>
                <div>
                  <dt>Pagamento</dt>
                  <dd>A combinar no atendimento</dd>
                </div>
                {order.notes.trim() ? (
                  <div>
                    <dt>Observação geral</dt>
                    <dd>{order.notes.trim()}</dd>
                  </div>
                ) : null}
              </dl>
            </section>

            <section className="checkout-review__subtotal" aria-label="Subtotal dos itens">
              <span>Subtotal dos itens</span>
              <strong>{formatBRL(reconciliation.subtotalCents)}</strong>
            </section>

            <aside className="checkout-review__notice">
              <CheckCircle2 aria-hidden="true" size={20} />
              <p>
                O subtotal não inclui taxa de entrega. Disponibilidade, prazo,
                entrega, retirada, pagamento e personalizações serão confirmados
                pela Nath.
              </p>
            </aside>
          </>
        )}
      </div>

      <footer className="checkout-stage__footer">
        {isBlocked ? (
          <button
            type="button"
            className="checkout-button checkout-button--primary checkout-button--full"
            onClick={onBackToCart}
          >
            Voltar ao carrinho
          </button>
        ) : (
          <>
            <button
              type="button"
              className="checkout-button checkout-button--secondary"
              onClick={onBack}
            >
              Voltar
            </button>
            <button
              type="button"
              className="checkout-button checkout-button--whatsapp"
              onClick={onSend}
            >
              <MessageCircleMore aria-hidden="true" size={18} />
              Enviar pedido pelo WhatsApp
            </button>
          </>
        )}
        {sendFeedback ? (
          <p className="checkout-send-feedback" aria-live="polite">
            {sendFeedback}
          </p>
        ) : null}
      </footer>
    </div>
  );
}
