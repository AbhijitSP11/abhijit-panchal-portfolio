"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion, revealWords, revealUp } from "@/lib/anim";
import { profile } from "@/lib/resume";

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();

    const ctx = gsap.context(() => {
      const head = root.current!.querySelector<HTMLElement>(".ct-head")!;
      revealWords(head, { stagger: 0.05 });
      revealUp(root.current!.querySelectorAll(".ct-fade"), {
        trigger: root.current!,
        stagger: 0.07,
      });

      if (prefersReducedMotion()) return;

      // magnetic pull on the primary button
      const btn = root.current!.querySelector<HTMLElement>(".magnetic");
      if (!btn) return;
      const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3.out" });

      const move = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.45);
      };
      const reset = () => {
        xTo(0);
        yTo(0);
      };

      btn.addEventListener("mousemove", move);
      btn.addEventListener("mouseleave", reset);
      return () => {
        btn.removeEventListener("mousemove", move);
        btn.removeEventListener("mouseleave", reset);
      };
    }, root);

    return () => ctx.revert();
  }, []);

  const year = new Date().getFullYear();

  return (
    <section
      ref={root}
      id="contact"
      className="dotgrid relative border-t border-ink/10 bg-paper-2/50"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:py-36">
        <div className="ct-fade reveal-ready label text-muted">Get in touch</div>

        <h2 className="ct-head reveal-ready mt-8 max-w-4xl text-balance text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Have a system that needs building properly?
        </h2>

        <p className="ct-fade reveal-ready mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          I am open to full stack engineering roles and consulting work,
          especially in fintech, payments and data-heavy products.
        </p>

        <div className="ct-fade reveal-ready mt-12 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="magnetic btn-fill text-base font-medium text-ink"
          >
            {profile.email}
            <span className="btn-sep" aria-hidden="true">→</span>
          </a>
          <a
            href="/Abhijit_Panchal_Resume.pdf"
            download
            className="btn-fill group text-base font-medium text-ink"
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
            href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
            className="link-sweep text-base text-muted"
          >
            {profile.phone}
          </a>
        </div>

        <div className="ct-fade reveal-ready mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-ink/15 pt-8">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-sweep label text-ink/70"
          >
            LinkedIn — {profile.linkedinLabel}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-sweep label text-ink/70"
          >
            GitHub — {profile.githubLabel}
          </a>
        </div>

        <footer className="ct-fade reveal-ready mt-20 flex flex-col gap-3 border-t border-ink/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="label text-muted">
            © {year} {profile.name}
          </span>
          <span className="label text-muted">
            Built with Next.js, GSAP &amp; Lenis
          </span>
        </footer>
      </div>
    </section>
  );
}
