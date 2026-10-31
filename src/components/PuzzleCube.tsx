"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/anim";

/**
 * A cube that starts scrambled and works itself out.
 *
 * Six faces of nine stickers in CSS 3D. Each "move" turns the whole cube a
 * quarter rotation while a slice of stickers flips to where it belongs, so
 * the colour change lands under the motion the way it would on a real cube.
 * By the last move every face is one colour and it settles into a slow idle.
 *
 * Drawn rather than imported: a cube is six squares and a rotation, and a
 * library for it would cost more than it saves.
 */

/** On-palette rather than toy colours. */
const COLOURS = [
  "#1d4ed8", // blue
  "#4f46e5", // indigo
  "#7c3aed", // violet
  "#b05a7a", // rose
  "#242620", // ink
  "#e8e6df", // paper
];

const FACES = [
  { name: "front", transform: "translateZ(var(--half))" },
  { name: "back", transform: "rotateY(180deg) translateZ(var(--half))" },
  { name: "right", transform: "rotateY(90deg) translateZ(var(--half))" },
  { name: "left", transform: "rotateY(-90deg) translateZ(var(--half))" },
  { name: "top", transform: "rotateX(90deg) translateZ(var(--half))" },
  { name: "bottom", transform: "rotateX(-90deg) translateZ(var(--half))" },
];

/** Deterministic shuffle so the first paint matches the server's. */
function scrambled(): number[] {
  const out: number[] = [];
  let seed = 7;
  for (let i = 0; i < 54; i++) {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    out.push(seed % 6);
  }
  return out;
}

export default function PuzzleCube({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const cube = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();

    const stickers = Array.from(
      root.current?.querySelectorAll<HTMLElement>("[data-sticker]") ?? []
    );
    if (!stickers.length) return;

    const solvedOf = (i: number) => Math.floor(i / 9);
    const paint = (i: number, colour: number) => {
      stickers[i].style.backgroundColor = COLOURS[colour];
    };

    if (prefersReducedMotion()) {
      stickers.forEach((_, i) => paint(i, solvedOf(i)));
      return;
    }

    const ctx = gsap.context(() => {
      // start scrambled
      const state = scrambled();
      state.forEach((c, i) => paint(i, c));

      // the order stickers get put right — nine at a time, one slice per move
      const order = Array.from({ length: 54 }, (_, i) => i);
      for (let i = order.length - 1; i > 0; i--) {
        const j = (i * 7 + 3) % (i + 1);
        [order[i], order[j]] = [order[j], order[i]];
      }

      const MOVES = 6;
      const perMove = Math.ceil(54 / MOVES);
      const tl = gsap.timeline({ delay: 0.9 });

      for (let m = 0; m < MOVES; m++) {
        const axis = m % 2 === 0 ? "rotationY" : "rotationX";
        tl.to(cube.current, {
          [axis]: `+=${m % 3 === 1 ? -90 : 90}`,
          duration: 0.72,
          ease: "power2.inOut",
          onStart: () => {
            // the slice that belongs comes good under the turn
            for (let k = m * perMove; k < Math.min(54, (m + 1) * perMove); k++) {
              const idx = order[k];
              gsap.to(stickers[idx], {
                backgroundColor: COLOURS[solvedOf(idx)],
                duration: 0.5,
                delay: 0.1 + (k % perMove) * 0.012,
                ease: "power1.inOut",
              });
            }
          },
        });
      }

      // solved: a small settle, then an unhurried idle turn
      tl.to(cube.current, {
        scale: 1.06,
        duration: 0.22,
        ease: "power2.out",
      })
        .to(cube.current, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" })
        .to(".pc-solved", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "<")
        .to(cube.current, {
          rotationY: "+=360",
          duration: 22,
          ease: "none",
          repeat: -1,
        });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className={`relative ${className}`}>
      <div
        className="pc-scene mx-auto"
        style={{ perspective: "900px", width: "var(--pc-size)", height: "var(--pc-size)" }}
      >
        <div
          ref={cube}
          className="pc-cube relative h-full w-full"
          style={
            {
              transformStyle: "preserve-3d",
              transform: "rotateX(-24deg) rotateY(-32deg)",
              // how far each face sits from the centre
              "--half": "calc(var(--pc-size) / 2)",
            } as React.CSSProperties
          }
        >
          {FACES.map((face, f) => (
            <div
              key={face.name}
              className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-[4%] rounded-[6%] bg-ink/90 p-[4%]"
              style={{ transform: face.transform, backfaceVisibility: "hidden" }}
            >
              {Array.from({ length: 9 }).map((_, s) => (
                <span
                  key={s}
                  data-sticker={f * 9 + s}
                  className="rounded-[14%]"
                  style={{ backgroundColor: COLOURS[f] }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <p
        className="pc-solved hand mt-3 text-center text-lg text-ink/50"
        style={{ opacity: 0, transform: "translateY(6px)" }}
      >
        that&rsquo;s the job, really
      </p>
    </div>
  );
}
