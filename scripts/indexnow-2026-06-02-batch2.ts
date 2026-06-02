/**
 * IndexNow batch for audit-fix wave: grade calculator family + gpa-to-percentage + meta refresh on homepage + about.
 */
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { indexNowPing } from "../src/lib/indexnow";

const BASE = "https://bestgpacalculator.online";

const URLS = [
  // New pages
  `${BASE}/grade-calculator`,
  `${BASE}/final-grade-calculator`,
  `${BASE}/semester-grade-calculator`,
  `${BASE}/weighted-grade-calculator`,
  `${BASE}/gpa-to-percentage-calculator`,
  // Refreshed (meta/byline/E-E-A-T)
  `${BASE}/`,
  `${BASE}/about`,
  `${BASE}/weighted-gpa-calculator`,
  `${BASE}/unweighted-gpa-calculator`,
  `${BASE}/high-school-gpa-calculator`,
  `${BASE}/college-gpa-calculator`,
  `${BASE}/cumulative-gpa-calculator`,
  `${BASE}/percentage-to-gpa-calculator`,
  `${BASE}/gpa-scale`,
  `${BASE}/law-school-gpa-calculator`,
  `${BASE}/sitemap.xml`,
];

async function main() {
  console.log(`Pinging ${URLS.length} URLs...`);
  const result = await indexNowPing(URLS);
  console.log(`Result: ${result.status} — ${result.message}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
