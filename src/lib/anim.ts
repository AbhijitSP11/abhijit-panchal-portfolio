import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Register GSAP plugins exactly once, on the client. */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export const EASE = "power3.out";
export const EASE_EXPO = "expo.out";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { onPreloaderDone } from "./preloader-state";

/**
 * Wraps every word of `el` in a masked span so the words can be animated up
 * from behind their own clipping box. Returns the inner spans to animate.
 */
export function splitWords(el: HTMLElement): HTMLElement[] {
  const source = el.dataset.splitSource ?? el.textContent ?? "";
  el.dataset.splitSource = source;
  el.innerHTML = "";

  const inners: HTMLElement[] = [];
  for (const chunk of source.split(/(\s+)/)) {
    if (chunk === "") continue;
    if (/^\s+$/.test(chunk)) {
      el.appendChild(document.createTextNode(" "));
      continue;
    }
    const outer = document.createElement("span");
    outer.style.display = "inline-block";
    outer.style.overflow = "hidden";
    outer.style.verticalAlign = "top";
    // keep descenders from being clipped by the mask
    outer.style.paddingBottom = "0.14em";
    outer.style.marginBottom = "-0.14em";

    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.style.willChange = "transform";
    inner.textContent = chunk;

    outer.appendChild(inner);
    el.appendChild(outer);
    inners.push(inner);
  }
  return inners;
}

/** Masked word-by-word reveal, fired when the element scrolls into view. */
export function revealWords(
  el: HTMLElement,
  opts: { delay?: number; stagger?: number; trigger?: Element; start?: string } = {}
) {
  const words = splitWords(el);
  el.style.opacity = "1";

  if (prefersReducedMotion()) {
    gsap.set(words, { yPercent: 0 });
    return;
  }

  return gsap.from(words, {
    yPercent: 115,
    duration: 1,
    ease: EASE_EXPO,
    delay: opts.delay ?? 0,
    stagger: opts.stagger ?? 0.045,
    scrollTrigger: {
      trigger: opts.trigger ?? el,
      start: opts.start ?? "top 85%",
      once: true,
    },
  });
}

/** Plain fade-and-rise for blocks of content. */
export function revealUp(
  targets: gsap.TweenTarget,
  opts: { trigger: Element; delay?: number; stagger?: number; y?: number; start?: string }
) {
  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return;
  }
  return gsap.fromTo(
    targets,
    { opacity: 0, y: opts.y ?? 28 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: EASE,
      delay: opts.delay ?? 0,
      stagger: opts.stagger ?? 0.08,
      scrollTrigger: {
        trigger: opts.trigger,
        start: opts.start ?? "top 82%",
        once: true,
      },
    }
  );
}

export { gsap, ScrollTrigger };
