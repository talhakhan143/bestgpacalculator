/**
 * Replace duplicate cover_image URLs in Turso DB with unique, topic-relevant Unsplash photos.
 *
 * Usage: npx tsx scripts/fix-duplicate-images.ts
 */
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@libsql/client';

const BASE = 'https://images.unsplash.com/';
const PARAMS = '?auto=format&w=1200&q=70';

const updates: Record<string, string> = {
  // DUPE x6 (photo-1434030216411): keep how-many-as-to-raise-gpa, replace 5
  'how-weighted-gpa-works': 'photo-1581094794329-c8112a89af12',
  'recover-gpa-after-bad-semester': 'photo-1518133910546-b6c2fb7d79e3',
  'gpa-scale-explained': 'photo-1517694712202-14dd9538aa97',
  'how-to-raise-gpa': 'photo-1488190211105-8b0e65b80b4e',
  'is-3-0-gpa-good': 'photo-1620712943543-bcc4688e7485',

  // DUPE x3 (photo-1454165804606): keep percentage-to-gpa-conversion-chart, replace 2
  'how-to-calculate-cumulative-gpa': 'photo-1554224155-6726b3ff858f',
  'should-i-put-gpa-on-resume': 'photo-1586281380349-632531db7ed4',

  // DUPE x3 (photo-1571260899304): keep does-retaking-a-class-replace-gpa, replace 2
  'what-gpa-is-valedictorian': 'photo-1564981797816-1043664bf78d',
  'ivy-league-average-gpa': 'photo-1607237138185-eedd9c632b0b',

  // DUPE x2 (photo-1497633762265): keep does-summer-school-raise-gpa, replace 1
  'how-do-honors-classes-affect-gpa': 'photo-1481627834876-b7833e8f5570',

  // DUPE x3 (photo-1456513080510): keep 4-0-gpa-scale-explained, replace 2
  'academic-probation-gpa': 'photo-1606326608606-aa0b62935f2b',
  'letter-grade-to-gpa-conversion': 'photo-1503676260728-1c00da094a0b',
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

  console.log(`\nUpdated ${Object.keys(updates).length} posts.`);
}

main().catch(e => { console.error(e); process.exit(1); });
