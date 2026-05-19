import type { Metadata } from "next";
import { WeightedGPACalculator } from "@/components/calculator/WeightedGPACalculator";
import { Hero } from "@/components/sections/Hero";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { ArticleSchema, CalculatorSchema, FaqSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import Link from "next/link";
import { InlineCalcCta, Citation, DefinitionBlock, KeyFacts, ArticleMeta } from "@/components/sections/InContentLinks";
import { newClass } from "@/lib/gpa-math";

export const metadata: Metadata = {
  title: "College GPA Calculator — 4.0 Scale + Credits",
  description:
    "Free college GPA calculator. Standard 4.0 scale with credit hours. Calculate semester GPA or cumulative across all semesters. No signup, instant results.",
  alternates: { canonical: "/college-gpa-calculator" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How is college GPA calculated?",
    a: "Multiply each course's grade point (A=4.0, B=3.0, etc.) by the credit hours, sum those values, and divide by total credit hours. That's your GPA on the 4.0 scale.",
  },
  {
    q: "What's a good college GPA?",
    a: "3.0+ is typically required to maintain financial aid. 3.5+ is considered very good. 3.7+ is dean's list at most schools. 3.8-4.0 is competitive for grad school and prestigious internships.",
  },
  {
    q: "Are college GPAs weighted?",
    a: "Almost never. College GPAs use the unweighted 4.0 scale. Course difficulty isn't formally weighted — graduate schools and employers look at the transcript and major instead.",
  },
  {
    q: "How do withdrawals affect college GPA?",
    a: "A W (withdrawal) doesn't count toward GPA but stays on the transcript. Too many W's can signal trouble to grad schools. Failing (F) counts as 0.0 quality points and tanks your GPA.",
  },
];

export default function CollegeGpaPage() {
  return (
    <>
      <CalculatorSchema
        name="College GPA Calculator"
        description="Free college GPA calculator on the 4.0 scale with credit hours. Calculate semester or cumulative GPA."
        url="https://bestgpacalculator.online/college-gpa-calculator"
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="College GPA Calculator"
        description="Free college GPA calculator on the 4.0 scale with credit hours. Calculate semester or cumulative GPA."
        url="https://bestgpacalculator.online/college-gpa-calculator"
        datePublished="2026-04-15"
        dateModified="2026-05-06"
      />


      
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Calculators", href: "/weighted-gpa-calculator" }, { name: "College GPA", href: "/college-gpa-calculator" }]} />
      <Hero
        badge="Undergrad / grad"
        title="College"
        highlight="GPA Calculator"
        subtitle="Calculate your college GPA on the 4.0 scale with credit hours. No weighting, no AP — just your real grades and credit values, the way universities track them."
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <WeightedGPACalculator
          showLevels={false}
          showPresets={false}
          forcedLevel="regular"
          forcedPresetId="standard"
          hideUnweighted
          resultLabel={{ weighted: "College" }}
          storageScope="college"
          defaultCredits={3}
          starterClasses={[
            newClass({ name: "Course 1", grade: "A", credits: 3, level: "regular" }),
            newClass({ name: "Course 2", grade: "B+", credits: 3, level: "regular" }),
            newClass({ name: "Course 3", grade: "A-", credits: 4, level: "regular" }),
            newClass({ name: "Course 4", grade: "B", credits: 3, level: "regular" }),
          ]}
        />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <ArticleMeta updated="2026-05-06" />
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            How to calculate college GPA
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Each course earns quality points equal to its grade point times its
            credit hours. Sum the quality points, divide by total credit hours.
            That&apos;s your GPA. Most US colleges use the standard 4.0 scale
            (with or without plus/minus modifiers).
          </p>

          <DefinitionBlock
            term="College GPA"
            definition="A college GPA is a credit-hour-weighted average of your grades across all college courses on a 4.0 scale. Unlike high school, college GPAs are almost never weighted — course difficulty doesn't add bonus points to the final grade."
          />

          <KeyFacts
            items={[
              { label: "Maximum value", value: "4.0 (most schools)" },
              { label: "Credit hours per course", value: "Typically 3–4 per class" },
              { label: "Course rigor weighting", value: "Almost never weighted" },
              { label: "Honors thresholds", value: "Cum laude 3.5+, Magna 3.7+, Summa 3.9+ (varies)" },
            ]}
          />

          <pre className="glass-input mt-4 overflow-x-auto rounded-xl p-4 text-xs leading-relaxed text-zinc-800 dark:text-zinc-200">
{`Example semester:
  Calculus II:    A  (4.0) × 4 credits = 16.0
  English 101:    B+ (3.3) × 3 credits = 9.9
  Psychology:     A- (3.7) × 3 credits = 11.1
  Chemistry:      B  (3.0) × 4 credits = 12.0
  Total:          14 credits, 49.0 quality points
  Semester GPA:   49.0 / 14 = 3.50`}
          </pre>

          <h3 className="mt-8 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            GPA milestones to know
          </h3>
          <ul className="mt-3 space-y-2 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">2.0:</strong>{" "}
              Minimum to stay enrolled at most schools.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">3.0:</strong>{" "}
              Minimum for most scholarships and many grad programs.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">3.5:</strong>{" "}
              Cum laude territory (Latin honors).
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">3.7:</strong>{" "}
              Magna cum laude / Dean&apos;s List at most schools.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">3.9+:</strong>{" "}
              Summa cum laude — top of class.
            </li>
          </ul>
        
          <InlineCalcCta
            href="/gpa-goal-calculator"
            title="Want to lift your GPA next term?"
            body="Use the GPA Goal Calculator to see exactly what grade average you need to hit your target."
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Semester GPA vs cumulative GPA
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Two views matter. The{" "}
            <Link href="/semester-gpa-calculator" className="font-medium text-blue-700 hover:underline">Semester GPA Calculator</Link>{" "}
            shows just the current term — useful for tracking trend lines and
            spotting a bad semester early. The{" "}
            <Link href="/cumulative-gpa-calculator" className="font-medium text-blue-700 hover:underline">Cumulative GPA Calculator</Link>{" "}
            rolls every term together for the figure that lands on your
            transcript and degree audit. If grades are still in flight, the{" "}
            <Link href="/current-gpa-calculator" className="font-medium text-blue-700 hover:underline">Current GPA Calculator</Link>{" "}
            estimates from completed assignments.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Plus/minus modifiers and how schools differ
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Most US universities use plus/minus modifiers (A=4.0, A−=3.7,
            B+=3.3). A few don&apos;t — Harvard, Yale, and several state schools
            historically reported letter-only. A handful let A+ register as 4.3.
            Check your registrar&apos;s grading policy. Even within one school,
            graduate programs and undergraduate departments occasionally
            disagree.
          </p>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            International transcripts often arrive in percentage form. Use the{" "}
            <Link href="/percentage-to-gpa-calculator" className="font-medium text-blue-700 hover:underline">Percentage to GPA Converter</Link>{" "}
            to map them to the US 4.0 scale before comparing.
          </p>

          <InlineCalcCta
            href="/cumulative-gpa-calculator"
            title="Need your full transcript average?"
            body="Combine every semester into a cumulative GPA — the figure grad schools and employers see."
          />

          <Citation source="NCES" url="https://nces.ed.gov/" detail="undergraduate grading standards" />
          <Citation source="U.S. Department of Education" url="https://www.ed.gov/" detail="federal academic progress (SAP) requirements for financial aid" />
          <Citation source="National Association of Colleges and Employers (NACE)" url="https://www.naceweb.org/" detail="GPA cutoffs in employer recruiting surveys" />
        </div>
      </article>
      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentHref="/college-gpa-calculator" />
    </>
  );
}
