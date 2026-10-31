"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/anim";
import { heroCards } from "@/lib/resume";
import HeroScene from "./HeroScene";

/**
 * Three frames fanned beside the name. They drift with the cursor, lift and
 * straighten on hover, and clicking one brings it to the front of the stack.
 */
export default function HeroFrames({ only }: { only?: number } = {}) {
  const root = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState([0, 1, 2]);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".hf-card");
      const setters = cards.map((el) => ({
        x: gsap.quickTo(el, "x", { duration: 1, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 1, ease: "power3.out" }),
      }));

      const onMove = (e: MouseEvent) => {
        const cx = e.clientX / window.innerWidth - 0.5;
        const cy = e.clientY / window.innerHeight - 0.5;
        setters.forEach((s, i) => {
          const depth = 0.6 + i * 0.35;
          s.x(cx * 36 * depth);
          s.y(cy * 26 * depth);
        });
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }, root);

    return () => ctx.revert();
  }, []);

  const bringToFront = (i: number) =>
    setOrder((prev) => [...prev.filter((n) => n !== i), i]);

  return (
    <div
      ref={root}
      className={only !== undefined ? "relative mx-auto h-[230px] w-full max-w-[380px] sm:h-[250px] lg:max-w-none" : "relative mx-auto h-[330px] w-full max-w-[380px] sm:h-[380px] lg:h-[460px] lg:max-w-none"}
    >
      {heroCards.map((c, i) => {
        if (only !== undefined && i !== only) return null;
        const z = order.indexOf(i);
        // staggered so no card lands on the caption of the one behind it
        const layout = only !== undefined ? { left: "4%", top: "0%", rotate: -3 } : [
          { left: "0%", top: "0%", rotate: -7 },
          { left: "26%", top: "50%", rotate: 4 },
          { left: "50%", top: "11%", rotate: 9 },
        ][i];

        return (
          <figure
            key={c.caption}
            onClick={() => bringToFront(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                bringToFront(i);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={c.caption}
            className="hf-card group absolute w-[50%] cursor-pointer rounded-[4px] bg-white p-2.5 pb-3 shadow-[0_18px_40px_-22px_rgba(36,38,32,0.6)] outline-none transition-[transform,box-shadow] duration-500 ease-out hover:z-50 hover:!rotate-0 hover:scale-[1.09] hover:shadow-[0_34px_70px_-28px_rgba(36,38,32,0.65)] focus-visible:ring-2 focus-visible:ring-accent"
            style={{
              left: layout.left,
              top: layout.top,
              rotate: `${layout.rotate}deg`,
              zIndex: 10 + z,
            }}
          >
            <div className="aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-paper-2">
              <HeroScene kind={c.scene} />
            </div>
            <figcaption className="hand mt-2 px-1 text-lg leading-tight text-ink/70">
              {c.caption}
            </figcaption>
          </figure>
        );
      })}

      {only === undefined && (
        <span className="hand pointer-events-none absolute bottom-1 left-0 z-[60] text-lg text-ink/45">
          ← click one
        </span>
      )}
    </div>
  );
}
