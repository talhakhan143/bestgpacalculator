import type { Metadata } from "next";
import Link from "next/link";
import { GradeCalculator } from "@/components/calculator/GradeCalculator";
import { Hero } from "@/components/sections/Hero";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { ArticleSchema, CalculatorSchema, FaqSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArticleMeta, DefinitionBlock, KeyFacts } from "@/components/sections/InContentLinks";

export const metadata: Metadata = {
  title: "Weighted Grade Calculator — Assignment Weight Tool",
  description:
    "Free weighted grade calculator. Add assignments or categories with their weights — instantly see your weighted course average and letter grade.",
  alternates: { canonical: "/weighted-grade-calculator" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is a weighted grade calculator?",
    a: "A weighted grade calculator computes your course average when assignments or categories contribute different shares of the final grade. Instead of averaging raw scores, it multiplies each percentage by its weight and divides by the total weight.",
  },
  {
    q: "Weighted grade vs weighted GPA — what's the difference?",
    a: "A weighted grade is the percentage for one course (e.g. 87% in Algebra II). A weighted GPA converts letter grades across multiple courses into grade points with bonuses for harder classes (AP, Honors, IB). Use the weighted grade calculator per course, the weighted GPA calculator across all your courses.",
  },
  {
    q: "How do I assign weights?",
    a: "Weights come from your syllabus. Common patterns: tests 50% / homework 30% / participation 20%, or homework 25% / quizzes 15% / midterm 25% / final 35%. Whatever the syllabus says, enter each category as a row with its percentage weight.",
  },
  {
    q: "Can I weight individual assignments instead of categories?",
    a: "Yes — just enter each assignment as its own row with its point value or weight. The calculator treats each row as one weighted item regardless of whether it's a category or a single assignment.",
  },
  {
    q: "Do my weights have to sum to 100?",
    a: "No. The calculator divides the weighted sum by the actual total of your weights. If they sum to 80, 100, or 250, the math is the same. But if your syllabus says they should equal 100, check that yours do — missing weight usually means a missing category.",
  },
];

export default function WeightedGradePage() {
  return (
    <>
      <CalculatorSchema
        name="Weighted Grade Calculator"
        description="Free weighted grade calculator for assignment- or category-weighted course averages."
        url="https://bestgpacalculator.online/weighted-grade-calculator"
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="Weighted Grade Calculator — Assignment Weight Tool"
        description="Free weighted grade calculator with live letter grade output."
        url="https://bestgpacalculator.online/weighted-grade-calculator"
        datePublished="2026-06-02"
        dateModified="2026-06-02"
      />

      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Weighted Grade", href: "/weighted-grade-calculator" }]} />
      <Hero
        badge="Assignment-weighted average"
        title="Weighted Grade"
        highlight="Calculator"
        subtitle="Add your assignments or category buckets with their weights — get a live weighted average and letter grade. Works for any syllabus."
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <GradeCalculator mode="weighted" storageScope="weighted-grade-page" />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <ArticleMeta updated="2026-06-02" />
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">When to use a weighted grade calculator</h2>

          <DefinitionBlock
            term="Weighted grade"
            definition="A course percentage computed as the weighted average of your scores across categories or assignments — each multiplied by its share of the final grade."
          />

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Any time a syllabus assigns different weights to different work (which is most courses), you need a weighted grade calculator. A flat average is only correct when every assignment is equal — rare in modern courses. Most grade portals (Canvas, PowerSchool, Skyward) do this math automatically, but they can be wrong if the gradebook setup is incomplete; this calculator lets you check.
          </p>

          <KeyFacts
            items={[
              { label: "Formula", value: "Σ (score × weight) ÷ Σ (weights)" },
              { label: "Output", value: "Percentage + 10-point letter grade" },
              { label: "Common syllabi", value: "Tests 40% / HW 30% / final 30%, or category split" },
              { label: "Letter cutoffs", value: "A 93, A− 90, B+ 87, B 83, B− 80 (10-point scale)" },
            ]}
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">Two ways to set up the calculator</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-6 text-base leading-relaxed text-slate-700">
            <li><strong>By category</strong> — one row per category (homework, quizzes, tests, final). Enter the category percentage and its syllabus weight.</li>
            <li><strong>By assignment</strong> — one row per individual assignment. Enter score / max / weight directly.</li>
          </ol>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">Related tools</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-700">
            <li><Link href="/final-grade-calculator" className="text-blue-700 hover:underline">Final grade calculator</Link> — what you need on the final.</li>
            <li><Link href="/semester-grade-calculator" className="text-blue-700 hover:underline">Semester grade calculator</Link> — quarter + final combination.</li>
            <li><Link href="/grade-calculator" className="text-blue-700 hover:underline">Grade calculator (hub)</Link> — all grade modes in one place.</li>
            <li><Link href="/weighted-gpa-calculator" className="text-blue-700 hover:underline">Weighted GPA calculator</Link> — once you know letter grades, roll them into a GPA.</li>
          </ul>
        </div>
      </article>

      <Faq items={FAQ_ITEMS} />
    </>
  );
}
