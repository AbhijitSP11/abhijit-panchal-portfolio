"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion, revealUp } from "@/lib/anim";
import { experience } from "@/lib/resume";

const tints = ["#1d4ed8", "#4f46e5", "#7c3aed"];

export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();

    const ctx = gsap.context(() => {
      revealUp(root.current!.querySelectorAll(".xp-head"), {
        trigger: root.current!,
        stagger: 0.06,
      });

      const rows = gsap.utils.toArray<HTMLElement>(".xp-row");
      rows.forEach((row) => {
        revealUp(row.querySelectorAll(".xp-fade"), { trigger: row, stagger: 0.05 });
      });

      if (prefersReducedMotion()) return;

      gsap.from(".xp-chip", {
        scale: 0,
        duration: 0.55,
        ease: "back.out(2)",
        stagger: 0.12,
        scrollTrigger: {
          trigger: root.current!.querySelector(".xp-list")!,
          start: "top 78%",
          once: true,
        },
      });

      // the spine fills as you read down the section
      gsap.fromTo(
        ".xp-spine-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current!.querySelector(".xp-list")!,
            start: "top 65%",
            end: "bottom 70%",
            scrub: 0.5,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="experience" className="border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mb-12 flex items-end justify-between border-b border-ink/15 pb-5">
          <h2 className="xp-head reveal-ready label text-muted">02 / Experience</h2>
          <span className="xp-head reveal-ready label text-muted">2022 — Present</span>
        </div>

        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <h3 className="xp-head reveal-ready text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
            where I&rsquo;ve
            <br />
            <span className="font-serif italic text-accent">been building.</span>
          </h3>
          <p className="xp-head reveal-ready hand text-lg text-ink/50">
            three and a half years, three teams
          </p>
        </div>

        <div className="xp-list relative">
          {/* spine */}
          <div className="absolute left-[19px] top-4 hidden h-[calc(100%-2rem)] w-px bg-ink/12 sm:block">
            <div className="xp-spine-fill h-full w-full origin-top bg-accent" />
          </div>

          <div className="space-y-5">
            {experience.map((job, i) => (
              <article
                key={job.company}
                className="xp-row group relative border border-ink/12 bg-paper p-6 transition-all duration-500 hover:border-ink/30 hover:shadow-[0_30px_55px_-38px_rgba(36,38,32,0.5)] sm:ml-14 sm:p-7"
              >
                {/* node on the spine */}
                <span
                  className="xp-chip absolute -left-14 top-7 hidden h-10 w-10 place-items-center rounded-full text-sm font-semibold text-paper sm:grid"
                  style={{ backgroundColor: tints[i % tints.length] }}
                  aria-hidden="true"
                >
                  {job.company.slice(0, 1)}
                </span>

                <span
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ backgroundColor: tints[i % tints.length] }}
                  aria-hidden="true"
                />

                <div className="grid gap-6 lg:grid-cols-12">
                  {/* who and when */}
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-3">
                      <h4 className="text-xl font-medium tracking-tight sm:text-2xl">
                        {job.company}
                      </h4>
                      <span
                        className={`label shrink-0 px-2.5 py-1 ${
                          job.current
                            ? "bg-accent text-paper"
                            : "border border-ink/15 text-muted"
                        }`}
                      >
                        {job.current ? "now" : "before"}
                      </span>
                    </div>
                    <div className="mt-2 text-sm font-medium text-ink/80">
                      {job.role}
                    </div>
                    <div className="label mt-2 text-muted">{job.period}</div>
                    <div className="label mt-1 text-muted">{job.location}</div>

                    {/* headline number for the stint */}
                    <div className="mt-5 border-t border-ink/10 pt-4">
                      <div
                        className="text-2xl font-medium tracking-tight"
                        style={{ color: tints[i % tints.length] }}
                      >
                        {job.metric}
                      </div>
                      <div className="label mt-1 max-w-[20ch] leading-relaxed text-muted">
                        {job.metricLabel}
                      </div>
                    </div>
                  </div>

                  {/* what happened */}
                  <div className="lg:col-span-8">
                    <ul className="space-y-3">
                      {job.points.map((p, j) => (
                        <li
                          key={j}
                          className="xp-fade reveal-ready flex gap-3 text-sm leading-relaxed text-ink/75 sm:text-base"
                        >
                          <span
                            className="mt-2.5 h-px w-4 shrink-0"
                            style={{ backgroundColor: `${tints[i % tints.length]}66` }}
                          />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {job.tech.map((t) => (
                        <span
                          key={t}
                          className="label border border-ink/15 px-2.5 py-1 text-ink/55 transition-colors group-hover:border-ink/25"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
