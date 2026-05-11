/**
 * One-shot DB bootstrap: creates tables (CREATE TABLE IF NOT EXISTS)
 * and seeds an admin user from env vars.
 *
 * Run with: npm run db:setup
 *
 * Required env (or .env.local):
 *   ADMIN_EMAIL=you@example.com
 *   ADMIN_PASSWORD=your-strong-password
 */
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config(); // fallback to .env
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import path from "node:path";
import fs from "node:fs";
import { users } from "../src/lib/db/schema";

const DB_PATH =
  process.env.DATABASE_URL?.replace(/^file:/, "") ??
  path.join(process.cwd(), "data", "blog.db");

const dir = path.dirname(DB_PATH);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const sqlite = new Database(DB_PATH);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

// Inline migration — keeps things simple. Drizzle Kit can take over later.
sqlite.exec(`
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

// Idempotent column adds — for existing DBs that pre-date these columns.
function tryAddColumn(name: string, ddl: string) {
  try {
    sqlite.exec(`ALTER TABLE posts ADD COLUMN ${name} ${ddl};`);
  } catch (e) {
    const msg = (e as Error).message;
    if (!msg.includes("duplicate column name")) throw e;
  }
}
tryAddColumn("tags", "TEXT NOT NULL DEFAULT ''");
tryAddColumn("emoji", "TEXT");

console.log(`✓ Schema ensured at ${DB_PATH}`);

const db = drizzle(sqlite);

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.log(
    "⚠ ADMIN_EMAIL or ADMIN_PASSWORD not set — skipping admin seed.\n" +
      "  Set them in .env.local and re-run `npm run db:setup`.",
  );
} else {
  const existing = db.select().from(users).where(eq(users.email, email)).get();
  const passwordHash = bcrypt.hashSync(password, 12);
  if (existing) {
    db.update(users).set({ passwordHash }).where(eq(users.email, email)).run();
    console.log(`✓ Admin password updated for ${email}`);
  } else {
    db.insert(users)
      .values({ email, passwordHash, name: "Admin" })
      .run();
    console.log(`✓ Admin user created: ${email}`);
  }
}

sqlite.close();
console.log("Done.");
