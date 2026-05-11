import Link from "next/link";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";

export default function NotFound() {
  return (
    <>
      <section className="relative pt-16 pb-10 sm:pt-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-700 shadow-sm ring-1 ring-blue-100">
            <span className="grid h-2 w-2 place-items-center">
              <span className="relative h-2 w-2 rounded-full bg-rose-500" />
            </span>
            Error 404
          </div>
          <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl">
            Page not <span className="gradient-text">found</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
            The link you followed is broken or the page moved. Pick a calculator
            below or head back home.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/" className="btn-primary">
              Back to home
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/weighted-gpa-calculator" className="btn-glass">
              Open weighted GPA
            </Link>
          </div>
        </div>
      </section>

      <RelatedCalculators heading="Try a calculator" />
    </>
  );
}
