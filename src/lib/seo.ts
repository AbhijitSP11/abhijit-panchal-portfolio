import { profile } from "./resume";

/**
 * Set NEXT_PUBLIC_SITE_URL in Vercel once there is a custom domain; until then
 * this falls back to the Vercel project address.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://abhijit-panchal-portfolio.vercel.app"
).replace(/\/$/, "");

/**
 * The browser-tab title. A tab title is plain text and cannot be coloured, so
 * the wordmark's red dot is the red-circle emoji.
 */
export const siteTitle = "Abhijit🔴 | SP";

/** Link previews and search results get the plain-text wordmark. */
export const shareTitle = "Abhijit. | SP";

export const siteDescription =
  "Abhijit Panchal is a full stack developer in Mumbai building banking, fintech and payments systems with React, Next.js, Python and .NET. Open to roles in Mumbai and Bengaluru.";

/**
 * Search engines ignore the keywords tag, so the ranking work is in the title,
 * description, headings and structured data. This list is still kept as the
 * single source for the tag and for the structured-data `knowsAbout` field.
 */
export const roleKeywords = [
  "full stack developer",
  "full stack engineer",
  "software development engineer",
  "SDE",
  "software engineer Mumbai",
  "full stack developer Mumbai",
  "full stack developer Bengaluru",
  "hire full stack developer",
];

export const domainKeywords = [
  "fintech",
  "banking software",
  "payments",
  "UPI",
  "bank reconciliation",
  "billing systems",
  "SWIFT",
  "ISO 20022",
  "capital markets",
  "e-commerce",
  "startups",
];

export const techKeywords = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "FastAPI",
  "Celery",
  "C#",
  ".NET",
  "PostgreSQL",
  "AWS",
];

/** Places and employers this portfolio is aimed at. */
export const targetKeywords = [
  "Mumbai",
  "Bengaluru",
  "Juspay",
  "Razorpay",
  "PhonePe",
  "Paytm",
  "Upstox",
  "CoinDCX",
  "Angel One",
  "BillDesk",
  "InCred",
  "Jupiter",
  "Mswipe",
];

export const allKeywords = [
  ...roleKeywords,
  ...domainKeywords,
  ...techKeywords,
  ...targetKeywords,
];

export const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Abhijit Panchal — Portfolio",
      inLanguage: "en-IN",
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      url: siteUrl,
      jobTitle: "Full Stack Developer",
      description: siteDescription,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      worksFor: { "@type": "Organization", name: "Oneture Technologies" },
      knowsAbout: [...domainKeywords, ...techKeywords],
      sameAs: [profile.github, profile.linkedin],
    },
  ],
};
