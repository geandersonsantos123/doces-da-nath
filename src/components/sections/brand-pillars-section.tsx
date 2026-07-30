import { ChefHat, Heart, Sparkles } from "lucide-react";

import { BrandLogo } from "@/components/branding/brand-logo";
import { Container } from "@/components/ui/container";
import { SITE_CONTENT } from "@/data/site-content";

const PILLAR_ICONS = [Heart, ChefHat, Sparkles] as const;

export function BrandPillarsSection() {
  const { brandPillars } = SITE_CONTENT;

  return (
    <section
      id="diferenciais"
      className="brand-pillars"
      aria-labelledby="brand-pillars-title"
    >
      <Container>
        <header className="brand-pillars__heading">
          <p>{brandPillars.eyebrow}</p>
          <h2 id="brand-pillars-title">
            <span>{brandPillars.titleLead}</span>
            <span>{brandPillars.titleConnector}</span>
            <BrandLogo
              alt="Doces da Nath"
              className="brand-pillars__title-logo"
            />
          </h2>
          <p>{brandPillars.support}</p>
        </header>

        <ul
          className="brand-pillars__grid"
          aria-label="Os três pilares da Doces da Nath"
          tabIndex={0}
        >
          {brandPillars.items.map((item, index) => {
            const Icon = PILLAR_ICONS[index];

            return (
              <li key={item.title}>
                <span className="brand-pillars__icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.6} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
