"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap, registerGsap, revealUp } from "@/lib/anim";
import { projects } from "@/lib/resume";
import GlassFolder, {
  type ArtPreset,
  type FolderFile,
} from "@/components/ui/glass-folder-cards";

/**
 * Each project is a folder on a desk. Closed it shows its name and what is
 * inside; hover leans the glass forward, clicking opens it and fans the files
 * out — the case study, the headline numbers, the stack.
 */
const art: ArtPreset[] = ["glacier", "aurora", "dusk", "ember"];

/** The folder label is a single clipped line, so each project gets a short name. */
const shortLabel: Record<string, string> = {
  recon: "Reconciliation",
  billing: "Enterprise Billing",
  mirae: "Bond Custodian",
  aster: "Aster",
};

export default function Work() {
  const root = useRef<HTMLElement>(null);
  const router = useRouter();
  const [width, setWidth] = useState(320);

  // the folder sizes in px, so pick a width to suit the viewport
  useEffect(() => {
    const fit = () => {
      const w = window.innerWidth;
      setWidth(w < 420 ? 268 : w < 640 ? 300 : w < 1280 ? 310 : 340);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      revealUp(root.current!.querySelectorAll(".w-head"), {
        trigger: root.current!,
        stagger: 0.06,
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
        <div className="mb-12 flex items-end justify-between border-b border-ink/15 pb-5">
          <h2 className="w-head reveal-ready label text-muted">
            01 / Selected work
          </h2>
          <span className="w-head reveal-ready label text-muted">
            {String(projects.length).padStart(2, "0")} case studies
          </span>
        </div>

        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <p className="w-head reveal-ready max-w-2xl text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
            Four systems that move money, each one
            <span className="font-serif italic text-accent"> written up in full.</span>
          </p>
          <p className="w-head reveal-ready hand text-lg text-ink/50">
            hover to lean · click to open a folder
          </p>
        </div>

        <div className="grid justify-items-center gap-x-10 gap-y-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-6">
          {projects.map((p, i) => {
            const files: FolderFile[] = [
              {
                name: "Stack",
                meta: p.stack.slice(0, 2).join(" · "),
              },
              ...p.metrics.slice(0, 2).map((m) => ({
                name: m.label,
                meta: m.value,
              })),
              {
                name: "Case study",
                meta: "Open →",
                art: art[i % art.length],
                href: `/work/${p.slug}`,
              },
            ];

            return (
              <GlassFolder
                key={p.id}
                label={shortLabel[p.id] ?? p.title}
                meta={p.org.split(" · ")[0]}
                art={art[i % art.length]}
                seed={i * 7 + 3}
                tone={i % 2 === 1 ? "dark" : "light"}
                width={width}
                action="none"
                appearDelay={i * 120}
                files={files}
                onFileSelect={(file) => {
                  if (file.href) router.push(file.href);
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
