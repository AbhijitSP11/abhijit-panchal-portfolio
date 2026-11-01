/**
 * "What I bring": three things that set the work apart, each with a small
 * looping line drawing in the site's own ink and red. Pure SVG and CSS (the
 * `vl-*` rules in globals.css), so there is nothing to hydrate and it stays
 * still under prefers-reduced-motion.
 */

type Value = {
  n: string;
  title: string;
  body: string;
  proof: string;
  /** A handwritten aside, in the first person. */
  note: string;
  visual: React.ReactNode;
};

const values: Value[] = [
  {
    n: "01",
    title: "Domain fluency, not just code",
    body: "I invest in understanding how money moves and who depends on it before I build. That means fewer rework cycles, faster sign-off from operations and banks, and software that fits the business model from day one.",
    proof: "Banking · Reconciliation · SWIFT MT → MX",
    note: "code is the small part of the value",
    visual: <DomainScene />,
  },
  {
    n: "02",
    title: "Stakeholder alignment",
    body: "I work as a partner to product, operations and engineering rather than a ticket-taker. Early alignment cuts the cost of change, surfaces risks sooner, and gives every stakeholder ownership of the result.",
    proof: "Cross-functional · 3 countries, one team",
    note: "alignment early saves cost later",
    visual: <CollabScene />,
  },
  {
    n: "03",
    title: "Business outcomes, not output",
    body: "I measure my work by business impact: manual effort removed, errors caught earlier, revenue-linked processes like billing running on time. Every feature has to earn its place against a growth or efficiency goal.",
    proof: "Efficiency · Billing automation · Recon tool",
    note: "the metric I hold myself to",
    visual: <OutcomeScene />,
  },
];

const steps = ["Understand the business", "Align the stakeholders", "Deliver the outcome", "Drive the growth"];

export default function Values() {
  return (
    <section
      id="values"
      className="border-t border-ink/10 bg-paper"
      aria-labelledby="values-title"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
        <p className="label text-muted">What I bring</p>
        <h2
          id="values-title"
          className="mt-4 max-w-[20ch] text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
        >
          Engineering with a <span className="text-accent">business mindset.</span>
        </h2>
        <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-muted sm:text-lg">
          Strong engineers are easy to find. The edge is an engineer who understands the domain, aligns the people involved, and ties every build to a measurable business result. That is the value I bring to a team.
        </p>

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {values.map((v) => (
            <article
              key={v.n}
              className="flex flex-col overflow-hidden rounded-2xl border border-ink/10 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-ink/30"
            >
              <div className="dotgrid-red relative aspect-[16/11] border-b border-ink/10">
                {v.visual}
                <span className="label absolute left-4 top-4 text-muted">{v.n}</span>
                <div className="absolute inset-x-4 bottom-3 flex items-end gap-2">
                  <Arrow className="h-8 w-10 shrink-0" />
                  <span className="hand pb-0.5 text-lg leading-none text-accent">{v.note}</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-2xl font-medium leading-tight tracking-tight">{v.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{v.body}</p>
                <p className="label mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-ink/15 px-3 py-1.5 text-ink/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  {v.proof}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-end gap-2 lg:mt-12">
          <span className="hand text-xl leading-none text-accent">
            my operating model
          </span>
          <Arrow className="h-8 w-10 shrink-0 rotate-90" />
        </div>
        <ol className="mt-3 grid gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s}
              className="flex items-center gap-3 rounded-xl border border-ink/10 px-4 py-4"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-xs font-medium text-paper">
                {i + 1}
              </span>
              <span className="text-sm font-medium leading-snug">{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Hand-drawn arrow, curling up toward the scene above it. */
function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 32" className={className} fill="none" aria-hidden="true">
      <path
        d="M4 29 C 18 29, 30 22, 34 6"
        stroke="#d62d46"
        strokeOpacity="0.75"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M27 10 L 34 5 L 36 14"
        stroke="#d62d46"
        strokeOpacity="0.75"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------------------------------------------------------------- scenes */

const svgProps = {
  viewBox: "0 0 320 180",
  className: "absolute inset-x-0 top-0 h-[calc(100%-3rem)] w-full",
  preserveAspectRatio: "xMidYMid meet",
  "aria-hidden": true,
} as const;

const mono = "var(--font-mono)";

/** Code is the small core; the domain and the business wrap around it. */
function DomainScene() {
  return (
    <svg {...svgProps}>
      <g transform="translate(160 98)" fill="none" stroke="#d62d46">
        <circle className="vl-ring vl-r3" r="72" fill="#d62d46" fillOpacity="0.06" strokeOpacity="0.5" strokeDasharray="3 5" />
        <circle className="vl-ring vl-r2" r="50" fill="#d62d46" fillOpacity="0.12" strokeOpacity="0.75" />
        <circle className="vl-ring vl-r1" r="26" fill="#d62d46" stroke="none" />
        <text y="4" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#f1f0eb" stroke="none" fontFamily={mono}>
          code
        </text>
        <text y="-56" textAnchor="middle" fontSize="8.5" fill="#d62d46" stroke="none" fontFamily={mono} letterSpacing="1.5">
          DOMAIN
        </text>
        <text y="-78" textAnchor="middle" fontSize="8.5" fill="#d62d46" fillOpacity="0.75" stroke="none" fontFamily={mono} letterSpacing="1.5">
          BUSINESS
        </text>
      </g>
      <g className="vl-coin">
        <circle r="7" fill="#f1f0eb" stroke="#d62d46" strokeWidth="1.5" />
        <text y="3.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#d62d46">₹</text>
      </g>
    </svg>
  );
}

/** Two tags joined by a line; a red dot carries the work across. */
function CollabScene() {
  return (
    <svg {...svgProps}>
      <line x1="126" y1="94" x2="194" y2="94" stroke="#242620" strokeOpacity="0.35" strokeWidth="1.3" strokeDasharray="4 5" className="vl-flow" />
      {[
        { x: 46, t: "business" },
        { x: 194, t: "tech" },
      ].map((p) => (
        <g key={p.t}>
          <rect x={p.x} y="80" width="80" height="28" rx="14" fill="#f1f0eb" stroke="#242620" strokeWidth="1.3" />
          <text x={p.x + 40} y="98" textAnchor="middle" fontSize="10.5" fill="#242620" fontFamily={mono}>
            {p.t}
          </text>
        </g>
      ))}
      <circle className="vl-dot" cx="130" cy="94" r="4" fill="#d62d46" />
      <g className="vl-lock">
        <circle cx="160" cy="130" r="9" fill="#f1f0eb" stroke="#d62d46" strokeWidth="1.5" />
        <path d="M 155.5 130 l 3 3 l 6 -6.5" fill="none" stroke="#d62d46" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/** A manual tag fades out; a single red line climbs. */
function OutcomeScene() {
  return (
    <svg {...svgProps}>
      <g className="vl-fade">
        <rect x="34" y="82" width="74" height="26" rx="13" fill="#f1f0eb" stroke="#242620" strokeOpacity="0.5" strokeWidth="1.3" />
        <text x="71" y="99" textAnchor="middle" fontSize="10" fill="#6b6d64" fontFamily={mono}>manual</text>
        <line x1="44" y1="95" x2="98" y2="95" stroke="#d62d46" strokeWidth="1.3" />
      </g>
      <path d="M 120 95 h 18 m -5 -5 l 5 5 l -5 5" fill="none" stroke="#242620" strokeOpacity="0.4" strokeWidth="1.4" />
      <line x1="158" y1="130" x2="288" y2="130" stroke="#242620" strokeOpacity="0.25" />
      <path className="vl-trend" d="M 162 122 L 196 108 L 228 112 L 258 78 L 284 52" fill="none" stroke="#d62d46" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle className="vl-trend-dot" cx="284" cy="52" r="4.5" fill="#d62d46" />
      <text x="158" y="148" fontSize="8.5" fill="#6b6d64" fontFamily={mono} letterSpacing="1.2">OUTCOME</text>
    </svg>
  );
}
