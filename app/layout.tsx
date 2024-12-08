import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Open_Sans} from "next/font/google"

export const metadata: Metadata = {
  title: "Abhijit Panchal",
  description: "Made by Abhijit Panchal",
};

const roboto = Open_Sans({
  subsets: ["latin"],
  weight: ['400', '700']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-[--background] text-[--foreground] ${roboto.className}`}>
        <main className="max-w-7xl mx-auto px-6 md:px-8 py-8">
          <Navbar/>
          {children}
        </main>
      </body>
    </html>
  );
}
