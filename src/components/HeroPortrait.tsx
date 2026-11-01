"use client";

import { useEffect, useRef } from "react";
import { portrait } from "@/lib/personal";
import { profile } from "@/lib/resume";
import Placeholder from "./Placeholder";

/**
 * The hero portrait, as a print you can pick up.
 *
 * Hover it and it straightens, lifts and tilts toward the cursor; the shadow
 * slides the opposite way as if the light stayed where it was, and a soft
 * sheen follows the pointer across the surface. All of it runs through CSS
 * custom properties written in a single animation frame, so there is no React
 * state and no re-render while the pointer moves.
 *
 * Two elements on purpose: the outer one carries the GSAP intro and the
 * scroll drift (it owns `transform`), the inner one carries the tilt, so the
 * two never fight over the same property.
 */
export default function HeroPortrait({ className = "" }: { className?: string }) {
  const card = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = card.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let px = 0;
    let py = 0;
    let gx = 50;
    let gy = 50;

    const write = () => {
      raf = 0;
      el.style.setProperty("--rx", `${(-py * 11).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(px * 13).toFixed(2)}deg`);
      // the light stays put, so the shadow moves against the tilt
      el.style.setProperty("--sx", `${(-px * 26).toFixed(1)}px`);
      el.style.setProperty("--sy", `${(30 - py * 14).toFixed(1)}px`);
      el.style.setProperty("--gx", `${gx.toFixed(1)}%`);
      el.style.setProperty("--gy", `${gy.toFixed(1)}%`);
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(write);
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      px = x * 2 - 1;
      py = y * 2 - 1;
      gx = x * 100;
      gy = y * 100;
      queue();
    };
    const leave = () => {
      px = 0;
      py = 0;
      gx = 50;
      gy = 50;
      queue();
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`hp-card ${className}`}>
      <figure
        ref={card}
        className="hp-print group relative w-full cursor-pointer bg-white p-3 pb-4"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-2">
          {portrait.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={portrait.src}
              alt={profile.name}
              draggable={false}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              style={{ objectPosition: portrait.position }}
            />
          ) : (
            <Placeholder label="portrait" tint={portrait.tint} />
          )}

          {/* light catching the surface, following the pointer */}
          <span
            className="hp-sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />
        </div>

        <figcaption className="hand mt-2 px-1 text-xl leading-tight text-ink/65 transition-colors group-hover:text-ink/85">
          {portrait.caption}
        </figcaption>
      </figure>
    </div>
  );
}
