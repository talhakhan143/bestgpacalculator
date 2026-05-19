import { desc, eq, and, sql } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import { marked } from "marked";

marked.setOptions({
  gfm: true,
  breaks: false,
});

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 96);
}

export async function ensureUniqueSlug(
  base: string,
  ignoreId?: number,
): Promise<string> {
  const stem = slugify(base) || "post";
  let slug = stem;
  let n = 2;
  while (true) {
    const existing = await db
      .select({ id: schema.posts.id })
      .from(schema.posts)
      .where(eq(schema.posts.slug, slug))
      .get();
    if (!existing || existing.id === ignoreId) return slug;
    slug = `${stem}-${n++}`;
    if (n > 200) return `${stem}-${Date.now()}`;
  }
}

export async function listPublishedPosts() {
  return await db
    .select()
    .from(schema.posts)
    .where(eq(schema.posts.published, true))
    .orderBy(desc(schema.posts.publishedAt))
    .all();
}

export async function getPublishedPostBySlug(slug: string) {
  return await db
    .select()
    .from(schema.posts)
    .where(and(eq(schema.posts.slug, slug), eq(schema.posts.published, true)))
    .get();
}

export async function listAllPosts() {
  return await db
    .select()
    .from(schema.posts)
    .orderBy(desc(schema.posts.updatedAt))
    .all();
}

export async function getPostById(id: number) {
  return await db
    .select()
    .from(schema.posts)
    .where(eq(schema.posts.id, id))
    .get();
}

export async function deletePost(id: number) {
  return await db.delete(schema.posts).where(eq(schema.posts.id, id)).run();
}

export async function countPosts() {
  const r = await db
    .select({ count: sql<number>`count(*)` })
    .from(schema.posts)
    .get();
  return r?.count ?? 0;
}

export async function renderMarkdown(md: string): Promise<string> {
  return marked.parse(md) as Promise<string> | string as string;
}

export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

export async function renderArticle(
  content: string,
): Promise<{ html: string; toc: TocEntry[] }> {
  const trimmed = (content ?? "").trim();
  const looksLikeHtml = trimmed.startsWith("<");
  let html = looksLikeHtml ? trimmed : ((await marked.parse(trimmed)) as string);

  const toc: TocEntry[] = [];
  const seen = new Set<string>();

  html = html.replace(
    /<(h[23])([^>]*)>([\s\S]*?)<\/\1>/g,
    (_match, tag: string, existingAttrs: string, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      if (!text) return `<${tag}${existingAttrs}>${inner}</${tag}>`;

      let id = slugify(text);
      let n = 2;
      while (seen.has(id)) id = `${slugify(text)}-${n++}`;
      seen.add(id);

      toc.push({
        id,
        text,
        level: tag === "h2" ? 2 : 3,
      });

      const idAttrRe = /\sid="[^"]*"/;
      const cleanedAttrs = existingAttrs.replace(idAttrRe, "");
      return `<${tag}${cleanedAttrs} id="${id}">${inner}</${tag}>`;
    },
  );

  return { html, toc };
}

export function parseTags(raw: string | null | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0)
    .slice(0, 12);
}

export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
