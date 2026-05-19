"use client";

import { useRef, useState, useTransition } from "react";
import {
  generateImageAction,
  uploadImageAction,
} from "@/app/admin/actions";

export function CoverImagePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [aiOpen, setAiOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [pending, startTransition] = useTransition();

  function pickFile() {
    fileRef.current?.click();
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    const fd = new FormData();
    fd.set("file", file);
    startTransition(async () => {
      const res = await uploadImageAction(fd);
      if (res.error) setError(res.error);
      else if (res.url) onChange(res.url);
    });
    // reset input so same-file re-select fires change
    e.target.value = "";
  }

  function onAiSubmit() {
    setError(null);
    if (!prompt.trim()) {
      setError("Enter a prompt first");
      return;
    }
    const fd = new FormData();
    fd.set("prompt", prompt);
    startTransition(async () => {
      const res = await generateImageAction(fd);
      if (res.error) {
        setError(res.error);
      } else if (res.url) {
        onChange(res.url);
        setAiOpen(false);
        setPrompt("");
      }
    });
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
          Cover image
        </span>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs font-semibold text-red-600 transition hover:text-red-700 dark:text-red-400"
          >
            Remove
          </button>
        )}
      </div>

      {/* Hidden form field that submits with the post form */}
      <input type="hidden" name="coverImage" value={value} />

      {/* Preview slot */}
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className="mb-3 aspect-[16/9] w-full rounded-xl object-cover"
        />
      ) : (
        <div className="mb-3 grid aspect-[16/9] w-full place-items-center rounded-xl border-2 border-dashed border-white/40 bg-white/30 text-zinc-500 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-zinc-500">
          <div className="text-center text-xs">
            <p>No cover image</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.14em]">
              Upload or generate one below
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={pickFile}
          disabled={pending}
          className="btn-glass !px-4 !py-2 !text-xs disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Working…" : value ? "Replace upload" : "Upload image"}
        </button>
        <button
          type="button"
          onClick={() => setAiOpen((v) => !v)}
          disabled={pending}
          className="btn-glass !px-4 !py-2 !text-xs disabled:cursor-not-allowed disabled:opacity-60"
        >
          {aiOpen ? "Cancel AI" : "Generate with AI"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={onFileChange}
          className="hidden"
        />
      </div>

      {aiOpen && (
        <div className="glass mt-3 rounded-xl p-3">
          <label
            htmlFor="ai-prompt"
            className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400"
          >
            Image prompt
          </label>
          <textarea
            id="ai-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={2}
            placeholder='e.g. "A modern flat illustration of a student calculating GPA on a laptop, indigo and pink gradient background"'
            className="glass-input w-full resize-none rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 dark:text-zinc-500">
              Uses OpenAI Images API · 5–15s · saves locally
            </span>
            <button
              type="button"
              onClick={onAiSubmit}
              disabled={pending || !prompt.trim()}
              className="btn-primary !px-4 !py-1.5 !text-xs disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Generating…" : "Generate"}
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
