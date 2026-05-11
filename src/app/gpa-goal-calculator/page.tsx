import type { Metadata } from "next";
import { GpaGoalCalculator } from "@/components/calculator/GpaGoalCalculator";
import { Hero } from "@/components/sections/Hero";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { ArticleSchema, CalculatorSchema, FaqSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import Link from "next/link";
import { InlineCalcCta, Citation, DefinitionBlock, KeyFacts, ArticleMeta } from "@/components/sections/InContentLinks";

export const metadata: Metadata = {
  title: "GPA Goal Calculator — Reverse GPA Target Planner",
  description:
    "Reverse GPA calculator. Enter your current GPA and target — see exactly what GPA you need next semester to hit it. Free, no signup, instant feedback.",
  alternates: { canonical: "/gpa-goal-calculator" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How does a GPA goal calculator work?",
    a: "It uses the GPA formula in reverse. Given your current GPA, completed credits, and target GPA, it solves for the average GPA you need across upcoming credits to reach the target.",
  },
  {
    q: "Why does the calculator say my goal is impossible?",
    a: "If raising your GPA from current to target requires an average above 4.0 across just one term, it's mathematically impossible — even straight A's wouldn't get you there. Spread the goal over more terms.",
  },
  {
    q: "Does this work for both high school and college GPA?",
    a: "Yes. As long as you're on a standard 4.0 scale, the formula is identical. For weighted high school GPA on a 5.0 scale, plug in weighted numbers throughout.",
  },
  {
    q: "What's a realistic GPA improvement in one semester?",
    a: "Lifting GPA by 0.1–0.2 in a single full-load semester (15 credits) is reachable for most students. 0.3+ requires near-perfect performance. Lifting by 0.5+ usually needs multiple semesters.",
  },
  {
    q: "Can I use credits as units, hours, or quarter credits?",
    a: "Yes — as long as your current credits and upcoming credits use the same unit (semester credits, hours, etc.), the formula gives a correct answer.",
  },
];

export default function GpaGoalPage() {
  return (
    <>
      <CalculatorSchema
        name="GPA Goal Calculator"
        description="Reverse GPA calculator: figure out what GPA you need next semester to hit your target. Works for high school and college."
        url="https://bestgpacalculator.com/gpa-goal-calculator"
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="GPA Goal Calculator"
        description="Reverse GPA calculator: figure out what GPA you need next semester to hit your target. Works for high school and college."
        url="https://bestgpacalculator.com/gpa-goal-calculator"
        datePublished="2026-04-15"
        dateModified="2026-05-06"
      />


      
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Calculators", href: "/weighted-gpa-calculator" }, { name: "GPA Goal Reverse", href: "/gpa-goal-calculator" }]} />
      <Hero
        badge="Reverse calculator"
        title="GPA Goal"
        highlight="Calculator"
        subtitle="What do you need next semester to hit your target GPA? Enter your current numbers and see exactly what grade average gets you there."
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <GpaGoalCalculator />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <ArticleMeta updated="2026-05-06" />
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            How the math works
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            GPA is a credit-weighted average. To reach a target GPA after taking
            on more credits, you solve for the average GPA needed across those
            upcoming credits.
          </p>

          <DefinitionBlock
            term="GPA Goal Calculator"
            definition="A reverse GPA calculator solves the standard formula backwards. Given your current GPA, completed credits, target GPA, and upcoming credits, it tells you the average GPA you need across the upcoming term to hit your goal."
          />

          <KeyFacts
            items={[
              { label: "Inputs", value: "Current GPA, credits done, target GPA, upcoming credits" },
              { label: "Output", value: "Required average GPA next term" },
              { label: "Limit", value: "Required avg above 4.0 = mathematically impossible in one term" },
              { label: "Use case", value: "Term planning, grad school prep, scholarship targets" },
            ]}
          />

          <pre className="glass-input mt-4 overflow-x-auto rounded-xl p-4 text-xs leading-relaxed text-slate-800">
{`required_avg = (target_gpa × total_credits_after − current_gpa × credits_done) / upcoming_credits

Example:
  current_gpa = 3.40
  credits_done = 60
  target_gpa = 3.60
  upcoming_credits = 15
  total_after = 75

  required_avg = (3.60 × 75 − 3.40 × 60) / 15
              = (270 − 204) / 15
              = 4.40

  Above 4.0 → impossible in one term. Spread to two terms (30 credits) →
  required_avg = (3.60 × 90 − 3.40 × 60) / 30 = 4.00 (still tight, all A's needed)
  Spread to three terms (45 credits) →
  required_avg = (3.60 × 105 − 3.40 × 60) / 45 = 3.87`}
          </pre>

          <h3 className="mt-8 text-xl font-bold tracking-tight text-slate-900">
            What &quot;feasibility&quot; means
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700">
            <li>
              <strong>On track:</strong> required avg ≤ 3.0 — modest performance hits target.
            </li>
            <li>
              <strong>Reachable:</strong> required avg 3.0–3.7 — solid focus needed.
            </li>
            <li>
              <strong>Stretch:</strong> required avg 3.7–4.0 — near-perfect term required.
            </li>
            <li>
              <strong>Impossible:</strong> required avg &gt; 4.0 — cannot be done in one term on standard 4.0 scale.
            </li>
          </ul>
        
          <InlineCalcCta
            href="/cumulative-gpa-calculator"
            title="Need your current cumulative first?"
            body="Plug in all completed terms with the Cumulative GPA Calculator before goal planning."
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">
            Common GPA targets and what they mean
          </h3>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-slate-700">
            <li><strong className="text-slate-900">2.0 (good standing).</strong> Required to stay enrolled and keep federal financial aid (SAP).</li>
            <li><strong className="text-slate-900">3.0 (graduate-ready).</strong> Common minimum for grad school applications and many employers.</li>
            <li><strong className="text-slate-900">3.5 (cum laude).</strong> Latin honors threshold at most US universities.</li>
            <li><strong className="text-slate-900">3.7 (magna cum laude).</strong> Higher Latin honors; common Dean&apos;s List cutoff.</li>
            <li><strong className="text-slate-900">3.9 (summa cum laude).</strong> Top of class at most institutions.</li>
            <li><strong className="text-slate-900">4.0 unweighted.</strong> Perfect transcript — every grade is an A.</li>
          </ul>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">
            Plan multi-term — not just next term
          </h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            One-term goals often hit the impossible wall. Lifting a 3.0 to 3.5
            with 60 credits done requires a 4.5 average across 30 upcoming
            credits — past the 4.0 ceiling. Spread the goal: 60 upcoming
            credits at 4.0 lands closer. After each term posts, recompute with
            the{" "}
            <Link href="/cumulative-gpa-calculator" className="font-medium text-blue-700 hover:underline">Cumulative GPA Calculator</Link>{" "}
            and reset the goal. For a single-term snapshot, the{" "}
            <Link href="/semester-gpa-calculator" className="font-medium text-blue-700 hover:underline">Semester GPA Calculator</Link>{" "}
            shows where this term lands. If you&apos;re mid-term, the{" "}
            <Link href="/current-gpa-calculator" className="font-medium text-blue-700 hover:underline">Current GPA Calculator</Link>{" "}
            estimates from in-progress assignment grades.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">
            High school vs college goal-setting
          </h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            High school goals usually compare against weighted GPA — see the{" "}
            <Link href="/weighted-gpa-calculator" className="font-medium text-blue-700 hover:underline">Weighted GPA Calculator</Link>{" "}
            to model AP/Honors bonuses. Many districts publish weighted class
            rank targets. College goals almost always use unweighted GPA on
            the 4.0 scale — try the{" "}
            <Link href="/college-gpa-calculator" className="font-medium text-blue-700 hover:underline">College GPA Calculator</Link>{" "}
            for credit-hour input. Either way, the goal math is identical:
            credit-weighted average must hit the target.
          </p>

          <InlineCalcCta
            href="/high-school-gpa-calculator"
            title="High school student?"
            body="The High School GPA Calculator handles weighted + unweighted side by side, so you can plan against either target."
          />

          <Citation source="NCES" url="https://nces.ed.gov/" detail="GPA recovery and improvement statistics" />
          <Citation source="U.S. Department of Education" url="https://www.ed.gov/" detail="Satisfactory Academic Progress (SAP) cumulative GPA thresholds" />
          <Citation source="College Board BigFuture" url="https://bigfuture.collegeboard.org/" detail="GPA goal-setting resources for college applicants" />
        </div>
      </article>
      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentHref="/gpa-goal-calculator" />
    </>
  );
}
