import { Minus, Plus } from "lucide-react";

type QuantityStepperProps = {
  value: number;
  itemName?: string;
  onChange: (value: number) => void;
};

export function QuantityStepper({
  value,
  itemName,
  onChange,
}: QuantityStepperProps) {
  const itemSuffix = itemName ? ` de ${itemName}` : "";
  function increase() {
    if (Number.isSafeInteger(value + 1)) {
      onChange(value + 1);
    }
  }

  return (
    <div className="quantity-stepper" aria-label="Quantidade do item">
      <button
        type="button"
        className="quantity-stepper__button"
        aria-label={`Diminuir quantidade${itemSuffix}`}
        disabled={value <= 1}
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        <Minus aria-hidden="true" size={18} />
      </button>
      <output
        className="quantity-stepper__value"
        aria-live="polite"
        aria-label={`${value} ${value === 1 ? "item" : "itens"}`}
      >
        {value}
      </output>
      <button
        type="button"
        className="quantity-stepper__button"
        aria-label={`Aumentar quantidade${itemSuffix}`}
        onClick={increase}
      >
        <Plus aria-hidden="true" size={18} />
      </button>
    </div>
  );
}
