/**
 * Pings every URL in live sitemap.xml via IndexNow.
 * Post Core-Update recovery push: nudge Bing/Yandex on all 159 URLs
 * after GSC sitemap re-add forced Google re-crawl.
 *
 * Usage: npx tsx scripts/indexnow-sitemap-2026-06-12.ts
 */
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { indexNowPing } from "../src/lib/indexnow";

const SITEMAP = "https://bestgpacalculator.online/sitemap.xml";

async function main() {
  const res = await fetch(SITEMAP);
  const xml = await res.text();
  const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map(
    (m) => m[1],
  );
  console.log(`Sitemap URLs found: ${urls.length}`);

  // Batch in chunks of 100 for safety
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
