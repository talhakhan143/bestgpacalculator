/**
 * Bulk IndexNow ping for all 30 published posts.
 * Run after Vercel deploy finishes:
 *   npx tsx scripts/bulk-indexnow.ts
 */
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { indexNowPing } from "../src/lib/indexnow";
import { listPublishedPosts } from "../src/lib/blog";

const BASE = "https://bestgpacalculator.online";

async function main() {
  const posts = await listPublishedPosts();
  const urls = [
    `${BASE}/`,
    `${BASE}/blog`,
    `${BASE}/sitemap.xml`,
    ...posts.map((p) => `${BASE}/blog/${p.slug}`),
  ];
  console.log(`Pinging ${urls.length} URLs...`);
  const result = await indexNowPing(urls);
  console.log(JSON.stringify(result, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
