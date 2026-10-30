import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import ScrollRail from "@/components/ScrollRail";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Statement from "@/components/Statement";
import Stats from "@/components/Stats";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Nav />
      <ScrollRail />

      <main>
        <Hero />
        <Marquee />

        <Statement
          lead="Three and a half years of"
          accentLine="money moving correctly."
          note="Reconciliation across millions of rows, month-end billing that used to take three days, and bond settlements clearing in two countries. The interesting part was never the UI — it was making sure the numbers agree."
        />

        <Stats />
        <Work />
        <Experience />
        <About />
        <Contact />
      </main>
    </>
  );
}
