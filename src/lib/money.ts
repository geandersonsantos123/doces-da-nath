import { CATALOG_CURRENCY, CATALOG_LOCALE } from "@/constants/commerce";
import type { MoneyCents } from "@/types/product";

const brlFormatter = new Intl.NumberFormat(CATALOG_LOCALE, {
  style: "currency",
  currency: CATALOG_CURRENCY,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function isValidCents(value: number): value is MoneyCents {
  return Number.isSafeInteger(value) && value >= 0;
}

export function assertValidCents(
  value: number,
  label = "Valor em centavos",
): asserts value is MoneyCents {
  if (!isValidCents(value)) {
    throw new RangeError(`${label} deve ser um inteiro não negativo.`);
  }
}

export function addCents(...values: readonly MoneyCents[]): MoneyCents {
  let total = 0;

  for (const value of values) {
    assertValidCents(value);
    total += value;

    if (!Number.isSafeInteger(total)) {
      throw new RangeError("A soma monetária excedeu o limite seguro.");
    }
  }

  return total;
}

export function multiplyCents(
  value: MoneyCents,
  multiplier: number,
): MoneyCents {
  assertValidCents(value);

  if (!Number.isSafeInteger(multiplier) || multiplier < 0) {
    throw new RangeError("O multiplicador deve ser um inteiro não negativo.");
  }

  const result = value * multiplier;
  assertValidCents(result, "Resultado monetário");

  return result;
}

export function formatBRL(value: MoneyCents): string {
  assertValidCents(value);

  return brlFormatter
    .format(value / 100)
    .replaceAll("\u00a0", " ")
    .replaceAll("\u202f", " ");
}
