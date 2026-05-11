/* eslint-disable */
import * as fs from "node:fs";
import * as path from "node:path";

const PAGES: { slug: string; title: string }[] = [
  { slug: "weighted-gpa-calculator", title: "Weighted GPA" },
  { slug: "unweighted-gpa-calculator", title: "Unweighted GPA" },
  { slug: "high-school-gpa-calculator", title: "High School GPA" },
  { slug: "college-gpa-calculator", title: "College GPA" },
  { slug: "middle-school-gpa-calculator", title: "Middle School GPA" },
  { slug: "cumulative-gpa-calculator", title: "Cumulative GPA" },
  { slug: "semester-gpa-calculator", title: "Semester GPA" },
  { slug: "current-gpa-calculator", title: "Current GPA" },
  { slug: "ap-gpa-calculator", title: "AP GPA" },
  { slug: "honors-gpa-calculator", title: "Honors GPA" },
  { slug: "percentage-to-gpa-calculator", title: "Percentage to GPA" },
  { slug: "gpa-calculator-without-credits", title: "Without Credits" },
  { slug: "ap-score-to-gpa-calculator", title: "AP Score to GPA" },
  { slug: "gpa-goal-calculator", title: "GPA Goal Reverse" },
];

const ROOT = path.resolve(__dirname, "..");

for (const p of PAGES) {
  const file = path.join(ROOT, "src", "app", p.slug, "page.tsx");
  if (!fs.existsSync(file)) {
    console.warn(`SKIP missing: ${file}`);
    continue;
  }
  let src = fs.readFileSync(file, "utf-8");

  // Inject imports if missing
  if (!src.includes("@/components/layout/Breadcrumbs")) {
    src = src.replace(
      /import \{ CalculatorSchema, FaqSchema \} from "@\/components\/seo\/JsonLd";/,
      `import { CalculatorSchema, FaqSchema } from "@/components/seo/JsonLd";\nimport { Breadcrumbs } from "@/components/layout/Breadcrumbs";\nimport { RelatedCalculators } from "@/components/sections/RelatedCalculators";`
    );
  }

  const breadcrumbBlock = `<Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Calculators", href: "/weighted-gpa-calculator" }, { name: ${JSON.stringify(p.title)}, href: ${JSON.stringify("/" + p.slug)} }]} />`;
  const relatedBlock = `<RelatedCalculators currentHref=${JSON.stringify("/" + p.slug)} />`;

  // Insert breadcrumbs right after FaqSchema closing tag (before <Hero>)
  if (!src.includes("<Breadcrumbs")) {
    src = src.replace(
      /(<FaqSchema items=\{FAQ_ITEMS\} \/>\s*)/,
      `$1\n      ${breadcrumbBlock}\n      `
    );
  }

  // Insert related calculators right before closing </> fragment
  if (!src.includes("<RelatedCalculators")) {
    src = src.replace(
      /(\s*<Faq items=\{FAQ_ITEMS\} \/>\s*<\/>)/,
      `\n      <Faq items={FAQ_ITEMS} />\n\n      ${relatedBlock}\n    </>`
    );
  }

  fs.writeFileSync(file, src);
  console.log(`OK ${p.slug}`);
}
