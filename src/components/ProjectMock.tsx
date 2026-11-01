"use client";

/**
 * A stylised stand-in for each platform's UI — a data-dense console, which is
 * what these products actually are. Rows animate via the parent timeline.
 */
export default function ProjectMock({ accent }: { accent: string }) {
  const rows = Array.from({ length: 7 });
  const cols = [38, 22, 16, 24];

  return (
    <div
      className="mock w-full overflow-hidden rounded-xl border border-ink/12 bg-white shadow-[0_30px_80px_-40px_rgba(18,17,16,0.45)]"
      aria-hidden="true"
    >
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-ink/10 bg-paper-2/70 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="ml-3 h-2 w-28 rounded-full bg-ink/10" />
      </div>

      <div className="flex min-h-[260px]">
        {/* sidebar */}
        <div className="hidden w-32 shrink-0 space-y-2.5 border-r border-ink/10 bg-paper/60 p-4 sm:block">
          <span
            className="block h-5 w-5 rounded"
            style={{ backgroundColor: accent }}
          />
          <span className="mt-4 block h-2 w-full rounded-full bg-ink/15" />
          <span className="block h-2 w-4/5 rounded-full bg-ink/10" />
          <span className="block h-2 w-3/5 rounded-full bg-ink/10" />
          <span className="block h-2 w-4/6 rounded-full bg-ink/10" />
          <span className="block h-2 w-2/4 rounded-full bg-ink/10" />
        </div>

        {/* content */}
        <div className="flex-1 p-4 sm:p-5">
          {/* summary tiles */}
          <div className="mb-4 grid grid-cols-3 gap-2.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="mock-tile rounded-lg border border-ink/10 p-2.5"
                style={{ backgroundColor: i === 0 ? `${accent}14` : undefined }}
              >
                <span
                  className="block h-1.5 w-8 rounded-full"
                  style={{ backgroundColor: i === 0 ? accent : "rgba(18,17,16,0.18)" }}
                />
                <span className="mt-2 block h-3 w-12 rounded-sm bg-ink/25" />
              </div>
            ))}
          </div>

          {/* grid header */}
          <div className="flex gap-2 border-b border-ink/12 pb-2">
            {cols.map((w, i) => (
              <span
                key={i}
                className="h-1.5 rounded-full bg-ink/20"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>

          {/* grid rows */}
          <div className="divide-y divide-ink/[0.07]">
            {rows.map((_, r) => (
              <div key={r} className="mock-row flex items-center gap-2 py-2.5">
                {cols.map((w, i) => (
                  <span
                    key={i}
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${w - (r % 3) * 3}%`,
                      backgroundColor:
                        i === 3 && r % 3 === 0 ? accent : "rgba(18,17,16,0.12)",
                      opacity: i === 3 && r % 3 === 0 ? 0.75 : 1,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
