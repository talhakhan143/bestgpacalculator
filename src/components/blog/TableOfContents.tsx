"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/blog";

export function TableOfContents({ items }: { items: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    // Track which headings are currently above viewport top — pick the lowest one.
    const observer = new IntersectionObserver(
      () => {
        const scrollTop = window.scrollY + 120; // offset for sticky header
        let current: HTMLElement | null = null;
        for (const h of headings) {
          if (h.offsetTop <= scrollTop) current = h;
          else break;
        }
        setActiveId(current?.id ?? headings[0].id);
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: [0, 1] },
    );

    headings.forEach((h) => observer.observe(h));
    // Run once on mount in case page already scrolled
    setTimeout(() => {
      const scrollTop = window.scrollY + 120;
      let current: HTMLElement | null = null;
      for (const h of headings) {
        if (h.offsetTop <= scrollTop) current = h;
        else break;
      }
      setActiveId(current?.id ?? headings[0].id);
    }, 0);

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-fuchsia-700 dark:text-fuchsia-300">
        On this page
      </h3>
      <ul className="space-y-1 border-l border-white/40 dark:border-white/[0.08]">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`-ml-px block border-l-2 py-1 pl-3 text-xs leading-snug transition ${
                  isActive
                    ? "border-indigo-500 font-semibold text-indigo-700 dark:text-indigo-300"
                    : "border-transparent text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                } ${item.level === 3 ? "pl-6 text-[11px]" : ""}`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
