"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion, revealUp } from "@/lib/anim";
import { experience } from "@/lib/resume";

/** Timeline whose spine fills as the section is scrolled through. */
export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".xp-row");
      rows.forEach((row) => {
        revealUp(row.querySelectorAll(".xp-fade"), {
          trigger: row,
          stagger: 0.06,
        });
      });

      if (prefersReducedMotion()) return;

      gsap.fromTo(
        ".xp-spine-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".xp-list",
            start: "top 70%",
            end: "bottom 75%",
            scrub: 0.5,
          },
        }
      );

      gsap.from(".xp-dot", {
        scale: 0,
        duration: 0.6,
        ease: "back.out(2)",
        stagger: 0.12,
        scrollTrigger: { trigger: ".xp-list", start: "top 70%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="experience"
      className="border-t border-ink/10 bg-paper"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mb-16 flex items-end justify-between border-b border-ink/15 pb-5">
          <h2 className="label text-muted">02 / Experience</h2>
          <span className="label text-muted">2022 — Present</span>
        </div>

        <div className="xp-list relative pl-8 sm:pl-12">
          {/* spine */}
          <div className="absolute left-1 top-2 h-[calc(100%-1rem)] w-px bg-ink/12 sm:left-2">
            <div className="xp-spine-fill h-full w-full origin-top bg-accent" />
          </div>

          <div className="space-y-16 lg:space-y-24">
            {experience.map((job) => (
              <div
                key={job.company}
                className="xp-row relative grid gap-5 lg:grid-cols-12 lg:gap-10"
              >
                <span
                  className={`xp-dot absolute -left-8 top-2.5 h-2.5 w-2.5 rounded-full sm:-left-12 ${
                    job.current ? "bg-accent" : "bg-ink/35"
                  }`}
                  style={{ marginLeft: job.current ? "-0.2rem" : "-0.2rem" }}
                />

                <div className="xp-fade reveal-ready lg:col-span-4">
                  <div className="label text-muted">{job.period}</div>
                  <h3 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
                    {job.company}
                  </h3>
                  <div className="mt-1.5 text-sm text-muted">{job.location}</div>
                  {job.current ? (
                    <span className="label mt-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Currently here
                    </span>
                  ) : null}
                </div>

                <div className="lg:col-span-8">
                  <div className="xp-fade reveal-ready text-lg font-medium sm:text-xl">
                    {job.role}
                  </div>
                  <ul className="mt-5 space-y-3.5">
                    {job.points.map((p, i) => (
                      <li
                        key={i}
                        className="xp-fade reveal-ready flex gap-3 text-sm leading-relaxed text-ink/75 sm:text-base"
                      >
                        <span className="mt-2 h-px w-4 shrink-0 bg-ink/25" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
