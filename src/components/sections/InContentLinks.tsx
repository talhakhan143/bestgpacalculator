import Link from "next/link";

interface CtaBlock {
  href: string;
  title: string;
  body: string;
}

export function InlineCalcCta({ href, title, body }: CtaBlock) {
  return (
    <Link
      href={href}
      className="not-prose group my-6 flex items-center gap-4 rounded-2xl bg-blue-50 p-4 ring-1 ring-blue-100 transition hover:bg-blue-100 hover:ring-blue-200"
    >
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-600 text-white">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 10h8M8 14h8M8 18h4" />
        </svg>
      </div>
      <div className="flex-1">
        <div className="text-sm font-bold text-slate-900">{title}</div>
        <div className="text-xs text-slate-600">{body}</div>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-blue-600 transition group-hover:translate-x-0.5" aria-hidden="true">
        <path d="M5 12h14M13 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

export function DefinitionBlock({
  term,
  definition,
}: {
  term: string;
  definition: string;
}) {
  return (
    <div className="not-prose my-6 rounded-2xl border-l-4 border-blue-600 bg-slate-50 p-5">
      <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-700">
        Definition
      </div>
      <div className="mt-1 text-base font-bold text-slate-900">{term}</div>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{definition}</p>
    </div>
  );
}

export function KeyFacts({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="not-prose my-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
      {items.map((it) => (
        <div key={it.label}>
          <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
            {it.label}
          </dt>
          <dd className="mt-1 text-sm font-semibold text-slate-900">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ArticleMeta({
  updated,
  reviewer = "BestGPACalculator Editorial Team",
  methodologyHref = "/how-to-calculate-gpa",
}: {
  updated: string;
  reviewer?: string;
  methodologyHref?: string;
}) {
  return (
    <div className="not-prose mb-6 flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-slate-200 pb-3 text-xs text-slate-500">
      <span className="inline-flex items-center gap-1.5">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        Updated <time dateTime={updated}>{new Date(updated).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        Reviewed by {reviewer}
      </span>
      <Link href={methodologyHref} className="font-medium text-blue-700 hover:underline">Methodology →</Link>
    </div>
  );
}

export function Citation({
  source,
  url,
  detail,
}: {
  source: string;
  url: string;
  detail?: string;
}) {
  return (
    <p className="not-prose my-3 text-xs text-slate-500">
      Source:{" "}
      <a href={url} rel="nofollow noopener noreferrer" target="_blank" className="font-medium text-blue-700 hover:underline">
        {source}
      </a>
      {detail ? ` — ${detail}` : ""}
    </p>
  );
}
