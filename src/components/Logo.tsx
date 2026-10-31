/* eslint-disable @next/next/no-img-element */

/**
 * Company logos, on a white tile. The supplied files sit on white, lavender or
 * grey squares, so rather than fight the page colour they are shown as tiles,
 * and the square ones are zoomed inside the clipped box to cut away the empty
 * margin the files carry.
 */
export type LogoKey = "oneture" | "cms" | "mirae" | "taiyo";

const LOGOS: Record<
  LogoKey,
  { src: string; name: string; shape: "square" | "wide"; zoom: number; origin?: string; shift?: string }
> = {
  // the full lockup is a stacked wordmark that is unreadable at this size, so
  // zoom to the circular mark at the top of it
  oneture: { src: "/logos/oneture.png", name: "Oneture Technologies", shape: "square", zoom: 2.5, origin: "50% 29%", shift: "translateY(21%) " },
  cms: { src: "/logos/cms.png", name: "CMS Info Systems", shape: "square", zoom: 1.5 },
  mirae: { src: "/logos/mirae.png", name: "Mirae Asset", shape: "wide", zoom: 1.3 },
  taiyo: { src: "/logos/taiyo.png", name: "Taiyo.AI", shape: "square", zoom: 1.0 },
};

export function logoName(key: LogoKey) {
  return LOGOS[key].name;
}

export default function Logo({
  logo,
  size = 40,
  className = "",
}: {
  logo: LogoKey;
  /** Height in px. Wide logos get a proportionally wider box. */
  size?: number;
  className?: string;
}) {
  const l = LOGOS[logo];
  const width = l.shape === "wide" ? Math.round(size * 2.1) : size;

  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden border border-ink/10 bg-white ${className}`}
      style={{ width, height: size }}
      title={l.name}
    >
      <img
        src={l.src}
        alt={l.name}
        draggable={false}
        className="absolute inset-0 h-full w-full object-contain"
        style={{ transform: `${l.shift ?? ""}scale(${l.zoom})`, transformOrigin: l.origin ?? "50% 50%" }}
      />
    </span>
  );
}
