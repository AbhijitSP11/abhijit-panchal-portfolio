import type { Metadata } from "next";
import "./globals.css";
import { Alex_Brush } from 'next/font/google';
import Navbar from "@/components/Navbar";

export const alexBrush = Alex_Brush({
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: "Abhijit Panchal",
  description: "Made by Abhijit Panchal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="px-32 py-8">
          <Navbar/>
          {children}
        </main>
      </body>
    </html>
  );
}
