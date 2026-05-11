import type { MetadataRoute } from "next";
import { listPublishedPosts } from "@/lib/blog";

const BASE = "https://bestgpacalculator.vercel.app";

const STATIC_ROUTES = [
  "",
  "/weighted-gpa-calculator",
  "/unweighted-gpa-calculator",
  "/high-school-gpa-calculator",
  "/college-gpa-calculator",
  "/middle-school-gpa-calculator",
  "/cumulative-gpa-calculator",
  "/semester-gpa-calculator",
  "/current-gpa-calculator",
  "/ap-gpa-calculator",
  "/honors-gpa-calculator",
  "/percentage-to-gpa-calculator",
  "/gpa-calculator-without-credits",
  "/ap-score-to-gpa-calculator",
  "/gpa-goal-calculator",
  "/how-to-calculate-gpa",
  "/blog",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => {
    const isHome = path === "";
    const isCalc = path.includes("calculator");
    return {
      url: `${BASE}${path}`,
      lastModified,
      changeFrequency: isHome ? "weekly" : isCalc ? "weekly" : "monthly",
      priority: isHome ? 1 : isCalc ? 0.8 : 0.5,
    };
  });

  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = listPublishedPosts();
    blogEntries = posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // DB not initialized yet — skip blog entries gracefully
    blogEntries = [];
  }

  return [...staticEntries, ...blogEntries];
}
