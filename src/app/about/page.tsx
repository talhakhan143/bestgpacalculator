import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";

export const metadata: Metadata = {
  title: "About — BestGPACalculator",
  description:
    "About BestGPACalculator — a free, mobile-first GPA calculator suite for high school and college students. Built for accuracy, transparency, and zero friction.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About BestGPACalculator",
    description:
      "Editorial team, peer-review process, corrections policy, and sources used by BestGPACalculator's GPA tools and articles.",
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About BestGPACalculator",
    description:
      "Editorial team, peer review, corrections, and sources for our GPA tools and articles.",
  },
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
      <Hero
        badge="About us"
        title="A GPA tool"
        highlight="that respects students"
        subtitle="GPA Boost is a free, no-signup, mobile-first calculator suite covering every common GPA scenario — built by people who got tired of bloated, ad-spammed competitors."
      />

      <article className="mx-auto mt-12 max-w-3xl px-4 pb-16 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Why we built this
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Most GPA calculators online force a single weighting policy
            (usually +0.5 / +1.0) and don&apos;t explain why your school&apos;s
            number is different. Some pop ads over the calculator before you
            can use it. Some require an account.
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            We took the opposite approach: every common weighting scale,
            transparent math, no signup, your data saves to your browser
            (never our servers), and the tools work properly on a phone.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            How we&apos;re funded
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            The site is free. We may show display ads through standard
            networks, and we may include affiliate links to study tools we
            actually use (textbooks, prep courses, productivity apps). We
            don&apos;t sell your data — we don&apos;t collect it in the first
            place. No accounts, no tracking beyond standard analytics.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Editorial team and methodology
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Our content is written and reviewed by an editorial team with
            backgrounds in K-12 education policy, college admissions, and
            quantitative tutoring. Every calculator page goes through three
            checks: (1) the underlying formula is unit-tested against published
            worked examples (College Board AP, NCES Digest, PrepScholar,
            College Transitions); (2) the article matches policies from
            primary sources like College Board, the U.S. Department of
            Education, and NACAC; (3) the page is reviewed for clarity,
            citations, and link integrity before publishing.
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Articles carry a &quot;last updated&quot; date and a reviewer
            byline so readers can see when guidance was last verified. We
            re-check each page at least annually and after any material
            change in College Board, NCES, or federal financial-aid policy.
            See our full process at{" "}
            <Link
              href="/how-to-calculate-gpa"
              className="font-medium text-blue-700 hover:underline"
            >
              How to Calculate GPA
            </Link>
            , the methodology cornerstone for the site.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Accuracy and limits
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Our calculations follow standard US grading systems. We unit-test
            the math against published examples (PrepScholar, College
            Transitions). That said, your school&apos;s policy is final —
            check the student handbook for the exact formula your transcript
            uses, and use the school weighting scale dropdown to match.
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            We cite our sources directly on the calculator pages. Common
            authoritative references include{" "}
            <a href="https://www.collegeboard.org/" rel="nofollow noopener noreferrer" target="_blank" className="font-medium text-blue-700 hover:underline">College Board</a>,{" "}
            <a href="https://nces.ed.gov/" rel="nofollow noopener noreferrer" target="_blank" className="font-medium text-blue-700 hover:underline">NCES (National Center for Education Statistics)</a>,{" "}
            <a href="https://www.ed.gov/" rel="nofollow noopener noreferrer" target="_blank" className="font-medium text-blue-700 hover:underline">U.S. Department of Education</a>,{" "}
            <a href="https://www.nacacnet.org/" rel="nofollow noopener noreferrer" target="_blank" className="font-medium text-blue-700 hover:underline">NACAC</a>, and{" "}
            <a href="https://www.wes.org/" rel="nofollow noopener noreferrer" target="_blank" className="font-medium text-blue-700 hover:underline">World Education Services (WES)</a>{" "}
            for international transcript conversion.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Editorial team
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            BestGPACalculator is published by a small editorial team. We
            don&apos;t list individual names publicly because most of our
            reviewers also work full-time as school counselors, admissions
            officers, and college math instructors — and we&apos;d rather
            protect their privacy than chase author bylines for SEO. The team
            includes:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li>
              <strong>Editor-in-Chief</strong> — former US high school
              counselor (10+ years), now writes about admissions and academic
              policy. Oversees content strategy and the final review pass
              before publishing.
            </li>
            <li>
              <strong>Math Reviewer</strong> — undergraduate math instructor
              who audits every calculator formula against published worked
              examples (College Board AP, NCES Digest, PrepScholar) before
              the calculator goes live.
            </li>
            <li>
              <strong>Content Editor</strong> — a former K-12 academic adviser
              who reviews policy statements, internal links, and the accuracy
              of school-specific data (Cal Grant, HOPE, Bright Futures, etc.)
              against current state and federal guidance.
            </li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Peer review process
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Every calculator and every long-form article on this site goes
            through a three-step review before it&apos;s published:
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li>
              <strong>Formula audit.</strong> A math reviewer runs the
              calculator against three independent worked examples from
              published sources. We catch and document any disagreement
              before the page launches.
            </li>
            <li>
              <strong>Policy check.</strong> An academic adviser confirms that
              every claim about school policy, federal aid, or admissions
              criteria has a primary-source citation (College Board, U.S.
              Department of Education, NACAC, individual university registrar
              pages, or state aid agencies).
            </li>
            <li>
              <strong>Final read.</strong> The editor-in-chief reviews the
              article for clarity, factual accuracy, and internal-link
              integrity. The article carries a published date and a
              last-reviewed date in the schema metadata.
            </li>
          </ol>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Corrections policy
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            If you spot an error — a wrong GPA conversion, an outdated state
            scholarship rule, a broken formula — email us using the contact
            form. We aim to verify and correct factual errors within 48 hours,
            and we update the article&apos;s dateModified field when we make
            a correction. Significant corrections are noted at the bottom of
            the affected article so readers can see what changed and when.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Sources policy
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            We cite primary sources whenever possible — the actual federal
            regulation, the actual university registrar page, the actual
            College Board chart — rather than secondary aggregators. For
            policy statements that depend on year-specific rules (financial
            aid thresholds, SAP requirements, scholarship renewal terms), we
            link to the current source so readers can verify the rule is
            still in force. We do not accept paid placements, sponsored
            content, or guest posts.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Contact
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Found a bug? Have a school weighting policy you wish we supported?
            Spotted an error in a published article?{" "}
            <Link
              href="/contact"
              className="font-medium text-indigo-700 underline-offset-2 hover:underline dark:text-indigo-300"
            >
              Get in touch
            </Link>
            .
          </p>
        </div>
      </article>

      <RelatedCalculators heading="Try a calculator" />
    </>
  );
}
