/**
 * Bulk IndexNow ping for all 32+ published posts.
 * Run after deploys or new content publish.
 *
 * Usage: npx tsx scripts/bulk-indexnow.ts
 */
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { indexNowPing } from "../src/lib/indexnow";
import { listPublishedPosts } from "../src/lib/blog";

const BASE = "https://bestgpacalculator.online";

const STATIC = [
  `${BASE}/`,
  `${BASE}/blog`,
  `${BASE}/sitemap.xml`,
  `${BASE}/weighted-gpa-calculator`,
  `${BASE}/unweighted-gpa-calculator`,
  `${BASE}/high-school-gpa-calculator`,
  `${BASE}/college-gpa-calculator`,
  `${BASE}/cumulative-gpa-calculator`,
  `${BASE}/semester-gpa-calculator`,
  `${BASE}/current-gpa-calculator`,
  `${BASE}/ap-gpa-calculator`,
  `${BASE}/honors-gpa-calculator`,
  `${BASE}/percentage-to-gpa-calculator`,
  `${BASE}/gpa-goal-calculator`,
];

async function main() {
  const posts = await listPublishedPosts();
  const urls = [...STATIC, ...posts.map((p) => `${BASE}/blog/${p.slug}`)];
  console.log(`Pinging ${urls.length} URLs...`);
  const result = await indexNowPing(urls);
  console.log(`Status: ${result.status} ${result.message}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
