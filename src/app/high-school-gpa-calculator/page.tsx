import type { Metadata } from "next";
import { WeightedGPACalculator } from "@/components/calculator/WeightedGPACalculator";
import { Hero } from "@/components/sections/Hero";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { ArticleSchema, CalculatorSchema, FaqSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import Link from "next/link";
import { InlineCalcCta, Citation, DefinitionBlock, KeyFacts, ArticleMeta } from "@/components/sections/InContentLinks";

export const metadata: Metadata = {
  title: "High School GPA Calculator: Weighted + Unweighted",
  description:
    "Free high school GPA calculator showing weighted AND unweighted GPA side-by-side. AP, Honors, IB, dual-enrollment support across all five common school scales. Mobile-first, instant.",
  alternates: { canonical: "/high-school-gpa-calculator" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is a good high school GPA?",
    a: "On a 4.0 unweighted scale, 3.5+ is generally considered competitive for selective colleges. 4.0+ weighted with several AP classes signals strong academic rigor. Top-tier schools often expect 3.8-4.0 unweighted with 4-8 AP courses.",
  },
  {
    q: "How is high school GPA calculated semester by semester?",
    a: "Each semester's GPA is the average of grade points × credits for that semester's classes. Cumulative GPA is the running average across all semesters, weighted by credits.",
  },
  {
    q: "Do colleges see weighted or unweighted high school GPA?",
    a: "Both appear — your transcript lists whatever your school reports. Selective colleges, though, usually convert everything to their own standard scale, frequently unweighted, and then size up course difficulty as its own factor.",
  },
  {
    q: "Does freshman year GPA matter?",
    a: "Yes. Freshman grades count toward your cumulative GPA, which colleges see. A weak freshman year can be offset by an upward trend, but it's harder to recover from than from sophomore or junior year dips.",
  },
];

export default function HighSchoolGpaPage() {
  return (
    <>
      <CalculatorSchema
        name="High School GPA Calculator"
        description="Free high school GPA calculator with weighted and unweighted results, AP/Honors/IB support, and five weighting scales."
        url="https://bestgpacalculator.online/high-school-gpa-calculator"
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="High School GPA Calculator"
        description="Free high school GPA calculator with weighted and unweighted results, AP/Honors/IB support, and five weighting scales."
        url="https://bestgpacalculator.online/high-school-gpa-calculator"
        datePublished="2026-04-17"
        dateModified="2026-05-06"
      />


      
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "High School GPA", href: "/high-school-gpa-calculator" }]} />
      <Hero
        badge="9th-12th grade"
        title="High School"
        highlight="GPA Calculator"
        subtitle="Track your high school GPA semester by semester. AP, Honors, IB, dual-enrollment — all weighted correctly. Both weighted and unweighted, side by side."
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <WeightedGPACalculator storageScope="default" />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <ArticleMeta updated="2026-05-06" />
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            What high school GPA do colleges look for?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            College admissions look at GPA in context. A 3.5 from a school with
            limited <Link href="/ap-gpa-calculator" className="font-medium text-blue-700 hover:underline">AP course</Link> offerings can be more impressive than a 3.9 from a
            school that auto-inflates grades. Selective colleges read the
            transcript: course rigor, trend over time, and the <Link href="/weighted-gpa-calculator" className="font-medium text-blue-700 hover:underline">weighted GPA</Link> together with the unweighted figure.
          </p>

          <DefinitionBlock
            term="High School GPA"
            definition="A high school GPA averages your grades across all courses taken in grades 9-12. Most US high schools report both weighted (with AP/Honors bonuses on a 5.0 scale) and unweighted (pure 4.0 scale) versions on the transcript."
          />

          <KeyFacts
            items={[
              { label: "Grade levels", value: "9th–12th (4 years total)" },
              { label: "Typical credits per year", value: "6–8 yearlong courses" },
              { label: "Reported as", value: "Weighted + unweighted (most schools)" },
              { label: "Used for", value: "College admissions, scholarships, class rank" },
            ]}
          />


          <h3 className="mt-8 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Rough GPA targets by school tier
          </h3>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              ["Ivy League / top-10", "3.9-4.0 unweighted, 4.5+ weighted"],
              ["Top-25 universities", "3.7-4.0 unweighted, 4.2+ weighted"],
              ["Top-50 universities", "3.5-3.9 unweighted, 4.0+ weighted"],
              ["State flagships", "3.3-3.7 unweighted"],
              ["Most 4-year colleges", "3.0+ unweighted"],
              ["Community colleges", "Open admission, no GPA minimum"],
            ].map(([tier, gpa]) => (
              <div
                key={tier}
                className="glass-input rounded-xl p-3 text-sm"
              >
                <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {tier}
                </div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">
                  {gpa}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            Rough guidance only. Acceptance depends on full application
            (essays, test scores, extracurriculars, course rigor).
          </p>

          <InlineCalcCta
            href="/cumulative-gpa-calculator"
            title="Tracking multiple semesters?"
            body="Combine all your terms with the Cumulative GPA Calculator to see your full transcript average."
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            How freshman, sophomore, junior, and senior years compound
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            High school GPA is cumulative. A freshman 3.2 followed by three
            years of 3.8 still leaves your transcript at roughly 3.65 — the
            early grades dilute later wins. Use the{" "}
            <Link href="/semester-gpa-calculator" className="font-medium text-blue-700 hover:underline">Semester GPA Calculator</Link>{" "}
            to grade-check each term, the{" "}
            <Link href="/current-gpa-calculator" className="font-medium text-blue-700 hover:underline">Current GPA Calculator</Link>{" "}
            for in-progress estimates, and the{" "}
            <Link href="/gpa-goal-calculator" className="font-medium text-blue-700 hover:underline">GPA Goal Calculator</Link>{" "}
            to plan the average you need next semester to hit a target by
            graduation.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Class rigor: AP, Honors, IB, dual enrollment
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Most US high schools add bonus quality points for advanced classes.
            Try the{" "}
            <Link href="/ap-gpa-calculator" className="font-medium text-blue-700 hover:underline">AP GPA Calculator</Link>{" "}
            for AP-heavy schedules,{" "}
            <Link href="/honors-gpa-calculator" className="font-medium text-blue-700 hover:underline">Honors GPA Calculator</Link>{" "}
            for the +0.5 honors track, or the{" "}
            <Link href="/ap-score-to-gpa-calculator" className="font-medium text-blue-700 hover:underline">AP Score Predictor</Link>{" "}
            to see how a 1-5 exam score converts to college credit. Admissions
            offices apply their own weighting rules — many drop the bonus
            altogether and gauge how demanding your schedule was as a separate
            factor, so it&apos;s worth watching both numbers.
          </p>

          <InlineCalcCta
            href="/unweighted-gpa-calculator"
            title="Need the unweighted figure?"
            body="The Unweighted GPA Calculator gives a pure 4.0-scale average — what most college admissions offices recalculate to."
          />

          <Citation source="NCES" url="https://nces.ed.gov/programs/digest/" detail="national GPA distributions by grade level" />
          <Citation source="College Board" url="https://www.collegeboard.org/" detail="GPA in admissions" />
          <Citation source="National Association for College Admission Counseling" url="https://www.nacacnet.org/" detail="State of College Admission report — GPA importance ranking" />
        </div>
      </article>
      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentHref="/high-school-gpa-calculator" />
    </>
  );
}
