"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/anim";
import { projects } from "@/lib/resume";
import ProjectMock from "./ProjectMock";
import CountUp from "./CountUp";
import Logo, { logoName } from "./Logo";
import MiraeCaseStudy from "./MiraeCaseStudy";

/**
 * Two cards to a row. Each leads with who built it and who it was built for —
 * for the two Oneture engagements that is Oneture's mark beside the client's —
 * and carries its own colour through the highlights, the numbers and the
 * button, so the four read as four different pieces of work.
 */
export default function Work() {
  const root = useRef<HTMLElement>(null);
  const [miraeOpen, setMiraeOpen] = useState(false);
  const closeMirae = useCallback(() => setMiraeOpen(false), []);

  useEffect(() => {
    registerGsap();

    const ctx = gsap.context(() => {
      // reveal: out of focus and low, then sharp as it enters the frame
      const reveal = (targets: gsap.TweenTarget, trigger: Element, stagger = 0) => {
        if (prefersReducedMotion()) {
          gsap.set(targets, { opacity: 1, y: 0, filter: "none" });
          return;
        }
        gsap.fromTo(
          targets,
          { opacity: 0, y: 40, filter: "blur(16px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power3.out",
            stagger,
            onComplete: () => {
              gsap.set(targets, { clearProps: "filter" });
            },
            scrollTrigger: { trigger, start: "top 88%", once: true },
          }
        );
      };

      root.current!.querySelectorAll<HTMLElement>(".w-head").forEach((h) => reveal(h, h));

      const cards = gsap.utils.toArray<HTMLElement>(".w-card");
      cards.forEach((card) => reveal(card, card));

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
      <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:py-24">
        <div className="mb-10 flex items-end justify-between border-b border-ink/15 pb-5">
          <h2 className="w-head reveal-ready label !text-sm text-ink/75">
            01 / Selected work
          </h2>
          <span className="w-head reveal-ready label !text-sm text-ink/75">
            Banks &amp; capital markets · {String(projects.length).padStart(2, "0")} engagements
          </span>
        </div>

        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <p className="w-head reveal-ready max-w-3xl text-balance text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Systems that move other people&rsquo;s money, each one
            <span className="font-serif italic text-accent"> written up in full.</span>
          </p>
          <p className="w-head reveal-ready hand text-xl text-ink/55">
            open one for the whole story
          </p>
        </div>

        <div className="w-grid grid gap-6 lg:grid-cols-2">
          {projects.map((p) => {
            const [builder, client] = p.logos;
            return (
              <article
                key={p.id}
                className="w-card reveal-ready group relative flex flex-col border border-ink/12 bg-paper transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-ink/30 hover:shadow-[0_34px_60px_-38px_rgba(36,38,32,0.5)]"
              >
                <span
                  className="absolute inset-x-0 top-0 z-20 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ backgroundColor: p.accent }}
                  aria-hidden="true"
                />

                {/* who built it, and for whom */}
                <div className="flex items-center justify-between gap-4 border-b border-ink/10 px-7 py-4">
                  <div className="flex items-center gap-3">
                    <Logo logo={builder} size={40} />
                    {client ? (
                      <>
                        <span className="h-8 w-px bg-ink/25" aria-hidden="true" />
                        <Logo logo={client} size={40} />
                      </>
                    ) : null}
                  </div>
                  <div className="text-right">
                    <div className="label !text-xs text-ink/55">
                      {client ? "Built at" : "Built at"}
                    </div>
                    <div className="text-sm font-medium text-ink/80">
                      {logoName(builder)}
                      {client ? (
                        <>
                          <span className="mx-2 text-ink/30" aria-hidden="true">
                            |
                          </span>
                          <span className="text-ink/55">{logoName(client)}</span>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* engagement header */}
                <header className="flex items-start justify-between gap-4 border-b border-ink/10 px-7 pb-5 pt-6">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: p.accent }}
                      />
                      <span className="label !text-xs text-ink/65">{p.eyebrow}</span>
                    </div>
                    <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-[2rem]">
                      {p.title}
                    </h3>
                    <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-base text-ink/65">
                      <span className="font-medium text-ink/80">{p.org}</span>
                      <span className="text-ink/25">·</span>
                      <span>{p.year}</span>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <span
                      className="select-none text-5xl font-semibold leading-none tracking-tighter text-ink/[0.1]"
                      aria-hidden="true"
                    >
                      {p.index}
                    </span>
                    <span className="inline-flex items-center gap-1.5 border border-ink/15 px-2.5 py-1">
                      <span className="relative flex h-2 w-2">
                        {p.status !== "Delivered" && (
                          <span
                            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                            style={{ backgroundColor: p.accent }}
                          />
                        )}
                        <span
                          className="relative inline-flex h-2 w-2 rounded-full"
                          style={{ backgroundColor: p.accent }}
                        />
                      </span>
                      <span className="label !text-xs text-ink/75">{p.status}</span>
                    </span>
                  </div>
                </header>

                {/* body */}
                <div className="grid flex-1 gap-6 px-7 py-6 sm:grid-cols-5">
                  <div className="sm:col-span-3">
                    <p className="text-base leading-relaxed text-ink/80">
                      <Marked text={p.blurb} marks={p.marks} tint={p.accent} />
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.highlights.map((h) => (
                        <span
                          key={h}
                          className="w-tag border px-3 py-1 text-sm font-medium"
                          style={{
                            color: p.accent,
                            borderColor: `${p.accent}55`,
                            backgroundColor: `${p.accent}12`,
                          }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    <ul
                      className="mt-5 space-y-3 border-l-2 pl-4"
                      style={{ borderColor: `${p.accent}44` }}
                    >
                      {p.points.slice(0, 2).map((pt, j) => (
                        <li key={j} className="text-[0.95rem] leading-relaxed text-ink/75">
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="sm:col-span-2">
                    <div className="relative h-[110px] overflow-hidden border border-ink/10 bg-paper-2/60 px-3 pt-3">
                      <div className="origin-top scale-[0.6] opacity-80 transition-all duration-700 group-hover:scale-[0.64] group-hover:opacity-100">
                        <ProjectMock accent={p.accent} />
                      </div>
                      <span
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
                        style={{
                          background:
                            "linear-gradient(to top, var(--color-paper-2), transparent)",
                        }}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="mt-4 flex items-end gap-1.5">
                      <Arrow className="h-7 w-11 shrink-0 -scale-x-100" tint={p.accent} />
                      <span className="hand pb-0.5 text-base leading-none text-ink/55">
                        {p.note}
                      </span>
                    </div>

                    <dl className="mt-3 space-y-3">
                      {p.metrics.slice(0, 3).map((m) => (
                        <div key={m.label}>
                          <dt className="label !text-xs text-ink/65">{m.label}</dt>
                          <dd
                            className="text-2xl font-semibold leading-tight tracking-tight"
                            style={{ color: p.accent }}
                          >
                            <CountUp value={m.value} />
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                {/* footer */}
                <footer className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 px-7 py-5">
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="label !text-xs border border-ink/20 px-2.5 py-1 text-ink/65"
                      >
                        {s}
                      </span>
                    ))}
                    {p.stack.length > 4 && (
                      <span className="label !text-xs border border-ink/20 px-2.5 py-1 text-ink/45">
                        +{p.stack.length - 4}
                      </span>
                    )}
                  </div>

                  {p.slug === "bond-custodian" ? (
                    <button
                      type="button"
                      onClick={() => setMiraeOpen(true)}
                      aria-haspopup="dialog"
                      className="btn-fill !px-5 !py-3 text-base font-medium"
                      style={
                      {
                        "--btn-ink": p.accent,
                        "--btn-fill": p.accent,
                        "--btn-text": "#ffffff",
                      } as React.CSSProperties
                    }
                    >
                      Read the case study
                      <span className="btn-sep" aria-hidden="true">→</span>
                    </button>
                  ) : (
                    <Link
                      href={`/work/${p.slug}`}
                      className="btn-fill !px-5 !py-3 text-base font-medium"
                      style={
                        {
                          "--btn-ink": p.accent,
                          "--btn-fill": p.accent,
                          "--btn-text": "#ffffff",
                        } as React.CSSProperties
                      }
                    >
                      Read the case study
                      <span className="btn-sep" aria-hidden="true">→</span>
                    </Link>
                  )}
                </footer>
              </article>
            );
          })}
        </div>
      </div>
      {miraeOpen && <MiraeCaseStudy onClose={closeMirae} />}
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
            style={{ color: tint, boxShadow: `inset 0 -0.45em 0 ${tint}26` }}
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
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M60 28 L 70 33 L 64 22"
        stroke={tint}
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
