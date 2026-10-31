"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion, revealUp } from "@/lib/anim";
import { experience } from "@/lib/resume";

/** Same row treatment as the work log tab, with the detail kept underneath. */
const chipTints = ["#1d4ed8", "#4f46e5", "#7c3aed"];

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
        revealUp(row.querySelectorAll(".xp-fade"), {
          trigger: row,
          stagger: 0.05,
        });
      });

      if (prefersReducedMotion()) return;

      gsap.from(".xp-chip", {
        scale: 0,
        duration: 0.55,
        ease: "back.out(2)",
        stagger: 0.1,
        scrollTrigger: {
          trigger: root.current!.querySelector(".xp-list")!,
          start: "top 78%",
          once: true,
        },
      });
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

        <h3 className="xp-head reveal-ready mb-12 text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
          where I&rsquo;ve
          <br />
          <span className="font-serif italic text-accent">been building.</span>
        </h3>

        <div className="xp-list divide-y divide-ink/10 border-t border-ink/10">
          {experience.map((job, i) => (
            <article key={job.company} className="xp-row py-7 sm:py-9">
              {/* row header, mirroring the work log */}
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="label w-6 shrink-0 text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span
                  className="xp-chip grid h-11 w-11 shrink-0 place-items-center rounded-full text-base font-semibold text-paper"
                  style={{ backgroundColor: chipTints[i % chipTints.length] }}
                  aria-hidden="true"
                >
                  {job.company.slice(0, 1)}
                </span>

                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-xl font-medium tracking-tight sm:text-2xl">
                    {job.company}
                  </h4>
                  <div className="label mt-1 text-muted sm:hidden">{job.role}</div>
                </div>

                <div className="hidden text-right sm:block">
                  <div className="text-sm font-medium">{job.role}</div>
                  <div className="label mt-1 text-muted">{job.period}</div>
                </div>

                <span
                  className={`label shrink-0 rounded-full px-3 py-1.5 ${
                    job.current
                      ? "bg-accent text-paper"
                      : "border border-ink/15 text-muted"
                  }`}
                >
                  {job.current ? "now" : "before"}
                </span>
              </div>

              {/* detail, aligned under the company name */}
              <div className="mt-5 sm:pl-[5.5rem]">
                <div className="label mb-4 text-muted sm:hidden">
                  {job.period} · {job.location}
                </div>
                <div className="label mb-4 hidden text-muted sm:block">
                  {job.location}
                </div>
                <ul className="space-y-3">
                  {job.points.map((p, j) => (
                    <li
                      key={j}
                      className="xp-fade reveal-ready flex gap-3 text-sm leading-relaxed text-ink/75 sm:text-base"
                    >
                      <span className="mt-2.5 h-px w-4 shrink-0 bg-ink/25" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
