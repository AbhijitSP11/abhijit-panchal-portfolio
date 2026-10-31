import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, Caveat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/resume";
import {
  allKeywords,
  personJsonLd,
  siteDescription,
  shareTitle,
  siteTitle,
  siteUrl,
} from "@/lib/seo";

const display = DM_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "700"],
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  style: ["normal", "italic"],
});

const hand = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  weight: ["400", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: `%s | ${siteTitle}` },
  description: siteDescription,
  keywords: allKeywords,
  applicationName: "Abhijit. | SP",
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  category: "technology",
  openGraph: {
    title: shareTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Abhijit. | SP",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${serif.variable} ${hand.variable} ${mono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
