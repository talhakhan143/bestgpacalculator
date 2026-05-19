import type { Metadata } from "next";
import { PercentageGPACalculator } from "@/components/calculator/PercentageGPACalculator";
import { Hero } from "@/components/sections/Hero";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { ArticleSchema, CalculatorSchema, FaqSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import Link from "next/link";
import { InlineCalcCta, Citation, DefinitionBlock, KeyFacts, ArticleMeta } from "@/components/sections/InContentLinks";

export const metadata: Metadata = {
  title: "Percentage to GPA Calculator (% → 4.0)",
  description:
    "Convert percentage grades to GPA on the standard 4.0 scale. Free percentage-to-GPA calculator with credit-weighted average and conversion table.",
  alternates: { canonical: "/percentage-to-gpa-calculator" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How do I convert percentage to GPA?",
    a: "Use the standard US conversion table: 93%+ = A (4.0), 90-92% = A- (3.7), 87-89% = B+ (3.3), and so on. This calculator does the conversion automatically and averages across your classes.",
  },
  {
    q: "Are percentage-to-GPA conversions universal?",
    a: "No. The 93+ = A scale is most common in the US, but some schools use 90+ = A. International grading systems differ even more (UK, India, Germany all use different scales). This calculator uses the standard US 10-point scale.",
  },
  {
    q: "What if my school's conversion table is different?",
    a: "Check your school's official policy. The differences are usually small (1-2 percentage points per letter), so a typical conversion gets you close enough for planning. Your transcript shows the official number.",
  },
  {
    q: "Why does my percentage GPA differ from my reported GPA?",
    a: "Schools report GPA from letter grades, not percentages. A 92% might be an A- (3.7) on this scale but could be an A (4.0) at a school that uses 90+ = A. Use this as an estimate, not a transcript replacement.",
  },
];

export default function PercentageToGpaPage() {
  return (
    <>
      <CalculatorSchema
        name="Percentage to GPA Calculator"
        description="Convert percentage grades to GPA on the 4.0 scale. Credit-weighted average."
        url="https://bestgpacalculator.online/percentage-to-gpa-calculator"
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="Percentage to GPA Calculator"
        description="Convert percentage grades to GPA on the 4.0 scale. Credit-weighted average."
        url="https://bestgpacalculator.online/percentage-to-gpa-calculator"
        datePublished="2026-04-15"
        dateModified="2026-05-06"
      />


      
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Calculators", href: "/weighted-gpa-calculator" }, { name: "Percentage to GPA", href: "/percentage-to-gpa-calculator" }]} />
      <Hero
        badge="Percentage → GPA"
        title="Percentage to GPA"
        highlight="Calculator"
        subtitle="Convert percentage grades to GPA on the 4.0 scale. Enter percentages and credits, see your GPA instantly with letter grades shown for each class."
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <PercentageGPACalculator />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <ArticleMeta updated="2026-05-06" />
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Standard percentage-to-GPA conversion
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            US schools commonly use this 10-point scale to convert percentage
            grades to letter grades and GPA points:
          </p>

          <DefinitionBlock
            term="Percentage to GPA Conversion"
            definition="Converting a percentage grade to GPA uses a standard 10-point scale: 93%+ = A (4.0), 90–92% = A- (3.7), 87–89% = B+ (3.3), and so on. Each letter grade maps to a specific quality-point value."
          />

          <KeyFacts
            items={[
              { label: "Scale type", value: "10-point conversion (standard US)" },
              { label: "A (93–100%)", value: "4.0 quality points" },
              { label: "B (83–86%)", value: "3.0 quality points" },
              { label: "Min passing C (73–76%)", value: "2.0 quality points" },
            ]}
          />


          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/40 text-xs uppercase tracking-[0.14em] text-zinc-600 dark:border-white/10 dark:text-zinc-400">
                  <th className="px-4 py-3 font-semibold">Percentage</th>
                  <th className="px-4 py-3 font-semibold">Letter</th>
                  <th className="px-4 py-3 font-semibold tabular">GPA</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["93-100", "A", "4.0"],
                  ["90-92", "A-", "3.7"],
                  ["87-89", "B+", "3.3"],
                  ["83-86", "B", "3.0"],
                  ["80-82", "B-", "2.7"],
                  ["77-79", "C+", "2.3"],
                  ["73-76", "C", "2.0"],
                  ["70-72", "C-", "1.7"],
                  ["67-69", "D+", "1.3"],
                  ["65-66", "D", "1.0"],
                  ["below 65", "F", "0.0"],
                ].map(([pct, letter, gpa]) => (
                  <tr
                    key={pct}
                    className="border-b border-white/30 last:border-b-0 dark:border-white/[0.06]"
                  >
                    <td className="tabular px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300">
                      {pct}%
                    </td>
                    <td className="px-4 py-3 font-bold text-fuchsia-700 dark:text-fuchsia-300">
                      {letter}
                    </td>
                    <td className="tabular px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">
                      {gpa}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">
            Some schools use a 7-point scale where 90+ = A. Your school&apos;s
            handbook is authoritative — this is the most common US convention.
          </p>
        
          <InlineCalcCta
            href="/unweighted-gpa-calculator"
            title="Got the GPA — now compute the average?"
            body="Convert per-class then total it up with the Unweighted GPA Calculator."
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            International percentage scales
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Indian (CBSE/CGPA), UK (degree classification), German (1.0–5.0
            inverse), and Chinese (5-point/100-point) systems each use a
            different mapping. WES (World Education Services) and ECE publish
            authoritative conversion tables for credential evaluation. For US
            applications, most admissions offices accept this 10-point
            conversion as a baseline and re-evaluate from the transcript.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            After conversion — what to do with the GPA
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Once you have a 4.0-scale GPA, the next move depends on context.
            College applicants should compare against the{" "}
            <Link href="/unweighted-gpa-calculator" className="font-medium text-blue-700 hover:underline">unweighted</Link>{" "}
            and{" "}
            <Link href="/weighted-gpa-calculator" className="font-medium text-blue-700 hover:underline">weighted</Link>{" "}
            views — most US schools recalculate to unweighted anyway. Current
            college students roll the converted GPA into their{" "}
            <Link href="/college-gpa-calculator" className="font-medium text-blue-700 hover:underline">college GPA</Link>{" "}
            on the same 4.0 scale. If you don&apos;t have credit hours
            documented, the{" "}
            <Link href="/gpa-calculator-without-credits" className="font-medium text-blue-700 hover:underline">GPA Calculator without Credits</Link>{" "}
            treats every class equally.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Common conversion mistakes
          </h3>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li><strong className="text-zinc-900 dark:text-zinc-100">Mapping 90% to A (4.0).</strong> On the 10-point scale 90–92 = A− (3.7). The 7-point scale gives A; check your school.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100">Averaging percentages and converting once.</strong> Convert per class, then weight-average — converting an averaged percentage hides class-by-class differences.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100">Ignoring credit hours.</strong> A 4-credit class&apos;s GPA contribution is twice that of a 2-credit elective.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100">Converting curved grades.</strong> Some courses curve internally — the percentage on file may already reflect that curve, others may not.</li>
          </ul>

          <InlineCalcCta
            href="/high-school-gpa-calculator"
            title="High school transcript?"
            body="Drop converted grades into the High School GPA Calculator for weighted + unweighted side by side."
          />

          <Citation source="NCES" url="https://nces.ed.gov/" detail="percentage-to-GPA conversion conventions" />
          <Citation source="World Education Services (WES)" url="https://www.wes.org/" detail="international transcript conversion to US 4.0 scale" />
          <Citation source="College Board" url="https://www.collegeboard.org/" detail="how admissions handle percentage-graded transcripts" />
        </div>
      </article>
      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentHref="/percentage-to-gpa-calculator" />
    </>
  );
}
