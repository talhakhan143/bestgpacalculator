import Link from "next/link";
import { listAllPosts } from "@/lib/blog";
import { DeletePostButton } from "@/components/admin/DeletePostButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const posts = await listAllPosts();
  const published = posts.filter((p) => p.published).length;
  const drafts = posts.length - published;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Posts
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {posts.length} total · {published} published · {drafts} draft
            {drafts === 1 ? "" : "s"}
          </p>
        </div>
        <Link href="/admin/posts/new" className="btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="glass overflow-hidden rounded-2xl">
          <ul className="divide-y divide-white/30 dark:divide-white/[0.06]">
            {posts.map((p) => (
              <li
                key={p.id}
                className="flex flex-wrap items-center gap-4 p-4 sm:p-5"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      {p.title}
                    </h2>
                    {p.published ? (
                      <span className="inline-flex shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                        Live
                      </span>
                    ) : (
                      <span className="inline-flex shrink-0 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="mt-1 truncate text-xs text-zinc-600 dark:text-zinc-400">
                    /{p.slug} · updated {formatDate(p.updatedAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {p.published && (
                    <Link
                      href={`/blog/${p.slug}`}
                      target="_blank"
                      className="btn-glass !px-3 !py-1.5 !text-xs"
                    >
                      View
                    </Link>
                  )}
                  <Link
                    href={`/admin/posts/${p.id}/edit`}
                    className="btn-glass !px-3 !py-1.5 !text-xs"
                  >
                    Edit
                  </Link>
                  <DeletePostButton id={p.id} title={p.title} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="glass rounded-3xl p-12 text-center">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        No posts yet
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Write your first post to get the blog going.
      </p>
      <Link
        href="/admin/posts/new"
        className="btn-primary mt-6"
      >
        Write first post
      </Link>
    </div>
  );
}

function formatDate(d: Date | null): string {
  if (!d) return "never";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}
