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
  title: string;
  line: string;
  detail: string;
};

export const interests: Interest[] = [
  {
    id: "cook",
    icon: "pan",
    title: "I cook",
    line: "dal khichdi & uttapam",
    detail:
      "A properly good bowl of dal khichdi is my house speciality, and I will argue about the tempering. Uttapam is the other one I have got down.",
  },
  {
    id: "photo",
    icon: "camera",
    title: "I shoot",
    line: "usually other people's profiles",
    detail:
      "I take the pictures; my friends post them. A fair trade, mostly. Faces, streets, and whatever the light is doing that evening.",
  },
  {
    id: "film",
    icon: "film",
    title: "I watch",
    line: "films, properly",
    detail:
      "Not background noise — phone away, lights off. I will happily lose an evening to something slow if the craft is there.",
  },
  {
    id: "paint",
    icon: "brush",
    title: "I paint",
    line: "when I need to think",
    detail:
      "The one hobby with no keyboard. It is the closest thing I have to switching the analytical part off for a few hours.",
  },
  {
    id: "travel",
    icon: "trail",
    title: "I travel",
    line: "beaches, and the odd trek",
    detail:
      "Give me a free weekend and I am on a beach somewhere within reach. In between, the Sahyadris around Mumbai and Pune.",
  },
  {
    id: "markets",
    icon: "chart",
    title: "I trade",
    line: "and read far too much research",
    detail:
      "Building for banks all day turned into an actual interest in markets. I research, I take positions, and I keep notes on both.",
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

export const travel = {
  line: "beaches first, hills second",
  places: [
    { name: "Alibaug", kind: "Beach", near: "Raigad" },
    { name: "Kashid", kind: "Beach", near: "Raigad" },
    { name: "Gokarna", kind: "Beach", near: "Karnataka" },
    { name: "Rajmachi", kind: "Trek", near: "Pune" },
    { name: "Kalsubai", kind: "Trek", near: "Nashik" },
    { name: "Sandhan Valley", kind: "Trek", near: "Pune" },
  ],
  note: "Almost every trip ends up pointed at a beach. The treks happen when the Sahyadris are green and somebody talks me into waking up at four.",
};

export const markets = {
  line: "markets, on the other screen",
  body: "Writing settlement and reconciliation systems made me curious about what the trades actually are. Now I research, trade, and keep a running set of notes on what I got wrong.",
  tags: ["Equity research", "Technical setups", "Position sizing", "Post-trade journals"],
};
