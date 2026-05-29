import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@libsql/client';

const CALCULATORS = [
  '/weighted-gpa-calculator','/unweighted-gpa-calculator','/high-school-gpa-calculator',
  '/college-gpa-calculator','/middle-school-gpa-calculator','/cumulative-gpa-calculator',
  '/semester-gpa-calculator','/current-gpa-calculator','/ap-gpa-calculator',
  '/honors-gpa-calculator','/percentage-to-gpa-calculator','/gpa-calculator-without-credits',
  '/ap-score-to-gpa-calculator','/gpa-goal-calculator'
];

async function main() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });
  const rows = await client.execute('SELECT slug, content FROM posts WHERE published = 1');
  const count: Record<string, number> = {};
  const slugsWithLink: Record<string, string[]> = {};
  for (const c of CALCULATORS) {
    count[c] = 0;
    slugsWithLink[c] = [];
  }
  for (const r of rows.rows) {
    const slug = String(r.slug);
    const content = String(r.content);
    for (const c of CALCULATORS) {
      // markdown link: [text](/calculator-slug) or absolute URL
      const re = new RegExp(`\\]\\(${c.replace(/\//g, '\\/')}\\)`, 'g');
      const matches = content.match(re);
      if (matches) {
        count[c] += matches.length;
        slugsWithLink[c].push(slug);
      }
    }
  }
  const sorted = Object.entries(count).sort((a, b) => a[1] - b[1]);
  console.log('Internal link count: blog posts → calculator pages');
  console.log('(sorted weakest → strongest)\n');
  for (const [c, n] of sorted) {
    console.log(`  ${n.toString().padStart(3)} : ${c}`);
    if (n > 0 && n <= 3) {
      console.log(`        from: ${slugsWithLink[c].join(', ')}`);
    }
  }
  console.log(`\nTotal blog posts checked: ${rows.rows.length}`);
}
main().catch(e => { console.error(e); process.exit(1); });
