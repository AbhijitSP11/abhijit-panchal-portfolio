import type Lenis from "lenis";

/**
 * Lenis owns the scroll position, so anything that wants to move the page has
 * to go through it — `window.scrollTo` fights it and leaves ScrollTrigger
 * reading a position the page is not actually at.
 *
 * SmoothScroll registers the instance here; anyone needing to drive the page
 * calls `scrollToY`. Falls back to native scrolling when Lenis is off, which
 * is the case under prefers-reduced-motion.
 */
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function scrollToY(y: number, duration = 0.8) {
  if (instance) {
    instance.scrollTo(y, { duration });
    return;
  }
  if (typeof window !== "undefined") {
    window.scrollTo({ top: y, behavior: "auto" });
  }
}
