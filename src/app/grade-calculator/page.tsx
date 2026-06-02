import type { Metadata } from "next";
import Link from "next/link";
import { GradeCalculator } from "@/components/calculator/GradeCalculator";
import { Hero } from "@/components/sections/Hero";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { ArticleSchema, CalculatorSchema, FaqSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArticleMeta, DefinitionBlock, KeyFacts } from "@/components/sections/InContentLinks";

export const metadata: Metadata = {
  title: "Grade Calculator — Free Weighted Course Grade Tool",
  description:
    "Free grade calculator for assignment-weighted course averages. Add homework, quizzes, midterm, final — see your live letter grade and percentage. No signup.",
  alternates: { canonical: "/grade-calculator" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is a grade calculator?",
    a: "A grade calculator computes your current course average from your individual scores. Most courses weight categories differently — homework might be 20%, tests 40%, and the final 30% — so a weighted grade calculator multiplies each category percentage by its weight and divides by the total weight.",
  },
  {
    q: "How do I calculate my grade with weighted categories?",
    a: "Convert each category to a percentage (your score ÷ max score × 100), multiply by the category weight, sum those products, and divide by the total weight. Our calculator does it live — just enter score, max, and weight for each row.",
  },
  {
    q: "What if the weights do not add to 100?",
    a: "The calculator still works — it divides the weighted total by the actual sum of weights. But if your syllabus says weights should equal 100 and yours do not, double-check the syllabus to make sure you have not missed a category.",
  },
  {
    q: "How do I find out my course's grade weighting?",
    a: "Check the syllabus first — every course should list the grading breakdown. If it does not, your school's learning portal (Canvas, Blackboard, PowerSchool) usually shows category weights under the gradebook setup.",
  },
  {
    q: "What letter grade is 89%?",
    a: "Under the common US 10-point scale, 89% is a B+ (B+ range is 87–89%). 90% crosses into A- territory. Some schools use a 7-point scale where 86–92% is a B — check your school's policy.",
  },
  {
    q: "How is this different from a GPA calculator?",
    a: "A grade calculator gives you the percentage and letter grade for one course. A GPA calculator converts letter grades across multiple courses into a 4.0 scale grade-point average. Use the grade calculator first to know your course letter, then use a GPA calculator to combine letters across all your classes.",
  },
];

export default function GradeCalculatorPage() {
  return (
    <>
      <CalculatorSchema
        name="Grade Calculator"
        description="Free weighted grade calculator. Add scored categories with weights, get a live percentage and letter grade."
        url="https://bestgpacalculator.online/grade-calculator"
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="Grade Calculator — Weighted Course Grade Tool"
        description="Free weighted grade calculator with live letter grade and percentage."
        url="https://bestgpacalculator.online/grade-calculator"
        datePublished="2026-06-02"
        dateModified="2026-06-02"
      />

      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Grade Calculator", href: "/grade-calculator" }]} />
      <Hero
        badge="Course average tool"
        title="Grade"
        highlight="Calculator"
        subtitle="Add your scored categories with weights and get a live course percentage plus letter grade. Works for any class with a weighted syllabus — high school, college, or AP."
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <GradeCalculator mode="weighted" />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <ArticleMeta updated="2026-06-02" />
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">How a weighted grade calculator works</h2>

          <DefinitionBlock
            term="Weighted grade"
            definition="A weighted grade is a course average where each category (homework, quizzes, tests, projects, final) contributes a different share of the total. A 100% on a quiz worth 5% of your grade moves your average less than a 100% on a midterm worth 25%."
          />

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Most courses do not treat every assignment equally. A syllabus typically splits the final grade across a handful of categories with explicit weights — for example: homework 20%, quizzes 15%, midterm 25%, final 40%. Your <em>weighted</em> grade is the weighted average of your percentage in each of those buckets.
          </p>

          <KeyFacts
            items={[
              { label: "Formula", value: "Σ (category % × weight) ÷ Σ weights" },
              { label: "Weights usually sum to", value: "100 (but the math works either way)" },
              { label: "Letter scale used", value: "10-point (93+ = A, 90-92 = A-, 87-89 = B+ …)" },
              { label: "Common categories", value: "Homework, quizzes, tests, projects, participation, final" },
            ]}
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">Worked example</h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Suppose your syllabus splits the grade as: homework 20%, quizzes 15%, midterm 25%, final 40%. Your scores are 88% homework, 82% quizzes, 78% midterm, 85% final. The weighted average is:
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-100">
{`(88 × 20) + (82 × 15) + (78 × 25) + (85 × 40)
= 1760 + 1230 + 1950 + 3400
= 8340
÷ 100
= 83.4%  →  B`}
          </pre>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Without weighting (simple average of 88, 82, 78, 85) you would get 83.25% — close, but the weighting tilted slightly toward the final exam pulling the average up.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">When to use each mode</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-700">
            <li><strong>Weighted grade calculator</strong> (this page) — categories with explicit weights from your syllabus.</li>
            <li><Link href="/final-grade-calculator" className="text-blue-700 hover:underline">Final grade calculator</Link> — you know your current grade and want to know what you need on the final.</li>
            <li><Link href="/semester-grade-calculator" className="text-blue-700 hover:underline">Semester grade calculator</Link> — combine quarter grades + final exam under a fixed semester formula.</li>
            <li><Link href="/weighted-grade-calculator" className="text-blue-700 hover:underline">Weighted grade calculator (assignments)</Link> — same as this page, focused on individual assignment weights.</li>
          </ul>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">After you know your grade</h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Once you have a letter grade for the course, plug it into a <Link href="/weighted-gpa-calculator" className="text-blue-700 hover:underline">GPA calculator</Link> alongside your other classes to see how this course affects your cumulative GPA. If you are debating effort levels across courses, the <Link href="/gpa-goal-calculator" className="text-blue-700 hover:underline">GPA goal calculator</Link> shows what you need across remaining work to hit a target cumulative GPA.
          </p>
        </div>
      </article>

      <Faq items={FAQ_ITEMS} />
    </>
  );
}
