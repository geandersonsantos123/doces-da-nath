import { Heart } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SITE_CONTENT } from "@/data/site-content";

export function SocialProofSection() {
  const { socialProof } = SITE_CONTENT;

  return (
    <section
      id="prova-social"
      className="social-proof"
      aria-labelledby="social-proof-title"
    >
      <Container>
        <header className="editorial-heading editorial-heading--centered">
          <p className="editorial-heading__eyebrow">{socialProof.eyebrow}</p>
          <h2 id="social-proof-title">{socialProof.title}</h2>
          <p className="editorial-heading__support">{socialProof.support}</p>
        </header>

        <div className="social-proof__grid">
          {socialProof.items.map((item) => (
            <article key={item.quote[0]} className="social-proof__card">
              <span className="social-proof__quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote>
                {item.quote.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </blockquote>
              <footer>
                <span aria-hidden="true" />
                <cite>{item.signature}</cite>
                <Heart aria-hidden="true" size={15} strokeWidth={1.8} />
              </footer>
              <div className="social-proof__stars" aria-hidden="true">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </article>
          ))}
        </div>

        <p className="social-proof__closing">
          <Heart aria-hidden="true" size={16} strokeWidth={1.8} />
          <span>{socialProof.closing}</span>
        </p>
      </Container>
    </section>
  );
}
