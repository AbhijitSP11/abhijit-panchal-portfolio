"use client";

/** The small drawn scene inside each hero frame. */
export default function HeroScene({
  kind,
}: {
  kind: "city" | "grid" | "terminal";
}) {
  if (kind === "city") {
    return (
      <svg viewBox="0 0 120 90" className="h-full w-full" aria-hidden="true">
        <rect width="120" height="90" fill="#e8e6df" />
        <circle cx="92" cy="22" r="9" fill="var(--color-accent)" opacity="0.25" />
        <g fill="#2e3129" opacity="0.85">
          <rect x="10" y="48" width="14" height="42" />
          <rect x="28" y="36" width="12" height="54" />
          <rect x="44" y="54" width="13" height="36" />
          <rect x="61" y="28" width="15" height="62" />
          <rect x="80" y="46" width="12" height="44" />
          <rect x="96" y="58" width="14" height="32" />
        </g>
        <g fill="var(--color-accent)">
          <rect x="31" y="42" width="3" height="3" />
          <rect x="36" y="50" width="3" height="3" />
          <rect x="64" y="34" width="3" height="3" />
          <rect x="70" y="44" width="3" height="3" />
          <rect x="64" y="56" width="3" height="3" />
          <rect x="83" y="54" width="3" height="3" />
        </g>
        <rect x="0" y="86" width="120" height="4" fill="#2e3129" />
      </svg>
    );
  }

  if (kind === "grid") {
    return (
      <svg viewBox="0 0 120 90" className="h-full w-full" aria-hidden="true">
        <rect width="120" height="90" fill="#ffffff" />
        <rect width="120" height="14" fill="#e8e6df" />
        <g fill="#2e3129" opacity="0.35">
          <rect x="8" y="5" width="22" height="4" rx="2" />
          <rect x="38" y="5" width="16" height="4" rx="2" />
          <rect x="62" y="5" width="20" height="4" rx="2" />
          <rect x="90" y="5" width="18" height="4" rx="2" />
        </g>
        {[0, 1, 2, 3, 4, 5].map((r) => (
          <g key={r} transform={`translate(0 ${20 + r * 12})`}>
            <rect x="8" y="0" width="24" height="4" rx="2" fill="#2e3129" opacity="0.18" />
            <rect x="38" y="0" width="14" height="4" rx="2" fill="#2e3129" opacity="0.18" />
            <rect x="62" y="0" width="18" height="4" rx="2" fill="#2e3129" opacity="0.18" />
            <rect
              x="90"
              y="0"
              width="18"
              height="4"
              rx="2"
              fill={r % 2 === 0 ? "var(--color-accent)" : "#2e3129"}
              opacity={r % 2 === 0 ? 0.8 : 0.18}
            />
          </g>
        ))}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 90" className="h-full w-full" aria-hidden="true">
      <rect width="120" height="90" fill="#242620" />
      <g fill="#f1f0eb" opacity="0.2">
        <circle cx="10" cy="9" r="2.5" />
        <circle cx="19" cy="9" r="2.5" />
        <circle cx="28" cy="9" r="2.5" />
      </g>
      <g fontFamily="var(--font-mono)" fontSize="7">
        <text x="9" y="32" fill="var(--color-accent-soft)">$</text>
        <text x="18" y="32" fill="#f1f0eb" opacity="0.8">recon --run</text>
        <text x="9" y="46" fill="#f1f0eb" opacity="0.45">matched 100k</text>
        <text x="9" y="60" fill="#f1f0eb" opacity="0.45">0 breaks</text>
        <text x="9" y="74" fill="var(--color-accent-soft)">$</text>
      </g>
      <rect x="18" y="68" width="6" height="8" fill="#f1f0eb" opacity="0.8">
        <animate
          attributeName="opacity"
          values="0.8;0.8;0;0"
          dur="1.1s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
}
