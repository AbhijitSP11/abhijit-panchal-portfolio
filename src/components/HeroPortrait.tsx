"use client";

import { portrait } from "@/lib/personal";
import { profile } from "@/lib/resume";
import Placeholder from "./Placeholder";

/**
 * The hero portrait: a print with a handwritten caption, tilted a little and
 * straightening on hover. Reads its image from `portrait` in lib/personal.ts —
 * until a file is set there it draws a placeholder so the layout is final.
 */
export default function HeroPortrait({ className = "" }: { className?: string }) {
  return (
    <figure
      className={`hp-card w-full max-w-[230px] -rotate-3 bg-white p-3 pb-4 shadow-[0_22px_48px_-24px_rgba(36,38,32,0.6)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.03] ${className}`}
    >
      <div className="aspect-[4/5] w-full overflow-hidden bg-paper-2">
        {portrait.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={portrait.src}
            alt={profile.name}
            className="h-full w-full object-cover"
            style={{ objectPosition: portrait.position }}
          />
        ) : (
          <Placeholder label="portrait" tint={portrait.tint} />
        )}
      </div>
      <figcaption className="hand mt-2 px-1 text-xl leading-tight text-ink/65">
        {portrait.caption}
      </figcaption>
    </figure>
  );
}
