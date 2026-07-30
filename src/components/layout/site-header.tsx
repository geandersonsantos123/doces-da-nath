"use client";

import { Menu, ShoppingBag } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { BrandLogo } from "@/components/branding/brand-logo";
import { useCart } from "@/components/cart/cart-provider";
import { Container } from "@/components/ui/container";
import { SITE_CONTENT } from "@/data/site-content";

import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  const { itemCount, isCartOpen, openCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    function updateHeaderState() {
      setIsScrolled(window.scrollY > 12);
    }

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  return (
    <header className="site-header" data-scrolled={isScrolled}>
      <span
        className="site-header__glass"
        aria-hidden="true"
        style={{
          backdropFilter: "blur(18px) saturate(120%)",
          WebkitBackdropFilter: "blur(18px) saturate(120%)",
        }}
      />
      <Container className="site-header__bar">
        <button
          type="button"
          className="icon-button menu-button"
          aria-label="Abrir menu"
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={24} strokeWidth={1.7} aria-hidden="true" />
        </button>

        <a
          href="#top"
          className="site-header__brand"
          aria-label="Doces da Nath, início"
        >
          <BrandLogo alt="" eager />
        </a>

        <nav className="desktop-navigation" aria-label="Navegação principal">
          {SITE_CONTENT.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="desktop-navigation__link"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="icon-button cart-button"
          aria-label={
            itemCount === 0
              ? "Abrir carrinho vazio"
              : `Abrir carrinho com ${itemCount} ${itemCount === 1 ? "item" : "itens"}`
          }
          aria-controls="cart-drawer"
          aria-expanded={isCartOpen}
          title="Abrir carrinho"
          onClick={(event) => openCart(event.currentTarget)}
        >
          <ShoppingBag size={23} strokeWidth={1.7} aria-hidden="true" />
          <span className="cart-badge" aria-hidden="true">
            {itemCount}
          </span>
        </button>
      </Container>

      <MobileMenu
        isOpen={isMenuOpen}
        items={SITE_CONTENT.navigation}
        onClose={closeMenu}
      />
    </header>
  );
}
