/**
 * Wave 3 final IndexNow ping after enriching all 65 universities + 18 GPA scores.
 * Pings sitemap + all newly-enriched URLs to nudge Bing/Yandex.
 *
 * Usage: npx tsx scripts/indexnow-wave3-final.ts
 */
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { indexNowPing } from "../src/lib/indexnow";
import { UNIS } from "../src/lib/university-data";
import { GPA_SCORE_DATA } from "../src/lib/gpa-score-data";

const BASE = "https://bestgpacalculator.online";

async function main() {
  const uniUrls = UNIS.filter((u) => u.indexed).map(
    (u) => `${BASE}/university/${u.slug}`,
  );
  const scoreUrls = GPA_SCORE_DATA.filter((d) => d.indexed).map(
    (d) => `${BASE}/gpa/${d.slug}`,
  );

  const urls = [`${BASE}/sitemap.xml`, ...uniUrls, ...scoreUrls];

  console.log(`Pinging ${urls.length} URLs (${uniUrls.length} unis + ${scoreUrls.length} scores + sitemap)...`);

  const BATCH = 100;
  for (let i = 0; i < urls.length; i += BATCH) {
    const slice = urls.slice(i, i + BATCH);
    const r = await indexNowPing(slice);
    console.log(`Batch ${i / BATCH + 1}: ${r.status} ${r.message} (${slice.length} URLs)`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
