"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion, splitWords } from "@/lib/anim";

type Props = {
  lead: string;
  accentLine: string;
  id?: string;
  note?: string;
};

/**
 * Pinned editorial statement. The words rise in, then a hand-drawn rule sweeps
 * under the italic line as the section is scrubbed through.
 */
export default function Statement({ lead, accentLine, id, note }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    registerGsap();

    const ctx = gsap.context(() => {
      const leadEl = root.current!.querySelector<HTMLElement>(".st-lead")!;
      const accentEl = root.current!.querySelector<HTMLElement>(".st-accent")!;
      const leadWords = splitWords(leadEl);
      const accentWords = splitWords(accentEl);
      leadEl.style.opacity = "1";
      accentEl.style.opacity = "1";

      if (prefersReducedMotion()) {
        gsap.set(path.current, { strokeDashoffset: 0 });
        return;
      }

      const len = path.current?.getTotalLength() ?? 600;
      gsap.set(path.current, { strokeDasharray: len, strokeDashoffset: len });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            once: true,
          },
          defaults: { ease: "expo.out" },
        })
        .from(leadWords, { yPercent: 115, duration: 1.1, stagger: 0.05 })
        .from(accentWords, { yPercent: 115, duration: 1.1, stagger: 0.05 }, 0.15)
        .to(path.current, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 0.7)
        .from(".st-note", { opacity: 0, y: 14, duration: 0.9 }, 0.9);

      // slow drift while the section passes through the viewport
      gsap.to(".st-inner", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id={id}
      className="relative flex min-h-[70vh] items-center justify-center px-6 py-28 sm:py-36"
    >
      <div className="st-inner mx-auto max-w-5xl text-center">
        <h2 className="text-5xl font-medium leading-[1.02] tracking-tight sm:text-7xl lg:text-[5.5rem]">
          <span className="st-lead reveal-ready block">{lead}</span>
          <span className="relative mt-2 inline-block">
            <span className="st-accent reveal-ready block font-serif italic">
              {accentLine}
            </span>
            <svg
              viewBox="0 0 600 24"
              preserveAspectRatio="none"
              className="absolute -bottom-2 left-0 h-5 w-full text-accent sm:-bottom-3"
              aria-hidden="true"
            >
              <path
                ref={path}
                d="M6 15 C 110 4, 210 22, 318 11 S 500 4, 594 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>
        {note ? (
          <p className="st-note mx-auto mt-12 max-w-xl text-balance text-base leading-relaxed text-muted sm:text-lg">
            {note}
          </p>
        ) : null}
      </div>
    </section>
  );
}
