"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

import {
  trackMetaPixelEvent,
  type MetaPixelEvent,
  type MetaPixelParameters,
} from "@/lib/meta-pixel";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary";
  icon?: ReactNode;
  pixelEvent?: MetaPixelEvent;
  pixelEventParameters?: MetaPixelParameters;
};

export function ButtonLink({
  children,
  className = "",
  icon,
  onClick,
  pixelEvent,
  pixelEventParameters,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={`button-link button-link--${variant} ${className}`.trim()}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && pixelEvent) {
          trackMetaPixelEvent(pixelEvent, pixelEventParameters);
        }
      }}
      {...props}
    >
      <span>{children}</span>
      {icon ? (
        <span className="button-link__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
    </a>
  );
}
