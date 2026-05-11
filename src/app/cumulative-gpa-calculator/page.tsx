import type { Metadata } from "next";
import { CumulativeGPACalculator } from "@/components/calculator/CumulativeGPACalculator";
import { Hero } from "@/components/sections/Hero";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { ArticleSchema, CalculatorSchema, FaqSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import Link from "next/link";
import { InlineCalcCta, Citation, DefinitionBlock, KeyFacts, ArticleMeta } from "@/components/sections/InContentLinks";

export const metadata: Metadata = {
  title: "Cumulative GPA Calculator — Add a New Semester",
  description:
    "Calculate your new cumulative GPA. Enter your prior GPA and credits, add the current semester's classes, and see your updated cumulative instantly.",
  alternates: { canonical: "/cumulative-gpa-calculator" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is cumulative GPA?",
    a: "Cumulative GPA is the running average of all your grades across every semester you've completed, weighted by credit hours. It's the single number that summarizes your entire academic record up to now.",
  },
  {
    q: "How do I calculate cumulative GPA?",
    a: "Multiply each semester's GPA by its credits, sum those values, divide by total credits. This calculator does it automatically — enter your prior GPA + credits, then the new classes.",
  },
  {
    q: "Does cumulative GPA include the current semester?",
    a: "Yes — that's the whole point of recalculating it. Your prior cumulative GPA is everything before this semester. Add this semester's grades and credits to get your new cumulative.",
  },
  {
    q: "Can my cumulative GPA go down?",
    a: "Yes. If your current semester GPA is lower than your prior cumulative, the new cumulative will drop. The more total credits you have, the harder it is to move the cumulative number in either direction.",
  },
];

export default function CumulativeGpaPage() {
  return (
    <>
      <CalculatorSchema
        name="Cumulative GPA Calculator"
        description="Calculate your new cumulative GPA. Combine prior GPA with current semester classes."
        url="https://bestgpacalculator.com/cumulative-gpa-calculator"
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="Cumulative GPA Calculator"
        description="Calculate your new cumulative GPA. Combine prior GPA with current semester classes."
        url="https://bestgpacalculator.com/cumulative-gpa-calculator"
        datePublished="2026-04-15"
        dateModified="2026-05-06"
      />


      
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Calculators", href: "/weighted-gpa-calculator" }, { name: "Cumulative GPA", href: "/cumulative-gpa-calculator" }]} />
      <Hero
        badge="Add a semester"
        title="Cumulative"
        highlight="GPA Calculator"
        subtitle="Combine your prior cumulative GPA with this semester's classes. See your new running GPA update live as you enter grades."
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <CumulativeGPACalculator />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <ArticleMeta updated="2026-05-06" />
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            How cumulative GPA is calculated
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Cumulative GPA is a credit-weighted average across every semester.
            Each semester contributes quality points (GPA × credits), and you
            divide the total quality points by the total credits.
          </p>

          <DefinitionBlock
            term="Cumulative GPA"
            definition="A cumulative GPA averages all grades earned across every term you've completed. It's a credit-weighted average, so courses with more credit hours influence the final number more than 1-credit electives."
          />

          <KeyFacts
            items={[
              { label: "Scope", value: "All terms completed (lifetime average)" },
              { label: "Weighting", value: "By credit hours" },
              { label: "Used by", value: "Colleges, employers, grad schools" },
              { label: "Updated", value: "End of every term" },
            ]}
          />

          <pre className="glass-input mt-4 overflow-x-auto rounded-xl p-4 text-xs leading-relaxed text-zinc-800 dark:text-zinc-200">
{`new cumulative GPA =
  (prior_GPA × prior_credits + new_GPA × new_credits)
  ÷ (prior_credits + new_credits)

Example:
  Prior:    3.5 GPA, 30 credits  → 105 quality pts
  Current:  3.8 GPA, 15 credits  → 57 quality pts
  Total:    162 quality pts / 45 credits
  New:      3.60 cumulative`}
          </pre>

          <h3 className="mt-8 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Why cumulative GPA gets harder to move
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            The more credits you accumulate, the more inertia your cumulative
            GPA has. A perfect 4.0 semester after 90 credits at 3.0 only moves
            your cumulative to about 3.13. That&apos;s why early semester
            grades matter so much — they get averaged with everything that
            comes after.
          </p>
        
          <InlineCalcCta
            href="/semester-gpa-calculator"
            title="Just one term to track?"
            body="Use the Semester GPA Calculator for a single-term snapshot before rolling it into your cumulative."
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            How early grades anchor your cumulative
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Math doesn&apos;t care about effort — it cares about credits. The first
            30 credits act like a heavy keel: every later term tilts the
            cumulative number a little less. That&apos;s why a freshman with a 2.5
            and 90 future credits at 3.8 still graduates around 3.48, not 3.8.
            If you want to forecast what it takes, the{" "}
            <Link href="/gpa-goal-calculator" className="font-medium text-blue-700 hover:underline">GPA Goal Calculator</Link>{" "}
            reverses the formula — enter your target and remaining credits, and
            it returns the average grade you need.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            High school cumulative vs college cumulative
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            High school cumulative averages 4 years across 24-32 yearlong
            courses (use the{" "}
            <Link href="/high-school-gpa-calculator" className="font-medium text-blue-700 hover:underline">High School GPA Calculator</Link>{" "}
            for a full transcript view). College cumulative averages 8
            semesters across 30-40 courses with credit-hour weights — typically
            unweighted on a 4.0 scale (the{" "}
            <Link href="/college-gpa-calculator" className="font-medium text-blue-700 hover:underline">College GPA Calculator</Link>{" "}
            handles credit hours directly). High school often reports both
            weighted and unweighted; college rarely does.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            What grad schools and employers actually look at
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Grad programs typically request both cumulative and major (in-field)
            GPA. A 3.4 cumulative with a 3.8 in-major can outrank a 3.6
            cumulative with a 3.4 major if the program values depth. Employers
            tend to anchor on a single cumulative cutoff (often 3.0 or 3.5)
            from large recruiting surveys.
          </p>

          <InlineCalcCta
            href="/current-gpa-calculator"
            title="Mid-term and not done yet?"
            body="The Current GPA Calculator estimates your in-progress GPA before grades post."
          />

          <Citation source="NCES" url="https://nces.ed.gov/" detail="cumulative GPA reporting" />
          <Citation source="U.S. Department of Education" url="https://www.ed.gov/" detail="Satisfactory Academic Progress (SAP) and cumulative GPA thresholds" />
          <Citation source="National Association of Colleges and Employers (NACE)" url="https://www.naceweb.org/" detail="GPA cutoffs by industry" />
        </div>
      </article>
      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentHref="/cumulative-gpa-calculator" />
    </>
  );
}
