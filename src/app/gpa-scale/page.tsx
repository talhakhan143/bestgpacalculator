import type { Metadata } from "next";
import Link from "next/link";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { ArticleSchema, FaqSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Hero } from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: "GPA Scale: 4.0, Weighted 5.0, Letter Grade + % (2026)",
  description:
    "The complete GPA scale — 4.0 unweighted, 4.5/5.0 weighted, letter grade equivalents, and percentage conversions. Includes scale reporting, plus/minus rules, and college recalculation.",
  alternates: { canonical: "/gpa-scale" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is the GPA scale?",
    a: "The GPA scale converts letter grades to numeric values. The standard US scale runs 0.0 to 4.0, where A=4.0, B=3.0, C=2.0, D=1.0, F=0.0. Weighted scales add bonus points for AP/Honors/IB courses, lifting the maximum to 4.5 or 5.0.",
  },
  {
    q: "What is GPA scale reporting?",
    a: "GPA scale reporting refers to how schools disclose which scale they use — 4.0 unweighted, weighted with AP bonus, weighted with Honors-only bonus, or a custom scale. Colleges request this when reviewing transcripts so they can normalize across schools. Look for the 'scale' or 'scale reporting' field on your high school transcript.",
  },
  {
    q: "What is the 4.0 GPA scale?",
    a: "The 4.0 GPA scale is the standard US unweighted grading scale. A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, D- = 0.7, F = 0.0. It's the basis for nearly all US high school and college GPAs.",
  },
  {
    q: "What does GPA scale reporting mean?",
    a: "It means specifying which GPA scale the number was calculated on — most commonly 4.0 unweighted, 4.5 weighted (Honors-only bonus), 5.0 weighted (AP/IB bonus), or a 100-point scale. Colleges use this context to recalculate your GPA on their own internal scale.",
  },
  {
    q: "How do colleges recalculate GPA?",
    a: "Selective colleges often recalculate your GPA using only core academic courses (English, math, science, social studies, foreign language), strip out non-academic electives, and convert your school's scale to their own 4.0 baseline. UF and the UC system, for example, recalculate every applicant's GPA to apply consistently across schools.",
  },
  {
    q: "What is the highest possible GPA?",
    a: "The standard unweighted maximum is 4.0. With a standard +1.0 AP bonus, the weighted maximum is 5.0. Some schools' scales allow even higher (5.5 or 6.0) depending on how they weight Honors, AP, and dual-enrollment courses.",
  },
];

export default function GpaScalePage() {
  return (
    <>
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="GPA Scale: Complete Reference"
        description="Complete reference for the US GPA scale — 4.0 unweighted, weighted scales, letter grade equivalents, and percentage conversions."
        url="https://bestgpacalculator.online/gpa-scale"
        datePublished="2026-06-01"
        dateModified="2026-06-01"
      />

      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "GPA Scale", href: "/gpa-scale" }]} />

      <Hero
        badge="Reference"
        title="The GPA"
        highlight="Scale"
        subtitle="The complete US GPA scale — 4.0 unweighted, weighted to 5.0+, letter grade equivalents, percentage conversions, and what colleges actually use when they recalculate."
      />

      <article className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <div className="glass rounded-3xl p-7 sm:p-10">
          <p className="text-base leading-relaxed text-slate-700">
            <strong className="text-slate-900">Quick answer:</strong> The standard US GPA scale runs 0.0 to 4.0 — A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0. Weighted scales add bonus points for AP, Honors, and IB classes, lifting the maximum to 4.5 or 5.0. Almost every US high school uses the 4.0 unweighted scale as the baseline; the weighted version varies by district.
          </p>

          <h2 className="mt-10 text-3xl font-bold tracking-tight text-slate-900">
            The 4.0 GPA scale (unweighted)
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            The unweighted 4.0 scale is the US baseline used by nearly all high schools and colleges. It maps letter grades to grade points with +/− adjustments.
          </p>

          <div className="not-prose mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.14em] text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Letter Grade</th>
                  <th className="px-4 py-3 font-semibold">GPA Points</th>
                  <th className="px-4 py-3 font-semibold">Percentage</th>
                  <th className="px-4 py-3 font-semibold">Meaning</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 tabular">
                <tr className="border-t border-slate-100 bg-emerald-50/40">
                  <td className="px-4 py-2.5 font-bold">A+</td><td className="px-4 py-2.5">4.0</td><td className="px-4 py-2.5">97-100%</td><td className="px-4 py-2.5">Exceptional</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2.5 font-bold">A</td><td className="px-4 py-2.5">4.0</td><td className="px-4 py-2.5">93-96%</td><td className="px-4 py-2.5">Excellent</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2.5 font-bold">A−</td><td className="px-4 py-2.5">3.7</td><td className="px-4 py-2.5">90-92%</td><td className="px-4 py-2.5">Very Good</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2.5 font-bold">B+</td><td className="px-4 py-2.5">3.3</td><td className="px-4 py-2.5">87-89%</td><td className="px-4 py-2.5">Above Average</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2.5 font-bold">B</td><td className="px-4 py-2.5">3.0</td><td className="px-4 py-2.5">83-86%</td><td className="px-4 py-2.5">Good</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2.5 font-bold">B−</td><td className="px-4 py-2.5">2.7</td><td className="px-4 py-2.5">80-82%</td><td className="px-4 py-2.5">Above Average</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2.5 font-bold">C+</td><td className="px-4 py-2.5">2.3</td><td className="px-4 py-2.5">77-79%</td><td className="px-4 py-2.5">Acceptable</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2.5 font-bold">C</td><td className="px-4 py-2.5">2.0</td><td className="px-4 py-2.5">73-76%</td><td className="px-4 py-2.5">Average</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2.5 font-bold">C−</td><td className="px-4 py-2.5">1.7</td><td className="px-4 py-2.5">70-72%</td><td className="px-4 py-2.5">Below Average</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2.5 font-bold">D+</td><td className="px-4 py-2.5">1.3</td><td className="px-4 py-2.5">67-69%</td><td className="px-4 py-2.5">Poor</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2.5 font-bold">D</td><td className="px-4 py-2.5">1.0</td><td className="px-4 py-2.5">65-66%</td><td className="px-4 py-2.5">Poor</td>
                </tr>
                <tr className="border-t border-slate-100 bg-rose-50/40">
                  <td className="px-4 py-2.5 font-bold">F</td><td className="px-4 py-2.5">0.0</td><td className="px-4 py-2.5">Below 65%</td><td className="px-4 py-2.5">Failing</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="mt-12 text-3xl font-bold tracking-tight text-slate-900">
            The weighted GPA scale (5.0 max)
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Weighted scales reward course rigor by adding bonus points for harder classes. The standard weighting in US public high schools adds +0.5 to Honors classes and +1.0 to AP, IB, and dual-enrollment classes.
          </p>

          <div className="not-prose mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.14em] text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Letter</th>
                  <th className="px-4 py-3 font-semibold">Regular</th>
                  <th className="px-4 py-3 font-semibold">Honors (+0.5)</th>
                  <th className="px-4 py-3 font-semibold">AP / IB (+1.0)</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 tabular">
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2.5 font-bold">A</td><td className="px-4 py-2.5">4.0</td><td className="px-4 py-2.5">4.5</td><td className="px-4 py-2.5">5.0</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2.5 font-bold">B</td><td className="px-4 py-2.5">3.0</td><td className="px-4 py-2.5">3.5</td><td className="px-4 py-2.5">4.0</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2.5 font-bold">C</td><td className="px-4 py-2.5">2.0</td><td className="px-4 py-2.5">2.5</td><td className="px-4 py-2.5">3.0</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2.5 font-bold">D</td><td className="px-4 py-2.5">1.0</td><td className="px-4 py-2.5">1.5</td><td className="px-4 py-2.5">2.0</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-2.5 font-bold">F</td><td className="px-4 py-2.5">0.0</td><td className="px-4 py-2.5">0.0</td><td className="px-4 py-2.5">0.0</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Use the{" "}
            <Link href="/weighted-gpa-calculator" className="font-semibold text-blue-700 hover:underline">
              Weighted GPA Calculator
            </Link>{" "}
            to compute weighted scores under any of five common weighting policies. The default is the standard +0.5 Honors / +1.0 AP scale shown above.
          </p>

          <h2 className="mt-12 text-3xl font-bold tracking-tight text-slate-900">
            GPA scale reporting — what colleges actually see
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            <strong className="text-slate-900">Scale reporting</strong> is the field on your transcript that tells admissions readers which scale your GPA is on. Common values include:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700">
            <li><strong className="text-slate-900">4.0 unweighted</strong> — pure 4.0-max scale, no course-rigor bonus.</li>
            <li><strong className="text-slate-900">4.5 weighted</strong> — Honors classes get +0.5, AP/IB do not get a bonus.</li>
            <li><strong className="text-slate-900">5.0 weighted</strong> — Honors +0.5, AP/IB +1.0 (most common US scheme).</li>
            <li><strong className="text-slate-900">6.0 weighted</strong> — Rare; only some districts give Honors +1.0 and AP +2.0.</li>
            <li><strong className="text-slate-900">100-point scale</strong> — Schools using 0-100 numeric grades report scale=100. Colleges then convert.</li>
          </ul>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Selective colleges, especially the University of California system and most flagship state universities, <strong>recalculate</strong> every applicant&apos;s GPA on their internal scale so they can compare fairly across schools. UF, FSU, USF, and FIU recalculate using core academic courses with a standard +0.5/+1.0 weighting policy. The UC system uses its own capped weighted scale.
          </p>

          <h2 className="mt-12 text-3xl font-bold tracking-tight text-slate-900">
            Plus / minus on the GPA scale
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Not every school uses +/− grades. Schools that do, follow the unweighted 0.3 increments shown above (A− = 3.7, B+ = 3.3, etc.). Some schools skip +/− for A (treating A+ and A− both as 4.0) but use them for B-D. A few schools award A+ as 4.3 — usually on the college level, rarely in high school.
          </p>

          <h2 className="mt-12 text-3xl font-bold tracking-tight text-slate-900">
            Convert GPA to percentage (and back)
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Quick approximation: <strong className="text-slate-900">percentage ≈ (GPA × 20) + 20</strong>. So a 3.0 GPA ≈ 80%, a 3.5 ≈ 90%, a 4.0 ≈ 95-100%. For the exact conversion (which depends on your school&apos;s grading bands), use the{" "}
            <Link href="/percentage-to-gpa-calculator" className="font-semibold text-blue-700 hover:underline">
              Percentage to GPA Calculator
            </Link>
            .
          </p>

          <h2 className="mt-12 text-3xl font-bold tracking-tight text-slate-900">
            Other scales you may encounter
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700">
            <li><strong className="text-slate-900">UK first-class / 2:1 / 2:2</strong> — UK universities use degree classifications rather than GPA. A First (70%+) ≈ 4.0, a 2:1 (60-69%) ≈ 3.3-3.7.</li>
            <li><strong className="text-slate-900">German 1.0-5.0 (inverted)</strong> — German universities use 1.0 as best and 5.0 as failing — the opposite of US GPA.</li>
            <li><strong className="text-slate-900">CGPA on 10-point scale</strong> — Indian universities often use a 10-point CGPA. Conversion: CGPA × 0.4 ≈ US GPA on 4.0.</li>
            <li><strong className="text-slate-900">Canadian 4.0 / percentage</strong> — Canadian universities use 4.0 scale similar to the US, but a few (McGill, Toronto) use 4.0 with slightly different letter cutoffs.</li>
          </ul>
        </div>
      </article>

      <Faq items={FAQ_ITEMS} />
    </>
  );
}
