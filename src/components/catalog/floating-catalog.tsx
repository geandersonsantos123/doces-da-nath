"use client";

import { BookOpenText, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { CatalogBrowser } from "@/components/catalog/catalog-browser";
import { SITE_CONTENT } from "@/data/site-content";
import type { CatalogCategory } from "@/types/category";
import type { CatalogProduct } from "@/types/product";

type FloatingCatalogProps = {
  categories: readonly CatalogCategory[];
  products: readonly CatalogProduct[];
};

export function FloatingCatalog({
  categories,
  products,
}: FloatingCatalogProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeCatalog = useCallback(() => {
    setIsOpen(false);
    requestAnimationFrame(() => launcherRef.current?.focus());
  }, []);

  useEffect(() => {
    let animationFrame = 0;

    function updateVisibility() {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const catalog = document.getElementById("cardapio");
        const headerHeight =
          document.querySelector<HTMLElement>(".site-header")?.getBoundingClientRect()
            .height ?? 72;

        setIsVisible(
          Boolean(
            catalog &&
              catalog.getBoundingClientRect().bottom <=
                headerHeight + 12,
          ),
        );
      });
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
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
        if (document.querySelector(".product-detail-backdrop")) {
          return;
        }

        event.preventDefault();
        closeCatalog();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements?.length) {
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
  }, [closeCatalog, isOpen]);

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className="floating-catalog-launcher"
        data-visible={isVisible && !isOpen}
        aria-label={SITE_CONTENT.catalog.floatingActionLabel}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-hidden={!isVisible || isOpen}
        tabIndex={isVisible && !isOpen ? 0 : -1}
        onClick={() => setIsOpen(true)}
      >
        <BookOpenText aria-hidden="true" size={20} strokeWidth={1.7} />
        <span>{SITE_CONTENT.catalog.floatingActionShortLabel}</span>
      </button>

      {isOpen ? (
        <div
          className="floating-catalog-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeCatalog();
            }
          }}
        >
          <div
            ref={dialogRef}
            className="floating-catalog-window"
            role="dialog"
            aria-modal="true"
            aria-labelledby="floating-catalog-title"
          >
            <header className="floating-catalog-window__header">
              <div>
                <p>{SITE_CONTENT.catalog.windowEyebrow}</p>
                <h2 id="floating-catalog-title">
                  {SITE_CONTENT.catalog.windowTitle}
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                className="floating-catalog-window__close"
                aria-label="Fechar cardápio"
                onClick={closeCatalog}
              >
                <X aria-hidden="true" size={22} />
              </button>
            </header>

            <div className="floating-catalog-window__scroll">
              <CatalogBrowser
                categories={categories}
                products={products}
                idPrefix="catalog-window"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
