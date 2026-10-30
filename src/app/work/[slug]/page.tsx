import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import CaseStudyView from "@/components/CaseStudyView";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { profile } from "@/lib/resume";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Not found" };
  return {
    title: `${study.title} — case study | ${profile.name}`,
    description: study.blurb,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const i = caseStudies.findIndex((c) => c.slug === study.slug);
  const nextStudy = caseStudies[(i + 1) % caseStudies.length];

  return (
    <>
      <SmoothScroll waitForIntro={false} />
      <main>
        <CaseStudyView
          study={study}
          next={{ slug: nextStudy.slug, title: nextStudy.title }}
        />
      </main>
    </>
  );
}
