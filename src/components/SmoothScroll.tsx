"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/smooth";
import {
  gsap,
  ScrollTrigger,
  registerGsap,
  prefersReducedMotion,
  onPreloaderDone,
} from "@/lib/anim";

/**
 * Drives the page with Lenis and keeps ScrollTrigger in step with it, so pinned
 * and scrubbed sections stay aligned with the eased scroll position.
 */
/**
 * `waitForIntro` is false on pages that have no preloader — otherwise Lenis
 * would stay stopped waiting for an intro that never runs, locking the page.
 */
export default function SmoothScroll({
  waitForIntro = true,
}: {
  waitForIntro?: boolean;
}) {
  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // The preloader holds the page still until it finishes.
    if (waitForIntro) lenis.stop();
    const offReady = onPreloaderDone(() => {
      lenis.start();

      // Triggers created while the preloader was up measured against a locked,
      // shorter page. Re-measure now that the real layout is in place,
      // otherwise sections further down never reach the end of their scrub.
      ScrollTrigger.refresh();
      // honour a hash the page was opened with, now that scrolling is live
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) lenis.scrollTo(target as HTMLElement, { offset: -64, immediate: true });
      }
    });

    // Web fonts land after first paint and change every text block's height,
    // which moves every trigger below them.
    let fontsDone = false;
    document.fonts?.ready.then(() => {
      fontsDone = true;
      ScrollTrigger.refresh();
    });

    // Images and late layout shifts do the same.
    const onLoad = () => {
      if (!fontsDone) ScrollTrigger.refresh();
    };
    window.addEventListener("load", onLoad);

    // Lenis owns the scroll position, so in-page links go through it.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -64, duration: 1.4 });
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      offReady();
      window.removeEventListener("load", onLoad);
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      setLenis(null);
      lenis.destroy();
    };
  }, [waitForIntro]);

  return null;
}
