import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@libsql/client';

const slugs = [
  'what-gpa-is-valedictorian',
  'does-summer-school-raise-gpa',
  'does-retaking-a-class-replace-gpa',
  'nhs-gpa-requirements',
  'how-do-honors-classes-affect-gpa',
];

async function main() {
  const url = process.env.TURSO_DATABASE_URL!;
  const authToken = process.env.TURSO_AUTH_TOKEN!;
  const client = createClient({ url, authToken });
  for (const slug of slugs) {
    const r = await client.execute({
      sql: 'SELECT slug, title, excerpt FROM posts WHERE slug = ?',
      args: [slug],
    });
    if (r.rows[0]) {
      console.log(`---${slug}---`);
      console.log(`TITLE: ${r.rows[0].title}`);
      console.log(`EXCERPT: ${r.rows[0].excerpt}`);
      console.log();
    }
  }
}
main().catch(e => { console.error(e); process.exit(1); });
