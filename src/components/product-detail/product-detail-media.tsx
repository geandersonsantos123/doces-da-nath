import Image from "next/image";

import { BRAND_ASSETS } from "@/data/site-content";
import type { ProductImage } from "@/types/product";

type ProductDetailMediaProps = {
  productName: string;
  image: ProductImage | undefined;
};

export function ProductDetailMedia({
  productName,
  image,
}: ProductDetailMediaProps) {
  if (image) {
    return (
      <div className="product-detail-media">
        <Image
          src={image.url}
          alt={image.alt}
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="product-detail-media__image"
        />
      </div>
    );
  }

  return (
    <div
      className="product-detail-media product-detail-media--placeholder"
      role="img"
      aria-label={`Imagem de ${productName} em breve`}
    >
      <span className="product-detail-media__line" aria-hidden="true" />
      <Image
        src={BRAND_ASSETS.cakeIcon}
        width={1080}
        height={1080}
        sizes="(max-width: 767px) 72px, 104px"
        alt=""
        aria-hidden="true"
        className="product-detail-media__placeholder-icon"
      />
      <span className="product-detail-media__placeholder-label" aria-hidden="true">
        Imagem em breve
      </span>
    </div>
  );
}
