import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

marked.setOptions({
  gfm: true,
  breaks: false,
});

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  tags: string;
  emoji: string | null;
  published: boolean;
  publishedAt: Date | null;
  updatedAt: Date | null;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 96);
}

function safeReadDir(dir: string): string[] {
  try {
    return fs.readdirSync(dir);
  } catch {
    return [];
  }
}

function parseFile(filename: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, filename);
  let raw: string;
  try {
    raw = fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
  const { data, content } = matter(raw);
  const slugFromName = filename.replace(/\.(md|mdx)$/i, "");
  const slug = typeof data.slug === "string" && data.slug.length > 0 ? data.slug : slugFromName;

  const published = data.published !== false;
  const publishedAtRaw = data.publishedAt ?? data.date ?? null;
  const updatedAtRaw = data.updatedAt ?? data.updated ?? publishedAtRaw;

  return {
    slug,
    title: String(data.title ?? slug),
    excerpt: String(data.excerpt ?? data.description ?? ""),
    content,
    coverImage: data.coverImage ? String(data.coverImage) : data.cover ? String(data.cover) : null,
    tags: Array.isArray(data.tags) ? data.tags.join(", ") : String(data.tags ?? ""),
    emoji: data.emoji ? String(data.emoji) : null,
    published,
    publishedAt: publishedAtRaw ? new Date(publishedAtRaw) : null,
    updatedAt: updatedAtRaw ? new Date(updatedAtRaw) : null,
  };
}

function loadAllPosts(): BlogPost[] {
  return safeReadDir(CONTENT_DIR)
    .filter((f) => /\.(md|mdx)$/i.test(f))
    .map(parseFile)
    .filter((p): p is BlogPost => p !== null);
}

export function listPublishedPosts(): BlogPost[] {
  return loadAllPosts()
    .filter((p) => p.published)
    .sort((a, b) => {
      const ta = a.publishedAt?.getTime() ?? 0;
      const tb = b.publishedAt?.getTime() ?? 0;
      return tb - ta;
    });
}

export function getPublishedPostBySlug(slug: string): BlogPost | undefined {
  return listPublishedPosts().find((p) => p.slug === slug);
}

export function listAllSlugs(): string[] {
  return loadAllPosts()
    .filter((p) => p.published)
    .map((p) => p.slug);
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
