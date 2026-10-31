"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, registerGsap, prefersReducedMotion, revealUp } from "@/lib/anim";
import { projects } from "@/lib/resume";
import ProjectMock from "./ProjectMock";

/**
 * A compact index rather than four full-height blocks. The preview is a thin
 * strip at the top — enough to say "data-dense console" and no more — so the
 * card is mostly the things worth reading: a live status, the pull-outs, two
 * concrete bullets and the numbers.
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

      cards.forEach((card) => {
        gsap.from(card.querySelectorAll(".mock-row"), {
          opacity: 0,
          x: -10,
          duration: 0.4,
          stagger: 0.035,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
        });
        // the pull-out tags land one after another
        gsap.from(card.querySelectorAll(".w-tag"), {
          opacity: 0,
          y: 8,
          scale: 0.9,
          duration: 0.45,
          stagger: 0.07,
          ease: "back.out(2)",
          scrollTrigger: { trigger: card, start: "top 80%", once: true },
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
          <h2 className="w-head reveal-ready label text-muted">01 / Selected work</h2>
          <span className="w-head reveal-ready label text-muted">
            {String(projects.length).padStart(2, "0")} case studies
          </span>
        </div>

        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <p className="w-head reveal-ready max-w-2xl text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
            Systems that move other people&rsquo;s money, each one
            <span className="font-serif italic text-accent"> written up in full.</span>
          </p>
          <p className="w-head reveal-ready hand text-lg text-ink/50">
            all client work · all live
          </p>
        </div>

        <div className="w-grid grid gap-5 lg:grid-cols-3 lg:gap-6">
          {projects.map((p) => (
            <article
              key={p.id}
              className="w-card reveal-ready group relative flex flex-col overflow-hidden border border-ink/12 bg-paper transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/30 hover:shadow-[0_34px_60px_-38px_rgba(36,38,32,0.55)]"
            >
              {/* accent rule that draws across on hover */}
              <span
                className="absolute inset-x-0 top-0 z-20 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ backgroundColor: p.accent }}
                aria-hidden="true"
              />

              {/* thin preview strip */}
              <div className="relative h-[108px] shrink-0 overflow-hidden border-b border-ink/10 bg-paper-2/60 px-5 pt-5">
                <div className="origin-top scale-[0.86] opacity-80 transition-all duration-700 group-hover:scale-[0.9] group-hover:opacity-100">
                  <ProjectMock accent={p.accent} />
                </div>
                <span
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
                  style={{
                    background:
                      "linear-gradient(to top, var(--color-paper), transparent)",
                  }}
                  aria-hidden="true"
                />

                {/* live status */}
                <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 border border-ink/15 bg-paper/90 px-2.5 py-1 backdrop-blur-sm">
                  <span className="relative flex h-1.5 w-1.5">
                    {p.status !== "Delivered" && (
                      <span
                        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                        style={{ backgroundColor: p.accent }}
                      />
                    )}
                    <span
                      className="relative inline-flex h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: p.accent }}
                    />
                  </span>
                  <span className="label text-ink/70">{p.status}</span>
                </span>

                <span
                  className="pointer-events-none absolute left-5 top-3 select-none text-4xl font-semibold leading-none tracking-tighter text-ink/[0.08]"
                  aria-hidden="true"
                >
                  {p.index}
                </span>
              </div>

              {/* copy */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: p.accent }}
                  />
                  <span className="label text-muted">{p.eyebrow}</span>
                </div>

                <h3 className="mt-3 text-xl font-medium leading-tight tracking-tight sm:text-2xl">
                  {p.title}
                </h3>

                {/* pull-out tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.highlights.map((h) => (
                    <span
                      key={h}
                      className="w-tag border px-2.5 py-1 text-xs font-medium"
                      style={{
                        color: p.accent,
                        borderColor: `${p.accent}44`,
                        backgroundColor: `${p.accent}0f`,
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted">{p.blurb}</p>

                <ul className="mt-4 space-y-2 border-l-2 pl-4" style={{ borderColor: `${p.accent}33` }}>
                  {p.points.slice(0, 2).map((pt, j) => (
                    <li key={j} className="text-sm leading-relaxed text-ink/70">
                      {pt}
                    </li>
                  ))}
                </ul>

                {/* numbers, with a note pointing at them */}
                <div className="mt-6">
                  <div className="flex items-end gap-2">
                    <Arrow className="h-7 w-12 shrink-0 -scale-x-100" tint={p.accent} />
                    <span className="hand pb-1 text-base leading-none text-ink/45">
                      {p.note}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-6 gap-y-3">
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
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="label border border-ink/15 px-2 py-1 text-ink/55"
                    >
                      {s}
                    </span>
                  ))}
                  {p.stack.length > 4 && (
                    <span className="label border border-ink/15 px-2 py-1 text-ink/35">
                      +{p.stack.length - 4}
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-6">
                  <div className="label mb-4 text-muted">
                    {p.org} · {p.year}
                  </div>
                  <Link
                    href={`/work/${p.slug}`}
                    className="btn-fill w-full justify-center text-sm font-medium"
                    style={
                      {
                        color: p.accent,
                        "--btn-fill": p.accent,
                        "--btn-text": "var(--color-paper)",
                      } as React.CSSProperties
                    }
                  >
                    Read the case study
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Hand-drawn arrow used to point the note at the numbers. */
function Arrow({ className = "", tint }: { className?: string; tint: string }) {
  return (
    <svg viewBox="0 0 80 40" className={className} fill="none" aria-hidden="true">
      <path
        d="M6 4 C 28 0, 56 8, 68 30"
        stroke={tint}
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M60 28 L 70 33 L 64 22"
        stroke={tint}
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
