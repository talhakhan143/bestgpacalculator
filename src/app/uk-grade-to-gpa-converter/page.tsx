import type { Metadata } from "next";
import Link from "next/link";
import { UkGradeToGpaConverter } from "@/components/calculator/UkGradeToGpaConverter";
import { Hero } from "@/components/sections/Hero";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { ArticleSchema, CalculatorSchema, FaqSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArticleMeta, DefinitionBlock, KeyFacts } from "@/components/sections/InContentLinks";

export const metadata: Metadata = {
  title: "UK Grade to GPA Converter — Degree Class to US 4.0 (2026)",
  description:
    "Free UK degree class to US GPA converter. First-class, 2:1, 2:2, Third — instant US 4.0 GPA equivalent using the WES standard scale. Works with module marks and overall averages.",
  alternates: { canonical: "/uk-grade-to-gpa-converter" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is a UK 2:1 in US GPA?",
    a: "An Upper Second-Class (2:1) UK degree converts to approximately a 3.7 US GPA on the 4.0 scale, equivalent to an A− letter grade. WES and most US graduate admissions offices use this conversion. Some programs treat 2:1 as 3.5 — check the specific school's policy.",
  },
  {
    q: "What is a First-class UK degree in US GPA?",
    a: "A First-class Honours (1st) UK degree converts to a 4.0 US GPA (A letter grade). This is the highest UK undergraduate classification, awarded for an overall mark of 70% or above at most British universities.",
  },
  {
    q: "What is a 2:2 in US GPA?",
    a: "A Lower Second-Class (2:2) UK degree converts to approximately a 3.0 US GPA (B letter grade). This corresponds to a UK mark of 50 to 59 percent at most universities.",
  },
  {
    q: "Does my US grad school accept a WES evaluation of my UK degree?",
    a: "Almost all US graduate schools accept a WES (World Education Services) or ECE course-by-course report for UK degrees. WES converts your UK transcript using the same scale this calculator uses. Some programs accept the UK degree class directly without evaluation.",
  },
  {
    q: "Why does Oxford or Cambridge use different boundaries?",
    a: "Most UK universities set First-class at 70%+, but some subjects at Oxford and Cambridge — particularly Mathematics and Engineering — award a First at 65% or even 60% in years with hard exams. Always check your transcript: the UK class is the official figure, not the raw percentage.",
  },
  {
    q: "How do I convert a UK module mark to a US GPA?",
    a: "Use percentage mode in the calculator above. The WES-style continuous mapping is: 70%+ → 4.0, 60–69% scales 3.0 to 3.7, 50–59% scales 2.0 to 3.0, 40–49% scales 1.0 to 2.0, 35–39% scales 0.0 to 1.0, below 35% is 0.0.",
  },
  {
    q: "Is a UK Third-class degree good enough for US grad school?",
    a: "A Third-class (3rd, US 2.0 GPA equivalent) is below the typical 3.0 minimum for most US Master's programs. Some schools admit Third-class candidates with strong GRE/GMAT scores, research experience, or relevant work. Most competitive programs require at least a 2:1 (3.7 GPA equivalent).",
  },
];

export default function UkGradeToGpaPage() {
  return (
    <>
      <CalculatorSchema
        name="UK Grade to GPA Converter"
        description="Free UK degree class to US 4.0 GPA converter for First, 2:1, 2:2, Third, Pass, and percentage module marks."
        url="https://bestgpacalculator.online/uk-grade-to-gpa-converter"
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="UK Grade to GPA Converter — Degree Class to US 4.0 (2026)"
        description="Free UK degree class to US 4.0 GPA converter for First, 2:1, 2:2, Third, Pass, and percentage module marks."
        url="https://bestgpacalculator.online/uk-grade-to-gpa-converter"
        datePublished="2026-06-15"
        dateModified="2026-06-15"
      />

      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "UK Grade to GPA", href: "/uk-grade-to-gpa-converter" }]} />
      <Hero
        badge="UK → US GPA · 2026 edition"
        title="UK Grade to GPA"
        highlight="Converter"
        subtitle="Convert your UK degree classification or module marks to the US 4.0 GPA scale used on American graduate-school applications. Uses the WES standard mapping."
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <UkGradeToGpaConverter />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <ArticleMeta updated="2026-06-15" />
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">UK degree class to US GPA: the standard scale</h2>

          <DefinitionBlock
            term="UK degree class"
            definition="The UK undergraduate degree honours system: First-class (1st), Upper Second (2:1), Lower Second (2:2), Third (3rd), Pass / Ordinary degree, and Fail. The class is awarded based on the weighted average of final-year and sometimes penultimate-year module marks, using boundaries published by each university."
          />

          <p className="mt-6 text-base leading-relaxed text-slate-700">
            UK universities do not issue GPAs — they issue degree classes. US graduate schools, however, ask for a US-equivalent GPA on the 4.0 scale. Both WES (World Education Services) and ECE use a standard mapping built on UK module-mark conventions. This calculator implements that exact mapping.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">The official conversion table</h3>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-2 py-2 font-semibold">UK class</th>
                  <th className="px-2 py-2 font-semibold">UK mark</th>
                  <th className="px-2 py-2 font-semibold">US letter</th>
                  <th className="px-2 py-2 font-semibold">US GPA</th>
                </tr>
              </thead>
              <tbody className="tabular">
                {[
                  ["First-class Honours (1st)", "70%+", "A", "4.00"],
                  ["Upper Second (2:1)", "60–69%", "A−", "3.70"],
                  ["Lower Second (2:2)", "50–59%", "B", "3.00"],
                  ["Third-class (3rd)", "40–49%", "C", "2.00"],
                  ["Ordinary / Pass", "35–39%", "D", "1.00"],
                  ["Fail", "<35%", "F", "0.00"],
                ].map(([cls, mark, letter, gpa]) => (
                  <tr key={cls} className="border-b border-slate-100">
                    <td className="px-2 py-2 font-semibold text-slate-900">{cls}</td>
                    <td className="px-2 py-2 text-slate-700">{mark}</td>
                    <td className="px-2 py-2 font-semibold text-slate-700">{letter}</td>
                    <td className="px-2 py-2 font-semibold text-blue-700">{gpa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <KeyFacts
            items={[
              { label: "WES standard 2:1 → US GPA", value: "3.7 (A−)" },
              { label: "First-class boundary (most UK)", value: "70% module average" },
              { label: "Oxbridge Maths/Engg First", value: "65% in some years" },
              { label: "Typical US grad-school minimum", value: "3.0 (UK 2:2)" },
            ]}
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">When the conversion is not enough</h3>
          <ol className="mt-3 list-decimal space-y-3 pl-6 text-base leading-relaxed text-slate-700">
            <li>
              <strong>Programs that explicitly want a WES evaluation.</strong> Top US Master&apos;s and PhD programs
              require an official WES or ECE course-by-course report, not a self-converted GPA. The official report
              costs about $200 and takes 1–3 weeks. Use this calculator for early planning; submit the official
              evaluation closer to the application deadline.
            </li>
            <li>
              <strong>Universities with non-standard First boundaries.</strong> Oxford and Cambridge (in some
              subjects), the LSE, and Imperial College sometimes award a First at 65%. The calculator above assumes
              the 70% boundary. If your transcript lists the actual class (not just the mark), use degree-class mode.
            </li>
            <li>
              <strong>Scottish four-year degrees.</strong> Scottish honours degrees (MA Hons) follow the same class
              system. The conversion is identical. Scottish ordinary degrees (without honours) typically convert to
              the UK Pass class.
            </li>
            <li>
              <strong>Old percentage transcripts.</strong> Pre-1990s UK transcripts sometimes list raw module
              percentages with no overall class. In that case use percentage mode and report the average. If your
              transcript lists module-level grades (e.g. distinction, merit), check our{" "}
              <Link href="/letter-grade-to-gpa-converter" className="text-blue-700 hover:underline">letter grade to GPA converter</Link>.
            </li>
          </ol>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">For US students: what UK percentages feel like</h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            UK module marks compress very differently from US grades. A 70% in a UK exam is a top mark — at most
            universities, less than 10% of students get a First. A 50% UK mark is the threshold for the 2:2 (a passing
            honours degree), not a fail. If you are coming from the US system, do not assume a UK 60% maps to a US
            60% — it maps to a US A−.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">Related calculators</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-700">
            <li><Link href="/gpa-to-percentage-calculator" className="text-blue-700 hover:underline">GPA to percentage calculator</Link> — US 4.0 GPA to percentage equivalent.</li>
            <li><Link href="/percentage-to-gpa-calculator" className="text-blue-700 hover:underline">Percentage to GPA calculator</Link> — reverse direction.</li>
            <li><Link href="/cgpa-to-percentage-calculator" className="text-blue-700 hover:underline">CGPA to percentage calculator</Link> — Indian 10-point CGPA to percentage.</li>
            <li><Link href="/letter-grade-to-gpa-converter" className="text-blue-700 hover:underline">Letter grade to GPA converter</Link> — US A–F to 4.0 scale.</li>
            <li><Link href="/gpa-scale" className="text-blue-700 hover:underline">GPA scale guide</Link> — every scale compared side by side.</li>
            <li><Link href="/cumulative-gpa-calculator" className="text-blue-700 hover:underline">Cumulative GPA calculator</Link> — multi-semester GPA computation.</li>
          </ul>
        </div>
      </article>

      <Faq items={FAQ_ITEMS} />
    </>
  );
}
