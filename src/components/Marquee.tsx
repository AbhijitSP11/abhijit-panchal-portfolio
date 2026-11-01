"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/anim";
import { marqueeWords } from "@/lib/resume";

/** Continuous ticker that leans with scroll direction and speeds up with velocity. */
export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tween = gsap.to(track.current, {
        xPercent: -50,
        duration: 26,
        ease: "none",
        repeat: -1,
      });

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          // direction flips the ticker; velocity adds a shear
          tween.timeScale(self.direction === 1 ? 1 : -1);
          const skew = gsap.utils.clamp(-14, 14, self.getVelocity() / 220);
          gsap.to(track.current, {
            skewX: skew,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          });
        },
      });

      return () => {
        st.kill();
        tween.kill();
      };
    }, root);

    return () => ctx.revert();
  }, []);

  const words = [...marqueeWords, ...marqueeWords];

  return (
    <div
      ref={root}
      className="relative overflow-hidden border-y border-ink/10 bg-paper-2 py-5"
    >
      <div ref={track} className="marquee-track">
        {words.map((w, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-8 pr-8 text-2xl font-medium tracking-tight sm:text-3xl"
          >
            {w}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
