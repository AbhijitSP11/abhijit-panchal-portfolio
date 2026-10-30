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

/** depth drives both the mouse parallax and the scroll drift */
const cards = [
  { x: "6%", y: "18%", w: 150, h: 200, r: -8, depth: 0.9 },
  { x: "20%", y: "52%", w: 128, h: 172, r: 6, depth: 0.55 },
  { x: "32%", y: "12%", w: 160, h: 216, r: 4, depth: 1.25 },
  { x: "60%", y: "58%", w: 142, h: 190, r: -5, depth: 1.1 },
  { x: "73%", y: "16%", w: 134, h: 180, r: 9, depth: 0.7 },
  { x: "86%", y: "46%", w: 152, h: 204, r: -3, depth: 1.35 },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();

    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion();

      // ---- intro, once the preloader lifts ----
      const intro = () => {
        const tagline = root.current?.querySelector<HTMLElement>(".hero-tagline");
        const words = tagline ? splitWords(tagline) : [];
        if (tagline) tagline.style.opacity = "1";

        if (reduced) {
          gsap.set([".hero-card", ".hero-ghost", ".hero-meta", ".hero-cue"], {
            opacity: 1,
            y: 0,
            scale: 1,
          });
          return;
        }

        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(".hero-ghost", { opacity: 0, scale: 1.12, duration: 1.8 }, 0)
          .from(
            ".hero-card",
            {
              opacity: 0,
              yPercent: 40,
              scale: 0.9,
              rotate: 0,
              duration: 1.6,
              stagger: { each: 0.09, from: "center" },
            },
            0.1
          )
          .from(words, { yPercent: 115, duration: 1.2, stagger: 0.06 }, 0.5)
          .from(".hero-meta", { opacity: 0, y: 16, duration: 1, stagger: 0.1 }, 0.9)
          .from(".hero-cue", { opacity: 0, y: -10, duration: 0.9 }, 1.1);
      };

      const offReady = onPreloaderDone(intro);

      if (reduced) return offReady;

      // ---- scroll: cards drift apart, the whole stage recedes ----
      gsap.to(".hero-card", {
        yPercent: (i) => -30 - cards[i % cards.length].depth * 45,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      gsap.to(".hero-stage", {
        scale: 1.08,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // ---- mouse parallax ----
      const cardEls = gsap.utils.toArray<HTMLElement>(".hero-card");
      const setters = cardEls.map((el) => ({
        x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
      }));

      const onMove = (e: MouseEvent) => {
        const cx = e.clientX / window.innerWidth - 0.5;
        const cy = e.clientY / window.innerHeight - 0.5;
        setters.forEach((s, i) => {
          const d = cards[i % cards.length].depth;
          s.x(cx * 60 * d);
          s.y(cy * 40 * d);
        });
      };
      window.addEventListener("mousemove", onMove);

      return () => {
        window.removeEventListener("mousemove", onMove);
        offReady();
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      data-nav="dark"
      className="grain relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink text-paper"
    >
      <div className="hero-stage absolute inset-0">
        {/* ghosted name behind everything */}
        <div className="hero-ghost pointer-events-none absolute inset-0 flex items-center justify-center">
          <h1 className="select-none whitespace-nowrap text-center text-[18vw] font-semibold leading-[0.85] tracking-tighter text-paper/[0.055]">
            {profile.first}
            <br />
            {profile.last}
          </h1>
        </div>

        {/* floating cards */}
        {cards.map((c, i) => (
          <div
            key={i}
            className="hero-card dotgrid-dark absolute rounded-xl border border-paper/10 bg-ink-2/70 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)] backdrop-blur-[2px]"
            style={{
              left: c.x,
              top: c.y,
              width: c.w,
              height: c.h,
              rotate: `${c.r}deg`,
              marginLeft: -c.w / 2,
              marginTop: -c.h / 2,
            }}
          />
        ))}
      </div>

      {/* centre tagline */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="hero-tagline reveal-ready max-w-4xl text-balance text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          {profile.tagline}
        </p>
        <p className="hero-meta mt-7 max-w-xl text-balance text-base leading-relaxed text-paper/60 sm:text-lg">
          Reconciliation, billing and settlement platforms for banks and
          capital-markets firms — end to end.
        </p>
      </div>

      {/* corner meta */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-5 pb-6 sm:px-8">
        <div className="hero-meta label space-y-1 text-paper/50">
          <div>{profile.location}</div>
          <div>Available for work</div>
        </div>
        <div className="hero-cue label flex items-center gap-2 text-paper/50">
          <span>Scroll</span>
          <span className="inline-block h-8 w-px bg-paper/30" />
        </div>
        <div className="hero-meta label hidden space-y-1 text-right text-paper/50 sm:block">
          <div>3.5+ years</div>
          <div>India · Korea · Brazil</div>
        </div>
      </div>
    </section>
  );
}
