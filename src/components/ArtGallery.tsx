"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, revealUp } from "@/lib/anim";
import { artworks, photos } from "@/lib/personal";
import Placeholder from "./Placeholder";

/** Paintings and photographs — both reveal their caption on hover. */
export default function ArtGallery() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const ctx = gsap.context(() => {
      revealUp(root.current!.querySelectorAll(".ag-item"), {
        trigger: root.current!,
        stagger: 0.06,
        y: 26,
      });
      revealUp(root.current!.querySelectorAll(".ag-head"), {
        trigger: root.current!,
        stagger: 0.05,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="space-y-20">
      {/* paintings */}
      <div>
        <div className="ag-head reveal-ready mb-6 flex flex-wrap items-end justify-between gap-3">
          <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">
            things I&rsquo;ve
            <span className="font-serif italic text-accent"> painted.</span>
          </h3>
          <p className="hand text-lg text-ink/50">the one hobby with no keyboard</p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {artworks.map((a) => (
            <figure
              key={a.title}
              tabIndex={0}
              className="ag-item reveal-ready group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-xl border border-ink/10 outline-none transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_55px_-30px_rgba(36,38,32,0.55)] focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                {a.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={a.src}
                    alt={a.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Placeholder label={a.title} tint={a.tint} />
                )}
              </div>

              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-ink/90 px-4 py-3 text-paper backdrop-blur-sm transition-transform duration-400 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0">
                <div className="text-sm font-medium">{a.title}</div>
                <div className="label mt-0.5 text-paper/60">{a.medium}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* photographs */}
      <div>
        <div className="ag-head reveal-ready mb-6 flex flex-wrap items-end justify-between gap-3">
          <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">
            pictures I took that
            <span className="font-serif italic text-accent"> someone else posted.</span>
          </h3>
          <p className="hand text-lg text-ink/50">I shoot, they get the likes</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {photos.map((p, i) => (
            <figure
              key={p.caption}
              tabIndex={0}
              className={`ag-item reveal-ready group relative cursor-pointer overflow-hidden rounded-xl border border-ink/10 outline-none transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_55px_-30px_rgba(36,38,32,0.55)] focus-visible:ring-2 focus-visible:ring-accent ${
                i === 0 ? "aspect-[4/5] sm:aspect-[3/4]" : "aspect-[4/3]"
              }`}
            >
              <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                {p.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.src}
                    alt={p.caption}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Placeholder label={p.caption} tint={p.tint} />
                )}
              </div>

              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-ink/90 px-4 py-3 backdrop-blur-sm transition-transform duration-400 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0">
                <div className="hand text-lg leading-tight text-paper">
                  {p.caption}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
