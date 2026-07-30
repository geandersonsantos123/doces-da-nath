import {
  ORDER_DATE_FUTURE_YEARS,
  ORDER_MIN_LEAD_DAYS,
} from "@/constants/commerce";

export type OrderDatePart = "day" | "month" | "year";

export type OrderDateParts = {
  readonly day: string;
  readonly month: string;
  readonly year: string;
};

const EMPTY_DATE_PARTS: OrderDateParts = {
  day: "",
  month: "",
  year: "",
};

export const ORDER_TIME_ZONE = "America/Sao_Paulo" as const;

const orderDateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: ORDER_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function padDatePart(value: number): string {
  return String(value).padStart(2, "0");
}

function formatUtcOrderDate(value: Date): string {
  return `${value.getUTCFullYear()}-${padDatePart(value.getUTCMonth() + 1)}-${padDatePart(value.getUTCDate())}`;
}

export function isRealOrderDate(value: string | null): value is string {
  if (value === null || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const parsedDate = new Date(Date.UTC(year, month - 1, day));

  return (
    parsedDate.getUTCFullYear() === year &&
    parsedDate.getUTCMonth() === month - 1 &&
    parsedDate.getUTCDate() === day
  );
}

export function buildOrderDate(parts: OrderDateParts): string | null {
  if (
    !/^\d{1,2}$/.test(parts.day) ||
    !/^\d{1,2}$/.test(parts.month) ||
    !/^\d{4}$/.test(parts.year)
  ) {
    return null;
  }

  const normalized = `${parts.year}-${parts.month.padStart(2, "0")}-${parts.day.padStart(2, "0")}`;
  return isRealOrderDate(normalized) ? normalized : null;
}

export function parseOrderDate(value: string | null): OrderDateParts {
  if (!isRealOrderDate(value)) {
    return EMPTY_DATE_PARTS;
  }

  const [year, month, day] = value.split("-");
  return { day, month, year };
}

export function getTodayOrderDate(today = new Date()): string {
  if (Number.isNaN(today.getTime())) {
    throw new RangeError("A data de referência do pedido é inválida.");
  }

  const parts = Object.fromEntries(
    orderDateFormatter
      .formatToParts(today)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );

  return `${parts.year}-${parts.month}-${parts.day}`;
}

export function addOrderDateDays(value: string, days: number): string {
  if (!isRealOrderDate(value)) {
    throw new TypeError("A data base do pedido é inválida.");
  }

  if (!Number.isSafeInteger(days)) {
    throw new TypeError("A quantidade de dias deve ser um inteiro seguro.");
  }

  const [year, month, day] = value.split("-").map(Number);
  const result = new Date(Date.UTC(year, month - 1, day + days));
  return formatUtcOrderDate(result);
}

export function getMinimumOrderDate(today = new Date()): string {
  return addOrderDateDays(getTodayOrderDate(today), ORDER_MIN_LEAD_DAYS);
}

export function isPastOrderDate(
  value: string | null,
  today = new Date(),
): boolean {
  return isRealOrderDate(value) && value < getTodayOrderDate(today);
}

export function isBeforeMinimumOrderDate(
  value: string | null,
  today = new Date(),
): boolean {
  return isRealOrderDate(value) && value < getMinimumOrderDate(today);
}

export function formatOrderDateBR(value: string | null): string | null {
  if (!isRealOrderDate(value)) {
    return null;
  }

  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

export function getOrderDateYears(
  today = new Date(),
  selectedYear?: string,
): readonly number[] {
  const currentYear = Number(getTodayOrderDate(today).slice(0, 4));
  const minimumYear = Number(getMinimumOrderDate(today).slice(0, 4));
  const maximumYear = currentYear + ORDER_DATE_FUTURE_YEARS;
  const years = Array.from(
    { length: maximumYear - minimumYear + 1 },
    (_, index) => minimumYear + index,
  );
  const parsedSelectedYear = Number(selectedYear);

  if (
    Number.isSafeInteger(parsedSelectedYear) &&
    parsedSelectedYear >= 1000 &&
    parsedSelectedYear <= 9999 &&
    !years.includes(parsedSelectedYear)
  ) {
    return [...years, parsedSelectedYear].sort((a, b) => a - b);
  }

  return years;
}
