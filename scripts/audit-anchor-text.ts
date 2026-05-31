import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@libsql/client';

async function main() {
  const c = createClient({ url: process.env.TURSO_DATABASE_URL!, authToken: process.env.TURSO_AUTH_TOKEN! });
  const rows = await c.execute('SELECT slug, content FROM posts WHERE published = 1');
  const anchors: Record<string, number> = {};
  for (const r of rows.rows) {
    const content = String(r.content);
    const re = /\[([^\]]+)\]\(\/([a-z-]+-calculator)\)/g;
    let m;
    while ((m = re.exec(content)) !== null) {
      const a = m[1].toLowerCase();
      anchors[a] = (anchors[a] || 0) + 1;
    }
  }
  const sorted = Object.entries(anchors).sort((a, b) => b[1] - a[1]);
  console.log('Anchor text frequency (calc links):');
  for (const [a, n] of sorted.slice(0, 30)) console.log(`  ${n.toString().padStart(2)}: ${a}`);
}
main().catch(e => { console.error(e); process.exit(1); });
