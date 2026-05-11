/* eslint-disable */
import * as fs from "node:fs";
import * as path from "node:path";

interface PageEnrichment {
  slug: string;
  cta: { href: string; title: string; body: string };
  citations: { source: string; url: string; detail: string }[];
}

const PAGES: PageEnrichment[] = [
  {
    slug: "weighted-gpa-calculator",
    cta: {
      href: "/ap-score-to-gpa-calculator",
      title: "Predicting AP exam impact",
      body: "Use the AP Score to GPA Calculator to estimate college credits and weighted boost from each AP score 1-5.",
    },
    citations: [
      { source: "College Board AP Program", url: "https://apstudents.collegeboard.org/", detail: "official AP weighting policy" },
      { source: "NCES Digest of Education Statistics", url: "https://nces.ed.gov/programs/digest/", detail: "high school GPA averages" },
    ],
  },
  {
    slug: "unweighted-gpa-calculator",
    cta: {
      href: "/percentage-to-gpa-calculator",
      title: "Coming from a percentage scale?",
      body: "Convert your % grades to a 4.0 GPA with the Percentage to GPA Calculator.",
    },
    citations: [
      { source: "NCES", url: "https://nces.ed.gov/", detail: "US grading scale standards" },
    ],
  },
  {
    slug: "high-school-gpa-calculator",
    cta: {
      href: "/cumulative-gpa-calculator",
      title: "Tracking multiple semesters?",
      body: "Combine all your terms with the Cumulative GPA Calculator to see your full transcript average.",
    },
    citations: [
      { source: "NCES", url: "https://nces.ed.gov/programs/digest/", detail: "national GPA distributions by grade level" },
      { source: "College Board", url: "https://www.collegeboard.org/", detail: "GPA in admissions" },
    ],
  },
  {
    slug: "college-gpa-calculator",
    cta: {
      href: "/gpa-goal-calculator",
      title: "Want to lift your GPA next term?",
      body: "Use the GPA Goal Calculator to see exactly what grade average you need to hit your target.",
    },
    citations: [
      { source: "NCES", url: "https://nces.ed.gov/", detail: "undergraduate grading standards" },
    ],
  },
  {
    slug: "middle-school-gpa-calculator",
    cta: {
      href: "/high-school-gpa-calculator",
      title: "Heading to high school?",
      body: "When you start 9th grade your GPA resets — try the High School GPA Calculator with weighting.",
    },
    citations: [
      { source: "NCES", url: "https://nces.ed.gov/", detail: "middle grades academic data" },
    ],
  },
  {
    slug: "cumulative-gpa-calculator",
    cta: {
      href: "/semester-gpa-calculator",
      title: "Just one term to track?",
      body: "Use the Semester GPA Calculator for a single-term snapshot before rolling it into your cumulative.",
    },
    citations: [
      { source: "NCES", url: "https://nces.ed.gov/", detail: "cumulative GPA reporting" },
    ],
  },
  {
    slug: "semester-gpa-calculator",
    cta: {
      href: "/cumulative-gpa-calculator",
      title: "Rolling up multiple terms?",
      body: "After computing each semester, combine them with the Cumulative GPA Calculator.",
    },
    citations: [
      { source: "NCES", url: "https://nces.ed.gov/", detail: "term GPA conventions" },
    ],
  },
  {
    slug: "current-gpa-calculator",
    cta: {
      href: "/gpa-goal-calculator",
      title: "Aiming higher next term?",
      body: "See what GPA you need next semester to hit a target with the GPA Goal Calculator.",
    },
    citations: [
      { source: "College Board", url: "https://www.collegeboard.org/", detail: "current academic standing" },
    ],
  },
  {
    slug: "ap-gpa-calculator",
    cta: {
      href: "/ap-score-to-gpa-calculator",
      title: "Predict your AP exam impact",
      body: "Already taken AP exams? See likely college credits with the AP Score to GPA Calculator.",
    },
    citations: [
      { source: "College Board AP Program", url: "https://apstudents.collegeboard.org/", detail: "AP class weighting and credit policy" },
    ],
  },
  {
    slug: "honors-gpa-calculator",
    cta: {
      href: "/weighted-gpa-calculator",
      title: "Mixing AP and Honors classes?",
      body: "The full Weighted GPA Calculator handles AP, Honors, IB, and dual-enrollment together.",
    },
    citations: [
      { source: "NCES", url: "https://nces.ed.gov/", detail: "Honors course weighting variance by district" },
    ],
  },
  {
    slug: "percentage-to-gpa-calculator",
    cta: {
      href: "/unweighted-gpa-calculator",
      title: "Got the GPA — now compute the average?",
      body: "Convert per-class then total it up with the Unweighted GPA Calculator.",
    },
    citations: [
      { source: "NCES", url: "https://nces.ed.gov/", detail: "percentage-to-GPA conversion conventions" },
    ],
  },
  {
    slug: "gpa-calculator-without-credits",
    cta: {
      href: "/unweighted-gpa-calculator",
      title: "Have credit hours to weigh?",
      body: "Use the Unweighted GPA Calculator with credit hours for a more accurate average.",
    },
    citations: [
      { source: "NCES", url: "https://nces.ed.gov/", detail: "academic averaging methods" },
    ],
  },
  {
    slug: "ap-score-to-gpa-calculator",
    cta: {
      href: "/ap-gpa-calculator",
      title: "Calculate the in-class GPA boost",
      body: "AP class grades count separately from exam scores — use the AP GPA Calculator for the +1.0 weighting.",
    },
    citations: [
      { source: "College Board AP Program", url: "https://apstudents.collegeboard.org/getting-credit-placement/search-policies", detail: "official college credit search" },
      { source: "College Board AP Score Distributions", url: "https://reports.collegeboard.org/ap-program-results/score-distributions", detail: "annual AP score data" },
    ],
  },
  {
    slug: "gpa-goal-calculator",
    cta: {
      href: "/cumulative-gpa-calculator",
      title: "Need your current cumulative first?",
      body: "Plug in all completed terms with the Cumulative GPA Calculator before goal planning.",
    },
    citations: [
      { source: "NCES", url: "https://nces.ed.gov/", detail: "GPA recovery and improvement statistics" },
    ],
  },
];

const ROOT = path.resolve(__dirname, "..");

for (const p of PAGES) {
  const file = path.join(ROOT, "src", "app", p.slug, "page.tsx");
  if (!fs.existsSync(file)) {
    console.warn(`SKIP missing: ${file}`);
    continue;
  }
  let src = fs.readFileSync(file, "utf-8");

  // Add import if missing
  if (!src.includes("@/components/sections/InContentLinks")) {
    src = src.replace(
      /import \{ RelatedCalculators \} from "@\/components\/sections\/RelatedCalculators";/,
      `import { RelatedCalculators } from "@/components/sections/RelatedCalculators";\nimport { InlineCalcCta, Citation } from "@/components/sections/InContentLinks";`
    );
  }

  // Inject InlineCalcCta + Citations right before </div></article>
  if (!src.includes("<InlineCalcCta")) {
    const ctaBlock = `
          <InlineCalcCta
            href=${JSON.stringify(p.cta.href)}
            title=${JSON.stringify(p.cta.title)}
            body=${JSON.stringify(p.cta.body)}
          />`;

    const citationBlocks = p.citations
      .map(
        (c) =>
          `          <Citation source=${JSON.stringify(c.source)} url=${JSON.stringify(c.url)} detail=${JSON.stringify(c.detail)} />`
      )
      .join("\n");

    src = src.replace(
      /(\s*)(<\/div>\s*<\/article>)/,
      `$1${ctaBlock}\n${citationBlocks}\n        $2`
    );
  }

  fs.writeFileSync(file, src);
  console.log(`OK ${p.slug}`);
}
