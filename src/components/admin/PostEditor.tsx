"use client";

import { useEffect, useState } from "react";
import { CoverImagePicker } from "./CoverImagePicker";
import { RichEditor } from "./RichEditor";

export interface PostEditorProps {
  /** The server action to handle submit */
  action: (formData: FormData) => void | Promise<void>;
  /** Hidden id field for edit mode */
  postId?: number;
  initial?: {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    coverImage?: string;
    tags?: string;
    emoji?: string;
    published?: boolean;
  };
  submitLabel: string;
  saved?: boolean;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 96);
}

export function PostEditor({
  action,
  postId,
  initial,
  submitLabel,
  saved,
}: PostEditorProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugDirty, setSlugDirty] = useState(Boolean(initial?.slug));
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? "");
  const [tags, setTags] = useState(initial?.tags ?? "");
  const [emoji, setEmoji] = useState(initial?.emoji ?? "");
  const [published, setPublished] = useState(initial?.published ?? false);

  useEffect(() => {
    if (!slugDirty) {
      setSlug(slugify(title));
    }
  }, [title, slugDirty]);

  const tagChips = tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <form action={action} className="space-y-6">
      {postId !== undefined && (
        <input type="hidden" name="id" value={postId} />
      )}

      {saved && (
        <div className="glass rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-700 dark:text-emerald-300">
          Saved.
        </div>
      )}

      {/* Title + slug + emoji */}
      <div className="glass rounded-2xl p-5">
        <label
          htmlFor="title"
          className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="A clear, search-friendly headline"
          className="glass-input w-full rounded-xl px-4 py-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100"
        />

        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_120px]">
          <div>
            <label
              htmlFor="slug"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400"
            >
              Slug (URL)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                /blog/
              </span>
              <input
                id="slug"
                name="slug"
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(slugify(e.target.value));
                  setSlugDirty(true);
                }}
                placeholder="auto-from-title"
                className="glass-input flex-1 rounded-lg px-3 py-2 font-mono text-sm text-zinc-900 dark:text-zinc-100"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="emoji"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400"
            >
              Hero icon
            </label>
            <input
              id="emoji"
              name="emoji"
              type="text"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value.slice(0, 4))}
              placeholder="🎓"
              className="glass-input w-full rounded-lg px-3 py-2 text-center text-xl text-zinc-900 dark:text-zinc-100"
            />
          </div>
        </div>
      </div>

      {/* Excerpt + tags */}
      <div className="glass rounded-2xl p-5">
        <label
          htmlFor="excerpt"
          className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400"
        >
          Excerpt — shown on blog index and meta description
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          maxLength={200}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="One or two sentences (max 200 chars)"
          className="glass-input w-full resize-none rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100"
        />
        <div className="mt-1 text-right text-[10px] text-zinc-500">
          {excerpt.length}/200
        </div>

        <label
          htmlFor="tags"
          className="mt-2 mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400"
        >
          Tags — comma separated (max 12)
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="weighted gpa, ap classes, college admissions"
          className="glass-input w-full rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100"
        />
        {tagChips.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tagChips.slice(0, 12).map((t, i) => (
              <span
                key={i}
                className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-700 dark:text-indigo-300"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Cover image picker (upload or AI generate) */}
      <div className="glass rounded-2xl p-5">
        <CoverImagePicker value={coverImage} onChange={setCoverImage} />
      </div>

      {/* Rich editor */}
      <input type="hidden" name="content" value={content} />
      <div className="glass overflow-hidden rounded-2xl">
        <RichEditor value={content} onChange={setContent} />
      </div>

      {/* Status + submit */}
      <div className="glass flex flex-wrap items-center gap-4 rounded-2xl p-5">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="publish"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="font-medium text-zinc-700 dark:text-zinc-300">
            Publish (visible on /blog)
          </span>
        </label>

        <div className="ml-auto flex items-center gap-3">
          <button type="submit" className="btn-primary">
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}

