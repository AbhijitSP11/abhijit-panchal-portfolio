"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/anim";
import { isPreloaderDone, lockScroll, markPreloaderDone } from "@/lib/preloader-state";
import { profile } from "@/lib/resume";

/**
 * Quiet intro on the paper background — no full-bleed colour wash. The name
 * fills in from its outline over a thin accent progress rule, then the whole
 * panel lifts away.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const outline = useRef<SVGTextElement>(null);
  const wipe = useRef<SVGRectElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);
  // if the intro already ran this session, never show it again
  const [gone, setGone] = useState(() => isPreloaderDone());

  useEffect(() => {
    registerGsap();

    const finish = () => {
      markPreloaderDone();
      setGone(true);
    };

    if (prefersReducedMotion() || isPreloaderDone()) {
      setPct(100);
      finish();
      return;
    }

    lockScroll();

    // Failsafe: if the timeline is interrupted for any reason, never leave the
    // page stranded behind a locked overlay.
    const failsafe = window.setTimeout(finish, 6000);

    const counter = { v: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Kept deliberately brief — the intro runs on top of however long
      // hydration takes, and nobody should wait on a splash screen.
      tl.from(".pre-meta", { opacity: 0, y: 8, duration: 0.4, stagger: 0.05 })
        .to(outline.current, { opacity: 0.22, duration: 0.35 }, 0.1)
        .to(
          wipe.current,
          { attr: { width: 800 }, duration: 1.05, ease: "power2.inOut" },
          0.28
        )
        .to(bar.current, { scaleX: 1, duration: 1.05, ease: "power2.inOut" }, 0.28)
        .to(
          counter,
          {
            v: 100,
            duration: 1.25,
            ease: "power1.inOut",
            onUpdate: () => setPct(Math.round(counter.v)),
          },
          0.15
        )
        .to(".pre-inner", { opacity: 0, duration: 0.35, ease: "power2.in" }, "+=0.12")
        .to(
          root.current,
          {
            yPercent: -100,
            duration: 0.8,
            ease: "expo.inOut",
            onComplete: finish,
          },
          "<0.08"
        );
    }, root);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
    };
  }, []);

  if (gone) return null;

  const nameStyle = {
    fontFamily: "var(--font-display)",
    fontSize: "132px",
    fontWeight: 500,
    letterSpacing: "-0.045em",
  } as const;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-paper px-5 py-5 text-ink sm:px-8 sm:py-7"
      aria-hidden="true"
    >
      {/* top meta */}
      <div className="pre-inner flex items-start justify-between">
        <div className="label space-y-1 leading-relaxed text-muted">
          <div className="pre-meta">{profile.name}</div>
          <div className="pre-meta">Mumbai · Full Stack Engineer</div>
        </div>
        <div className="label space-y-1 text-right leading-relaxed text-muted">
          <div className="pre-meta">Loading portfolio</div>
          <div className="pre-meta">Glad you dropped by</div>
        </div>
      </div>

      {/* centre: the name filling in over a progress rule */}
      <div className="pre-inner relative flex flex-1 flex-col items-center justify-center">
        <svg
          viewBox="0 0 800 190"
          className="relative w-[92%] max-w-4xl"
          role="presentation"
        >
          <defs>
            <clipPath id="name-wipe">
              <rect ref={wipe} x="0" y="0" width="0" height="190" />
            </clipPath>
          </defs>

          <text
            ref={outline}
            x="400"
            y="128"
            textAnchor="middle"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0"
            style={nameStyle}
          >
            Abhijit.
          </text>

          {/* one text node so the stop stays kerned against the name */}
          <g clipPath="url(#name-wipe)">
            <text x="400" y="128" textAnchor="middle" style={nameStyle}>
              <tspan fill="currentColor">Abhijit</tspan>
              <tspan fill="var(--color-accent)">.</tspan>
            </text>
          </g>
        </svg>

        {/* progress rule */}
        <div className="mt-6 h-px w-[92%] max-w-4xl bg-ink/12">
          <div
            ref={bar}
            className="h-full w-full origin-left bg-accent"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      {/* bottom meta */}
      <div className="pre-inner flex items-end justify-between">
        <div className="font-mono text-4xl font-medium tabular-nums sm:text-6xl">
          {String(pct).padStart(3, "0")}%
        </div>
        <div className="label pre-meta text-right text-muted">
          Software Development Engineer
        </div>
      </div>
    </div>
  );
}
