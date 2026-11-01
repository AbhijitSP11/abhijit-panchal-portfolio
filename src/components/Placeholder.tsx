"use client";

/**
 * Stands in until a real image is dropped into /public and its `src` is filled
 * in. Deterministic from the label, so each slot looks distinct rather than
 * like a broken image.
 */
export default function Placeholder({
  label,
  tint,
  className = "",
}: {
  label: string;
  tint: string;
  className?: string;
}) {
  // cheap stable hash so the pattern differs per slot
  const seed = [...label].reduce((a, c) => a + c.charCodeAt(0), 0);
  const rot = seed % 40;
  const id = `ph-${seed}`;

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 160 200"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={tint} stopOpacity="0.22" />
            <stop offset="100%" stopColor={tint} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect width="160" height="200" fill="#e8e6df" />
        <rect width="160" height="200" fill={`url(#${id})`} />
        <g
          stroke={tint}
          strokeOpacity="0.28"
          strokeWidth="1"
          transform={`rotate(${rot} 80 100)`}
        >
          <circle cx="80" cy="100" r="54" fill="none" />
          <circle cx="80" cy="100" r="34" fill="none" />
          <path d="M-20 100 H 180" />
          <path d="M80 -20 V 220" />
        </g>
        <circle cx="80" cy="100" r="7" fill={tint} fillOpacity="0.5" />
      </svg>

      <span className="label absolute bottom-2 left-2 rounded-full bg-paper/80 px-2 py-1 text-[0.6rem] text-muted backdrop-blur-sm">
        image soon
      </span>
    </div>
  );
}
