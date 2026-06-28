import type { Metadata } from "next";
import Link from "next/link";
import { GPA_SCORE_DATA } from "@/lib/gpa-score-data";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Hero } from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: "GPA Scores: Is Your GPA Good? (Every Value 1.0-4.5)",
  description:
    "Detailed breakdowns of every GPA value from 1.0 to 4.5 — letter grade equivalent, percentile, college tier, and how to improve. Pick your score below.",
  alternates: { canonical: "/gpa" },
};

export default function GpaHubPage() {
  const sorted = GPA_SCORE_DATA.filter((d) => d.indexed).sort(
    (a, b) => b.numeric - a.numeric,
  );
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "GPA Scores", href: "/gpa" }]} />
      <Hero
        badge="GPA reference"
        title="Is your"
        highlight="GPA good?"
        subtitle="Detailed breakdown of every GPA value — letter grade, percentile, college options, and how to improve. Pick your score below."
      />
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <div className="glass rounded-3xl p-7 sm:p-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((d) => (
              <Link
                key={d.slug}
                href={`/gpa/${d.slug}`}
                className="group block rounded-2xl bg-white p-5 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-blue-300 hover:shadow-[0_15px_30px_-12px_rgba(15,23,42,0.15)]"
              >
                <div className="flex items-center justify-between">
                  <div className="tabular text-3xl font-bold tracking-tight text-slate-900">
                    {d.value}
                  </div>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700">
                    {d.letter}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 line-clamp-3">
                  {d.verdict}
                </p>
                <p className="mt-3 text-xs font-semibold text-blue-700 group-hover:underline">
                  Is a {d.value} GPA good? →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
