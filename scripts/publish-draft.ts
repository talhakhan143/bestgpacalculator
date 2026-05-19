/**
 * Publish a draft .md file from content/drafts/ directly to the Turso DB.
 *
 * Usage:  npm run publish content/drafts/day-01-what-is-gpa.md
 */
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { createClient } from "@libsql/client";

async function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error("Usage: npm run publish <path-to-draft.md>");
    process.exit(1);
  }
  const filePath = path.resolve(arg);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const url = process.env.TURSO_DATABASE_URL!;
  const authToken = process.env.TURSO_AUTH_TOKEN!;
  const client = createClient({ url, authToken });

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fields = (data["admin-fields"] ?? {}) as Record<string, unknown>;

  const slug = String(fields.slug ?? "");
  const title = String(fields.title ?? "");
  if (!slug || !title) {
    console.error("Draft missing slug or title in admin-fields frontmatter.");
    process.exit(1);
  }
  const excerpt = String(fields.excerpt ?? "");
  const tags = String(fields.tags ?? "");
  const emoji = String(fields.emoji ?? "");
  const coverImage = String(fields.coverImage ?? "");
  const publish = fields.publish !== false;

  const now = Math.floor(Date.now() / 1000);

  // Find admin user id
  const adminRow = await client.execute({
    sql: "SELECT id FROM users ORDER BY id LIMIT 1",
    args: [],
  });
  const authorId = adminRow.rows[0]?.id as number | undefined;
  if (!authorId) {
    console.error("No admin user in DB. Run `npm run db:setup` first.");
    process.exit(1);
  }

  // Upsert by slug
  const existing = await client.execute({
    sql: "SELECT id FROM posts WHERE slug = ? LIMIT 1",
    args: [slug],
  });

  if (existing.rows[0]) {
    const id = existing.rows[0].id as number;
    await client.execute({
      sql: `UPDATE posts SET
        title = ?, excerpt = ?, content = ?, cover_image = ?, tags = ?, emoji = ?,
        published = ?, published_at = COALESCE(published_at, ?),
        updated_at = ?
        WHERE id = ?`,
      args: [
        title, excerpt, content.trim(), coverImage || null, tags, emoji || null,
        publish ? 1 : 0, publish ? now : null, now, id,
      ],
    });
    console.log(`✓ Updated post #${id} (/blog/${slug})`);
  } else {
    const res = await client.execute({
      sql: `INSERT INTO posts (slug, title, excerpt, content, cover_image, tags, emoji,
        published, published_at, author_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        slug, title, excerpt, content.trim(), coverImage || null, tags, emoji || null,
        publish ? 1 : 0, publish ? now : null, authorId, now, now,
      ],
    });
    console.log(`✓ Inserted post #${res.lastInsertRowid} (/blog/${slug})`);
  }

  // Show live count
  const cnt = await client.execute("SELECT COUNT(*) as c FROM posts WHERE published = 1");
  console.log(`Total published posts: ${cnt.rows[0]?.c}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("✗ publish failed:", e);
    process.exit(1);
  });
