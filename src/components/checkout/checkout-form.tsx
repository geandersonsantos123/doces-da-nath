"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { MapPin, MessageCircleMore, Store, UserRound } from "lucide-react";

import { ORDER_MIN_LEAD_DAYS } from "@/constants/commerce";
import {
  PAYMENT_METHOD_TO_CONFIRM,
  validateCheckoutOrder,
} from "@/lib/checkout-validation";
import type {
  CheckoutField,
  CheckoutFieldErrors,
} from "@/lib/checkout-validation";
import {
  buildOrderDate,
  formatOrderDateBR,
  getMinimumOrderDate,
  getOrderDateYears,
  parseOrderDate,
} from "@/lib/order-date";
import type { OrderDatePart, OrderDateParts } from "@/lib/order-date";
import type { CartOrderDetails, OrderFulfillmentMode } from "@/types/cart";

type CheckoutFormProps = {
  order: CartOrderDetails;
  onChange: (details: Partial<CartOrderDetails>) => void;
  onBack: () => void;
  onReview: () => void;
};

const FULFILLMENT_OPTIONS = [
  {
    value: "pickup",
    label: "Retirada",
    help: "O local e o horário de retirada serão confirmados no atendimento.",
    icon: Store,
  },
  {
    value: "delivery",
    label: "Entrega",
    help: "A disponibilidade e a taxa de entrega serão confirmadas pela Nath.",
    icon: MapPin,
  },
  {
    value: "arrange_on_whatsapp",
    label: "Combinar pelo WhatsApp",
    help: "A melhor forma de recebimento será combinada durante o atendimento.",
    icon: MessageCircleMore,
  },
] as const satisfies readonly {
  value: OrderFulfillmentMode;
  label: string;
  help: string;
  icon: typeof Store;
}[];

const DATE_DAYS = Array.from({ length: 31 }, (_, index) => index + 1);
const DATE_MONTHS = [
  ["01", "Jan"],
  ["02", "Fev"],
  ["03", "Mar"],
  ["04", "Abr"],
  ["05", "Mai"],
  ["06", "Jun"],
  ["07", "Jul"],
  ["08", "Ago"],
  ["09", "Set"],
  ["10", "Out"],
  ["11", "Nov"],
  ["12", "Dez"],
] as const;

export function CheckoutForm({
  order,
  onChange,
  onBack,
  onReview,
}: CheckoutFormProps) {
  const customerNameRef = useRef<HTMLInputElement>(null);
  const fulfillmentRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLSelectElement>(null);
  const paymentRef = useRef<HTMLInputElement>(null);
  const [dateParts, setDateParts] = useState<OrderDateParts>(() =>
    parseOrderDate(order.desiredDate),
  );
  const [errors, setErrors] = useState<CheckoutFieldErrors>({});
  const orderDateNow = new Date();
  const minimumOrderDate = getMinimumOrderDate(orderDateNow);
  const minimumOrderDateLabel =
    formatOrderDateBR(minimumOrderDate) ?? minimumOrderDate;
  const minimumYear = Number(minimumOrderDate.slice(0, 4));
  const availableYears = getOrderDateYears(orderDateNow, dateParts.year);

  function clearFieldError(field: CheckoutField) {
    setErrors((current) => {
      if (current[field] === undefined) {
        return current;
      }

      return { ...current, [field]: undefined };
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedCustomerName = order.customerName.trim();

    if (normalizedCustomerName !== order.customerName) {
      onChange({ customerName: normalizedCustomerName });
    }

    const result = validateCheckoutOrder(order);
    setErrors(result.errors);

    if (!result.isValid) {
      const focusTargets = {
        customerName: customerNameRef.current,
        fulfillmentMode: fulfillmentRef.current,
        desiredDate: dateRef.current,
        paymentMethodId: paymentRef.current,
      } satisfies Record<CheckoutField, HTMLElement | null>;

      requestAnimationFrame(() =>
        focusTargets[result.firstInvalidField]?.focus(),
      );
      return;
    }

    onReview();
  }

  function updateDatePart(part: OrderDatePart, value: string) {
    const nextParts = { ...dateParts, [part]: value };
    setDateParts(nextParts);
    onChange({ desiredDate: buildOrderDate(nextParts) });
    clearFieldError("desiredDate");
  }

  function isDayUnavailable(day: number): boolean {
    if (!dateParts.month || !dateParts.year) {
      return false;
    }

    const candidate = buildOrderDate({
      day: String(day),
      month: dateParts.month,
      year: dateParts.year,
    });

    return candidate === null || candidate < minimumOrderDate;
  }

  function isMonthUnavailable(month: string): boolean {
    if (!dateParts.year) {
      return false;
    }

    return `${dateParts.year}-${month}` < minimumOrderDate.slice(0, 7);
  }

  return (
    <form className="checkout-stage" onSubmit={handleSubmit} noValidate>
      <div className="checkout-stage__body">
        <div className="checkout-intro">
          <p>
            Informe somente o necessário para a Nath entender como você deseja
            receber o pedido.
          </p>
        </div>

        <div className="checkout-field checkout-customer-field">
          <label htmlFor="checkout-customer-name">
            Seu nome <span>Obrigatório</span>
          </label>
          <div className="checkout-input-shell">
            <UserRound aria-hidden="true" size={18} />
            <input
              ref={customerNameRef}
              id="checkout-customer-name"
              type="text"
              value={order.customerName}
              maxLength={80}
              autoComplete="name"
              placeholder="Ex: Maria Silva"
              aria-invalid={errors.customerName !== undefined}
              aria-describedby={
                errors.customerName ? "checkout-name-error" : undefined
              }
              onChange={(event) => {
                onChange({
                  customerName: event.target.value.replace(/^\s+/, ""),
                });
                clearFieldError("customerName");
              }}
              onBlur={() => {
                const normalizedCustomerName = order.customerName.trim();

                if (normalizedCustomerName !== order.customerName) {
                  onChange({ customerName: normalizedCustomerName });
                }
              }}
            />
          </div>
          {errors.customerName ? (
            <p id="checkout-name-error" className="checkout-field-error">
              {errors.customerName}
            </p>
          ) : null}
        </div>

        <fieldset
          className="checkout-fieldset"
          aria-invalid={errors.fulfillmentMode !== undefined}
          aria-describedby={
            errors.fulfillmentMode ? "checkout-fulfillment-error" : undefined
          }
        >
          <legend>
            Forma de recebimento <span>Obrigatório</span>
          </legend>
          <div className="checkout-choice-list">
            {FULFILLMENT_OPTIONS.map((option, index) => {
              const Icon = option.icon;

              return (
                <label
                  key={option.value}
                  className="checkout-choice"
                  data-selected={order.fulfillmentMode === option.value}
                >
                  <input
                    ref={index === 0 ? fulfillmentRef : undefined}
                    type="radio"
                    name="fulfillment-mode"
                    value={option.value}
                    checked={order.fulfillmentMode === option.value}
                    aria-describedby={
                      errors.fulfillmentMode
                        ? "checkout-fulfillment-error"
                        : undefined
                    }
                    onChange={() => {
                      onChange({ fulfillmentMode: option.value });
                      clearFieldError("fulfillmentMode");
                    }}
                  />
                  <Icon aria-hidden="true" size={19} />
                  <span>
                    <strong>{option.label}</strong>
                    <small>{option.help}</small>
                  </span>
                </label>
              );
            })}
          </div>
          {errors.fulfillmentMode ? (
            <p id="checkout-fulfillment-error" className="checkout-field-error">
              {errors.fulfillmentMode}
            </p>
          ) : null}
        </fieldset>

        <fieldset
          className="checkout-fieldset checkout-date-fieldset"
          aria-invalid={errors.desiredDate !== undefined}
          aria-describedby={
            errors.desiredDate
              ? "checkout-date-help checkout-date-error"
              : "checkout-date-help"
          }
        >
          <legend>
            Data desejada <span>Obrigatório</span>
          </legend>
          <div className="checkout-date-grid">
            <label className="checkout-date-select">
              <span>Dia</span>
              <select
                ref={dateRef}
                value={dateParts.day}
                aria-invalid={errors.desiredDate !== undefined}
                aria-describedby="checkout-date-help"
                onChange={(event) => updateDatePart("day", event.target.value)}
              >
                <option value="">Dia</option>
                {DATE_DAYS.map((day) => {
                  const value = String(day).padStart(2, "0");
                  return (
                    <option
                      key={value}
                      value={value}
                      disabled={isDayUnavailable(day)}
                    >
                      {value}
                    </option>
                  );
                })}
              </select>
            </label>
            <label className="checkout-date-select">
              <span>Mês</span>
              <select
                value={dateParts.month}
                aria-invalid={errors.desiredDate !== undefined}
                aria-describedby="checkout-date-help"
                onChange={(event) => updateDatePart("month", event.target.value)}
              >
                <option value="">Mês</option>
                {DATE_MONTHS.map(([value, label]) => (
                  <option
                    key={value}
                    value={value}
                    disabled={isMonthUnavailable(value)}
                  >
                    {value} - {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="checkout-date-select checkout-date-select--year">
              <span>Ano</span>
              <select
                value={dateParts.year}
                aria-invalid={errors.desiredDate !== undefined}
                aria-describedby="checkout-date-help"
                onChange={(event) => updateDatePart("year", event.target.value)}
              >
                <option value="">Ano</option>
                {availableYears.map((year) => (
                  <option
                    key={year}
                    value={year}
                    disabled={year < minimumYear}
                  >
                    {year}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p id="checkout-date-help" className="checkout-field-help">
            Pedidos devem ser feitos com pelo menos {ORDER_MIN_LEAD_DAYS} dias de
            antecedência. A primeira data disponível é {minimumOrderDateLabel}.
          </p>
          {errors.desiredDate ? (
            <p id="checkout-date-error" className="checkout-field-error">
              {errors.desiredDate}
            </p>
          ) : null}
        </fieldset>

        <fieldset
          className="checkout-fieldset"
          aria-invalid={errors.paymentMethodId !== undefined}
          aria-describedby={
            errors.paymentMethodId ? "checkout-payment-error" : undefined
          }
        >
          <legend>
            Forma de pagamento <span>Obrigatório</span>
          </legend>
          <label
            className="checkout-choice checkout-choice--single"
            data-selected={
              order.paymentMethodId === PAYMENT_METHOD_TO_CONFIRM
            }
          >
            <input
              ref={paymentRef}
              type="radio"
              name="payment-method"
              value={PAYMENT_METHOD_TO_CONFIRM}
              checked={order.paymentMethodId === PAYMENT_METHOD_TO_CONFIRM}
              aria-describedby={
                errors.paymentMethodId ? "checkout-payment-error" : undefined
              }
              onChange={() => {
                onChange({ paymentMethodId: PAYMENT_METHOD_TO_CONFIRM });
                clearFieldError("paymentMethodId");
              }}
            />
            <MessageCircleMore aria-hidden="true" size={19} />
            <span>
              <strong>A combinar no atendimento</strong>
              <small>As formas de pagamento serão confirmadas pela Nath.</small>
            </span>
          </label>
          {errors.paymentMethodId ? (
            <p id="checkout-payment-error" className="checkout-field-error">
              {errors.paymentMethodId}
            </p>
          ) : null}
        </fieldset>

        <div className="checkout-field">
          <label htmlFor="checkout-order-notes">Observação geral</label>
          <textarea
            id="checkout-order-notes"
            value={order.notes}
            maxLength={500}
            rows={4}
            placeholder="Ex: preciso para sábado, é para aniversário, prefiro combinar a retirada..."
            onChange={(event) => onChange({ notes: event.target.value })}
          />
          <span className="checkout-character-count">
            {order.notes.length}/500
          </span>
        </div>
      </div>

      <footer className="checkout-stage__footer">
        <button
          type="button"
          className="checkout-button checkout-button--secondary"
          onClick={onBack}
        >
          Voltar
        </button>
        <button type="submit" className="checkout-button checkout-button--primary">
          Revisar pedido
        </button>
      </footer>
    </form>
  );
}
