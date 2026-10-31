"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion, revealUp } from "@/lib/anim";
import { profile, experience, skills, education, achievements } from "@/lib/resume";

type TabKey = "about" | "work-log" | "stack" | "schooling";

const tabs: { key: TabKey; icon: string; label: string; path: string }[] = [
  { key: "about", icon: "🙂", label: "about me", path: "about" },
  { key: "work-log", icon: "🗂️", label: "work log", path: "work-log" },
  { key: "stack", icon: "🧰", label: "stack", path: "stack" },
  { key: "schooling", icon: "🎓", label: "schooling", path: "schooling" },
];

/** Decorative crammed-browser favicons — the "too many tabs" joke. */
const ghostTabs = ["#1d4ed8", "#4f46e5", "#7c3aed", "#b05a7a", "#2e3129"];

export default function TabsWindow() {
  const root = useRef<HTMLElement>(null);
  const urlRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState<TabKey>("about");
  const lastIndex = useRef(0);

  const activeIndex = tabs.findIndex((t) => t.key === active);
  const nextTab = tabs[(activeIndex + 1) % tabs.length];
  const isLast = activeIndex === tabs.length - 1;

  useEffect(() => {
    registerGsap();

    const ctx = gsap.context(() => {
      revealUp(root.current!.querySelectorAll(".tw-fade"), {
        trigger: root.current!,
        stagger: 0.08,
      });

      if (prefersReducedMotion()) return;

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top 60%",
        end: "bottom bottom",
        onUpdate: (self) => {
          const i = Math.min(
            tabs.length - 1,
            Math.floor(self.progress * tabs.length)
          );
          if (i !== lastIndex.current) {
            lastIndex.current = i;
            setActive(tabs[i].key);
          }
        },
      });

      return () => st.kill();
    }, root);

    return () => ctx.revert();
  }, []);

  // Re-type the address bar and swap the panel whenever the tab changes.
  useEffect(() => {
    if (prefersReducedMotion() || !urlRef.current) return;
    gsap.fromTo(
      urlRef.current,
      { opacity: 0, x: -6 },
      { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
    );
    gsap.fromTo(
      ".tw-panel",
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
    );
  }, [active]);

  const activeTab = tabs[activeIndex];

  return (
    <section
      ref={root}
      id="about"
      className="border-t border-ink/10 bg-paper px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="tw-fade reveal-ready label mb-10 text-muted">
          03 / About me
        </div>

        <h2 className="tw-fade reveal-ready text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          a little more
          <br />
          <span className="font-serif italic text-accent">about me.</span>
        </h2>

        <p className="tw-fade reveal-ready hand mt-10 text-2xl text-ink/60">
          yes, I have too many tabs open
        </p>

        {/* ── browser window ── */}
        <div className="tw-fade reveal-ready relative mt-4 overflow-hidden rounded-2xl bg-ink shadow-[0_40px_90px_-50px_rgba(36,38,32,0.8)]">
          {/* tab strip */}
          <div className="flex items-end gap-1 overflow-x-auto px-3 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {ghostTabs.map((c, i) => (
              <span
                key={i}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-t-lg bg-paper/[0.06]"
                aria-hidden="true"
              >
                <span
                  className="h-3.5 w-3.5 rounded-[3px]"
                  style={{ backgroundColor: c, opacity: 0.8 }}
                />
              </span>
            ))}

            <span className="flex h-9 shrink-0 items-center rounded-t-lg bg-accent px-3.5 text-sm font-medium text-paper">
              {profile.first.toLowerCase()}
            </span>

            {tabs.map((t) => {
              const on = t.key === active;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => {
                    setActive(t.key);
                    lastIndex.current = tabs.indexOf(t);
                  }}
                  className={`flex h-9 shrink-0 items-center gap-2 rounded-t-lg px-3.5 text-sm transition-colors ${
                    on
                      ? "bg-paper text-ink"
                      : "bg-paper/[0.06] text-paper/60 hover:bg-paper/[0.12]"
                  }`}
                >
                  <span aria-hidden="true">{t.icon}</span>
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
                {profile.githubLabel}.dev/
                <span ref={urlRef} className="inline-block font-medium text-ink">
                  {activeTab.path}
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
          <div className="tw-panel relative min-h-[380px] bg-paper px-5 pb-20 pt-4 sm:px-8">
            <Panel tab={active} />

            {/* next-tab nudge */}
            <div className="pointer-events-none absolute bottom-6 right-5 z-20 sm:right-8">
              <div className="flex items-center gap-3 rounded-full bg-ink px-4 py-2.5 text-paper shadow-lg">
                <span className="label whitespace-nowrap opacity-60">
                  {isLast ? "that's the lot" : "keep scrolling"}
                </span>
                {!isLast && (
                  <>
                    <span className="h-4 w-px bg-paper/25" />
                    <span className="label whitespace-nowrap">
                      next: {nextTab.label}{" "}
                      <span className="inline-block animate-bounce" aria-hidden="true">
                        ↓
                      </span>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* which tab you are on */}
          <div className="flex justify-center gap-2 bg-paper pb-5" aria-hidden="true">
            {tabs.map((t, i) => (
              <span
                key={t.key}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === activeIndex ? "w-10 bg-accent" : "w-5 bg-ink/15"
                }`}
              />
            ))}
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

/** Hand-drawn curved arrow used to point the handwriting at something. */
function Squiggle({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 80 40"
      className={`text-accent ${className}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6 C 26 2, 54 10, 66 30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
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

function Panel({ tab }: { tab: TabKey }) {
  if (tab === "about") {
    return (
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="label text-muted">About me</div>
          <h3 className="mt-3 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
            hello, I&rsquo;m{" "}
            <span className="font-serif italic text-accent">{profile.name}</span>
          </h3>
          <p className="mt-6 text-base leading-relaxed text-ink/75 sm:text-lg">
            {profile.summary}
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {profile.summary2}
          </p>
        </div>

        <div className="relative lg:col-span-5 lg:pt-10">
          <div className="space-y-3">
            {[
              "currently building at Oneture",
              `based in ${profile.location}`,
              "banks, payments & settlement",
              "open to full stack roles",
            ].map((line) => (
              <div
                key={line}
                className="flex items-center gap-3 rounded-xl border border-ink/10 bg-paper-2/50 px-4 py-3 text-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {line}
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-2">
            <Squiggle className="mt-1 h-8 w-14 shrink-0" flip />
            <p className="hand text-xl leading-snug text-ink/55">
              the short version — the tabs have the rest
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (tab === "work-log") {
    return (
      <div>
        <div className="label text-muted">Work log</div>
        <h3 className="mt-3 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
          where I&rsquo;ve
          <br />
          <span className="font-serif italic text-accent">been building.</span>
        </h3>

        <div className="mt-8 divide-y divide-ink/10 border-t border-ink/10">
          {experience.map((job, i) => (
            <div
              key={job.company}
              className="flex items-center gap-4 py-5 sm:gap-6"
            >
              <span className="label w-6 shrink-0 text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-semibold text-paper"
                style={{ backgroundColor: ghostTabs[i % ghostTabs.length] }}
                aria-hidden="true"
              >
                {job.company.slice(0, 1)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-xl font-medium tracking-tight">
                  {job.company}
                </div>
              </div>
              <div className="hidden text-sm text-muted sm:block">{job.role}</div>
              <span
                className={`label shrink-0 rounded-full px-3 py-1.5 ${
                  job.current
                    ? "bg-accent text-paper"
                    : "border border-ink/15 text-muted"
                }`}
              >
                {job.current ? "now" : "before"}
              </span>
            </div>
          ))}
        </div>

        {/* resume nudge */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <p className="hand text-xl text-ink/55">
              the serious bit, in one PDF
            </p>
            <Squiggle className="h-8 w-14 shrink-0" />
          </div>
          <a
            href="/Abhijit_Panchal_Resume.pdf"
            download
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            open resume
            <span
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        </div>
      </div>
    );
  }

  if (tab === "stack") {
    return (
      <div>
        <div className="label text-muted">Stack</div>
        <h3 className="mt-3 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
          what I build
          <br />
          <span className="font-serif italic text-accent">things with.</span>
        </h3>

        <div className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s) => (
            <div key={s.group}>
              <div className="label mb-3 text-accent">{s.group}</div>
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

        <div className="mt-8 flex items-center gap-2">
          <Squiggle className="h-8 w-14 shrink-0" flip />
          <p className="hand text-xl text-ink/55">
            most days: Python on one screen, React on the other
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <div className="label text-muted">Schooling</div>
        <h3 className="mt-3 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
          where it
          <br />
          <span className="font-serif italic text-accent">started.</span>
        </h3>
        <div className="mt-8 rounded-xl border border-ink/10 bg-paper-2/50 p-6">
          <div className="text-xl font-medium tracking-tight">
            {education.school}
          </div>
          <div className="mt-1 text-sm text-ink/70">{education.degree}</div>
          <div className="label mt-3 text-muted">
            {education.period} · {education.location}
          </div>
        </div>
      </div>

      <div className="lg:col-span-6 lg:pt-16">
        <div className="label text-muted">Key achievements</div>
        <ul className="mt-4 space-y-4">
          {achievements.map((a, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink/75">
              <span className="mt-2 h-px w-4 shrink-0 bg-accent" />
              <span>{a}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center gap-2">
          <Squiggle className="h-8 w-14 shrink-0" flip />
          <p className="hand text-xl text-ink/55">that&rsquo;s the whole tour</p>
        </div>
      </div>
    </div>
  );
}
