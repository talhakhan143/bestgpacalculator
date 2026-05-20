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
  title: "Semester GPA Calculator — One Term Snapshot",
  description:
    "Free semester GPA calculator. Enter your classes for one term and see your semester GPA on the 4.0 scale. Supports credit hours and AP/Honors weighting.",
  alternates: { canonical: "/semester-gpa-calculator" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What's the difference between semester GPA and cumulative GPA?",
    a: "Semester GPA is just the GPA for one term — your average for that semester's classes only. Cumulative GPA averages across every semester you've completed. Cumulative is the long-term record; semester is the snapshot.",
  },
  {
    q: "How do I calculate semester GPA?",
    a: "For each class in the semester, multiply the grade point by the credit hours. Add those products. Divide by total credit hours. The result is your semester GPA.",
  },
  {
    q: "Does semester GPA count for college admissions?",
    a: "Colleges see your transcript with semester-by-semester grades. Strong semesters in junior and senior year (especially with rigorous classes) carry significant weight. A weak semester is recoverable if the trend overall is upward.",
  },
  {
    q: "Should I include weighted bonuses in semester GPA?",
    a: "Depends on what you need. For school report cards and class rank, your school's weighting policy applies. For college applications, most schools recalculate to unweighted. Use the AP/Honors level toggles to see both.",
  },
];

export default function SemesterGpaPage() {
  return (
    <>
      <CalculatorSchema
        name="Semester GPA Calculator"
        description="Free semester GPA calculator on the 4.0 scale with optional AP/Honors weighting."
        url="https://bestgpacalculator.online/semester-gpa-calculator"
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="Semester GPA Calculator"
        description="Free semester GPA calculator on the 4.0 scale with optional AP/Honors weighting."
        url="https://bestgpacalculator.online/semester-gpa-calculator"
        datePublished="2026-04-21"
        dateModified="2026-05-06"
      />


      
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Semester GPA", href: "/semester-gpa-calculator" }]} />
      <Hero
        badge="One term at a time"
        title="Semester"
        highlight="GPA Calculator"
        subtitle="Calculate your GPA for a single semester. Enter every class, choose Regular / Honors / AP / IB, and see weighted and unweighted results side by side."
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <WeightedGPACalculator
          storageScope="semester"
          starterClasses={[
            newClass({ name: "Class 1", grade: "A", credits: 3, level: "regular" }),
            newClass({ name: "Class 2", grade: "B+", credits: 3, level: "regular" }),
            newClass({ name: "Class 3", grade: "A-", credits: 4, level: "regular" }),
            newClass({ name: "Class 4", grade: "B", credits: 3, level: "regular" }),
          ]}
          defaultCredits={3}
        />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <ArticleMeta updated="2026-05-06" />
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Semester GPA, explained
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Your semester GPA is the average grade point across every class
            you took that term, weighted by how many credits each class is
            worth. A 4-credit math class influences the average more than a
            1-credit elective.
          </p>

          <DefinitionBlock
            term="Semester GPA"
            definition="A semester GPA averages your grades from a single academic term (semester or quarter), weighted by credit hours. It's a snapshot of one term's performance — multiple semester GPAs roll up into your cumulative GPA."
          />

          <KeyFacts
            items={[
              { label: "Scope", value: "One term only (single semester)" },
              { label: "Weighting", value: "By credit hours" },
              { label: "Used for", value: "Term snapshots, dean's list eligibility" },
              { label: "Combine with", value: "Cumulative GPA Calculator across terms" },
            ]}
          />

          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Want to see how this term changes your overall record? Use the{" "}
            <a
              href="/cumulative-gpa-calculator"
              className="font-medium text-indigo-700 underline-offset-2 hover:underline dark:text-indigo-300"
            >
              Cumulative GPA Calculator
            </a>{" "}
            — it combines this semester with your prior GPA.
          </p>
        
          <InlineCalcCta
            href="/cumulative-gpa-calculator"
            title="Rolling up multiple terms?"
            body="After computing each semester, combine them with the Cumulative GPA Calculator."
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Quarter, trimester, and semester systems
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Most US schools run two semesters per year (fall + spring) plus an
            optional summer term. Some run quarters (3 per year, ~10 weeks
            each) or trimesters (3 per year, ~13 weeks). The math is identical
            — sum (grade × credits), divide by total credits — but term
            credits differ. A 4-credit semester course often equals a
            5-credit quarter course in terms of contact hours. Use this
            calculator term-by-term, then roll into the{" "}
            <Link href="/cumulative-gpa-calculator" className="font-medium text-blue-700 hover:underline">cumulative GPA</Link>{" "}
            once each term posts.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Mid-term and forecasting
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Final grades not posted? The{" "}
            <Link href="/current-gpa-calculator" className="font-medium text-blue-700 hover:underline">Current GPA Calculator</Link>{" "}
            uses your in-progress assignment grades to estimate where the
            semester is heading. If you have a target — say a 3.5 by year-end —
            the{" "}
            <Link href="/gpa-goal-calculator" className="font-medium text-blue-700 hover:underline">GPA Goal Calculator</Link>{" "}
            reverses the math: enter the target, current GPA, and remaining
            credits, and it returns the average grade you need.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            High school vs college semester GPA
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            High school semester GPA usually shows both weighted and
            unweighted; the{" "}
            <Link href="/high-school-gpa-calculator" className="font-medium text-blue-700 hover:underline">High School GPA Calculator</Link>{" "}
            handles both views with AP/Honors weighting. College semester GPA
            is almost always unweighted on a 4.0 scale — see the{" "}
            <Link href="/college-gpa-calculator" className="font-medium text-blue-700 hover:underline">College GPA Calculator</Link>.
          </p>

          <InlineCalcCta
            href="/gpa-goal-calculator"
            title="Targeting a specific cumulative?"
            body="The GPA Goal Calculator works backwards from your target GPA to the average grade required this term."
          />

          <Citation source="NCES" url="https://nces.ed.gov/" detail="term GPA conventions" />
          <Citation source="U.S. Department of Education" url="https://www.ed.gov/" detail="Satisfactory Academic Progress (SAP) — term GPA cutoffs" />
        </div>
      </article>
      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentHref="/semester-gpa-calculator" />
    </>
  );
}
