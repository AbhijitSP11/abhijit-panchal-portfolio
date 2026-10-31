"use client";

import { useEffect, useRef, useState } from "react";
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
const lifeOrder = ["cook", "film", "paint", "markets", "travel"];

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

      return () => st.kill();
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
      style={{ height: `${tabs.length * BAND_VH + TAIL_VH}vh` }}
      className="relative border-t border-ink/10 bg-paper"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden px-5 py-10 sm:px-8">
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
          <div className="flex h-[min(84svh,900px)] flex-col overflow-hidden rounded-2xl bg-ink shadow-[0_40px_90px_-50px_rgba(36,38,32,0.8)]">
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
                    className={`flex h-9 shrink-0 items-center gap-2 rounded-t-lg px-3.5 text-sm transition-colors duration-300 ${
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
              <div
                key={index}
                className="panel-in absolute inset-0 overflow-hidden px-5 pb-14 pt-3 sm:px-8"
              >
                <Panel tabKey={active.key} />
              </div>

              {/* next-tab nudge */}
              <div className="pointer-events-none absolute bottom-4 right-5 z-10 sm:right-8">
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
          <Heading kicker="Independent work" lead="things I've" accent="been building." />
          <p className="hand text-lg text-ink/50">
            nobody asked for these — that&rsquo;s the point
          </p>
        </div>

        {/* the work-log row anatomy, kept light */}
        <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
          {builds.map((b, i) => (
            <article
              key={b.id}
              className="group flex items-center gap-4 px-3 py-5 transition-colors duration-300 hover:bg-white sm:gap-6"
            >
              <span className="label w-6 shrink-0 text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-base font-semibold text-white"
                style={{ backgroundColor: b.accent }}
                aria-hidden="true"
              >
                {b.name.slice(0, 1)}
              </span>

              <div className="min-w-0 flex-1">
                <div className="text-lg font-medium tracking-tight sm:text-xl">{b.name}</div>
                <div className="mt-0.5 font-serif text-base italic leading-snug text-muted">
                  {b.tagline}
                </div>
              </div>

              <div className="hidden max-w-[260px] flex-wrap justify-end gap-1 lg:flex">
                {b.stack.slice(0, 4).map((t) => (
                  <span key={t} className="label text-[0.62rem] text-muted">
                    {t}
                  </span>
                ))}
              </div>

              {b.caseStudy ? (
                <Link
                  href={b.caseStudy}
                  className="btn-fill shrink-0 !px-3 !py-2 text-xs font-medium"
                  style={{ "--btn-fill": b.accent } as React.CSSProperties}
                >
                  Case study
                  <span className="btn-sep !pl-2" aria-hidden="true">→</span>
                </Link>
              ) : null}
            </article>
          ))}
        </div>
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
  const media = "h-[240px] overflow-hidden rounded-xl border border-ink/10 sm:h-[300px]";

  if (interest.id === "cook") {
    return (
      <div className={panel}>
        <div className={media}>
          {interest.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={interest.image} alt={interest.title} className="h-full w-full object-cover" />
          ) : (
            <Placeholder label="kitchen" tint={interest.tint} />
          )}
        </div>
        <div>
          {copy}
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
        </div>
      </div>
    );
  }

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
              className="group relative aspect-[3/4] h-[250px] cursor-pointer overflow-hidden rounded-xl border border-ink/10 shadow-[0_22px_38px_-22px_rgba(0,0,0,0.5)] outline-none transition-transform duration-500 hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-accent sm:h-[320px]"
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
