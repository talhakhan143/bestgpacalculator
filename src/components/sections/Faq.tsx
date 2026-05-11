export interface FaqItem {
  q: string;
  a: string;
}

export function Faq({ items, heading }: { items: FaqItem[]; heading?: string }) {
  return (
    <section className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
      <h2 className="text-center text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        {heading ?? "Frequently asked questions"}
      </h2>
      <div className="mt-8 space-y-3">
        {items.map((item, i) => (
          <details
            key={i}
            className="glass group rounded-2xl px-5 py-4 transition open:bg-white/70 sm:px-6 sm:py-5 dark:open:bg-white/[0.06]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-zinc-900 dark:text-zinc-100">
              <span>{item.q}</span>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 transition group-open:rotate-45">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-700 dark:text-indigo-300" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
