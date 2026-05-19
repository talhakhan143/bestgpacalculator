"use client";

import { deletePostAction } from "@/app/admin/actions";

export function DeletePostButton({
  id,
  title,
  variant = "ghost",
}: {
  id: number;
  title: string;
  variant?: "ghost" | "solid";
}) {
  const className =
    variant === "solid"
      ? "rounded-full bg-red-500/10 px-4 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-500/20 dark:text-red-400"
      : "rounded-full px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/15";

  return (
    <form action={deletePostAction}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className={className}
        onClick={(e) => {
          if (!confirm(`Delete "${title}"?`)) e.preventDefault();
        }}
      >
        Delete
      </button>
    </form>
  );
}
