import type { Metadata } from "next";
import Link from "next/link";
import { GpaToPercentageCalculator } from "@/components/calculator/GpaToPercentageCalculator";
import { Hero } from "@/components/sections/Hero";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { ArticleSchema, CalculatorSchema, FaqSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArticleMeta, DefinitionBlock, KeyFacts } from "@/components/sections/InContentLinks";

export const metadata: Metadata = {
  title: "GPA to Percentage Calculator — Convert GPA to %",
  description:
    "Free GPA to percentage converter. US 10-point, 7-point, and Indian CBSE conversion tables. Get the equivalent percentage for any GPA from 0.0 to 4.33.",
  alternates: { canonical: "/gpa-to-percentage-calculator" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How do I convert GPA to percentage?",
    a: "There's no single formula — schools use different tables. The most common US 10-point table maps 4.0 → 93+%, 3.7 → 90-92%, 3.3 → 87-89%, 3.0 → 83-86%. Indian CBSE uses CGPA × 9.5. Our calculator handles each table.",
  },
  {
    q: "What percentage is a 3.5 GPA?",
    a: "On the US 10-point scale, a 3.5 GPA is approximately 88% (B+ range, 87-89%). On a 7-point scale, 3.5 is around 88-89%. Indian CBSE: 3.5 × 9.5 ≈ 33.25% — note Indian CGPA usually runs 0-10, not 0-4.",
  },
  {
    q: "What percentage is a 4.0 GPA?",
    a: "On the US 10-point scale, a 4.0 GPA represents 93-100% (an A average). On a 7-point scale, it's typically 93+. International schools translating from a 4.0 scale often use 93% as the standard equivalent.",
  },
  {
    q: "Why is the conversion only approximate?",
    a: "GPA bins map to percentage ranges, not single values. A 3.7 represents 'A-' which spans 90-92% — the actual percentage in that range could be 90.1 or 92.9. Conversion tables pick a representative midpoint or low end.",
  },
  {
    q: "How is this different from a percentage-to-GPA calculator?",
    a: "This page converts the other direction — you have a GPA and want a percentage. If you have a raw percentage and want the GPA equivalent, use our percentage-to-GPA calculator instead.",
  },
];

export default function GpaToPctPage() {
  return (
    <>
      <CalculatorSchema
        name="GPA to Percentage Calculator"
        description="Free GPA to percentage converter with US 10-point, 7-point, and Indian CBSE conversion tables."
        url="https://bestgpacalculator.online/gpa-to-percentage-calculator"
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="GPA to Percentage Calculator"
        description="Convert any GPA to its equivalent percentage using multiple international conversion tables."
        url="https://bestgpacalculator.online/gpa-to-percentage-calculator"
        datePublished="2026-06-02"
        dateModified="2026-06-02"
      />

      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "GPA to Percentage", href: "/gpa-to-percentage-calculator" }]} />
      <Hero
        badge="GPA → Percentage"
        title="GPA to Percentage"
        highlight="Calculator"
        subtitle="Convert any US or Indian GPA to its equivalent percentage. Three conversion tables built in — 10-point US, 7-point US, and Indian CBSE (CGPA × 9.5)."
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <GpaToPercentageCalculator />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <ArticleMeta updated="2026-06-02" />
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">GPA to percentage conversion</h2>

          <DefinitionBlock
            term="GPA-to-percentage conversion"
            definition="The mapping between a 4.0-scale grade point average and its equivalent percentage grade. The conversion is institution-specific — there is no universal formula — but most US schools use one of two standard tables, and Indian universities use CGPA × 9.5 (CBSE) or × 10 (other boards)."
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">US 10-point scale (most common)</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-2 py-2 font-semibold">GPA</th>
                  <th className="px-2 py-2 font-semibold">Letter</th>
                  <th className="px-2 py-2 font-semibold">Percentage</th>
                </tr>
              </thead>
              <tbody className="tabular">
                {[
                  ["4.0", "A", "93–100%"],
                  ["3.7", "A−", "90–92%"],
                  ["3.3", "B+", "87–89%"],
                  ["3.0", "B", "83–86%"],
                  ["2.7", "B−", "80–82%"],
                  ["2.3", "C+", "77–79%"],
                  ["2.0", "C", "73–76%"],
                  ["1.7", "C−", "70–72%"],
                  ["1.3", "D+", "67–69%"],
                  ["1.0", "D", "65–66%"],
                  ["0.0", "F", "Below 65%"],
                ].map(([g, l, p]) => (
                  <tr key={g} className="border-b border-slate-100">
                    <td className="px-2 py-2 font-semibold">{g}</td>
                    <td className="px-2 py-2 text-blue-700">{l}</td>
                    <td className="px-2 py-2 text-slate-700">{p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <KeyFacts
            items={[
              { label: "US 10-point: A range", value: "93+% maps to 4.0" },
              { label: "Indian CBSE formula", value: "Percentage = CGPA × 9.5" },
              { label: "Standardized conversion", value: "None — varies by institution" },
              { label: "Best for transcripts", value: "Use your institution's published table" },
            ]}
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">Related tools</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-700">
            <li><Link href="/percentage-to-gpa-calculator" className="text-blue-700 hover:underline">Percentage to GPA calculator</Link> — reverse direction.</li>
            <li><Link href="/gpa-scale" className="text-blue-700 hover:underline">GPA scale guide</Link> — every common scale (4.0, 4.33, weighted, percentage) in one reference.</li>
            <li><Link href="/weighted-gpa-calculator" className="text-blue-700 hover:underline">Weighted GPA calculator</Link> — calculate your GPA before converting.</li>
            <li><Link href="/how-to-calculate-gpa" className="text-blue-700 hover:underline">How to calculate GPA</Link> — the methodology behind the numbers.</li>
          </ul>
        </div>
      </article>

      <Faq items={FAQ_ITEMS} />
    </>
  );
}
