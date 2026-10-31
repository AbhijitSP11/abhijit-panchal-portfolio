/**
 * The off-the-clock half of the site.
 *
 * IMAGES: art and photo entries take a `src` under /public. While `src` is
 * null the component draws a styled placeholder instead, so the layout is
 * final and you only need to drop files in and fill the path.
 *   public/art/*     — paintings
 *   public/photos/*  — photographs
 */

export const offTheClockIntro = {
  kicker: "04 / Off the clock",
  heading: "what I do when",
  headingAccent: "nothing is on fire.",
  body: "Most of my week is spent making sure other people's money lands where it should. The rest of it looks like this.",
};

export type Interest = {
  id: string;
  icon: "pan" | "camera" | "film" | "brush" | "trail" | "chart";
  /** Tab label in the browser chrome. */
  tab: string;
  /** Path segment shown in the fake address bar. */
  path: string;
  title: string;
  line: string;
  detail: string;
  /** A picture for this interest; null draws a placeholder. */
  image: string | null;
  tint: string;
  /** Small chips under the copy. */
  chips?: string[];
};

export const interests: Interest[] = [
  {
    id: "cook",
    icon: "pan",
    tab: "kitchen",
    path: "kitchen",
    title: "I cook",
    line: "dal khichdi & uttapam",
    detail:
      "A properly good bowl of dal khichdi is my house speciality, and I will argue about the tempering. Uttapam is the other one I have got down.",
    image: null,
    tint: "#b05a7a",
    chips: ["Dal khichdi", "Uttapam", "Opinions about tempering"],
  },
  {
    id: "photo",
    icon: "camera",
    tab: "camera roll",
    path: "photos",
    title: "I shoot",
    line: "usually other people's profiles",
    detail:
      "I take the pictures; my friends post them. A fair trade, mostly. Faces, streets, and whatever the light is doing that evening.",
    image: null,
    tint: "#4f46e5",
  },
  {
    id: "film",
    icon: "film",
    tab: "watchlist",
    path: "films",
    title: "I watch",
    line: "films, properly",
    detail:
      "Not background noise — phone away, lights off. I will happily lose an evening to something slow if the craft is there.",
    image: null,
    tint: "#1d4ed8",
  },
  {
    id: "paint",
    icon: "brush",
    tab: "studio",
    path: "paintings",
    title: "I paint",
    line: "when I need to think",
    detail:
      "The one hobby with no keyboard. It is the closest thing I have to switching the analytical part off for a few hours.",
    image: null,
    tint: "#7c3aed",
  },
  {
    id: "travel",
    icon: "trail",
    tab: "trips",
    path: "trips",
    title: "I travel",
    line: "beaches, and the odd trek",
    detail:
      "Give me a free weekend and I am on a beach somewhere within reach. In between, the Sahyadris around Mumbai and Pune.",
    image: null,
    tint: "#2e5f8a",
  },
  {
    id: "markets",
    icon: "chart",
    tab: "markets",
    path: "markets",
    title: "I trade",
    line: "and read far too much research",
    detail:
      "Building for banks all day turned into an actual interest in markets. I research, I take positions, and I keep notes on both.",
    image: null,
    tint: "#166534",
  },
];

/**
 * PLACEHOLDER CONTENT — these are stand-ins so the section is finished and
 * interactive. Swap the titles, years and notes for your real picks.
 */
export type Film = {
  title: string;
  year: string;
  note: string;
  tint: string;
};

export const films: Film[] = [
  { title: "Your pick 01", year: "—", note: "The one you rewatch every year.", tint: "#1d4ed8" },
  { title: "Your pick 02", year: "—", note: "The one that changed how you see films.", tint: "#4f46e5" },
  { title: "Your pick 03", year: "—", note: "The comfort watch.", tint: "#7c3aed" },
  { title: "Your pick 04", year: "—", note: "The one nobody else liked.", tint: "#b05a7a" },
  { title: "Your pick 05", year: "—", note: "The one you recommend first.", tint: "#2e5f8a" },
];

export type Artwork = {
  title: string;
  medium: string;
  src: string | null;
  tint: string;
};

export const artworks: Artwork[] = [
  { title: "Untitled 01", medium: "Acrylic on canvas", src: null, tint: "#1d4ed8" },
  { title: "Untitled 02", medium: "Watercolour", src: null, tint: "#b05a7a" },
  { title: "Untitled 03", medium: "Ink on paper", src: null, tint: "#2e3129" },
  { title: "Untitled 04", medium: "Acrylic on canvas", src: null, tint: "#7c3aed" },
];

/** Portrait in the about tab. Drop a file in /public/photos and set `src`. */
export const portrait = {
  src: null as string | null,
  caption: "that's me",
  tint: "#1d4ed8",
};

export type Photo = {
  caption: string;
  src: string | null;
  tint: string;
};

export const photos: Photo[] = [
  { caption: "somebody's new profile picture", src: null, tint: "#4f46e5" },
  { caption: "golden hour, somewhere coastal", src: null, tint: "#b05a7a" },
  { caption: "the city, from a train window", src: null, tint: "#2e5f8a" },
];

/**
 * Travel prints on the hanging line. `image` is null until you drop a photo
 * into /public/photos and fill the path; until then the carousel paints a
 * landscape from `palette` and `seed`, so the line is never empty.
 */
export type Place = {
  name: string;
  kind: "Beach" | "Trek";
  near: string;
  caption: string;
  palette: "dawn" | "alpine" | "dusk" | "mist";
  seed: number;
  image: string | null;
};

export const travel = {
  line: "beaches first, hills second",
  places: [
    {
      name: "Alibaug",
      kind: "Beach",
      near: "Raigad",
      caption: "The default weekend. Ferry across, and the week is gone.",
      palette: "dawn",
      seed: 3,
      image: null,
    },
    {
      name: "Kashid",
      kind: "Beach",
      near: "Raigad",
      caption: "Quieter sand than Alibaug, if you leave early enough.",
      palette: "dusk",
      seed: 8,
      image: null,
    },
    {
      name: "Gokarna",
      kind: "Beach",
      near: "Karnataka",
      caption: "Worth the overnight. Four beaches, one long walk.",
      palette: "dawn",
      seed: 14,
      image: null,
    },
    {
      name: "Rajmachi",
      kind: "Trek",
      near: "Pune",
      caption: "Monsoon green, and the fort still up there in the cloud.",
      palette: "alpine",
      seed: 21,
      image: null,
    },
    {
      name: "Kalsubai",
      kind: "Trek",
      near: "Nashik",
      caption: "The highest point in Maharashtra. Ladders near the top.",
      palette: "mist",
      seed: 34,
      image: null,
    },
    {
      name: "Sandhan Valley",
      kind: "Trek",
      near: "Pune",
      caption: "A canyon you walk down into. Cold, narrow, no phone signal.",
      palette: "alpine",
      seed: 55,
      image: null,
    },
  ] satisfies Place[],
  note: "Almost every trip ends up pointed at a beach. The treks happen when the Sahyadris are green and somebody talks me into waking up at four.",
};

export const markets = {
  line: "markets, on the other screen",
  body: "Writing settlement and reconciliation systems made me curious about what the trades actually are. Now I research, trade, and keep a running set of notes on what I got wrong.",
  tags: ["Equity research", "Technical setups", "Position sizing", "Post-trade journals"],
  /** How a position actually gets taken, start to finish. */
  process: [
    {
      n: "01",
      title: "Screen",
      text: "Filter the universe on fundamentals before a chart is ever opened.",
    },
    {
      n: "02",
      title: "Read",
      text: "Filings, concalls and the news around them — the story behind the ratio.",
    },
    {
      n: "03",
      title: "Size",
      text: "Decide the loss I am willing to take before deciding the entry.",
    },
    {
      n: "04",
      title: "Journal",
      text: "Write down the thesis. Revisit it when it is wrong, which is the useful half.",
    },
  ],
  /** Where the interest turned into something built. */
  built: {
    name: "Quantsieve",
    line: "I got tired of doing step one and two by hand, so I built a tool that does them.",
    href: "#building",
  },
};
