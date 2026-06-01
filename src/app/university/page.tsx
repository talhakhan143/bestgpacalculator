import type { Metadata } from "next";
import Link from "next/link";
import { UNIS } from "@/lib/university-data";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Hero } from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: "University GPA Calculators: 50 Schools (Free + Their Scale)",
  description:
    "Free GPA calculators for 50 major US universities. UF, ASU, Purdue, UW Madison, UT Austin, NYU, and more. Each calibrated to the school's actual grading scale and admission GPA range.",
  alternates: { canonical: "/university" },
};

export default function UniHubPage() {
  const sorted = [...UNIS].sort((a, b) => b.searchVolume - a.searchVolume);
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "University calculators", href: "/university" }]} />
      <Hero
        badge="50 universities"
        title="University"
        highlight="GPA Calculators"
        subtitle="Free GPA calculators for 50 major US universities, each calibrated to the school's actual grading scale and admission GPA range. Pick your school."
      />
      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <div className="glass rounded-3xl p-7 sm:p-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((u) => (
              <Link
                key={u.slug}
                href={`/university/${u.slug}`}
                className="group block rounded-2xl bg-white p-5 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-blue-300 hover:shadow-[0_15px_30px_-12px_rgba(15,23,42,0.15)]"
              >
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold tracking-tight text-slate-900">{u.abbr}</div>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700">
                    {u.state}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-slate-700">{u.fullName}</p>
                <p className="mt-3 text-xs text-slate-500">
                  Admit GPA: <span className="font-semibold text-slate-700">{u.admitRange}</span>
                </p>
                <p className="mt-3 text-xs font-semibold text-blue-700 group-hover:underline">
                  Calculate {u.abbr} GPA →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
