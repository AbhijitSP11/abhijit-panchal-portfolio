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
import TabsWindow from "@/components/TabsWindow";
import LifeTabs from "@/components/LifeTabs";
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
          words={["every", "rupee", "has", "to", "land", "where", "it", "should."]}
          accentAt={[5, 6, 7]}
          footnote="keep scrolling ↓"
          length={2.6}
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

        <BlurIn>
          <TabsWindow />
        </BlurIn>

        {/* not wrapped in BlurIn: the section pins itself with position:sticky,
            and an ancestor carrying a filter confines that stickiness */}
        <LifeTabs />

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
