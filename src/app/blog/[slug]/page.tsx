import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getPublishedPostBySlug,
  listPublishedPosts,
  parseTags,
  readingTime,
  renderArticle,
} from "@/lib/blog";
import { TableOfContents } from "@/components/blog/TableOfContents";

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await listPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  const desc = post.excerpt || undefined;
  const ogImage = post.coverImage || undefined;

  return {
    title: post.title,
    description: desc,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: desc,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      images: ogImage ? [ogImage] : undefined,
      tags: parseTags(post.tags),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: desc,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const { html, toc } = await renderArticle(post.content);
  const tags = parseTags(post.tags);
  const minutes = readingTime(post.content);
  const allPublished = await listPublishedPosts();
  const related = allPublished.filter((p) => p.id !== post.id);
  const sidebarRelated = related.slice(0, 6);
  const moreArticles = related.slice(0, 9);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://bestgpacalculator.online/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://bestgpacalculator.online/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://bestgpacalculator.online/blog/${post.slug}`,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || undefined,
    image: post.coverImage
      ? {
          "@type": "ImageObject",
          url: post.coverImage,
          width: 1600,
          height: 900,
        }
      : undefined,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    inLanguage: "en-US",
    keywords: tags.join(", ") || undefined,
    wordCount: post.content.trim().split(/\s+/).filter(Boolean).length,
    mainEntityOfPage: `https://bestgpacalculator.online/blog/${post.slug}`,
    author: {
      "@type": "Organization",
      "@id": "https://bestgpacalculator.online/#organization",
      name: "BestGPACalculator Editorial Team",
      url: "https://bestgpacalculator.online/about",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://bestgpacalculator.online/#organization",
      name: "BestGPACalculator",
      url: "https://bestgpacalculator.online",
      logo: {
        "@type": "ImageObject",
        url: "https://bestgpacalculator.online/logo.png",
        width: 956,
        height: 188,
      },
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".prose > p:first-of-type"],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)_240px] lg:gap-10 xl:grid-cols-[240px_minmax(0,1fr)_260px] xl:gap-12">
          {/* Left sidebar — More articles */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-700 dark:text-indigo-300">
                Read more
              </h3>
              {sidebarRelated.length === 0 ? (
                <p className="text-xs text-zinc-500 dark:text-zinc-500">
                  More posts coming soon.
                </p>
              ) : (
                <ul className="space-y-1">
                  {sidebarRelated.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="block rounded-md px-2 py-1.5 text-xs leading-snug text-zinc-600 transition hover:bg-white/40 hover:text-indigo-700 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-indigo-300"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href="/blog"
                className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 hover:underline dark:text-indigo-300"
              >
                Browse all
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </aside>

          {/* Center column — Article */}
          <article className="min-w-0">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-6 text-xs font-medium text-indigo-700 dark:text-indigo-300"
            >
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span className="mx-1.5 text-zinc-400 dark:text-zinc-600">›</span>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
              <span className="mx-1.5 text-zinc-400 dark:text-zinc-600">›</span>
              <span className="text-zinc-600 dark:text-zinc-400">
                {post.title}
              </span>
            </nav>

            {post.emoji && (
              <div
                className="mb-5 text-5xl leading-none sm:text-6xl"
                aria-hidden="true"
              >
                {post.emoji}
              </div>
            )}

            {tags.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-1.5">
                {tags.map((t, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-700 dark:text-indigo-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
              {post.title}
            </h1>

            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              {post.publishedAt && (
                <>
                  <time dateTime={post.publishedAt.toISOString()}>
                    {formatDate(post.publishedAt)}
                  </time>
                  <span className="mx-2 text-zinc-400 dark:text-zinc-600">
                    ·
                  </span>
                </>
              )}
              <span>{minutes} min read</span>
              <span className="mx-2 text-zinc-400 dark:text-zinc-600">·</span>
              <span>by BestGPACalculator Editorial Team</span>
            </p>

            {post.excerpt && (
              <p className="mt-5 text-pretty text-base leading-relaxed text-zinc-700 sm:text-lg dark:text-zinc-300">
                {post.excerpt}
              </p>
            )}

            {post.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.coverImage}
                alt={post.title}
                width={1600}
                height={900}
                fetchPriority="high"
                className="mt-8 aspect-[16/9] w-full rounded-3xl object-cover"
              />
            )}

            {/* Mobile-only TOC (collapsed) */}
            {toc.length > 0 && (
              <details className="glass mt-8 rounded-xl px-4 py-3 lg:hidden">
                <summary className="cursor-pointer text-xs font-bold uppercase tracking-[0.16em] text-fuchsia-700 dark:text-fuchsia-300">
                  On this page
                </summary>
                <ul className="mt-3 space-y-1 border-l border-white/40 dark:border-white/[0.08]">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`-ml-px block border-l-2 border-transparent py-1 pl-3 text-xs leading-snug text-zinc-700 dark:text-zinc-300 ${
                          item.level === 3 ? "pl-6 text-[11px]" : ""
                        }`}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            <div
              className="prose prose-zinc mt-10 max-w-none dark:prose-invert prose-headings:scroll-mt-24"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {/* Bottom "More articles" */}
            {moreArticles.length > 0 && (
              <section className="mt-16 border-t border-white/40 pt-8 dark:border-white/[0.08]">
                <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-700 dark:text-indigo-300">
                  More articles
                </h2>
                <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                  {moreArticles.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="block rounded-lg px-3 py-2 text-sm text-zinc-700 transition hover:bg-white/40 hover:text-indigo-700 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-indigo-300"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mt-10 border-t border-white/40 pt-8 dark:border-white/[0.08]">
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-fuchsia-700 dark:text-fuchsia-300">
                Other sections
              </h2>
              <ul className="mt-4 grid gap-1.5 sm:grid-cols-3">
                {[
                  { href: "/", label: "Home" },
                  { href: "/weighted-gpa-calculator", label: "Weighted GPA Calculator" },
                  { href: "/unweighted-gpa-calculator", label: "Unweighted GPA Calculator" },
                  { href: "/college-gpa-calculator", label: "College GPA Calculator" },
                  { href: "/high-school-gpa-calculator", label: "High School GPA Calculator" },
                  { href: "/grade-calculator", label: "Grade Calculator" },
                  { href: "/final-grade-calculator", label: "Final Grade Calculator" },
                  { href: "/semester-grade-calculator", label: "Semester Grade Calculator" },
                  { href: "/gpa-to-percentage-calculator", label: "GPA to Percentage" },
                  { href: "/law-school-gpa-calculator", label: "Law School (LSAC) GPA" },
                  { href: "/gpa-scale", label: "GPA Scale Guide" },
                  { href: "/university", label: "University Calculators" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="block rounded-lg px-3 py-2 text-sm text-zinc-700 transition hover:bg-white/40 hover:text-indigo-700 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-indigo-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </article>

          {/* Right sidebar — TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={toc} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}
