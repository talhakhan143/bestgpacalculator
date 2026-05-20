import type { Metadata } from "next";
import { WeightedGPACalculator } from "@/components/calculator/WeightedGPACalculator";
import { Hero } from "@/components/sections/Hero";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { ArticleSchema, CalculatorSchema, FaqSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import Link from "next/link";
import { InlineCalcCta, Citation, DefinitionBlock, KeyFacts, ArticleMeta } from "@/components/sections/InContentLinks";
import { newClass } from "@/lib/gpa-math";

export const metadata: Metadata = {
  title: "Middle School GPA Calculator (4.0 Scale)",
  description:
    "Free middle school (junior high) GPA calculator on the 4.0 scale. Simple, no weighting, no AP — just letter grades and credits. Mobile-friendly.",
  alternates: { canonical: "/middle-school-gpa-calculator" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Does middle school GPA matter for high school?",
    a: "Indirectly. Middle school grades don't usually appear on high school transcripts, but they affect course placement (Algebra I in 8th vs 9th grade, etc.), which influences your high school GPA later.",
  },
  {
    q: "How is middle school GPA calculated?",
    a: "Same formula as high school unweighted: average grade points × credits divided by total credits. Most middle schools don't have weighted classes, so unweighted is the only number that matters.",
  },
  {
    q: "What is a good middle school GPA?",
    a: "3.0+ is solid. 3.5+ is strong and qualifies for most honor rolls. Middle school GPA isn't visible to colleges, so the bigger value is building study habits for high school.",
  },
  {
    q: "Do junior high schools weight Honors classes?",
    a: "Some do, most don't. If your school does, switch to the high school calculator on this site and pick the appropriate weighting scale. Otherwise, this unweighted middle school version is what you need.",
  },
];

export default function MiddleSchoolGpaPage() {
  return (
    <>
      <CalculatorSchema
        name="Middle School GPA Calculator"
        description="Free middle school / junior high GPA calculator on the 4.0 scale. No weighting."
        url="https://bestgpacalculator.online/middle-school-gpa-calculator"
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="Middle School GPA Calculator"
        description="Free middle school / junior high GPA calculator on the 4.0 scale. No weighting."
        url="https://bestgpacalculator.online/middle-school-gpa-calculator"
        datePublished="2026-04-19"
        dateModified="2026-05-06"
      />


      
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Middle School GPA", href: "/middle-school-gpa-calculator" }]} />
      <Hero
        badge="6th-8th grade · Jr. high"
        title="Middle School"
        highlight="GPA Calculator"
        subtitle="Calculate your middle school (or junior high) GPA on the 4.0 scale. Just letter grades and credits — no AP, no Honors weighting. Simple and accurate."
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <WeightedGPACalculator
          showLevels={false}
          showPresets={false}
          forcedLevel="regular"
          forcedPresetId="standard"
          hideUnweighted
          resultLabel={{ weighted: "Middle School" }}
          storageScope="middle-school"
          starterClasses={[
            newClass({ name: "Math", grade: "A", credits: 1, level: "regular" }),
            newClass({ name: "English", grade: "A-", credits: 1, level: "regular" }),
            newClass({ name: "Science", grade: "B+", credits: 1, level: "regular" }),
            newClass({ name: "Social Studies", grade: "A", credits: 1, level: "regular" }),
          ]}
        />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <ArticleMeta updated="2026-05-06" />
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Middle school GPA: what to know
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Most middle schools (also called junior high or jr. high) report
            grades on the standard 4.0 scale without weighting. That makes the
            calculation simple: every class counts equally according to its
            credit value. If your school doesn&apos;t use credits, just enter
            1 for each class — that gives every class equal weight.
          </p>

          <DefinitionBlock
            term="Middle School GPA"
            definition="Middle school GPA averages grades across 6th-8th grade. Most middle schools use the standard 4.0 unweighted scale. This GPA usually does not transfer to high school records — your high school GPA starts fresh in 9th grade."
          />

          <KeyFacts
            items={[
              { label: "Grade levels", value: "6th–8th (3 years)" },
              { label: "Typical scale", value: "Unweighted 4.0" },
              { label: "Transfers to high school?", value: "No — HS GPA resets in 9th grade" },
              { label: "Used for", value: "Honor roll, course placement, parental tracking" },
            ]}
          />

          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Middle school GPAs don&apos;t typically appear on college
            applications. The bigger payoff is the habits you build now — how
            you take notes, prepare for tests, and ask for help. Those
            translate directly to high school GPA, which colleges <em>do</em>{" "}
            see.
          </p>
        
          <InlineCalcCta
            href="/high-school-gpa-calculator"
            title="Heading to high school?"
            body="When you start 9th grade your GPA resets — try the High School GPA Calculator with weighting."
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Why middle school GPA still matters (indirectly)
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Middle school grades shape course placement: 8th-grade Algebra I
            decides whether high school starts in Algebra II or Geometry, which
            decides whether AP Calculus fits before senior year. Strong middle
            school performance also signals readiness for{" "}
            <Link href="/honors-gpa-calculator" className="font-medium text-blue-700 hover:underline">honors</Link>{" "}
            and{" "}
            <Link href="/ap-gpa-calculator" className="font-medium text-blue-700 hover:underline">AP</Link>{" "}
            tracks in 9th and 10th grade. None of those grades enter your high
            school transcript directly, but they decide which classes do.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            What changes in 9th grade
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            High school usually introduces credit-hour weighting, weighted
            GPA on a 5.0 scale, AP/Honors bonuses, and sometimes plus/minus
            modifiers. The{" "}
            <Link href="/high-school-gpa-calculator" className="font-medium text-blue-700 hover:underline">High School GPA Calculator</Link>{" "}
            handles all of those. The{" "}
            <Link href="/unweighted-gpa-calculator" className="font-medium text-blue-700 hover:underline">Unweighted GPA Calculator</Link>{" "}
            keeps things simple if your high school doesn&apos;t weight at all.
          </p>

          <InlineCalcCta
            href="/unweighted-gpa-calculator"
            title="Need a simple 4.0 average?"
            body="The Unweighted GPA Calculator works for any school that doesn't use AP/Honors bonuses."
          />

          <Citation source="NCES" url="https://nces.ed.gov/" detail="middle grades academic data" />
          <Citation source="U.S. Department of Education" url="https://www.ed.gov/" detail="course placement and academic readiness research" />
        </div>
      </article>
      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentHref="/middle-school-gpa-calculator" />
    </>
  );
}
