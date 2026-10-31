"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { miraeCase as c } from "@/lib/mirae-case";
import Logo from "./Logo";

/**
 * The Mirae SWIFT migration, told as a full-screen sheet rather than a page.
 * Rendered through a portal because the work cards carry filter and transform
 * while they reveal, and either one would trap a fixed element inside the card.
 * `data-lenis-prevent` hands the wheel back to the sheet so it scrolls on its
 * own instead of dragging the page behind it.
 */
export default function MiraeCaseStudy({ onClose }: { onClose: () => void }) {
  const sheet = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();

    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = prev;
      opener?.focus?.();
    };
  }, [onClose]);

  const label = "text-[0.72rem] font-medium uppercase tracking-[0.16em] text-muted";

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-stretch justify-center bg-ink/55 backdrop-blur-sm sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={sheet}
        role="dialog"
        aria-modal="true"
        aria-label={c.title}
        data-lenis-prevent
        className="panel-in relative w-full max-w-5xl overflow-y-auto overscroll-contain bg-paper shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)] sm:rounded-2xl"
      >
        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          className="sticky top-4 z-10 float-right mr-4 mt-4 grid h-10 w-10 place-items-center rounded-full bg-ink text-lg text-paper transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          ×
        </button>

        {/* header */}
        <header className="px-6 pb-10 pt-10 sm:px-12 sm:pt-14">
          <div className="flex items-center gap-4">
            <Logo logo="oneture" size={34} />
            <span className="h-7 w-px bg-ink/20" aria-hidden="true" />
            <Logo logo="mirae" size={34} />
          </div>
          <p className={`${label} mt-8`} style={{ color: c.accent }}>
            {c.eyebrow}
          </p>
          <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight sm:text-6xl">
            {c.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">{c.lede}</p>

          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
            {c.meta.map((m) => (
              <div key={m.label}>
                <dt className={label}>{m.label}</dt>
                <dd className="mt-1 font-medium">{m.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* the numbers */}
        <div className="grid grid-cols-2 border-y border-ink/10 bg-white sm:grid-cols-4">
          {c.numbers.map((n) => (
            <div key={n.label} className="border-ink/10 px-6 py-7 sm:border-r sm:last:border-r-0 sm:px-8">
              <div className="text-4xl font-semibold tracking-tight" style={{ color: c.accent }}>
                {n.value}
              </div>
              <div className="mt-1.5 text-sm text-muted">{n.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-16 px-6 py-14 sm:px-12 sm:py-16">
          {/* stakes */}
          <section className="grid gap-6 md:grid-cols-[1fr_1.4fr] md:gap-12">
            <h3 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
              {c.stakes.heading}
            </h3>
            <p className="text-lg leading-relaxed text-ink/75">{c.stakes.body}</p>
          </section>

          {/* what was solved, and what it was worth */}
          <section>
            <p className={label}>What I solved</p>
            <div className="mt-5 divide-y divide-ink/10 border-y border-ink/10">
              {c.solved.map((s, i) => (
                <div
                  key={s.problem}
                  className="grid gap-3 py-6 md:grid-cols-[2.5rem_1.1fr_1.4fr_1.2fr] md:gap-6"
                >
                  <span className="label text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h4 className="text-lg font-medium leading-snug tracking-tight">{s.problem}</h4>
                  <p className="text-[0.95rem] leading-relaxed text-ink/70">{s.fix}</p>
                  <p
                    className="border-l-2 pl-4 text-[0.95rem] font-medium leading-relaxed"
                    style={{ borderColor: c.accent }}
                  >
                    <span className={`${label} mb-1 block`} style={{ color: c.accent }}>
                      Business benefit
                    </span>
                    {s.benefit}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* the screens */}
          <section className="grid gap-6 md:grid-cols-[1fr_1.4fr] md:gap-12">
            <h3 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
              {c.screensHeading}
            </h3>
            <div>
              <div className="flex flex-wrap gap-2">
                {c.screens.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-ink/15 bg-white px-3.5 py-1.5 text-sm shadow-[0_6px_14px_-10px_rgba(0,0,0,0.4)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="hand mt-4 text-xl text-ink/50">{c.screensNote}</p>
            </div>
          </section>

          {/* how it was run */}
          <section>
            <h3 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
              {c.approach.heading}
            </h3>
            <ol className="mt-8 grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
              {c.approach.steps.map((s) => (
                <li key={s.n} className="bg-paper p-6">
                  <span className="label" style={{ color: c.accent }}>
                    {s.n}
                  </span>
                  <h4 className="mt-2 text-lg font-medium tracking-tight">{s.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{s.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* my part + outcomes */}
          <section className="grid gap-10 md:grid-cols-2 md:gap-14">
            <div>
              <h3 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                {c.mine.heading}
              </h3>
              <ul className="mt-6 space-y-4">
                {c.mine.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink/75">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: c.accent }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-white p-7 shadow-[0_24px_44px_-28px_rgba(0,0,0,0.45)]">
              <h3 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                {c.outcomes.heading}
              </h3>
              <ul className="mt-6 space-y-4">
                {c.outcomes.items.map((p) => (
                  <li key={p} className="flex gap-3 text-[0.95rem] leading-relaxed">
                    <span className="mt-0.5 font-semibold" style={{ color: c.accent }}>
                      ✓
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-8">
            <div className="flex flex-wrap gap-1.5">
              {c.stack.map((s) => (
                <span key={s} className="label !text-xs border border-ink/20 px-2.5 py-1 text-ink/65">
                  {s}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="btn-fill !px-5 !py-3 text-base font-medium"
              style={
                {
                  "--btn-ink": c.accent,
                  "--btn-fill": c.accent,
                  "--btn-text": "#ffffff",
                } as React.CSSProperties
              }
            >
              Back to the work
              <span className="btn-sep" aria-hidden="true">↑</span>
            </button>
          </footer>
        </div>
      </div>
    </div>,
    document.body
  );
}
