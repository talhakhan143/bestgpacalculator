import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://bestgpacalculator.vercel.app/sitemap.xml",
    host: "https://bestgpacalculator.vercel.app",
  };
}
