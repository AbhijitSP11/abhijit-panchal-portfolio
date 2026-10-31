"use client";

import { useEffect, useRef } from "react";
import {
  gsap,
  registerGsap,
  prefersReducedMotion,
  splitWords,
  onPreloaderDone,
} from "@/lib/anim";
import { profile } from "@/lib/resume";
import HeroFrames from "./HeroFrames";
import PuzzleCube from "./PuzzleCube";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const squiggle = useRef<SVGPathElement>(null);

  useEffect(() => {
    registerGsap();

    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion();
      const nameEl = root.current!.querySelector<HTMLElement>(".hero-name-inner")!;

      const intro = () => {
        // split immediately before animating, so an interrupted run can never
        // leave the letters parked outside their masks
        const letters = reduced ? [] : splitLetters(nameEl);

        const len = squiggle.current?.getTotalLength() ?? 400;
        if (!reduced) {
          gsap.set(squiggle.current, { strokeDasharray: len, strokeDashoffset: len });
        }

        const sub = root.current?.querySelector<HTMLElement>(".hero-sub");
        const subWords = sub ? splitWords(sub) : [];
        if (sub) sub.style.opacity = "1";

        if (reduced) {
          gsap.set(
            [".hero-fade", ".hero-hey", ".hf-card", ".hero-meta", ".hero-cue"],
            { opacity: 1, y: 0 }
          );
          gsap.set(squiggle.current, { strokeDashoffset: 0 });
          return;
        }

        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(".hero-fade", { opacity: 0, y: 14, duration: 0.9, stagger: 0.07 }, 0)
          .from(".hero-hey", { opacity: 0, y: 20, duration: 1 }, 0.1)
          .to(
            squiggle.current,
            { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" },
            0.5
          )
          .from(letters, { yPercent: 118, duration: 1.1, stagger: 0.035 }, 0.3)
          .from(subWords, { yPercent: 115, duration: 0.9, stagger: 0.03 }, 0.8)
          .from(
            ".hf-card",
            { opacity: 0, y: 46, scale: 0.92, duration: 1.1, stagger: 0.12 },
            0.75
          )
          .from(".hero-meta", { opacity: 0, y: 12, duration: 0.8, stagger: 0.08 }, 1.2)
          .from(".hero-cue", { opacity: 0, duration: 0.8 }, 1.3);
      };

      const offReady = onPreloaderDone(intro);
      if (reduced) return offReady;

      gsap.to(".hf-card", {
        y: (i) => -18 - i * 14,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      return offReady;
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-paper pb-24 pt-28 sm:pt-32"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* copy — nudged in from the edge so the name sits nearer the middle */}
          <div className="lg:col-span-7">
            <p className="hero-fade label text-muted">{profile.role}</p>

            <div className="relative mt-6 inline-block">
              <span className="hero-hey block font-serif text-4xl italic leading-none sm:text-5xl lg:text-6xl">
                hey, I&rsquo;m
              </span>
              <svg
                viewBox="0 0 300 18"
                preserveAspectRatio="none"
                className="absolute -bottom-3 left-0 h-3.5 w-full text-accent"
                aria-hidden="true"
              >
                <path
                  ref={squiggle}
                  d="M4 12 C 58 3, 104 16, 158 8 S 250 3, 296 11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h1 className="hero-name-inner mt-5 text-[15vw] font-medium leading-[0.86] tracking-[-0.04em] sm:mt-6 sm:text-[10vw] lg:text-[7.4vw]">
              Abhijit<span className="text-accent">.</span>
            </h1>

            <p className="hero-sub reveal-ready mt-8 max-w-xl text-balance text-lg leading-relaxed text-muted sm:text-xl">
              I build reconciliation, billing and settlement platforms for banks
              and capital-markets firms — end to end.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="/Abhijit_Panchal_Resume.pdf"
                download
                className="hero-fade btn-fill group text-sm font-medium text-ink"
              >
                <span className="btn-sep-left" aria-hidden="true">
                  <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v12" />
                  <path d="m7 10 5 5 5-5" />
                  <path d="M5 21h14" />
                </svg>
                </span>
                Download resume
              </a>
              <a
                href="#work"
                className="hero-fade btn-fill text-sm font-medium text-ink"
              >
                See the work
                <span className="btn-sep" aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          {/* the cube sorts itself out, then the frames below it */}
          <div className="lg:col-span-5">
            <PuzzleCube
              className="hero-cube mx-auto [--pc-size:170px] sm:[--pc-size:200px]"
            />
            <div className="mt-6">
              <HeroFrames />
            </div>
          </div>
        </div>
      </div>

      {/* corner meta */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-6 sm:px-8">
        <div className="hero-meta label space-y-1 text-muted">
          <div>{profile.location}</div>
          <div>Available for work</div>
        </div>
        <div className="hero-cue label flex items-center gap-2 text-muted">
          <span>Scroll</span>
          <span className="inline-block h-8 w-px bg-ink/25" />
        </div>
      </div>
    </section>
  );
}

/**
 * Masks each letter of the name so they can rise individually. Kept local to
 * the hero because it preserves the accent-coloured stop as its own letter.
 */
function splitLetters(el: HTMLElement): HTMLElement[] {
  const nodes = Array.from(el.childNodes);
  const inners: HTMLElement[] = [];
  el.innerHTML = "";

  for (const node of nodes) {
    const text = node.textContent ?? "";
    const color =
      node.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement).className : "";

    for (const ch of text) {
      const outer = document.createElement("span");
      outer.style.display = "inline-block";
      outer.style.overflow = "hidden";
      outer.style.verticalAlign = "top";
      outer.style.paddingBottom = "0.1em";
      outer.style.marginBottom = "-0.1em";

      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.style.willChange = "transform";
      if (color) inner.className = color;
      inner.textContent = ch;

      outer.appendChild(inner);
      el.appendChild(outer);
      inners.push(inner);
    }
  }
  return inners;
}
