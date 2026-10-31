"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap, prefersReducedMotion, revealUp } from "@/lib/anim";
import { films } from "@/lib/personal";

/**
 * Favourite films as a strip of cards. The selected one widens and shows its
 * note; the rest collapse to a spine with the title running vertically.
 */
export default function Movies() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      revealUp(root.current!.querySelectorAll(".mv-item"), {
        trigger: root.current!,
        stagger: 0.07,
        y: 24,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      ".mv-body",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
    );
  }, [open]);

  return (
    <div ref={root}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">
          films I keep
          <span className="font-serif italic text-accent"> going back to.</span>
        </h3>
        <p className="hand text-lg text-ink/50">hover or tap one →</p>
      </div>

      <div className="flex h-[300px] gap-2 sm:h-[340px]">
        {films.map((f, i) => {
          const isOpen = i === open;
          return (
            <button
              key={f.title}
              type="button"
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              onClick={() => setOpen(i)}
              aria-expanded={isOpen}
              className={`mv-item reveal-ready group relative overflow-hidden rounded-2xl border text-left outline-none transition-[flex-grow,border-color] duration-500 ease-out focus-visible:ring-2 focus-visible:ring-accent ${
                isOpen
                  ? "flex-[4] border-ink/20"
                  : "flex-[1] border-ink/10 hover:flex-[1.4]"
              }`}
              style={{
                backgroundColor: isOpen ? `${f.tint}12` : "transparent",
              }}
            >
              {/* tint wash */}
              <span
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-40"
                style={{
                  background: `linear-gradient(to top, ${f.tint}26, transparent)`,
                }}
                aria-hidden="true"
              />

              {/* collapsed: vertical spine */}
              <span
                className={`absolute inset-0 flex items-end justify-center pb-6 transition-opacity duration-300 ${
                  isOpen ? "pointer-events-none opacity-0" : "opacity-100"
                }`}
              >
                <span
                  className="label whitespace-nowrap text-muted"
                  style={{ writingMode: "vertical-rl", rotate: "180deg" }}
                >
                  {f.title}
                </span>
              </span>

              {/* open: full card */}
              <span
                className={`absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-500 ${
                  isOpen ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <span
                  className="label mb-auto inline-flex w-fit rounded-full px-2.5 py-1 text-paper"
                  style={{ backgroundColor: f.tint }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="mv-body block">
                  <span className="label block text-muted">{f.year}</span>
                  <span className="mt-2 block text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
                    {f.title}
                  </span>
                  <span className="mt-2.5 block max-w-sm text-sm leading-relaxed text-muted">
                    {f.note}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
