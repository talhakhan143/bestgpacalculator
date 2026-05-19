import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://bestgpacalculator.online/sitemap.xml",
    host: "https://bestgpacalculator.online",
  };
}
