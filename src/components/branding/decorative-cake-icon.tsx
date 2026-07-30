import Image from "next/image";

import { BRAND_ASSETS } from "@/data/site-content";

type DecorativeCakeIconProps = {
  className?: string;
};

export function DecorativeCakeIcon({
  className = "",
}: DecorativeCakeIconProps) {
  return (
    <Image
      src={BRAND_ASSETS.cakeIcon}
      width={1080}
      height={1080}
      sizes="28px"
      alt=""
      aria-hidden="true"
      className={`decorative-cake-icon ${className}`.trim()}
    />
  );
}
