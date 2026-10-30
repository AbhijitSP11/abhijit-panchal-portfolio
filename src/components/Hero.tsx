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
import Character from "./Character";
import HeroCards from "./HeroCards";

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
            [".hero-fade", ".hero-hey", ".hero-card", ".hero-meta", ".hero-cue"],
            { opacity: 1, y: 0 }
          );
          gsap.set(squiggle.current, { strokeDashoffset: 0 });
          return;
        }

        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(".hero-fade", { opacity: 0, y: 14, duration: 0.9 }, 0)
          .from(".hero-hey", { opacity: 0, y: 20, duration: 1 }, 0.1)
          .to(
            squiggle.current,
            { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" },
            0.5
          )
          .from(
            letters,
            { yPercent: 118, duration: 1.1, stagger: 0.035 },
            0.3
          )
          .from(subWords, { yPercent: 115, duration: 0.9, stagger: 0.03 }, 0.8)
          .from(
            ".hero-card",
            {
              opacity: 0,
              y: 44,
              rotate: 0,
              duration: 1.1,
              stagger: 0.11,
            },
            0.95
          )
          .from(".hero-meta", { opacity: 0, y: 12, duration: 0.8, stagger: 0.08 }, 1.2)
          .from(".hero-cue", { opacity: 0, duration: 0.8 }, 1.3);
      };

      const offReady = onPreloaderDone(intro);
      if (reduced) return offReady;

      // cards drift at their own pace as the hero leaves
      gsap.to(".hero-card", {
        y: (i) => -20 - i * 16,
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
        <p className="hero-fade label text-muted">{profile.role}</p>

        {/* hey, I'm — with the drawn underline */}
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

        {/* the name, with the character perched on it.
            inline-block so the box hugs the text and the character's
            percentage offsets land on the letters, not past them. */}
        <div className="relative mt-5 block w-fit sm:mt-7">
          <h1 className="hero-name-inner text-[20vw] font-medium leading-[0.84] tracking-[-0.045em] sm:text-[17vw] lg:text-[15.5vw]">
            Abhijit<span className="text-accent">.</span>
          </h1>
          <Character className="pointer-events-auto absolute left-[54%] top-[-14%] h-[40%] w-[15%] min-w-[58px] cursor-pointer" />
        </div>

        <p className="hero-sub reveal-ready mt-9 max-w-2xl text-balance text-lg leading-relaxed text-muted sm:text-xl">
          I build reconciliation, billing and settlement platforms for banks and
          capital-markets firms — end to end.
        </p>

        <div className="mt-12 sm:mt-14">
          <HeroCards />
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
      node.nodeType === Node.ELEMENT_NODE
        ? (node as HTMLElement).className
        : "";

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
