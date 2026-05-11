"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const CALCULATOR_LINKS = [
  { href: "/weighted-gpa-calculator", label: "Weighted GPA" },
  { href: "/unweighted-gpa-calculator", label: "Unweighted GPA" },
  { href: "/high-school-gpa-calculator", label: "High School GPA" },
  { href: "/college-gpa-calculator", label: "College GPA" },
  { href: "/middle-school-gpa-calculator", label: "Middle School GPA" },
  { href: "/cumulative-gpa-calculator", label: "Cumulative GPA" },
];

const SPECIAL_LINKS = [
  { href: "/semester-gpa-calculator", label: "Semester GPA" },
  { href: "/current-gpa-calculator", label: "Current GPA" },
  { href: "/ap-gpa-calculator", label: "AP GPA" },
  { href: "/honors-gpa-calculator", label: "Honors GPA" },
  { href: "/percentage-to-gpa-calculator", label: "Percentage to GPA" },
  { href: "/gpa-calculator-without-credits", label: "Without Credits" },
];

const RESOURCE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/how-to-calculate-gpa", label: "How to Calculate GPA" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <footer className="relative mt-20 glass border-x-0 border-b-0">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" aria-label="BestGPACalculator — home" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="BestGPACalculator"
                width={480}
                height={316}
                loading="lazy"
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Free GPA calculators for high school and college students. No
              signup, mobile-first, accurate.
            </p>
          </div>

          <FooterColumn title="Calculators" links={CALCULATOR_LINKS} />
          <FooterColumn title="Specialized" links={SPECIAL_LINKS} />
          <div className="space-y-6">
            <FooterColumn title="Resources" links={RESOURCE_LINKS} />
            <FooterColumn title="Legal" links={LEGAL_LINKS} />
          </div>
        </div>

        <div className="mt-10 border-t border-white/30 pt-6 text-center text-xs text-zinc-600 dark:border-white/[0.06] dark:text-zinc-400">
          © {new Date().getFullYear()} BestGPACalculator. Not affiliated with any
          school district, College Board, IB Organization, or testing service.
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-700 dark:text-zinc-300">
        {title}
      </h3>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-zinc-600 transition hover:text-indigo-700 dark:text-zinc-400 dark:hover:text-indigo-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
