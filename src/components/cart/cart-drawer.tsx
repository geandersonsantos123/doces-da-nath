"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ShoppingBag, Trash2, X } from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { CheckoutReview } from "@/components/checkout/checkout-review";
import { QuantityStepper } from "@/components/product-detail/quantity-stepper";
import { products } from "@/data/products";
import { BRAND_ASSETS } from "@/data/site-content";
import {
  calculateCartItemTotals,
  createCartItemIdentity,
} from "@/lib/cart-calculations";
import { reconcileCartItems } from "@/lib/cart-reconciliation";
import type { CartReconciliationResult } from "@/lib/cart-reconciliation";
import { validateCheckoutOrder } from "@/lib/checkout-validation";
import { formatBRL } from "@/lib/money";
import { generateWhatsAppOrderMessage } from "@/lib/whatsapp-message";
import { createWhatsAppOrderUrl } from "@/lib/whatsapp-url";
import type { CartItem } from "@/types/cart";

type CartStage = "cart" | "checkout" | "review";

function getItemConfiguration(item: CartItem): readonly string[] {
  const configuration: string[] = [];

  if (item.selectedVariant) {
    configuration.push(item.selectedVariant.label);
  }

  for (const option of item.selectedOptions) {
    configuration.push(`${option.groupLabel}: ${option.value}`);
  }

  return configuration;
}

export function CartDrawer() {
  const titleId = useId();
  const descriptionId = useId();
  const drawerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [stage, setStage] = useState<CartStage>("cart");
  const [reconciliation, setReconciliation] =
    useState<CartReconciliationResult | null>(null);
  const [sendFeedback, setSendFeedback] = useState<string | null>(null);
  const [isClearConfirmationVisible, setIsClearConfirmationVisible] =
    useState(false);
  const {
    cart,
    itemCount,
    subtotalCents,
    isCartOpen,
    updateItemQuantity,
    removeItem,
    clearCart,
    updateOrderDetails,
    closeCart,
  } = useCart();

  const closeDrawer = useCallback(() => {
    setIsClearConfirmationVisible(false);
    setStage("cart");
    setReconciliation(null);
    setSendFeedback(null);
    closeCart();
  }, [closeCart]);

  useEffect(() => {
    if (!isCartOpen) {
      return;
    }

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDrawer();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = drawerRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements || focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [closeDrawer, isCartOpen]);

  useEffect(() => {
    if (!isCartOpen || stage === "cart") {
      return;
    }

    const frameId = requestAnimationFrame(() => titleRef.current?.focus());
    return () => cancelAnimationFrame(frameId);
  }, [isCartOpen, stage]);

  const title =
    stage === "cart"
      ? "Carrinho"
      : stage === "checkout"
        ? "Finalização"
        : "Revisar pedido";
  const description =
    stage === "cart"
      ? `${itemCount} ${itemCount === 1 ? "item" : "itens"}`
      : stage === "checkout"
        ? "Dados mínimos do pedido"
        : "Confira antes de abrir o WhatsApp";

  function goToReview() {
    const nextReconciliation = reconcileCartItems(cart.items, products);
    setReconciliation(nextReconciliation);
    setSendFeedback(null);
    setStage("review");
  }

  function sendToWhatsApp() {
    const validation = validateCheckoutOrder(cart.order);

    if (!validation.isValid) {
      setStage("checkout");
      return;
    }

    const nextReconciliation = reconcileCartItems(cart.items, products);
    setReconciliation(nextReconciliation);

    if (nextReconciliation.status === "blocked") {
      setSendFeedback(null);
      return;
    }

    const message = generateWhatsAppOrderMessage({
      lines: nextReconciliation.lines,
      order: cart.order,
      subtotalCents: nextReconciliation.subtotalCents,
    });
    const url = createWhatsAppOrderUrl(message);

    window.open(url, "_blank", "noopener,noreferrer");
    setSendFeedback(
      "WhatsApp aberto. O carrinho foi mantido para possíveis ajustes.",
    );
  }

  if (!isCartOpen) {
    return null;
  }

  return (
    <div
      className="cart-drawer-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closeDrawer();
        }
      }}
    >
      <aside
        ref={drawerRef}
        id="cart-drawer"
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <div className="cart-drawer__handle" aria-hidden="true" />
        <header className="cart-drawer__header">
          <div>
            <p className="cart-drawer__eyebrow">SEU PEDIDO</p>
            <h2 ref={titleRef} id={titleId} tabIndex={-1}>
              {title}
            </h2>
            <p id={descriptionId}>{description}</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="cart-drawer__close"
            aria-label="Fechar carrinho"
            onClick={closeDrawer}
          >
            <X aria-hidden="true" size={21} />
          </button>
        </header>

        {cart.items.length === 0 ? (
          <div className="cart-empty-state">
            <Image
              src={BRAND_ASSETS.cakeIcon}
              width={1080}
              height={1080}
              sizes="80px"
              alt=""
              aria-hidden="true"
              className="cart-empty-state__icon"
            />
            <h3>Seu carrinho está vazio</h3>
            <p>Escolha um produto e monte sua configuração no cardápio.</p>
            <button type="button" onClick={closeDrawer}>
              Voltar ao cardápio
            </button>
          </div>
        ) : stage === "checkout" ? (
          <CheckoutForm
            order={cart.order}
            onChange={updateOrderDetails}
            onBack={() => setStage("cart")}
            onReview={goToReview}
          />
        ) : stage === "review" && reconciliation ? (
          <CheckoutReview
            reconciliation={reconciliation}
            order={cart.order}
            sendFeedback={sendFeedback}
            onBack={() => {
              setSendFeedback(null);
              setStage("checkout");
            }}
            onBackToCart={() => {
              setSendFeedback(null);
              setStage("cart");
            }}
            onSend={sendToWhatsApp}
          />
        ) : (
          <>
            <div className="cart-drawer__items">
              {cart.items.map((item) => {
                const identity = createCartItemIdentity(item);
                const totals = calculateCartItemTotals(item);
                const configuration = getItemConfiguration(item);
                const productImage =
                  products.find((product) => product.id === item.productId)
                    ?.images[0] ?? item.product.image;

                return (
                  <article key={identity} className="cart-item">
                    {productImage ? (
                      <div className="cart-item__media">
                        <Image
                          src={productImage.url}
                          alt={productImage.alt}
                          fill
                          sizes="68px"
                          className="cart-item__image"
                        />
                      </div>
                    ) : (
                      <div className="cart-item__placeholder" aria-hidden="true">
                        <Image
                          src={BRAND_ASSETS.cakeIcon}
                          width={1080}
                          height={1080}
                          sizes="52px"
                          alt=""
                          className="cart-item__placeholder-icon"
                        />
                      </div>
                    )}

                    <div className="cart-item__content">
                      <div className="cart-item__heading">
                        <div>
                          <h3>{item.product.name}</h3>
                          <p>{formatBRL(totals.unitPriceCents)} por item</p>
                        </div>
                        <button
                          type="button"
                          className="cart-item__remove"
                          aria-label={`Remover ${item.product.name} do carrinho`}
                          title="Remover item"
                          onClick={() => removeItem(identity)}
                        >
                          <Trash2 aria-hidden="true" size={18} />
                        </button>
                      </div>

                      {configuration.length > 0 ? (
                        <ul className="cart-item__configuration">
                          {configuration.map((label) => (
                            <li key={label}>{label}</li>
                          ))}
                        </ul>
                      ) : null}

                      {item.notes ? (
                        <p className="cart-item__notes">
                          <strong>Observação:</strong> {item.notes}
                        </p>
                      ) : null}

                      {item.selectedVariant?.requiresPriceConfirmation ? (
                        <p className="cart-item__warning">
                          Valor sujeito à confirmação.
                        </p>
                      ) : null}

                      <div className="cart-item__footer">
                        <QuantityStepper
                          value={item.quantity}
                          itemName={item.product.name}
                          onChange={(quantity) =>
                            updateItemQuantity(identity, quantity)
                          }
                        />
                        <div className="cart-item__subtotal">
                          <span>Subtotal</span>
                          <strong>{formatBRL(totals.subtotalCents)}</strong>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <footer className="cart-drawer__footer">
              <div className="cart-drawer__clear-row">
                {isClearConfirmationVisible ? (
                  <div className="cart-clear-confirmation" role="group" aria-label="Confirmar limpeza do carrinho">
                    <span>Remover todos os itens?</span>
                    <button
                      type="button"
                      onClick={() => setIsClearConfirmationVisible(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="cart-clear-confirmation__confirm"
                      onClick={() => {
                        clearCart();
                        setIsClearConfirmationVisible(false);
                      }}
                    >
                      Limpar
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="cart-drawer__clear"
                    onClick={() => setIsClearConfirmationVisible(true)}
                  >
                    Limpar carrinho
                  </button>
                )}
              </div>

              <div className="cart-drawer__total">
                <span>Subtotal</span>
                <strong>{formatBRL(subtotalCents)}</strong>
              </div>
              <button
                type="button"
                className="cart-drawer__finalize"
                onClick={() => setStage("checkout")}
              >
                <ShoppingBag aria-hidden="true" size={18} />
                Continuar pedido
              </button>
              <p className="cart-drawer__next-step">
                Na próxima etapa você informa recebimento, data e pagamento.
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
