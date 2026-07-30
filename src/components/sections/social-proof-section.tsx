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
            <article key={item.title} className="social-proof__card">
              <span className="social-proof__stars" aria-hidden="true">
                {item.stars}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <footer>{item.signature}</footer>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
