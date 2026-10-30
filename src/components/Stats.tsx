"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion, revealUp } from "@/lib/anim";
import { stats } from "@/lib/resume";

/** Four counters that run up when the band scrolls into view. */
export default function Stats() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".stat-item");
      revealUp(items, { trigger: root.current!, stagger: 0.1 });

      if (prefersReducedMotion()) {
        items.forEach((item, i) => {
          const n = item.querySelector<HTMLElement>(".stat-num")!;
          n.textContent = format(stats[i].value, stats[i].decimals);
        });
        return;
      }

      items.forEach((item, i) => {
        const { value, decimals } = stats[i];
        const numEl = item.querySelector<HTMLElement>(".stat-num")!;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: value,
          duration: 1.9,
          ease: "power2.out",
          onUpdate: () => {
            numEl.textContent = format(obj.v, decimals);
          },
          scrollTrigger: { trigger: item, start: "top 88%", once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-6 gap-y-12 px-5 py-20 sm:px-8 lg:grid-cols-4 lg:py-28"
    >
      {stats.map((s) => (
        <div key={s.label} className="stat-item reveal-ready">
          <div className="flex items-baseline tracking-tight">
            <span className="stat-num text-5xl font-medium tabular-nums sm:text-6xl lg:text-7xl">
              0
            </span>
            <span className="text-3xl font-medium text-accent sm:text-4xl">
              {s.suffix}
            </span>
          </div>
          <div className="mt-3 h-px w-10 bg-ink/25" />
          <p className="label mt-3 max-w-[16ch] leading-relaxed text-muted">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function format(v: number, decimals: number) {
  if (decimals > 0) return v.toFixed(decimals);
  return Math.round(v).toLocaleString("en-US");
}
