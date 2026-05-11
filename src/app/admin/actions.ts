"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import {
  clearSessionCookie,
  getSession,
  setSessionCookie,
  signSession,
  verifyCredentials,
} from "@/lib/auth";
import { ensureUniqueSlug } from "@/lib/blog";
import { generateImage, saveImageFromFile } from "@/lib/images";

export async function loginAction(
  prevState: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const user = await verifyCredentials(email, password);
  if (!user) {
    return { error: "Invalid email or password." };
  }

  const token = await signSession({ userId: user.id, email: user.email });
  await setSessionCookie(token);

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

async function requireSession() {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

function normalizeTags(raw: string): string {
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0)
    .slice(0, 12)
    .join(", ");
}

export async function createPostAction(formData: FormData) {
  const session = await requireSession();
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "");
  const coverImage = String(formData.get("coverImage") ?? "").trim() || null;
  const tags = normalizeTags(String(formData.get("tags") ?? ""));
  const emoji = String(formData.get("emoji") ?? "").trim() || null;
  const publish = formData.get("publish") === "on";
  const slugRaw = String(formData.get("slug") ?? "").trim();

  if (!title) {
    throw new Error("Title is required");
  }

  const slug = await ensureUniqueSlug(slugRaw || title);
  const now = new Date();

  const inserted = db
    .insert(schema.posts)
    .values({
      slug,
      title,
      excerpt,
      content,
      coverImage,
      tags,
      emoji,
      published: publish,
      publishedAt: publish ? now : null,
      authorId: session.userId,
      createdAt: now,
      updatedAt: now,
    })
    .returning({ id: schema.posts.id })
    .get();

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin");

  redirect(`/admin/posts/${inserted.id}/edit?saved=1`);
}

export async function updatePostAction(formData: FormData) {
  await requireSession();
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id) || id <= 0) {
    throw new Error("Invalid post id");
  }

  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "");
  const coverImage = String(formData.get("coverImage") ?? "").trim() || null;
  const tags = normalizeTags(String(formData.get("tags") ?? ""));
  const emoji = String(formData.get("emoji") ?? "").trim() || null;
  const publish = formData.get("publish") === "on";
  const slugRaw = String(formData.get("slug") ?? "").trim();

  if (!title) throw new Error("Title is required");

  const existing = db
    .select()
    .from(schema.posts)
    .where(eq(schema.posts.id, id))
    .get();
  if (!existing) throw new Error("Post not found");

  const newSlug =
    slugRaw && slugRaw !== existing.slug
      ? await ensureUniqueSlug(slugRaw, id)
      : existing.slug;

  const becamePublished = publish && !existing.published;

  db.update(schema.posts)
    .set({
      title,
      excerpt,
      content,
      coverImage,
      tags,
      emoji,
      slug: newSlug,
      published: publish,
      publishedAt: becamePublished
        ? new Date()
        : publish
        ? existing.publishedAt
        : null,
      updatedAt: new Date(),
    })
    .where(eq(schema.posts.id, id))
    .run();

  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.slug}`);
  revalidatePath(`/blog/${newSlug}`);
  revalidatePath("/admin");

  redirect(`/admin/posts/${id}/edit?saved=1`);
}

export async function deletePostAction(formData: FormData) {
  await requireSession();
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id) || id <= 0) throw new Error("Invalid id");

  const post = db
    .select({ slug: schema.posts.slug })
    .from(schema.posts)
    .where(eq(schema.posts.id, id))
    .get();
  if (!post) return;

  db.delete(schema.posts).where(eq(schema.posts.id, id)).run();

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin");

  redirect("/admin");
}

/**
 * Server action: upload an image file. Returns the public URL.
 * Called from client via `useTransition` + FormData containing `file`.
 */
export async function uploadImageAction(
  formData: FormData,
): Promise<{ url?: string; error?: string }> {
  try {
    await requireSession();
    const file = formData.get("file");
    if (!(file instanceof File)) return { error: "No file provided" };
    const url = await saveImageFromFile(file);
    return { url };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

/**
 * Server action: generate an image with OpenAI from a text prompt.
 * Returns the public URL of the saved image.
 */
export async function generateImageAction(
  formData: FormData,
): Promise<{ url?: string; error?: string }> {
  try {
    await requireSession();
    const prompt = String(formData.get("prompt") ?? "");
    const url = await generateImage(prompt);
    return { url };
  } catch (e) {
    return { error: (e as Error).message };
  }
}
