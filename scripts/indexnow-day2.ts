import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { indexNowPing } from "../src/lib/indexnow";

const BASE = "https://bestgpacalculator.online";
const urls = [
  `${BASE}/letter-grade-to-gpa-converter`,
  `${BASE}/sitemap.xml`,
  `${BASE}/`,
  `${BASE}/weighted-gpa-calculator`,
  `${BASE}/percentage-to-gpa-calculator`,
];

(async () => {
  const r = await indexNowPing(urls);
  console.log(r.status, r.message, urls.length);
})();
