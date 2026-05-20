import type { MetadataRoute } from "next";
import { listPublishedPosts } from "@/lib/blog";

const BASE = "https://bestgpacalculator.online";

export const revalidate = 300;

const ROUTE_LAST_MODIFIED: Record<string, string> = {
  "": "2026-05-20",
  "/weighted-gpa-calculator": "2026-05-14",
  "/unweighted-gpa-calculator": "2026-05-14",
  "/high-school-gpa-calculator": "2026-05-14",
  "/college-gpa-calculator": "2026-05-14",
  "/middle-school-gpa-calculator": "2026-05-14",
  "/cumulative-gpa-calculator": "2026-05-14",
  "/semester-gpa-calculator": "2026-05-14",
  "/current-gpa-calculator": "2026-05-14",
  "/ap-gpa-calculator": "2026-05-14",
  "/honors-gpa-calculator": "2026-05-14",
  "/percentage-to-gpa-calculator": "2026-05-14",
  "/gpa-calculator-without-credits": "2026-05-14",
  "/ap-score-to-gpa-calculator": "2026-05-14",
  "/gpa-goal-calculator": "2026-05-14",
  "/how-to-calculate-gpa": "2026-05-15",
  "/blog": "2026-05-20",
  "/about": "2026-05-15",
  "/contact": "2026-05-15",
  "/privacy": "2026-05-15",
  "/terms": "2026-05-15",
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const buildDate = new Date();

  const staticEntries: MetadataRoute.Sitemap = Object.entries(ROUTE_LAST_MODIFIED).map(
    ([path, lastMod]) => {
      const isHome = path === "";
      const isCalc = path.includes("calculator");
      const isBlogIndex = path === "/blog";
      return {
        url: `${BASE}${path}`,
        lastModified: new Date(lastMod),
        changeFrequency: isHome || isBlogIndex ? "weekly" : isCalc ? "weekly" : "monthly",
        priority: isHome ? 1 : isCalc ? 0.8 : isBlogIndex ? 0.7 : 0.5,
      };
    },
  );

  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await listPublishedPosts();
    blogEntries = posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.updatedAt ?? buildDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    blogEntries = [];
  }

  return [...staticEntries, ...blogEntries];
}
