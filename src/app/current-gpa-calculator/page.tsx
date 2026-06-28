import type { Metadata } from "next";
import { CumulativeGPACalculator } from "@/components/calculator/CumulativeGPACalculator";
import { Hero } from "@/components/sections/Hero";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { ArticleSchema, CalculatorSchema, FaqSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";
import Link from "next/link";
import { InlineCalcCta, Citation, DefinitionBlock, KeyFacts, ArticleMeta } from "@/components/sections/InContentLinks";

export const metadata: Metadata = {
  title: "Current GPA Calculator: Predict Your Next Semester",
  description:
    "Free current GPA calculator. Combine your existing GPA with this semester's classes to predict your future GPA before grades drop. Mobile-first, instant, no signup.",
  alternates: { canonical: "/current-gpa-calculator" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What does this calculator do differently?",
    a: "It uses your current GPA as a starting point, then projects what your overall GPA becomes after the classes you're taking right now. Useful when you don't want to re-enter every past class.",
  },
  {
    q: "Where do I find my current GPA?",
    a: "Your most recent transcript or your school's student portal will show it. For high school: usually under 'cumulative GPA'. For college: under 'overall GPA' or 'institutional GPA'.",
  },
  {
    q: "What if I don't know my exact credit count?",
    a: "Estimate. For high school, each year is roughly 6-8 classes × 1 credit. For college full-time semesters, 15-16 credits each. Close enough is fine — the projection is approximate either way.",
  },
  {
    q: "Can I use this to see what GPA I need to hit a target?",
    a: "Yes — adjust the new classes' grades up or down until the projected GPA matches your goal. That tells you what you need to earn this term.",
  },
];

export default function CurrentGpaPage() {
  return (
    <>
      <CalculatorSchema
        name="Current GPA Calculator"
        description="Use your current GPA plus new classes to project your overall GPA."
        url="https://bestgpacalculator.online/current-gpa-calculator"
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="Current GPA Calculator"
        description="Use your current GPA plus new classes to project your overall GPA."
        url="https://bestgpacalculator.online/current-gpa-calculator"
        datePublished="2026-04-22"
        dateModified="2026-05-06"
      />


      
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Current GPA", href: "/current-gpa-calculator" }]} />
      <Hero
        badge="Project ahead"
        title="Current GPA"
        highlight="Calculator"
        subtitle="Already know your current GPA? Enter it once with your credits, then add new classes to project your overall GPA. No need to re-enter past semesters."
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <CumulativeGPACalculator
          storageScope="current"
          semesterLabel="new classes"
        />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <ArticleMeta updated="2026-05-06" />
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Projecting your GPA forward
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Your current GPA + your in-progress classes determine your overall
            number at term end. The math is the same as cumulative GPA: prior
            quality points + new quality points, divided by total credits.
          </p>

          <DefinitionBlock
            term="Current GPA"
            definition="Your current GPA is a real-time estimate based on grades earned so far in the current term. It's useful mid-semester to project where you'll land before final grades are posted."
          />

          <KeyFacts
            items={[
              { label: "Scope", value: "Mid-term, not yet final" },
              { label: "Inputs", value: "Grades posted so far" },
              { label: "Use case", value: "Adjust study time, drop class decisions" },
              { label: "Differs from", value: "Final term GPA after exams posted" },
            ]}
          />

          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            The further along you are, the harder it gets to move your
            cumulative number. A 4.0 semester pushes a 3.0 cumulative (60
            credits) to only 3.20. Plan accordingly — early grades are
            disproportionately important.
          </p>

          <h3 className="mt-8 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Reverse the calculation
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Want to know what grades you need to hit a target GPA? Adjust the
            grades on the new classes up or down until the projected number
            matches your goal — that&apos;s your roadmap for the term.
          </p>
        
          <InlineCalcCta
            href="/gpa-goal-calculator"
            title="Aiming higher next term?"
            body="See what GPA you need next semester to hit a target with the GPA Goal Calculator."
          />

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Mid-term decisions: drop, withdraw, or grind
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            A live current GPA estimate makes mid-term choices clearer. If a
            single class is pulling your average from a 3.6 to a 3.2,
            dropping or withdrawing may protect your{" "}
            <Link href="/cumulative-gpa-calculator" className="font-medium text-blue-700 hover:underline">cumulative GPA</Link>{" "}
            — but check the registrar deadline and how the W shows on your
            transcript. Most schools allow withdrawal without GPA impact up
            to a published date. After that, the F counts as 0.0 quality
            points.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Estimating from in-progress assignment grades
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Most learning management systems (Canvas, Blackboard, Schoology,
            PowerSchool) show a current course percentage. Convert each course
            percentage to a letter grade using the{" "}
            <Link href="/percentage-to-gpa-calculator" className="font-medium text-blue-700 hover:underline">Percentage to GPA Converter</Link>,
            then enter those grades here for a live current-GPA estimate. Use
            the{" "}
            <Link href="/semester-gpa-calculator" className="font-medium text-blue-700 hover:underline">Semester GPA Calculator</Link>{" "}
            for a one-term snapshot once final grades post.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Estimate your current GPA before grades post
          </h3>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Your &quot;current&quot; GPA is the running average for the term
            you&apos;re in right now — useful weeks before the registrar
            finalizes anything. Pull your live percentage from each course&apos;s
            LMS gradebook (Canvas, Blackboard), convert it to a letter, and enter
            it above to see where you&apos;d land if grades closed today. That
            forecast is what tells you whether one more high-stakes final is worth
            the push, or whether a late withdrawal protects the number better.
            To roll this term into your overall record across all years, use the{" "}
            <Link href="/cumulative-gpa-calculator" className="font-medium text-blue-700 hover:underline">Cumulative GPA Calculator</Link>{" "}
            instead.
          </p>

          <InlineCalcCta
            href="/cumulative-gpa-calculator"
            title="Roll up multiple semesters?"
            body="The Cumulative GPA Calculator combines your prior GPA and current term in one view."
          />

          <Citation source="College Board" url="https://www.collegeboard.org/" detail="current academic standing" />
          <Citation source="U.S. Department of Education" url="https://www.ed.gov/" detail="federal academic standing requirements (SAP)" />
        </div>
      </article>
      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentHref="/current-gpa-calculator" />
    </>
  );
}
