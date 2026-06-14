import type { Metadata } from "next";
import Link from "next/link";
import { CgpaToPercentageCalculator } from "@/components/calculator/CgpaToPercentageCalculator";
import { Hero } from "@/components/sections/Hero";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { ArticleSchema, CalculatorSchema, FaqSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArticleMeta, DefinitionBlock, KeyFacts } from "@/components/sections/InContentLinks";

export const metadata: Metadata = {
  title: "CGPA to Percentage Calculator — Free 10-Point Conversion (2026)",
  description:
    "Free CGPA to percentage converter for CBSE, Anna University, VTU, Mumbai University, GTU, and generic 10-point scales. Get the official formula for your university plus an instant percentage.",
  alternates: { canonical: "/cgpa-to-percentage-calculator" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How do I convert CGPA to percentage?",
    a: "There is no universal formula — each university publishes its own. The most common conversions: CBSE uses % = CGPA × 9.5, Anna University uses % = (CGPA − 0.5) × 10, VTU uses % = (CGPA − 0.75) × 10, Mumbai University Engineering uses % = (CGPA × 7.1) + 11. Pick your university from the dropdown above.",
  },
  {
    q: "What percentage is 8.5 CGPA?",
    a: "Depends on your university. CBSE: 8.5 × 9.5 = 80.75%. Anna University: (8.5 − 0.5) × 10 = 80.0%. VTU: (8.5 − 0.75) × 10 = 77.5%. Mumbai Engineering: (8.5 × 7.1) + 11 = 71.35%. Always use the formula your transcript or convocation page specifies.",
  },
  {
    q: "Is CGPA × 9.5 always correct?",
    a: "No — the × 9.5 formula is the CBSE standard for Class X and XII results in India (introduced 2011). It does not apply to most Indian universities, which use different formulas. Using × 9.5 outside CBSE will give a wrong percentage on transcripts and admission forms.",
  },
  {
    q: "What is the difference between CGPA and SGPA?",
    a: "SGPA (Semester GPA) is the grade point average for a single semester. CGPA (Cumulative GPA) is the running average across all semesters completed so far. Most percentage conversion formulas operate on CGPA, but a few institutions use the same formula on SGPA too — check your university policy.",
  },
  {
    q: "How do US universities interpret an Indian 10-point CGPA?",
    a: "Most US universities do not convert it themselves — they ask a credential evaluator (WES, ECE, IERF) to do a course-by-course evaluation. The evaluator maps your CGPA to a US 4.0 equivalent using your transcript's grade scale. A rough internal estimate: CGPA 8.0 on a 10-point scale ≈ 3.5 on the US 4.0 scale, but the official evaluation is what counts.",
  },
  {
    q: "What is a first class CGPA?",
    a: "First class typically corresponds to ≥ 60% (or equivalent CGPA). On the CBSE × 9.5 formula, first class = CGPA ≥ 6.32. On Anna University, first class = CGPA ≥ 6.5. First class with distinction is usually ≥ 75% — CBSE 7.9+, Anna 8.0+.",
  },
  {
    q: "Why does the percentage differ between universities for the same CGPA?",
    a: "Each formula is calibrated to the grading rigor at that university. Anna University expects students with a 6.0 CGPA to perform like Indian 'second class' students, so the formula subtracts 0.5 first. CBSE Class X formula × 9.5 treats CGPA more generously. The official formula is the one the institution accepts on transcripts — do not substitute one for another.",
  },
];

export default function CgpaToPercentagePage() {
  return (
    <>
      <CalculatorSchema
        name="CGPA to Percentage Calculator"
        description="Free CGPA to percentage converter with formulas for CBSE, Anna University, VTU, Mumbai, GTU, and generic 10-point scales."
        url="https://bestgpacalculator.online/cgpa-to-percentage-calculator"
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="CGPA to Percentage Calculator — Free 10-Point Conversion (2026)"
        description="Free CGPA to percentage converter for CBSE, Anna University, VTU, Mumbai University, GTU, and generic 10-point scales."
        url="https://bestgpacalculator.online/cgpa-to-percentage-calculator"
        datePublished="2026-06-15"
        dateModified="2026-06-15"
      />

      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "CGPA to Percentage", href: "/cgpa-to-percentage-calculator" }]} />
      <Hero
        badge="CGPA → % · 2026 edition"
        title="CGPA to Percentage"
        highlight="Calculator"
        subtitle="Convert your 10-point CGPA to an official percentage using your university's published formula. Built-in conversions for CBSE, Anna University, VTU, Mumbai, GTU, and the generic 10-point scale."
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <CgpaToPercentageCalculator />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <ArticleMeta updated="2026-06-15" />
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">How CGPA to percentage conversion works</h2>

          <DefinitionBlock
            term="CGPA-to-percentage conversion"
            definition="The institution-specific formula that maps a Cumulative Grade Point Average (typically on a 10-point scale) to a percentage. Each Indian university publishes its own formula on their convocation or transcript request page. Using the wrong formula gives a wrong percentage on admission applications."
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">The six most common formulas</h3>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-2 py-2 font-semibold">University / Board</th>
                  <th className="px-2 py-2 font-semibold">Formula</th>
                  <th className="px-2 py-2 font-semibold">8.5 CGPA →</th>
                </tr>
              </thead>
              <tbody className="tabular">
                {[
                  ["CBSE (India)", "% = CGPA × 9.5", "80.75%"],
                  ["Anna University", "% = (CGPA − 0.5) × 10", "80.00%"],
                  ["VTU (Karnataka)", "% = (CGPA − 0.75) × 10", "77.50%"],
                  ["Mumbai (Engg)", "% = (CGPA × 7.1) + 11", "71.35%"],
                  ["GTU (Gujarat)", "% = (CGPA × 10) − 5", "80.00%"],
                  ["Generic 10-point", "% = CGPA × 10", "85.00%"],
                ].map(([uni, formula, result]) => (
                  <tr key={uni} className="border-b border-slate-100">
                    <td className="px-2 py-2 font-semibold">{uni}</td>
                    <td className="px-2 py-2 font-mono text-blue-700">{formula}</td>
                    <td className="px-2 py-2 text-slate-700">{result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Notice how the same CGPA produces percentages 71% to 85% across these six systems — a 14-point spread.
            That is why &quot;CGPA × 9.5&quot; everywhere is wrong. Always use the formula your transcript or convocation
            page explicitly lists. If your university is not in the list above, check the registrar page or the
            back of your grade card.
          </p>

          <KeyFacts
            items={[
              { label: "CBSE Class X & XII", value: "CGPA × 9.5 (official since 2011)" },
              { label: "First class", value: "60%+ (CBSE: CGPA ≥ 6.32)" },
              { label: "First class with distinction", value: "75%+ (CBSE: CGPA ≥ 7.9)" },
              { label: "Maximum CGPA on 10-point", value: "10.0 (some VTU students hit 9.85+)" },
            ]}
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">When the CGPA-to-percent formula breaks down</h3>
          <ol className="mt-3 list-decimal space-y-3 pl-6 text-base leading-relaxed text-slate-700">
            <li>
              <strong>Mixed-grade transcripts.</strong> Some Indian universities have switched formula between academic
              years. A student who started under VTU&apos;s old &quot;CGPA × 10&quot; and graduated under the &quot;
              (CGPA − 0.75) × 10&quot; system needs to apply the right formula per semester. The registrar can confirm
              which formula applies to your batch.
            </li>
            <li>
              <strong>SGPA vs CGPA confusion.</strong> If your transcript shows only SGPA per semester, you have to
              first compute the weighted-average CGPA across all semesters using credit hours. The
              {" "}
              <Link href="/cumulative-gpa-calculator" className="text-blue-700 hover:underline">cumulative GPA calculator</Link>
              {" "}does this — set the scale to 10 in the inputs.
            </li>
            <li>
              <strong>Inter-university applications.</strong> If you are applying to a different Indian university
              (or a foreign one), the receiving institution will apply its own conversion or send your transcript to
              a credential evaluator. Do not pre-convert and report the percentage — they want the raw CGPA.
            </li>
            <li>
              <strong>US/Canada applications.</strong> US graduate schools require a credential evaluation from WES,
              ECE, or IERF. They map your 10-point CGPA to a 4.0 equivalent using your full course list, not a single
              formula. See our{" "}
              <Link href="/gpa-to-percentage-calculator" className="text-blue-700 hover:underline">GPA-to-percentage calculator</Link>
              {" "}for the reverse (4.0 → %).
            </li>
          </ol>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">CBSE Class X &amp; XII — special note</h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            The CBSE board adopted the CGPA × 9.5 formula in 2011 for Class X results, and later extended it to Class XII.
            The multiplier 9.5 is not arbitrary — it&apos;s derived from the average marks scored by the top-five subjects
            of statistically high-performing students. If you scored an 8.5 CGPA in Class X, your indicative percentage on
            college admission forms is 80.75%. This is the &quot;official&quot; conversion and is accepted by every
            CBSE-affiliated university and most state board universities for cross-board admission.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">Related calculators</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-700">
            <li><Link href="/gpa-to-percentage-calculator" className="text-blue-700 hover:underline">GPA to percentage calculator</Link> — convert US 4.0 GPA to percentage.</li>
            <li><Link href="/percentage-to-gpa-calculator" className="text-blue-700 hover:underline">Percentage to GPA calculator</Link> — reverse direction.</li>
            <li><Link href="/cumulative-gpa-calculator" className="text-blue-700 hover:underline">Cumulative GPA calculator</Link> — compute CGPA across semesters.</li>
            <li><Link href="/gpa-scale" className="text-blue-700 hover:underline">GPA scale guide</Link> — every scale (4.0, 4.33, 10-point, percentage) compared.</li>
            <li><Link href="/letter-grade-to-gpa-converter" className="text-blue-700 hover:underline">Letter grade to GPA converter</Link> — A-F to 4.0 scale.</li>
            <li><Link href="/gpa-goal-calculator" className="text-blue-700 hover:underline">GPA goal calculator</Link> — work backwards from a target.</li>
          </ul>
        </div>
      </article>

      <Faq items={FAQ_ITEMS} />
    </>
  );
}
