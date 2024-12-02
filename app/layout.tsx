import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
