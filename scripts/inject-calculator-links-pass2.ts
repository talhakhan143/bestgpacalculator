import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@libsql/client';

interface Inject {
  slug: string;
  calcLink: string;
  searchAnchor: string;
  inject: string;
}

const injections: Inject[] = [
  {
    slug: 'what-is-gpa',
    calcLink: '/middle-school-gpa-calculator',
    searchAnchor: '(common in middle school and some smaller high schools)',
    inject: '\n\nFor middle school students whose schools report a GPA, the [middle school GPA calculator](/middle-school-gpa-calculator) uses the same 4.0 scale, just over fewer classes.',
  },
  {
    slug: 'is-3-0-gpa-good',
    calcLink: '/ap-gpa-calculator',
    searchAnchor: '3.0 weighted means a B average with some honors/AP adjustment baked in',
    inject: '\n\nIf you have AP classes on your transcript and want to see the weighted lift on your 3.0, the [AP GPA calculator](/ap-gpa-calculator) applies the +1.0 bonus automatically.',
  },
  {
    slug: 'how-many-as-to-raise-gpa',
    calcLink: '/gpa-calculator-without-credits',
    searchAnchor: "It's a weighted average of your **grade points**",
    inject: '\n\nIf your school doesn\'t use credit weighting (some middle and high schools treat every class equally), the [GPA calculator without credits](/gpa-calculator-without-credits) handles the equal-weight math.',
  },
  {
    slug: 'weighted-vs-unweighted-gpa',
    calcLink: '/honors-gpa-calculator',
    searchAnchor: 'Weighted GPA adds bonus points for AP, Honors, IB, and dual-enrollment courses',
    inject: '\n\nFor a quick Honors-only calculation (no AP or IB in the mix), the [Honors GPA calculator](/honors-gpa-calculator) applies the +0.5 bonus on top of the 4.0 base.',
  },
];

async function main() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });

  for (const inj of injections) {
    const row = await client.execute({
      sql: 'SELECT content FROM posts WHERE slug = ? LIMIT 1',
      args: [inj.slug],
    });
    if (!row.rows[0]) {
      console.log(`✗ ${inj.slug}: not found`);
      continue;
    }
    const content = String(row.rows[0].content);
    if (content.includes(`](${inj.calcLink})`)) {
      console.log(`skip ${inj.slug}: ${inj.calcLink} already linked`);
      continue;
    }
    const idx = content.indexOf(inj.searchAnchor);
    if (idx === -1) {
      console.log(`✗ ${inj.slug}: anchor not found`);
      continue;
    }
    const insertAfter = content.indexOf('\n\n', idx);
    if (insertAfter === -1) {
      console.log(`✗ ${inj.slug}: no paragraph break after anchor`);
      continue;
    }
    const newContent =
      content.slice(0, insertAfter) +
      inj.inject +
      content.slice(insertAfter);
    await client.execute({
      sql: 'UPDATE posts SET content = ?, updated_at = ? WHERE slug = ?',
      args: [newContent, Math.floor(Date.now() / 1000), inj.slug],
    });
    console.log(`✓ ${inj.slug} ← ${inj.calcLink}`);
  }
}
main().catch(e => { console.error(e); process.exit(1); });
