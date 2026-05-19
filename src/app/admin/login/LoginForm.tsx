"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/admin/actions";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={next} />
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="glass-input w-full rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="glass-input w-full rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100"
        />
      </div>
      {state?.error && (
        <div className="rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-700 dark:text-red-300">
          {state.error}
        </div>
      )}
      <button
        type="submit"
        disabled={pending}
        className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
