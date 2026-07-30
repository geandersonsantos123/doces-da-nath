import Image from "next/image";

import { BRAND_ASSETS } from "@/data/site-content";

type BrandLogoProps = {
  alt?: string;
  className?: string;
  eager?: boolean;
};

export function BrandLogo({
  alt = "Doces da Nath Confeitaria",
  className = "",
  eager = false,
}: BrandLogoProps) {
  return (
    <Image
      src={BRAND_ASSETS.horizontalLogo}
      width={1080}
      height={270}
      sizes="(min-width: 900px) 208px, 176px"
      alt={alt}
      className={`brand-logo ${className}`.trim()}
      loading={eager ? "eager" : "lazy"}
    />
  );
}
