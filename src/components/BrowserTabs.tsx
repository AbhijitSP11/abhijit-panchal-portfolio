"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion, revealUp } from "@/lib/anim";
import { profile, experience, skills, education, achievements } from "@/lib/resume";
import {
  interests,
  films,
  artworks,
  photos,
  travel,
  markets,
  portrait,
} from "@/lib/personal";
import { builds } from "@/lib/building";
import { scrollToY } from "@/lib/smooth";
import Placeholder from "./Placeholder";
import { PropVisual, MarketVisual, AsterVisual } from "./BuildVisuals";
import Logo from "./Logo";
import PolaroidLineCarousel from "@/components/ui/polaroid-line-carousel";

/**
 * One browser window for the whole of "about me" — the professional tabs and
 * the off-the-clock ones in a single strip, because two identical windows on
 * one page was the same idea told twice.
 *
 * The window sticks to the viewport for the length of the section and each
 * scroll band advances a tab. Smoothness comes from three things: the panel
 * is a fixed height so swapping content never resizes the window, the swap is
 * a CSS animation rather than a tween that can be interrupted mid-flight, and
 * the band has a dead zone at its edges so a scroll that hovers on a boundary
 * cannot flicker between two tabs.
 */

type Tab = {
  key: string;
  icon: string;
  label: string;
  path: string;
  dot?: string;
};

const workTabs: Tab[] = [
  { key: "about", icon: "🙂", label: "about me", path: "about" },
  { key: "work-log", icon: "🗂️", label: "work log", path: "work-log" },
  { key: "stack", icon: "🧰", label: "stack", path: "stack" },
];

/**
 * Life tabs, minus the camera roll — independent work took its slot — and
 * with trips moved to the end so the section finishes on the travel line.
 */
const lifeOrder = ["film", "paint", "markets", "travel"];

const lifeTabs: Tab[] = lifeOrder
  .map((id) => interests.find((i) => i.id === id)!)
  .filter(Boolean)
  .map((i) => ({
    key: i.id,
    icon: "",
    label: i.tab,
    path: `life/${i.path}`,
    dot: i.tint,
  }));

const tabs: Tab[] = [
  ...workTabs,
  { key: "building", icon: "🛠️", label: "building", path: "building" },
  ...lifeTabs,
];

/**
 * Scroll distance per tab. Kept short on purpose: a tab should turn over
 * within one flick of the wheel, not three.
 */
const BAND_VH = 24;

/**
 * One extra viewport of section beyond the bands.
 *
 * The sticky panel is one viewport tall, so a section of exactly N bands only
 * scrolls for (N × BAND − 100vh) — the last tab became active at the very
 * instant the panel unpinned, which is why trips and markets flashed past and
 * the page scrolled on. The tail gives every band, including the last, its
 * full share of scroll while the panel is still pinned.
 */
const TAIL_VH = 100;

export default function BrowserTabs() {
  const root = useRef<HTMLElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const urlRef = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);
  const last = useRef(0);
  const band = useRef<ScrollTrigger | null>(null);

  // The panel on show and the one just leaving, so a swap is a cross-fade
  // rather than a cut. Derived during render (not in an effect) so the old
  // panel never disappears for a frame before the new one arrives.
  const [shown, setShown] = useState<{ cur: number; prev: number | null; dir: 1 | -1 }>({
    cur: 0,
    prev: null,
    dir: 1,
  });
  if (shown.cur !== index) {
    setShown({ cur: index, prev: shown.cur, dir: index > shown.cur ? 1 : -1 });
  }
  useEffect(() => {
    if (shown.prev === null) return;
    const t = window.setTimeout(
      () => setShown((s) => (s.prev === null ? s : { ...s, prev: null })),
      460
    );
    return () => window.clearTimeout(t);
  }, [shown.cur, shown.prev]);

  /**
   * Clicking a tab moves the page to that tab's scroll band rather than only
   * setting state. If it only set state, the very next scroll event would
   * recompute the band and snap back to whatever the scroll position says.
   */
  const selectTab = (i: number) => {
    last.current = i;
    setIndex(i);
    const st = band.current;
    if (!st) return;
    const span = st.end - st.start;
    scrollToY(st.start + (span * (i + 0.5)) / tabs.length, 0.6);
  };

  useEffect(() => {
    registerGsap();

    const ctx = gsap.context(() => {
      revealUp(root.current!.querySelectorAll(".bt-head"), {
        trigger: root.current!,
        stagger: 0.06,
      });

      if (prefersReducedMotion()) return;

      // From laptop width up the window is pinned and the scroll drives the
      // tabs. On a phone or tablet it is an ordinary tap-through window, so there is no
      // band to create. matchMedia builds and tears the band down as the
      // screen is rotated or resized.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        // No hysteresis and no settle delay — the band flips the moment the
        // scroll crosses it, which is what makes it feel instant.
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const i = Math.min(
              tabs.length - 1,
              Math.floor(self.progress * tabs.length)
            );
            if (i === last.current) return;
            last.current = i;
            setIndex(i);
          },
        });
        band.current = st;
        return () => {
          st.kill();
          band.current = null;
        };
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  // keep the active tab in view in the strip, and retype the address bar
  useEffect(() => {
    if (urlRef.current && !prefersReducedMotion()) {
      gsap.fromTo(
        urlRef.current,
        { opacity: 0, x: -6 },
        { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
      );
    }

    const el = strip.current?.querySelector<HTMLElement>(`[data-tab="${index}"]`);
    const box = strip.current;
    if (!el || !box) return;
    const target = el.offsetLeft - box.clientWidth / 2 + el.clientWidth / 2;
    box.scrollTo({
      left: Math.max(0, target),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, [index]);

  const active = tabs[index];
  const next = tabs[(index + 1) % tabs.length];
  const isLast = index === tabs.length - 1;

  return (
    <section
      ref={root}
      id="about"
      style={{ "--band-h": `${tabs.length * BAND_VH + TAIL_VH}vh` } as React.CSSProperties}
      className="relative border-t border-ink/10 bg-paper lg:h-[var(--band-h)]"
    >
      <div className="flex flex-col px-5 py-14 sm:px-8 lg:sticky lg:top-0 lg:h-[100svh] lg:justify-center lg:overflow-hidden lg:py-10">
        <div className="mx-auto flex w-full max-w-[1500px] flex-col">
          {/* heading */}
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="bt-head reveal-ready label text-muted">03 / About me</div>
              <h2 className="bt-head reveal-ready mt-2 text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl">
                a little more{" "}
                <span className="font-serif italic text-accent">about me.</span>
              </h2>
            </div>
            <p className="bt-head reveal-ready hand text-lg text-ink/50">
              yes, I have too many tabs open — keep scrolling
            </p>
          </div>

          {/* ── browser window ── */}
          <div className="flex flex-col overflow-hidden rounded-2xl bg-ink lg:h-[min(84svh,900px)] shadow-[0_40px_90px_-50px_rgba(36,38,32,0.8)]">
            {/* tab strip */}
            <div
              ref={strip}
              className="flex shrink-0 items-end gap-1 overflow-x-auto scroll-smooth px-3 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <span className="flex h-9 shrink-0 items-center rounded-t-lg bg-accent px-3.5 text-sm font-medium text-paper">
                {profile.first.toLowerCase()}
              </span>

              {tabs.map((t, i) => {
                const on = i === index;
                return (
                  <button
                    key={t.key}
                    type="button"
                    data-tab={i}
                    onClick={() => selectTab(i)}
                    className={`flex h-9 shrink-0 items-center gap-2 rounded-t-lg px-3.5 text-sm transition-[background-color,color,transform] duration-300 ease-out ${
                      on
                        ? "bg-paper text-ink"
                        : "bg-paper/[0.06] text-paper/60 hover:bg-paper/[0.12]"
                    }`}
                  >
                    {t.dot ? (
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: t.dot }}
                        aria-hidden="true"
                      />
                    ) : (
                      <span aria-hidden="true">{t.icon}</span>
                    )}
                    <span className="whitespace-nowrap">{t.label}</span>
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
            <div className="flex shrink-0 items-center gap-2 bg-paper px-3 pb-3 pt-3 sm:gap-3">
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
                  {profile.githubLabel}.dev/
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

            {/* panel — grows to fill, so swapping content never resizes the window */}
            <div className="relative min-h-0 flex-1 bg-paper">
              {/* overflow-hidden, not auto: nothing inside the window scrolls
                  on its own — every panel is written to fit */}
              {shown.prev !== null && (
                <div
                  key={`out-${shown.prev}`}
                  className="bt-out pointer-events-none absolute inset-x-0 top-0 overflow-hidden px-5 pb-6 pt-4 sm:px-8 lg:inset-0 lg:pb-14 lg:pt-3"
                  style={{ "--dir": shown.dir } as React.CSSProperties}
                  aria-hidden="true"
                >
                  <FitPanel>
                    <Panel tabKey={tabs[shown.prev].key} />
                  </FitPanel>
                </div>
              )}
              <div
                key={`in-${shown.cur}`}
                className="bt-in relative px-5 pb-6 pt-4 sm:px-8 lg:absolute lg:inset-0 lg:overflow-hidden lg:pb-14 lg:pt-3"
                style={{ "--dir": shown.dir } as React.CSSProperties}
              >
                <FitPanel>
                  <Panel tabKey={tabs[shown.cur].key} />
                </FitPanel>
              </div>

              {/* next-tab nudge */}
              <div className="pointer-events-none absolute bottom-4 right-5 z-10 hidden sm:right-8 lg:block">
                <div className="flex items-center gap-3 rounded-full bg-ink px-4 py-2.5 text-paper shadow-lg">
                  <span className="label whitespace-nowrap opacity-60">
                    {isLast ? "that's the lot" : "keep scrolling"}
                  </span>
                  {!isLast && (
                    <>
                      <span className="h-4 w-px bg-paper/25" />
                      <span className="label whitespace-nowrap">
                        next: {next.label}{" "}
                        <span className="inline-block animate-bounce" aria-hidden="true">
                          ↓
                        </span>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* phones: step through the tabs */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-ink/10 bg-paper px-4 py-3 lg:hidden">
              <button
                type="button"
                onClick={() => selectTab(Math.max(0, index - 1))}
                disabled={index === 0}
                className="label rounded-full border border-ink/20 px-4 py-2.5 text-ink transition-opacity disabled:opacity-30"
              >
                ← {index === 0 ? "start" : tabs[index - 1].label}
              </button>
              <button
                type="button"
                onClick={() => selectTab(Math.min(tabs.length - 1, index + 1))}
                disabled={isLast}
                className="label rounded-full bg-ink px-4 py-2.5 text-paper transition-opacity disabled:opacity-30"
              >
                {isLast ? "end" : next.label} →
              </button>
            </div>

            {/* position dashes */}
            <div className="flex shrink-0 justify-center gap-1.5 bg-paper pb-4" aria-hidden="true">
              {tabs.map((t, i) => (
                <span
                  key={t.key}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === index ? "w-8 bg-accent" : "w-4 bg-ink/15"
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

/**
 * In the pinned (laptop and up) window every panel has a fixed box and nothing
 * scrolls, so on a short screen a panel can be taller than its box. Rather than
 * cut it off, scale it down just enough to fit (never below 72%), laying it out
 * at the wider size so the text reflows with it. On a phone or tablet the
 * window grows with its content, so this does nothing.
 */
function FitPanel({ children }: { children: React.ReactNode }) {
  const inner = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const box = inner.current;
    const outer = box?.parentElement;
    if (!box || !outer) return;

    const fit = () => {
      if (!window.matchMedia("(min-width: 1024px)").matches) {
        box.style.cssText = "";
        return;
      }
      const cs = getComputedStyle(outer);
      const avail =
        outer.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      box.style.cssText = `height:${avail}px;width:100%;transform:none`;
      let k = 1;
      // a wider layout can change the height too, so settle over a few passes
      for (let pass = 0; pass < 4; pass++) {
        const need = box.scrollHeight * k;
        if (need <= avail + 1) break;
        k = Math.max(0.72, k * (avail / need));
        box.style.cssText = `height:${avail / k}px;width:${100 / k}%;transform:scale(${k});transform-origin:top left`;
        if (k === 0.72) break;
      }
      if (k === 1) box.style.cssText = `height:${avail}px`;
    };

    fit();
    const late = window.setTimeout(fit, 350);
    document.fonts?.ready.then(fit).catch(() => {});
    const ro = new ResizeObserver(fit);
    ro.observe(outer);
    return () => {
      window.clearTimeout(late);
      ro.disconnect();
    };
  }, []);

  return <div ref={inner}>{children}</div>;
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

function Heading({ kicker, lead, accent }: { kicker: string; lead: string; accent: string }) {
  return (
    <>
      <div className="label text-muted">{kicker}</div>
      <h3 className="mt-2 text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
        {lead}
        <span className="font-serif italic text-accent"> {accent}</span>
      </h3>
    </>
  );
}

function Panel({ tabKey }: { tabKey: string }) {
  const interest = interests.find((i) => i.id === tabKey);

  // ── professional tabs ────────────────────────────────────────────────
  if (tabKey === "about") {
    return (
      <div className="grid gap-7 lg:grid-cols-12">
        {/* portrait, in a frame */}
        <div className="lg:col-span-3">
          <figure className="w-full max-w-[220px] rotate-[-2.5deg] bg-white p-2.5 pb-3 shadow-[0_18px_40px_-22px_rgba(36,38,32,0.6)] transition-transform duration-500 hover:rotate-0">
            <div className="aspect-[4/5] w-full overflow-hidden bg-paper-2">
              {portrait.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={portrait.src}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: portrait.position }}
                />
              ) : (
                <Placeholder label="portrait" tint={portrait.tint} />
              )}
            </div>
            <figcaption className="hand mt-1.5 px-1 text-lg leading-tight text-ink/60">
              {portrait.caption}
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-5">
          <Heading kicker="About me" lead="hello, I'm" accent={profile.name} />
          <p className="mt-4 text-sm leading-relaxed text-ink/75 sm:text-base">
            {profile.summary}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{profile.summary2}</p>
        </div>

        <div className="lg:col-span-4 lg:pt-8">
          <div className="space-y-2.5">
            {[
              "currently building at Oneture",
              `based in ${profile.location}`,
              "banks, payments & settlement",
              "open to full stack roles",
            ].map((line) => (
              <div
                key={line}
                className="flex items-center gap-3 border border-ink/10 bg-paper-2/50 px-4 py-2.5 text-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {line}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-2">
            <Squiggle className="mt-1 h-7 w-12 shrink-0" flip />
            <p className="hand text-lg leading-snug text-ink/55">
              the short version — the tabs have the rest
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (tabKey === "work-log") {
    return (
      <div>
        <Heading kicker="Work log" lead="where I've" accent="been building." />
        <div className="mt-6 divide-y divide-ink/10 border-t border-ink/10">
          {experience.map((job, i) => (
            <div key={job.company} className="flex items-center gap-4 py-4 sm:gap-6">
              <span className="label w-6 shrink-0 text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-ink/15 bg-paper text-sm font-semibold text-paper"
                style={job.logo ? undefined : { backgroundColor: ["#d62d46", "#c9584a", "#a8324a"][i % 3] }}
                aria-hidden="true"
              >
                {job.logo ? <Logo logo={job.logo} size={30} /> : job.company.slice(0, 1)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-lg font-medium tracking-tight sm:text-xl">
                  {job.company}
                </div>
                <div className="label mt-0.5 text-muted">{job.period}</div>
              </div>
              <div className="hidden text-sm text-muted sm:block">{job.role}</div>
              <span
                className={`label shrink-0 rounded-full px-3 py-1.5 ${
                  job.current ? "bg-accent text-paper" : "border border-ink/15 text-muted"
                }`}
              >
                {job.current ? "now" : "before"}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <p className="hand text-lg text-ink/55">the serious bit, in one PDF</p>
            <Squiggle className="h-7 w-12 shrink-0" />
          </div>
          <a
            href="/Abhijit_Panchal_Resume.pdf"
            download
            className="btn-fill group !py-2.5 text-sm font-medium text-ink"
          >
            open resume
            <span className="transition-transform group-hover:-translate-y-0.5" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>
    );
  }

  if (tabKey === "stack") {
    return (
      <div>
        <Heading kicker="Stack" lead="what I build" accent="things with." />
        <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s) => (
            <div key={s.group}>
              <div className="label mb-2.5 text-accent">{s.group}</div>
              <div className="flex flex-wrap gap-1.5">
                {s.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-full border border-ink/15 px-2.5 py-1 text-xs text-ink/70 transition-colors hover:border-accent hover:text-accent"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-2">
          <Squiggle className="h-7 w-12 shrink-0" flip />
          <p className="hand text-lg text-ink/55">
            most days: Python on one screen, React on the other
          </p>
        </div>
      </div>
    );
  }

  if (tabKey === "schooling") {
    return (
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Heading kicker="Schooling" lead="where it" accent="started." />
          <div className="mt-6 rounded-xl border border-ink/10 bg-paper-2/50 p-6">
            <div className="text-xl font-medium tracking-tight">{education.school}</div>
            <div className="mt-1 text-sm text-ink/70">{education.degree}</div>
            <div className="label mt-3 text-muted">
              {education.period} · {education.location}
            </div>
          </div>
        </div>
        <div className="lg:col-span-6 lg:pt-12">
          <div className="label text-muted">Key achievements</div>
          <ul className="mt-3 space-y-3.5">
            {achievements.map((a, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink/75">
                <span className="mt-2 h-px w-4 shrink-0 bg-accent" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (tabKey === "building") {
    return (
      <div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <Heading kicker="Independent work" lead="things I’ve" accent="been building." />
          <p className="hand text-lg text-ink/50">hover a block to open it</p>
        </div>
        <BuildStrip />
      </div>
    );
  }

  if (!interest) return null;

  // ── off-the-clock tabs ───────────────────────────────────────────────
  const copy = (
    <div className="flex flex-col justify-center">
      <h3 className="text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
        {interest.title}
        <span className="font-serif italic text-accent"> — {interest.line}</span>
      </h3>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink/75 sm:text-base">
        {interest.detail}
      </p>
    </div>
  );

  const panel = "grid items-stretch gap-7 lg:grid-cols-2";

  if (interest.id === "photo") {
    return (
      <div className={panel}>
        <div className="grid grid-cols-3 gap-3">
          {photos.map((p) => (
            <figure
              key={p.caption}
              tabIndex={0}
              className="group relative h-[240px] cursor-pointer overflow-hidden rounded-xl border border-ink/10 outline-none transition-transform duration-500 hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-accent sm:h-[300px]"
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
        <div>
          {copy}
          <div className="mt-6 flex items-center gap-2">
            <Squiggle className="h-7 w-12 shrink-0" flip />
            <p className="hand text-lg text-ink/50">hover one</p>
          </div>
        </div>
      </div>
    );
  }

  if (interest.id === "film") {
    return (
      <div className="grid gap-7 lg:grid-cols-[1.15fr_1fr]">
        <FilmStrip />
        <div>
          {copy}
          <div className="mt-6 flex items-center gap-2">
            <Squiggle className="h-7 w-12 shrink-0" flip />
            <p className="hand text-lg text-ink/50">hover to open one</p>
          </div>
        </div>
      </div>
    );
  }

  if (interest.id === "paint") {
    return (
      <div className={panel}>
        <div className="flex justify-center gap-4 md:justify-start">
          {artworks.map((a) => (
            <figure
              key={a.title}
              tabIndex={0}
              className="group relative aspect-[3/4] w-[calc(50%-0.5rem)] cursor-pointer overflow-hidden rounded-xl border border-ink/10 shadow-[0_22px_38px_-22px_rgba(0,0,0,0.5)] outline-none transition-transform duration-500 hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-accent sm:h-[320px] sm:w-auto"
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
        <div>
          {copy}
          <div className="mt-6 flex items-center gap-2">
            <Squiggle className="h-7 w-12 shrink-0" flip />
            <p className="hand text-lg text-ink/50">hover for the medium</p>
          </div>
        </div>
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
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">{travel.note}</p>
        <TravelLine />
      </div>
    );
  }

  // markets
  return (
    <div className="grid gap-7 lg:grid-cols-12">
      <div className="lg:col-span-5">
        {copy}
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">{markets.body}</p>

        <div className="mt-5 border border-ink/10 bg-paper-2/50 p-4">
          <Sparkline />
          <div className="mt-2 flex items-center justify-between">
            <span className="label text-ink/50">equity curve · illustrative</span>
            <span className="label text-accent">journal kept per trade</span>
          </div>
        </div>
      </div>

      {/* how a position actually gets taken */}
      <div className="lg:col-span-7">
        <div className="label text-ink/60">How a position gets taken</div>

        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {markets.process.map((s) => (
            <li
              key={s.n}
              className="group/step relative border border-ink/12 bg-paper p-4 transition-colors hover:border-accent/50"
            >
              <span className="absolute right-3 top-2 select-none text-2xl font-semibold leading-none text-ink/[0.07]">
                {s.n}
              </span>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="text-base font-semibold tracking-tight">{s.title}</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-ink/65">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {markets.tags.map((t) => (
            <span key={t} className="label border border-ink/15 px-2.5 py-1 text-ink/55">
              {t}
            </span>
          ))}
        </div>

        {/* the interest that turned into a tool */}
        <div className="mt-4 flex items-center justify-between gap-4 border border-accent/35 bg-accent/[0.06] px-4 py-3">
          <span className="min-w-0">
            <span className="label text-accent">Built from this</span>
            <span className="mt-1 block text-sm text-ink/75">
              <strong className="font-semibold text-ink">{markets.built.name}</strong>{" "}
              — {markets.built.line}
            </span>
          </span>
          <span className="shrink-0 text-accent" aria-hidden="true">
            →
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * The travel line. It is mounted fresh whenever the tab becomes active, and
 * a print is advanced shortly after so the line actually moves and the prints
 * swing on arrival, rather than hanging still until autoplay first fires.
 */
function TravelLine() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const t = window.setTimeout(() => {
      wrap.current
        ?.querySelector<HTMLButtonElement>('button[aria-label="Next"]')
        ?.click();
    }, 450);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div ref={wrap}>
      <PolaroidLineCarousel
        className="mt-1"
        height={330}
        cardWidth={205}
        sag={26}
        autoplay={3400}
        string="var(--color-muted)"
        background="transparent"
        ink="var(--color-ink)"
        ariaLabel="Places I have travelled"
        slides={travel.places.map((p) => ({
          image: p.image,
          title: p.name,
          caption: `${p.kind}${p.where ? ` · ${p.where}` : ""} — ${p.caption}`,
          alt: p.caption,
        }))}
      />
    </div>
  );
}

/**
 * The independent projects as three folders side by side. The hovered
 * one opens out: what it is, what it is built with, and a looping scene of the
 * product doing its job. The others fold down to a spine and keep glowing, so
 * the row always has something moving in it. Nothing scrolls.
 */
const BUILD_LOOK: Record<
  string,
  { grad: string; tab: string; text: string; scene: React.ReactNode }
> = {
  "prop-ai": {
    grad: "linear-gradient(135deg,#065f46 0%,#0f9d6b 55%,#34d399 100%)",
    tab: "#065f46",
    text: "#065f46",
    scene: <PropVisual />,
  },
  "market-ai": {
    grad: "linear-gradient(135deg,#9f1239 0%,#e11d48 50%,#fb923c 100%)",
    tab: "#9f1239",
    text: "#9f1239",
    scene: <MarketVisual />,
  },
  aster: {
    grad: "linear-gradient(135deg,#3730a3 0%,#4f6bed 55%,#22d3ee 100%)",
    tab: "#3730a3",
    text: "#3730a3",
    scene: <AsterVisual />,
  },
};

/** Each project is a folder: a tab on top, the page sticking out of it, and a front flap. */
function BuildStrip() {
  const [open, setOpen] = useState(0);

  return (
    <div className="@container mt-6">
      <div className="flex flex-col gap-3 md:h-[350px] md:flex-row">
        {builds.map((b, i) => {
          const isOpen = i === open;
          const look = BUILD_LOOK[b.id];
          const n = String(i + 1).padStart(2, "0");
          return (
            <article
              key={b.id}
              tabIndex={0}
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              onClick={() => setOpen(i)}
              aria-expanded={isOpen}
              className={`relative cursor-pointer text-white outline-none transition-[flex-grow,transform,height] duration-500 ease-out focus-visible:[&>.bv-body]:ring-2 focus-visible:[&>.bv-body]:ring-ink ${
                isOpen
                  ? "h-[372px] md:h-auto md:flex-[3.6]"
                  : "h-[80px] md:h-auto md:flex-[1] md:hover:-translate-y-1.5"
              }`}
            >
              {/* the tab on the folder's top edge */}
              <div
                className="absolute left-0 top-0 flex h-9 w-[min(170px,70%)] items-center rounded-tl-xl pl-3.5 pr-7 text-xs font-semibold tracking-wide md:w-[var(--tab-w)]"
                style={
                  {
                    backgroundColor: look.tab,
                    clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 100%, 0 100%)",
                    "--tab-w": isOpen ? "min(190px, 70%)" : "calc(100% - 22px)",
                    transition: "width 500ms cubic-bezier(.2,.8,.2,1)",
                  } as React.CSSProperties
                }
              >
                <span className="whitespace-nowrap">
                  {n}
                  {isOpen ? ` · ${b.id}/` : ""}
                </span>
              </div>

              {/* the folder body */}
              <div
                className={`bv-body bv-grad absolute inset-x-0 bottom-0 top-8 rounded-b-2xl rounded-tr-2xl transition-shadow duration-500 ${
                  isOpen
                    ? "shadow-[0_30px_50px_-24px_rgba(0,0,0,0.6)]"
                    : "shadow-[0_16px_28px_-20px_rgba(0,0,0,0.55)]"
                }`}
                style={{ backgroundImage: look.grad }}
              >
                {/* soft light for depth, clipped to the folder */}
                <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-b-2xl rounded-tr-2xl" aria-hidden="true">
                  <span className="absolute -right-10 -top-12 h-52 w-52 rounded-full bg-white/20 blur-3xl" />
                  <span className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-black/20 blur-3xl" />
                </span>

                {/* folded: a live dot and the name down the spine */}
                <div
                  className={`absolute inset-0 flex flex-row items-center justify-start gap-3 px-5 pt-2 transition-opacity duration-300 md:flex-col md:justify-between md:px-2 md:pb-6 md:pt-7 ${
                    isOpen ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
                  </span>
                  <span className="whitespace-nowrap text-xl font-semibold tracking-tight md:rotate-180 md:[writing-mode:vertical-rl]">
                    {b.name}
                  </span>
                </div>

                {/* open: the page poking out of the folder */}
                <div
                  className={`bv-float absolute -top-7 right-6 z-10 hidden transition-opacity duration-500 @3xl:block ${
                    isOpen ? "opacity-100 delay-150" : "pointer-events-none opacity-0"
                  }`}
                >
                  {look.scene}
                </div>

                {/* open: what it is */}
                <div
                  className={`absolute inset-0 overflow-hidden rounded-b-2xl p-5 pt-4 transition-opacity duration-500 sm:p-6 sm:pt-5 @3xl:pr-[260px] ${
                    isOpen ? "opacity-100 delay-150" : "pointer-events-none opacity-0"
                  }`}
                >
                  <span className="label text-white/75">{b.year}</span>
                  <h4 className="mt-1 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                    {b.name}
                  </h4>
                  <p className="mt-1 font-serif text-lg italic leading-snug text-white/90">
                    {b.tagline}
                  </p>
                  <p className="mt-2.5 line-clamp-4 text-[0.88rem] leading-relaxed text-white/85">
                    {b.blurb}
                  </p>
                </div>

                {/* the front flap: stack and link */}
                <div
                  className={`absolute inset-x-0 bottom-0 z-20 flex min-h-[74px] flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-b-2xl border-t border-white/30 bg-black/25 px-5 py-3 backdrop-blur-md transition-opacity duration-500 sm:px-6 md:h-[27%] md:py-0 ${
                    isOpen ? "opacity-100 delay-150" : "pointer-events-none opacity-0"
                  }`}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {b.stack.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="label !text-[0.65rem] rounded-full border border-white/50 bg-white/15 px-2.5 py-1 text-white"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {b.caseStudy ? (
                    <Link
                      href={b.caseStudy}
                      className="btn-fill shrink-0 !px-4 !py-2 text-sm font-medium"
                      style={
                        {
                          "--btn-ink": "#ffffff",
                          "--btn-fill": "#ffffff",
                          "--btn-text": look.text,
                        } as React.CSSProperties
                      }
                    >
                      Case study
                      <span className="btn-sep" aria-hidden="true">→</span>
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

/** Favourite films: the hovered one widens, the rest collapse to spines. */
function FilmStrip() {
  const [open, setOpen] = useState(0);

  return (
    <div className="flex h-[240px] gap-2 sm:h-[300px]">
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
            {f.poster ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={f.poster}
                alt=""
                aria-hidden="true"
                draggable={false}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-45"}`}
              />
            ) : null}
            {f.poster ? (
              <span
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"
                aria-hidden="true"
              />
            ) : null}
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
                className={`label whitespace-nowrap ${f.poster ? "text-white [text-shadow:0_1px_6px_rgba(0,0,0,.8)]" : "text-muted"}`}
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
                <span className={`label block ${f.poster ? "text-white/75" : "text-muted"}`}>{f.year}</span>
                <span className={`mt-1.5 block text-xl font-medium leading-tight tracking-tight sm:text-2xl ${f.poster ? "text-white" : ""}`}>
                  {f.title}
                </span>
                <span className={`mt-2 block max-w-xs text-xs leading-relaxed ${f.poster ? "text-white/80" : "text-muted"}`}>
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
        <linearGradient id="bt-spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[32, 64, 96, 128].map((y) => (
        <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="currentColor" strokeOpacity="0.08" />
      ))}
      <path
        d="M0 132 L40 118 L80 126 L120 92 L160 104 L200 62 L240 74 L280 38 L320 48 L320 160 L0 160 Z"
        fill="url(#bt-spark)"
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
