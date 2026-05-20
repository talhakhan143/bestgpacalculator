import type { MetadataRoute } from "next";
import { listPublishedPosts } from "@/lib/blog";

const BASE = "https://bestgpacalculator.online";

export const revalidate = 300;

const ROUTE_LAST_MODIFIED: Record<string, string> = {
  "": "2026-05-20",
  "/weighted-gpa-calculator": "2026-05-14",
  "/unweighted-gpa-calculator": "2026-05-13",
  "/high-school-gpa-calculator": "2026-05-14",
  "/college-gpa-calculator": "2026-05-13",
  "/middle-school-gpa-calculator": "2026-05-12",
  "/cumulative-gpa-calculator": "2026-05-13",
  "/semester-gpa-calculator": "2026-05-12",
  "/current-gpa-calculator": "2026-05-12",
  "/ap-gpa-calculator": "2026-05-14",
  "/honors-gpa-calculator": "2026-05-13",
  "/percentage-to-gpa-calculator": "2026-05-13",
  "/gpa-calculator-without-credits": "2026-05-12",
  "/ap-score-to-gpa-calculator": "2026-05-14",
  "/gpa-goal-calculator": "2026-05-14",
  "/how-to-calculate-gpa": "2026-05-15",
  "/about": "2026-05-20",
  "/contact": "2026-05-15",
  "/privacy": "2026-05-15",
  "/terms": "2026-05-15",
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const buildDate = new Date();

  const staticEntries: MetadataRoute.Sitemap = Object.entries(ROUTE_LAST_MODIFIED).map(
    ([path, lastMod]) => ({
      url: `${BASE}${path}`,
      lastModified: new Date(lastMod),
    }),
  );

  let blogEntries: MetadataRoute.Sitemap = [];
  let latestPostDate: Date = new Date("2026-05-20");
  try {
    const posts = await listPublishedPosts();
    if (posts.length > 0) {
      latestPostDate = posts.reduce<Date>((acc, p) => {
        const d = p.updatedAt ?? buildDate;
        return d > acc ? d : acc;
      }, new Date(0));
    }
    blogEntries = posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.updatedAt ?? buildDate,
    }));
  } catch {
    blogEntries = [];
  }

  const blogIndexEntry: MetadataRoute.Sitemap[number] = {
    url: `${BASE}/blog`,
    lastModified: latestPostDate,
  };

  return [...staticEntries, blogIndexEntry, ...blogEntries];
}
