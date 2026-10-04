"use client";

import type { AnchorHTMLAttributes } from "react";

import {
  trackMetaPixelEvent,
  type MetaPixelEvent,
  type MetaPixelParameters,
} from "@/lib/meta-pixel";

type MetaPixelAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  pixelEvent: MetaPixelEvent;
  pixelEventParameters?: MetaPixelParameters;
};

export function MetaPixelAnchor({
  pixelEvent,
  pixelEventParameters,
  onClick,
  ...anchorProps
}: MetaPixelAnchorProps) {
  return (
    <a
      {...anchorProps}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          trackMetaPixelEvent(pixelEvent, pixelEventParameters);
        }
      }}
    />
  );
}
