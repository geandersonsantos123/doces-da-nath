import {
  CalendarDays,
  ExternalLink,
  Gift,
  PackageCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { BRAND_ASSETS, SITE_CONTENT } from "@/data/site-content";

const BENEFIT_ICONS = [Gift, CalendarDays, Sparkles, PackageCheck] as const;

export function VipClubSection() {
  const { vipClub } = SITE_CONTENT;

  return (
    <section
      id="clube-vip"
      className="vip-club"
      aria-labelledby="vip-club-title"
    >
      <Container className="vip-club__inner">
        <div className="vip-club__content">
          <Image
            src={BRAND_ASSETS.vipClubSeal}
            width={1080}
            height={1080}
            sizes="(max-width: 767px) 96px, 120px"
            alt="Selo do Clube VIP da Doces da Nath"
            className="vip-club__seal"
          />
          <p className="vip-club__eyebrow">{vipClub.eyebrow}</p>
          <h2 id="vip-club-title">{vipClub.title}</h2>
          <p className="vip-club__lead">{vipClub.lead}</p>
          <p className="vip-club__description">{vipClub.description}</p>

          <ButtonLink
            href={vipClub.actionHref}
            target="_blank"
            rel="noopener noreferrer"
            className="vip-club__action"
            aria-label={`${vipClub.actionLabel}, abre formulário em nova aba`}
            icon={<ExternalLink size={17} strokeWidth={1.7} />}
          >
            {vipClub.actionLabel}
          </ButtonLink>
        </div>

        <ul className="vip-club__benefits">
          {vipClub.benefits.map((benefit, index) => {
            const Icon = BENEFIT_ICONS[index];

            return (
              <li key={benefit.title}>
                <span className="vip-club__benefit-icon" aria-hidden="true">
                  <Icon size={21} strokeWidth={1.7} />
                </span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
