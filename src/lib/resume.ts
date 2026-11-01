import type { LogoKey } from "@/components/Logo";
export const profile = {
  name: "Abhijit Panchal",
  first: "Abhijit",
  last: "Panchal",
  role: "Software Development Engineer — Full Stack",
  shortRole: "Full Stack Engineer",
  location: "Mumbai, India",
  email: "abhijit.panchal2406@gmail.com",
  phone: "+91-7999173541",
  linkedin: "https://www.linkedin.com/in/abhijit-panchal",
  linkedinLabel: "abhijit-panchal",
  github: "https://github.com/abhijitsp11",
  githubLabel: "abhijitsp11",
  tagline: "I build software for banks and fintech.",
  summary:
    "Full stack software engineer with a B.Tech in Computer Science and 3.5+ years building service-oriented web applications for banks and capital-markets firms. Strong in object-oriented programming, data structures and algorithms, and API design; builds record-matching and batch pipelines over 100,000+ rows per run and search systems over 25M+ records.",
  summary2:
    "I design responsive, data-dense interfaces from reusable component systems, and have shipped on small, highly collaborative teams spread across India, South Korea and Brazil — where confidentiality and integrity of financial data are hard requirements.",
};

export const stats = [
  { value: 3.5, suffix: "+", label: "Years building for finance", decimals: 1 },
  { value: 25, suffix: "M+", label: "Records searched at scale", decimals: 0 },
  { value: 33, suffix: "+", label: "Data-dense screens shipped", decimals: 0 },
  { value: 3, suffix: "", label: "Countries, one team", decimals: 0 },
];

export type Project = {
  id: string;
  slug: string;
  index: string;
  eyebrow: string;
  title: string;
  blurb: string;
  stack: string[];
  points: string[];
  metrics: { value: string; label: string }[];
  org: string;
  year: string;
  accent: string;
  /** Shown as a live indicator on the card. */
  status: "In production" | "Rolling out" | "Delivered";
  /** Short pull-outs the eye can land on before reading anything. */
  highlights: string[];
  /** Company marks shown on the card: the builder first, then the client. */
  logos: LogoKey[];
  /** Phrases inside the blurb to pick out. */
  marks: string[];
  /** The handwritten note pointing at the card's numbers. */
  note: string;
};

export const projects: Project[] = [
  {
    id: "recon",
    marks: ["three independent sources","every mismatch"],
    status: "In production",
    highlights: ["3 sources","binary parsers","zero silent drops"],
    note: "every mismatch, accounted for",
    slug: "reconciliation-platform",
    index: "01",
    eyebrow: "Banking · Reconciliation",
    title: "CMS — Reconciliation Platform",
    org: "Oneture Technologies · UBI Bank",
    year: "2025 — Present",
    accent: "#7c3aed",
    logos: ["oneture","cms"],
    blurb:
      "A reconciliation platform whose matching logic pairs transaction records across three independent sources and flags every mismatch across lakhs of rows.",
    stack: ["Python", "PostgreSQL", "Binary parsing", "Excel"],
    points: [
      "Matching logic pairs records across the ATM switch, ATM electronic journals and the core banking system, flagging every mismatch across 100,000+ rows.",
      "Python parsers decode binary-format machine files into structured records — turning raw data into input that can be matched and audited at scale.",
      "Maintain the multi-source ingestion pipeline and keep each format handler working as upstream files change, then load results and produce formatted Excel output for operations.",
      "Built to be reused rather than tied to one bank — being extended to more banks.",
    ],
    metrics: [
      { value: "100K+", label: "rows per run" },
      { value: "3", label: "independent sources" },
    ],
  },
  {
    id: "billing",
    marks: ["what each bank owes","evidences every line"],
    status: "In production",
    highlights: ["multi-tenant","idempotent","maker-checker"],
    note: "bills that generate themselves",
    slug: "billing-platform",
    index: "02",
    eyebrow: "Banking · Enterprise Billing",
    title: "CMS — Enterprise Billing Platform",
    org: "Oneture Technologies · Axis Bank, SBI",
    year: "2025",
    accent: "#2563eb",
    logos: ["oneture","cms"],
    blurb:
      "Generates the bills banks such as Axis and SBI owe for cash management and cash van services, across multiple states, on a schedule and without manual effort.",
    stack: ["Python", "FastAPI", "Celery", "PostgreSQL", "React", "Vite"],
    points: [
      "Bill generation runs on Celery workers and Python cron jobs, so billing cycles run on a schedule instead of by hand.",
      "Retries and idempotency mean a re-run never double-bills. Bills are generated for banks like Axis and SBI across multiple states.",
      "Configuration-driven, multi-tenant rate engine — object-oriented rate-card, SLA and deduction models — so a new bank, state or provider is onboarded through configuration rather than code.",
      "Designed the complete application UI and the workflow for cash management and cash van billing, and built the Python backend, with maker-checker approval enforced via JWT and RBAC.",
    ],
    metrics: [
      { value: "2+", label: "banks billed" },
      { value: "2", label: "billing services" },
    ],
  },
  {
    id: "mirae",
    marks: ["safekeeps bonds","settles their trades","three countries"],
    status: "Delivered",
    highlights: ["SWIFT MT/MX","2 regulators","AG Grid"],
    note: "shipped across three time zones",
    slug: "bond-custodian",
    index: "03",
    eyebrow: "Capital Markets · Securities Settlement",
    title: "Mirae Asset — Bond Custodian Platform",
    org: "Oneture Technologies · South Korea & Brazil",
    year: "2024 — 2025",
    accent: "#d9680c",
    logos: ["oneture","mirae"],
    blurb:
      "A bond custodian platform that safekeeps bonds for investors and settles their trades, delivered by a small cross-functional team spread across three countries.",
    stack: ["React", "Redux", "AG Grid", "C# / .NET", "SWIFT MT/MX"],
    points: [
      "Object-oriented C#/.NET REST services implementing SWIFT MT and MX messaging so transaction records met regulatory reporting obligations in Brazil and South Korea.",
      "Supported millions of BRL in daily settlements.",
      "Built 33+ responsive, data-dense interactive screens for settlements, securities, corporate actions and reconciliation; migrated the build from CRA to Vite.js.",
      "Ran requirement analysis and solution design with clients — specifications, flowcharts and API contracts — enforcing confidentiality through JWT, RBAC scoping and encryption.",
    ],
    metrics: [
      { value: "33+", label: "interactive screens" },
      { value: "3", label: "countries, one team" },
    ],
  },
  {
    id: "taiyo",
    marks: ["25M+ records","calls the right tools"],
    status: "Delivered",
    highlights: ["agentic tool-calls", "25M+ records", "4h → 3min"],
    note: "the agent does the digging now",
    slug: "ai-platform",
    index: "04",
    eyebrow: "B2B SaaS · AI Infrastructure",
    title: "Taiyo.AI — AI Infrastructure Platform",
    org: "Taiyo.AI · San Francisco",
    year: "2023 — 2024",
    accent: "#dc2626",
    logos: ["taiyo"],
    blurb:
      "An infrastructure-intelligence platform over 25M+ records, with an AI agent that plans a question, calls the right tools and comes back with an answer.",
    stack: ["React", "Elasticsearch", "Redis", "OpenAI", "Python"],
    points: [
      "Built an AI agent that decomposes a question, calls search, filter and summarise tools in sequence, and assembles the result — rather than answering from a single prompt.",
      "Diagnosed Elasticsearch bottlenecks and designed multi-tier caching: API latency 5s to 0.8s, infrastructure spend down $3,200 a month.",
    ],
    metrics: [
      { value: "25M+", label: "records searched" },
      { value: "4h → 3min", label: "to an insight" },
      { value: "50+", label: "enterprise clients" },
    ],
  },
];

export const experience = [
  {
    role: "Full Stack Software Engineer",
    company: "Oneture Technologies",
    logo: "oneture" as LogoKey | undefined,
    tech: ["Python","FastAPI","React","C# / .NET","PostgreSQL","AWS"],
    metric: "4 platforms",
    metricLabel: "banks and capital markets",
    location: "Mumbai, India",
    period: "Dec 2024 — Present",
    current: true,
    points: [
      "Build reconciliation, billing and custodian platforms for banks and capital-markets firms.",
      "Own both the service layer and the data-dense React interfaces on top of it.",
      "Nominated for Team of the Year as part of a 4-developer Mirae Asset team.",
    ],
  },
  {
    role: "Frontend Engineer",
    company: "Taiyo.AI",
    logo: "taiyo" as LogoKey | undefined,
    tech: ["React","Elasticsearch","Redis","OpenAI"],
    metric: "5s → 0.8s",
    metricLabel: "API latency, after caching",
    location: "San Francisco, USA (Remote)",
    period: "Jul 2023 — Sep 2024",
    current: false,
    points: [
      "Scaled an analytics platform serving 50+ enterprise clients over a 25M+-record dataset, cutting insight generation from 4 hours to 3 minutes.",
      "Diagnosed Elasticsearch query bottlenecks and designed multi-tier caching — API latency 5s to 0.8s, infrastructure spend down $3,200/month.",
      "Built a Gen-AI news module on OpenAI streaming APIs for 100+ users, cutting token costs 45%; A/B-tested prompts lowered hallucination from 12% to 7.8%.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "My Next Film",
    logo: undefined as LogoKey | undefined,
    tech: ["React","Python","Django"],
    metric: "4.2s → 3.1s",
    metricLabel: "homepage load",
    location: "Delhi, India (Remote)",
    period: "Oct 2022 — Apr 2023",
    current: false,
    points: [
      "Built full stack features with React.js, Python and Django REST APIs; cut homepage load from 4.2s to 3.1s, lifting 30-day retention 15%.",
      "Cleared 60+ Jira defects across 3 sprints, eliminating 80% of the backlog and unblocking a delayed launch.",
    ],
  },
];

export const skills = [
  {
    group: "Languages (OOP)",
    items: ["C#", "Java", "Python", "TypeScript", "JavaScript (ES6+)", "SQL"],
  },
  {
    group: "CS Fundamentals",
    items: [
      "Data structures & algorithms",
      "Object-oriented design",
      "Design patterns",
      "System design",
    ],
  },
  {
    group: "Backend & Services",
    items: [
      ".NET (C#)",
      "FastAPI",
      "Django",
      "Node.js",
      "Express.js",
      "REST APIs",
      "Service-oriented architecture",
      "Microservices",
    ],
  },
  {
    group: "Frontend & Data Viz",
    items: [
      "React.js",
      "Next.js",
      "Redux",
      "AG Grid",
      "Vite.js",
      "Tailwind CSS",
      "Interactive dashboards",
      "Reusable component libraries",
      "UI/UX design",
    ],
  },
  {
    group: "Data at Scale",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Elasticsearch",
      "Redis caching",
      "Schema design",
      "Indexing",
      "Query optimization",
    ],
  },
  {
    group: "Infrastructure & Automation",
    items: [
      "AWS (EC2, RDS, S3, VPC, Cognito)",
      "Docker",
      "CI/CD",
      "GitHub Actions",
      "Celery",
      "cron",
      "Git",
    ],
  },
  {
    group: "Security",
    items: ["OAuth 2.0", "JWT", "RBAC", "AES encryption", "Maker-checker controls"],
  },
  {
    group: "Domain",
    items: [
      "SWIFT MT/MX",
      "ISO 15022/20022",
      "Securities settlement",
      "Bank reconciliation",
      "Billing",
    ],
  },
];

export const education = {
  school: "Avantika University",
  degree: "B.Tech, Computer Science & Engineering",
  location: "Ujjain, India",
  period: "Jun 2019 — May 2023",
};

export const achievements = [
  "Nominated for Team of the Year at Oneture as part of a 4-developer Mirae Asset team.",
  "Drove an 84% API latency cut at Taiyo.AI and a 26% page-speed gain at My Next Film.",
];

export const marqueeWords = [
  "Full Stack",
  "Fintech",
  "SWIFT MT/MX",
  "React",
  "Python",
  "C# / .NET",
  "PostgreSQL",
  "AWS",
  "System Design",
];
