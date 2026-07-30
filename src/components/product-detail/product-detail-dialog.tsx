"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Info, X } from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { ProductDetailMedia } from "@/components/product-detail/product-detail-media";
import { QuantityStepper } from "@/components/product-detail/quantity-stepper";
import { SITE_CONTENT } from "@/data/site-content";
import {
  createCartProductSnapshot,
  createCartVariantSnapshot,
} from "@/lib/cart-calculations";
import { formatBRL, multiplyCents } from "@/lib/money";
import { resolveProductUnitPrice } from "@/lib/product-pricing";
import type { CartItem, CartSelectedOption } from "@/types/cart";
import type {
  CatalogProduct,
  PendingField,
  ProductOptionGroup,
  ProductVariant,
} from "@/types/product";

type ProductDetailDialogProps = {
  product: CatalogProduct;
  categoryName: string;
  onClose: () => void;
};

type SelectedOptionIds = Record<string, readonly string[]>;
type TextOptionValues = Record<string, string>;

const PENDING_FIELD_LABELS: Record<PendingField, string> = {
  lead_time: "Prazo de produção a confirmar",
  fulfillment_details: "Entrega ou retirada a confirmar",
  customization_rules: "Personalização sujeita à confirmação",
  customization_pricing: "Valor da personalização a confirmar",
  cake_flavor_limit: "Limite de sabores do bolo a confirmar",
  kit_cake_flavors: "Sabores do bolo a confirmar",
  kit_sweet_flavors: "Sabores dos docinhos a confirmar",
  kit_cookie_flavors: "Sabores dos cookies a confirmar",
  box_flavors: "Sabores disponíveis a confirmar",
  box_flavor_limit: "Quantidade de sabores permitida a confirmar",
  bento_flavors: "Sabores do bento cake a confirmar",
  bento_colors: "Cores disponíveis a confirmar",
  ready_to_deliver_availability:
    "Pronta entrega somente conforme disponibilidade",
  price_confirmation: "Valor de 100 unidades sujeito à confirmação",
};

function getAvailabilityLabel(product: CatalogProduct): string {
  switch (product.availability) {
    case "made_to_order":
      return "Sob encomenda";
    case "ready_or_made_to_order":
      return "Pronta entrega sob consulta";
    case "ready_to_deliver":
      return "Pronta entrega";
    case "temporarily_unavailable":
      return "Temporariamente indisponível";
    case "hidden":
      return "Indisponível";
  }
}

function getVariantSupportingLabel(variant: ProductVariant): string | null {
  if (variant.yield) {
    const unit = variant.yield.unit === "slices" ? "fatias" : "pessoas";
    return `${variant.yield.approximate ? "Aprox. " : ""}${variant.yield.amount} ${unit}`;
  }

  return null;
}

function getOptionGroupError(
  group: ProductOptionGroup,
  selectedOptionIds: SelectedOptionIds,
  textOptionValues: TextOptionValues,
): string | null {
  if (!group.required) {
    return null;
  }

  if (group.type === "text") {
    return textOptionValues[group.id]?.trim()
      ? null
      : `Informe ${group.label.toLocaleLowerCase("pt-BR")}.`;
  }

  return selectedOptionIds[group.id]?.length
    ? null
    : `Escolha ${group.label.toLocaleLowerCase("pt-BR")}.`;
}

function getSelectedCartOptions(
  product: CatalogProduct,
  selectedOptionIds: SelectedOptionIds,
  textOptionValues: TextOptionValues,
): readonly CartSelectedOption[] {
  return product.optionGroups.flatMap<CartSelectedOption>((group) => {
    if (group.type === "text") {
      const value = textOptionValues[group.id]?.trim() ?? "";

      return value
        ? [
            {
              groupId: group.id,
              groupLabel: group.label,
              type: group.type,
              optionId: null,
              value,
              priceModifierCents: 0,
            },
          ]
        : [];
    }

    const selectedIds = selectedOptionIds[group.id] ?? [];

    return selectedIds.flatMap((optionId) => {
      const option = group.options.find((item) => item.id === optionId);

      return option
        ? [
            {
              groupId: group.id,
              groupLabel: group.label,
              type: group.type,
              optionId: option.id,
              value: option.label,
              priceModifierCents: option.priceModifierCents,
            },
          ]
        : [];
    });
  });
}

export function ProductDetailDialog({
  product,
  categoryName,
  onClose,
}: ProductDetailDialogProps) {
  const { addItem } = useCart();
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null,
  );
  const [selectedOptionIds, setSelectedOptionIds] =
    useState<SelectedOptionIds>({});
  const [textOptionValues, setTextOptionValues] =
    useState<TextOptionValues>({});
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [validationAttempted, setValidationAttempted] = useState(false);
  const [configurationReady, setConfigurationReady] = useState(false);

  useEffect(() => {
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = panelRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements || focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [onClose]);

  const selectedPriceModifiers = useMemo(
    () =>
      product.optionGroups.flatMap((group) => {
        if (group.type === "text") {
          return [];
        }

        const selectedIds = selectedOptionIds[group.id] ?? [];
        return selectedIds.flatMap((optionId) => {
          const option = group.options.find((item) => item.id === optionId);
          return option ? [{ priceModifierCents: option.priceModifierCents }] : [];
        });
      }),
    [product.optionGroups, selectedOptionIds],
  );

  const priceResolution = useMemo(
    () =>
      resolveProductUnitPrice(
        product,
        selectedVariantId,
        selectedPriceModifiers,
      ),
    [product, selectedPriceModifiers, selectedVariantId],
  );

  const subtotalCents =
    priceResolution.status === "resolved"
      ? multiplyCents(priceResolution.unitPriceCents, quantity)
      : null;

  const variantError =
    product.variantGroup?.required && selectedVariantId === null
      ? `Escolha ${product.variantGroup.label.toLocaleLowerCase("pt-BR")}.`
      : null;

  const optionGroupErrors = Object.fromEntries(
    product.optionGroups.map((group) => [
      group.id,
      getOptionGroupError(group, selectedOptionIds, textOptionValues),
    ]),
  );
  const hasOptionErrors = Object.values(optionGroupErrors).some(Boolean);
  const isConfigurationValid =
    variantError === null &&
    !hasOptionErrors &&
    priceResolution.status === "resolved";

  function markConfigurationChanged() {
    setConfigurationReady(false);
  }

  function selectVariant(variantId: string) {
    setSelectedVariantId(variantId);
    markConfigurationChanged();
  }

  function selectSingleOption(groupId: string, optionId: string) {
    setSelectedOptionIds((current) => ({
      ...current,
      [groupId]: [optionId],
    }));
    markConfigurationChanged();
  }

  function toggleMultipleOption(
    group: ProductOptionGroup,
    optionId: string,
  ) {
    setSelectedOptionIds((current) => {
      const selectedIds = current[group.id] ?? [];
      const isSelected = selectedIds.includes(optionId);

      if (
        !isSelected &&
        group.maxSelections !== undefined &&
        selectedIds.length >= group.maxSelections
      ) {
        return current;
      }

      return {
        ...current,
        [group.id]: isSelected
          ? selectedIds.filter((id) => id !== optionId)
          : [...selectedIds, optionId],
      };
    });
    markConfigurationChanged();
  }

  const selectedVariant = product.variants.find(
    (variant) => variant.id === selectedVariantId,
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationAttempted(true);

    if (!isConfigurationValid) {
      setConfigurationReady(false);
      requestAnimationFrame(() => {
        panelRef.current
          ?.querySelector<HTMLElement>(
            '[aria-invalid="true"], [data-invalid="true"] input',
          )
          ?.focus();
      });
      return;
    }

    const item: CartItem = {
      productId: product.id,
      product: createCartProductSnapshot(product),
      selectedVariant: selectedVariant
        ? createCartVariantSnapshot(selectedVariant)
        : null,
      selectedOptions: getSelectedCartOptions(
        product,
        selectedOptionIds,
        textOptionValues,
      ),
      quantity,
      notes: notes.trim(),
    };

    addItem(item);
    setConfigurationReady(true);
  }

  return (
    <div
      className="product-detail-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={panelRef}
        className="product-detail"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <div className="product-detail__handle" aria-hidden="true" />

        <header className="product-detail__header">
          <div>
            <p className="product-detail__category">{categoryName}</p>
            <h2 id={titleId} className="product-detail__title">
              {product.name}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="product-detail__close"
            aria-label={`Fechar detalhes de ${product.name}`}
            onClick={onClose}
          >
            <X aria-hidden="true" size={21} />
          </button>
        </header>

        <form className="product-detail__form" onSubmit={handleSubmit} noValidate>
          <div className="product-detail__main">
            <ProductDetailMedia
              productName={product.name}
              image={product.images[0]}
            />

            <div className="product-detail__scroll">
              <div className="product-detail__intro">
                <span className="product-detail__availability">
                  {getAvailabilityLabel(product)}
                </span>
                <p id={descriptionId} className="product-detail__description">
                  {product.fullDescription}
                </p>
              </div>

              {product.contents.length > 0 || product.specifications.length > 0 ? (
                <div className="product-detail__facts">
                  {product.contents.length > 0 ? (
                    <div>
                      <h3>O que acompanha</h3>
                      <ul>
                        {product.contents.map((item) => (
                          <li key={`${item.quantity}-${item.label}`}>
                            {item.quantity} {item.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {product.specifications.length > 0 ? (
                    <dl>
                      {product.specifications.map((item) => (
                        <div key={item.label}>
                          <dt>{item.label}</dt>
                          <dd>{item.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                </div>
              ) : null}

              {product.variantGroup ? (
                <fieldset
                  className="product-detail__field-group"
                  data-invalid={validationAttempted && variantError !== null}
                  aria-describedby={
                    validationAttempted && variantError
                      ? `${product.id}-variant-error`
                      : undefined
                  }
                >
                  <legend>
                    {product.variantGroup.label}
                    {product.variantGroup.required ? <span>Obrigatório</span> : null}
                  </legend>
                  <div className="product-detail__choice-grid">
                    {product.variants.map((variant) => {
                      const supportingLabel = getVariantSupportingLabel(variant);
                      return (
                        <label
                          key={variant.id}
                          className="product-detail__choice"
                          data-selected={selectedVariantId === variant.id}
                        >
                          <input
                            type="radio"
                            name={`${product.id}-${product.variantGroup?.id}`}
                            value={variant.id}
                            checked={selectedVariantId === variant.id}
                            onChange={() => selectVariant(variant.id)}
                          />
                          <span className="product-detail__choice-copy">
                            <strong>{variant.label}</strong>
                            {supportingLabel ? <small>{supportingLabel}</small> : null}
                            <b>{formatBRL(variant.priceCents)}</b>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {validationAttempted && variantError ? (
                    <p
                      id={`${product.id}-variant-error`}
                      className="product-detail__field-error"
                    >
                      {variantError}
                    </p>
                  ) : null}
                </fieldset>
              ) : null}

              {product.optionGroups.map((group) => {
                const error = optionGroupErrors[group.id];
                const errorId = `${product.id}-${group.id}-error`;

                if (group.type === "text") {
                  const value = textOptionValues[group.id] ?? "";
                  return (
                    <div key={group.id} className="product-detail__text-field">
                      <label htmlFor={`${product.id}-${group.id}`}>
                        {group.label}
                        {group.required ? <span>Obrigatório</span> : null}
                      </label>
                      <textarea
                        id={`${product.id}-${group.id}`}
                        value={value}
                        maxLength={280}
                        rows={3}
                        aria-invalid={validationAttempted && error !== null}
                        aria-describedby={
                          validationAttempted && error ? errorId : undefined
                        }
                        placeholder="Conte um pouco do que você imagina"
                        onChange={(event) => {
                          setTextOptionValues((current) => ({
                            ...current,
                            [group.id]: event.target.value,
                          }));
                          markConfigurationChanged();
                        }}
                      />
                      <span className="product-detail__character-count">
                        {value.length}/280
                      </span>
                      {validationAttempted && error ? (
                        <p id={errorId} className="product-detail__field-error">
                          {error}
                        </p>
                      ) : null}
                    </div>
                  );
                }

                const selectedIds = selectedOptionIds[group.id] ?? [];
                return (
                  <fieldset
                    key={group.id}
                    className="product-detail__field-group"
                    data-invalid={validationAttempted && error !== null}
                    aria-describedby={
                      validationAttempted && error ? errorId : undefined
                    }
                  >
                    <legend>
                      {group.label}
                      {group.required ? <span>Obrigatório</span> : null}
                    </legend>
                    <div className="product-detail__option-grid">
                      {group.options.map((option) => {
                        const isSelected = selectedIds.includes(option.id);
                        const reachedLimit =
                          group.type === "multiple" &&
                          group.maxSelections !== undefined &&
                          selectedIds.length >= group.maxSelections;

                        return (
                          <label
                            key={option.id}
                            className="product-detail__option"
                            data-selected={isSelected}
                          >
                            <input
                              type={group.type === "single" ? "radio" : "checkbox"}
                              name={`${product.id}-${group.id}`}
                              value={option.id}
                              checked={isSelected}
                              disabled={!isSelected && reachedLimit}
                              onChange={() =>
                                group.type === "single"
                                  ? selectSingleOption(group.id, option.id)
                                  : toggleMultipleOption(group, option.id)
                              }
                            />
                            <span>{option.label}</span>
                          </label>
                        );
                      })}
                    </div>
                    {validationAttempted && error ? (
                      <p id={errorId} className="product-detail__field-error">
                        {error}
                      </p>
                    ) : null}
                  </fieldset>
                );
              })}

              <div className="product-detail__quantity-row">
                <div>
                  <h3>Quantidade</h3>
                  <p>Número de itens com esta configuração.</p>
                </div>
                <QuantityStepper
                  value={quantity}
                  onChange={(value) => {
                    setQuantity(value);
                    markConfigurationChanged();
                  }}
                />
              </div>

              {product.allowsNotes ? (
                <div className="product-detail__text-field">
                  <label htmlFor={`${product.id}-notes`}>Observações do item</label>
                  <textarea
                    id={`${product.id}-notes`}
                    value={notes}
                    maxLength={280}
                    rows={3}
                    placeholder="Ex.: detalhes importantes para o atendimento"
                    onChange={(event) => {
                      setNotes(event.target.value);
                      markConfigurationChanged();
                    }}
                  />
                  <span className="product-detail__character-count">
                    {notes.length}/280
                  </span>
                  <p className="product-detail__field-help">
                    Personalizações e detalhes serão confirmados durante o atendimento.
                  </p>
                </div>
              ) : null}

              <aside className="product-detail__pending" aria-label="Informações a confirmar">
                <div className="product-detail__pending-title">
                  <Info aria-hidden="true" size={17} />
                  <h3>A confirmar no atendimento</h3>
                </div>
                <ul>
                  {product.pendingFields.map((field) => (
                    <li key={field}>{PENDING_FIELD_LABELS[field]}</li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>

          <footer className="product-detail__footer">
            <div className="product-detail__price-summary" aria-live="polite">
              <div>
                <span>Unitário</span>
                <strong>
                  {priceResolution.status === "resolved"
                    ? formatBRL(priceResolution.unitPriceCents)
                    : "Selecione"}
                </strong>
              </div>
              <div>
                <span>Quantidade</span>
                <strong>{quantity}</strong>
              </div>
              <div>
                <span>Subtotal</span>
                <strong>
                  {subtotalCents === null ? "—" : formatBRL(subtotalCents)}
                </strong>
              </div>
            </div>

            {selectedVariant?.requiresPriceConfirmation ? (
              <p className="product-detail__price-warning">
                Valor de 100 unidades sujeito à confirmação.
              </p>
            ) : null}

            <div
              className="product-detail__action-feedback"
              role={configurationReady ? "status" : "alert"}
              aria-live={configurationReady ? "polite" : "assertive"}
            >
              {configurationReady ? (
                <p>
                  <CheckCircle2 aria-hidden="true" size={17} />
                  {SITE_CONTENT.productDetail.addedFeedback}
                </p>
              ) : validationAttempted && !isConfigurationValid ? (
                <p>Revise os campos obrigatórios destacados.</p>
              ) : null}
            </div>

            <button
              type="submit"
              className="product-detail__submit"
              disabled={configurationReady}
            >
              {configurationReady
                ? "Adicionado ao carrinho"
                : "Adicionar ao carrinho"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
