import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { UNIS, getUni } from "@/lib/university-data";
import { WeightedGPACalculator } from "@/components/calculator/WeightedGPACalculator";
import { Hero } from "@/components/sections/Hero";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { ArticleSchema, CalculatorSchema, FaqSchema } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";

export async function generateStaticParams() {
  return UNIS.map((u) => ({ uni: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uni: string }>;
}): Promise<Metadata> {
  const { uni } = await params;
  const data = getUni(uni);
  if (!data) return {};
  return {
    title: `${data.abbr} GPA Calculator: Free + ${data.shortName} Grading Scale`,
    description: `Free ${data.fullName} GPA calculator. ${data.scaleNote} Calculate your ${data.abbr} GPA in 10 seconds with credit-weighted scoring. No signup, mobile-first.`,
    alternates: { canonical: `/university/${data.slug}` },
    robots: data.indexed ? undefined : { index: false, follow: true },
  };
}

export default async function UniGpaCalculatorPage({
  params,
}: {
  params: Promise<{ uni: string }>;
}) {
  const { uni } = await params;
  const data = getUni(uni);
  if (!data) notFound();

  const url = `https://bestgpacalculator.online/university/${data.slug}`;
  const title = `${data.abbr} GPA Calculator`;

  const FAQ_ITEMS: FaqItem[] = [
    {
      q: `What GPA do you need to get into ${data.shortName}?`,
      a: `${data.fullName} admits students with a typical GPA range of ${data.admitRange}. ${data.weightingPolicy}`,
    },
    {
      q: `What GPA scale does ${data.shortName} use?`,
      a: data.scaleNote,
    },
    {
      q: `How do I stay in good academic standing at ${data.shortName}?`,
      a: `${data.fullName} requires a minimum GPA of ${data.goodStandingGpa} to remain in good academic standing. Falling below typically triggers academic probation.`,
    },
    {
      q: `What GPA do I need for honors at ${data.shortName}?`,
      a: `${data.honorsGpa} at ${data.fullName}. Exact thresholds for honors program admission may differ.`,
    },
    {
      q: `Does ${data.abbr} recalculate GPA for admission?`,
      a: data.weightingPolicy,
    },
  ];

  return (
    <>
      <CalculatorSchema
        name={`${data.abbr} GPA Calculator`}
        description={`Free GPA calculator for ${data.fullName} students. Standard 4.0 scale, credit-weighted, mobile-first, no signup.`}
        url={url}
      />
      <FaqSchema items={FAQ_ITEMS} />
      <ArticleSchema
        headline={title}
        description={`Free GPA calculator for ${data.fullName} students with credit-weighted scoring on the 4.0 scale.`}
        url={url}
        datePublished="2026-06-01"
        dateModified="2026-06-01"
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "University calculators", href: "/university" },
          { name: data.abbr, href: `/university/${data.slug}` },
        ]}
      />

      <Hero
        badge={data.fullName}
        title={`${data.abbr}`}
        highlight="GPA Calculator"
        subtitle={
          data.intro
            ? data.intro
            : `Free GPA calculator for ${data.fullName} students. ${data.scaleNote} Add your classes, get your ${data.abbr} GPA in 10 seconds.`
        }
      />

      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <WeightedGPACalculator />
      </section>

      <article className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {data.abbr} GPA scale and grading policy
          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-700">
            <strong className="text-slate-900">Quick answer:</strong> {data.fullName} uses the {data.scaleNote.toLowerCase().replace(/\.$/, "")}. {data.weightingPolicy}
          </p>

          <div className="not-prose mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.14em] text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Metric</th>
                  <th className="px-4 py-3 font-semibold">{data.abbr} Standard</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-3 font-semibold">Typical admit GPA</td>
                  <td className="px-4 py-3">{data.admitRange}</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-3 font-semibold">Good standing minimum</td>
                  <td className="px-4 py-3">{data.goodStandingGpa}</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-3 font-semibold">Dean&apos;s List threshold</td>
                  <td className="px-4 py-3">{data.honorsGpa}</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-3 font-semibold">Scale type</td>
                  <td className="px-4 py-3">{data.scaleNote}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">
            How {data.shortName} recalculates GPA for admission
          </h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            {data.weightingPolicy} The number you submit on your transcript and the number {data.abbr} uses in its admission decision may differ. Use the calculator above to model both — switch the preset to match {data.shortName}&apos;s policy.
          </p>

          {data.localStat ? (
            <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                {data.localStat.label}
              </div>
              <div className="mt-1 text-2xl font-bold tracking-tight text-emerald-900">
                {data.localStat.value}
              </div>
              <div className="mt-2 text-xs text-emerald-800/80">
                Source: {data.localStat.source}
              </div>
            </div>
          ) : null}

          <h3 className="mt-10 text-xl font-bold tracking-tight text-slate-900">
            Maintaining a good {data.abbr} GPA
          </h3>
          {data.uniqueTips && data.uniqueTips.length > 0 ? (
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700">
              {data.uniqueTips.map((tip, i) => (
                <li
                  key={i}
                  dangerouslySetInnerHTML={{ __html: tip }}
                />
              ))}
            </ul>
          ) : (
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700">
              <li>
                <strong className="text-slate-900">Track cumulative GPA, not just semester GPA.</strong> {data.fullName} reports both. Most academic warnings trigger on the cumulative number.
              </li>
              <li>
                <strong className="text-slate-900">Use the credit-weighted scoring above.</strong> A 4-credit course&apos;s grade affects your GPA 33% more than a 3-credit course&apos;s grade.
              </li>
              <li>
                <strong className="text-slate-900">Plan for honors.</strong> {data.honorsGpa}. Use the{" "}
                <Link href="/gpa-goal-calculator" className="font-semibold text-blue-700 hover:underline">
                  GPA Goal Calculator
                </Link>{" "}
                to see what grade average you need next semester to qualify.
              </li>
              <li>
                <strong className="text-slate-900">Check the grade replacement policy.</strong> {data.shortName}, like most universities, has a grade-replacement policy for retaken courses. Removing a low grade from the cumulative is the single biggest GPA lift.
              </li>
            </ul>
          )}

          {data.sourceUrl ? (
            <p className="mt-6 text-xs text-slate-500">
              Admit-range and policy data verified against{" "}
              <a
                href={data.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-700 underline decoration-slate-300 hover:text-slate-900"
              >
                {data.shortName}&apos;s official admissions page
              </a>
              .
            </p>
          ) : null}
        </div>
      </article>

      <Faq items={FAQ_ITEMS} />

      <section className="mx-auto mt-10 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-7 sm:p-9">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Other university GPA calculators</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {UNIS.filter((u) => u.slug !== data.slug)
              .sort((a, b) => b.searchVolume - a.searchVolume)
              .slice(0, 30)
              .map((u) => (
                <Link
                  key={u.slug}
                  href={`/university/${u.slug}`}
                  className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200 transition hover:bg-blue-50 hover:text-blue-700 hover:ring-blue-200"
                >
                  {u.abbr}
                </Link>
              ))}
            <Link
              href="/university"
              className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 ring-1 ring-blue-200 transition hover:bg-blue-100"
            >
              See all →
            </Link>
          </div>
        </div>
      </section>

      <RelatedCalculators currentHref="/college-gpa-calculator" />
    </>
  );
}
