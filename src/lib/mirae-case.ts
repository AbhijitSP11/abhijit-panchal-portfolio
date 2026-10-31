/**
 * The Mirae Asset SWIFT MT → MX case study, drawn from the engagement write-up
 * ("Mirae Swift case study.docx"). Numbers are the document's own; the
 * outcomes are the ones it lists, so they are phrased as what the platform
 * delivers rather than as measured results.
 */

export const miraeCase = {
  accent: "#d9680c",
  eyebrow: "Case study · Capital markets",
  title: "Moving a custodian's back office from SWIFT MT to MX",
  lede: "SWIFT was retiring the legacy MT message format for ISO 20022 MX with a hard deadline of November 2025. The back office had to speak both, without a single settlement stopping.",
  meta: [
    { label: "Client", value: "Mirae Asset" },
    { label: "Delivered by", value: "Oneture Technologies" },
    { label: "My role", value: "Full stack engineer" },
    { label: "Window", value: "19–30 weeks" },
  ],
  numbers: [
    { value: "22", label: "back-office screens rewritten" },
    { value: "45", label: "database objects redesigned" },
    { value: "2", label: "message formats live together" },
    { value: "Nov 2025", label: "regulatory deadline met" },
  ],

  stakes: {
    heading: "Why it could not wait.",
    body: "The change touched technology, operations, compliance and customer servicing at once. The existing back office was a custom .NET application with 22 business-critical screens and 45 tightly coupled database objects, none of it built for MX's far richer, stricter data.",
  },

  /** What was hard, what was done, and why the business cared. */
  solved: [
    {
      problem: "A legacy back office that could not hold MX data",
      fix: "Rewrote all 22 screens and redesigned the 45 underlying database objects for ISO 20022's wider fields and validation rules.",
      benefit: "A platform that is compliant now and ready for the next standard change.",
    },
    {
      problem: "Counterparties still sending MT while others moved to MX",
      fix: "Built configurable translation engines that convert MT to MX and back, tested message type by message type in sandbox.",
      benefit: "Both formats run side by side, so there was no risky cut-over day.",
    },
    {
      problem: "MX carries more data, and more of it can be wrong",
      fix: "Tightened validation, enrichment and error handling across processing, reconciliation, corporate actions and exceptions.",
      benefit: "Bad messages are caught at the door, not discovered during reconciliation.",
    },
    {
      problem: "Connecting to SWIFT's Alliance Cloud",
      fix: "Integrated Messaging API 2.0 with middleware and orchestration between the internal systems and SWIFT's cloud.",
      benefit: "Direct, secure, real-time message handling instead of a brittle bridge.",
    },
    {
      problem: "A production roll-out that had to be stable first time",
      fix: "Ran functional, integration, performance and end-to-end cycles, plus interoperability tests with SWIFT and external counterparties.",
      benefit: "Certification-ready, with the client supported through readiness validation.",
    },
    {
      problem: "Very little time before the deadline",
      fix: "Set risks out up front, wrote fallback procedures for every failure mode, and held regular alignment sessions across business, operations, compliance and IT.",
      benefit: "The deadline risk was reduced and operational disruption kept to a minimum.",
    },
  ],

  screensHeading: "The 22 screens, rewritten.",
  screens: [
    "Trades",
    "Transfers",
    "Securities ledger",
    "Fund ledger",
    "Approvals",
    "Revisions",
    "Corporate actions",
    "Custodian fees",
    "Settlement fees",
    "Notifications",
    "Deposits",
    "Member master data",
    "Account master data",
  ],
  screensNote: "…and the rest of the 22 that make up a day of settlement work.",

  approach: {
    heading: "How it was run.",
    steps: [
      { n: "01", title: "Assess & plan", text: "Mapped existing systems, interfaces, workflows and message formats, then wrote a migration blueprint that balanced the deadline against operational risk." },
      { n: "02", title: "Modernise", text: "Rewrote the .NET back office and redesigned its data model for ISO 20022." },
      { n: "03", title: "Translate", text: "Built the bidirectional MT↔MX layer and enabled coexistence for the transition window." },
      { n: "04", title: "Connect", text: "Integrated SWIFT Messaging API 2.0 on Alliance Cloud with the orchestration around it." },
      { n: "05", title: "Test & certify", text: "Functional, integration, performance and end-to-end cycles, then counterparty interoperability." },
      { n: "06", title: "Govern risk", text: "Contingency and fallback plans, with continuous alignment across every affected team." },
    ],
  },

  architecture: {
    heading: "How the pieces connect.",
    image: "/case/swift-architecture.png",
    alt: "Diagram: the back office and its API client connect through a VPN and API gateway to application channels on SWIFT's Alliance Cloud service, which reaches the SWIFT network.",
    caption: "SWIFT's recommended pattern for Messaging API 2.0 on Alliance Cloud.",
    callouts: [
      { n: "1", title: "Alliance Cloud", text: "SWIFT's hosted service, and the route to the network." },
      { n: "2", title: "API gateway", text: "A secured VPN link between the bank and SWIFT." },
      { n: "3", title: "Application channels", text: "Separate channels so message flows stay isolated." },
    ],
  },

  mine: {
    heading: "What I built.",
    points: [
      "C#/.NET REST services implementing SWIFT MT and MX messaging, so transactions met reporting obligations in Brazil and South Korea.",
      "Data-dense React screens for settlements, securities, corporate actions and reconciliation, on AG Grid.",
      "Requirement analysis and solution design with the client: specifications, flowcharts and API contracts a three-country team could build against.",
      "Confidentiality enforced through JWT, RBAC scoping and encryption.",
    ],
  },

  outcomes: {
    heading: "What the business got.",
    items: [
      "A back-office platform that is fully ISO 20022 compliant and ready for what comes next.",
      "MT and MX running side by side through the transition.",
      "Stronger data validation and reconciliation, and less manual exception handling.",
      "Direct integration with SWIFT Alliance Cloud through Messaging API 2.0.",
      "Delivery inside the target window, with the regulatory deadline de-risked.",
    ],
  },

  stack: ["C# / .NET", "React", "Redux", "AG Grid", "SWIFT MT/MX", "ISO 20022", "Messaging API 2.0", "Alliance Cloud"],
};
