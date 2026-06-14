"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const PRIMARY = [
  { href: "/", label: "Home" },
  { href: "/weighted-gpa-calculator", label: "Calculators" },
  { href: "/how-to-calculate-gpa", label: "Guide" },
  { href: "/blog", label: "Blog" },
];

const ALL_CALCULATORS = [
  { href: "/weighted-gpa-calculator", label: "Weighted GPA" },
  { href: "/unweighted-gpa-calculator", label: "Unweighted GPA" },
  { href: "/high-school-gpa-calculator", label: "High School GPA" },
  { href: "/college-gpa-calculator", label: "College GPA" },
  { href: "/middle-school-gpa-calculator", label: "Middle School GPA" },
  { href: "/cumulative-gpa-calculator", label: "Cumulative GPA" },
  { href: "/semester-gpa-calculator", label: "Semester GPA" },
  { href: "/current-gpa-calculator", label: "Current GPA" },
  { href: "/ap-gpa-calculator", label: "AP GPA" },
  { href: "/honors-gpa-calculator", label: "Honors GPA" },
  { href: "/percentage-to-gpa-calculator", label: "Percentage to GPA" },
  { href: "/gpa-calculator-without-credits", label: "Without Credits" },
  { href: "/law-school-gpa-calculator", label: "Law School GPA (LSAC)" },
  { href: "/grade-calculator", label: "Grade Calculator" },
  { href: "/final-grade-calculator", label: "Final Grade Calculator" },
  { href: "/ez-grader", label: "EZ Grader (Teachers)" },
  { href: "/letter-grade-to-gpa-converter", label: "Letter Grade → GPA" },
  { href: "/cgpa-to-percentage-calculator", label: "CGPA → Percentage" },
];

const RESOURCES = [
  { href: "/gpa-scale", label: "GPA Scale" },
  { href: "/gpa", label: "GPA Score Lookup" },
  { href: "/university", label: "University Calculators" },
  { href: "/how-to-calculate-gpa", label: "How to Calculate GPA" },
  { href: "/blog/highest-gpa-possible", label: "Highest GPA Possible" },
];

const TOP_UNIS = [
  { href: "/university/uf", label: "UF (Florida)" },
  { href: "/university/asu", label: "ASU (Arizona State)" },
  { href: "/university/purdue", label: "Purdue" },
  { href: "/university/uw-madison", label: "UW-Madison" },
  { href: "/university/ut", label: "UT Austin" },
  { href: "/university/rutgers", label: "Rutgers" },
  { href: "/university/ucsd", label: "UC San Diego" },
  { href: "/university/tamu", label: "Texas A&M" },
  { href: "/university/osu", label: "Ohio State" },
  { href: "/university/uiuc", label: "UIUC" },
  { href: "/university/nyu", label: "NYU" },
  { href: "/university/berkeley", label: "UC Berkeley" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [allOpen, setAllOpen] = useState(false);
  const [resOpen, setResOpen] = useState(false);
  const [uniOpen, setUniOpen] = useState(false);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-all-menu]")) setAllOpen(false);
      if (!target.closest("[data-res-menu]")) setResOpen(false);
      if (!target.closest("[data-uni-menu]")) setUniOpen(false);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" aria-label="BestGPACalculator — home" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="BestGPACalculator"
            width={956}
            height={188}
            className="h-8 w-auto sm:h-10"
          />
        </Link>

        {/* Centered nav (desktop) */}
        <nav className="hidden items-center justify-center gap-1 text-sm font-medium md:flex">
          {PRIMARY.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-md px-3 py-2 transition ${
                  active
                    ? "text-blue-700"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-blue-600"
                  />
                )}
              </Link>
            );
          })}

          <div className="relative" data-all-menu>
            <button
              type="button"
              onClick={() => setAllOpen((v) => !v)}
              className="flex items-center gap-1 rounded-md px-3 py-2 text-slate-600 transition hover:text-slate-900"
              aria-expanded={allOpen}
              aria-haspopup="menu"
            >
              All
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition ${allOpen ? "rotate-180" : ""}`} aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {allOpen && (
              <div
                role="menu"
                className="absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
              >
                {ALL_CALCULATORS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setAllOpen(false)}
                    role="menuitem"
                    className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="relative" data-res-menu>
            <button
              type="button"
              onClick={() => setResOpen((v) => !v)}
              className="flex items-center gap-1 rounded-md px-3 py-2 text-slate-600 transition hover:text-slate-900"
              aria-expanded={resOpen}
              aria-haspopup="menu"
            >
              Resources
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition ${resOpen ? "rotate-180" : ""}`} aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {resOpen && (
              <div
                role="menu"
                className="absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
              >
                {RESOURCES.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setResOpen(false)}
                    role="menuitem"
                    className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="relative" data-uni-menu>
            <button
              type="button"
              onClick={() => setUniOpen((v) => !v)}
              className="flex items-center gap-1 rounded-md px-3 py-2 text-slate-600 transition hover:text-slate-900"
              aria-expanded={uniOpen}
              aria-haspopup="menu"
            >
              Universities
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition ${uniOpen ? "rotate-180" : ""}`} aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {uniOpen && (
              <div
                role="menu"
                className="absolute left-1/2 top-full mt-2 w-72 -translate-x-1/2 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
              >
                <div className="grid grid-cols-2 gap-1">
                  {TOP_UNIS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setUniOpen(false)}
                      role="menuitem"
                      className="block rounded-lg px-3 py-2 text-xs text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/university"
                  onClick={() => setUniOpen(false)}
                  className="mt-1 block border-t border-slate-100 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50"
                >
                  See all 65 universities →
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right side actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/contact"
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Contact
          </Link>
          <Link
            href="/weighted-gpa-calculator"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Calculate
          </Link>
        </div>

        {/* Mobile button */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-700 transition hover:bg-slate-200 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto max-w-6xl space-y-1 px-4 py-3 sm:px-6">
            {ALL_CALCULATORS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
              >
                {item.label}
              </Link>
            ))}
            <div className="my-2 border-t border-slate-200" />
            <div className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Resources
            </div>
            {RESOURCES.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
              >
                {item.label}
              </Link>
            ))}
            <div className="my-2 border-t border-slate-200" />
            <div className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Top Universities
            </div>
            {TOP_UNIS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/university"
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              See all 65 universities →
            </Link>
            <div className="my-2 border-t border-slate-200" />
            <Link
              href="/how-to-calculate-gpa"
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              How to calculate GPA →
            </Link>
            <Link
              href="/weighted-gpa-calculator"
              onClick={() => setMenuOpen(false)}
              className="mt-2 block rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white"
            >
              Calculate now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
