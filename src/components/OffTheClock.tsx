"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap, revealUp, revealWords } from "@/lib/anim";
import {
  offTheClockIntro,
  interests,
  travel,
  markets,
  type Interest,
} from "@/lib/personal";
import Movies from "./Movies";
import ArtGallery from "./ArtGallery";

export default function OffTheClock() {
  const root = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState<string | null>(interests[0].id);

  useEffect(() => {
    registerGsap();

    const ctx = gsap.context(() => {
      const head = root.current!.querySelector<HTMLElement>(".ot-head");
      if (head) revealWords(head, { stagger: 0.04 });

      revealUp(root.current!.querySelectorAll(".ot-fade"), {
        trigger: root.current!,
        stagger: 0.06,
      });

      revealUp(root.current!.querySelectorAll(".ot-tile"), {
        trigger: root.current!.querySelector(".ot-grid")!,
        stagger: 0.06,
        y: 26,
      });

      revealUp(root.current!.querySelectorAll(".ot-place"), {
        trigger: root.current!.querySelector(".ot-travel")!,
        stagger: 0.05,
        y: 18,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="life"
      className="border-t border-ink/10 bg-paper px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* intro */}
        <div className="ot-fade reveal-ready label text-muted">
          {offTheClockIntro.kicker}
        </div>

        <h2 className="ot-head reveal-ready mt-8 text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          {offTheClockIntro.heading}
        </h2>
        <p className="ot-fade reveal-ready font-serif text-5xl italic leading-[1.05] tracking-tight text-accent sm:text-6xl lg:text-7xl">
          {offTheClockIntro.headingAccent}
        </p>

        <p className="ot-fade reveal-ready mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          {offTheClockIntro.body}
        </p>

        {/* interests */}
        <div className="ot-grid mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {interests.map((it) => (
            <InterestTile
              key={it.id}
              interest={it}
              open={openId === it.id}
              onOpen={() => setOpenId(it.id)}
            />
          ))}
        </div>

        {/* films */}
        <div className="ot-fade reveal-ready mt-24 lg:mt-32">
          <Movies />
        </div>

        {/* art + photos */}
        <div className="mt-24 lg:mt-32">
          <ArtGallery />
        </div>

        {/* travel */}
        <div className="ot-travel mt-24 lg:mt-32">
          <div className="ot-fade reveal-ready mb-6 flex flex-wrap items-end justify-between gap-3">
            <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">
              where I go when
              <span className="font-serif italic text-accent"> the week ends.</span>
            </h3>
            <p className="hand text-lg text-ink/50">{travel.line}</p>
          </div>

          <p className="ot-fade reveal-ready mb-8 max-w-2xl text-base leading-relaxed text-muted">
            {travel.note}
          </p>

          <div className="flex flex-wrap gap-3">
            {travel.places.map((p) => (
              <div
                key={p.name}
                className="ot-place reveal-ready group flex items-center gap-3 rounded-full border border-ink/15 py-2 pl-2 pr-5 transition-colors hover:border-accent"
              >
                <span
                  className={`label grid h-8 place-items-center rounded-full px-3 text-paper ${
                    p.kind === "Beach" ? "bg-accent" : "bg-ink"
                  }`}
                >
                  {p.kind}
                </span>
                <span className="text-sm font-medium">{p.name}</span>
                <span className="label text-muted">{p.near}</span>
              </div>
            ))}
          </div>
        </div>

        {/* markets */}
        <div className="ot-fade reveal-ready mt-24 grid gap-8 rounded-2xl border border-ink/10 bg-paper-2/50 p-7 sm:p-10 lg:mt-32 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">
              and the other screen is
              <span className="font-serif italic text-accent"> usually a chart.</span>
            </h3>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              {markets.body}
            </p>
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
          </div>

          <div className="lg:col-span-5">
            <Sparkline />
          </div>
        </div>
      </div>
    </section>
  );
}

function InterestTile({
  interest,
  open,
  onOpen,
}: {
  interest: Interest;
  open: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onOpen}
      onFocus={onOpen}
      onClick={onOpen}
      aria-expanded={open}
      className={`ot-tile reveal-ready group relative overflow-hidden rounded-2xl border p-6 text-left outline-none transition-all duration-500 focus-visible:ring-2 focus-visible:ring-accent ${
        open
          ? "border-accent/40 bg-accent/[0.06]"
          : "border-ink/10 bg-paper hover:border-ink/25"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors ${
            open ? "bg-accent text-paper" : "bg-ink/[0.06] text-ink/70"
          }`}
        >
          <Icon kind={interest.icon} />
        </span>
        <div>
          <div className="text-lg font-medium tracking-tight">
            {interest.title}
          </div>
          <div className="hand text-lg leading-none text-ink/50">
            {interest.line}
          </div>
        </div>
      </div>

      <div
        className={`grid transition-all duration-500 ease-out ${
          open ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <p className="overflow-hidden text-sm leading-relaxed text-ink/70">
          {interest.detail}
        </p>
      </div>
    </button>
  );
}

function Icon({ kind }: { kind: Interest["icon"] }) {
  const paths: Record<Interest["icon"], React.ReactNode> = {
    pan: (
      <>
        <path d="M3 12h12a0 0 0 0 1 0 0v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-2Z" />
        <path d="M15 13h6" />
      </>
    ),
    camera: (
      <>
        <path d="M3 8h3l2-2h8l2 2h3v11H3z" />
        <circle cx="12" cy="13" r="3.5" />
      </>
    ),
    film: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 4v16M17 4v16M3 12h18" />
      </>
    ),
    brush: (
      <>
        <path d="M15 4l5 5-8 8H7v-5z" />
        <path d="M5 21c0-2 1-3 3-3" />
      </>
    ),
    trail: (
      <>
        <path d="M3 19l6-10 4 6 2-3 6 7z" />
        <circle cx="17" cy="5" r="2" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19V5" />
        <path d="M4 15l5-5 4 4 7-8" />
        <path d="M20 6v5h-5" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[kind]}
    </svg>
  );
}

/** Decorative equity curve for the markets card. */
function Sparkline() {
  return (
    <svg
      viewBox="0 0 320 160"
      className="h-full w-full"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[32, 64, 96, 128].map((y) => (
        <line
          key={y}
          x1="0"
          x2="320"
          y1={y}
          y2={y}
          stroke="currentColor"
          strokeOpacity="0.08"
        />
      ))}

      <path
        d="M0 132 L40 118 L80 126 L120 92 L160 104 L200 62 L240 74 L280 38 L320 48 L320 160 L0 160 Z"
        fill="url(#spark)"
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
