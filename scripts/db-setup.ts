/**
 * One-shot DB bootstrap: creates tables (CREATE TABLE IF NOT EXISTS)
 * and seeds an admin user from env vars.
 *
 * Run with: npm run db:setup
 *
 * Required env (or .env.local):
 *   TURSO_DATABASE_URL=libsql://...
 *   TURSO_AUTH_TOKEN=...
 *   ADMIN_EMAIL=you@example.com
 *   ADMIN_PASSWORD=your-strong-password
 */
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { users } from "../src/lib/db/schema";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url) {
  console.error("✗ TURSO_DATABASE_URL is missing. Set it in .env.local.");
  process.exit(1);
}

const client = createClient({ url, authToken });

async function main() {
  await client.executeMultiple(`
    CREATE TABLE IF NOT EXISTS users (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      email         TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      name          TEXT NOT NULL DEFAULT 'Admin',
      created_at    INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS posts (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      slug          TEXT NOT NULL UNIQUE,
      title         TEXT NOT NULL,
      excerpt       TEXT NOT NULL DEFAULT '',
      content       TEXT NOT NULL DEFAULT '',
      cover_image   TEXT,
      tags          TEXT NOT NULL DEFAULT '',
      emoji         TEXT,
      published     INTEGER NOT NULL DEFAULT 0,
      published_at  INTEGER,
      author_id     INTEGER REFERENCES users(id),
      created_at    INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at    INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE INDEX IF NOT EXISTS idx_posts_published ON posts (published, published_at);
  `);

  console.log("✓ Schema ensured on Turso DB");

  const db = drizzle(client);

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.log(
      "⚠ ADMIN_EMAIL or ADMIN_PASSWORD not set — skipping admin seed.\n" +
        "  Set them in .env.local and re-run `npm run db:setup`.",
    );
    return;
  }

  const existing = await db.select().from(users).where(eq(users.email, email)).get();
  const passwordHash = bcrypt.hashSync(password, 12);
  if (existing) {
    await db.update(users).set({ passwordHash }).where(eq(users.email, email)).run();
    console.log(`✓ Admin password updated for ${email}`);
  } else {
    await db.insert(users).values({ email, passwordHash, name: "Admin" }).run();
    console.log(`✓ Admin user created: ${email}`);
  }
}

main()
  .then(() => {
    console.log("Done.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("✗ db-setup failed:", err);
    process.exit(1);
  });
