"use client";

import { ShoppingBag } from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { formatBRL } from "@/lib/money";

export function CartMobileBar() {
  const { isHydrated, itemCount, subtotalCents, openCart } = useCart();

  if (!isHydrated || itemCount === 0) {
    return null;
  }

  return (
    <>
      <div className="cart-mobile-bar-spacer" aria-hidden="true" />
      <aside className="cart-mobile-bar" aria-label="Resumo do carrinho">
        <div className="cart-mobile-bar__summary">
          <span>
            {itemCount} {itemCount === 1 ? "item" : "itens"}
          </span>
          <strong>{formatBRL(subtotalCents)}</strong>
        </div>
        <button
          type="button"
          className="cart-mobile-bar__action"
          aria-controls="cart-drawer"
          onClick={(event) => openCart(event.currentTarget)}
        >
          <ShoppingBag aria-hidden="true" size={18} />
          Ver carrinho
        </button>
      </aside>
    </>
  );
}
