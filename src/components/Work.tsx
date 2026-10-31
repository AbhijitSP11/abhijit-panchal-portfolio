"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, registerGsap, prefersReducedMotion, revealUp } from "@/lib/anim";
import { projects } from "@/lib/resume";
import ProjectMock from "./ProjectMock";
import CountUp from "./CountUp";

/**
 * A compact index. The detail lives in the case studies, so a card carries
 * only what decides whether you open one: a live status, the phrase that
 * says what the system does, the pull-outs and the numbers.
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
        stagger: 0.08,
        y: 30,
      });

      if (prefersReducedMotion()) return;

      cards.forEach((card) => {
        gsap.from(card.querySelectorAll(".mock-row"), {
          opacity: 0,
          x: -10,
          duration: 0.4,
          stagger: 0.035,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
        gsap.from(card.querySelectorAll(".w-tag"), {
          opacity: 0,
          y: 8,
          scale: 0.9,
          duration: 0.45,
          stagger: 0.07,
          ease: "back.out(2)",
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
      <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:py-24">
        <div className="mb-10 flex items-end justify-between border-b border-ink/15 pb-5">
          <h2 className="w-head reveal-ready label text-ink/70">01 / Selected work</h2>
          <span className="w-head reveal-ready label text-ink/70">
            {String(projects.length).padStart(2, "0")} case studies
          </span>
        </div>

        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <p className="w-head reveal-ready max-w-2xl text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
            Systems that move other people&rsquo;s money, each one
            <span className="font-serif italic text-accent"> written up in full.</span>
          </p>
          <p className="w-head reveal-ready hand text-lg text-ink/50">
            open one for the whole story
          </p>
        </div>

        <div className="w-grid grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {projects.map((p) => (
            <article
              key={p.id}
              className="w-card reveal-ready group relative flex flex-col overflow-hidden border border-ink/12 bg-paper transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/30 hover:shadow-[0_34px_60px_-38px_rgba(36,38,32,0.55)]"
            >
              <span
                className="absolute inset-x-0 top-0 z-20 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ backgroundColor: p.accent }}
                aria-hidden="true"
              />

              {/* preview, just a sliver */}
              <div className="relative h-[84px] shrink-0 overflow-hidden border-b border-ink/10 bg-paper-2/60 px-4 pt-4">
                <div className="origin-top scale-[0.8] opacity-75 transition-all duration-700 group-hover:scale-[0.84] group-hover:opacity-100">
                  <ProjectMock accent={p.accent} />
                </div>
                <span
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-8"
                  style={{
                    background:
                      "linear-gradient(to top, var(--color-paper), transparent)",
                  }}
                  aria-hidden="true"
                />
                <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 border border-ink/15 bg-paper/90 px-2 py-0.5 backdrop-blur-sm">
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
                  className="pointer-events-none absolute left-4 top-2 select-none text-3xl font-semibold leading-none tracking-tighter text-ink/[0.09]"
                  aria-hidden="true"
                >
                  {p.index}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: p.accent }}
                  />
                  <span className="label text-ink/60">{p.eyebrow}</span>
                </div>

                <h3 className="mt-2.5 text-xl font-semibold leading-tight tracking-tight text-ink">
                  {p.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  <Marked text={p.blurb} marks={p.marks} tint={p.accent} />
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.highlights.map((h) => (
                    <span
                      key={h}
                      className="w-tag border px-2 py-0.5 text-[0.7rem] font-medium"
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

                {/* numbers, with a note pointing at them */}
                <div className="mt-5">
                  <div className="flex items-end gap-1.5">
                    <Arrow className="h-6 w-10 shrink-0 -scale-x-100" tint={p.accent} />
                    <span className="hand pb-0.5 text-sm leading-none text-ink/45">
                      {p.note}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2.5">
                    {p.metrics.slice(0, 3).map((m) => (
                      <div key={m.label}>
                        <div
                          className="text-base font-semibold tracking-tight"
                          style={{ color: p.accent }}
                        >
                          <CountUp value={m.value} />
                        </div>
                        <div className="label mt-0.5 text-ink/55">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-5">
                  <div className="label mb-3 text-ink/55">{p.year}</div>
                  <Link
                    href={`/work/${p.slug}`}
                    className="btn-fill w-full justify-center !px-4 !py-3 text-sm font-medium"
                    style={
                      {
                        color: p.accent,
                        "--btn-fill": p.accent,
                      } as React.CSSProperties
                    }
                  >
                    Read the case study
                    <span className="btn-sep" aria-hidden="true">→</span>
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

/** Renders `text`, picking out each phrase in `marks`. */
function Marked({
  text,
  marks,
  tint,
}: {
  text: string;
  marks: string[];
  tint: string;
}) {
  if (!marks.length) return <>{text}</>;

  // split on the phrases, keeping them, longest first so one cannot eat another
  const ordered = [...marks].sort((a, b) => b.length - a.length);
  const escaped = ordered.map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "gi"));

  return (
    <>
      {parts.map((part, i) =>
        ordered.some((m) => m.toLowerCase() === part.toLowerCase()) ? (
          <strong
            key={i}
            className="font-semibold"
            style={{
              color: tint,
              boxShadow: `inset 0 -0.42em 0 ${tint}1f`,
            }}
          >
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
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
