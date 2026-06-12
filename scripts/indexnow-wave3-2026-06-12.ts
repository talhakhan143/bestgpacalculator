/**
 * Wave 3: ping enriched URLs after content quality consolidation.
 * Targets the 10 entities re-written with unique school-specific content
 * + sitemap so Bing/Yandex re-fetch shrunk sitemap.
 *
 * Usage: npx tsx scripts/indexnow-wave3-2026-06-12.ts
 */
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { indexNowPing } from "../src/lib/indexnow";

const BASE = "https://bestgpacalculator.online";

const URLS = [
  // Sitemap re-fetch trigger
  `${BASE}/sitemap.xml`,

  // Enriched university pages
  `${BASE}/university/uf`,
  `${BASE}/university/asu`,
  `${BASE}/university/purdue`,
  `${BASE}/university/uw-madison`,
  `${BASE}/university/ut`,

  // Enriched GPA score pages
  `${BASE}/gpa/2-5`,
  `${BASE}/gpa/3-0`,
  `${BASE}/gpa/3-5`,
  `${BASE}/gpa/3-8`,
  `${BASE}/gpa/4-0`,
];

async function main() {
  console.log(`Pinging ${URLS.length} URLs...`);
  const r = await indexNowPing(URLS);
  console.log(`IndexNow: ${r.status} ${r.message}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
