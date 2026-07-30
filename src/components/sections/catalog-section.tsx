import { CatalogBrowser } from "@/components/catalog/catalog-browser";
import { DecorativeCakeIcon } from "@/components/branding/decorative-cake-icon";
import { Container } from "@/components/ui/container";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { SITE_CONTENT } from "@/data/site-content";

export function CatalogSection() {
  return (
    <section id="cardapio" className="catalog-section" aria-labelledby="catalog-title">
      <Container>
        <div className="catalog-divider" aria-hidden="true">
          <span />
          <DecorativeCakeIcon className="catalog-divider__icon" />
          <span />
        </div>

        <header className="catalog-heading">
          <p className="catalog-heading__eyebrow">
            {SITE_CONTENT.catalog.eyebrow}
          </p>
          <h2 id="catalog-title" className="catalog-heading__title">
            {SITE_CONTENT.catalog.title}
          </h2>
          <p className="catalog-heading__support">
            {SITE_CONTENT.catalog.support}
          </p>
        </header>

        <CatalogBrowser
          categories={categories}
          products={products}
          idPrefix="catalog-page"
        />
      </Container>
    </section>
  );
}
