/**
 * Inject orphan calculator links into existing blog posts.
 *
 * Target orphans (0-1 inbound links):
 * - /middle-school-gpa-calculator
 * - /ap-score-to-gpa-calculator
 * - /ap-gpa-calculator (1 link)
 * - /gpa-calculator-without-credits (1 link)
 * - /honors-gpa-calculator (2 links)
 *
 * Strategy: Append a "Calculate yours" paragraph at end of content if not already present.
 * Targets 5 different blog posts (one per orphan) — natural topical match.
 *
 * Usage: npx tsx scripts/inject-calculator-links.ts
 */
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@libsql/client';

interface Inject {
  slug: string;          // blog post to modify
  calcLink: string;      // relative URL to inject
  searchAnchor: string;  // marker to find for insertion (must be unique in post)
  inject: string;        // markdown paragraph to insert AFTER searchAnchor
}

const injections: Inject[] = [
  // /middle-school-gpa-calculator (0 links) → what-is-gpa (basic GPA explainer)
  {
    slug: 'what-is-gpa',
    calcLink: '/middle-school-gpa-calculator',
    searchAnchor: 'GPA stands for "grade point average"',
    inject: '\n\nIf you\'re in middle school and your school reports a GPA, you can [calculate yours on the 4.0 scale here](/middle-school-gpa-calculator) — same math as high school, just fewer classes.',
  },
  // /ap-score-to-gpa-calculator (0 links) → gpa-scale-explained
  {
    slug: 'gpa-scale-explained',
    calcLink: '/ap-score-to-gpa-calculator',
    searchAnchor: 'AP / IB / Dual Enrollment',
    inject: '\n\nIf you\'ve already taken an AP exam and want to estimate what that score does to your GPA (especially for honor-roll calculations), use the [AP score to GPA calculator](/ap-score-to-gpa-calculator) to see the conversion.',
  },
  // /ap-gpa-calculator (1 link) → is-3-0-gpa-good (covers AP weighting context)
  {
    slug: 'is-3-0-gpa-good',
    calcLink: '/ap-gpa-calculator',
    searchAnchor: 'AP/Honors-heavy schedules',
    inject: '\n\nIf you have AP classes on your transcript and want to see the weighted lift, the [AP GPA calculator](/ap-gpa-calculator) handles the +1.0 bonus automatically.',
  },
  // /gpa-calculator-without-credits (1 link) → how-many-as-to-raise-gpa
  {
    slug: 'how-many-as-to-raise-gpa',
    calcLink: '/gpa-calculator-without-credits',
    searchAnchor: 'equal-credit',
    inject: '\n\nIf your school doesn\'t use credit weighting (common in middle school and some high schools), the [GPA calculator without credits](/gpa-calculator-without-credits) treats every class the same.',
  },
  // /honors-gpa-calculator (2 links) → weighted-vs-unweighted-gpa
  {
    slug: 'weighted-vs-unweighted-gpa',
    calcLink: '/honors-gpa-calculator',
    searchAnchor: 'Honors classes typically',
    inject: '\n\nFor a quick Honors-only calculation (without AP or IB in the mix), the [Honors GPA calculator](/honors-gpa-calculator) applies the +0.5 bonus on the 4.0 base.',
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

    // Skip if already contains the calc link
    if (content.includes(`](${inj.calcLink})`)) {
      console.log(`skip ${inj.slug}: ${inj.calcLink} already linked`);
      continue;
    }

    // Find anchor
    const idx = content.indexOf(inj.searchAnchor);
    if (idx === -1) {
      console.log(`✗ ${inj.slug}: anchor "${inj.searchAnchor}" not found`);
      continue;
    }

    // Insert AFTER the end of the paragraph containing the anchor
    // (i.e., at the next double-newline after the anchor)
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
