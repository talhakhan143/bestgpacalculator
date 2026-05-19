import { createClient, type Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

declare global {
  // eslint-disable-next-line no-var
  var __libsql: Client | undefined;
  // eslint-disable-next-line no-var
  var __drizzleDb: ReturnType<typeof drizzle> | undefined;
}

function getClient(): Client {
  if (globalThis.__libsql) return globalThis.__libsql;
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url) {
    throw new Error(
      "TURSO_DATABASE_URL is missing. Set it in .env.local (and Vercel env vars).",
    );
  }
  const c = createClient({ url, authToken });
  if (process.env.NODE_ENV !== "production") {
    globalThis.__libsql = c;
  }
  return c;
}

function getDb() {
  if (globalThis.__drizzleDb) return globalThis.__drizzleDb;
  const instance = drizzle(getClient(), { schema });
  if (process.env.NODE_ENV !== "production") {
    globalThis.__drizzleDb = instance;
  }
  return instance;
}

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop) {
    const real = getDb() as unknown as Record<string | symbol, unknown>;
    const value = real[prop];
    return typeof value === "function" ? (value as Function).bind(real) : value;
  },
}) as ReturnType<typeof drizzle>;

export { schema };
