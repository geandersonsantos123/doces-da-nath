import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { BRAND_ASSETS } from "@/data/site-content";
import { formatBRL } from "@/lib/money";
import { getProductStartingPriceCents } from "@/lib/product-pricing";
import type { CatalogProduct } from "@/types/product";

type ProductCardProps = {
  product: CatalogProduct;
  onViewOptions: (
    product: CatalogProduct,
    trigger: HTMLButtonElement,
  ) => void;
};

function getAvailabilityLabel(product: CatalogProduct): string {
  switch (product.availability) {
    case "made_to_order":
      return "Sob encomenda";
    case "ready_or_made_to_order":
      return "Pronta entrega sob consulta";
    case "ready_to_deliver":
      return "Pronta entrega";
    case "temporarily_unavailable":
      return "Temporariamente indisponível";
    case "hidden":
      return "Indisponível";
  }
}

function getSecondaryInformation(product: CatalogProduct): string | null {
  if (
    product.pricing.requiresPriceConfirmation ||
    product.pendingFields.includes("price_confirmation")
  ) {
    return "Valor sujeito à confirmação";
  }

  if (product.pricing.type === "variant") {
    return product.categoryId === "bolos"
      ? "Preço por tamanho"
      : "Preço por quantidade";
  }

  if (product.customization.status !== "not_available") {
    return "Personalizável";
  }

  return null;
}

function getPriceLabel(product: CatalogProduct): string {
  const startingPriceCents = getProductStartingPriceCents(product);

  if (startingPriceCents === null) {
    return "Sob consulta";
  }

  const formattedPrice = formatBRL(startingPriceCents);

  return product.pricing.type === "variant" || product.pricing.type === "from"
    ? `A partir de ${formattedPrice}`
    : formattedPrice;
}

export function ProductCard({
  product,
  onViewOptions,
}: ProductCardProps) {
  const secondaryInformation = getSecondaryInformation(product);
  const isUnavailable = product.availability === "temporarily_unavailable";
  const productImage = product.images[0];

  return (
    <article className="product-card">
      {productImage ? (
        <div className="product-card__media">
          <Image
            src={productImage.url}
            alt={productImage.alt}
            fill
            sizes="(min-width: 1200px) 25vw, (min-width: 900px) 33vw, (min-width: 375px) 50vw, 100vw"
            className="product-card__image"
          />
        </div>
      ) : (
        <div className="product-card__placeholder" aria-hidden="true">
          <span className="product-card__ornament product-card__ornament--one" />
          <span className="product-card__ornament product-card__ornament--two" />
          <span className="product-card__ornament product-card__ornament--three" />
          <div className="product-card__placeholder-mark">
            <Image
              src={BRAND_ASSETS.cakeIcon}
              width={1080}
              height={1080}
              sizes="72px"
              alt=""
              className="product-card__placeholder-icon"
            />
          </div>
          <span className="product-card__placeholder-label">Imagem em breve</span>
        </div>
      )}

      <div className="product-card__body">
        <div className="product-card__badges">
          <span className="product-card__availability">
            {getAvailabilityLabel(product)}
          </span>
        </div>

        <div className="product-card__copy">
          <h3 className="product-card__title">{product.name}</h3>
          <p className="product-card__description">
            {product.shortDescription}
          </p>
        </div>

        <div className="product-card__commercial">
          <p className="product-card__price">{getPriceLabel(product)}</p>
          {secondaryInformation ? (
            <p className="product-card__secondary">{secondaryInformation}</p>
          ) : (
            <span className="product-card__secondary-spacer" aria-hidden="true" />
          )}
        </div>

        <button
          type="button"
          className="product-card__action"
          disabled={isUnavailable}
          onClick={(event) => onViewOptions(product, event.currentTarget)}
        >
          <span>{isUnavailable ? "Indisponível" : "Ver opções"}</span>
          {!isUnavailable ? (
            <ArrowRight aria-hidden="true" size={18} />
          ) : null}
        </button>
      </div>
    </article>
  );
}
