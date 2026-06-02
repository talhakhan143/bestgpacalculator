import type { Metadata } from "next";
import Link from "next/link";
import { GradeCalculator } from "@/components/calculator/GradeCalculator";
import { Hero } from "@/components/sections/Hero";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { ArticleSchema, CalculatorSchema, FaqSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArticleMeta, DefinitionBlock, KeyFacts } from "@/components/sections/InContentLinks";

export const metadata: Metadata = {
  title: "Semester Grade Calculator — Combine Quarters + Final",
  description:
    "Free semester grade calculator. Combine quarter grades, midterm, and final exam using your school's exact weighting formula. Live letter grade, no signup.",
  alternates: { canonical: "/semester-grade-calculator" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How is a semester grade calculated?",
    a: "Most US high schools and colleges use a weighted formula: typically two quarter grades at 40% each plus a final exam at 20% (the 40/40/20 formula). Some schools use 45/45/10, 50/50, or include a midterm. Check your syllabus — our calculator lets you set any weighting.",
  },
  {
    q: "What is the 40/40/20 semester grade formula?",
    a: "It's the most common high school semester formula: first quarter counts 40%, second quarter counts 40%, final exam counts 20%. So if you have a 90% Q1, 85% Q2, and 78% final: 90×0.40 + 85×0.40 + 78×0.20 = 85.6% (B).",
  },
  {
    q: "Do I include the midterm in semester grade?",
    a: "Only if your school's policy does. The 40/40/20 formula assumes the midterm is already absorbed into Q2. If your school treats the midterm separately (e.g. 30/30/15/25 for Q1/Q2/midterm/final), add a midterm row in the calculator.",
  },
  {
    q: "What if my school uses different weightings?",
    a: "Edit the weight column for each row. The calculator divides by the actual total of your weights, so 30/30/40 or 45/45/10 or any other split all work correctly.",
  },
  {
    q: "How does this differ from the final grade calculator?",
    a: "The semester grade calculator shows your finished semester grade given all components you've already earned. The final grade calculator works backward — you know your current grade and want to figure out what you need on the final to hit a target. Use this page after grades are in; use the final grade calculator before the final.",
  },
];

export default function SemesterGradePage() {
  return (
    <>
      <CalculatorSchema
        name="Semester Grade Calculator"
        description="Combine quarter grades, midterm, and final exam using your school's exact weighting formula."
        url="https://bestgpacalculator.online/semester-grade-calculator"
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="Semester Grade Calculator — Combine Quarters and Final"
        description="Free semester grade calculator. Combine quarter grades and final exam using your school's exact formula."
        url="https://bestgpacalculator.online/semester-grade-calculator"
        datePublished="2026-06-02"
        dateModified="2026-06-02"
      />

      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Semester Grade", href: "/semester-grade-calculator" }]} />
      <Hero
        badge="Combine quarters + final"
        title="Semester Grade"
        highlight="Calculator"
        subtitle="Combine quarter grades, midterm, and final under your school's exact weighting (40/40/20, 45/45/10, custom). Live percentage and letter grade."
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <GradeCalculator mode="semester" storageScope="semester-grade" />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <ArticleMeta updated="2026-06-02" />
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">How semester grades are calculated</h2>

          <DefinitionBlock
            term="Semester grade"
            definition="The composite grade for a half-year of coursework, calculated by combining quarter (or term) grades plus mid-term or final exam scores using a school-specific weighted formula."
          />

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            US schools rarely just average quarters. The semester grade is a weighted combination of two quarter grades plus a final exam (and sometimes a midterm). The exact weighting depends on the district. Three common formulas:
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-700">
            <li><strong>40/40/20</strong> — Q1 40%, Q2 40%, final 20%. The most common high school formula.</li>
            <li><strong>45/45/10</strong> — Q1 45%, Q2 45%, final 10%. Used when finals are low-stakes.</li>
            <li><strong>40/40/10/10</strong> — Q1 40%, Q2 40%, midterm 10%, final 10%. Common in courses with mandatory midterm.</li>
          </ul>

          <KeyFacts
            items={[
              { label: "Default formula", value: "40 / 40 / 20 (Q1 / Q2 / final)" },
              { label: "Letter scale", value: "10-point (93+ = A, 90-92 = A-, 87-89 = B+)" },
              { label: "Common variants", value: "45/45/10, 40/40/10/10, 50/50" },
              { label: "Where to find your formula", value: "Course syllabus or student handbook" },
            ]}
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">Worked example</h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Using the 40/40/20 formula with Q1 = 90%, Q2 = 85%, final = 78%:
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-100">
{`(90 × 40) + (85 × 40) + (78 × 20)
= 3600 + 3400 + 1560
= 8560
÷ 100
= 85.6%  →  B`}
          </pre>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">Related tools</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-700">
            <li><Link href="/final-grade-calculator" className="text-blue-700 hover:underline">Final grade calculator</Link> — what you need on the final to hit a target.</li>
            <li><Link href="/grade-calculator" className="text-blue-700 hover:underline">Grade calculator</Link> — for ongoing assignment-weighted averages.</li>
            <li><Link href="/semester-gpa-calculator" className="text-blue-700 hover:underline">Semester GPA calculator</Link> — combine semester letter grades across multiple courses into a GPA.</li>
            <li><Link href="/cumulative-gpa-calculator" className="text-blue-700 hover:underline">Cumulative GPA calculator</Link> — roll multiple semester GPAs into one.</li>
          </ul>
        </div>
      </article>

      <Faq items={FAQ_ITEMS} />
    </>
  );
}
