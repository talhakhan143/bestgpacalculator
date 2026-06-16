import type { Metadata } from "next";
import Link from "next/link";
import { IndiaCgpaToGpaConverter } from "@/components/calculator/IndiaCgpaToGpaConverter";
import { Hero } from "@/components/sections/Hero";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { ArticleSchema, CalculatorSchema, FaqSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArticleMeta, DefinitionBlock, KeyFacts } from "@/components/sections/InContentLinks";

export const metadata: Metadata = {
  title: "India CGPA to US GPA Converter — 10-Point to 4.0 Scale (2026)",
  description:
    "Free Indian CGPA to US GPA converter. CBSE × 9.5, Anna, VTU, Mumbai, GTU formulas → US 4.0 GPA using the WES standard band. For US grad-school applications.",
  alternates: { canonical: "/india-cgpa-to-gpa-converter" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How do I convert an Indian CGPA to US GPA?",
    a: "Two steps: (1) convert CGPA to percentage using your university formula — e.g. CBSE uses CGPA × 9.5, Anna University uses (CGPA − 0.5) × 10, Mumbai engineering uses CGPA × 7.1 + 11. (2) Convert that percentage to US 4.0 GPA using the WES band lookup. 85%+ = 4.0, 80–84% = 3.7, 75–79% = 3.3, 70–74% = 3.0, and so on. This calculator does both steps together.",
  },
  {
    q: "What is a CGPA of 8.5 in US GPA?",
    a: "A CBSE / generic 10-point CGPA of 8.5 = 80.75% (× 9.5) = roughly 3.7 on the US 4.0 scale. The exact value depends on which university formula you use — Anna gets 80%, VTU gets 77.5%, Mumbai Engineering gets 71.35%. Each maps to a slightly different US GPA.",
  },
  {
    q: "What is a 9.5 CGPA in US GPA?",
    a: "A 9.5 CGPA on the CBSE 10-point scale = 90.25% = 4.0 US GPA. On Anna University this becomes 90% = 4.0. On VTU (× 10 − 7.5) it becomes 87.5% = 4.0. All map to the top US GPA band.",
  },
  {
    q: "Does WES accept the conversion this calculator gives?",
    a: "Yes — this calculator uses the same percentage-to-GPA mapping WES (World Education Services) and ECE apply on official course-by-course reports for Indian transcripts. The official report you submit to a US grad school includes the per-course breakdown the application form requires; the overall GPA in the report will match this calculator within rounding.",
  },
  {
    q: "Which Indian universities use which CGPA formula?",
    a: "CBSE (boards), most central universities, IIT Bombay, IIT Delhi → CGPA × 9.5 (some IITs use × 10). Anna University → (CGPA − 0.5) × 10. VTU → (CGPA − 0.75) × 10. Mumbai Engineering → CGPA × 7.1 + 11. GTU → CGPA × 10 − 5. Always check your transcript or your university's official conversion page — the formula on the convocation document is the one US grad schools will accept.",
  },
  {
    q: "Is a CGPA of 7 enough for US grad school?",
    a: "A 7.0 CBSE CGPA ≈ 66.5% ≈ 2.7 US GPA. Most US Master's programs ask for a 3.0 minimum GPA, which means roughly 7.5+ CGPA (on the × 9.5 scale) or 8.0+ CGPA (on Anna / VTU scales). Some programs accept lower GPA candidates with high GRE scores or research experience, but a 7.0 CGPA is below the typical cutoff.",
  },
  {
    q: "What is the difference between CGPA and SGPA?",
    a: "SGPA (Semester GPA) is the GPA for one semester. CGPA (Cumulative GPA) is the weighted average across all semesters using credit hours. To convert SGPA to CGPA, multiply each SGPA by that semester's credit count, sum, then divide by total credits across all semesters. We have a dedicated SGPA-to-CGPA calculator linked below.",
  },
];

export default function IndiaCgpaToGpaPage() {
  return (
    <>
      <CalculatorSchema
        name="India CGPA to US GPA Converter"
        description="Free Indian 10-point CGPA to US 4.0 GPA converter using WES standard band lookup. Supports CBSE, Anna, VTU, Mumbai, GTU university formulas."
        url="https://bestgpacalculator.online/india-cgpa-to-gpa-converter"
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="India CGPA to US GPA Converter — 10-Point to 4.0 Scale (2026)"
        description="Free Indian 10-point CGPA to US 4.0 GPA converter using WES standard band lookup. Supports CBSE, Anna, VTU, Mumbai, GTU university formulas."
        url="https://bestgpacalculator.online/india-cgpa-to-gpa-converter"
        datePublished="2026-06-16"
        dateModified="2026-06-16"
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "India CGPA to GPA", href: "/india-cgpa-to-gpa-converter" },
        ]}
      />
      <Hero
        badge="India → US GPA · 2026 edition"
        title="India CGPA to US GPA"
        highlight="Converter"
        subtitle="Convert your Indian 10-point CGPA — from CBSE, Anna, VTU, Mumbai, or GTU — to the US 4.0 GPA scale used on American graduate-school applications. WES standard mapping."
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <IndiaCgpaToGpaConverter />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <ArticleMeta updated="2026-06-16" />
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Indian CGPA to US GPA: the two-step WES conversion
          </h2>

          <DefinitionBlock
            term="CGPA (Cumulative Grade Point Average)"
            definition="The weighted average of grade points across all semesters of an Indian degree, reported on a 10-point scale. Each university uses its own formula to convert CGPA to a percentage, and the percentage is what US graduate schools convert further to the US 4.0 GPA scale."
          />

          <p className="mt-6 text-base leading-relaxed text-slate-700">
            Indian universities report academic performance as CGPA on a 10-point scale; US graduate
            schools want a GPA on a 4.0 scale. There is no single direct CGPA × 0.4 conversion that
            works — because each Indian university uses a different percentage formula. WES and ECE,
            the two main credential evaluators for the US, apply your university&apos;s official
            formula first, then map the resulting percentage to a US 4.0 GPA using a standard band
            lookup.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">
            Step 1: CGPA → percentage (your university formula)
          </h3>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-2 py-2 font-semibold">University / board</th>
                  <th className="px-2 py-2 font-semibold">Formula</th>
                  <th className="px-2 py-2 font-semibold">CGPA 8.0 →</th>
                </tr>
              </thead>
              <tbody className="tabular">
                {[
                  ["CBSE Class X/XII", "% = CGPA × 9.5", "76.0%"],
                  ["Anna University (TN engg)", "% = (CGPA − 0.5) × 10", "75.0%"],
                  ["VTU (Karnataka)", "% = (CGPA − 0.75) × 10", "72.5%"],
                  ["Mumbai University (Engg)", "% = CGPA × 7.1 + 11", "67.8%"],
                  ["GTU (Gujarat)", "% = CGPA × 10 − 5", "75.0%"],
                  ["Generic 10-point", "% = CGPA × 10", "80.0%"],
                ].map(([uni, formula, ex]) => (
                  <tr key={uni} className="border-b border-slate-100">
                    <td className="px-2 py-2 font-semibold text-slate-900">{uni}</td>
                    <td className="px-2 py-2 font-mono text-xs text-slate-700">{formula}</td>
                    <td className="px-2 py-2 font-semibold text-blue-700">{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">
            Step 2: percentage → US 4.0 GPA (WES band)
          </h3>

          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Once you have the percentage, the WES band lookup gives a US GPA in 0.3 (or 0.4) steps:
            85%+ = 4.0, 80% = 3.7, 75% = 3.3, 70% = 3.0, 65% = 2.7, 60% = 2.3, 55% = 2.0, 50% = 1.7,
            45% = 1.3, 40% = 1.0. Below 40% scores 0.0. This is the band most US grad schools accept
            without question.
          </p>

          <KeyFacts
            items={[
              { label: "CBSE 9.0 CGPA → US GPA", value: "85.5% → 4.0" },
              { label: "Anna 8.0 CGPA → US GPA", value: "75% → 3.3" },
              { label: "VTU 8.5 CGPA → US GPA", value: "77.5% → 3.3" },
              { label: "US Master's typical floor", value: "3.0 (~CBSE 7.5)" },
            ]}
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">
            What US grad schools actually want from an Indian transcript
          </h3>
          <ol className="mt-3 list-decimal space-y-3 pl-6 text-base leading-relaxed text-slate-700">
            <li>
              <strong>Top-tier programs.</strong> A WES or ECE course-by-course report is required.
              The application form will not accept a self-converted GPA. WES costs ~$200 and takes
              1–3 weeks. Start early.
            </li>
            <li>
              <strong>Mid-tier Master&apos;s.</strong> Many programs accept either a WES report or a
              self-reported GPA on the application, with a transcript verification later. The
              self-reported number should match the WES band — which is what this calculator
              outputs.
            </li>
            <li>
              <strong>Direct-admission programs.</strong> A few schools (especially in the
              Northeast) accept the CGPA directly and apply their own conversion. If your target
              school does this, just submit the CGPA as printed on the transcript.
            </li>
            <li>
              <strong>Engineering and STEM specifically.</strong> Strong CGPA matters less than
              project portfolio, GRE quant, and research papers. A 7.5 CBSE CGPA + first-author
              publication often outperforms a 9.0 CGPA + no research.
            </li>
          </ol>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">Related calculators</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-700">
            <li>
              <Link href="/cgpa-to-percentage-calculator" className="text-blue-700 hover:underline">
                CGPA to percentage calculator
              </Link>{" "}
              — first step alone, if you only need the percentage.
            </li>
            <li>
              <Link href="/uk-grade-to-gpa-converter" className="text-blue-700 hover:underline">
                UK grade to GPA converter
              </Link>{" "}
              — 1st / 2:1 / 2:2 → US 4.0 GPA.
            </li>
            <li>
              <Link href="/percentage-to-gpa-calculator" className="text-blue-700 hover:underline">
                Percentage to GPA calculator
              </Link>{" "}
              — reverse step 2.
            </li>
            <li>
              <Link href="/gpa-scale" className="text-blue-700 hover:underline">
                GPA scale guide
              </Link>{" "}
              — every grading scale compared side by side.
            </li>
            <li>
              <Link href="/cumulative-gpa-calculator" className="text-blue-700 hover:underline">
                Cumulative GPA calculator
              </Link>{" "}
              — compute CGPA across multiple semesters using credit weighting.
            </li>
          </ul>
        </div>
      </article>

      <Faq items={FAQ_ITEMS} />
    </>
  );
}
