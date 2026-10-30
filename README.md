# Abhijit Panchal — Portfolio

Animated personal portfolio for a full stack software engineer working in
fintech. Content comes from `src/lib/resume.ts`.

## Stack

| Layer      | Choice                                      |
| ---------- | ------------------------------------------- |
| Framework  | Next.js 15 (App Router), React 19           |
| Language   | TypeScript                                  |
| Styling    | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Animation  | GSAP 3.13 + ScrollTrigger                   |
| Scrolling  | Lenis (smooth scroll, drives ScrollTrigger) |
| Fonts      | Space Grotesk, Instrument Serif, JetBrains Mono |

The page is fully static — no server runtime, so it deploys anywhere (Vercel,
Netlify, GitHub Pages with an export, any static host).

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

> Don't run `npm run build` while `npm run dev` is live — the build overwrites
> `.next` and the dev server starts returning 500s. Stop dev first, or delete
> `.next` and restart it.

## Editing the content

Everything on the page is driven by `src/lib/resume.ts`: profile details, the
stat counters, projects, experience, skills, education and achievements. Change
that file and the whole site follows — no component edits needed.

## Animation map

| Component          | What it does                                                        |
| ------------------ | ------------------------------------------------------------------- |
| `Preloader`        | Counting percentage, blueprint rules, name fills from its outline, curtain lift |
| `SmoothScroll`     | Lenis loop wired into the GSAP ticker; owns in-page anchor scrolling |
| `Hero`             | Parallax cards (mouse + scroll), ghosted name, masked word reveal    |
| `Marquee`          | Ticker that reverses with scroll direction and shears with velocity  |
| `Statement`        | Masked word reveal plus a hand-drawn rule that strokes on            |
| `Stats`            | Counters that run up when scrolled into view                         |
| `Work`             | Per-project reveals, mock console lifting in, scrubbed index numerals |
| `Experience`       | Timeline spine that fills as you scroll through it                   |
| `Contact`          | Magnetic email button                                                |
| `Nav` / `ScrollRail` | Colour inversion over dark sections; right-edge progress rail      |

`prefers-reduced-motion` is honoured throughout — the preloader is skipped,
Lenis stays off, and every reveal renders in its final state.

## Notes

- Section backgrounds marked `data-nav="dark"` tell the nav to invert itself.
- Custom classes live in `@layer components` in `globals.css` so Tailwind
  utilities keep winning over them.
- The project "screenshots" are CSS mockups in `ProjectMock.tsx`. Swap them for
  real images when you have them (these are client systems, so check first).
