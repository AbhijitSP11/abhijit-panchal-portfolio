"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/anim";

/**
 * An original chibi ninja who perches on the name in the hero — idle bob,
 * fluttering headband ties, dangling legs, the occasional blink, and a wave
 * when you hover. Drawn from scratch rather than copying any existing
 * character design.
 */
export default function Character({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // settle in
      gsap.from(root.current, {
        y: -26,
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 0.5,
      });

      // idle bob
      gsap.to(".ch-all", {
        y: -4,
        duration: 1.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // head tilt, slightly out of sync with the bob
      gsap.to(".ch-head", {
        rotation: 3,
        transformOrigin: "50% 90%",
        duration: 2.3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // headband ties catching the air
      gsap.to(".ch-tie-1", {
        rotation: 11,
        transformOrigin: "0% 50%",
        duration: 0.9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".ch-tie-2", {
        rotation: -9,
        transformOrigin: "0% 50%",
        duration: 1.15,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // legs swinging in opposition
      gsap.to(".ch-leg-l", {
        rotation: 9,
        transformOrigin: "50% 0%",
        duration: 1.3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".ch-leg-r", {
        rotation: -9,
        transformOrigin: "50% 0%",
        duration: 1.3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.5,
      });

      // blink on an irregular beat
      gsap.to(".ch-eye", {
        scaleY: 0.08,
        transformOrigin: "50% 50%",
        duration: 0.09,
        repeat: -1,
        yoyo: true,
        repeatDelay: 2.6,
        ease: "power1.inOut",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const wave = (on: boolean) => {
    if (prefersReducedMotion()) return;
    gsap.to(".ch-arm-r", {
      rotation: on ? -48 : 0,
      transformOrigin: "20% 20%",
      duration: 0.45,
      ease: on ? "back.out(2)" : "power2.out",
    });
    gsap.to(".ch-mouth", { scaleY: on ? 1.7 : 1, transformOrigin: "50% 0%", duration: 0.3 });
  };

  return (
    <div
      ref={root}
      className={className}
      onMouseEnter={() => wave(true)}
      onMouseLeave={() => wave(false)}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 130" className="h-full w-full overflow-visible">
        <g className="ch-all">
          {/* headband ties, behind everything */}
          <path
            className="ch-tie-1"
            d="M88 44 C 102 40, 112 46, 119 41"
            stroke="var(--color-accent)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            className="ch-tie-2"
            d="M88 50 C 101 52, 109 60, 116 59"
            stroke="var(--color-accent)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* dangling legs */}
          <g className="ch-leg-l">
            <rect x="44" y="96" width="10" height="20" rx="5" fill="#2e3129" />
            <ellipse cx="49" cy="117" rx="7" ry="5" fill="#1b1d18" />
          </g>
          <g className="ch-leg-r">
            <rect x="64" y="96" width="10" height="20" rx="5" fill="#2e3129" />
            <ellipse cx="69" cy="117" rx="7" ry="5" fill="#1b1d18" />
          </g>

          {/* torso */}
          <path
            d="M38 76 Q 59 66, 81 76 L 84 99 Q 59 108, 35 99 Z"
            fill="#2e3129"
          />
          {/* wrap-over collar */}
          <path d="M50 72 L 59 86 L 69 72 Q 59 68, 50 72 Z" fill="#f1f0eb" />
          {/* sash */}
          <rect x="36" y="92" width="48" height="7" rx="3.5" fill="var(--color-accent)" />

          {/* arms */}
          <rect
            className="ch-arm-l"
            x="29"
            y="78"
            width="9"
            height="19"
            rx="4.5"
            fill="#2e3129"
          />
          <rect
            className="ch-arm-r"
            x="81"
            y="78"
            width="9"
            height="19"
            rx="4.5"
            fill="#2e3129"
          />

          {/* head */}
          <g className="ch-head">
            {/* hair behind */}
            <ellipse cx="59" cy="46" rx="30" ry="28" fill="#1f2a35" />
            {/* face */}
            <ellipse cx="59" cy="50" rx="25" ry="24" fill="#f6d9bd" />
            {/* fringe */}
            <path
              d="M34 44 Q 40 26, 59 24 Q 78 26, 84 44 Q 74 34, 63 38 Q 56 30, 48 38 Q 40 36, 34 44 Z"
              fill="#1f2a35"
            />
            {/* headband */}
            <rect x="33" y="40" width="52" height="9" rx="2" fill="#2e3129" />
            {/* plate */}
            <rect
              x="50"
              y="39.5"
              width="19"
              height="10"
              rx="2"
              fill="var(--color-accent)"
            />
            <circle cx="59.5" cy="44.5" r="2.2" fill="#f1f0eb" opacity="0.85" />

            {/* eyes */}
            <ellipse className="ch-eye" cx="49" cy="58" rx="3.6" ry="4.4" fill="#1b1d18" />
            <ellipse className="ch-eye" cx="70" cy="58" rx="3.6" ry="4.4" fill="#1b1d18" />
            {/* catchlights */}
            <circle cx="50.3" cy="56.5" r="1.2" fill="#fff" />
            <circle cx="71.3" cy="56.5" r="1.2" fill="#fff" />

            {/* blush */}
            <ellipse cx="41" cy="64" rx="4.5" ry="2.8" fill="#e8a08a" opacity="0.55" />
            <ellipse cx="78" cy="64" rx="4.5" ry="2.8" fill="#e8a08a" opacity="0.55" />

            {/* mouth */}
            <path
              className="ch-mouth"
              d="M55 66 Q 59.5 70, 64 66"
              stroke="#1b1d18"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
