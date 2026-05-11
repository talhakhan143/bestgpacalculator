/* eslint-disable */
import * as fs from "node:fs";
import * as path from "node:path";

interface PageDef {
  slug: string;
  term: string;
  definition: string;
  facts: { label: string; value: string }[];
}

const PAGES: PageDef[] = [
  {
    slug: "unweighted-gpa-calculator",
    term: "Unweighted GPA",
    definition: "Unweighted GPA uses a flat 4.0 scale where every course counts equally regardless of difficulty. A=4.0, B=3.0, C=2.0, D=1.0, F=0.0. Course rigor (AP, Honors, IB) doesn't change the grade points.",
    facts: [
      { label: "Maximum value", value: "4.0" },
      { label: "AP class boost", value: "None — same as regular" },
      { label: "Used by", value: "Most US colleges, transcripts, scholarships" },
      { label: "Common scale variants", value: "Standard 4.0, plus/minus 4.0, 4.3 with A+" },
    ],
  },
  {
    slug: "high-school-gpa-calculator",
    term: "High School GPA",
    definition: "A high school GPA averages your grades across all courses taken in grades 9-12. Most US high schools report both weighted (with AP/Honors bonuses on a 5.0 scale) and unweighted (pure 4.0 scale) versions on the transcript.",
    facts: [
      { label: "Grade levels", value: "9th–12th (4 years total)" },
      { label: "Typical credits per year", value: "6–8 yearlong courses" },
      { label: "Reported as", value: "Weighted + unweighted (most schools)" },
      { label: "Used for", value: "College admissions, scholarships, class rank" },
    ],
  },
  {
    slug: "college-gpa-calculator",
    term: "College GPA",
    definition: "A college GPA is a credit-hour-weighted average of your grades across all college courses on a 4.0 scale. Unlike high school, college GPAs are almost never weighted — course difficulty doesn't add bonus points to the final grade.",
    facts: [
      { label: "Maximum value", value: "4.0 (most schools)" },
      { label: "Credit hours per course", value: "Typically 3–4 per class" },
      { label: "Course rigor weighting", value: "Almost never weighted" },
      { label: "Honors thresholds", value: "Cum laude 3.5+, Magna 3.7+, Summa 3.9+ (varies)" },
    ],
  },
  {
    slug: "middle-school-gpa-calculator",
    term: "Middle School GPA",
    definition: "Middle school GPA averages grades across 6th-8th grade. Most middle schools use the standard 4.0 unweighted scale. This GPA usually does not transfer to high school records — your high school GPA starts fresh in 9th grade.",
    facts: [
      { label: "Grade levels", value: "6th–8th (3 years)" },
      { label: "Typical scale", value: "Unweighted 4.0" },
      { label: "Transfers to high school?", value: "No — HS GPA resets in 9th grade" },
      { label: "Used for", value: "Honor roll, course placement, parental tracking" },
    ],
  },
  {
    slug: "cumulative-gpa-calculator",
    term: "Cumulative GPA",
    definition: "A cumulative GPA averages all grades earned across every term you've completed. It's a credit-weighted average, so courses with more credit hours influence the final number more than 1-credit electives.",
    facts: [
      { label: "Scope", value: "All terms completed (lifetime average)" },
      { label: "Weighting", value: "By credit hours" },
      { label: "Used by", value: "Colleges, employers, grad schools" },
      { label: "Updated", value: "End of every term" },
    ],
  },
  {
    slug: "semester-gpa-calculator",
    term: "Semester GPA",
    definition: "A semester GPA averages your grades from a single academic term (semester or quarter), weighted by credit hours. It's a snapshot of one term's performance — multiple semester GPAs roll up into your cumulative GPA.",
    facts: [
      { label: "Scope", value: "One term only (single semester)" },
      { label: "Weighting", value: "By credit hours" },
      { label: "Used for", value: "Term snapshots, dean's list eligibility" },
      { label: "Combine with", value: "Cumulative GPA Calculator across terms" },
    ],
  },
  {
    slug: "current-gpa-calculator",
    term: "Current GPA",
    definition: "Your current GPA is a real-time estimate based on grades earned so far in the current term. It's useful mid-semester to project where you'll land before final grades are posted.",
    facts: [
      { label: "Scope", value: "Mid-term, not yet final" },
      { label: "Inputs", value: "Grades posted so far" },
      { label: "Use case", value: "Adjust study time, drop class decisions" },
      { label: "Differs from", value: "Final term GPA after exams posted" },
    ],
  },
  {
    slug: "ap-gpa-calculator",
    term: "AP GPA",
    definition: "An AP-focused GPA calculation gives every Advanced Placement course an extra +1.0 grade-point bonus on the standard weighting scale. An A in an AP class is worth 5.0 quality points, lifting an AP-heavy student well above the 4.0 ceiling.",
    facts: [
      { label: "AP bonus (standard)", value: "+1.0 grade points" },
      { label: "Max with all AP A's", value: "5.0 weighted" },
      { label: "Affects exam score?", value: "No — class grade and exam score are separate" },
      { label: "College credit?", value: "Yes, separately, based on exam score 3+" },
    ],
  },
  {
    slug: "honors-gpa-calculator",
    term: "Honors GPA",
    definition: "An Honors-focused GPA gives every Honors course a +0.5 grade-point bonus on the standard weighting scale. An A in an Honors class is worth 4.5, making Honors classes worth more than regular but less than AP/IB.",
    facts: [
      { label: "Honors bonus (standard)", value: "+0.5 grade points" },
      { label: "Max with all Honors A's", value: "4.5 weighted" },
      { label: "Vs AP", value: "Honors = +0.5, AP = +1.0 (most schools)" },
      { label: "Pre-AP / Pre-IB", value: "Usually treated as Honors" },
    ],
  },
  {
    slug: "percentage-to-gpa-calculator",
    term: "Percentage to GPA Conversion",
    definition: "Converting a percentage grade to GPA uses a standard 10-point scale: 93%+ = A (4.0), 90–92% = A- (3.7), 87–89% = B+ (3.3), and so on. Each letter grade maps to a specific quality-point value.",
    facts: [
      { label: "Scale type", value: "10-point conversion (standard US)" },
      { label: "A (93–100%)", value: "4.0 quality points" },
      { label: "B (83–86%)", value: "3.0 quality points" },
      { label: "Min passing C (73–76%)", value: "2.0 quality points" },
    ],
  },
  {
    slug: "gpa-calculator-without-credits",
    term: "GPA Without Credits",
    definition: "Calculating GPA without credit hours treats every class equally regardless of length or weight. The result is a simple average of grade points across all classes. Useful for quick estimates or schools that don't assign credits.",
    facts: [
      { label: "Weighting", value: "Equal — no credit hours" },
      { label: "Best for", value: "Quick estimates, schools without credit systems" },
      { label: "Accuracy vs credit-based", value: "Off by 0.0–0.3 typically" },
      { label: "Used by", value: "Some private schools, international systems" },
    ],
  },
  {
    slug: "ap-score-to-gpa-calculator",
    term: "AP Score to College Credit",
    definition: "AP exam scores 1-5 from College Board map to likely college credits. Most US universities grant 3 credits for a score of 3+, and 4 credits for a 5. Selective and Ivy League schools typically require a 4 or 5. Course credit policies vary by university and major.",
    facts: [
      { label: "Score 5", value: "3–8 college credits (varies)" },
      { label: "Score 4", value: "3 credits at most schools" },
      { label: "Score 3", value: "3 credits at state schools, often none at selective" },
      { label: "Score 1–2", value: "No credit at most institutions" },
    ],
  },
  {
    slug: "gpa-goal-calculator",
    term: "GPA Goal Calculator",
    definition: "A reverse GPA calculator solves the standard formula backwards. Given your current GPA, completed credits, target GPA, and upcoming credits, it tells you the average GPA you need across the upcoming term to hit your goal.",
    facts: [
      { label: "Inputs", value: "Current GPA, credits done, target GPA, upcoming credits" },
      { label: "Output", value: "Required average GPA next term" },
      { label: "Limit", value: "Required avg above 4.0 = mathematically impossible in one term" },
      { label: "Use case", value: "Term planning, grad school prep, scholarship targets" },
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

  if (src.includes("<DefinitionBlock")) {
    console.log(`already has DefinitionBlock: ${p.slug}`);
    continue;
  }

  // Update import
  src = src.replace(
    /import \{ InlineCalcCta, Citation \} from "@\/components\/sections\/InContentLinks";/,
    `import { InlineCalcCta, Citation, DefinitionBlock, KeyFacts } from "@/components/sections/InContentLinks";`
  );

  const definitionJsx = `
          <DefinitionBlock
            term=${JSON.stringify(p.term)}
            definition=${JSON.stringify(p.definition)}
          />

          <KeyFacts
            items={[
${p.facts.map((f) => `              { label: ${JSON.stringify(f.label)}, value: ${JSON.stringify(f.value)} },`).join("\n")}
            ]}
          />
`;

  // Inject right after the first <h2> closing tag
  src = src.replace(
    /(<h2[^>]*>[^<]+<\/h2>\s*<p[^>]*>[\s\S]*?<\/p>)/,
    `$1\n${definitionJsx}`
  );

  fs.writeFileSync(file, src);
  console.log(`OK ${p.slug}`);
}
