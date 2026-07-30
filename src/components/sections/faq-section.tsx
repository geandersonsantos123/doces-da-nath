import { ChevronDown } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SITE_CONTENT } from "@/data/site-content";

export function FaqSection() {
  const { faq } = SITE_CONTENT;

  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-title">
      <Container>
        <header className="editorial-heading editorial-heading--centered">
          <p className="editorial-heading__eyebrow">{faq.eyebrow}</p>
          <h2 id="faq-title">{faq.title}</h2>
          <p className="editorial-heading__support">{faq.support}</p>
        </header>

        <div className="faq-list">
          {faq.items.map((item) => (
            <details key={item.question} className="faq-item">
              <summary>
                <span>{item.question}</span>
                <ChevronDown size={20} strokeWidth={1.7} aria-hidden="true" />
              </summary>
              <div className="faq-item__answer">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
