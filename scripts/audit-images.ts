import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@libsql/client';

async function main() {
  const url = process.env.TURSO_DATABASE_URL!;
  const authToken = process.env.TURSO_AUTH_TOKEN!;
  const client = createClient({ url, authToken });
  const rows = await client.execute('SELECT slug, cover_image FROM posts WHERE published = 1 ORDER BY id');
  const map = new Map<string, string[]>();
  for (const r of rows.rows) {
    const slug = String(r.slug);
    const img = String(r.cover_image || 'NONE');
    const key = img.split('?')[0].split('/').pop() || img;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(slug);
  }
  let dupes = 0;
  for (const [key, slugs] of map.entries()) {
    if (slugs.length > 1) {
      dupes++;
      console.log(`DUPE x${slugs.length}: ${key}`);
      for (const s of slugs) console.log(`   - ${s}`);
    }
  }
  console.log(`---total posts: ${rows.rows.length}, unique images: ${map.size}, duplicates: ${dupes}`);
}
main().catch(e => { console.error(e); process.exit(1); });
