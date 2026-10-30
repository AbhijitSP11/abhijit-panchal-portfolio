"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/anim";
import { profile } from "@/lib/resume";

/**
 * Full-bleed intro: a counting percentage, blueprint rules that draw across the
 * screen, and the name filling in from its outline. Lifts away as a curtain.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const outline = useRef<SVGTextElement>(null);
  const wipe = useRef<SVGRectElement>(null);
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    registerGsap();

    const finish = () => {
      document.body.dataset.loading = "false";
      window.dispatchEvent(new Event("preloader:done"));
      setGone(true);
    };

    if (prefersReducedMotion()) {
      setPct(100);
      finish();
      return;
    }

    const counter = { v: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(".pre-meta", { opacity: 0, y: 10, duration: 0.6, stagger: 0.08 })
        .from(
          ".pre-rule-h",
          { scaleX: 0, duration: 1.2, ease: "power3.inOut", stagger: 0.12 },
          0.1
        )
        .from(
          ".pre-rule-v",
          { scaleY: 0, duration: 1.2, ease: "power3.inOut", stagger: 0.12 },
          0.1
        )
        // outline appears, then the fill wipes across it
        .to(outline.current, { opacity: 0.5, duration: 0.7 }, 0.25)
        .to(
          wipe.current,
          { attr: { width: 800 }, duration: 2, ease: "power2.inOut" },
          0.6
        )
        .to(outline.current, { opacity: 0.18, duration: 0.6 }, 2.2)
        .to(
          counter,
          {
            v: 100,
            duration: 2.4,
            ease: "power1.inOut",
            onUpdate: () => setPct(Math.round(counter.v)),
          },
          0
        )
        // curtain up
        .to(".pre-inner", { opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.3")
        .to(
          root.current,
          {
            yPercent: -100,
            duration: 1.1,
            ease: "expo.inOut",
            onComplete: finish,
          },
          "<0.15"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  if (gone) return null;

  const nameStyle = {
    fontFamily: "var(--font-display)",
    fontSize: "128px",
    fontWeight: 500,
    letterSpacing: "-0.04em",
  } as const;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-accent px-5 py-5 text-paper sm:px-8 sm:py-7"
      aria-hidden="true"
    >
      {/* top meta */}
      <div className="pre-inner flex items-start justify-between">
        <div className="label space-y-1 leading-relaxed opacity-80">
          <div className="pre-meta">{profile.name}</div>
          <div className="pre-meta">Mumbai · Full Stack Engineer</div>
        </div>
        <div className="label space-y-1 text-right leading-relaxed opacity-80">
          <div className="pre-meta">Loading portfolio</div>
          <div className="pre-meta">Glad you dropped by</div>
        </div>
      </div>

      {/* centre: blueprint rules + name */}
      <div className="pre-inner relative flex flex-1 items-center justify-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="pre-rule-h absolute left-0 top-[38%] h-px w-full origin-left bg-paper/35" />
          <div className="pre-rule-h absolute left-0 top-[62%] h-px w-full origin-right bg-paper/35" />
          <div className="pre-rule-v absolute left-[22%] top-0 h-full w-px origin-top bg-paper/35" />
          <div className="pre-rule-v absolute right-[22%] top-0 h-full w-px origin-bottom bg-paper/35" />
        </div>

        <svg
          viewBox="0 0 800 200"
          className="relative w-[92%] max-w-5xl"
          role="presentation"
        >
          <defs>
            <clipPath id="name-wipe">
              <rect ref={wipe} x="0" y="0" width="0" height="200" />
            </clipPath>
          </defs>

          <text
            ref={outline}
            x="400"
            y="130"
            textAnchor="middle"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0"
            style={nameStyle}
          >
            abhijit.
          </text>

          <g clipPath="url(#name-wipe)">
            <text
              x="400"
              y="130"
              textAnchor="middle"
              fill="currentColor"
              style={nameStyle}
            >
              abhijit.
            </text>
          </g>
        </svg>
      </div>

      {/* bottom meta */}
      <div className="pre-inner flex items-end justify-between">
        <div className="font-mono text-4xl font-medium tabular-nums sm:text-6xl">
          {String(pct).padStart(3, "0")}%
        </div>
        <div className="label pre-meta text-right opacity-80">
          Software Development Engineer
        </div>
      </div>
    </div>
  );
}
