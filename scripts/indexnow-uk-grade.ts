import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { indexNowPing } from "../src/lib/indexnow";

const BASE = "https://bestgpacalculator.online";
const urls = [
  `${BASE}/uk-grade-to-gpa-converter`,
  `${BASE}/blog/uk-degree-class-to-us-gpa`,
  `${BASE}/sitemap.xml`,
  `${BASE}/`,
  `${BASE}/cgpa-to-percentage-calculator`,
  `${BASE}/letter-grade-to-gpa-converter`,
  `${BASE}/gpa-scale`,
];

(async () => {
  const r = await indexNowPing(urls);
  console.log(r.status, r.message, urls.length);
})();
