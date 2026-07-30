import { ArrowUp } from "lucide-react";
import Image from "next/image";

import { FinalCtaCartButton } from "@/components/sections/final-cta-cart-button";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { BRAND_ASSETS, SITE_CONTENT } from "@/data/site-content";

export function FinalCtaSection() {
  const { finalCta } = SITE_CONTENT;

  return (
    <section
      id="cta-final"
      className="final-cta"
      aria-labelledby="final-cta-title"
    >
      <Container className="final-cta__inner">
        <Image
          src={BRAND_ASSETS.circularLogo}
          width={1080}
          height={1080}
          sizes="96px"
          alt=""
          aria-hidden="true"
          className="final-cta__mark"
        />

        <div className="final-cta__copy">
          <p className="final-cta__eyebrow">{finalCta.eyebrow}</p>
          <h2 id="final-cta-title">{finalCta.title}</h2>
          <p>{finalCta.support}</p>
        </div>

        <div className="final-cta__actions">
          <ButtonLink
            href={finalCta.primaryAction.href}
            className="final-cta__catalog-link"
            icon={<ArrowUp size={18} strokeWidth={1.7} />}
          >
            {finalCta.primaryAction.label}
          </ButtonLink>
          <FinalCtaCartButton />
        </div>
      </Container>
    </section>
  );
}
