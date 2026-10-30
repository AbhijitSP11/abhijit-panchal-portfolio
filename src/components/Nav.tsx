"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap, ScrollTrigger, onPreloaderDone } from "@/lib/anim";
import { profile } from "@/lib/resume";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const BAR = 64; // height of the nav band, in px

export default function Nav() {
  const nav = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [onDark, setOnDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    registerGsap();

    const offReady = onPreloaderDone(() =>
      gsap.to(nav.current, { y: 0, opacity: 1, duration: 0.9, ease: "expo.out" })
    );

    // Flip the nav's colours whenever the band sits over a dark section.
    const active = new Set<Element>();
    const darkSections = gsap.utils.toArray<HTMLElement>('[data-nav="dark"]');

    const darkTriggers = darkSections.map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: `top top+=${BAR}`,
        end: `bottom top+=${BAR}`,
        onToggle: (self) => {
          if (self.isActive) active.add(section);
          else active.delete(section);
          setOnDark(active.size > 0);
        },
      })
    );

    const scrollTrigger = ScrollTrigger.create({
      start: 40,
      end: "max",
      onToggle: (self) => setScrolled(self.isActive),
    });

    return () => {
      offReady();
      darkTriggers.forEach((t) => t.kill());
      scrollTrigger.kill();
    };
  }, []);

  // Animate the mobile sheet in and out.
  useEffect(() => {
    if (!menu.current) return;
    const items = menu.current.querySelectorAll(".m-item");

    if (open) {
      gsap.set(menu.current, { display: "flex" });
      gsap
        .timeline()
        .fromTo(menu.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
        .fromTo(
          items,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: "expo.out" },
          0.05
        );
    } else {
      gsap.to(menu.current, {
        opacity: 0,
        duration: 0.25,
        onComplete: () => {
          gsap.set(menu.current, { display: "none" });
        },
      });
    }
  }, [open]);

  const shell = !scrolled
    ? "border-transparent bg-transparent text-paper"
    : onDark
      ? "border-paper/10 bg-ink/80 text-paper backdrop-blur-md"
      : "border-ink/10 bg-paper/85 text-ink backdrop-blur-md";

  const lightPill = onDark || !scrolled;

  return (
    <>
      <nav
        ref={nav}
        style={{ transform: "translateY(-100%)", opacity: 0 }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${shell}`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-baseline gap-2.5 whitespace-nowrap">
            <span className="text-base font-semibold tracking-tight">
              {profile.first}
              <span className="text-accent">.</span>
            </span>
            <span className="label hidden opacity-50 lg:inline">
              {profile.shortRole}
            </span>
          </a>

          <div className="flex items-center gap-4 sm:gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="link-sweep label hidden whitespace-nowrap opacity-70 transition-opacity hover:opacity-100 md:inline-block"
              >
                {l.label}
              </a>
            ))}

            <a
              href={`mailto:${profile.email}`}
              className={`label hidden whitespace-nowrap rounded-full px-4 py-2 transition-colors sm:inline-block ${
                lightPill
                  ? "bg-paper text-ink hover:bg-accent hover:text-paper"
                  : "bg-ink text-paper hover:bg-accent"
              }`}
            >
              Email me
            </a>

            {/* mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={`label flex items-center gap-2 rounded-full px-4 py-2 transition-colors md:hidden ${
                open
                  ? "bg-accent text-paper"
                  : lightPill
                    ? "bg-paper text-ink"
                    : "bg-ink text-paper"
              }`}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </nav>

      {/* mobile sheet */}
      <div
        ref={menu}
        style={{ display: "none", opacity: 0 }}
        className="fixed inset-0 z-40 hidden flex-col justify-center gap-2 bg-ink px-6 pt-16 text-paper md:!hidden"
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="m-item border-b border-paper/10 py-5 text-4xl font-medium tracking-tight"
          >
            {l.label}
          </a>
        ))}
        <a
          href={`mailto:${profile.email}`}
          onClick={() => setOpen(false)}
          className="m-item mt-8 break-all text-base text-accent"
        >
          {profile.email}
        </a>
        <div className="m-item label mt-3 text-paper/50">{profile.phone}</div>
      </div>
    </>
  );
}
