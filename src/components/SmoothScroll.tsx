"use client";

import { useEffect } from "react";
import Lenis from "lenis";
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
export default function SmoothScroll() {
  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // The preloader holds the page still until it finishes.
    lenis.stop();
    const offReady = onPreloaderDone(() => {
      lenis.start();
      // honour a hash the page was opened with, now that scrolling is live
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) lenis.scrollTo(target as HTMLElement, { offset: -64, immediate: true });
      }
    });

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
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
