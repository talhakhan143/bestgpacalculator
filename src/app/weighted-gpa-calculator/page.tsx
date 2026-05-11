import type { Metadata } from "next";
import { WeightedGPACalculator } from "@/components/calculator/WeightedGPACalculator";
import { Hero } from "@/components/sections/Hero";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { ArticleSchema, CalculatorSchema, FaqSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import { InlineCalcCta, Citation, DefinitionBlock, KeyFacts, ArticleMeta } from "@/components/sections/InContentLinks";

export const metadata: Metadata = {
  title: "Weighted GPA Calculator — AP, Honors, IB",
  description:
    "Calculate your weighted high school GPA with AP, Honors, IB, and dual-enrollment bonuses. Five weighting scales supported. Free, no signup, mobile-first.",
  alternates: { canonical: "/weighted-gpa-calculator" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How is weighted GPA calculated?",
    a: "Weighted GPA gives extra credit for harder classes. Most schools add +0.5 to Honors and +1.0 to AP, IB, and dual-enrollment courses, then average those quality points across all classes weighted by credits.",
  },
  {
    q: "What is the highest weighted GPA possible?",
    a: "Under the standard +1.0 AP scale, an A in every AP class gives you a 5.0 weighted GPA. Some districts cap the bonus, others allow higher numbers if their scale is uncommon — but 5.0 is the typical ceiling.",
  },
  {
    q: "How do I know which weighting scale my school uses?",
    a: "Check your school's student handbook or transcript legend — both usually print the GPA formula. If neither is clear, ask your counselor. The most common scale is +0.5 Honors and +1.0 AP/IB.",
  },
  {
    q: "Does this calculator work for college GPA?",
    a: "It's optimized for high school weighted GPA. College GPA is almost always unweighted on a 4.0 scale, so the standard preset with all classes set to Regular gives a college-style result.",
  },
];

export default function WeightedGpaPage() {
  return (
    <>
      <CalculatorSchema
        name="Weighted GPA Calculator"
        description="Free weighted GPA calculator for high school. Five weighting scales, AP/Honors/IB/dual-enrollment support, mobile-first, no signup."
        url="https://bestgpacalculator.com/weighted-gpa-calculator"
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="Weighted GPA Calculator"
        description="Free weighted GPA calculator for high school. Five weighting scales, AP/Honors/IB/dual-enrollment support, mobile-first, no signup."
        url="https://bestgpacalculator.com/weighted-gpa-calculator"
        datePublished="2026-04-15"
        dateModified="2026-05-06"
      />


      
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Weighted GPA", href: "/weighted-gpa-calculator" }]} />
      <Hero
        badge="The complete tool"
        title="Weighted"
        highlight="GPA Calculator"
        subtitle="Calculate your weighted high school GPA on a 5.0 scale. Five weighting scales — match your school's exact policy. AP, Honors, IB, dual-enrollment. Mobile-first, instant, free."
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <WeightedGPACalculator />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <ArticleMeta updated="2026-05-06" />
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            What is a weighted GPA?
          </h2>

          <DefinitionBlock
            term="Weighted GPA"
            definition="A weighted GPA is a grade point average that adds bonus points for harder courses — typically +0.5 for Honors and +1.0 for AP, IB, and dual-enrollment classes. Under the standard scale an A in an AP class is worth 5.0 quality points instead of 4.0, so weighted GPAs can exceed the regular 4.0 ceiling."
          />

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            A weighted GPA rewards students for taking harder classes. Most US
            high schools add{" "}
            <strong className="text-slate-900">+0.5 to Honors</strong> and{" "}
            <strong className="text-slate-900">+1.0 to AP/IB</strong> grade
            points, so an A in an AP class is worth 5.0 instead of 4.0. The
            unweighted GPA ignores course rigor and stays on the 4.0 scale.
            Most colleges look at both — the weighted figure shows ambition,
            the unweighted shows raw mastery.
          </p>

          <KeyFacts
            items={[
              { label: "Typical scale", value: "5.0 maximum (under standard +1.0 AP)" },
              { label: "AP class bonus", value: "+1.0 grade points (most US schools)" },
              { label: "Honors class bonus", value: "+0.5 grade points (most US schools)" },
              { label: "IB / dual-enrollment", value: "+1.0 (treated like AP)" },
            ]}
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">
            How to calculate weighted GPA — step by step
          </h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-slate-700">
            <li>Convert each letter grade to grade points (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0).</li>
            <li>Add the level bonus to each AP/Honors/IB course (+1.0 or +0.5 under the standard scale).</li>
            <li>Multiply each adjusted grade point by the credit hours for that class.</li>
            <li>Sum those products to get total quality points.</li>
            <li>Divide total quality points by total credit hours. That&apos;s your weighted GPA.</li>
          </ol>

          <pre className="glass-input mt-5 overflow-x-auto rounded-xl p-4 text-xs leading-relaxed text-slate-800">
{`weighted GPA = Σ((grade_point + level_bonus) × credits) / Σ(credits)
unweighted GPA = Σ(grade_point × credits) / Σ(credits)

Worked example (4 classes, 1 credit each):
  AP Calculus BC,   A   →  (4.0 + 1.0) × 1 = 5.0
  Honors English,   A-  →  (3.7 + 0.5) × 1 = 4.2
  Regular History,  B+  →  (3.3 + 0.0) × 1 = 3.3
  AP Biology,       A   →  (4.0 + 1.0) × 1 = 5.0

  Total quality points: 17.5
  Total credits: 4
  Weighted GPA: 17.5 / 4 = 4.375
  Unweighted equivalent: 14.0 / 4 = 3.50`}
          </pre>

          <InlineCalcCta
            href="/ap-score-to-gpa-calculator"
            title="Predict AP exam impact on college credit"
            body="Use the AP Score Predictor to see how many college credits you'll likely earn from each AP exam score (1-5)."
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">
            Five common weighting scales
          </h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Schools don&apos;t agree on how much an AP or Honors class is worth.
            Match your school&apos;s policy with the dropdown above the
            calculator. Here&apos;s what an A is worth under each common scale:
          </p>

          <div className="not-prose mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.14em] text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Scale</th>
                  <th className="px-4 py-3 font-semibold">Honors A</th>
                  <th className="px-4 py-3 font-semibold">AP / IB A</th>
                  <th className="px-4 py-3 font-semibold">Used by</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-t border-slate-100"><td className="px-4 py-3 font-semibold">Standard (+0.5 / +1.0)</td><td className="tabular px-4 py-3">4.5</td><td className="tabular px-4 py-3">5.0</td><td className="px-4 py-3">Most US public high schools</td></tr>
                <tr className="border-t border-slate-100"><td className="px-4 py-3 font-semibold">Conservative (+0.25 / +0.75)</td><td className="tabular px-4 py-3">4.25</td><td className="tabular px-4 py-3">4.75</td><td className="px-4 py-3">Districts limiting grade inflation</td></tr>
                <tr className="border-t border-slate-100"><td className="px-4 py-3 font-semibold">Third-step (+0.33 / +0.67)</td><td className="tabular px-4 py-3">4.33</td><td className="tabular px-4 py-3">4.67</td><td className="px-4 py-3">Schools using thirds</td></tr>
                <tr className="border-t border-slate-100"><td className="px-4 py-3 font-semibold">Uniform (+1.0 / +1.0)</td><td className="tabular px-4 py-3">5.0</td><td className="tabular px-4 py-3">5.0</td><td className="px-4 py-3">Treats Honors = AP</td></tr>
                <tr className="border-t border-slate-100"><td className="px-4 py-3 font-semibold">AP-only (0 / +1.0)</td><td className="tabular px-4 py-3">4.0</td><td className="tabular px-4 py-3">5.0</td><td className="px-4 py-3">No Honors bonus</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">
            Why your school&apos;s GPA may differ
          </h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            School policies vary widely. Some districts only weight AP, not Honors.
            Some cap weighted GPA at 4.5 even with all AP A&apos;s. A few use
            100-point scales internally and convert at year-end. Common
            policy variations:
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-slate-700">
            <li><strong className="text-slate-900">Honors-only AP weighting:</strong> Some private schools skip the AP bonus entirely.</li>
            <li><strong className="text-slate-900">Pre-AP / Pre-IB:</strong> Treated as Honors (+0.5) at most schools.</li>
            <li><strong className="text-slate-900">Dual-enrollment / college-in-high-school:</strong> Weighted +1.0 like AP at most public schools.</li>
            <li><strong className="text-slate-900">Cap on bonus:</strong> Some districts limit total bonus per semester (e.g., max 2.0 added).</li>
            <li><strong className="text-slate-900">Quarter vs semester:</strong> Some schools report only semester GPA, some both.</li>
          </ul>

          <Citation source="College Board AP Program" url="https://apstudents.collegeboard.org/" detail="official AP weighting and college credit policy" />
          <Citation source="NCES Digest of Education Statistics" url="https://nces.ed.gov/programs/digest/" detail="national high school GPA averages and grading distributions" />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">
            Common mistakes that throw off your weighted GPA
          </h3>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-slate-700">
            <li><strong className="text-slate-900">Using A=4.0 and A+=4.3 inconsistently.</strong> Most US high schools cap A and A+ at 4.0. College scales sometimes recognize 4.3.</li>
            <li><strong className="text-slate-900">Forgetting plus/minus rules.</strong> Some schools don&apos;t use +/− at all, others use only on transcripts but not for GPA.</li>
            <li><strong className="text-slate-900">Mixing semester and yearly grades.</strong> Many schools post both — only one feeds GPA. Check your transcript.</li>
            <li><strong className="text-slate-900">Adding the bonus to unweighted.</strong> Weighted only — never inflate the unweighted average.</li>
            <li><strong className="text-slate-900">Using credit values that don&apos;t match transcript.</strong> One year-long class is usually 1.0 credit, semester = 0.5. Block schedules differ.</li>
          </ul>

          <InlineCalcCta
            href="/gpa-goal-calculator"
            title="Need a target GPA next semester?"
            body="The GPA Goal Calculator works backwards — tell it your current and target GPA, get the average grade you need."
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">
            Weighted vs unweighted — which one matters?
          </h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Both. Selective colleges typically <strong>recalculate</strong> your
            GPA on a standard scale to normalize across schools, then look at
            course rigor separately. So the weighted number signals ambition,
            but the unweighted (or recalculated) number drives admissions math.
            Track both. Use this calculator&apos;s side-by-side display to see
            how each AP class shifts the gap.
          </p>
        </div>
      </article>
      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentHref="/weighted-gpa-calculator" />
    </>
  );
}
