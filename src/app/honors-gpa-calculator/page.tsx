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
  title: "Honors GPA Calculator — +0.5 Weighting Bonus",
  description:
    "Honors GPA calculator with bonus weighting. Most US schools add +0.5 for honors classes. See your weighted GPA instantly with all five scales supported.",
  alternates: { canonical: "/honors-gpa-calculator" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How much does an Honors class boost your GPA?",
    a: "Under the standard +0.5 weighting scale, an A in an Honors class is worth 4.5 quality points instead of 4.0. The bonus is half of what AP classes typically get because Honors is considered less demanding than AP.",
  },
  {
    q: "Why do some schools not weight Honors at all?",
    a: "A subset of districts only weight AP and IB classes — they argue Honors content isn't standardized like AP/IB. Use the AP-only preset to match those schools.",
  },
  {
    q: "Is Honors better than regular for college admissions?",
    a: "Yes, in two ways: it raises your weighted GPA and signals academic rigor on your transcript. Selective colleges look at both your GPA and the difficulty of your course load.",
  },
  {
    q: "Can I mix Honors and AP in the same calculation?",
    a: "Yes. Tag each class with its actual level — Regular, Honors, AP, IB, or Dual. Each gets the right bonus under your selected weighting scale, automatically.",
  },
];

export default function HonorsGpaPage() {
  return (
    <>
      <CalculatorSchema
        name="Honors GPA Calculator"
        description="Honors GPA calculator with weighted bonus. Most US schools add +0.5 for Honors classes."
        url="https://bestgpacalculator.online/honors-gpa-calculator"
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="Honors GPA Calculator"
        description="Honors GPA calculator with weighted bonus. Most US schools add +0.5 for Honors classes."
        url="https://bestgpacalculator.online/honors-gpa-calculator"
        datePublished="2026-04-15"
        dateModified="2026-05-06"
      />


      
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Calculators", href: "/weighted-gpa-calculator" }, { name: "Honors GPA", href: "/honors-gpa-calculator" }]} />
      <Hero
        badge="Honors classes"
        title="Honors GPA"
        highlight="Calculator"
        subtitle="Calculate your weighted GPA with Honors bonus points. Most US high schools add +0.5 to Honors classes, making an A worth 4.5. Tag your Honors classes below."
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <WeightedGPACalculator />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <ArticleMeta updated="2026-05-06" />
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            How Honors classes affect your GPA
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Honors courses recognize the extra rigor of accelerated coursework.
            Under the standard +0.5 weighting scale, an A in an Honors class is
            worth 4.5 quality points — half a step above a regular A.
          </p>

          <DefinitionBlock
            term="Honors GPA"
            definition="An Honors-focused GPA gives every Honors course a +0.5 grade-point bonus on the standard weighting scale. An A in an Honors class is worth 4.5, making Honors classes worth more than regular but less than AP/IB."
          />

          <KeyFacts
            items={[
              { label: "Honors bonus (standard)", value: "+0.5 grade points" },
              { label: "Max with all Honors A's", value: "4.5 weighted" },
              { label: "Vs AP", value: "Honors = +0.5, AP = +1.0 (most schools)" },
              { label: "Pre-AP / Pre-IB", value: "Usually treated as Honors" },
            ]}
          />

          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Some schools only weight AP and IB classes, leaving Honors at 4.0.
            Others use a +0.25 Honors bonus. Switch the school weighting scale
            above to match your district&apos;s policy.
          </p>

          <h3 className="mt-8 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            How each grade looks in Honors
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
            {[
              { g: "A", v: "4.5" },
              { g: "A-", v: "4.2" },
              { g: "B+", v: "3.8" },
              { g: "B", v: "3.5" },
              { g: "B-", v: "3.2" },
              { g: "C+", v: "2.8" },
              { g: "C", v: "2.5" },
              { g: "F", v: "0.0" },
            ].map((row) => (
              <div
                key={row.g}
                className="glass-input rounded-xl p-3 text-center"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                  {row.g}
                </div>
                <div className="tabular mt-1 text-lg font-bold text-cyan-700 dark:text-cyan-300">
                  {row.v}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            Standard +0.5 scale. F never gets the bonus.
          </p>
        
          <InlineCalcCta
            href="/weighted-gpa-calculator"
            title="Mixing AP and Honors classes?"
            body="The full Weighted GPA Calculator handles AP, Honors, IB, and dual-enrollment together."
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Honors vs AP — the trade-off
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Honors gives a +0.5 boost; the{" "}
            <Link href="/ap-gpa-calculator" className="font-medium text-blue-700 hover:underline">AP track</Link>{" "}
            gives +1.0. So mathematically AP &quot;pays&quot; double per A. But
            Honors classes are usually less time-intensive and don&apos;t require
            an external exam. A schedule of all-Honors A&apos;s outranks
            all-AP B&apos;s on weighted (4.5 vs 4.0) but loses to all-AP A&apos;s
            (4.5 vs 5.0). For exam-side credit, the{" "}
            <Link href="/ap-score-to-gpa-calculator" className="font-medium text-blue-700 hover:underline">AP Score Predictor</Link>{" "}
            shows what 1–5 scores convert to.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Pre-AP, Pre-IB, and other &quot;rigorous&quot; labels
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Pre-AP, Pre-IB, accelerated, and gifted-track classes typically
            weight as Honors (+0.5) at most schools. Some districts roll them
            into a single &quot;advanced&quot; tier with the same bonus. A few
            don&apos;t weight them at all. Check your transcript legend and
            switch the scale above to match.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Honors and class rank
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Many schools use weighted GPA for class rank — meaning Honors and AP
            students start with a structural advantage. If your district
            publishes class rank, see the{" "}
            <Link href="/weighted-gpa-calculator" className="font-medium text-blue-700 hover:underline">Weighted GPA Calculator</Link>{" "}
            to model your full transcript with the bonus, then compare against
            the{" "}
            <Link href="/unweighted-gpa-calculator" className="font-medium text-blue-700 hover:underline">unweighted</Link>{" "}
            view that most college admissions use.
          </p>

          <InlineCalcCta
            href="/high-school-gpa-calculator"
            title="High school transcript view?"
            body="See the full picture — weighted + unweighted side by side — in the High School GPA Calculator."
          />

          <Citation source="NCES" url="https://nces.ed.gov/" detail="Honors course weighting variance by district" />
          <Citation source="College Board" url="https://www.collegeboard.org/" detail="Honors and AP in admissions" />
        </div>
      </article>
      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentHref="/honors-gpa-calculator" />
    </>
  );
}
