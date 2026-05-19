import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { listPublishedPosts, parseTags, readingTime } from "@/lib/blog";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedCalculators } from "@/components/sections/RelatedCalculators";

export const metadata: Metadata = {
  title: "Blog — GPA Calculation Guides & Resources",
  description:
    "Practical guides on GPA calculation, college admissions, weighted vs unweighted, AP/Honors strategy, and academic planning.",
  alternates: { canonical: "/blog" },
};

export const dynamic = "force-dynamic";

type Post = Awaited<ReturnType<typeof listPublishedPosts>>[number];

export default async function BlogIndex() {
  const posts = await listPublishedPosts();

  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }]} />
      <Hero
        badge="Blog"
        title="GPA guides &"
        highlight="academic resources"
        subtitle="Tactical posts on GPA strategy, college admissions, AP/Honors planning, and the math that drives your transcript."
      />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        {posts.length === 0 ? (
          <div className="glass mx-auto max-w-2xl rounded-3xl p-12 text-center">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              No posts yet
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              The first articles are on the way. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        )}
      </section>

      <RelatedCalculators heading="Try a calculator while you read" count={4} />
    </>
  );
}

function PostCard({ post }: { post: Post }) {
  const tags = parseTags(post.tags).slice(0, 3);
  const minutes = readingTime(post.content);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group glass overflow-hidden rounded-2xl transition hover:-translate-y-0.5"
    >
      {post.coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImage}
          alt=""
          className="aspect-[16/9] w-full object-cover"
          loading="lazy"
        />
      ) : (
        post.emoji && (
          <div className="grid aspect-[16/9] w-full place-items-center bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/15 to-cyan-500/20 text-6xl">
            {post.emoji}
          </div>
        )
      )}
      <div className="p-5">
        {tags.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {tags.map((t, i) => (
              <span
                key={i}
                className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-700 dark:text-indigo-300"
              >
                {t}
              </span>
            ))}
          </div>
        )}
        <h2 className="text-lg font-bold tracking-tight text-zinc-900 group-hover:text-indigo-700 dark:text-zinc-50 dark:group-hover:text-indigo-300">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-300">
            {post.excerpt}
          </p>
        )}
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
          {post.publishedAt && <>{formatDate(post.publishedAt)} · </>}
          {minutes} min read
        </p>
      </div>
    </Link>
  );
}

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(d);
}
