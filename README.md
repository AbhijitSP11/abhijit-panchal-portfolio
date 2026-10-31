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
| Fonts      | DM Sans, Instrument Serif, Caveat, JetBrains Mono |

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

## Routes

| Route           | What it is                                        |
| --------------- | ------------------------------------------------- |
| `/`             | The single-page portfolio                          |
| `/work/[slug]`  | A long-form case study per project (4, prerendered) |

## Editing the content

Two files drive everything:

- `src/lib/resume.ts` — profile, stat counters, projects, experience, skills,
  education, achievements, hero cards.
- `src/lib/case-studies.ts` — the long-form case study behind each project:
  overview, insights, the passes it took, results.

A project links to its case study through its `slug`, which must match a slug in
`case-studies.ts`. Change these files and the whole site follows.

## Animation map

| Component          | What it does                                                        |
| ------------------ | ------------------------------------------------------------------- |
| `Preloader`        | Counting percentage on the paper background, name filling from its outline, curtain lift. Kept under ~2.5s. |
| `SmoothScroll`     | Lenis loop wired into the GSAP ticker; owns in-page anchor scrolling |
| `Hero`             | Drawn underline, name revealed letter by letter, tilted cards        |
| `Character`        | Original chibi ninja perched on the name — idle bob, fluttering ties, blink, waves on hover |
| `Marquee`          | Ticker that reverses with scroll direction and shears with velocity  |
| `WordScroll`       | Sticky panel whose words light up one at a time as you scroll past   |
| `TabsWindow`       | Fake browser chrome — tabs switch as you scroll, address bar retypes |
| `CaseStudyView`    | Case study page: reading progress, pass stepper, counting results    |
| `Stats`            | Counters that run up when scrolled into view                         |
| `Work`             | Per-project reveals, mock console lifting in, scrubbed index numerals |
| `Experience`       | Timeline spine that fills as you scroll through it                   |
| `Contact`          | Magnetic email button                                                |
| `Nav` / `ScrollRail` | Colour inversion over dark sections; right-edge progress rail      |

`prefers-reduced-motion` is honoured throughout — the preloader is skipped,
Lenis stays off, and every reveal renders in its final state.

## Notes

- Section backgrounds marked `data-nav="dark"` tell the nav to invert itself.
- `src/lib/preloader-state.ts` is the single source of truth for "intro
  finished". It is a module-level flag on purpose: this used to be a
  React-rendered `<body data-loading>` attribute, and re-renders reset it,
  which re-locked scrolling through CSS. It also carries a failsafe timeout so
  an interrupted intro can never strand the page behind a locked overlay.
- The character is drawn from scratch. It is not, and should not be replaced
  with, a copyrighted character.
- Custom classes live in `@layer components` in `globals.css` so Tailwind
  utilities keep winning over them.
- The project "screenshots" are CSS mockups in `ProjectMock.tsx`. Swap them for
  real images when you have them (these are client systems, so check first).

## Dropping in your own images

Art and photo entries in `src/lib/personal.ts` carry a `src` that is `null`
until you have a file. While it is null the component draws a styled
placeholder, so the layout is already final:

1. Put files in `public/art/` or `public/photos/`.
2. Set the entry's `src`, e.g. `src: "/art/01.jpg"`.

The favourite-films list in the same file is placeholder text — swap the
titles, years and notes for your real picks.
