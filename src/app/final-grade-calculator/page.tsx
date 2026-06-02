import type { Metadata } from "next";
import Link from "next/link";
import { FinalGradeCalculator } from "@/components/calculator/FinalGradeCalculator";
import { Hero } from "@/components/sections/Hero";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { ArticleSchema, CalculatorSchema, FaqSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArticleMeta, DefinitionBlock, KeyFacts } from "@/components/sections/InContentLinks";

export const metadata: Metadata = {
  title: "Final Grade Calculator — What Do I Need on the Final?",
  description:
    "Free final grade calculator. Enter your current grade, target course grade, and the final's weight to see the exact score you need on the final exam.",
  alternates: { canonical: "/final-grade-calculator" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How do I calculate what I need on my final?",
    a: "Use the formula: required final score = (desired course grade − current grade × (1 − final weight)) ÷ final weight. Our calculator does this live — enter your current grade, target grade, and the final's weight as a percentage.",
  },
  {
    q: "What if the required score is over 100%?",
    a: "Your target course grade is mathematically unreachable from your current grade given the final's weight. You'll need to either lower your target or earn extra credit if it's offered.",
  },
  {
    q: "What if the required score is negative or very low?",
    a: "It means you've already secured your target grade — even a zero on the final keeps you at or above it. The calculator labels this 'Already won.' Still take the final seriously; some schools have minimum final-exam attendance rules.",
  },
  {
    q: "Where do I find my final exam's weight?",
    a: "It's on the syllabus, usually labeled 'Final exam' or 'Final assessment' in the grading breakdown. Common ranges: 20–40% in US high school, 25–50% in college. AP-style courses sometimes weight the final higher (30–50%).",
  },
  {
    q: "Does this work for any course?",
    a: "Yes — high school, college, AP, IB, online, any course with a final assessment that's worth a fixed share of the total grade. The math is identical.",
  },
];

export default function FinalGradePage() {
  return (
    <>
      <CalculatorSchema
        name="Final Grade Calculator"
        description="Calculate the exact final exam score you need to hit your target course grade."
        url="https://bestgpacalculator.online/final-grade-calculator"
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="Final Grade Calculator — What Do I Need on the Final?"
        description="Free final grade calculator showing the exact final exam score needed to achieve your target course grade."
        url="https://bestgpacalculator.online/final-grade-calculator"
        datePublished="2026-06-02"
        dateModified="2026-06-02"
      />

      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Final Grade", href: "/final-grade-calculator" }]} />
      <Hero
        badge="What do I need?"
        title="Final Grade"
        highlight="Calculator"
        subtitle="Tell us your current grade, your target course grade, and how much the final is worth. We'll show exactly what you need on the final — and whether it's realistic."
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <FinalGradeCalculator />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <ArticleMeta updated="2026-06-02" />
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">The final grade formula</h2>

          <DefinitionBlock
            term="Required final score"
            definition="The score you must earn on your final exam to achieve a specific overall course grade, given the share of the course grade the final represents and your current grade going into the final."
          />

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            The math is short: <strong>required final = (target − current × (1 − weight)) ÷ weight</strong>, where the weight is a fraction (e.g. 0.30 for a final worth 30%). The intuition: your current grade is locked in for (1 − weight) share of the course; the final controls the rest.
          </p>

          <KeyFacts
            items={[
              { label: "Formula", value: "(target − current × (1 − w)) ÷ w" },
              { label: "Inputs needed", value: "Current grade, target course grade, final weight (%)" },
              { label: "Typical final weight", value: "20–40% in US high school, 25–50% in college" },
              { label: "Returned as", value: "Percentage score required on the final exam" },
            ]}
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">Worked example</h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            You have a 82% going into the final. You want a 90% in the course. The final is worth 30% of your grade. The required final score is:
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-100">
{`(90 − 82 × 0.70) ÷ 0.30
= (90 − 57.4) ÷ 0.30
= 32.6 ÷ 0.30
= 108.67%`}
          </pre>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            That target is impossible from an 82 with a 30%-weighted final — you cannot score over 100%. You would need either extra credit or a lower target (88% is reachable with a 96 on the final).
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">How to read the feasibility label</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-700">
            <li><strong>Already won</strong> — you'll hit the target even with a zero on the final.</li>
            <li><strong>Comfortable / Achievable</strong> — realistic with normal preparation.</li>
            <li><strong>Stretch</strong> — possible but requires a strong performance.</li>
            <li><strong>Very tough</strong> — needs near-perfect; unforgiving margin for error.</li>
            <li><strong>Impossible</strong> — over 100% is required; revise the target or earn extra credit.</li>
          </ul>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">After the final</h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Once grades are posted, use the <Link href="/grade-calculator" className="text-blue-700 hover:underline">grade calculator</Link> to verify your final course percentage matches what your gradebook shows. Then plug the letter grade into the <Link href="/weighted-gpa-calculator" className="text-blue-700 hover:underline">weighted GPA calculator</Link> to update your cumulative GPA, or use the <Link href="/gpa-goal-calculator" className="text-blue-700 hover:underline">GPA goal calculator</Link> to plan next term.
          </p>
        </div>
      </article>

      <Faq items={FAQ_ITEMS} />
    </>
  );
}
