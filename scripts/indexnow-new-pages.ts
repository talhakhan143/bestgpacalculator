/**
 * IndexNow ping for new programmatic pages: 27 GPA scores + 50 unis + 2 hubs + gpa-scale + homepage.
 */
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { indexNowPing } from "../src/lib/indexnow";
import { GPA_SCORE_DATA } from "../src/lib/gpa-score-data";
import { UNIS } from "../src/lib/university-data";

const BASE = "https://bestgpacalculator.online";

async function main() {
  const urls = [
    `${BASE}/`,
    `${BASE}/gpa`,
    `${BASE}/gpa-scale`,
    `${BASE}/university`,
    `${BASE}/sitemap.xml`,
    ...GPA_SCORE_DATA.map((d) => `${BASE}/gpa/${d.slug}`),
    ...UNIS.map((u) => `${BASE}/university/${u.slug}`),
  ];
  console.log(`Pinging ${urls.length} URLs...`);
  // IndexNow accepts up to 10K URLs per call; batch by 100 for safety
  const batches: string[][] = [];
  for (let i = 0; i < urls.length; i += 100) {
    batches.push(urls.slice(i, i + 100));
  }
  for (let i = 0; i < batches.length; i++) {
    const result = await indexNowPing(batches[i]);
    console.log(`Batch ${i + 1}/${batches.length}: ${result.status} ${result.message}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
