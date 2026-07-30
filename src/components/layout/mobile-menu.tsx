"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { MouseEvent } from "react";

import type { SiteNavigationItem } from "@/data/site-content";

type MobileMenuProps = {
  isOpen: boolean;
  items: readonly SiteNavigationItem[];
  onClose: () => void;
};

export function MobileMenu({ isOpen, items, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  function handleNavigation(
    event: MouseEvent<HTMLAnchorElement>,
    href: SiteNavigationItem["href"],
  ) {
    event.preventDefault();
    onClose();

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const target = document.querySelector<HTMLElement>(href);

        if (!target) {
          return;
        }

        window.history.pushState(null, "", href);
        target.scrollIntoView({ block: "start" });
      });
    });
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = window.requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusableElements = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (!firstFocusable || !lastFocusable) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="mobile-menu-layer">
      <button
        type="button"
        className="mobile-menu__backdrop"
        aria-label="Fechar menu"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        id="mobile-navigation"
        className="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal"
      >
        <div className="mobile-menu__top">
          <p className="mobile-menu__title">Navegação</p>
          <button
            type="button"
            className="icon-button"
            aria-label="Fechar menu"
            onClick={onClose}
          >
            <X size={22} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>

        <nav className="mobile-menu__navigation" aria-label="Navegação mobile">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="mobile-menu__link"
              onClick={(event) => handleNavigation(event, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
