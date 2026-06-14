import Link from "next/link";

interface CalcLink {
  href: string;
  title: string;
  blurb: string;
  badge?: string;
}

const ALL: CalcLink[] = [
  {
    href: "/weighted-gpa-calculator",
    title: "Weighted GPA",
    blurb: "5 weighting scales, AP/Honors/IB.",
    badge: "Popular",
  },
  {
    href: "/unweighted-gpa-calculator",
    title: "Unweighted GPA",
    blurb: "Pure 4.0 scale, no bonuses.",
  },
  {
    href: "/high-school-gpa-calculator",
    title: "High School GPA",
    blurb: "9th–12th grade tracker.",
  },
  {
    href: "/college-gpa-calculator",
    title: "College GPA",
    blurb: "4.0 scale with credit hours.",
  },
  {
    href: "/middle-school-gpa-calculator",
    title: "Middle School GPA",
    blurb: "6th–8th grade.",
  },
  {
    href: "/cumulative-gpa-calculator",
    title: "Cumulative GPA",
    blurb: "Multi-semester average.",
  },
  {
    href: "/semester-gpa-calculator",
    title: "Semester GPA",
    blurb: "Single-term snapshot.",
  },
  {
    href: "/current-gpa-calculator",
    title: "Current GPA",
    blurb: "Update mid-term grade.",
  },
  {
    href: "/ap-gpa-calculator",
    title: "AP GPA",
    blurb: "AP class +1.0 boost.",
  },
  {
    href: "/honors-gpa-calculator",
    title: "Honors GPA",
    blurb: "+0.5 honors bonus only.",
  },
  {
    href: "/percentage-to-gpa-calculator",
    title: "Percentage to GPA",
    blurb: "Convert % grades.",
  },
  {
    href: "/gpa-calculator-without-credits",
    title: "Without Credits",
    blurb: "Equal-weight average.",
  },
  {
    href: "/ap-score-to-gpa-calculator",
    title: "AP Score Predictor",
    blurb: "Exam score → college credit.",
    badge: "New",
  },
  {
    href: "/gpa-goal-calculator",
    title: "GPA Goal Reverse",
    blurb: "What you need next term.",
    badge: "New",
  },
  {
    href: "/ez-grader",
    title: "EZ Grader",
    blurb: "Teacher test-grade tool.",
    badge: "New",
  },
  {
    href: "/letter-grade-to-gpa-converter",
    title: "Letter → GPA",
    blurb: "A-F to 4.0 scale.",
    badge: "New",
  },
  {
    href: "/cgpa-to-percentage-calculator",
    title: "CGPA → %",
    blurb: "10-point Indian scale.",
    badge: "New",
  },
];

export function RelatedCalculators({
  currentHref,
  count = 4,
  heading = "Related calculators",
}: {
  currentHref?: string;
  count?: number;
  heading?: string;
}) {
  const others = ALL.filter((c) => c.href !== currentHref).slice(0, count);

  return (
    <section className="mx-auto mt-20 max-w-5xl px-4 sm:px-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {heading}
        </h2>
        <Link
          href="/weighted-gpa-calculator"
          className="hidden text-sm font-semibold text-blue-700 hover:underline sm:inline"
        >
          See all →
        </Link>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {others.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="glass group flex flex-col rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold tracking-tight text-slate-900">
                {c.title}
              </h3>
              {c.badge && (
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-700">
                  {c.badge}
                </span>
              )}
            </div>
            <p className="mt-1 flex-1 text-xs text-slate-600">{c.blurb}</p>
            <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-700">
              Open
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition group-hover:translate-x-0.5" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
