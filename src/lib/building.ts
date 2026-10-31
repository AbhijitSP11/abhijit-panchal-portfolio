/**
 * Independent work — things built for their own sake, separate from the
 * client systems in Selected work.
 *
 * Quantsieve's detail comes from the repo's own brief; Aster's from its
 * README and thumbnail. ListKaro has no public repo yet, so its copy is a
 * placeholder — replace `blurb` and `points` with your own words.
 */

export type BuildStatus = "Live" | "Building" | "Early";

export type Build = {
  id: string;
  name: string;
  /** The plain-English version of what it is. */
  tagline: string;
  status: BuildStatus;
  year: string;
  blurb: string;
  points: string[];
  stack: string[];
  accent: string;
  repo?: string;
  caseStudy?: string;
  /** True while the copy is a stand-in. */
  placeholder?: boolean;
};

export const builds: Build[] = [
  {
    id: "quantsieve",
    name: "Quantsieve",
    tagline: "Reads a company, then tells you what it thinks",
    status: "Live",
    year: "2026",
    blurb:
      "An AI stock evaluator for Indian retail investors. Give it a ticker and your investor profile; it pulls the live financials, the filings and the news, runs them through a fifteen-step institutional framework, and comes back with a verdict and the evidence behind it.",
    points: [
      "Scrapes Screener.in and Trendlyne for financials, beta and analyst consensus, then aggregates news from BSE, NSE and three news APIs.",
      "Runs 20+ deterministic SWOT signals locally before any model is called, so the rule-based findings are reproducible and cost nothing.",
      "Claude handles the judgement and a separate parallel pass on news sentiment; every response is validated with Zod before it is trusted.",
      "Returns one of five verdicts — buy, buy with caution, wait, not suitable, avoid — with reports saved to Supabase behind Google sign-in.",
    ],
    stack: ["TypeScript", "Node 22", "Express 5", "React", "Supabase", "Claude API", "Zod"],
    accent: "#d62d46",
    repo: "https://github.com/AbhijitSP11/quantsieve",
  },
  {
    id: "aster",
    name: "Aster",
    tagline: "Ask your project data a question in English",
    status: "Live",
    year: "2025",
    blurb:
      "A project management tool with real-time dashboards and an assistant that turns a plain-English question into SQL, runs it, and shows you the rows. Built end to end — schema, API, infrastructure and interface.",
    points: [
      "Groq-backed assistant converts natural-language questions to SQL at 92% accuracy against the live schema.",
      "Production AWS provisioned from scratch — VPC, EC2, RDS and Cognito — with RBAC applied at the data layer so generated queries inherit the caller's scope.",
    ],
    stack: ["Next.js", "TypeScript", "Express", "Prisma", "PostgreSQL", "AWS", "Groq"],
    accent: "#a8324a",
    repo: "https://github.com/AbhijitSP11/aster",
    caseStudy: "/work/aster",
  },
  {
    id: "listkaro",
    name: "ListKaro",
    tagline: "Lists, shared — without the group chat",
    status: "Building",
    year: "In progress",
    blurb:
      "Placeholder copy — tell me what ListKaro actually does and I will write this properly.",
    points: [
      "No public repo yet, so nothing here is drawn from the source.",
      "Replace this entry in src/lib/building.ts with the real description.",
    ],
    stack: ["TBC"],
    accent: "#9c4a6e",
    placeholder: true,
  },
];
