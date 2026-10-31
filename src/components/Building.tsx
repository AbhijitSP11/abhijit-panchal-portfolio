"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, registerGsap, revealUp } from "@/lib/anim";
import { builds } from "@/lib/building";

/**
 * Independent work. Kept apart from Selected work, which is client systems —
 * these are the ones built for their own sake, and a couple are unfinished.
 */
export default function Building() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      revealUp(root.current!.querySelectorAll(".bd-head"), {
        trigger: root.current!,
        stagger: 0.06,
      });
      revealUp(root.current!.querySelectorAll(".bd-row"), {
        trigger: root.current!.querySelector(".bd-list")!,
        stagger: 0.1,
        y: 28,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="building"
      className="border-t border-ink/10 bg-paper"
    >
      <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:py-24">
        <div className="mb-10 flex items-end justify-between border-b border-ink/15 pb-5">
          <h2 className="bd-head reveal-ready label text-ink/70">
            02 / Independent work
          </h2>
          <span className="bd-head reveal-ready label text-ink/70">
            {String(builds.length).padStart(2, "0")} projects
          </span>
        </div>

        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h3 className="bd-head reveal-ready text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
            things I&rsquo;m
            <span className="font-serif italic text-accent"> building.</span>
          </h3>
          <p className="bd-head reveal-ready hand text-lg text-ink/50">
            nobody asked for these — that&rsquo;s the point
          </p>
        </div>

        <div className="bd-list space-y-5">
          {builds.map((b, i) => (
            <article
              key={b.id}
              className="bd-row reveal-ready group relative grid gap-7 border border-ink/12 bg-paper p-6 transition-all duration-500 hover:border-ink/30 hover:shadow-[0_30px_55px_-38px_rgba(36,38,32,0.5)] sm:p-8 lg:grid-cols-12"
            >
              <span
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ backgroundColor: b.accent }}
                aria-hidden="true"
              />

              {/* name and status */}
              <div className="lg:col-span-4">
                <div className="flex items-center gap-3">
                  <span
                    className="label px-2.5 py-1 text-paper"
                    style={{ backgroundColor: b.accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <StatusPill status={b.status} tint={b.accent} />
                </div>

                <h4 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {b.name}
                </h4>
                <p
                  className="mt-1.5 font-serif text-lg italic"
                  style={{ color: b.accent }}
                >
                  {b.tagline}
                </p>
                <div className="label mt-3 text-ink/55">{b.year}</div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {b.repo ? (
                    <a
                      href={b.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-fill !px-4 !py-2.5 text-sm font-medium text-ink"
                    >
                      GitHub
                      <span className="btn-sep" aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                  {b.caseStudy ? (
                    <Link
                      href={b.caseStudy}
                      className="btn-fill !px-4 !py-2.5 text-sm font-medium"
                      style={
                        {
                          color: b.accent,
                          "--btn-fill": b.accent,
                        } as React.CSSProperties
                      }
                    >
                      Case study
                      <span className="btn-sep" aria-hidden="true">→</span>
                    </Link>
                  ) : null}
                </div>
              </div>

              {/* what it is */}
              <div className="lg:col-span-8">
                <p
                  className={`text-base leading-relaxed sm:text-lg ${
                    b.placeholder ? "text-ink/45 italic" : "text-ink/75"
                  }`}
                >
                  {b.blurb}
                </p>

                <ul className="mt-5 space-y-2.5 border-l-2 pl-5" style={{ borderColor: `${b.accent}33` }}>
                  {b.points.map((p, j) => (
                    <li key={j} className="text-sm leading-relaxed text-ink/70">
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {b.stack.map((s) => (
                    <span
                      key={s}
                      className="label border border-ink/15 px-2.5 py-1 text-ink/55 transition-colors group-hover:border-ink/25"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatusPill({ status, tint }: { status: string; tint: string }) {
  const live = status === "Live";
  return (
    <span
      className="inline-flex items-center gap-2 border px-2.5 py-1"
      style={{ borderColor: `${tint}44`, backgroundColor: `${tint}0f` }}
    >
      <span className="relative flex h-1.5 w-1.5">
        {live && (
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
            style={{ backgroundColor: tint }}
          />
        )}
        <span
          className="relative inline-flex h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: tint }}
        />
      </span>
      <span className="label" style={{ color: tint }}>
        {status}
      </span>
    </span>
  );
}
