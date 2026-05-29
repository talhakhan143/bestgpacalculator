import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@libsql/client';

const targets = [
  { slug: 'what-is-gpa', keywords: ['stands for', 'grade point average', 'middle school'] },
  { slug: 'is-3-0-gpa-good', keywords: ['AP', 'weighted', 'Honors'] },
  { slug: 'how-many-as-to-raise-gpa', keywords: ['credit', 'weight', 'equal'] },
  { slug: 'weighted-vs-unweighted-gpa', keywords: ['Honors', '+0.5', 'bonus'] },
];

async function main() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });
  for (const t of targets) {
    const r = await client.execute({
      sql: 'SELECT content FROM posts WHERE slug = ? LIMIT 1',
      args: [t.slug],
    });
    if (!r.rows[0]) continue;
    const content = String(r.rows[0].content);
    console.log(`\n=== ${t.slug} ===`);
    for (const kw of t.keywords) {
      const idx = content.indexOf(kw);
      if (idx >= 0) {
        const snippet = content.slice(Math.max(0, idx - 30), idx + 80).replace(/\n/g, ' ');
        console.log(`  "${kw}" @ ${idx}: ...${snippet}...`);
      } else {
        console.log(`  "${kw}" NOT FOUND`);
      }
    }
  }
}
main().catch(e => { console.error(e); process.exit(1); });
