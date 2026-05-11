import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Use — BestGPACalculator",
  description:
    "Terms of use for BestGPACalculator. Free educational tool — provided as-is, no warranty. Use the calculations as guidance, not as official transcript replacement.",
  alternates: { canonical: "/terms" },
};

const UPDATED = "May 3, 2026";

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms", href: "/terms" }]} />
      <Hero
        badge={`Last updated ${UPDATED}`}
        title="Terms"
        highlight="of Use"
        subtitle="Plain-English terms. Free tool, provided as-is. Calculations are for guidance, not official records."
      />

      <article className="mx-auto mt-12 max-w-3xl px-4 pb-16 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Use of the site
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            GPA Boost is a free, public-access educational calculator suite.
            You can use it for personal academic planning. You can&apos;t
            scrape it, redistribute its content as your own, or attempt to
            disrupt its operation.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Accuracy disclaimer
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            We aim for accurate calculations and follow standard US grading
            conventions. However, your school&apos;s official transcript is
            the authoritative record. The calculations on this site are
            estimates for personal planning. Don&apos;t use them as a
            replacement for official records or for official transcript
            submissions to colleges.
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Schools differ in how they weight classes, calculate GPA, and
            report grades. We provide the most common scales and methods, but
            we can&apos;t guarantee a match with every school&apos;s policy.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            No warranty
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            The site is provided &ldquo;as is&rdquo; without warranty of any
            kind. We&apos;re not liable for any decisions you make based on
            calculations on this site. Use it as a tool, not as a final
            authority.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Affiliate links and ads
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Some links on this site may be affiliate links — if you click
            through and make a purchase, we may receive a small commission at
            no extra cost to you. We may also display ads through standard ad
            networks. See our{" "}
            <a
              href="/privacy"
              className="font-medium text-indigo-700 underline-offset-2 hover:underline dark:text-indigo-300"
            >
              Privacy Policy
            </a>{" "}
            for more.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Changes to these terms
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            We may revise these terms occasionally. The &ldquo;Last
            updated&rdquo; date reflects the latest version. Continued use of
            the site means you accept the current terms.
          </p>
        </div>
      </article>
    </>
  );
}
