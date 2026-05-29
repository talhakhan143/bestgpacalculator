import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@libsql/client';

const BASE = 'https://images.unsplash.com/';
const PARAMS = '?auto=format&w=1200&q=70';

const updates: Record<string, string> = {
  'letter-grade-to-gpa-conversion': 'photo-1554224154-26032ffc0d07',
};

async function main() {
  const url = process.env.TURSO_DATABASE_URL!;
  const authToken = process.env.TURSO_AUTH_TOKEN!;
  const client = createClient({ url, authToken });
  for (const [slug, photoId] of Object.entries(updates)) {
    const newImage = `${BASE}${photoId}${PARAMS}`;
    const result = await client.execute({
      sql: 'UPDATE posts SET cover_image = ?, updated_at = ? WHERE slug = ?',
      args: [newImage, Math.floor(Date.now() / 1000), slug],
    });
    console.log(`✓ ${slug} → ${photoId} (rows: ${result.rowsAffected})`);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
