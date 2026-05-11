import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { FaqSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";

export const metadata: Metadata = {
  title: "How to Calculate GPA — Step-by-Step Guide for 2026",
  description:
    "Complete guide to calculating GPA. Step-by-step formulas for unweighted, weighted, semester, cumulative, and percentage-based GPA. With examples and free calculators.",
  alternates: { canonical: "/how-to-calculate-gpa" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How do you calculate GPA step by step?",
    a: "1. Convert each letter grade to grade points (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0). 2. Multiply each grade point by the credit hours for that class. 3. Add all those products together. 4. Divide by the total credit hours. The result is your GPA on the 4.0 scale.",
  },
  {
    q: "How is GPA calculated with weighted classes?",
    a: "Add bonus points to AP/Honors/IB grade points before multiplying by credits. Standard scale adds +1.0 to AP/IB and +0.5 to Honors. So an A in AP becomes 5.0 instead of 4.0, then multiply by credits as usual.",
  },
  {
    q: "How can I calculate my GPA quickly?",
    a: "Use a calculator. Enter every class with grade and credits. The math is mechanical: weighted average of grade points by credit hours. The free tools on this site do it instantly.",
  },
  {
    q: "How do you calculate GPA from percentages?",
    a: "Convert each percentage to a letter grade using the standard 10-point scale (93+ = A, 90-92 = A-, etc.), then convert to grade points and average by credit hours.",
  },
  {
    q: "How is cumulative GPA calculated?",
    a: "Combine all your semester GPAs weighted by their credits. Sum the quality points across every semester (GPA × credits per semester), divide by total credits across all semesters.",
  },
];

export default function HowToCalculateGpaPage() {
  return (
    <>
      <FaqSchema items={FAQ_ITEMS} />

      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Guide", href: "/how-to-calculate-gpa" }]} />
      <Hero
        badge="The complete guide"
        title="How to"
        highlight="Calculate GPA"
        subtitle="Step-by-step formulas for every type of GPA: unweighted, weighted, semester, cumulative, and percentage-based. With examples — no fluff."
      />

      <article className="mx-auto mt-12 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            The basic GPA formula
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            GPA stands for Grade Point Average. The standard scale runs from
            0.0 to 4.0. Each letter grade has a numeric value (A = 4.0, B =
            3.0, etc.). Multiply each grade by its credit hours, sum, and
            divide by total credits.
          </p>
          <pre className="glass-input mt-4 overflow-x-auto rounded-xl p-4 text-xs leading-relaxed text-zinc-800 dark:text-zinc-200">
{`GPA = Σ(grade_point × credits) / Σ(credits)

Letter → Grade Point:
  A+/A → 4.0    A- → 3.7
  B+ → 3.3      B → 3.0    B- → 2.7
  C+ → 2.3      C → 2.0    C- → 1.7
  D+ → 1.3      D → 1.0    D- → 0.7
  F → 0.0`}
          </pre>

          <h3 className="mt-10 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Step 1 — Convert each grade to points
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Look at your transcript. For each class, write down the letter
            grade and use the table above to find the grade points.
          </p>

          <h3 className="mt-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Step 2 — Multiply by credits
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Each class is worth a number of credits (also called credit hours
            or units). High school classes are typically 1 credit. College
            classes are usually 3-4 credits each. Multiply grade points by
            credits to get quality points.
          </p>

          <h3 className="mt-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Step 3 — Sum and divide
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Add up all the quality points. Add up all the credits. Divide the
            first by the second. That&apos;s your GPA.
          </p>

          <pre className="glass-input mt-4 overflow-x-auto rounded-xl p-4 text-xs leading-relaxed text-zinc-800 dark:text-zinc-200">
{`Worked example — high school semester

  English (1 credit, A):       4.0 × 1 = 4.0
  Algebra II (1 credit, B+):   3.3 × 1 = 3.3
  US History (1 credit, A-):   3.7 × 1 = 3.7
  Spanish III (1 credit, B):   3.0 × 1 = 3.0
  PE (0.5 credit, A):          4.0 × 0.5 = 2.0

  Quality points: 4.0+3.3+3.7+3.0+2.0 = 16.0
  Credits:        1+1+1+1+0.5 = 4.5
  Semester GPA:   16.0 / 4.5 = 3.56`}
          </pre>

          <h2 className="mt-12 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Weighted GPA — adding bonus points
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Weighted GPA gives extra credit for harder classes. Most US schools
            add +1.0 to AP/IB/dual-enrollment and +0.5 to Honors before
            calculating. Add the bonus to the grade point first, then multiply
            by credits.
          </p>
          <pre className="glass-input mt-4 overflow-x-auto rounded-xl p-4 text-xs leading-relaxed text-zinc-800 dark:text-zinc-200">
{`Standard +0.5/+1.0 weighting:
  A in AP class:     (4.0 + 1.0) × credits = 5.0 × credits
  A in Honors:       (4.0 + 0.5) × credits = 4.5 × credits
  A in Regular:      4.0 × credits         = 4.0 × credits`}
          </pre>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Different schools use different scales. Some use +0.25/+0.75,
            others use +0.33/+0.67, a few only weight AP. Use the{" "}
            <Link
              href="/weighted-gpa-calculator"
              className="font-medium text-indigo-700 underline-offset-2 hover:underline dark:text-indigo-300"
            >
              Weighted GPA Calculator
            </Link>{" "}
            to switch between them.
          </p>

          <h2 className="mt-12 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Cumulative GPA — across multiple semesters
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Cumulative GPA averages every semester you&apos;ve completed,
            weighted by credits. To recalculate after a new semester:
          </p>
          <pre className="glass-input mt-4 overflow-x-auto rounded-xl p-4 text-xs leading-relaxed text-zinc-800 dark:text-zinc-200">
{`new cumulative GPA =
  (prior_GPA × prior_credits + new_GPA × new_credits)
  ÷ (prior_credits + new_credits)`}
          </pre>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            The{" "}
            <Link
              href="/cumulative-gpa-calculator"
              className="font-medium text-indigo-700 underline-offset-2 hover:underline dark:text-indigo-300"
            >
              Cumulative GPA Calculator
            </Link>{" "}
            does this automatically.
          </p>

          <h2 className="mt-12 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Percentage to GPA — converting numeric grades
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            If your grades are recorded as percentages, convert each one to a
            letter grade first using the standard US 10-point scale, then
            calculate as usual.
          </p>
          <pre className="glass-input mt-4 overflow-x-auto rounded-xl p-4 text-xs leading-relaxed text-zinc-800 dark:text-zinc-200">
{`93-100% → A   (4.0)
90-92%  → A-  (3.7)
87-89%  → B+  (3.3)
83-86%  → B   (3.0)
80-82%  → B-  (2.7)
77-79%  → C+  (2.3)
73-76%  → C   (2.0)
70-72%  → C-  (1.7)
67-69%  → D+  (1.3)
65-66%  → D   (1.0)
below 65 → F  (0.0)`}
          </pre>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Or skip the table and use the{" "}
            <Link
              href="/percentage-to-gpa-calculator"
              className="font-medium text-indigo-700 underline-offset-2 hover:underline dark:text-indigo-300"
            >
              Percentage to GPA Calculator
            </Link>
            .
          </p>

          <h2 className="mt-12 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Pick the right calculator
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { href: "/weighted-gpa-calculator", title: "Weighted GPA", body: "Multi-level with five scales" },
              { href: "/unweighted-gpa-calculator", title: "Unweighted GPA", body: "Pure 4.0 scale" },
              { href: "/high-school-gpa-calculator", title: "High School", body: "9-12th grade with AP/Honors" },
              { href: "/college-gpa-calculator", title: "College", body: "Credit hours, no weighting" },
              { href: "/middle-school-gpa-calculator", title: "Middle School", body: "Junior high simple version" },
              { href: "/cumulative-gpa-calculator", title: "Cumulative", body: "Combine prior + new semester" },
              { href: "/semester-gpa-calculator", title: "Semester", body: "Single term focus" },
              { href: "/current-gpa-calculator", title: "Current GPA", body: "Project from your current GPA" },
              { href: "/percentage-to-gpa-calculator", title: "Percentage to GPA", body: "Convert % to 4.0 scale" },
              { href: "/gpa-calculator-without-credits", title: "Without credits", body: "Equal-weight average" },
              { href: "/ap-gpa-calculator", title: "AP GPA", body: "Advanced Placement focus" },
              { href: "/honors-gpa-calculator", title: "Honors GPA", body: "Honors classes focus" },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="glass-input flex items-center justify-between rounded-xl p-3 transition hover:-translate-y-0.5 hover:bg-white/70 dark:hover:bg-white/[0.08]"
              >
                <div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {tool.title}
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    {tool.body}
                  </div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-indigo-700 dark:text-indigo-300" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </article>

      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators heading="All GPA calculators" count={8} />
    </>
  );
}
