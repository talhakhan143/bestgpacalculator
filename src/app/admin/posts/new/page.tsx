import { PostEditor } from "@/components/admin/PostEditor";
import { createPostAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        New post
      </h1>
      <PostEditor action={createPostAction} submitLabel="Create post" />
    </div>
  );
}
