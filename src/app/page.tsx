import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import ScrollRail from "@/components/ScrollRail";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WordScroll from "@/components/WordScroll";
import BlurIn from "@/components/BlurIn";
import Stats from "@/components/Stats";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import BrowserTabs from "@/components/BrowserTabs";
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

        <WordScroll
          kicker="Why fintech"
          words={[
            "I",
            "like",
            "the",
            "part",
            "of",
            "fintech",
            "where",
            "money",
            "has",
            "to",
            "be",
            "right.",
          ]}
          accentAt={[7, 8, 9, 10, 11]}
          tags={[
            "payments",
            "reconciliation",
            "securities settlement",
            "SWIFT MT/MX",
            "markets & trading",
            "Market AI",
          ]}
          footnote="keep scrolling ↓"
          length={1.9}
        />

        {/* each section resolves from blurred to sharp as it comes into view */}
        <BlurIn>
          <Stats />
        </BlurIn>

        <Work />


        <BlurIn>
          <Experience />
        </BlurIn>

        {/* not wrapped in BlurIn: the section pins itself with position:sticky,
            and an ancestor carrying a filter confines that stickiness */}
        <BrowserTabs />

        <WordScroll
          words={[
            "that's",
            "the",
            "short",
            "version.",
            "the",
            "rest",
            "is",
            "in",
            "the",
            "case",
            "studies.",
          ]}
          accentAt={[9, 10]}
          dark
          length={2.8}
        />

        <BlurIn>
          <Contact />
        </BlurIn>
      </main>
    </>
  );
}
