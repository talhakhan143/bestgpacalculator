/**
 * Pass 3: boost remaining low-inbound calculator pages to 3+ links each.
 * - /middle-school-gpa-calculator (1 → 3)
 * - /ap-score-to-gpa-calculator (1 → 3)
 * - /ap-gpa-calculator (2 → 3)
 * - /gpa-calculator-without-credits (2 → 3)
 */
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
  // middle-school: add to NCAA + good-gpa-in-high-school
  {
    slug: 'what-is-a-good-gpa-in-high-school',
    calcLink: '/middle-school-gpa-calculator',
    searchAnchor: 'high school GPA',
    inject: '\n\nIf you\'re still in middle school and your school reports a GPA, the [middle school GPA calculator](/middle-school-gpa-calculator) uses the same 4.0 scale — handy for tracking before high school.',
  },
  // ap-score-to-gpa: add to ivy-league-gpa-requirements (Ivy schools care about AP scores)
  {
    slug: 'ivy-league-gpa-requirements',
    calcLink: '/ap-score-to-gpa-calculator',
    searchAnchor: 'AP',
    inject: '\n\nFor AP-heavy applicants, the [AP score to GPA calculator](/ap-score-to-gpa-calculator) shows how exam scores typically translate to grade-point equivalents on different scales.',
  },
  // ap-gpa-calculator: add to ivy-league-gpa-requirements
  {
    slug: 'ivy-league-average-gpa',
    calcLink: '/ap-gpa-calculator',
    searchAnchor: 'AP',
    inject: '\n\nIf you\'re running the numbers on your own AP-heavy schedule, the [AP GPA calculator](/ap-gpa-calculator) applies the standard +1.0 bonus across the 4.0 base.',
  },
  // gpa-calculator-without-credits: add to nhs-gpa-requirements (some schools don\'t weight)
  {
    slug: 'nhs-gpa-requirements',
    calcLink: '/gpa-calculator-without-credits',
    searchAnchor: 'NHS',
    inject: '\n\nIf your school doesn\'t use credit weighting, the [GPA calculator without credits](/gpa-calculator-without-credits) treats every class equally — useful when verifying your unweighted average against the NHS minimum.',
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
