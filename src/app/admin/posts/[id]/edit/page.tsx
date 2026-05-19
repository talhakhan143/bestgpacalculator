import { notFound } from "next/navigation";
import Link from "next/link";
import { PostEditor } from "@/components/admin/PostEditor";
import { getPostById } from "@/lib/blog";
import { updatePostAction } from "@/app/admin/actions";
import { DeletePostButton } from "@/components/admin/DeletePostButton";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;

  const numId = Number(id);
  if (!Number.isFinite(numId) || numId <= 0) notFound();

  const post = await getPostById(numId);
  if (!post) notFound();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Edit post
        </h1>
        <div className="flex items-center gap-2">
          {post.published && (
            <Link
              href={`/blog/${post.slug}`}
              target="_blank"
              className="btn-glass !px-4 !py-1.5 !text-xs"
            >
              View ↗
            </Link>
          )}
          <DeletePostButton id={post.id} title={post.title} variant="solid" />
        </div>
      </div>

      <PostEditor
        action={updatePostAction}
        postId={post.id}
        submitLabel="Save changes"
        saved={saved === "1"}
        initial={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage ?? "",
          tags: post.tags ?? "",
          emoji: post.emoji ?? "",
          published: post.published,
        }}
      />
    </div>
  );
}
