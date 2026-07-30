import { Sparkles } from "lucide-react";

type EditorialTickerProps = {
  readonly items: readonly string[];
  readonly ariaLabel: string;
  readonly tone?: "chocolate" | "champagne" | "light";
  readonly direction?: "forward" | "reverse";
};

function TickerGroup({ items }: { readonly items: readonly string[] }) {
  return (
    <div className="editorial-ticker__group">
      {items.map((item) => (
        <span key={item} className="editorial-ticker__item">
          <span>{item}</span>
          <Sparkles
            className="editorial-ticker__sparkle"
            size={16}
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </span>
      ))}
    </div>
  );
}

export function EditorialTicker({
  items,
  ariaLabel,
  tone = "chocolate",
  direction = "forward",
}: EditorialTickerProps) {
  return (
    <section
      className="editorial-ticker"
      data-tone={tone}
      data-direction={direction}
      aria-label={ariaLabel}
    >
      <p className="sr-only">{items.join(". ")}.</p>
      <div className="editorial-ticker__viewport" aria-hidden="true">
        <div className="editorial-ticker__track">
          <TickerGroup items={items} />
          <TickerGroup items={items} />
        </div>
      </div>
    </section>
  );
}
