"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { BRAND_ASSETS, SITE_CONTENT } from "@/data/site-content";

const PRELOADER_SESSION_KEY = "doces-da-nath:preloader-seen";
const PRELOADER_VISIBLE_MS = 1100;
const PRELOADER_REDUCED_MOTION_VISIBLE_MS = 450;
const PRELOADER_EXIT_FALLBACK_MS = 750;

type PreloaderPhase = "visible" | "exiting" | "hidden";

export function CurtainPreloader() {
  const [phase, setPhase] = useState<PreloaderPhase>("visible");

  useEffect(() => {
    let wasAlreadySeen = false;

    try {
      wasAlreadySeen = Boolean(
        window.sessionStorage.getItem(PRELOADER_SESSION_KEY),
      );
    } catch {
      // The visual still exits safely when browser storage is unavailable.
    }

    if (wasAlreadySeen) {
      const skipFrame = window.requestAnimationFrame(() => setPhase("hidden"));
      return () => window.cancelAnimationFrame(skipFrame);
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const visibleDuration = prefersReducedMotion
      ? PRELOADER_REDUCED_MOTION_VISIBLE_MS
      : PRELOADER_VISIBLE_MS;
    const exitTimer = window.setTimeout(() => setPhase("exiting"), visibleDuration);
    const fallback = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(PRELOADER_SESSION_KEY, "true");
        document.documentElement.dataset.preloaderSeen = "true";
      } catch {
        // Session persistence is progressive enhancement only.
      }

      setPhase("hidden");
    }, visibleDuration + PRELOADER_EXIT_FALLBACK_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(fallback);
    };
  }, []);

  function finishPreloader() {
    try {
      window.sessionStorage.setItem(PRELOADER_SESSION_KEY, "true");
      document.documentElement.dataset.preloaderSeen = "true";
    } catch {
      // Session persistence is progressive enhancement only.
    }

    setPhase("hidden");
  }

  if (phase === "hidden") {
    return null;
  }

  return (
    <div
      className="curtain-preloader"
      data-phase={phase}
      aria-hidden="true"
      onTransitionEnd={(event) => {
        if (event.currentTarget === event.target && phase === "exiting") {
          finishPreloader();
        }
      }}
    >
      <div className="preloader__content">
        <div className="preloader__mark">
          <Image
            src={BRAND_ASSETS.circularLogo}
            width={1080}
            height={1080}
            sizes="116px"
            alt=""
            className="preloader__logo"
            loading="eager"
          />
        </div>
        <p className="preloader__text">{SITE_CONTENT.preloader.message}</p>
        <div className="preloader__progress" aria-hidden="true">
          <span className="preloader__progress-fill" />
        </div>
      </div>
    </div>
  );
}
