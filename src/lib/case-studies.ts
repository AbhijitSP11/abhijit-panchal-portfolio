/**
 * Long-form case studies behind each project card. Structure mirrors how the
 * work actually went: the situation, what made it hard, the passes it took,
 * and what came out the other side.
 */

export type Iteration = {
  label: string;
  title: string;
  points: string[];
  outcome: string;
  outcomeKind: "problem" | "win";
};

export type CaseStudy = {
  slug: string;
  title: string;
  lede: string;
  blurb: string;
  accent: string;
  meta: { label: string; value: string }[];
  overview: { heading: string; body: string[] };
  problem: { heading: string; question: string; body: string };
  insights: { n: string; text: string }[];
  iterations: Iteration[];
  results: { value: string; label: string; note?: string }[];
  closing: string;
  stack: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "reconciliation-platform",
    title: "CMS — Reconciliation Platform",
    lede: "Three sources, one truth. Across lakhs of rows.",
    blurb:
      "A bank reconciliation platform that pairs transaction records across three independent systems and flags every mismatch.",
    accent: "#7c3aed",
    meta: [
      { label: "Role", value: "Full stack engineer" },
      { label: "Client", value: "UBI Bank" },
      { label: "At", value: "Oneture Technologies" },
      { label: "Scale", value: "Lakhs of rows" },
      { label: "Year", value: "2025 — present" },
    ],
    overview: {
      heading: "What reconciliation actually means here.",
      body: [
        "Every ATM transaction leaves a trace in three places: the switch that authorised it, the electronic journal on the machine, and the core banking system that moved the money.",
        "When all three agree, nothing needs doing. When they do not, someone has to find the row and explain it, because each disagreement is somebody’s money.",
      ],
    },
    problem: {
      heading: "The problem",
      question: "How do you compare records that were never designed to be compared?",
      body: "The three sources arrive in different shapes, and the machine journals are binary files that no one can read by eye.",
    },
    insights: [
      { n: "01", text: "Binary machine files have to become structured data before anything can be matched." },
      { n: "02", text: "Three feeds, three formats, all kept current by hand until now." },
      { n: "03", text: "Operations work in Excel, so the result has to land in a sheet they can use." },
    ],
    iterations: [
      {
        label: "Pass 01",
        title: "Make the files readable",
        points: [
          "Python scripts that turn the binary files into formatted, structured data.",
        ],
        outcome: "Raw machine output became something that could be checked at all.",
        outcomeKind: "win",
      },
      {
        label: "Pass 02",
        title: "One flow for all three sources",
        points: [
          "Switch files, electronic journals and core banking data kept running through the same process.",
          "Formatted Excel output for operations, and the same data loaded into the database.",
        ],
        outcome: "Operations get one place to work from instead of three feeds.",
        outcomeKind: "win",
      },
    ],
    results: [
      { value: "Lakhs", label: "of data rows handled" },
      { value: "3", label: "independent sources paired" },
    ],
    closing:
      "Built to be reused: the same approach is being extended to more banks rather than rebuilt for each one.",
    stack: ["Python", "Excel", "Database"],
  },
  {
    slug: "billing-platform",
    title: "CMS — Enterprise Billing Platform",
    lede: "Bank bills, generated on a schedule.",
    blurb:
      "Generates the bills banks owe for cash management and cash van services, across multiple states.",
    accent: "#2563eb",
    meta: [
      { label: "Role", value: "Full stack engineer" },
      { label: "Clients", value: "Axis Bank, SBI and others" },
      { label: "At", value: "Oneture Technologies" },
      { label: "Services", value: "Cash management, cash van" },
      { label: "Year", value: "2025" },
    ],
    overview: {
      heading: "Billing for moving cash.",
      body: [
        "Banks pay a provider to manage their cash and to move it by van, the cash-in-transit side of banking. Every cycle, someone has to work out what each bank owes, in each state, and produce a bill.",
        "The platform generates those bills, with one workflow for cash management and one for cash van billing.",
      ],
    },
    problem: {
      heading: "The problem",
      question: "How do you bill many banks, in many states, the same dependable way?",
      body: "Every bank and state brings its own rates, service levels and deductions. Coding each one separately would not scale past the first few.",
    },
    insights: [
      { n: "01", text: "Rates, SLAs and deductions differ by bank and by state, so the rules have to be data, not code." },
      { n: "02", text: "A run must be safe to repeat. A retry should never bill the same thing twice." },
      { n: "03", text: "Finance needs to see who changed what: the person who raises a change should not be the one who approves it." },
    ],
    iterations: [
      {
        label: "Pass 01",
        title: "Rules as configuration",
        points: [
          "Object-oriented rate-card, SLA and deduction models.",
          "A new bank, state or provider is added through configuration, not a release.",
          "The billing schema covers GST and FASTag charges.",
        ],
        outcome: "Onboarding another bank stopped needing new code.",
        outcomeKind: "win",
      },
      {
        label: "Pass 02",
        title: "Bills that run themselves",
        points: [
          "Celery workers, Redis and Python cron jobs generate bills on a schedule, in batches.",
          "Retries and idempotency keys mean a re-run recomputes rather than re-bills.",
        ],
        outcome: "Billing cycles run without someone driving each step.",
        outcomeKind: "win",
      },
      {
        label: "Pass 03",
        title: "The workflow and the screens",
        points: [
          "Designed the full application UI and the cash management and cash van billing workflow.",
          "Built the Python backend behind it.",
          "Maker-checker approval enforced through JWT and RBAC.",
        ],
        outcome: "Operations and finance work from one system, with approvals that are traceable.",
        outcomeKind: "win",
      },
    ],
    results: [
      { value: "2+", label: "banks billed" },
      { value: "2", label: "billing services" },
      { value: "Multi", label: "state coverage" },
    ],
    closing:
      "The interesting part was never the bill itself. It was making sure a re-run at 2am gives the same answer as the first run.",
    stack: ["Python", "FastAPI", "Celery", "Redis", "PostgreSQL", "React", "Vite"],
  },
  {
    slug: "bond-custodian",
    title: "Mirae Asset — Bond Custodian Platform",
    lede: "Settling bonds across two regulators and three time zones.",
    blurb:
      "A custodian platform that safekeeps bonds for investors and settles their trades, built by a small team spread across three countries.",
    accent: "#d9680c",
    meta: [
      { label: "Role", value: "Full stack engineer" },
      { label: "Client", value: "Mirae Asset" },
      { label: "Markets", value: "South Korea & Brazil" },
      { label: "Team", value: "4 developers, 3 countries" },
      { label: "Year", value: "2024 — 2025" },
    ],
    overview: {
      heading: "What a custodian platform has to get right.",
      body: [
        "A custodian holds securities on behalf of investors and settles their trades. When a bond changes hands, the platform has to move it, record it, and report it in the exact shape each regulator expects.",
        "The team was four developers plus analysts, testers and architects, spread across India, South Korea and Brazil — which meant the specification had to carry the context that a shared room usually would.",
      ],
    },
    problem: {
      heading: "The problem",
      question: "How do you satisfy two regulators with one settlement engine?",
      body: "Brazil and South Korea both mandate financial messaging, but their reporting obligations differ. Getting a message shape wrong is not a bug report — it is a compliance failure on a live settlement.",
    },
    insights: [
      { n: "01", text: "SWIFT MT and MX are standards, but each market applies them its own way." },
      { n: "02", text: "Settlement data is dense. Operators need hundreds of rows on screen without losing the thread." },
      { n: "03", text: "Confidentiality is a hard requirement, not a preference — scoping has to be enforced server-side." },
    ],
    iterations: [
      {
        label: "Pass 01",
        title: "Messaging as its own layer",
        points: [
          "Object-oriented C#/.NET REST services implementing SWIFT MT and MX.",
          "Message construction isolated from business logic, so a market-specific rule changes one place.",
        ],
        outcome:
          "Transaction records met reporting obligations in both Brazil and South Korea.",
        outcomeKind: "win",
      },
      {
        label: "Pass 02",
        title: "Data-dense screens that stay readable",
        points: [
          "33+ interactive screens for settlements, securities, corporate actions and reconciliation.",
          "React, Redux and AG Grid, built from a shared component set rather than per-screen.",
          "Migrated the build from Create React App to Vite.",
        ],
        outcome: "Operators work a full settlement day without leaving the grid.",
        outcomeKind: "win",
      },
      {
        label: "Pass 03",
        title: "Specification as the shared room",
        points: [
          "Ran requirement analysis and solution design directly with the client.",
          "Produced specifications, flowcharts and API contracts the other two time zones could build against.",
          "Enforced confidentiality through JWT, RBAC scoping and encryption.",
        ],
        outcome: "A distributed team shipped as though it were in one room.",
        outcomeKind: "win",
      },
    ],
    results: [
      { value: "33+", label: "interactive screens" },
      { value: "2", label: "regulatory regimes satisfied" },
      { value: "millions", label: "of BRL settled daily" },
    ],
    closing:
      "Nominated for Team of the Year at Oneture for this work, as part of the four-developer Mirae Asset team.",
    stack: ["React", "Redux", "AG Grid", "C# / .NET", "SWIFT MT/MX"],
  },
  {
    slug: "ai-platform",
    title: "Taiyo.AI — AI Infrastructure Platform",
    lede: "An agent that does the digging, over 25 million records.",
    blurb:
      "An infrastructure-intelligence platform with an AI agent that plans a question, calls the right tools in sequence, and assembles the answer.",
    accent: "#dc2626",
    meta: [
      { label: "Role", value: "Frontend engineer" },
      { label: "Company", value: "Taiyo.AI" },
      { label: "Where", value: "San Francisco (remote)" },
      { label: "Scale", value: "25M+ records, 50+ clients" },
      { label: "Year", value: "2023 — 2024" },
    ],
    overview: {
      heading: "Infrastructure intelligence, and the time it took.",
      body: [
        "Taiyo.AI sells intelligence on infrastructure projects — tenders, contracts, spend — to enterprise clients deciding where to bid. The value is in the dataset: tens of millions of records, across countries and languages.",
        "The problem was never whether the answer was in there. It was how long it took an analyst to assemble it: roughly four hours of searching, filtering and cross-referencing for a single usable insight.",
      ],
    },
    problem: {
      heading: "The problem",
      question: "How do you answer a question that needs five searches, not one?",
      body: "Real questions decompose. 'Which water projects in these three states slipped last quarter, and who won them' is a search, a filter, a join and a summary. A single prompt against a single index answers none of it.",
    },
    insights: [
      { n: "01", text: "Analysts were not short of data. They were short of the hours it took to assemble it." },
      { n: "02", text: "One prompt, one answer does not survive a question with several steps in it." },
      { n: "03", text: "At 25M records, latency is the product — a correct answer after five seconds is still a bad experience." },
    ],
    iterations: [
      {
        label: "Pass 01",
        title: "Make the search fast enough to build on",
        points: [
          "Profiled the Elasticsearch queries behind the slowest screens and found the bottlenecks were in how the queries were shaped, not the cluster size.",
          "Designed multi-tier caching so repeated and near-repeated queries do not touch the index.",
        ],
        outcome:
          "API latency fell from 5s to 0.8s and infrastructure spend by $3,200 a month.",
        outcomeKind: "win",
      },
      {
        label: "Pass 02",
        title: "An agent that calls tools, not a chatbot",
        points: [
          "Exposed the platform's own capabilities — search, filter, aggregate, summarise — as tools the model can call.",
          "The agent plans a question into steps, calls each tool in turn, and assembles the result from what comes back.",
          "Every step is inspectable, so an analyst can see which searches produced the answer rather than trusting a paragraph.",
        ],
        outcome:
          "Four hours of manual assembly became about three minutes of agent work.",
        outcomeKind: "win",
      },
      {
        label: "Pass 03",
        title: "Making the generated text trustworthy",
        points: [
          "Built a Gen-AI news module on OpenAI streaming APIs for 100+ users.",
          "A/B-tested prompt variants against a fixed question set rather than tuning by feel.",
          "Cut token costs 45% by trimming context to what each step actually needed.",
        ],
        outcome: "Hallucination rate fell from 12% to 7.8% on the evaluation set.",
        outcomeKind: "win",
      },
    ],
    results: [
      { value: "4h → 3min", label: "to a usable insight" },
      { value: "5s → 0.8s", label: "API latency" },
      { value: "45%", label: "lower token cost" },
      { value: "50+", label: "enterprise clients served" },
    ],
    closing:
      "The agent was the interesting part. Letting a model call the platform's own tools, in an order it chooses, turned a search product into something that answers the question you actually asked.",
    stack: ["React", "Elasticsearch", "Redis", "OpenAI", "Python"],
  },
  {
    slug: "aster",
    title: "Aster — AI Project Management",
    lede: "Ask a question in English. Get the right rows back.",
    blurb:
      "A full stack platform with real-time dashboards and a Groq-backed assistant that turns natural-language questions into SQL.",
    accent: "#9c4a6e",
    meta: [
      { label: "Role", value: "Everything" },
      { label: "Type", value: "Independent project" },
      { label: "Infra", value: "AWS, self-provisioned" },
      { label: "Repo", value: "github.com/abhijitsp11" },
      { label: "Year", value: "Personal" },
    ],
    overview: {
      heading: "A side project about the gap between a question and a query.",
      body: [
        "Project data is relational, but the questions people ask about it are not. 'Which tasks slipped this sprint and who owns them' is one sentence and a three-table join.",
        "Aster is a project management tool with real-time dashboards and an assistant that closes that gap — you ask in English, it writes the SQL, runs it, and shows you the rows.",
      ],
    },
    problem: {
      heading: "The problem",
      question: "How do you let a model near your database without letting it loose?",
      body: "A model that writes SQL against production is a model that can write anything against production. Accuracy matters, but containment matters more.",
    },
    insights: [
      { n: "01", text: "Schema context in the prompt does more for accuracy than a larger model does." },
      { n: "02", text: "Generated SQL has to be constrained by the permissions of the person asking, not the service." },
      { n: "03", text: "A wrong answer delivered confidently is worse than no answer." },
    ],
    iterations: [
      {
        label: "Pass 01",
        title: "Natural language to SQL",
        points: [
          "Groq-backed assistant converts questions to SQL against the live schema.",
          "Reached 92% accuracy on the question set used for evaluation.",
        ],
        outcome: "Questions get answered without anyone opening a query editor.",
        outcomeKind: "win",
      },
      {
        label: "Pass 02",
        title: "Infrastructure that stays up",
        points: [
          "Provisioned production AWS from scratch — VPC, EC2, RDS and Cognito.",
          "RBAC applied at the data layer, so generated queries inherit the caller's scope.",
        ],
        outcome: "99.9% uptime, with model access bounded by the asker's permissions.",
        outcomeKind: "win",
      },
    ],
    results: [
      { value: "92%", label: "natural language → SQL accuracy" },
      { value: "99.9%", label: "uptime" },
    ],
    closing:
      "Built end to end — schema, API, infrastructure and interface — which is the part that made it worth doing.",
    stack: ["Next.js", "TypeScript", "Express", "Prisma", "PostgreSQL", "AWS", "Groq"],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
