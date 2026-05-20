/**
 * One-time IndexNow ping of every URL in the sitemap.
 * Useful to "kickstart" Bing/Yandex on a freshly migrated domain.
 *
 * Usage: npx tsx scripts/indexnow-all.ts
 */
import { indexNowPing } from "../src/lib/indexnow";

const URLS = [
  "https://bestgpacalculator.online/",
  "https://bestgpacalculator.online/weighted-gpa-calculator",
  "https://bestgpacalculator.online/unweighted-gpa-calculator",
  "https://bestgpacalculator.online/high-school-gpa-calculator",
  "https://bestgpacalculator.online/college-gpa-calculator",
  "https://bestgpacalculator.online/middle-school-gpa-calculator",
  "https://bestgpacalculator.online/cumulative-gpa-calculator",
  "https://bestgpacalculator.online/semester-gpa-calculator",
  "https://bestgpacalculator.online/current-gpa-calculator",
  "https://bestgpacalculator.online/ap-gpa-calculator",
  "https://bestgpacalculator.online/honors-gpa-calculator",
  "https://bestgpacalculator.online/percentage-to-gpa-calculator",
  "https://bestgpacalculator.online/gpa-calculator-without-credits",
  "https://bestgpacalculator.online/ap-score-to-gpa-calculator",
  "https://bestgpacalculator.online/gpa-goal-calculator",
  "https://bestgpacalculator.online/how-to-calculate-gpa",
  "https://bestgpacalculator.online/blog",
  "https://bestgpacalculator.online/blog/what-is-gpa",
  "https://bestgpacalculator.online/about",
  "https://bestgpacalculator.online/contact",
  "https://bestgpacalculator.online/privacy",
  "https://bestgpacalculator.online/terms",
  "https://bestgpacalculator.online/sitemap.xml",
];

async function main() {
  const result = await indexNowPing(URLS);
  console.log(`IndexNow ping: ${result.status} ${result.message}`);
  console.log(`URLs submitted: ${URLS.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
