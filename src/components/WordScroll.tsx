"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/anim";

type Props = {
  /** Each word revealed in turn as the section is scrolled through. */
  words: string[];
  /** Indices rendered in the serif italic accent face. */
  accentAt?: number[];
  /** Height of the scroll run, in viewport heights. */
  length?: number;
  dark?: boolean;
  footnote?: string;
  /** Small label above the words. */
  kicker?: string;
  /** Chips under the words, so the panel is not all whitespace. */
  tags?: string[];
};

/**
 * A sticky panel whose words light up one at a time as you scroll past it.
 * Uses position:sticky rather than ScrollTrigger's pin so it stays in step
 * with Lenis without the pin-spacer shuffle.
 */
export default function WordScroll({
  words,
  accentAt = [],
  length = 2.4,
  dark = false,
  footnote,
  kicker,
  tags = [],
}: Props) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".ws-word");

      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { opacity: 0.12, y: 8 });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        ease: "none",
        stagger: 1,
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.45,
        },
      });

      if (footnote) {
        gsap.fromTo(
          ".ws-foot",
          { opacity: 0 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "70% top",
              end: "bottom bottom",
              scrub: 0.45,
            },
          }
        );
      }
    }, root);

    return () => ctx.revert();
  }, [footnote]);

  return (
    <section
      ref={root}
      style={{ height: `${length * 100}vh` }}
      className={dark ? "relative bg-ink text-paper" : "relative bg-paper text-ink"}
      data-nav={dark ? "dark" : undefined}
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center px-5 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {kicker ? (
            <div
              className={`label mb-8 ${dark ? "text-paper/45" : "text-ink/55"}`}
            >
              {kicker}
            </div>
          ) : null}

          <p className="flex flex-wrap items-baseline justify-center gap-x-[0.28em] gap-y-1 text-[9vw] font-medium leading-[1.06] tracking-tight sm:text-[7vw] lg:text-[5.4vw]">
            {words.map((w, i) => (
              <span
                key={`${w}-${i}`}
                className={`ws-word inline-block ${
                  accentAt.includes(i)
                    ? "font-serif italic text-accent"
                    : ""
                }`}
              >
                {w}
              </span>
            ))}
          </p>

          {tags.length ? (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className={`label border px-3 py-1.5 ${
                    dark
                      ? "border-paper/20 text-paper/65"
                      : "border-ink/15 text-ink/60"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}

          {footnote ? (
            <p
              className={`ws-foot label mt-8 ${
                dark ? "text-paper/45" : "text-muted"
              }`}
            >
              {footnote}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
