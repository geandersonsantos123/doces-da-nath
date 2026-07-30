import {
  Cake,
  CakeSlice,
  Candy,
  Cherry,
  Cookie,
  Croissant,
  Gift,
  Heart,
  IceCreamBowl,
  Lollipop,
  PartyPopper,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type SweetIconTickerProps = {
  readonly direction?: "forward" | "reverse";
  readonly ariaLabel?: string;
};

const sweetIcons: readonly LucideIcon[] = [
  CakeSlice,
  Heart,
  Candy,
  Cherry,
  Cookie,
  Sparkles,
  Cake,
  Gift,
  Lollipop,
  IceCreamBowl,
  Croissant,
  PartyPopper,
];

const rollerIcons = [...sweetIcons, ...sweetIcons];

function IconGroup() {
  return (
    <div className="sweet-icon-ticker__group">
      {rollerIcons.map((Icon, index) => (
        <span key={index} className="sweet-icon-ticker__item">
          <Icon size={27} strokeWidth={1.55} aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

export function SweetIconTicker({
  direction = "forward",
  ariaLabel = "Confeitaria, celebração e carinho",
}: SweetIconTickerProps) {
  return (
    <section
      className="sweet-icon-ticker"
      data-direction={direction}
      aria-label={ariaLabel}
    >
      <p className="sr-only">
        Uma sequência visual de confeitaria, celebração e carinho.
      </p>
      <div className="sweet-icon-ticker__viewport" aria-hidden="true">
        <div className="sweet-icon-ticker__track">
          <IconGroup />
          <IconGroup />
        </div>
      </div>
    </section>
  );
}
