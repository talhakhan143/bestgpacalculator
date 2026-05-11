import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contact — BestGPACalculator",
  description:
    "Contact BestGPACalculator. Questions about a calculation, a missing weighting scale, a bug, or a partnership? Get in touch.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />
      <Hero
        badge="We read every email"
        title="Get in"
        highlight="touch"
        subtitle="Found a bug? Want a school weighting policy supported? Looking to partner? We're listening."
      />

      <article className="mx-auto mt-12 max-w-2xl px-4 pb-16 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Email us
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            For all inquiries — bugs, feature requests, school weighting
            policies you wish we supported, partnerships, press — reach us at:
          </p>
          <a
            href="mailto:hello@bestgpacalculator.com"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5"
          >
            hello@bestgpacalculator.com
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            What to include
          </h2>
          <ul className="mt-4 space-y-2 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">Bug reports:</strong>{" "}
              Page URL, what you did, what you expected, what happened. Screenshots help.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">Weighting policies:</strong>{" "}
              School name, district, the bonus values for Honors / AP / IB / Dual.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">Press / partnerships:</strong>{" "}
              Quick description and what you&apos;re looking to do.
            </li>
          </ul>

          <p className="mt-10 text-xs text-zinc-500 dark:text-zinc-400">
            Response time: usually within 2 business days. We&apos;re a small
            team — please be patient.
          </p>
        </div>
      </article>
    </>
  );
}
