"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/anim";

/**
 * One thread. It draws itself as a knot, works loose into a climbing graph,
 * and three handwritten notes arrive along it — each one a finance problem
 * from the work, with an arrow to the point on the line it belongs to.
 *
 * The knot and the graph are the same path — the same count of cubic segments
 * through a moved set of points — so GSAP tweens the `d` attribute straight
 * from one to the other. The thread you watch tangle is the thread that ends
 * up climbing.
 */

const W = 640;
const H = 300;
const SEGMENTS = 40;

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Pt = [number, number];

/** Catmull-Rom through the points, written out as cubic beziers. */
function toPath(pts: Pt[]): string {
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? pts[i + 1];
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(
      1
    )} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

/** The knot: a Lissajous wander at incommensurate rates, so it crosses itself. */
function knotPoints(): Pt[] {
  const r = rng(29);
  const pts: Pt[] = [];
  for (let i = 0; i <= SEGMENTS; i++) {
    const t = i / SEGMENTS;
    const x =
      W / 2 + Math.sin(t * Math.PI * 2 * 3.1 + 0.4) * (W * 0.3) + (r() - 0.5) * 12;
    const y =
      H / 2 + Math.sin(t * Math.PI * 2 * 4.7 + 1.1) * (H * 0.36) + (r() - 0.5) * 12;
    pts.push([
      Math.max(10, Math.min(W - 10, x)),
      Math.max(12, Math.min(H - 12, y)),
    ]);
  }
  return pts;
}

/** The graph: a steady climb with the small pullbacks a real series has. */
function graphPoints(): Pt[] {
  const pts: Pt[] = [];
  for (let i = 0; i <= SEGMENTS; i++) {
    const t = i / SEGMENTS;
    const rise = Math.pow(t, 1.12) * (H - 70);
    const wobble = Math.sin(t * Math.PI * 9) * 7 * (1 - t * 0.35);
    pts.push([24 + t * (W - 64), H - 26 - rise + wobble]);
  }
  return pts;
}

const GRAPH_PTS = graphPoints();
const KNOT = toPath(knotPoints());
const GRAPH = toPath(GRAPH_PTS);
/** The graph closed down to the baseline, for the soft fill beneath it. */
const AREA = `${GRAPH} L ${GRAPH_PTS[GRAPH_PTS.length - 1][0]} ${H - 14} L ${GRAPH_PTS[0][0]} ${H - 14} Z`;

/**
 * The problems the line stands for, in the words of the work itself.
 * `side` is where the note sits relative to its point: "below" puts it under
 * the curve with the arrow pointing back up at the dot, "above" puts it over
 * the curve with the arrow pointing down.
 */
const MARKS = [
  {
    at: 0.34,
    side: "below" as const,
    text: "3 bank systems reconciled, 100K+ rows a run",
  },
  {
    at: 0.66,
    side: "below" as const,
    text: "bank bills generated on a schedule, not by hand",
  },
  {
    at: 0.97,
    side: "above" as const,
    text: "bond settlements across 2 regulators",
  },
];

const markPos = MARKS.map((m) => {
  const p = GRAPH_PTS[Math.round(m.at * SEGMENTS)];
  return { x: p[0], y: p[1] };
});

/** A hand-drawn curved arrow, tail top-left and head bottom-right. */
function HandArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 34" className={className} fill="none" aria-hidden="true">
      <path
        d="M4 4 C 18 2, 36 9, 44 26"
        stroke="var(--color-chart)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M35 24 L 45 29 L 42 18"
        stroke="var(--color-chart)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function UntangleGraph({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    registerGsap();
    const el = path.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.setAttribute("d", GRAPH);
      el.style.strokeDashoffset = "0";
      gsap.set(".ug-mark, .ug-area, .ug-dot", { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const len = el.getTotalLength();
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.4,
        scrollTrigger: { trigger: root.current, start: "top 95%", once: true },
      });

      tl
        // reset to the knot
        .set(el, { attr: { d: KNOT }, strokeDashoffset: len })
        .set(".ug-area", { opacity: 0 })
        .set(".ug-mark", { opacity: 0, y: 8 })
        .set(".ug-dot", { opacity: 0, scale: 0 })
        // 1.5s: the knot draws itself
        .to(el, { strokeDashoffset: 0, duration: 1.5, ease: "power1.inOut" })
        // 1.5s: it works loose into the climb
        .to(el, { attr: { d: GRAPH }, duration: 1.5, ease: "power3.inOut" })
        .to(".ug-area", { opacity: 1, duration: 0.9, ease: "power2.out" }, "<0.6")
        // the notes arrive along the line, one at a time
        .to(
          ".ug-dot",
          { opacity: 1, scale: 1, duration: 0.35, stagger: 0.45, ease: "back.out(3)" },
          "-=0.5"
        )
        .to(
          ".ug-mark",
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.45, ease: "power3.out" },
          "<0.1"
        )
        // hold so it can be read, then round again
        .to({}, { duration: 2.2 })
        .to(".ug-mark", { opacity: 0, duration: 0.4 });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className={`relative ${className}`}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full overflow-visible"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ug-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
            <stop offset="55%" stopColor="var(--color-chart)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--color-chart)" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="ug-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-chart)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--color-chart)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* baseline and gridlines, so the end state reads as a chart */}
        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1="16"
            x2={W - 16}
            y1={H - 14 - g * (H - 40)}
            y2={H - 14 - g * (H - 40)}
            stroke="currentColor"
            strokeOpacity="0.07"
          />
        ))}
        <line x1="16" x2={W - 16} y1={H - 14} y2={H - 14} stroke="currentColor" strokeOpacity="0.2" />

        <path className="ug-area" d={AREA} fill="url(#ug-fill)" style={{ opacity: 0 }} />

        <path
          ref={path}
          d={KNOT}
          stroke="url(#ug-line)"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {markPos.map((p, i) => (
          <circle
            key={i}
            className="ug-dot"
            cx={p.x}
            cy={p.y}
            r="8"
            fill="var(--color-paper)"
            stroke="var(--color-chart)"
            strokeWidth="3"
            style={{ opacity: 0, transformOrigin: `${p.x}px ${p.y}px` }}
          />
        ))}
      </svg>

      {/* the handwritten notes, each with an arrow to its point on the line */}
      {MARKS.map((m, i) => {
        const above = m.side === "above";
        const left = `${((markPos[i].x + (above ? -10 : 10)) / W) * 100}%`;
        // on a phone the notes are kept inside the graph; the clamp only applies there
        const top = `${((markPos[i].y + (above ? -12 : 12)) / H) * 100}%`;

        return (
          <div
            key={m.text}
            className={`ug-mark pointer-events-none absolute z-10 w-max left-[var(--l)] ${
              above ? "" : "max-sm:left-[min(var(--l),calc(100%_-_172px))]"
            }`}
            style={{
              "--l": left,
              top,
              opacity: 0,
              transform: above ? "translate(-100%, -100%)" : undefined,
            } as React.CSSProperties}
          >
            {above ? (
              <div className="flex items-start gap-1">
                <p className="hand max-w-[190px] text-right text-[1.2rem] leading-[1.05] text-chart-deep max-sm:max-w-[135px] max-sm:text-[1.02rem]">
                  {m.text}
                </p>
                <HandArrow className="mt-1 h-7 w-10 shrink-0" />
              </div>
            ) : (
              <div className="flex items-end gap-1">
                <HandArrow className="h-7 w-10 shrink-0 rotate-180" />
                <p className="hand max-w-[190px] text-[1.2rem] leading-[1.05] text-chart-deep max-sm:max-w-[135px] max-sm:text-[1.02rem]">
                  {m.text}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
