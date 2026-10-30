"use client";

import { useEffect, useRef } from "react";
import {
  gsap,
  registerGsap,
  prefersReducedMotion,
  revealWords,
  revealUp,
} from "@/lib/anim";
import { projects } from "@/lib/resume";
import ProjectMock from "./ProjectMock";

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();

    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>(".project");

      blocks.forEach((block) => {
        const title = block.querySelector<HTMLElement>(".p-title")!;
        revealWords(title, { trigger: block, stagger: 0.04 });

        revealUp(block.querySelectorAll(".p-fade"), {
          trigger: block,
          stagger: 0.07,
          start: "top 78%",
        });

        if (prefersReducedMotion()) return;

        // the mock lifts in, then drifts against the scroll
        gsap.fromTo(
          block.querySelector(".mock-wrap"),
          { opacity: 0, y: 70, rotateX: 8 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.3,
            ease: "expo.out",
            scrollTrigger: { trigger: block, start: "top 75%", once: true },
          }
        );

        gsap.to(block.querySelector(".mock-wrap"), {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: block,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        });

        // rows tick in like data loading
        gsap.from(block.querySelectorAll(".mock-row"), {
          opacity: 0,
          x: -14,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: block, start: "top 62%", once: true },
        });

        // the big index number counts against the scroll
        gsap.to(block.querySelector(".p-index"), {
          yPercent: -45,
          ease: "none",
          scrollTrigger: {
            trigger: block,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="work"
      className="dotgrid relative border-t border-ink/10 bg-paper-2/40"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mb-16 flex items-end justify-between border-b border-ink/15 pb-5">
          <h2 className="label text-muted">Selected work</h2>
          <span className="label text-muted">
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </div>

        <div className="space-y-28 lg:space-y-44">
          {projects.map((p, i) => (
            <article
              key={p.id}
              className="project relative grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
            >
              {/* oversized index watermark */}
              <span
                className="p-index pointer-events-none absolute -top-10 right-0 select-none text-[7rem] font-semibold leading-none tracking-tighter text-ink/[0.045] lg:text-[11rem]"
                aria-hidden="true"
              >
                {p.index}
              </span>

              {/* copy */}
              <div
                className={`relative z-10 lg:col-span-5 ${
                  i % 2 === 1 ? "lg:order-2 lg:col-start-8" : ""
                }`}
              >
                <div className="p-fade reveal-ready flex items-center gap-3">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: p.accent }}
                  />
                  <span className="label text-muted">{p.eyebrow}</span>
                </div>

                <h3 className="p-title reveal-ready mt-5 text-3xl font-medium leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
                  {p.title}
                </h3>

                <p className="p-fade reveal-ready mt-5 text-base leading-relaxed text-muted sm:text-lg">
                  {p.blurb}
                </p>

                <ul className="p-fade reveal-ready mt-7 space-y-3 border-l border-ink/15 pl-5">
                  {p.points.map((pt, j) => (
                    <li key={j} className="text-sm leading-relaxed text-ink/75">
                      {pt}
                    </li>
                  ))}
                </ul>

                <div className="p-fade reveal-ready mt-8 flex flex-wrap gap-x-8 gap-y-4">
                  {p.metrics.map((m) => (
                    <div key={m.label}>
                      <div
                        className="text-xl font-medium tracking-tight"
                        style={{ color: p.accent }}
                      >
                        {m.value}
                      </div>
                      <div className="label mt-1 text-muted">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="p-fade reveal-ready mt-8 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="label rounded-full border border-ink/15 px-3 py-1.5 text-ink/65"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="p-fade reveal-ready label mt-7 flex flex-wrap gap-x-4 text-muted">
                  <span>{p.org}</span>
                  <span className="text-ink/25">/</span>
                  <span>{p.year}</span>
                </div>
              </div>

              {/* mock */}
              <div
                className={`relative z-10 lg:col-span-6 ${
                  i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"
                }`}
                style={{ perspective: 1200 }}
              >
                <div className="mock-wrap">
                  <ProjectMock accent={p.accent} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
