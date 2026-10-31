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
    tab: "being chef",
    path: "chef",
    title: "I cook",
    line: "dal khichdi & uttapam",
    detail:
      "A properly good bowl of dal khichdi is my house speciality, and I will argue about the tempering. Uttapam is the other one I have got down.",
    image: null,
    tint: "#9c4a6e",
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
    tint: "#c9584a",
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
    tint: "#d62d46",
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
    tint: "#a8324a",
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
    tint: "#8a5a5e",
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
    tint: "#b8704a",
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
  /** Poster under /public/posters. */
  poster?: string;
};

export const films: Film[] = [
  { title: "Business Proposal", year: "2022", note: "The comfort watch: a rom-com that never takes itself seriously.", tint: "#d62d46", poster: "/posters/business-proposal.jpg" },
  { title: "Musafir Cafe", year: "—", note: "Slow, warm and easy to rewatch.", tint: "#c9584a", poster: "/posters/musafir-cafe.jpg" },
  { title: "Jubilee", year: "2023", note: "Old Bollywood, and the craft behind building it.", tint: "#a8324a", poster: "/posters/jubilee.jpg" },
  { title: "Goblin", year: "2016", note: "Fantasy, grief and a long wait, all in one drama.", tint: "#9c4a6e", poster: "/posters/goblin.jpg" },
  { title: "Naruto", year: "2002", note: "The one I grew up on, and still the one I recommend first.", tint: "#d9680c", poster: "/posters/naruto.jpg" },
  { title: "The Hangover", year: "2009", note: "Switch your brain off and laugh.", tint: "#8a5a5e", poster: "/posters/the-hangover.jpg" },
];

export type Artwork = {
  title: string;
  medium: string;
  src: string | null;
  tint: string;
};

export const artworks: Artwork[] = [
  { title: "Krishna with a lotus", medium: "Watercolour", src: "/art/krishna-lotus.jpg", tint: "#2e6fa8" },
  { title: "Krishna and Radha", medium: "Watercolour", src: "/art/radha-krishna.jpg", tint: "#c9584a" },
];

/** Portrait in the about tab. Drop a file in /public/photos and set `src`. */
export const portrait = {
  src: "/photos/self.jpeg" as string | null,
  /** The photo is a tall beach shot with the subject low in the frame, so the crop leans down. */
  position: "50% 82%",
  caption: "that's me",
  tint: "#d62d46",
};

export type Photo = {
  caption: string;
  src: string | null;
  tint: string;
};

export const photos: Photo[] = [
  { caption: "somebody's new profile picture", src: null, tint: "#c9584a" },
  { caption: "golden hour, somewhere coastal", src: null, tint: "#9c4a6e" },
  { caption: "the city, from a train window", src: null, tint: "#8a5a5e" },
];

/**
 * The prints on the hanging line: real photographs from the trips, in
 * /public/photos/trips. Captions describe what each one shows rather than
 * naming a place, since the file names alone do not say where they were taken
 * — put a location in `where` when you want one shown.
 */
export type Place = {
  /** The print's title, written under the photograph. */
  name: string;
  kind: "Beach" | "City" | "Hills";
  caption: string;
  image: string;
  /** Optional: where it was taken. Shown after the kind when set. */
  where?: string;
};

export const travel = {
  line: "beaches first, hills second",
  places: [
    {
      name: "Last light",
      kind: "Beach",
      caption: "Palms against the last of the sun.",
      image: "/photos/trips/cabo.jpeg",
    },
    {
      name: "Blue hour",
      kind: "City",
      caption: "The Taj, lit up after dark.",
      image: "/photos/trips/taj.jpeg",
    },
    {
      name: "Quiet shore",
      kind: "Beach",
      caption: "Clouds stacking up over an empty stretch of sand.",
      image: "/photos/trips/beach.jpeg",
    },
    {
      name: "Above the cloud",
      kind: "Hills",
      caption: "A bridge disappearing into the monsoon.",
      image: "/photos/trips/bridge.jpeg",
    },
    {
      name: "Golden hour",
      kind: "City",
      caption: "Mumbai's skyline against the evening sea.",
      image: "/photos/trips/marine.jpeg",
    },
    {
      name: "After the rain",
      kind: "Hills",
      caption: "Green ridges, and a village tucked below.",
      image: "/photos/trips/mountain.jpeg",
    },
  ] as Place[],
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
    name: "Market AI",
    line: "I got tired of doing step one and two by hand, so I built a tool that does them.",
    href: "#building",
  },
};
