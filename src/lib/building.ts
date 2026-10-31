/**
 * Independent work — things built for their own sake, separate from the
 * client systems in Selected work.
 *
 * Market AI (the Quantsieve repo) and Aster draw their detail from the repos' own briefs.
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
    id: "prop-ai",
    name: "Prop AI",
    tagline: "WhatsApp photos in, a broker’s property page out",
    status: "Building",
    year: "2026",
    blurb:
      "A WhatsApp-to-property-page service for Mumbai brokers. Send photos and details on WhatsApp and get back an Airbnb-style page with your name, RERA number and a WhatsApp button, plus a link per client that alerts you when they open it.",
    points: [
      "Next.js 16 and Supabase, with an admin panel, broker storefronts and share images for link previews and WhatsApp Status.",
      "Next: a 20-broker pilot in Mumbai, then the WhatsApp bot, deployment and payments.",
    ],
    stack: ["Next.js 16", "Supabase", "WhatsApp"],
    accent: "#9c4a6e",
  },
  {
    id: "market-ai",
    name: "Market AI",
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
];
