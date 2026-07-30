"use client";

import {
  CakeSlice,
  Candy,
  Gift,
  PartyPopper,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import { ProductCard } from "@/components/catalog/product-card";
import { ProductDetailDialog } from "@/components/product-detail/product-detail-dialog";
import { SITE_CONTENT } from "@/data/site-content";
import type { CatalogCategory, CategoryId } from "@/types/category";
import type { CatalogProduct } from "@/types/product";

type CatalogBrowserProps = {
  categories: readonly CatalogCategory[];
  products: readonly CatalogProduct[];
  idPrefix?: string;
};

type CatalogFilter = "featured" | CategoryId;

type CatalogTab = {
  id: CatalogFilter;
  label: string;
  disabled: boolean;
};

const CATEGORY_LABELS: Partial<Record<CategoryId, string>> = {
  "caixas-produtos-individuais": "Caixas e individuais",
};

const CATEGORY_ICONS: Record<CatalogFilter, LucideIcon> = {
  featured: Sparkles,
  bolos: CakeSlice,
  "brigadeiros-docinhos": Candy,
  "kits-festa": PartyPopper,
  "caixas-produtos-individuais": Gift,
};

function getCategoryLabel(category: CatalogCategory): string {
  return CATEGORY_LABELS[category.id] ?? category.name;
}

export function CatalogBrowser({
  categories,
  products,
  idPrefix = "catalog",
}: CatalogBrowserProps) {
  const featuredProducts = useMemo(
    () => products.filter((product) => product.featured),
    [products],
  );
  const firstCategoryId = categories[0]?.id ?? "bolos";
  const [activeFilter, setActiveFilter] = useState<CatalogFilter>(
    featuredProducts.length > 0 ? "featured" : firstCategoryId,
  );
  const [selectedProduct, setSelectedProduct] =
    useState<CatalogProduct | null>(null);
  const tabRefs = useRef(new Map<CatalogFilter, HTMLButtonElement>());
  const detailTriggerRef = useRef<HTMLButtonElement | null>(null);

  const tabs = useMemo<readonly CatalogTab[]>(
    () => [
      {
        id: "featured",
        label: "Mais pedidos",
        disabled: featuredProducts.length === 0,
      },
      ...categories.map((category) => ({
        id: category.id,
        label: getCategoryLabel(category),
        disabled: false,
      })),
    ],
    [categories, featuredProducts.length],
  );

  const visibleProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.availability !== "hidden" &&
          (activeFilter === "featured"
            ? product.featured
            : product.categoryId === activeFilter),
      ),
    [activeFilter, products],
  );

  function activateFilter(filter: CatalogFilter) {
    setActiveFilter(filter);
  }

  const closeProductDetail = useCallback(() => {
    setSelectedProduct(null);
    requestAnimationFrame(() => detailTriggerRef.current?.focus());
  }, []);

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    currentFilter: CatalogFilter,
  ) {
    const enabledTabs = tabs.filter((tab) => !tab.disabled);
    const currentIndex = enabledTabs.findIndex(
      (tab) => tab.id === currentFilter,
    );

    if (currentIndex === -1) {
      return;
    }

    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % enabledTabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex =
        (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = enabledTabs.length - 1;
    }

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    const nextFilter = enabledTabs[nextIndex].id;
    activateFilter(nextFilter);
    tabRefs.current.get(nextFilter)?.focus();
  }

  return (
    <div className="catalog-browser">
      <div className="catalog-tabs-shell">
        <div
          className="catalog-tabs"
          role="tablist"
          aria-label="Categorias do cardápio"
        >
          {tabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            const Icon = CATEGORY_ICONS[tab.id];
            const tabId = `${idPrefix}-tab-${tab.id}`;

            return (
              <button
                key={tab.id}
                ref={(element) => {
                  if (element) {
                    tabRefs.current.set(tab.id, element);
                  } else {
                    tabRefs.current.delete(tab.id);
                  }
                }}
                type="button"
                role="tab"
                id={tabId}
                aria-controls={`${idPrefix}-product-panel`}
                aria-selected={isActive}
                aria-disabled={tab.disabled}
                disabled={tab.disabled}
                tabIndex={isActive ? 0 : -1}
                className="catalog-tab"
                onClick={() => activateFilter(tab.id)}
                onKeyDown={(event) => handleTabKeyDown(event, tab.id)}
              >
                <Icon
                  className="catalog-tab__icon"
                  size={20}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                <span className="catalog-tab__label">{tab.label}</span>
                {tab.disabled ? (
                  <span className="catalog-tab__soon" aria-hidden="true">
                    {SITE_CONTENT.catalog.unavailableFeaturedLabel}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="catalog-results-bar catalog-results-bar--compact">
        <p className="catalog-results" aria-live="polite" aria-atomic="true">
          {visibleProducts.length} {visibleProducts.length === 1 ? "opção" : "opções"}{" "}
          {visibleProducts.length === 1 ? "encontrada" : "encontradas"}
        </p>
      </div>

      <div
        id={`${idPrefix}-product-panel`}
        role="tabpanel"
        aria-labelledby={`${idPrefix}-tab-${activeFilter}`}
        className="catalog-product-panel"
      >
        <div key={activeFilter} className="catalog-grid">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewOptions={(productToOpen, trigger) => {
                detailTriggerRef.current = trigger;
                setSelectedProduct(productToOpen);
              }}
            />
          ))}
        </div>
      </div>

      {selectedProduct ? (
        <ProductDetailDialog
          product={selectedProduct}
          categoryName={
            categories.find((category) => category.id === selectedProduct.categoryId)
              ?.name ?? "Cardápio"
          }
          onClose={closeProductDetail}
        />
      ) : null}
    </div>
  );
}
