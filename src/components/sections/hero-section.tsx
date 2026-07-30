import { ArrowDown, Heart } from "lucide-react";
import Image from "next/image";

import { DecorativeCakeIcon } from "@/components/branding/decorative-cake-icon";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { BRAND_ASSETS, SITE_CONTENT } from "@/data/site-content";

export function HeroSection() {
  const { hero } = SITE_CONTENT;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <Image
          src={BRAND_ASSETS.hero}
          fill
          priority
          sizes="(min-width: 768px) 62vw, 100vw"
          alt={hero.imageAlt}
          className="hero__image"
        />
      </div>

      <Container className="hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">
            <DecorativeCakeIcon />
            <span>{hero.eyebrow}</span>
          </p>

          <h1 id="hero-title" className="hero__title">
            {hero.titleLead} <em>{hero.titleEmphasis}</em>
          </h1>

          <p className="hero__support">{hero.support}</p>

          <div className="hero__actions">
            <ButtonLink
              href={hero.primaryAction.href}
              icon={<ArrowDown size={19} strokeWidth={1.8} />}
            >
              {hero.primaryAction.label}
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryAction.href}
              variant="secondary"
              icon={<Heart size={19} strokeWidth={1.8} />}
            >
              {hero.secondaryAction.label}
            </ButtonLink>
          </div>
        </div>
      </Container>

      <p className="hero__trust">{hero.trust}</p>
    </section>
  );
}
