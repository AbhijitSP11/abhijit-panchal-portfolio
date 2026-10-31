"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/anim";

/**
 * One thread. It draws itself as a knot, then works loose into a single
 * clean line and keeps breathing.
 *
 * Every state is the same path — the same count of cubic segments through a
 * moved set of points — so GSAP tweens the `d` attribute straight from the
 * knot to the resolved curve. Nothing is cross-faded; the thread you see
 * tangled is the thread that ends up straight.
 */

const W = 640;
const H = 170;
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

/**
 * The knot. A Lissajous wander — horizontal and vertical cycles at
 * incommensurate rates — so the thread genuinely passes over itself instead
 * of merely switching back. A slow drift keeps it reading left to right.
 */
function knotPoints(): Pt[] {
  const r = rng(29);
  const pts: Pt[] = [];
  for (let i = 0; i <= SEGMENTS; i++) {
    const t = i / SEGMENTS;
    // 3.1 against 4.7 cycles: the two never line up, so the thread keeps
    // returning over ground it has already covered
    const x =
      W / 2 + Math.sin(t * Math.PI * 2 * 3.1 + 0.4) * (W * 0.3) + (r() - 0.5) * 12;
    const y =
      H / 2 + Math.sin(t * Math.PI * 2 * 4.7 + 1.1) * (H * 0.38) + (r() - 0.5) * 12;
    pts.push([
      Math.max(10, Math.min(W - 10, x)),
      Math.max(12, Math.min(H - 12, y)),
    ]);
  }
  return pts;
}

/** Resolved: one long, even wave. */
function wavePoints(phase: number, amp: number): Pt[] {
  const pts: Pt[] = [];
  for (let i = 0; i <= SEGMENTS; i++) {
    const t = i / SEGMENTS;
    pts.push([
      24 + t * (W - 48),
      H / 2 + Math.sin(t * Math.PI * 2 + phase) * amp,
    ]);
  }
  return pts;
}

const KNOT = toPath(knotPoints());
const RESOLVED = toPath(wavePoints(0, 34));

export default function UntangleThread({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    registerGsap();
    const el = path.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.setAttribute("d", RESOLVED);
      el.style.strokeDashoffset = "0";
      return;
    }

    const ctx = gsap.context(() => {
      const len = el.getTotalLength();
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });

      const dim = { opacity: 0.3, duration: 0.4, ease: "power2.out" };
      const lit = { opacity: 1, duration: 0.4, ease: "power2.out" };

      /**
       * Three seconds end to end — 1.5s tangling, 1.5s arranging — then a
       * short hold so the resolved line can be read before it runs again.
       */
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.1,
        scrollTrigger: { trigger: root.current, start: "top 92%", once: true },
      });

      tl
        // back to the knot, hidden, ready to draw
        .set(el, { attr: { d: KNOT }, strokeDashoffset: len })
        .set(".ut-in", { opacity: 0.3 })
        .set(".ut-out", { opacity: 0.3 })
        // 1.5s: the knot draws itself
        .to(el, { strokeDashoffset: 0, duration: 1.5, ease: "power1.inOut" })
        .to(".ut-in", lit, "<0.35")
        // 1.5s: it works loose
        .to(el, { attr: { d: RESOLVED }, duration: 1.5, ease: "power3.inOut" })
        .to(".ut-in", dim, "<")
        .to(".ut-out", lit, "<0.8")
        // hold, then round again
        .to(".ut-out", dim, "+=0.7");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className={className}>
      {/* what the thread is saying, in case it is not obvious */}
      <div className="mb-1 flex items-center justify-between gap-4">
        <span className="ut-in label flex items-center gap-2 text-ink/70" style={{ opacity: 0.3 }}>
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          complex problem
        </span>
        <span className="hidden h-px flex-1 bg-ink/12 sm:block" aria-hidden="true" />
        <span className="ut-out label flex items-center gap-2 text-ink/70" style={{ opacity: 0.3 }}>
          working system
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-full w-full overflow-visible"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="thread" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
            <stop offset="45%" stopColor="var(--color-accent)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.22" />
          </linearGradient>
        </defs>

        <path
          ref={path}
          d={KNOT}
          stroke="url(#thread)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
