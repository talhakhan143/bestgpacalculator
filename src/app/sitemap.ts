import type { MetadataRoute } from "next";
import { listPublishedPosts } from "@/lib/blog";
import { GPA_SCORE_DATA } from "@/lib/gpa-score-data";
import { UNIS } from "@/lib/university-data";

const BASE = "https://bestgpacalculator.online";

export const revalidate = 300;

type Priority = 0.3 | 0.5 | 0.7 | 0.8 | 0.9 | 1.0;
type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

interface RouteMeta {
  lastMod: string;
  priority: Priority;
  changeFrequency: ChangeFreq;
}

const ROUTES: Record<string, RouteMeta> = {
  "": { lastMod: "2026-05-29", priority: 1.0, changeFrequency: "daily" },

  // Calculator hub pages — highest commercial intent
  "/weighted-gpa-calculator": { lastMod: "2026-05-14", priority: 0.9, changeFrequency: "monthly" },
  "/unweighted-gpa-calculator": { lastMod: "2026-05-13", priority: 0.9, changeFrequency: "monthly" },
  "/high-school-gpa-calculator": { lastMod: "2026-05-14", priority: 0.9, changeFrequency: "monthly" },
  "/college-gpa-calculator": { lastMod: "2026-05-13", priority: 0.9, changeFrequency: "monthly" },
  "/cumulative-gpa-calculator": { lastMod: "2026-05-13", priority: 0.9, changeFrequency: "monthly" },
  "/semester-gpa-calculator": { lastMod: "2026-05-12", priority: 0.8, changeFrequency: "monthly" },
  "/middle-school-gpa-calculator": { lastMod: "2026-05-12", priority: 0.8, changeFrequency: "monthly" },
  "/current-gpa-calculator": { lastMod: "2026-05-12", priority: 0.8, changeFrequency: "monthly" },
  "/ap-gpa-calculator": { lastMod: "2026-05-14", priority: 0.8, changeFrequency: "monthly" },
  "/honors-gpa-calculator": { lastMod: "2026-05-13", priority: 0.8, changeFrequency: "monthly" },
  "/percentage-to-gpa-calculator": { lastMod: "2026-05-13", priority: 0.8, changeFrequency: "monthly" },
  "/gpa-calculator-without-credits": { lastMod: "2026-05-12", priority: 0.7, changeFrequency: "monthly" },
  "/ap-score-to-gpa-calculator": { lastMod: "2026-05-14", priority: 0.7, changeFrequency: "monthly" },
  "/gpa-goal-calculator": { lastMod: "2026-05-14", priority: 0.9, changeFrequency: "monthly" },

  // Grade calculator family (new — Tier-1 competitor gap)
  "/grade-calculator": { lastMod: "2026-06-02", priority: 0.9, changeFrequency: "monthly" },
  "/final-grade-calculator": { lastMod: "2026-06-02", priority: 0.9, changeFrequency: "monthly" },
  "/semester-grade-calculator": { lastMod: "2026-06-02", priority: 0.8, changeFrequency: "monthly" },
  "/weighted-grade-calculator": { lastMod: "2026-06-02", priority: 0.8, changeFrequency: "monthly" },
  "/gpa-to-percentage-calculator": { lastMod: "2026-06-02", priority: 0.8, changeFrequency: "monthly" },

  // Guide pages
  "/how-to-calculate-gpa": { lastMod: "2026-05-15", priority: 0.8, changeFrequency: "monthly" },
  "/gpa-scale": { lastMod: "2026-06-01", priority: 0.9, changeFrequency: "monthly" },
  "/law-school-gpa-calculator": { lastMod: "2026-06-02", priority: 0.9, changeFrequency: "monthly" },
  "/about": { lastMod: "2026-06-02", priority: 0.5, changeFrequency: "yearly" },

  // Low-value legal pages
  "/contact": { lastMod: "2026-05-15", priority: 0.3, changeFrequency: "yearly" },
  "/privacy": { lastMod: "2026-05-15", priority: 0.3, changeFrequency: "yearly" },
  "/terms": { lastMod: "2026-05-15", priority: 0.3, changeFrequency: "yearly" },
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const buildDate = new Date();

  const staticEntries: MetadataRoute.Sitemap = Object.entries(ROUTES).map(
    ([path, meta]) => ({
      url: `${BASE}${path}`,
      lastModified: new Date(meta.lastMod),
      priority: meta.priority,
      changeFrequency: meta.changeFrequency,
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
      priority: 0.7 as Priority,
      changeFrequency: "weekly" as ChangeFreq,
    }));
  } catch {
    blogEntries = [];
  }

  const blogIndexEntry: MetadataRoute.Sitemap[number] = {
    url: `${BASE}/blog`,
    lastModified: latestPostDate,
    priority: 0.8,
    changeFrequency: "daily",
  };

  const gpaHub: MetadataRoute.Sitemap[number] = {
    url: `${BASE}/gpa`,
    lastModified: new Date("2026-06-01"),
    priority: 0.85,
    changeFrequency: "monthly",
  };
  const gpaScoreEntries: MetadataRoute.Sitemap = GPA_SCORE_DATA.map((d) => ({
    url: `${BASE}/gpa/${d.slug}`,
    lastModified: new Date("2026-06-01"),
    priority: 0.75 as Priority,
    changeFrequency: "monthly" as ChangeFreq,
  }));

  const uniHub: MetadataRoute.Sitemap[number] = {
    url: `${BASE}/university`,
    lastModified: new Date("2026-06-01"),
    priority: 0.85,
    changeFrequency: "monthly",
  };
  const uniEntries: MetadataRoute.Sitemap = UNIS.map((u) => ({
    url: `${BASE}/university/${u.slug}`,
    lastModified: new Date("2026-06-01"),
    priority: 0.75 as Priority,
    changeFrequency: "monthly" as ChangeFreq,
  }));

  return [
    ...staticEntries,
    gpaHub,
    ...gpaScoreEntries,
    uniHub,
    ...uniEntries,
    blogIndexEntry,
    ...blogEntries,
  ];
}
