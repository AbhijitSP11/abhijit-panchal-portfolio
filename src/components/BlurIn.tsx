"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/anim";

/**
 * Brings a section into focus as it enters the viewport: blurred, dimmed and
 * slightly small, resolving to sharp.
 *
 * This is a one-shot eased tween rather than a scrub. A scrub ties progress to
 * a narrow slice of scroll measured against the element itself — which the
 * tween then moves by scaling it — so jumping straight to a section (an anchor
 * link, a refresh deep in the page) could leave it parked half-blurred and
 * unreadable. Entering once and playing through cannot strand a section.
 */
export default function BlurIn({
  children,
  /** Maximum blur in px at the start of the transition. */
  strength = 14,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();

    const el = root.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { filter: "none", opacity: 1, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { filter: `blur(${strength}px)`, opacity: 0.2, scale: 0.99 },
        {
          filter: "blur(0px)",
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power2.out",
          // drop the filter once it lands — leaving one on a tall section
          // keeps it on its own compositor layer for nothing
          onComplete: () => {
            gsap.set(el, { clearProps: "filter,willChange" });
          },
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [strength]);

  return (
    <div ref={root} style={{ willChange: "filter, transform, opacity" }}>
      {children}
    </div>
  );
}
