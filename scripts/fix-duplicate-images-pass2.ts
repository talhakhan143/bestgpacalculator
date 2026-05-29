import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@libsql/client';

const BASE = 'https://images.unsplash.com/';
const PARAMS = '?auto=format&w=1200&q=70';

const updates: Record<string, string> = {
  'how-to-calculate-cumulative-gpa': 'photo-1457369804613-52c61a468e7d',
  'how-do-honors-classes-affect-gpa': 'photo-1551288049-bebda4e38f71',
  'academic-probation-gpa': 'photo-1588072432836-e10032774350',
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
