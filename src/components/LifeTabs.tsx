"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion, revealUp } from "@/lib/anim";
import {
  offTheClockIntro,
  interests,
  films,
  artworks,
  photos,
  travel,
  markets,
  type Interest,
} from "@/lib/personal";
import { profile } from "@/lib/resume";
import Placeholder from "./Placeholder";
import PolaroidLineCarousel from "@/components/ui/polaroid-line-carousel";

/**
 * The off-the-clock half of the site, in a browser window that stays stuck to
 * the viewport while you scroll past it. Each scroll band switches to the next
 * tab, so the section is read by scrolling rather than by clicking — though
 * the tabs are still buttons.
 *
 * The run is `interests.length` bands tall; `sticky` pins the window for
 * exactly that distance and releases it at the end.
 */
const BAND_VH = 85;

export default function LifeTabs() {
  const root = useRef<HTMLElement>(null);
  const urlRef = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);
  const last = useRef(0);

  useEffect(() => {
    registerGsap();

    const ctx = gsap.context(() => {
      revealUp(root.current!.querySelectorAll(".lt-head"), {
        trigger: root.current!,
        stagger: 0.06,
      });

      if (prefersReducedMotion()) return;

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const i = Math.min(
            interests.length - 1,
            Math.floor(self.progress * interests.length)
          );
          if (i !== last.current) {
            last.current = i;
            setIndex(i);
          }
        },
      });

      return () => st.kill();
    }, root);

    return () => ctx.revert();
  }, []);

  // retype the address bar and swap the panel on every change
  useEffect(() => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      urlRef.current,
      { opacity: 0, x: -6 },
      { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(
      ".lt-panel",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, [index]);

  const active = interests[index];
  const next = interests[(index + 1) % interests.length];
  const isLast = index === interests.length - 1;

  return (
    <section
      ref={root}
      id="life"
      style={{ height: `${interests.length * BAND_VH}vh` }}
      className="relative border-t border-ink/10 bg-paper"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden px-5 py-16 sm:px-8">
        <div className="mx-auto w-full max-w-[1400px]">
          {/* heading */}
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="lt-head reveal-ready label text-muted">
                {offTheClockIntro.kicker}
              </div>
              <h2 className="lt-head reveal-ready mt-3 text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
                {offTheClockIntro.heading}{" "}
                <span className="font-serif italic text-accent">
                  {offTheClockIntro.headingAccent}
                </span>
              </h2>
            </div>
            <p className="lt-head reveal-ready hand text-lg text-ink/50">
              keep scrolling — the tabs change themselves
            </p>
          </div>

          {/* ── browser window ── */}
          <div className="overflow-hidden rounded-2xl bg-ink shadow-[0_40px_90px_-50px_rgba(36,38,32,0.8)]">
            {/* tab strip */}
            <div className="flex items-end gap-1 overflow-x-auto px-3 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <span className="flex h-9 shrink-0 items-center rounded-t-lg bg-accent px-3.5 text-sm font-medium text-paper">
                {profile.first.toLowerCase()}
              </span>

              {interests.map((it, i) => {
                const on = i === index;
                return (
                  <button
                    key={it.id}
                    type="button"
                    onClick={() => {
                      setIndex(i);
                      last.current = i;
                    }}
                    className={`flex h-9 shrink-0 items-center gap-2 rounded-t-lg px-3.5 text-sm transition-colors ${
                      on
                        ? "bg-paper text-ink"
                        : "bg-paper/[0.06] text-paper/60 hover:bg-paper/[0.12]"
                    }`}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: it.tint }}
                      aria-hidden="true"
                    />
                    <span className="whitespace-nowrap">{it.tab}</span>
                  </button>
                );
              })}

              <span
                className="grid h-9 w-9 shrink-0 place-items-center text-lg text-paper/40"
                aria-hidden="true"
              >
                +
              </span>
            </div>

            {/* address bar */}
            <div className="flex items-center gap-2 bg-paper px-3 pb-3 pt-3 sm:gap-3">
              <div className="hidden items-center gap-1 pl-1 text-ink/35 sm:flex" aria-hidden="true">
                <NavIcon d="M15 18l-6-6 6-6" />
                <NavIcon d="M9 18l6-6-6-6" />
                <NavIcon d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4" />
              </div>
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-ink/[0.06] px-4 py-2.5">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 fill-ink/40" aria-hidden="true">
                  <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 8V7a3 3 0 1 1 6 0v3H9Z" />
                </svg>
                <span className="truncate font-mono text-xs text-muted">
                  {profile.githubLabel}.dev/life/
                  <span ref={urlRef} className="inline-block font-medium text-ink">
                    {active.path}
                  </span>
                </span>
              </div>
              <span
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-xs font-semibold text-paper"
                aria-hidden="true"
              >
                AP
              </span>
            </div>

            {/* panel */}
            <div className="lt-panel relative bg-paper px-5 pb-16 pt-5 sm:px-8">
              <Panel interest={active} />

              {/* next-tab nudge */}
              <div className="pointer-events-none absolute bottom-5 right-5 sm:right-8">
                <div className="flex items-center gap-3 rounded-full bg-ink px-4 py-2.5 text-paper shadow-lg">
                  <span className="label whitespace-nowrap opacity-60">
                    {isLast ? "that's the lot" : "keep scrolling"}
                  </span>
                  {!isLast && (
                    <>
                      <span className="h-4 w-px bg-paper/25" />
                      <span className="label whitespace-nowrap">
                        next: {next.tab}{" "}
                        <span className="inline-block animate-bounce" aria-hidden="true">
                          ↓
                        </span>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* position dashes */}
            <div className="flex justify-center gap-2 bg-paper pb-5" aria-hidden="true">
              {interests.map((it, i) => (
                <span
                  key={it.id}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === index ? "w-10 bg-accent" : "w-5 bg-ink/15"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NavIcon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 p-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

function Squiggle({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 80 40"
      className={`text-accent ${className}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 6 C 26 2, 54 10, 66 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M58 28 L 68 32 L 62 22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Copy column, shared by every tab. */
function Copy({ interest, children }: { interest: Interest; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center">
      <h3 className="text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
        {interest.title}
        <span className="font-serif italic text-accent"> — {interest.line}</span>
      </h3>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink/75 sm:text-base">
        {interest.detail}
      </p>
      {children}
    </div>
  );
}

const PANEL = "grid items-stretch gap-7 lg:grid-cols-2";
const MEDIA = "h-[220px] overflow-hidden rounded-xl border border-ink/10 sm:h-[260px]";

function Panel({ interest }: { interest: Interest }) {
  if (interest.id === "cook") {
    return (
      <div className={PANEL}>
        <div className={MEDIA}>
          {interest.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={interest.image} alt={interest.title} className="h-full w-full object-cover" />
          ) : (
            <Placeholder label="kitchen" tint={interest.tint} />
          )}
        </div>
        <Copy interest={interest}>
          <div className="mt-6 flex flex-wrap gap-2">
            {interest.chips?.map((c) => (
              <span
                key={c}
                className="label rounded-full border border-ink/15 px-3 py-1.5 text-ink/65"
              >
                {c}
              </span>
            ))}
          </div>
        </Copy>
      </div>
    );
  }

  if (interest.id === "photo") {
    return (
      <div className={PANEL}>
        <div className="grid grid-cols-3 gap-3">
          {photos.map((p) => (
            <figure
              key={p.caption}
              tabIndex={0}
              className="group relative h-[220px] cursor-pointer overflow-hidden rounded-xl border border-ink/10 outline-none transition-transform duration-500 hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-accent sm:h-[260px]"
            >
              <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                {p.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.src} alt={p.caption} className="h-full w-full object-cover" />
                ) : (
                  <Placeholder label={p.caption} tint={p.tint} />
                )}
              </div>
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-ink/90 px-3 py-2.5 transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
                <span className="hand text-base leading-tight text-paper">{p.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <Copy interest={interest}>
          <div className="mt-6 flex items-center gap-2">
            <Squiggle className="h-7 w-12 shrink-0" flip />
            <p className="hand text-lg text-ink/50">hover one</p>
          </div>
        </Copy>
      </div>
    );
  }

  if (interest.id === "film") {
    return (
      <div className="grid gap-7 lg:grid-cols-[1.15fr_1fr]">
        <FilmStrip />
        <Copy interest={interest}>
          <div className="mt-6 flex items-center gap-2">
            <Squiggle className="h-7 w-12 shrink-0" flip />
            <p className="hand text-lg text-ink/50">hover to open one</p>
          </div>
        </Copy>
      </div>
    );
  }

  if (interest.id === "paint") {
    return (
      <div className={PANEL}>
        <div className="grid grid-cols-4 gap-2.5">
          {artworks.map((a) => (
            <figure
              key={a.title}
              tabIndex={0}
              className="group relative h-[220px] cursor-pointer overflow-hidden rounded-xl border border-ink/10 outline-none transition-transform duration-500 hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-accent sm:h-[260px]"
            >
              <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                {a.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.src} alt={a.title} className="h-full w-full object-cover" />
                ) : (
                  <Placeholder label={a.title} tint={a.tint} />
                )}
              </div>
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-ink/90 px-3 py-2.5 transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
                <div className="text-xs font-medium text-paper">{a.title}</div>
                <div className="label mt-0.5 text-paper/60">{a.medium}</div>
              </figcaption>
            </figure>
          ))}
        </div>
        <Copy interest={interest}>
          <div className="mt-6 flex items-center gap-2">
            <Squiggle className="h-7 w-12 shrink-0" flip />
            <p className="hand text-lg text-ink/50">hover for the medium</p>
          </div>
        </Copy>
      </div>
    );
  }

  if (interest.id === "travel") {
    return (
      <div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h3 className="text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
            {interest.title}
            <span className="font-serif italic text-accent"> — {interest.line}</span>
          </h3>
          <p className="hand text-lg text-ink/50">drag the line, or use the arrows</p>
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">
          {travel.note}
        </p>

        {/* prints pegged to a sagging line; each one swings as it moves */}
        <PolaroidLineCarousel
          className="mt-2 rounded-xl"
          height={300}
          cardWidth={190}
          sag={26}
          autoplay={5200}
          string="var(--color-muted)"
          background="transparent"
          ink="var(--color-ink)"
          ariaLabel="Places I have travelled"
          slides={travel.places.map((p) => ({
            image: p.image ?? undefined,
            palette: p.palette,
            seed: p.seed,
            title: p.name,
            caption: `${p.kind} · ${p.near} — ${p.caption}`,
            alt: `${p.name}, ${p.near}`,
          }))}
        />
      </div>
    );
  }

  return (
    <div className={PANEL}>
      <div className={`${MEDIA} grid place-items-center bg-paper-2/50 p-5`}>
        <Sparkline />
      </div>
      <Copy interest={interest}>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">{markets.body}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {markets.tags.map((t) => (
            <span
              key={t}
              className="label rounded-full border border-ink/15 px-3 py-1.5 text-ink/65"
            >
              {t}
            </span>
          ))}
        </div>
      </Copy>
    </div>
  );
}

/** Favourite films: the hovered one widens, the rest collapse to spines. */
function FilmStrip() {
  const [open, setOpen] = useState(0);

  return (
    <div className="flex h-[220px] gap-2 sm:h-[260px]">
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
            className={`relative overflow-hidden rounded-xl border text-left outline-none transition-[flex-grow,border-color] duration-500 ease-out focus-visible:ring-2 focus-visible:ring-accent ${
              isOpen ? "flex-[4] border-ink/20" : "flex-[1] border-ink/10 hover:flex-[1.4]"
            }`}
            style={{ backgroundColor: isOpen ? `${f.tint}12` : "transparent" }}
          >
            <span
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-40"
              style={{ background: `linear-gradient(to top, ${f.tint}26, transparent)` }}
              aria-hidden="true"
            />

            <span
              className={`absolute inset-0 flex items-end justify-center pb-5 transition-opacity duration-300 ${
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

            <span
              className={`absolute inset-0 flex flex-col justify-end p-5 transition-opacity duration-500 ${
                isOpen ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <span
                className="label mb-auto inline-flex w-fit rounded-full px-2.5 py-1 text-paper"
                style={{ backgroundColor: f.tint }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="block">
                <span className="label block text-muted">{f.year}</span>
                <span className="mt-1.5 block text-xl font-medium leading-tight tracking-tight sm:text-2xl">
                  {f.title}
                </span>
                <span className="mt-2 block max-w-xs text-xs leading-relaxed text-muted">
                  {f.note}
                </span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Decorative equity curve for the markets tab. */
function Sparkline() {
  return (
    <svg viewBox="0 0 320 160" className="h-full w-full" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="lt-spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[32, 64, 96, 128].map((y) => (
        <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="currentColor" strokeOpacity="0.08" />
      ))}
      <path
        d="M0 132 L40 118 L80 126 L120 92 L160 104 L200 62 L240 74 L280 38 L320 48 L320 160 L0 160 Z"
        fill="url(#lt-spark)"
      />
      <path
        d="M0 132 L40 118 L80 126 L120 92 L160 104 L200 62 L240 74 L280 38 L320 48"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="320" cy="48" r="4" fill="var(--color-accent)" />
    </svg>
  );
}
