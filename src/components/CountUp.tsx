"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/anim";

/**
 * Counts a value up the first time it scrolls into view.
 *
 * Only values shaped like a number with an optional suffix — "25M+", "92%",
 * "33+", "3" — are animated. Anything with digits further along, such as
 * "4h → 3min" or "3d → 20m", is left exactly as written: counting one half of
 * a before-and-after pair would be nonsense.
 */
export default function CountUp({
  value,
  duration = 1.6,
}: {
  value: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState<string | null>(null);

  useEffect(() => {
    const match = /^([\d.,]+)(\D*)$/.exec(value.trim());
    if (!match || prefersReducedMotion()) return;

    const [, digits, suffix] = match;
    const target = Number(digits.replace(/,/g, ""));
    if (!Number.isFinite(target) || target === 0) return;

    const decimals = digits.includes(".") ? 1 : 0;
    const grouped = digits.includes(",");
    const format = (n: number) =>
      (grouped
        ? n.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : n.toFixed(decimals)) + suffix;

    setShown(format(0));

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / (duration * 1000));
        // ease-out so it slows into the final figure
        setShown(format(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        run();
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown ?? value}
    </span>
  );
}
