import { AtSign, ExternalLink, MessageCircleMore } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { BRAND_ASSETS, SITE_CONTENT } from "@/data/site-content";

export function SiteFooter() {
  const { footer } = SITE_CONTENT;

  return (
    <footer className="site-footer">
      <Container className="site-footer__inner">
        <div className="site-footer__brand">
          <a href="#top" aria-label="Doces da Nath, voltar ao início">
            <Image
              src={BRAND_ASSETS.circularLogo}
              width={1080}
              height={1080}
              sizes="88px"
              alt="Doces da Nath Confeitaria"
              className="site-footer__logo"
            />
          </a>
          <p>{footer.brandStatement}</p>
        </div>

        <nav
          className="site-footer__navigation"
          aria-label={footer.navigationLabel}
        >
          <h2>{footer.navigationLabel}</h2>
          <ul>
            {footer.navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <address className="site-footer__contact">
          <h2>{footer.contactLabel}</h2>
          <a
            href={footer.instagram.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${footer.instagram.label} no Instagram, abre em nova aba`}
          >
            <AtSign size={19} strokeWidth={1.7} aria-hidden="true" />
            <span>{footer.instagram.label}</span>
            <ExternalLink size={14} strokeWidth={1.7} aria-hidden="true" />
          </a>
          <a
            href={footer.whatsapp.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${footer.whatsapp.label} no WhatsApp, abre em nova aba`}
          >
            <MessageCircleMore
              size={19}
              strokeWidth={1.7}
              aria-hidden="true"
            />
            <span>{footer.whatsapp.label}</span>
            <ExternalLink size={14} strokeWidth={1.7} aria-hidden="true" />
          </a>
          <p>{footer.contactHelp}</p>
        </address>

        <div className="site-footer__legal">
          <p>{footer.confirmationNotice}</p>
          <p>{footer.rights}</p>
        </div>
      </Container>
    </footer>
  );
}
