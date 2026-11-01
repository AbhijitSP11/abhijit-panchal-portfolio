/* eslint-disable @next/next/no-img-element */

/**
 * Company logos, sitting straight on the page.
 *
 * The files in public/logos are trimmed to the mark itself — no background,
 * no empty margin — so the box here is the size of what you see. That is what
 * makes `items-center` put every logo on the same horizontal axis: before the
 * trim, each file carried a different amount of empty space above and below,
 * and the marks sat at different heights even when the boxes were aligned.
 *
 * Oneture's file is its circular icon only; the stacked wordmark is
 * unreadable at this size, and the name is written beside it anyway.
 */
export type LogoKey = "oneture" | "cms" | "mirae" | "taiyo";

const LOGOS: Record<LogoKey, { src: string; name: string; aspect: number }> = {
  oneture: { src: "/logos/oneture.png", name: "Oneture Technologies", aspect: 1 },
  cms: { src: "/logos/cms.png", name: "CMS Info Systems", aspect: 2.04 },
  mirae: { src: "/logos/mirae.png", name: "Mirae Asset", aspect: 3.18 },
  taiyo: { src: "/logos/taiyo.png", name: "Taiyo.AI", aspect: 1 },
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
  /** Height of the mark in px; the width follows from its proportions. */
  size?: number;
  className?: string;
}) {
  const l = LOGOS[logo];

  return (
    <img
      src={l.src}
      alt={l.name}
      title={l.name}
      draggable={false}
      width={Math.round(size * l.aspect)}
      height={size}
      className={`block shrink-0 object-contain ${className}`}
      style={{ height: size, width: Math.round(size * l.aspect) }}
    />
  );
}
