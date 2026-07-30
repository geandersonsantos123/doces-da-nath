"use client";

import { ShoppingBag } from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { SITE_CONTENT } from "@/data/site-content";

export function FinalCtaCartButton() {
  const { isCartOpen, openCart } = useCart();

  return (
    <button
      type="button"
      className="final-cta__cart-button"
      aria-controls="cart-drawer"
      aria-expanded={isCartOpen}
      onClick={(event) => openCart(event.currentTarget)}
    >
      <ShoppingBag size={18} strokeWidth={1.7} aria-hidden="true" />
      <span>{SITE_CONTENT.finalCta.secondaryAction}</span>
    </button>
  );
}
