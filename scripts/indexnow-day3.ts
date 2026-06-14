import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { indexNowPing } from "../src/lib/indexnow";

const BASE = "https://bestgpacalculator.online";
const urls = [
  `${BASE}/cgpa-to-percentage-calculator`,
  `${BASE}/blog/cgpa-to-percentage-conversion-guide`,
  `${BASE}/sitemap.xml`,
  `${BASE}/`,
  `${BASE}/gpa-to-percentage-calculator`,
  `${BASE}/percentage-to-gpa-calculator`,
  `${BASE}/cumulative-gpa-calculator`,
];

(async () => {
  const r = await indexNowPing(urls);
  console.log(r.status, r.message, urls.length);
})();
