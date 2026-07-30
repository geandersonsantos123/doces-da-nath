import { ArrowUp } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { BRAND_ASSETS, SITE_CONTENT } from "@/data/site-content";

export function AboutNathSection() {
  const { aboutNath } = SITE_CONTENT;

  return (
    <section
      id="sobre-a-nath"
      className="about-nath"
      aria-labelledby="about-nath-title"
    >
      <Container className="about-nath__inner">
        <div className="about-nath__visual">
          <div className="about-nath__portrait">
            <Image
              src={BRAND_ASSETS.aboutNath}
              fill
              sizes="(min-width: 1100px) 480px, (min-width: 768px) 42vw, calc(100vw - 32px)"
              alt={aboutNath.imageAlt}
              className="about-nath__image"
            />
          </div>
          <div className="about-nath__identity">
            <p className="about-nath__name">{aboutNath.name}</p>
            <p className="about-nath__role">{aboutNath.role}</p>
          </div>
        </div>

        <div className="about-nath__content">
          <header className="editorial-heading about-nath__heading">
            <p className="editorial-heading__eyebrow">{aboutNath.eyebrow}</p>
            <p className="about-nath__portrait-caption">
              {aboutNath.portraitCaption}
            </p>
            <h2 id="about-nath-title">{aboutNath.title}</h2>
          </header>

          <div className="about-nath__body">
            {aboutNath.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <ButtonLink
            href={aboutNath.action.href}
            variant="secondary"
            className="about-nath__action"
            icon={<ArrowUp size={18} strokeWidth={1.7} />}
          >
            {aboutNath.action.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
