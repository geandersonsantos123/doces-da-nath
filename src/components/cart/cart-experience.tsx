"use client";

import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartMobileBar } from "@/components/cart/cart-mobile-bar";

export function CartExperience() {
  return (
    <>
      <CartMobileBar />
      <CartDrawer />
    </>
  );
}
