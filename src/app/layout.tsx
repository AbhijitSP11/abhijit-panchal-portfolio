import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, Caveat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/resume";

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
  title: `${profile.name} — ${profile.shortRole}`,
  description: profile.summary,
  openGraph: {
    title: `${profile.name} — ${profile.shortRole}`,
    description: profile.tagline,
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
