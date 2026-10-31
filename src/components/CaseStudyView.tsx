"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  gsap,
  ScrollTrigger,
  registerGsap,
  prefersReducedMotion,
  revealWords,
  revealUp,
} from "@/lib/anim";
import type { CaseStudy } from "@/lib/case-studies";

export default function CaseStudyView({
  study,
  next,
}: {
  study: CaseStudy;
  next: { slug: string; title: string };
}) {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    registerGsap();

    const ctx = gsap.context(() => {
      // reading progress
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => gsap.set(bar.current, { scaleX: self.progress }),
      });

      const title = root.current!.querySelector<HTMLElement>(".cs-title");
      if (title) revealWords(title, { stagger: 0.04, start: "top 90%" });

      revealUp(root.current!.querySelectorAll(".cs-fade"), {
        trigger: root.current!,
        stagger: 0.06,
        start: "top 95%",
      });

      // each block reveals on its own as it comes up
      gsap.utils.toArray<HTMLElement>(".cs-block").forEach((block) => {
        revealUp(block.querySelectorAll(".cs-item"), {
          trigger: block,
          stagger: 0.07,
        });
      });

      if (prefersReducedMotion()) return;

      // Counters. Only values shaped like "4,000+", "92%" or "100K+" are
      // counted up — a number followed by a suffix and nothing else. Anything
      // with digits further along ("3d → 20m") is left exactly as written.
      gsap.utils.toArray<HTMLElement>(".cs-stat").forEach((el) => {
        const raw = el.dataset.value ?? "";
        const match = /^([\d.,]+)([^\d]*)$/.exec(raw);
        if (!match) return;

        const [, digits, suffix] = match;
        const num = Number(digits.replace(/,/g, ""));
        if (!Number.isFinite(num) || num === 0) return;

        const decimals = digits.includes(".") ? 1 : 0;
        const grouped = digits.includes(",");
        const obj = { v: 0 };

        gsap.to(obj, {
          v: num,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            const shown = grouped
              ? obj.v.toLocaleString("en-US", {
                  minimumFractionDigits: decimals,
                  maximumFractionDigits: decimals,
                })
              : obj.v.toFixed(decimals);
            el.textContent = shown + suffix;
          },
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      // iteration stepper — the counter in the sticky rail tracks the passes
      const steps = gsap.utils.toArray<HTMLElement>(".cs-iteration");
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (!self.isActive) return;
            if (stepRef.current) stepRef.current.textContent = String(i + 1);
            gsap.to(".cs-step-fill", {
              scaleX: (i + 1) / steps.length,
              duration: 0.5,
              ease: "power2.out",
            });
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="bg-paper">
      {/* progress */}
      <div className="fixed inset-x-0 top-0 z-50 h-0.5 bg-ink/10">
        <div
          ref={bar}
          className="h-full w-full origin-left"
          style={{ transform: "scaleX(0)", backgroundColor: study.accent }}
        />
      </div>

      {/* top bar */}
      <div className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-4 sm:px-8">
          <span className="label text-muted">Project case study</span>
          <Link
            href="/#work"
            className="btn-fill label !px-4 !py-2 text-ink"
          >
            Close <span aria-hidden="true">×</span>
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-[1100px] px-5 pb-28 sm:px-8">
        {/* hero */}
        <header className="pt-16 sm:pt-24">
          <div
            className="cs-fade reveal-ready label"
            style={{ color: study.accent }}
          >
            {study.title}
          </div>
          <h1 className="cs-title reveal-ready mt-6 text-balance text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {study.lede}
          </h1>
          <p className="cs-fade reveal-ready mt-7 max-w-2xl text-lg leading-relaxed text-muted">
            {study.blurb}
          </p>

          <dl className="cs-fade reveal-ready mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-y border-ink/10 py-7 sm:grid-cols-3 lg:grid-cols-5">
            {study.meta.map((m) => (
              <div key={m.label}>
                <dt className="label text-muted">{m.label}</dt>
                <dd className="mt-2 text-sm font-medium">{m.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* overview */}
        <Section n="01" kicker="Overview" heading={study.overview.heading}>
          {study.overview.body.map((p, i) => (
            <p
              key={i}
              className="cs-item reveal-ready max-w-2xl text-base leading-relaxed text-ink/75 sm:text-lg"
            >
              {p}
            </p>
          ))}
        </Section>

        {/* insights */}
        <Section n="02" kicker="What we found" heading="The things that made it hard.">
          <div className="grid gap-5 sm:grid-cols-3">
            {study.insights.map((ins) => (
              <div
                key={ins.n}
                className="cs-item reveal-ready rounded-xl border border-ink/10 bg-paper-2/40 p-5"
              >
                <div className="label" style={{ color: study.accent }}>
                  {ins.n}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">
                  {ins.text}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* problem */}
        <Section n="03" kicker={study.problem.heading} heading={study.problem.question} big>
          <p className="cs-item reveal-ready max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {study.problem.body}
          </p>
        </Section>

        {/* iterations, with a sticky step rail */}
        <section className="cs-block mt-24 sm:mt-32">
          <div className="mb-10 flex items-end justify-between border-b border-ink/15 pb-4">
            <div>
              <div className="label text-muted">04 / How it got built</div>
              <h2 className="cs-item reveal-ready mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
                {study.iterations.length} passes at it.
              </h2>
            </div>
            <div className="hidden text-right sm:block">
              <div className="label text-muted">
                pass <span ref={stepRef}>1</span> of {study.iterations.length}
              </div>
              <div className="mt-2 h-0.5 w-28 bg-ink/15">
                <div
                  className="cs-step-fill h-full w-full origin-left"
                  style={{
                    transform: "scaleX(0.33)",
                    backgroundColor: study.accent,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            {study.iterations.map((it) => (
              <div
                key={it.label}
                className="cs-iteration cs-item reveal-ready rounded-2xl border border-ink/10 bg-white/60 p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="label rounded-full px-3 py-1.5 text-paper"
                    style={{ backgroundColor: study.accent }}
                  >
                    {it.label}
                  </span>
                  <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
                    {it.title}
                  </h3>
                </div>

                <ul className="mt-5 space-y-2.5 border-l border-ink/15 pl-5">
                  {it.points.map((p, i) => (
                    <li key={i} className="text-sm leading-relaxed text-ink/75">
                      {p}
                    </li>
                  ))}
                </ul>

                <div
                  className="mt-6 rounded-xl px-4 py-3.5 text-sm leading-relaxed"
                  style={{
                    backgroundColor: `${study.accent}14`,
                    color: study.accent,
                  }}
                >
                  <span className="label mr-2 opacity-70">
                    {it.outcomeKind === "win" ? "Result" : "Didn't work"}
                  </span>
                  {it.outcome}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* results */}
        <Section n="05" kicker="Where it landed" heading="What came out of it.">
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {study.results.map((r) => (
              <div key={r.label} className="cs-item reveal-ready">
                <div
                  className="cs-stat text-4xl font-medium tracking-tight sm:text-5xl"
                  data-value={r.value}
                  style={{ color: study.accent }}
                >
                  {r.value}
                </div>
                <div className="mt-3 h-px w-10 bg-ink/20" />
                <div className="label mt-3 max-w-[18ch] leading-relaxed text-muted">
                  {r.label}
                </div>
                {r.note ? (
                  <div className="mt-1.5 text-xs text-muted/80">{r.note}</div>
                ) : null}
              </div>
            ))}
          </div>
        </Section>

        {/* closing */}
        <section className="cs-block mt-24 border-t border-ink/15 pt-12 sm:mt-32">
          <p className="cs-item reveal-ready max-w-3xl text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
            {study.closing}
          </p>
          <div className="cs-item reveal-ready mt-8 flex flex-wrap gap-2">
            {study.stack.map((s) => (
              <span
                key={s}
                className="label rounded-full border border-ink/15 px-3 py-1.5 text-ink/65"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* next */}
        <nav className="cs-block mt-20 border-t border-ink/15 pt-8">
          <div className="label text-muted">Next case study</div>
          <Link
            href={`/work/${next.slug}`}
            className="cs-item reveal-ready group mt-4 flex items-center justify-between gap-6"
          >
            <span className="text-2xl font-medium tracking-tight transition-colors group-hover:text-accent sm:text-4xl">
              {next.title}
            </span>
            <span className="text-2xl transition-transform group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </Link>
        </nav>
      </article>
    </div>
  );
}

function Section({
  n,
  kicker,
  heading,
  children,
  big = false,
}: {
  n: string;
  kicker: string;
  heading: string;
  children: React.ReactNode;
  big?: boolean;
}) {
  return (
    <section className="cs-block mt-24 sm:mt-32">
      <div className="label text-muted">
        {n} / {kicker}
      </div>
      <h2
        className={`cs-item reveal-ready mt-4 max-w-3xl text-balance font-medium tracking-tight ${
          big
            ? "text-3xl leading-[1.1] sm:text-5xl"
            : "text-2xl leading-tight sm:text-4xl"
        }`}
      >
        {heading}
      </h2>
      <div className="mt-8 space-y-5">{children}</div>
    </section>
  );
}
