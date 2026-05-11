import Link from "next/link";

export function Hero({
  badge,
  title,
  highlight,
  subtitle,
  primary,
  secondary,
}: {
  badge?: string;
  title: string;
  highlight: string;
  subtitle: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div className="text-left">
          {badge && (
            <div className="fade-up mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-700 shadow-sm ring-1 ring-blue-100">
              <span className="relative grid h-2 w-2 place-items-center">
                <span className="absolute h-2 w-2 animate-ping rounded-full bg-blue-500/70" />
                <span className="relative h-2 w-2 rounded-full bg-blue-600" />
              </span>
              {badge}
            </div>
          )}

          <h1 className="fade-up text-balance text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {title}{" "}
            <span className="gradient-text">{highlight}</span>
          </h1>

          <p className="fade-up mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
            {subtitle}
          </p>

          {(primary || secondary) && (
            <div className="fade-up mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              {primary && (
                <Link href={primary.href} className="btn-primary">
                  {primary.label}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
              {secondary && (
                <Link href={secondary.href} className="btn-glass">
                  {secondary.label}
                </Link>
              )}
            </div>
          )}

          <div className="fade-up mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-500">
            <TrustItem>No signup</TrustItem>
            <TrustItem>Mobile-first</TrustItem>
            <TrustItem>5 weighting scales</TrustItem>
          </div>
        </div>

        {/* Visual */}
        <div className="relative mx-auto h-[360px] w-full max-w-md sm:h-[440px] lg:h-[480px]">
          {/* Big sun-circle accent behind */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-200 via-amber-100 to-rose-100 sm:h-[380px] sm:w-[380px] lg:h-[420px] lg:w-[420px]"
          />
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-amber-300/60 to-orange-200/40 blur-2xl sm:h-[340px] sm:w-[340px]"
          />

          {/* Mock calculator card centered */}
          <div className="absolute left-1/2 top-1/2 w-72 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-5 shadow-[0_30px_60px_-20px_rgba(15,23,42,0.25)] ring-1 ring-slate-900/5 sm:w-80">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Your weighted GPA
              </span>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-blue-50 text-blue-600">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
              </span>
            </div>
            <div className="tabular mt-2 text-5xl font-bold tracking-tight text-slate-900">
              4.42
            </div>
            <div className="mt-1 text-xs text-slate-500">Unweighted: <span className="tabular font-semibold text-slate-700">3.86</span></div>

            <div className="mt-4 space-y-2">
              <Row name="AP Calculus BC" grade="A" badge="AP" badgeClass="bg-fuchsia-100 text-fuchsia-700" />
              <Row name="Honors English" grade="A-" badge="HON" badgeClass="bg-amber-100 text-amber-700" />
              <Row name="Chemistry" grade="B+" badge="REG" badgeClass="bg-slate-100 text-slate-600" />
            </div>
          </div>

          {/* Floating chips */}
          <div className="float-slow absolute right-0 top-6 sm:right-2">
            <div className="chip-float">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
              </span>
              Live Update
            </div>
          </div>

          <div className="float-fast absolute bottom-10 left-0 sm:left-2">
            <div className="chip-float">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-rose-100 text-rose-600">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              Match your school
            </div>
          </div>

          <div className="float-slow absolute right-2 bottom-2 sm:right-6">
            <div className="chip-float">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-blue-100 text-blue-700">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </span>
              5 scales built-in
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustItem({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500" aria-hidden="true">
        <path d="M20 6L9 17l-5-5" />
      </svg>
      {children}
    </span>
  );
}

function Row({
  name,
  grade,
  badge,
  badgeClass,
}: {
  name: string;
  grade: string;
  badge: string;
  badgeClass: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs">
      <div className="flex items-center gap-2 truncate">
        <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wide ${badgeClass}`}>{badge}</span>
        <span className="truncate font-medium text-slate-700">{name}</span>
      </div>
      <span className="tabular font-bold text-slate-900">{grade}</span>
    </div>
  );
}
