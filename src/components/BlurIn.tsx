"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/anim";

/**
 * Brings a section into focus as it enters the viewport: blurred, dimmed and
 * slightly small, resolving to sharp as you scroll. Scrubbed rather than
 * triggered, so it tracks the scroll both ways.
 */
export default function BlurIn({
  children,
  /** Maximum blur in px at the start of the transition. */
  strength = 16,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.current,
        {
          filter: `blur(${strength}px)`,
          opacity: 0.25,
          scale: 0.985,
        },
        {
          filter: "blur(0px)",
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            // starts as the section's top enters the lower third, finishes
            // once it is comfortably in view
            start: "top 88%",
            end: "top 42%",
            scrub: 0.6,
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
