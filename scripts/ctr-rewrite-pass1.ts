/**
 * CTR-optimized title + meta rewrite for top-5 GSC-impressioned pages.
 * Targets: pages with 0.2-0.5% CTR at avg pos 7-13 (page 1-2).
 *
 * Rules: <60 char titles, front-load keyword + number/answer, specific curiosity gap.
 *
 * Usage: npx tsx scripts/ctr-rewrite-pass1.ts
 */
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@libsql/client';

interface Update {
  slug: string;
  title: string;
  excerpt: string;
}

const updates: Update[] = [
  {
    slug: 'what-gpa-is-valedictorian',
    title: 'Valedictorian GPA Requirements: 4.5+ Weighted at Top Schools',
    excerpt: "Most schools require the highest weighted GPA in the senior class — typically 4.5+ at competitive high schools. Here's how to find your school's exact cutoff.",
  },
  {
    slug: 'does-summer-school-raise-gpa',
    title: 'Does Summer School Raise Your GPA? Honest Answer + Math',
    excerpt: "Yes, summer school can raise your GPA — but only if your school's grade-replacement policy allows it. Here's the math and what to ask your counselor first.",
  },
  {
    slug: 'does-retaking-a-class-replace-gpa',
    title: 'Retaking a Class: Does It Actually Replace Your GPA?',
    excerpt: "High school: usually replaces the failing grade. College: most schools average both. Here's the exact rule at the 6 most common school types.",
  },
  {
    slug: 'nhs-gpa-requirements',
    title: 'NHS GPA Requirements: 3.0 Minimum (Real Cutoff Higher)',
    excerpt: "NHS sets a national 3.0 unweighted minimum — but most chapters use 3.5+ in practice. Here's how to find your school's real cutoff and the 4 other requirements.",
  },
  {
    slug: 'how-do-honors-classes-affect-gpa',
    title: 'How Honors Classes Affect Your GPA: +0.5 Weighted Boost',
    excerpt: "Most US high schools add +0.5 for Honors (A = 4.5 instead of 4.0). The lift is real but smaller than AP's +1.0. Exact math + which colleges count it.",
  },
];

async function main() {
  const url = process.env.TURSO_DATABASE_URL!;
  const authToken = process.env.TURSO_AUTH_TOKEN!;
  const client = createClient({ url, authToken });

  for (const u of updates) {
    const result = await client.execute({
      sql: 'UPDATE posts SET title = ?, excerpt = ?, updated_at = ? WHERE slug = ?',
      args: [u.title, u.excerpt, Math.floor(Date.now() / 1000), u.slug],
    });
    console.log(`✓ ${u.slug}`);
    console.log(`  title: ${u.title} (${u.title.length} chars)`);
    console.log(`  excerpt: ${u.excerpt.length} chars`);
    console.log(`  rows affected: ${result.rowsAffected}`);
    console.log();
  }
}

main().catch(e => { console.error(e); process.exit(1); });
