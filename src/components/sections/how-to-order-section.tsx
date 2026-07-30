import {
  CheckCircle2,
  MessageCircleMore,
  Search,
  Settings2,
  ShoppingBag,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { SITE_CONTENT } from "@/data/site-content";

const STEP_ICONS = [Search, Settings2, ShoppingBag, MessageCircleMore] as const;

export function HowToOrderSection() {
  const { howToOrder } = SITE_CONTENT;

  return (
    <section
      id="como-pedir"
      className="how-to-order-section"
      aria-labelledby="how-to-order-title"
    >
      <Container>
        <header className="editorial-heading editorial-heading--centered">
          <p className="editorial-heading__eyebrow">{howToOrder.eyebrow}</p>
          <h2 id="how-to-order-title">{howToOrder.title}</h2>
          <p className="editorial-heading__support">{howToOrder.support}</p>
        </header>

        <ol className="how-to-order-list">
          {howToOrder.steps.map((step, index) => {
            const Icon = STEP_ICONS[index];

            return (
              <li key={step.number} className="how-to-order-step">
                <div className="how-to-order-step__top" aria-hidden="true">
                  <span className="how-to-order-step__icon">
                    <Icon size={21} strokeWidth={1.7} />
                  </span>
                  <span className="how-to-order-step__number">{step.number}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            );
          })}
        </ol>

        <aside className="how-to-order-notice">
          <CheckCircle2 size={20} strokeWidth={1.7} aria-hidden="true" />
          <p>{howToOrder.notice}</p>
        </aside>
      </Container>
    </section>
  );
}
