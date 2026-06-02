import type { Metadata } from "next";
import Link from "next/link";
import { WeightedGPACalculator } from "@/components/calculator/WeightedGPACalculator";
import { Hero } from "@/components/sections/Hero";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { ArticleSchema, CalculatorSchema, FaqSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";

export const metadata: Metadata = {
  title: "Law School GPA Calculator: LSAC CAS GPA (Free, 2026)",
  description:
    "Free law school GPA calculator using the LSAC CAS formula. Every grade you ever earned counts — including retakes. Calculate your CAS GPA on the standard 4.33 scale before submitting your application.",
  alternates: { canonical: "/law-school-gpa-calculator" },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is a law school GPA?",
    a: "When applying to law school, the GPA that matters is the LSAC CAS GPA — recalculated by the Law School Admission Council from all your undergraduate transcripts on a standard 4.33 scale. Every grade you ever earned counts, including failed retakes and dropped semesters.",
  },
  {
    q: "How does the LSAC CAS GPA differ from my school GPA?",
    a: "Three big differences: (1) LSAC uses a 4.33 scale where A+ = 4.33; many schools cap A+ at 4.0. (2) LSAC counts repeated courses both times — your school may have replaced the original grade, but LSAC averages both. (3) Pass/fail and W grades are normalized to LSAC's standard conventions.",
  },
  {
    q: "What GPA do you need for law school?",
    a: "Top-14 (T14) law schools: 3.7-3.9 CAS GPA paired with a 170+ LSAT. Top-50: 3.5+ CAS GPA. Mid-tier: 3.0-3.4 CAS GPA. The LSAT score and GPA work together — a higher LSAT can compensate for a lower CAS GPA at some schools.",
  },
  {
    q: "How can I calculate my LSAC GPA before applying?",
    a: "Use this calculator on the 4.33 scale (set Honors and AP weights to 0 — LSAC does NOT recognize AP credit). Enter every course you took including retakes. The result approximates what LSAC will compute. For the official number, you must submit transcripts to LSAC CAS.",
  },
  {
    q: "Does LSAC count grade replacement?",
    a: "No. LSAC counts both attempts when you retake a course. If you got a C the first time and an A the second time, both grades are included in the CAS GPA. This is different from most undergraduate institutions, where the retake typically replaces the original.",
  },
  {
    q: "What is the highest possible LSAC CAS GPA?",
    a: "4.33 on the LSAC scale. This requires straight A+ grades at a school that awards A+ grades (and reports them on the transcript). At schools where the highest grade is A (4.0), the LSAC ceiling for that transcript is 4.0.",
  },
];

export default function LawSchoolGpaCalculatorPage() {
  return (
    <>
      <CalculatorSchema
        name="Law School GPA Calculator (LSAC CAS GPA)"
        description="Free LSAC CAS GPA calculator using the 4.33 standardized scale. Calculate the GPA law schools actually see — every grade, including retakes."
        url="https://bestgpacalculator.online/law-school-gpa-calculator"
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline="Law School GPA Calculator (LSAC CAS GPA)"
        description="Free law school GPA calculator using the LSAC CAS formula on the 4.33 scale."
        url="https://bestgpacalculator.online/law-school-gpa-calculator"
        datePublished="2026-06-02"
        dateModified="2026-06-02"
      />

      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Law School GPA", href: "/law-school-gpa-calculator" }]} />

      <Hero
        badge="LSAC CAS GPA"
        title="Law School"
        highlight="GPA Calculator"
        subtitle="Calculate your LSAC CAS GPA — the standardized GPA on a 4.33 scale that every law school uses to evaluate your application. Every grade counts, including retakes."
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <WeightedGPACalculator />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            What is the LSAC CAS GPA?
          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            <strong className="text-slate-900">Quick answer:</strong> The LSAC CAS (Credential Assembly Service) GPA is a standardized GPA calculated by the Law School Admission Council from every undergraduate transcript you submit. It uses a 4.33 scale and counts every course you ever took — including failed grades and retakes. This is the GPA every US law school actually uses in admissions; your school&apos;s reported GPA is not.
          </p>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">
            The LSAC 4.33 grade scale
          </h3>
          <div className="not-prose mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.14em] text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Letter</th>
                  <th className="px-4 py-3 font-semibold">LSAC Points</th>
                  <th className="px-4 py-3 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 tabular">
                <tr className="border-t border-slate-100"><td className="px-4 py-2.5 font-bold">A+</td><td className="px-4 py-2.5">4.33</td><td className="px-4 py-2.5">Only counted if your school awards A+</td></tr>
                <tr className="border-t border-slate-100"><td className="px-4 py-2.5 font-bold">A</td><td className="px-4 py-2.5">4.00</td><td className="px-4 py-2.5"></td></tr>
                <tr className="border-t border-slate-100"><td className="px-4 py-2.5 font-bold">A−</td><td className="px-4 py-2.5">3.67</td><td className="px-4 py-2.5"></td></tr>
                <tr className="border-t border-slate-100"><td className="px-4 py-2.5 font-bold">B+</td><td className="px-4 py-2.5">3.33</td><td className="px-4 py-2.5"></td></tr>
                <tr className="border-t border-slate-100"><td className="px-4 py-2.5 font-bold">B</td><td className="px-4 py-2.5">3.00</td><td className="px-4 py-2.5"></td></tr>
                <tr className="border-t border-slate-100"><td className="px-4 py-2.5 font-bold">B−</td><td className="px-4 py-2.5">2.67</td><td className="px-4 py-2.5"></td></tr>
                <tr className="border-t border-slate-100"><td className="px-4 py-2.5 font-bold">C+</td><td className="px-4 py-2.5">2.33</td><td className="px-4 py-2.5"></td></tr>
                <tr className="border-t border-slate-100"><td className="px-4 py-2.5 font-bold">C</td><td className="px-4 py-2.5">2.00</td><td className="px-4 py-2.5"></td></tr>
                <tr className="border-t border-slate-100"><td className="px-4 py-2.5 font-bold">C−</td><td className="px-4 py-2.5">1.67</td><td className="px-4 py-2.5"></td></tr>
                <tr className="border-t border-slate-100"><td className="px-4 py-2.5 font-bold">D</td><td className="px-4 py-2.5">1.00</td><td className="px-4 py-2.5"></td></tr>
                <tr className="border-t border-slate-100"><td className="px-4 py-2.5 font-bold">F</td><td className="px-4 py-2.5">0.00</td><td className="px-4 py-2.5"></td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">
            How LSAC differs from your undergrad GPA
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700">
            <li>
              <strong className="text-slate-900">Retakes count both times.</strong> Most undergrad schools replace the original grade when you retake a course. LSAC averages both attempts into the CAS GPA. A C and a later A become 3.0 in your CAS — not 4.0.
            </li>
            <li>
              <strong className="text-slate-900">A+ = 4.33.</strong> If your school awards A+ as 4.0, LSAC will count those grades as 4.33. This can move your CAS GPA slightly above your school GPA.
            </li>
            <li>
              <strong className="text-slate-900">No AP credit.</strong> AP courses you tested out of are excluded. Only courses you took for a letter grade are counted.
            </li>
            <li>
              <strong className="text-slate-900">Pass/fail courses excluded from GPA.</strong> A &quot;P&quot; doesn&apos;t add to your CAS GPA. The course shows up but doesn&apos;t pull the average up or down.
            </li>
            <li>
              <strong className="text-slate-900">W (withdrawal) doesn&apos;t count.</strong> Withdrawals appear on your transcript but don&apos;t factor into the CAS GPA.
            </li>
            <li>
              <strong className="text-slate-900">Foreign or community college transcripts.</strong> Every transcript you ever earned credit on must be submitted. The CAS GPA aggregates all of them.
            </li>
          </ul>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">
            LSAC GPA by law school tier
          </h3>
          <div className="not-prose mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.14em] text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">School Tier</th>
                  <th className="px-4 py-3 font-semibold">25th-75th CAS GPA</th>
                  <th className="px-4 py-3 font-semibold">Typical LSAT</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-t border-slate-100"><td className="px-4 py-2.5 font-semibold">T14 (Yale, Harvard, Stanford, etc.)</td><td className="px-4 py-2.5 tabular">3.78 - 3.95</td><td className="px-4 py-2.5 tabular">170 - 174</td></tr>
                <tr className="border-t border-slate-100"><td className="px-4 py-2.5 font-semibold">Top 20 (Vanderbilt, USC, UCLA, etc.)</td><td className="px-4 py-2.5 tabular">3.65 - 3.85</td><td className="px-4 py-2.5 tabular">165 - 170</td></tr>
                <tr className="border-t border-slate-100"><td className="px-4 py-2.5 font-semibold">Top 50</td><td className="px-4 py-2.5 tabular">3.4 - 3.7</td><td className="px-4 py-2.5 tabular">158 - 165</td></tr>
                <tr className="border-t border-slate-100"><td className="px-4 py-2.5 font-semibold">Top 100</td><td className="px-4 py-2.5 tabular">3.1 - 3.5</td><td className="px-4 py-2.5 tabular">152 - 158</td></tr>
                <tr className="border-t border-slate-100"><td className="px-4 py-2.5 font-semibold">All other ABA-accredited</td><td className="px-4 py-2.5 tabular">2.8 - 3.3</td><td className="px-4 py-2.5 tabular">145 - 152</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">
            How to calculate your LSAC GPA with this tool
          </h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-slate-700">
            <li>Set the weighting preset to <strong>Standard 4.0</strong>. LSAC does NOT use weighted GPA — no AP or Honors bonus.</li>
            <li>Enter <strong>every course</strong> from every undergrad transcript. Including community college and study abroad.</li>
            <li>For retaken courses, enter <strong>both attempts</strong> as separate entries.</li>
            <li>Mark A+ grades as A+ if your school awards A+ (worth 4.33 in LSAC). Otherwise treat as A (4.0).</li>
            <li>Exclude pass/fail courses and withdrawals — they don&apos;t affect the CAS GPA.</li>
            <li>Read the cumulative GPA above. That&apos;s your approximate LSAC CAS GPA.</li>
          </ol>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">
            Tools for related applications
          </h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Applying to other professional schools? The same &quot;every grade counts including retakes&quot; principle applies to medical school applications via{" "}
            <Link href="/university/amcas" className="font-semibold text-blue-700 hover:underline">
              AMCAS GPA
            </Link>{" "}
            and to physician assistant programs via{" "}
            <Link href="/university/caspa" className="font-semibold text-blue-700 hover:underline">
              CASPA GPA
            </Link>
            . The{" "}
            <Link href="/cumulative-gpa-calculator" className="font-semibold text-blue-700 hover:underline">
              Cumulative GPA Calculator
            </Link>{" "}
            is also useful for tracking your live cumulative average semester by semester.
          </p>
        </div>
      </article>

      <Faq items={FAQ_ITEMS} />

      <RelatedCalculators currentHref="/law-school-gpa-calculator" />
    </>
  );
}
