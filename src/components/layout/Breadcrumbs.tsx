import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export interface CrumbItem {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: CrumbItem[] }) {
  return (
    <>
      <BreadcrumbSchema items={items} />
      <nav
        aria-label="Breadcrumb"
        className="mx-auto mt-4 max-w-6xl px-4 sm:px-6"
      >
        <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-500">
          {items.map((it, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={`${i}-${it.href}`} className="flex items-center gap-1">
                {i > 0 && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-300"
                    aria-hidden="true"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                )}
                {isLast ? (
                  <span className="font-medium text-slate-700">{it.name}</span>
                ) : (
                  <Link
                    href={it.href}
                    className="rounded px-1 py-0.5 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    {it.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
