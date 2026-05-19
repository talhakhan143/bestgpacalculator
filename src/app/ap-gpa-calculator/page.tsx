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
  title: "AP GPA Calculator — How AP Classes Boost Your GPA",
  description:
    "AP GPA calculator with bonus points for Advanced Placement courses. See exactly how each AP class raises your weighted GPA. Free, mobile-friendly.",
  alternates: { canonical: "/ap-gpa-calculator" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How much does an AP class boost your GPA?",
    a: "Under the standard +1.0 weighting scale, an A in an AP class is worth 5.0 quality points instead of 4.0. Over a year of four AP A's, your weighted GPA can sit at 5.0 while your unweighted stays at 4.0.",
  },
  {
    q: "Do all schools weight AP at +1.0?",
    a: "No. The +1.0 bonus is the most common, but conservative scales use +0.75, third-step uses +0.67, and a few schools cap the bonus per semester. Switch the weighting dropdown to match your district.",
  },
  {
    q: "Does an AP exam score change my GPA?",
    a: "Not directly. Your high school weighted GPA only uses your class grade. AP exam scores (1-5) earn potential college credit, but they don't change your transcript GPA.",
  },
  {
    q: "Should I take AP classes just for the GPA boost?",
    a: "AP classes help GPA and signal academic rigor to colleges, but a B in AP can be worse than an A in regular for selective admissions. Take AP classes you can handle and care about.",
  },
];

export default function ApGpaPage() {
  return (
    <>
      <CalculatorSchema
        name="AP GPA Calculator"
        description="AP GPA calculator with weighted bonus for Advanced Placement classes. See how each AP class affects your high school weighted GPA."
        url="https://bestgpacalculator.online/ap-gpa-calculator"
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="AP GPA Calculator"
        description="AP GPA calculator with weighted bonus for Advanced Placement classes. See how each AP class affects your high school weighted GPA."
        url="https://bestgpacalculator.online/ap-gpa-calculator"
        datePublished="2026-04-15"
        dateModified="2026-05-06"
      />


      
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Calculators", href: "/weighted-gpa-calculator" }, { name: "AP GPA", href: "/ap-gpa-calculator" }]} />
      <Hero
        badge="Advanced Placement"
        title="AP GPA"
        highlight="Calculator"
        subtitle="See how Advanced Placement classes affect your weighted GPA. AP courses typically add a +1.0 bonus, turning an A into a 5.0. Tag your AP classes below for instant numbers."
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <WeightedGPACalculator />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <ArticleMeta updated="2026-05-06" />
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            How much does an AP class boost your GPA?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Under the standard +1.0 weighting scale, an A in an AP class is
            worth 5.0 quality points instead of the usual 4.0. Over a typical
            year of four AP classes (all A&apos;s), your weighted GPA can sit
            at 5.0 while your unweighted GPA stays at 4.0.
          </p>

          <DefinitionBlock
            term="AP GPA"
            definition="An AP-focused GPA calculation gives every Advanced Placement course an extra +1.0 grade-point bonus on the standard weighting scale. An A in an AP class is worth 5.0 quality points, lifting an AP-heavy student well above the 4.0 ceiling."
          />

          <KeyFacts
            items={[
              { label: "AP bonus (standard)", value: "+1.0 grade points" },
              { label: "Max with all AP A's", value: "5.0 weighted" },
              { label: "Affects exam score?", value: "No — class grade and exam score are separate" },
              { label: "College credit?", value: "Yes, separately, based on exam score 3+" },
            ]}
          />

          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Not every district weights AP at +1.0. Conservative scales use
            +0.75, and a few schools cap the bonus per semester. Use the
            weighting dropdown above to match your school&apos;s exact policy.
          </p>

          <h3 className="mt-8 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            How each grade looks in AP
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
            {[
              { g: "A", v: "5.0" },
              { g: "A-", v: "4.7" },
              { g: "B+", v: "4.3" },
              { g: "B", v: "4.0" },
              { g: "B-", v: "3.7" },
              { g: "C+", v: "3.3" },
              { g: "C", v: "3.0" },
              { g: "F", v: "0.0" },
            ].map((row) => (
              <div
                key={row.g}
                className="glass-input rounded-xl p-3 text-center"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                  {row.g}
                </div>
                <div className="tabular mt-1 text-lg font-bold text-fuchsia-700 dark:text-fuchsia-300">
                  {row.v}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            Standard +1.0 scale. F never gets the bonus.
          </p>
        
          <InlineCalcCta
            href="/ap-score-to-gpa-calculator"
            title="Predict your AP exam impact"
            body="Already taken AP exams? See likely college credits with the AP Score to GPA Calculator."
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            AP, Honors, IB, and dual enrollment — how they stack
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Most US schools weight AP and IB the same way (+1.0), Honors at
            +0.5, and dual-enrollment at +1.0 (sometimes +0.5). The{" "}
            <Link href="/honors-gpa-calculator" className="font-medium text-blue-700 hover:underline">Honors GPA Calculator</Link>{" "}
            covers the +0.5 track separately. The{" "}
            <Link href="/weighted-gpa-calculator" className="font-medium text-blue-700 hover:underline">Weighted GPA Calculator</Link>{" "}
            handles a mixed schedule with a 5-scale weighting toggle. Selective
            colleges typically recalculate to a flat{" "}
            <Link href="/unweighted-gpa-calculator" className="font-medium text-blue-700 hover:underline">unweighted</Link>{" "}
            number and judge rigor separately, so always track both.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            How AP exam scores convert to college credit
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            The class grade and the AP exam score are independent. Class grade
            shapes high school GPA; the 1–5 exam score determines college credit.
            Most universities accept 4 or 5 for credit; some accept 3. The{" "}
            <Link href="/ap-score-to-gpa-calculator" className="font-medium text-blue-700 hover:underline">AP Score Predictor</Link>{" "}
            converts your scores to likely college credit hours and shows how
            many semesters you could shave.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Common AP scheduling mistakes
          </h3>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li><strong className="text-zinc-900 dark:text-zinc-100">Stacking too many AP classes.</strong> A B in AP can hurt unweighted GPA more than an A in regular helps weighted.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100">Assuming all AP classes weight equally.</strong> Some districts cap total bonus per semester (e.g., max +2.0 added).</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100">Skipping prerequisites.</strong> AP Calculus BC without strong precalc usually means a B or C.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100">Forgetting AP weighting differs by district.</strong> Switch the scale on this page to match yours.</li>
          </ul>

          <InlineCalcCta
            href="/high-school-gpa-calculator"
            title="See your full transcript average"
            body="Combine AP, Honors, regular, and dual classes in the High School GPA Calculator."
          />

          <Citation source="College Board AP Program" url="https://apstudents.collegeboard.org/" detail="AP class weighting and credit policy" />
          <Citation source="College Board AP Credit Policy Search" url="https://apstudents.collegeboard.org/getting-credit-placement/search-policies" detail="search any college's AP credit policy" />
          <Citation source="NCES" url="https://nces.ed.gov/programs/digest/" detail="AP participation and high school GPA distributions" />
        </div>
      </article>
      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentHref="/ap-gpa-calculator" />
    </>
  );
}
