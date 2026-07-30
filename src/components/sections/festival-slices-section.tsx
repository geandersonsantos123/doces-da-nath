import {
  CalendarDays,
  Clock3,
  Heart,
  PackageCheck,
} from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SITE_CONTENT } from "@/data/site-content";
import { createWhatsAppOrderUrl } from "@/lib/whatsapp-url";

const SCHEDULE_ICONS = [CalendarDays, Clock3, PackageCheck] as const;

export function FestivalSlicesSection() {
  const { festival } = SITE_CONTENT;
  const whatsappUrl = createWhatsAppOrderUrl(festival.whatsappMessage);

  return (
    <section
      id="festival-de-fatias"
      className="festival-slices"
      aria-labelledby="festival-de-fatias-title"
    >
      <Container className="festival-slices__inner">
        <header className="festival-slices__heading">
          <p className="festival-slices__eyebrow">{festival.eyebrow}</p>
          <h2 id="festival-de-fatias-title">{festival.title}</h2>
          <div className="festival-slices__divider" aria-hidden="true">
            <span />
            <Heart size={15} strokeWidth={1.7} />
            <span />
          </div>
        </header>

        <p className="festival-slices__description">
          {festival.description}
        </p>

        <div className="festival-slices__media">
          <Image
            src={festival.images.mobile}
            width={1122}
            height={1402}
            sizes="(max-width: 767px) calc(100vw - 2rem), 1px"
            alt={festival.imageAlt}
            className="festival-slices__image festival-slices__image--mobile"
          />
          <Image
            src={festival.images.desktop}
            width={1536}
            height={1024}
            sizes="(min-width: 1024px) 53vw, (min-width: 768px) calc(100vw - 3rem), 1px"
            alt={festival.imageAlt}
            className="festival-slices__image festival-slices__image--desktop"
          />
        </div>

        <ul
          className="festival-slices__schedule"
          aria-label="Quando acontece o Festival de Fatias"
        >
          {festival.schedule.map((item, index) => {
            const Icon = SCHEDULE_ICONS[index];

            return (
              <li key={item.label}>
                <span className="festival-slices__schedule-icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.7} />
                </span>
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>

        <div className="festival-slices__action">
          <ButtonLink
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="festival-slices__button"
            aria-label="Reservar fatia pelo WhatsApp, abre em nova aba"
            icon={<Heart size={18} strokeWidth={1.8} />}
          >
            {festival.cta}
          </ButtonLink>
          <p>{festival.microcopy}</p>
        </div>
      </Container>
    </section>
  );
}
