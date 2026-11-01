/**
 * Three small looping scenes, one per independent project, each showing the
 * product doing its one job. Pure markup and CSS keyframes (see `.bv-*` in
 * globals.css), so there is no JS running while they play, and under
 * prefers-reduced-motion they hold on their finished frame.
 */

const frame =
  "relative h-[262px] w-[212px] overflow-hidden rounded-[22px] bg-white text-ink shadow-[0_30px_50px_-18px_rgba(0,0,0,0.55)] ring-1 ring-black/10";

/** Prop AI: photos sent on WhatsApp become a property page, then someone opens it. */
export function PropVisual() {
  return (
    <div className={`${frame} bg-[#efeae2]`} aria-hidden="true">
      <div className="flex items-center gap-2 bg-[#075e54] px-3 py-2 text-[0.7rem] font-medium text-white">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-white/25 text-[0.6rem]">B</span>
        Property bot
      </div>

      <div className="space-y-1.5 px-2.5 pt-2.5">
        <div className="bv-s1 ml-auto w-[78%] rounded-lg rounded-tr-none bg-[#d9fdd3] p-1.5 shadow-sm">
          <div className="grid grid-cols-3 gap-1">
            <span className="aspect-square rounded bg-gradient-to-br from-amber-200 to-orange-300" />
            <span className="aspect-square rounded bg-gradient-to-br from-sky-200 to-sky-400" />
            <span className="aspect-square rounded bg-gradient-to-br from-emerald-200 to-teal-300" />
          </div>
        </div>
        <div className="bv-s2 ml-auto w-fit rounded-lg rounded-tr-none bg-[#d9fdd3] px-2 py-1 text-[0.62rem] shadow-sm">
          2BHK · Bandra West
        </div>
        <div className="bv-s3 w-fit rounded-lg rounded-tl-none bg-white px-2 py-1 text-[0.62rem] shadow-sm">
          Your page is ready ✓
        </div>
      </div>

      <div className="bv-s4 absolute inset-x-2.5 bottom-2.5 overflow-hidden rounded-xl bg-white shadow-[0_10px_24px_-10px_rgba(0,0,0,0.5)]">
        <div className="h-[58px] bg-gradient-to-br from-amber-300 via-orange-300 to-rose-300" />
        <div className="p-2">
          <div className="text-[0.72rem] font-semibold leading-tight">2BHK · Bandra West</div>
          <div className="mt-1 flex items-center gap-1.5 text-[0.55rem] text-muted">
            <span className="rounded bg-emerald-100 px-1 py-0.5 font-medium text-emerald-700">RERA ✓</span>
            by your broker
          </div>
          <div className="mt-1.5 rounded-md bg-[#25d366] py-1 text-center text-[0.62rem] font-semibold text-white">
            WhatsApp
          </div>
        </div>
      </div>

      <div className="bv-s5 absolute right-2 top-9 rounded-full bg-ink px-2.5 py-1 text-[0.58rem] font-medium text-white shadow-lg">
        👀 A client opened your link
      </div>
    </div>
  );
}

/** Market AI: a ticker goes in, the framework runs, a verdict comes out. */
export function MarketVisual() {
  return (
    <div className={`${frame} p-3.5`} aria-hidden="true">
      <div className="flex items-center justify-between">
        <span className="text-[0.7rem] font-semibold tracking-wide">NSE · TICKER</span>
        <span className="rounded bg-ink/5 px-1.5 py-0.5 text-[0.55rem] text-muted">your profile</span>
      </div>

      <svg viewBox="0 0 180 70" className="mt-3 h-[70px] w-full" fill="none">
        <path
          d="M0 58 L22 50 L40 54 L62 36 L84 42 L106 24 L128 30 L150 12 L180 18"
          pathLength={200}
          className="bv-draw"
          stroke="#be123c"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="mt-2 text-[0.58rem] font-medium uppercase tracking-wider text-muted">
        15-step framework
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-ink/10">
        <div className="bv-fill h-full w-full origin-left rounded-full bg-gradient-to-r from-rose-600 to-orange-500" />
      </div>

      <div className="mt-3 space-y-1.5 text-[0.62rem]">
        {["Financials & filings", "SWOT signals", "News sentiment"].map((t, i) => (
          <div key={t} className={`bv-s${i + 1} flex items-center justify-between rounded-md bg-ink/[0.04] px-2 py-1`}>
            {t}
            <span className="font-semibold text-emerald-600">✓</span>
          </div>
        ))}
      </div>

      <div className="bv-s5 absolute inset-x-3.5 bottom-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 py-2 text-center text-[0.68rem] font-bold tracking-wide text-white shadow-[0_12px_22px_-10px_rgba(190,18,60,0.7)]">
        BUY WITH CAUTION
      </div>
    </div>
  );
}

/** Aster: a plain-English question becomes SQL, then rows. */
export function AsterVisual() {
  return (
    <div className={`${frame} bg-slate-50 p-3`} aria-hidden="true">
      <div className="rounded-xl rounded-bl-none bg-white p-2 text-[0.64rem] shadow-sm ring-1 ring-black/5">
        <div className="bv-type font-medium">Which tasks are overdue?</div>
      </div>

      <div className="bv-s2 mt-2 rounded-lg bg-[#0f172a] p-2 font-mono text-[0.56rem] leading-relaxed text-cyan-200">
        <span className="text-indigo-300">SELECT</span> title, due
        <br />
        <span className="text-indigo-300">FROM</span> tasks
        <br />
        <span className="text-indigo-300">WHERE</span> due &lt; now()
      </div>

      <div className="mt-2.5 overflow-hidden rounded-lg bg-white ring-1 ring-black/5">
        {[
          ["w-[62%]", "2d"],
          ["w-[48%]", "4d"],
          ["w-[70%]", "1d"],
        ].map(([w, d], i) => (
          <div
            key={i}
            className={`bv-s${i + 3} flex items-center justify-between gap-2 border-b border-black/5 px-2 py-1.5 last:border-b-0`}
          >
            <span className={`h-1.5 ${w} rounded-full bg-slate-300`} />
            <span className="rounded bg-rose-100 px-1 py-0.5 text-[0.5rem] font-semibold text-rose-600">
              {d} late
            </span>
          </div>
        ))}
      </div>

      <div className="bv-s6 absolute bottom-3 left-3 flex items-center gap-1 text-[0.55rem] font-medium text-indigo-600">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> rows, live
      </div>
    </div>
  );
}
