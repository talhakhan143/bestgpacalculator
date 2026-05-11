import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";
import { getSession } from "@/lib/auth";

export async function AdminBar() {
  const session = await getSession();
  return (
    <header className="sticky top-0 z-50 glass border-b-0 border-x-0 border-t-0">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-base font-bold tracking-tight"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 text-white shadow-md">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3l9 9-9 9-9-9 9-9z" />
              </svg>
            </span>
            <span className="gradient-text">Admin</span>
          </Link>
          <nav className="hidden text-sm font-medium sm:flex">
            <Link
              href="/admin"
              className="rounded-lg px-3 py-1.5 text-zinc-700 transition hover:bg-white/40 hover:text-indigo-600 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-indigo-300"
            >
              Posts
            </Link>
            <Link
              href="/admin/posts/new"
              className="rounded-lg px-3 py-1.5 text-zinc-700 transition hover:bg-white/40 hover:text-indigo-600 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-indigo-300"
            >
              New post
            </Link>
            <Link
              href="/blog"
              target="_blank"
              className="rounded-lg px-3 py-1.5 text-zinc-700 transition hover:bg-white/40 hover:text-indigo-600 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-indigo-300"
            >
              View blog ↗
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {session && (
            <span className="hidden text-xs text-zinc-600 sm:inline dark:text-zinc-400">
              {session.email}
            </span>
          )}
          <form action={logoutAction}>
            <button
              type="submit"
              className="btn-glass !px-4 !py-1.5 !text-xs"
            >
              Log out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
