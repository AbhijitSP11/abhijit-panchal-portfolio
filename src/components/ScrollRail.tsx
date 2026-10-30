"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, registerGsap, onPreloaderDone } from "@/lib/anim";

/** Thin progress rail pinned to the right edge, with a live percentage. */
export default function ScrollRail() {
  const bar = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    registerGsap();
    const offReady = onPreloaderDone(() => setVisible(true));

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const p = self.progress;
        setPct(Math.round(p * 100));
        gsap.set(bar.current, { scaleY: p });
      },
    });

    return () => {
      offReady();
      st.kill();
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 transition-opacity duration-700 lg:flex ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <div className="relative h-40 w-px bg-ink/15">
        <div
          ref={bar}
          className="absolute inset-x-0 top-0 h-full origin-top bg-accent"
          style={{ transform: "scaleY(0)" }}
        />
      </div>
      <span className="label tabular-nums text-muted">{pct}%</span>
    </div>
  );
}
