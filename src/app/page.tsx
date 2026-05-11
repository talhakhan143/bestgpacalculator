import Link from "next/link";
import { WeightedGPACalculator } from "@/components/calculator/WeightedGPACalculator";
import { Hero } from "@/components/sections/Hero";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { CalculatorSchema, FaqSchema } from "@/components/seo/JsonLd";

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is the difference between weighted and unweighted GPA?",
    a: "Unweighted GPA uses a 4.0 scale where every class is treated equally. Weighted GPA gives extra credit for harder courses — typically +0.5 for Honors and +1.0 for AP, IB, and dual-enrollment classes — so an A in an AP class is worth 5.0 instead of 4.0.",
  },
  {
    q: "Can a weighted GPA be above 4.0?",
    a: "Yes. With AP and Honors bonuses, students taking advanced course loads regularly reach 4.2 to 4.7 weighted. The cap depends on your school — most cap at 5.0, but some go higher.",
  },
  {
    q: "Do colleges look at weighted or unweighted GPA?",
    a: "Most selective colleges recalculate your GPA on a standard scale and consider course rigor separately. They want to see both that you took challenging classes and that you did well in them.",
  },
  {
    q: "Why does my school's GPA differ from this calculator?",
    a: "Schools weight differently. Some only weight AP, others include dual-enrollment, some cap the bonus per semester. Use the school weighting scale dropdown to match your district's policy, or check your school's GPA handbook for the exact formula.",
  },
  {
    q: "How much does an AP class boost my GPA?",
    a: "On the standard +1.0 scale, an A in an AP class is worth 5.0 quality points instead of 4.0. Over a year of four AP A's, your weighted GPA can sit at 5.0 while your unweighted stays at 4.0.",
  },
  {
    q: "Is my data saved if I close the tab?",
    a: "Yes. Your classes and chosen weighting scale save to your browser's local storage. No account needed, no data sent to any server. Clear your browser data to wipe it.",
  },
];

const SCALES = [
  {
    label: "Standard",
    bonus: "+0.5 / +1.0",
    use: "Most US public high schools",
    apA: "5.0",
    honA: "4.5",
  },
  {
    label: "Conservative",
    bonus: "+0.25 / +0.75",
    use: "Districts limiting grade inflation",
    apA: "4.75",
    honA: "4.25",
  },
  {
    label: "Third-step",
    bonus: "+0.33 / +0.67",
    use: "Schools using thirds",
    apA: "4.67",
    honA: "4.33",
  },
  {
    label: "Uniform",
    bonus: "+1.0 / +1.0",
    use: "Treats Honors = AP",
    apA: "5.0",
    honA: "5.0",
  },
  {
    label: "AP-only",
    bonus: "0 / +1.0",
    use: "No Honors bonus",
    apA: "5.0",
    honA: "4.0",
  },
];

export default function Home() {
  return (
    <>
      <CalculatorSchema
        name="Weighted GPA Calculator"
        description="Free weighted GPA calculator for high school students with AP, Honors, IB, and dual-enrollment support across multiple weighting scales."
        url="https://bestgpacalculator.vercel.app/"
      />
      <FaqSchema items={FAQ_ITEMS} />

      <Hero
        badge="Built for high school students · Free forever"
        title="Calculate your"
        highlight="weighted GPA"
        subtitle="The only weighted GPA calculator that matches your school's actual weighting scale. Works with AP, Honors, IB, and dual-enrollment — instant results, mobile-first, no signup."
        primary={{ href: "#calculator", label: "Calculate now" }}
        secondary={{ href: "/weighted-gpa-calculator", label: "Learn how it works" }}
      />

      {/* Trust strip */}
      <section className="mx-auto -mt-2 mb-12 max-w-4xl px-4 sm:px-6">
        <div className="glass flex flex-wrap items-center justify-around gap-4 rounded-2xl px-6 py-4 text-center sm:gap-6">
          <Stat value="5.0" label="Max scale" />
          <Divider />
          <Stat value="5" label="Weighting scales" />
          <Divider />
          <Stat value="<100ms" label="Live recalc" />
          <Divider />
          <Stat value="0" label="Signups required" />
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="mx-auto max-w-3xl px-4 sm:px-6">
        <WeightedGPACalculator />
      </section>

      {/* How it works */}
      <section className="mx-auto mt-20 max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700 dark:text-indigo-300">
            How it works
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            From classes to GPA in three steps
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-base text-zinc-600 dark:text-zinc-300">
            Most calculators get one thing wrong: they assume every school uses
            the same +0.5 / +1.0 weighting. We don&apos;t.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Step
            n={1}
            title="Pick your scale"
            body="Standard, conservative, third-step, uniform, or AP-only. Match your district's policy in one click."
          />
          <Step
            n={2}
            title="Enter classes"
            body="Subject, letter grade, credits, level. Add or remove rows as you go. Auto-saves to your browser."
          />
          <Step
            n={3}
            title="Read your GPA"
            body="Both weighted and unweighted update live. See exactly how each AP or Honors class changes your number."
          />
        </div>
      </section>

      {/* Scales comparison */}
      <section className="mx-auto mt-20 max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-700 dark:text-fuchsia-300">
            Weighting scales
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Five scales — pick the one your school uses
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-base text-zinc-600 dark:text-zinc-300">
            Schools don&apos;t agree on how much an AP or Honors class is worth.
            Here&apos;s what an A is worth under each common scale.
          </p>
        </div>

        <div className="glass-strong mt-8 overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/40 bg-white/30 text-xs uppercase tracking-[0.14em] text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400">
                  <th className="px-4 py-3 font-semibold">Scale</th>
                  <th className="px-4 py-3 font-semibold">Hon / AP bonus</th>
                  <th className="px-4 py-3 font-semibold tabular">Honors A</th>
                  <th className="px-4 py-3 font-semibold tabular">AP A</th>
                  <th className="hidden px-4 py-3 font-semibold sm:table-cell">Used by</th>
                </tr>
              </thead>
              <tbody>
                {SCALES.map((s) => (
                  <tr
                    key={s.label}
                    className="border-b border-white/30 transition last:border-b-0 hover:bg-white/40 dark:border-white/[0.06] dark:hover:bg-white/[0.04]"
                  >
                    <td className="px-4 py-4 font-semibold text-zinc-900 dark:text-zinc-100">
                      {s.label}
                    </td>
                    <td className="px-4 py-4 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                      {s.bonus}
                    </td>
                    <td className="tabular px-4 py-4 font-semibold text-cyan-700 dark:text-cyan-300">
                      {s.honA}
                    </td>
                    <td className="tabular px-4 py-4 font-semibold text-fuchsia-700 dark:text-fuchsia-300">
                      {s.apA}
                    </td>
                    <td className="hidden px-4 py-4 text-zinc-600 sm:table-cell dark:text-zinc-400">
                      {s.use}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="mx-auto mt-20 max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
            Why students pick us
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Built different from the bloated tools
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Feature
            iconPath="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
            title="Per-school weighting"
            body="Standard, conservative, third-step, uniform, AP-only — five scales out of the box. Your school's policy, your numbers."
          />
          <Feature
            iconPath="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            title="Live calculation"
            body="No submit button, no waiting. Type a grade, watch your GPA change. Both weighted and unweighted, side by side."
          />
          <Feature
            iconPath="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            title="Auto-save"
            body="Your classes save to your browser. Close the tab, come back tomorrow — everything still here. No account."
          />
          <Feature
            iconPath="M4 6h16M4 12h16M4 18h16"
            title="AP / Honors / IB / Dual"
            body="Tag every class with its real level. Each gets the right bonus under your selected scale, automatically."
          />
          <Feature
            iconPath="M12 3v18M3 12h18"
            title="Add unlimited classes"
            body="Track an entire semester or your whole high school career. Credits or units — any granularity works."
          />
          <Feature
            iconPath="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
            title="Mobile-first"
            body="Designed for phones. Big tap targets, sticky GPA display, no horizontal scroll. Works in class, on the bus, anywhere."
          />
        </div>
      </section>

      {/* FAQ */}
      <Faq items={FAQ_ITEMS} />

      {/* Related calculators CTA */}
      <section className="mx-auto mt-20 max-w-4xl px-4 sm:px-6">
        <div className="glass-strong rounded-3xl p-8 text-center sm:p-12">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Specialized GPA calculators
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-base text-zinc-600 dark:text-zinc-300">
            Targeting AP only? Honors only? Use the focused tool that matches your situation.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <ToolCard
              href="/weighted-gpa-calculator"
              title="Weighted"
              body="Full multi-level calculator with all five scales."
            />
            <ToolCard
              href="/ap-gpa-calculator"
              title="AP Focus"
              body="See the +1.0 bump from each AP class clearly."
              highlight
            />
            <ToolCard
              href="/honors-gpa-calculator"
              title="Honors Focus"
              body="Calculate the +0.5 Honors bonus on its own."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="tabular text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-50">
        {value}
      </div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
        {label}
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="hidden h-8 w-px bg-zinc-300/60 sm:block dark:bg-white/15" />
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white shadow-md">
        {n}
      </div>
      <h3 className="mt-4 text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        {body}
      </p>
    </div>
  );
}

function Feature({
  iconPath,
  title,
  body,
}: {
  iconPath: string;
  title: string;
  body: string;
}) {
  return (
    <div className="glass rounded-2xl p-6 transition hover:-translate-y-0.5">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-700">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d={iconPath} />
        </svg>
      </div>
      <h3 className="mt-4 text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        {body}
      </p>
    </div>
  );
}

function ToolCard({
  href,
  title,
  body,
  highlight = false,
}: {
  href: string;
  title: string;
  body: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative block rounded-2xl p-5 text-left transition hover:-translate-y-0.5 ${
        highlight
          ? "bg-blue-600 text-white shadow-md"
          : "glass text-zinc-900 dark:text-zinc-100"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold tracking-tight">{title}</h3>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition group-hover:translate-x-0.5" aria-hidden="true">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </div>
      <p
        className={`mt-1 text-xs leading-relaxed ${
          highlight ? "text-white/90" : "text-zinc-600 dark:text-zinc-300"
        }`}
      >
        {body}
      </p>
    </Link>
  );
}
