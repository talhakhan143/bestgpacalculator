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
  title: "Unweighted GPA Calculator — 4.0 Scale, No Bonuses",
  description:
    "Free unweighted GPA calculator on the standard 4.0 scale. No AP or Honors bonuses — get the GPA most colleges recalculate from your transcript.",
  alternates: { canonical: "/unweighted-gpa-calculator" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is unweighted GPA?",
    a: "Unweighted GPA is calculated on a 4.0 scale where every class is treated equally regardless of difficulty. An A is 4.0, B is 3.0, C is 2.0 — Honors and AP classes don't get a bonus.",
  },
  {
    q: "Why do colleges prefer unweighted GPA?",
    a: "Colleges recalculate weighted GPAs to compare students fairly across schools that weight differently. Unweighted is the universal baseline; rigor is then judged separately by looking at the transcript.",
  },
  {
    q: "Can my unweighted GPA go above 4.0?",
    a: "No. The unweighted scale caps at 4.0 (or 4.0 if you use A+ = 4.0). To go above 4.0 you need weighting bonuses for AP/Honors classes, which is what a weighted GPA tracks.",
  },
  {
    q: "Is unweighted GPA more important than weighted?",
    a: "It depends on the school. Most selective US colleges focus on unweighted GPA plus course rigor. Some scholarships and class rankings use weighted. Calculate both — that's why this tool shows them side-by-side on related pages.",
  },
];

export default function UnweightedGpaPage() {
  return (
    <>
      <CalculatorSchema
        name="Unweighted GPA Calculator"
        description="Free unweighted GPA calculator on the standard 4.0 scale. No AP or Honors bonuses."
        url="https://bestgpacalculator.online/unweighted-gpa-calculator"
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="Unweighted GPA Calculator"
        description="Free unweighted GPA calculator on the standard 4.0 scale. No AP or Honors bonuses."
        url="https://bestgpacalculator.online/unweighted-gpa-calculator"
        datePublished="2026-04-16"
        dateModified="2026-05-06"
      />


      
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Unweighted GPA", href: "/unweighted-gpa-calculator" }]} />
      <Hero
        badge="The 4.0 baseline"
        title="Unweighted"
        highlight="GPA Calculator"
        subtitle="Calculate your GPA on the standard 4.0 scale — no AP or Honors bonus, no weighting tricks. The number colleges actually compare you on."
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <WeightedGPACalculator
          showLevels={false}
          showPresets={false}
          forcedLevel="regular"
          forcedPresetId="standard"
          hideUnweighted
          resultLabel={{ weighted: "Unweighted" }}
          storageScope="unweighted"
        />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <ArticleMeta updated="2026-05-06" />
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            How unweighted GPA works
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Unweighted GPA treats every class the same. A in AP Calculus = A in
            regular gym = 4.0 quality points. That removes any difference in
            course difficulty from the formula — the only inputs are your
            grades and credit hours.
          </p>

          <DefinitionBlock
            term="Unweighted GPA"
            definition="Unweighted GPA uses a flat 4.0 scale where every course counts equally regardless of difficulty. A=4.0, B=3.0, C=2.0, D=1.0, F=0.0. Course rigor (AP, Honors, IB) doesn't change the grade points."
          />

          <KeyFacts
            items={[
              { label: "Maximum value", value: "4.0" },
              { label: "AP class boost", value: "None — same as regular" },
              { label: "Used by", value: "Most US colleges, transcripts, scholarships" },
              { label: "Common scale variants", value: "Standard 4.0, plus/minus 4.0, 4.3 with A+" },
            ]}
          />

          <pre className="glass-input mt-4 overflow-x-auto rounded-xl p-4 text-xs leading-relaxed text-zinc-800 dark:text-zinc-200">
{`unweighted GPA = Σ(grade_point × credits) / Σ(credits)

A → 4.0    A- → 3.7
B+ → 3.3   B → 3.0    B- → 2.7
C+ → 2.3   C → 2.0    C- → 1.7
D+ → 1.3   D → 1.0    D- → 0.7
F → 0.0`}
          </pre>
        
          <InlineCalcCta
            href="/percentage-to-gpa-calculator"
            title="Coming from a percentage scale?"
            body="Convert your % grades to a 4.0 GPA with the Percentage to GPA Calculator."
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Unweighted vs weighted — when each one matters
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Most selective US colleges <strong>recalculate</strong> your GPA on
            an internal unweighted scale to compare students fairly across
            schools that weight differently. Course rigor is then judged
            separately from the transcript. So unweighted is the apples-to-apples
            number; the{" "}
            <Link href="/weighted-gpa-calculator" className="font-medium text-blue-700 hover:underline">weighted GPA</Link>{" "}
            signals ambition. Some scholarships, class rank, and valedictorian
            calculations still use weighted, so always know both. The{" "}
            <Link href="/ap-gpa-calculator" className="font-medium text-blue-700 hover:underline">AP GPA Calculator</Link>{" "}
            and{" "}
            <Link href="/honors-gpa-calculator" className="font-medium text-blue-700 hover:underline">Honors GPA Calculator</Link>{" "}
            cover the bonus side.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            What if your school uses a different scale?
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Schools outside the US (and a few US programs) report grades in
            percentages, on a 10-point scale, or on a 100-point scale. The{" "}
            <Link href="/percentage-to-gpa-calculator" className="font-medium text-blue-700 hover:underline">Percentage to GPA Converter</Link>{" "}
            maps any percentage to a 4.0 letter grade. If your transcript
            doesn&apos;t list credits at all, the{" "}
            <Link href="/gpa-calculator-without-credits" className="font-medium text-blue-700 hover:underline">GPA Calculator without Credits</Link>{" "}
            treats every class equally. For middle school transcripts that
            haven&apos;t introduced credit hours yet, the{" "}
            <Link href="/middle-school-gpa-calculator" className="font-medium text-blue-700 hover:underline">Middle School GPA Calculator</Link>{" "}
            uses the same simplified approach.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Common mistakes that inflate or deflate the number
          </h3>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li><strong className="text-zinc-900 dark:text-zinc-100">Adding AP/Honors bonuses anyway.</strong> Unweighted is unweighted — the bonus belongs only on weighted.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100">Using A+ = 4.3.</strong> Most US schools cap at 4.0 even with an A+. Check your transcript legend.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100">Counting pass/fail courses.</strong> Pass/no-pass classes typically don&apos;t enter the GPA.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100">Mixing semester and year grades.</strong> Pick one — most schools report semester grades into GPA.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100">Forgetting credit hours.</strong> A 4-credit course pulls weight twice as much as a 1-credit elective.</li>
          </ul>

          <InlineCalcCta
            href="/college-gpa-calculator"
            title="College student?"
            body="College GPAs are almost always unweighted on the 4.0 scale. The College GPA Calculator handles plus/minus and credit hours."
          />

          <Citation source="NCES" url="https://nces.ed.gov/" detail="US grading scale standards" />
          <Citation source="College Board" url="https://www.collegeboard.org/" detail="how admissions offices recalculate GPA" />
          <Citation source="NACAC State of College Admission" url="https://www.nacacnet.org/" detail="GPA importance in admissions decisions" />
        </div>
      </article>
      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentHref="/unweighted-gpa-calculator" />
    </>
  );
}
