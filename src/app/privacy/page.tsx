import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy — BestGPACalculator",
  description:
    "Privacy policy for BestGPACalculator. We don't collect personal data. Your calculator data stays in your browser via localStorage. Standard analytics and ad cookies disclosed.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "May 3, 2026";

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy", href: "/privacy" }]} />
      <Hero
        badge={`Last updated ${UPDATED}`}
        title="Privacy"
        highlight="Policy"
        subtitle="We don't collect personal data. Your GPA inputs stay in your browser. Read the details below."
      />

      <article className="mx-auto mt-12 max-w-3xl px-4 pb-16 sm:px-6">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            What we collect
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            <strong>Your GPA data:</strong> Class names, grades, credits, and
            chosen weighting scale are stored in your browser&apos;s
            localStorage. They never leave your device. Clear your browser
            data to wipe them.
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            <strong>Analytics:</strong> We may use Google Analytics or Vercel
            Analytics to understand which pages get used. These services may
            collect IP address, device type, page views, and approximate
            location at the country/city level. We don&apos;t link analytics
            data to individuals.
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            <strong>Advertising:</strong> We may serve display ads through
            third-party networks like Google AdSense, Ezoic, or Mediavine.
            These networks may use cookies to personalize ads. Read{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              className="font-medium text-indigo-700 underline-offset-2 hover:underline dark:text-indigo-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google&apos;s ad policies
            </a>{" "}
            for details. You can opt out via your browser settings or the{" "}
            <a
              href="https://www.networkadvertising.org/choices/"
              className="font-medium text-indigo-700 underline-offset-2 hover:underline dark:text-indigo-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              NAI consumer opt-out
            </a>
            .
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            What we don&apos;t do
          </h2>
          <ul className="mt-3 space-y-2 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            <li>We don&apos;t require accounts or sign-ups.</li>
            <li>We don&apos;t sell your data — we don&apos;t collect personal data to sell.</li>
            <li>We don&apos;t share your GPA inputs with anyone.</li>
            <li>We don&apos;t store anything you type on our servers.</li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Children
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            This site is intended for students aged 13 and up. If you&apos;re
            under 13, please use the calculator with a parent or guardian. We
            don&apos;t knowingly collect personal information from children
            under 13.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Changes to this policy
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            We may update this policy as we add features (for example, if we
            ever add ads or change analytics providers). The &ldquo;Last
            updated&rdquo; date at the top of this page reflects the most
            recent revision.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Contact
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            Privacy questions? Email us via the{" "}
            <a
              href="/contact"
              className="font-medium text-indigo-700 underline-offset-2 hover:underline dark:text-indigo-300"
            >
              Contact page
            </a>
            .
          </p>
        </div>
      </article>
    </>
  );
}
