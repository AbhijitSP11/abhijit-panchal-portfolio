"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, revealWords, revealUp } from "@/lib/anim";
import { profile, skills, education, achievements } from "@/lib/resume";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();

    const ctx = gsap.context(() => {
      const lead = root.current!.querySelector<HTMLElement>(".ab-lead")!;
      revealWords(lead, { stagger: 0.03 });

      revealUp(root.current!.querySelectorAll(".ab-fade"), {
        trigger: root.current!,
        stagger: 0.06,
      });

      const groups = gsap.utils.toArray<HTMLElement>(".skill-group");
      groups.forEach((g) => {
        revealUp(g.querySelectorAll(".skill-chip"), {
          trigger: g,
          stagger: 0.025,
          y: 14,
          start: "top 88%",
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="about"
      data-nav="dark"
      className="border-t border-ink/10 bg-ink text-paper"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mb-16 flex items-end justify-between border-b border-paper/15 pb-5">
          <h2 className="label text-paper/50">About</h2>
          <span className="label text-paper/50">{profile.location}</span>
        </div>

        {/* lead */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <p className="ab-lead reveal-ready text-2xl font-medium leading-[1.3] tracking-tight sm:text-3xl lg:col-span-7 lg:text-4xl">
            {profile.summary}
          </p>
          <div className="lg:col-span-5 lg:pt-3">
            <p className="ab-fade reveal-ready text-base leading-relaxed text-paper/60 sm:text-lg">
              {profile.summary2}
            </p>

            <div className="ab-fade reveal-ready mt-10 border-t border-paper/15 pt-6">
              <div className="label text-paper/45">Education</div>
              <div className="mt-3 text-xl font-medium tracking-tight">
                {education.school}
              </div>
              <div className="mt-1 text-sm text-paper/60">{education.degree}</div>
              <div className="label mt-2 text-paper/40">
                {education.period} · {education.location}
              </div>
            </div>

            <div className="ab-fade reveal-ready mt-8 border-t border-paper/15 pt-6">
              <div className="label text-paper/45">Key achievements</div>
              <ul className="mt-4 space-y-3">
                {achievements.map((a, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-paper/70">
                    <span className="mt-2 h-px w-4 shrink-0 bg-accent" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* skills */}
        <div className="mt-20 border-t border-paper/15 pt-12 lg:mt-28">
          <div className="ab-fade reveal-ready label mb-10 text-paper/45">
            Technical skills
          </div>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((s) => (
              <div key={s.group} className="skill-group">
                <h3 className="label mb-4 text-accent">{s.group}</h3>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <span
                      key={it}
                      className="skill-chip reveal-ready rounded-full border border-paper/15 px-3 py-1.5 text-xs text-paper/75 transition-colors hover:border-accent hover:text-paper"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
