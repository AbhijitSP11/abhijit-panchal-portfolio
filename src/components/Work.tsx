"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, registerGsap, prefersReducedMotion, revealUp } from "@/lib/anim";
import { projects } from "@/lib/resume";
import ProjectMock from "./ProjectMock";

/**
 * A compact index rather than four full-height blocks.
 *
 * Each project used to take most of a viewport on the way down, which made
 * the page a long scroll past detail that is repeated — in more depth — on
 * the case study page anyway. This shows the shape of each project in a card
 * and sends anyone who wants the detail one click deeper.
 */
export default function Work() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();

    const ctx = gsap.context(() => {
      revealUp(root.current!.querySelectorAll(".w-head"), {
        trigger: root.current!,
        stagger: 0.06,
      });

      const cards = gsap.utils.toArray<HTMLElement>(".w-card");
      revealUp(cards, {
        trigger: root.current!.querySelector(".w-grid")!,
        stagger: 0.09,
        y: 34,
      });

      if (prefersReducedMotion()) return;

      // the preview rows tick in like data arriving
      cards.forEach((card) => {
        gsap.from(card.querySelectorAll(".mock-row"), {
          opacity: 0,
          x: -10,
          duration: 0.4,
          stagger: 0.035,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="work"
      className="dotgrid relative border-t border-ink/10 bg-paper-2/40"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mb-12 flex items-end justify-between border-b border-ink/15 pb-5">
          <h2 className="w-head reveal-ready label text-muted">
            01 / Selected work
          </h2>
          <span className="w-head reveal-ready label text-muted">
            {String(projects.length).padStart(2, "0")} case studies
          </span>
        </div>

        <p className="w-head reveal-ready mb-12 max-w-2xl text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
          Four systems that move money, each one
          <span className="font-serif italic text-accent"> written up in full.</span>
        </p>

        <div className="w-grid grid gap-5 lg:grid-cols-2 lg:gap-7">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/work/${p.slug}`}
              className="w-card reveal-ready group relative flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper transition-all duration-500 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_30px_60px_-35px_rgba(36,38,32,0.5)]"
            >
              {/* preview */}
              <div className="relative h-[190px] overflow-hidden border-b border-ink/10 bg-paper-2/60 px-6 pt-6 sm:h-[210px]">
                <div className="origin-top scale-[0.92] transition-transform duration-700 group-hover:scale-[0.96]">
                  <ProjectMock accent={p.accent} />
                </div>
                <span
                  className="pointer-events-none absolute right-5 top-4 select-none text-5xl font-semibold leading-none tracking-tighter text-ink/[0.07]"
                  aria-hidden="true"
                >
                  {p.index}
                </span>
              </div>

              {/* copy */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: p.accent }}
                  />
                  <span className="label text-muted">{p.eyebrow}</span>
                </div>

                <h3 className="mt-3.5 text-2xl font-medium leading-tight tracking-tight sm:text-[1.7rem]">
                  {p.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {p.blurb}
                </p>

                {/* the two things most worth knowing, visible without a click */}
                <ul className="mt-4 space-y-2 border-l border-ink/15 pl-4">
                  {p.points.slice(0, 2).map((pt, j) => (
                    <li key={j} className="text-sm leading-relaxed text-ink/70">
                      {pt}
                    </li>
                  ))}
                </ul>

                {/* headline numbers */}
                <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
                  {p.metrics.slice(0, 3).map((m) => (
                    <div key={m.label}>
                      <div
                        className="text-lg font-medium tracking-tight"
                        style={{ color: p.accent }}
                      >
                        {m.value}
                      </div>
                      <div className="label mt-0.5 text-muted">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="label rounded-full border border-ink/15 px-2.5 py-1 text-ink/60"
                    >
                      {s}
                    </span>
                  ))}
                  {p.stack.length > 4 && (
                    <span className="label rounded-full border border-ink/15 px-2.5 py-1 text-ink/40">
                      +{p.stack.length - 4}
                    </span>
                  )}
                </div>

                <div className="mt-auto flex items-center justify-between gap-4 pt-7">
                  <span className="label text-muted">
                    {p.org} · {p.year}
                  </span>
                  <span
                    className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                    style={{ color: p.accent }}
                  >
                    Read the case study
                    <span
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
