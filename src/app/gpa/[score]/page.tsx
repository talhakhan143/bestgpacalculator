import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GPA_SCORE_DATA, getGpaScoreData } from "@/lib/gpa-score-data";
import { Faq } from "@/components/sections/Faq";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArticleSchema, FaqSchema } from "@/components/seo/JsonLd";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";

export const dynamicParams = false;

// Only pre-render indexable score pages. Thin/un-enriched scores are removed
// from the site (404) to shrink the programmatic footprint that the May 2026
// core update penalized as scaled content.
export async function generateStaticParams() {
  return GPA_SCORE_DATA.filter((d) => d.indexed).map((d) => ({ score: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ score: string }>;
}): Promise<Metadata> {
  const { score } = await params;
  const data = getGpaScoreData(score);
  if (!data) return {};
  const isGoodHint =
    data.isGood === "yes" || data.isGood === "good"
      ? "Yes — Here's Why"
      : data.isGood === "average"
        ? "Honest Breakdown"
        : "What You Can Do";
  return {
    title: `Is a ${data.value} GPA Good? ${isGoodHint} (${new Date().getFullYear() + 1})`,
    description: `${data.verdict} See letter-grade equivalent, percentile, college options, and how to improve. Free GPA calculator included.`,
    alternates: { canonical: `/gpa/${data.slug}` },
    robots: data.indexed ? undefined : { index: false, follow: true },
  };
}

export default async function GpaScorePage({
  params,
}: {
  params: Promise<{ score: string }>;
}) {
  const { score } = await params;
  const data = getGpaScoreData(score);
  if (!data || !data.indexed) notFound();

  const url = `https://bestgpacalculator.online/gpa/${data.slug}`;
  const title = `Is a ${data.value} GPA Good?`;

  const verdictBadge =
    data.isGood === "yes"
      ? { label: "Excellent", color: "bg-emerald-100 text-emerald-700 ring-emerald-200" }
      : data.isGood === "good"
        ? { label: "Good", color: "bg-blue-100 text-blue-700 ring-blue-200" }
        : data.isGood === "average"
          ? { label: "Average", color: "bg-amber-100 text-amber-700 ring-amber-200" }
          : data.isGood === "low"
            ? { label: "Below Average", color: "bg-orange-100 text-orange-700 ring-orange-200" }
            : { label: "Needs Recovery", color: "bg-rose-100 text-rose-700 ring-rose-200" };

  // Pick relevant calculator CTAs by GPA tier
  const recoveryFocus = data.numeric < 3.0;
  const ctaHref = recoveryFocus ? "/gpa-goal-calculator" : "/cumulative-gpa-calculator";
  const ctaLabel = recoveryFocus
    ? "GPA Goal Calculator — see what you need next semester"
    : "Cumulative GPA Calculator — track your overall average";

  return (
    <>
      <FaqSchema items={data.faqs} />
      <ArticleSchema
        headline={title}
        description={data.verdict}
        url={url}
        datePublished="2026-06-01"
        dateModified="2026-06-01"
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "GPA Scores", href: "/gpa" },
          { name: `${data.value} GPA`, href: `/gpa/${data.slug}` },
        ]}
      />

      <section className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 sm:pt-12">
        <div className="fade-up">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${verdictBadge.color}`}
          >
            {verdictBadge.label}
          </span>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Is a <span className="gradient-text">{data.value} GPA</span> good?
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-slate-700 sm:text-lg">
            <strong className="text-slate-900">Quick answer:</strong> {data.verdict}
          </p>
        </div>

        <div className="glass mt-8 rounded-3xl p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat label="Letter grade" value={data.letter} />
            <Stat label="Percentage" value={data.percentage} />
            <Stat label="Percentile" value={data.percentile.replace("of US high schoolers", "").trim()} />
          </div>
        </div>

        <article className="prose-custom mt-10">
          <p className="text-base leading-relaxed text-slate-700">
            {data.intro ?? data.verdictLong}
          </p>
          {data.realWorldExample ? (
            <blockquote className="mt-6 border-l-4 border-blue-200 bg-blue-50/60 py-3 pl-4 pr-3 text-base italic leading-relaxed text-slate-700">
              {data.realWorldExample}
            </blockquote>
          ) : null}
        </article>
      </section>

      <section className="mx-auto mt-12 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-7 sm:p-9">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            What a {data.value} GPA means for college admissions
          </h2>

          <dl className="mt-5 space-y-4">
            <Definition term="College tier accessible" def={data.collegeTier} />
            <Definition term="Ivy League chance" def={data.ivyChance} />
            <Definition term="State flagship chance" def={data.stateFlagshipChance} />
            <Definition term="Merit scholarship impact" def={data.scholarshipImpact} />
          </dl>

          <h3 className="mt-8 text-xl font-bold tracking-tight text-slate-900">
            How a {data.value} GPA compares to peers
          </h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            A {data.value} GPA puts you in the {data.percentile.replace("of US high schoolers", "").trim().toLowerCase()} of US high schoolers based on NCES grade-distribution data. On the standard 4.0 unweighted scale, it equals a {data.letter} letter grade ({data.percentage}).
          </p>

          <h3 className="mt-8 text-xl font-bold tracking-tight text-slate-900">
            {recoveryFocus
              ? `How to raise a ${data.value} GPA`
              : `How to keep (or improve) a ${data.value} GPA`}
          </h3>
          {data.uniqueTips && data.uniqueTips.length > 0 ? (
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700">
              {data.uniqueTips.map((tip, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: tip }} />
              ))}
            </ul>
          ) : (
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700">
            {recoveryFocus ? (
              <>
                <li>
                  <strong className="text-slate-900">Use grade replacement.</strong> If your school allows retake-with-replacement, that single policy is the fastest GPA lift available — the old grade is removed from the cumulative average.
                </li>
                <li>
                  <strong className="text-slate-900">Front-load A-likely classes next semester.</strong> Counterintuitively, scheduling a heavier credit load of courses you can confidently A in moves your GPA more than a lighter schedule.
                </li>
                <li>
                  <strong className="text-slate-900">Run the math first.</strong> Some GPA targets are mathematically impossible given remaining credits. The{" "}
                  <Link href="/gpa-goal-calculator" className="font-semibold text-blue-700 hover:underline">
                    GPA Goal Calculator
                  </Link>{" "}
                  tells you the average grade you need across remaining classes to reach any target.
                </li>
                <li>
                  <strong className="text-slate-900">Stop the bleeding first.</strong> Earn no more D's or F's. One failed course can wipe out three semesters of progress.
                </li>
              </>
            ) : (
              <>
                <li>
                  <strong className="text-slate-900">Add academic rigor.</strong> One AP or Honors course per semester signals ambition to admissions readers without overloading your schedule.
                </li>
                <li>
                  <strong className="text-slate-900">Maintain consistency.</strong> Selective colleges weight an upward or flat trend more than a single high-GPA year followed by decline.
                </li>
                <li>
                  <strong className="text-slate-900">Track cumulative live.</strong> The{" "}
                  <Link href="/cumulative-gpa-calculator" className="font-semibold text-blue-700 hover:underline">
                    Cumulative GPA Calculator
                  </Link>{" "}
                  lets you enter grades semester by semester to see your real overall number without waiting for the transcript.
                </li>
                <li>
                  <strong className="text-slate-900">Use the weighted scale to your advantage.</strong> AP and IB courses can push your weighted GPA above 4.0 — see the{" "}
                  <Link href="/weighted-gpa-calculator" className="font-semibold text-blue-700 hover:underline">
                    Weighted GPA Calculator
                  </Link>
                  .
                </li>
              </>
            )}
          </ul>
          )}

          {data.sourceUrl ? (
            <p className="mt-6 text-xs text-slate-500">
              GPA distribution data verified against{" "}
              <a
                href={data.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-700 underline decoration-slate-300 hover:text-slate-900"
              >
                primary source
              </a>
              .
            </p>
          ) : null}

          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-100 text-blue-700">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">Try it now</p>
                <p className="mt-1 text-sm text-slate-700">
                  <Link href={ctaHref} className="font-semibold text-blue-700 hover:underline">
                    {ctaLabel}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Faq items={data.faqs} />

      <section className="mx-auto mt-10 max-w-3xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-7 sm:p-9">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Other GPA scores</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {GPA_SCORE_DATA.filter((d) => d.indexed && d.slug !== data.slug)
              .sort((a, b) => a.numeric - b.numeric)
              .map((d) => (
                <Link
                  key={d.slug}
                  href={`/gpa/${d.slug}`}
                  className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200 transition hover:bg-blue-50 hover:text-blue-700 hover:ring-blue-200"
                >
                  {d.value} GPA
                </Link>
              ))}
          </div>
        </div>
      </section>

      <RelatedCalculators currentHref={ctaHref} />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-slate-200">
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-xl font-bold tracking-tight text-slate-900">{value}</div>
    </div>
  );
}

function Definition({ term, def }: { term: string; def: string }) {
  return (
    <div>
      <dt className="text-sm font-semibold text-slate-900">{term}</dt>
      <dd className="mt-0.5 text-base leading-relaxed text-slate-700">{def}</dd>
    </div>
  );
}
