import type { Metadata } from "next";
import Link from "next/link";
import { EzGrader } from "@/components/calculator/EzGrader";
import { Hero } from "@/components/sections/Hero";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { ArticleSchema, CalculatorSchema, FaqSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArticleMeta, DefinitionBlock, KeyFacts } from "@/components/sections/InContentLinks";

export const metadata: Metadata = {
  title: "EZ Grader — Free Teacher Test Grade Calculator (2026)",
  description:
    "Free EZ Grader for teachers. Enter test questions and wrong answers — get percentage, letter grade, and full grade chart instantly. No signup, works on phones.",
  alternates: { canonical: "/ez-grader" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is an EZ Grader?",
    a: "An EZ Grader is a simple teacher tool that converts the number of wrong answers on a test into a percentage and letter grade. You enter how many questions the test has and how many a student got wrong; the tool shows the score instantly and prints the full grade chart for every possible wrong-count.",
  },
  {
    q: "How do I use the EZ Grader on this page?",
    a: "Enter the total number of questions on the test (e.g. 25), then enter the number wrong (e.g. 3). The big number at the top updates live with the percentage and letter grade. Use the slider to compare what score the student would get if they had missed one more or one less.",
  },
  {
    q: "What letter-grade scale does it use?",
    a: "It uses the common US 10-point scale: 93%+ = A, 90–92% = A-, 87–89% = B+, 83–86% = B, 80–82% = B-, 77–79% = C+, 73–76% = C, 70–72% = C-, 67–69% = D+, 65–66% = D, below 65% = F. Some schools use a 7-point scale — check yours.",
  },
  {
    q: "Can teachers use this for tests with point values instead of question counts?",
    a: "Yes. Treat 'questions' as 'total points' and 'wrong' as 'points lost'. A test out of 50 points where the student lost 7 points works exactly the same as 50 questions, 7 wrong — both give 86% (B).",
  },
  {
    q: "Why does my school's printed EZ Grader card show different percentages?",
    a: "Paper EZ Grader cards round to whole percentages. This calculator shows decimals (e.g. 88.4% instead of 88%). The letter-grade cutoffs are the same — only the visible decimal differs.",
  },
  {
    q: "How is this different from a grade calculator?",
    a: "An EZ Grader scores a single test by wrong-answer count. A weighted grade calculator combines several categories (homework, quizzes, midterm, final) with different weights to compute a course average. Use the EZ Grader for individual tests, then a grade calculator to combine them.",
  },
  {
    q: "Does it work for quizzes with partial credit?",
    a: "Not directly — the EZ Grader assumes each question is right or wrong. If you allow partial credit, sum total points earned, divide by total points possible, multiply by 100, and look up the letter on the chart. Or use the weighted grade calculator linked below.",
  },
];

export default function EzGraderPage() {
  return (
    <>
      <CalculatorSchema
        name="EZ Grader"
        description="Free teacher test-grade calculator. Enter total questions and wrong answers, get percentage and letter grade."
        url="https://bestgpacalculator.online/ez-grader"
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="EZ Grader — Free Teacher Test Grade Calculator"
        description="Free EZ Grader for teachers. Enter test questions and wrong answers — get percentage, letter grade, and full grade chart instantly."
        url="https://bestgpacalculator.online/ez-grader"
        datePublished="2026-06-13"
        dateModified="2026-06-13"
      />

      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "EZ Grader", href: "/ez-grader" }]} />
      <Hero
        badge="Teacher tool · 2026 edition"
        title="EZ"
        highlight="Grader"
        subtitle="Punch in total questions, drag the wrong-count slider, get an instant percentage and letter grade. Plus the full grade chart so you can see every possible score for that test at a glance."
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <EzGrader />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <ArticleMeta updated="2026-06-13" />
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">How the EZ Grader works</h2>

          <DefinitionBlock
            term="EZ Grader"
            definition="A teacher tool that turns 'how many did the student miss' into a percentage and a letter. Paper EZ Grader cards have been a classroom staple since the 1970s — this is the same idea, but the chart updates live as you change the question count."
          />

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            The math is straightforward: <strong>(questions right ÷ total questions) × 100</strong>. A 20-question quiz with 3 wrong = 17/20 = 85% = B. The benefit of the EZ Grader format is seeing the whole chart at once — useful when you are deciding whether to drop a question, give partial credit, or curve the test up by one or two answers.
          </p>

          <KeyFacts
            items={[
              { label: "Formula", value: "(right ÷ total) × 100" },
              { label: "Letter scale", value: "10-point US (93+ = A, 90-92 = A-, ...)" },
              { label: "Storage", value: "Saved locally in your browser" },
              { label: "Works offline", value: "Yes — fully client-side after first load" },
            ]}
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">Common test sizes — quick reference</h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Here is what each grade boundary looks like in absolute wrong-counts for the test sizes teachers ask about most:
          </p>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-3 py-2 font-semibold">Test size</th>
                  <th className="px-3 py-2 font-semibold">A (93%)</th>
                  <th className="px-3 py-2 font-semibold">B (83%)</th>
                  <th className="px-3 py-2 font-semibold">C (73%)</th>
                  <th className="px-3 py-2 font-semibold">D (65%)</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-t border-slate-200">
                  <td className="px-3 py-2 font-semibold">10 questions</td>
                  <td className="px-3 py-2">≤ 0 wrong</td>
                  <td className="px-3 py-2">≤ 1 wrong</td>
                  <td className="px-3 py-2">≤ 2 wrong</td>
                  <td className="px-3 py-2">≤ 3 wrong</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-3 py-2 font-semibold">20 questions</td>
                  <td className="px-3 py-2">≤ 1 wrong</td>
                  <td className="px-3 py-2">≤ 3 wrong</td>
                  <td className="px-3 py-2">≤ 5 wrong</td>
                  <td className="px-3 py-2">≤ 7 wrong</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-3 py-2 font-semibold">25 questions</td>
                  <td className="px-3 py-2">≤ 1 wrong</td>
                  <td className="px-3 py-2">≤ 4 wrong</td>
                  <td className="px-3 py-2">≤ 6 wrong</td>
                  <td className="px-3 py-2">≤ 8 wrong</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-3 py-2 font-semibold">50 questions</td>
                  <td className="px-3 py-2">≤ 3 wrong</td>
                  <td className="px-3 py-2">≤ 8 wrong</td>
                  <td className="px-3 py-2">≤ 13 wrong</td>
                  <td className="px-3 py-2">≤ 17 wrong</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-3 py-2 font-semibold">100 questions</td>
                  <td className="px-3 py-2">≤ 7 wrong</td>
                  <td className="px-3 py-2">≤ 17 wrong</td>
                  <td className="px-3 py-2">≤ 27 wrong</td>
                  <td className="px-3 py-2">≤ 35 wrong</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">Tips for fair grading</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-700">
            <li><strong>Decide cutoffs before grading.</strong> If your school does not specify, write the scale at the top of the page so students can see how borderline answers will land.</li>
            <li><strong>Watch the gap at 89/90.</strong> The B+/A- boundary is the most-contested in any class. A 89.5% rounded to 90% is an A- at most schools — the EZ Grader shows the exact decimal so you can choose.</li>
            <li><strong>Pull out the bottom quartile.</strong> If many students cluster below 70%, the test (not the students) may be the issue. Drop the worst-performing question and re-grade — this calculator updates instantly when you change the total.</li>
            <li><strong>Use percentages, not raw counts, when comparing sections.</strong> A 20-question quiz and a 30-question quiz cannot be averaged by points — percentages line up directly.</li>
          </ul>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">After the test</h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Once you have each test grade, combine them into a course grade. The <Link href="/grade-calculator" className="text-blue-700 hover:underline">weighted grade calculator</Link> handles syllabuses with multiple categories (homework, quizzes, tests, final). If a student is asking what they need on the final exam to hit a target, the <Link href="/final-grade-calculator" className="text-blue-700 hover:underline">final grade calculator</Link> works backwards from the target.
          </p>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Students can then plug their course letter into a <Link href="/weighted-gpa-calculator" className="text-blue-700 hover:underline">GPA calculator</Link> to see how this class affects their cumulative GPA — useful for college-bound seniors comparing semesters.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">Why this is free</h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            We make GPA and grade calculators for high school and college students. Teachers asked for an EZ Grader to use during in-class grading — so here it is. No signup, no ads in the calculator surface, no tracking of grades. Everything stays in your browser.
          </p>
        </div>
      </article>

      <Faq items={FAQ_ITEMS} />
    </>
  );
}
