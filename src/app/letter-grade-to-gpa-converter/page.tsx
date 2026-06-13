import type { Metadata } from "next";
import Link from "next/link";
import { LetterGradeToGpa } from "@/components/calculator/LetterGradeToGpa";
import { Hero } from "@/components/sections/Hero";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { ArticleSchema, CalculatorSchema, FaqSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArticleMeta, DefinitionBlock, KeyFacts } from "@/components/sections/InContentLinks";

export const metadata: Metadata = {
  title: "Letter Grade to GPA Converter — Free A-F to 4.0 Tool (2026)",
  description:
    "Free letter grade to GPA converter. Enter your A-F letter grades and credit hours — get an instant 4.0-scale GPA, plus the full A=4.0, A-=3.7, B+=3.3 conversion chart.",
  alternates: { canonical: "/letter-grade-to-gpa-converter" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How do I convert a letter grade to GPA points?",
    a: "On the standard unweighted 4.0 scale: A = 4.0, A− = 3.7, B+ = 3.3, B = 3.0, B− = 2.7, C+ = 2.3, C = 2.0, C− = 1.7, D+ = 1.3, D = 1.0, D− = 0.7, F = 0.0. Each letter has a fixed point value. To get a GPA across multiple courses, multiply each course's point value by its credit hours, sum those, and divide by total credit hours.",
  },
  {
    q: "Is A+ worth more than A on a 4.0 scale?",
    a: "No. On the standard unweighted 4.0 scale, A+ and A both equal 4.0 — there is nothing above a 4.0. Some colleges (e.g. Stanford undergrad, Columbia GS) use a 4.3 scale where A+ = 4.3, but the default 4.0 system caps at A. This converter follows the 4.0 standard.",
  },
  {
    q: "What if my school does not use minus grades (B−, C−)?",
    a: "Pick the closest letter that exists at your school. If your school records only A, B, C, D, F, treat anything in the B range as B = 3.0. The converter still works — you just will not use the A−, B+, B− options. Many high schools dropped pluses and minuses entirely; check your transcript before assuming.",
  },
  {
    q: "Should I include credit hours?",
    a: "Yes, when you have them. A 4-credit calculus class with an A weighs more than a 1-credit gym class with a C. If your school does not track credits (most middle schools, some high schools), set every credit value to 1 — that becomes a simple unweighted average.",
  },
  {
    q: "How is this different from a weighted GPA calculator?",
    a: "This converter gives you the unweighted GPA: every A counts as 4.0 regardless of whether it was honors, AP, or regular. A weighted GPA calculator adds bonus points (+0.5 honors, +1.0 AP) so an A in AP Calc becomes 5.0 instead of 4.0. Colleges usually recalculate to unweighted, but high schools often use weighted for class rank — use the weighted calculator for that.",
  },
  {
    q: "Why is my converted GPA different from what my school reports?",
    a: "Three common reasons. (1) Your school uses a different scale — some use 4.33 with A+ = 4.33, some use 5.0 base. (2) Your school weights honors/AP. (3) Your school uses percentage-based GPA (e.g. percent ÷ 25) instead of letter-based. Check your school's grading policy and pick the matching calculator.",
  },
  {
    q: "What's the difference between an A and an A−?",
    a: "0.3 GPA points per credit. An A = 4.0, A− = 3.7. Across a 4-credit course, that's 16.0 quality points vs 14.8 quality points — over a 30-credit semester, every A− instead of A drags your GPA down by about 0.04. Important for borderline cases (e.g. trying to keep a 3.5+ for scholarships).",
  },
];

export default function LetterGradeToGpaPage() {
  return (
    <>
      <CalculatorSchema
        name="Letter Grade to GPA Converter"
        description="Free letter-grade to GPA converter on the 4.0 scale. Enter A-F letter grades and credit hours, get an instant unweighted GPA."
        url="https://bestgpacalculator.online/letter-grade-to-gpa-converter"
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="Letter Grade to GPA Converter — Free A-F to 4.0 Tool"
        description="Free letter grade to GPA converter. Enter your A-F letter grades and credit hours — get an instant 4.0-scale GPA."
        url="https://bestgpacalculator.online/letter-grade-to-gpa-converter"
        datePublished="2026-06-14"
        dateModified="2026-06-14"
      />

      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Letter Grade to GPA", href: "/letter-grade-to-gpa-converter" }]} />
      <Hero
        badge="A-F → 4.0 scale · 2026 edition"
        title="Letter Grade to GPA"
        highlight="Converter"
        subtitle="Type your course letter grades and credit hours, see the live unweighted 4.0-scale GPA. Built for students who got back report cards with letters and need the GPA number their college portal or scholarship form is asking for."
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <LetterGradeToGpa />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <ArticleMeta updated="2026-06-14" />
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">How letter-to-GPA conversion works</h2>

          <DefinitionBlock
            term="Letter grade"
            definition="A coded representation of a percentage range. A is roughly 90-100%, B is 80-89%, C is 70-79%, D is 60-69%, F is anything below. The pluses and minuses split each letter into three sub-bands: A− is the bottom of the A range (90-92%), A is the middle (93-96%), A+ is the top (97-100%)."
          />

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            The conversion to GPA points is fixed: each letter maps to a single number on the 4.0 scale. The only math is the credit-weighted average: <strong>(Σ letter-point × credits) ÷ Σ credits</strong>. The calculator above does this live as you type.
          </p>

          <KeyFacts
            items={[
              { label: "Scale used", value: "Unweighted 4.0 (A = 4.0, A+ = 4.0)" },
              { label: "Formula", value: "Σ (points × credits) ÷ Σ credits" },
              { label: "A+ on this scale", value: "4.0 (same as A — no bonus)" },
              { label: "Lowest passing", value: "D− = 0.7 (F = 0.0)" },
            ]}
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">Full conversion table</h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            The 4.0 scale is the US default. Use this for unweighted GPA — the version most college admissions offices recalculate to.
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-3 py-2 font-semibold">Letter</th>
                  <th className="px-3 py-2 font-semibold">Percentage range</th>
                  <th className="px-3 py-2 font-semibold">GPA points</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-t border-slate-200"><td className="px-3 py-2 font-bold">A+ / A</td><td className="px-3 py-2">93-100%</td><td className="px-3 py-2 tabular font-semibold">4.0</td></tr>
                <tr className="border-t border-slate-100"><td className="px-3 py-2 font-bold">A−</td><td className="px-3 py-2">90-92%</td><td className="px-3 py-2 tabular font-semibold">3.7</td></tr>
                <tr className="border-t border-slate-100"><td className="px-3 py-2 font-bold">B+</td><td className="px-3 py-2">87-89%</td><td className="px-3 py-2 tabular font-semibold">3.3</td></tr>
                <tr className="border-t border-slate-100"><td className="px-3 py-2 font-bold">B</td><td className="px-3 py-2">83-86%</td><td className="px-3 py-2 tabular font-semibold">3.0</td></tr>
                <tr className="border-t border-slate-100"><td className="px-3 py-2 font-bold">B−</td><td className="px-3 py-2">80-82%</td><td className="px-3 py-2 tabular font-semibold">2.7</td></tr>
                <tr className="border-t border-slate-100"><td className="px-3 py-2 font-bold">C+</td><td className="px-3 py-2">77-79%</td><td className="px-3 py-2 tabular font-semibold">2.3</td></tr>
                <tr className="border-t border-slate-100"><td className="px-3 py-2 font-bold">C</td><td className="px-3 py-2">73-76%</td><td className="px-3 py-2 tabular font-semibold">2.0</td></tr>
                <tr className="border-t border-slate-100"><td className="px-3 py-2 font-bold">C−</td><td className="px-3 py-2">70-72%</td><td className="px-3 py-2 tabular font-semibold">1.7</td></tr>
                <tr className="border-t border-slate-100"><td className="px-3 py-2 font-bold">D+</td><td className="px-3 py-2">67-69%</td><td className="px-3 py-2 tabular font-semibold">1.3</td></tr>
                <tr className="border-t border-slate-100"><td className="px-3 py-2 font-bold">D</td><td className="px-3 py-2">65-66%</td><td className="px-3 py-2 tabular font-semibold">1.0</td></tr>
                <tr className="border-t border-slate-100"><td className="px-3 py-2 font-bold">D−</td><td className="px-3 py-2">60-64%</td><td className="px-3 py-2 tabular font-semibold">0.7</td></tr>
                <tr className="border-t border-slate-100"><td className="px-3 py-2 font-bold">F</td><td className="px-3 py-2">below 60%</td><td className="px-3 py-2 tabular font-semibold">0.0</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">Worked example</h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Four classes in a semester: English (A, 3 cr), Calculus (B+, 4 cr), Chemistry (A−, 4 cr), History (B, 3 cr).
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-100">
{`English   A   × 3  = 4.0 × 3 = 12.0
Calculus  B+  × 4  = 3.3 × 4 = 13.2
Chemistry A-  × 4  = 3.7 × 4 = 14.8
History   B   × 3  = 3.0 × 3 =  9.0
                       ----
quality points         49.0
credits                14
GPA = 49.0 / 14    =   3.50`}
          </pre>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">When letter-to-GPA breaks down</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-700">
            <li><strong>4.3 scale (Columbia GS, some grad programs):</strong> A+ = 4.3, otherwise same. Multiply this calculator's result by ~1.075 if all your A's are actually A+'s, or use the school's calculator directly.</li>
            <li><strong>Weighted high school GPA:</strong> AP and honors add bonus points (+1.0, +0.5). Use the <Link href="/weighted-gpa-calculator" className="text-blue-700 hover:underline">weighted GPA calculator</Link> instead.</li>
            <li><strong>LSAC / law school GPA:</strong> Uses a 4.33 scale with no grade replacement (every attempt counts). Use the <Link href="/law-school-gpa-calculator" className="text-blue-700 hover:underline">LSAC GPA calculator</Link>.</li>
            <li><strong>Percentage grades from non-US schools:</strong> Convert to letters first, or use the <Link href="/percentage-to-gpa-calculator" className="text-blue-700 hover:underline">percentage to GPA calculator</Link>.</li>
          </ul>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">What to do with the number</h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Once you have the GPA, you can compare it against benchmarks: a <Link href="/gpa-scale" className="text-blue-700 hover:underline">GPA scale guide</Link> shows what each range means in practice. If you are aiming for a specific target — Dean's List, scholarship cutoff, transfer requirement — the <Link href="/gpa-goal-calculator" className="text-blue-700 hover:underline">GPA goal calculator</Link> works backwards to tell you what you need next semester. And if you want to see how each letter affects the overall, the <Link href="/cumulative-gpa-calculator" className="text-blue-700 hover:underline">cumulative GPA calculator</Link> handles multi-semester running averages.
          </p>
        </div>
      </article>

      <Faq items={FAQ_ITEMS} />
    </>
  );
}
