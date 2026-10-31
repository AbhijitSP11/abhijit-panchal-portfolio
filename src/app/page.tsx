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
          kicker="The job, in one line"
          words={["every", "rupee", "has", "to", "land", "where", "it", "should."]}
          accentAt={[5, 6, 7]}
          tags={[
            "reconciliation",
            "billing",
            "securities settlement",
            "100,000+ rows a night",
            "maker-checker",
            "SWIFT MT/MX",
          ]}
          footnote="keep scrolling ↓"
          length={1.9}
        />

        {/* each section resolves from blurred to sharp as it comes into view */}
        <BlurIn>
          <Stats />
        </BlurIn>

        <BlurIn>
          <Work />
        </BlurIn>

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
