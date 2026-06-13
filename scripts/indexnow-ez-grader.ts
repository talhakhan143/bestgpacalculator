import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { indexNowPing } from "../src/lib/indexnow";

const BASE = "https://bestgpacalculator.online";
const urls = [
  `${BASE}/ez-grader`,
  `${BASE}/sitemap.xml`,
  `${BASE}/`,
  `${BASE}/grade-calculator`,
];

(async () => {
  const r = await indexNowPing(urls);
  console.log(r.status, r.message, urls.length);
})();
