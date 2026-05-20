import path from "node:path";
import { promises as fs } from "node:fs";
import crypto from "node:crypto";
import { put } from "@vercel/blob";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_EXT = new Set(["jpg", "jpeg", "png", "webp", "gif"]);
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

function hasBlobStore(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function ensureDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

function safeExtFromMime(mime: string): string | null {
  if (mime === "image/jpeg" || mime === "image/jpg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  return null;
}

function uniqueFilename(ext: string): string {
  return `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;
}

async function persistBuffer(buf: Buffer, filename: string, contentType: string): Promise<string> {
  if (hasBlobStore()) {
    const blob = await put(`uploads/${filename}`, buf, {
      access: "public",
      contentType,
      addRandomSuffix: false,
    });
    return blob.url;
  }
  await ensureDir();
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buf);
  return `/uploads/${filename}`;
}

function mimeFromExt(ext: string): string {
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  if (ext === "gif") return "image/gif";
  return "application/octet-stream";
}

export async function saveImageFromFile(file: File): Promise<string> {
  if (file.size > MAX_BYTES) {
    throw new Error(
      `Image too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max 8 MB.`,
    );
  }
  const ext = safeExtFromMime(file.type);
  if (!ext) throw new Error("Unsupported image type");

  const filename = uniqueFilename(ext);
  const buf = Buffer.from(await file.arrayBuffer());
  return persistBuffer(buf, filename, file.type || mimeFromExt(ext));
}

export async function saveImageFromBuffer(
  buf: Buffer,
  ext: string,
): Promise<string> {
  const cleanExt = ext.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!ALLOWED_EXT.has(cleanExt)) throw new Error("Unsupported image type");
  const filename = uniqueFilename(cleanExt);
  return persistBuffer(buf, filename, mimeFromExt(cleanExt));
}

export async function generateImage(prompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not set. Add it to .env.local to enable AI image generation.",
    );
  }
  const trimmedPrompt = prompt.trim();
  if (!trimmedPrompt) throw new Error("Prompt is required");
  if (trimmedPrompt.length > 4000) {
    throw new Error("Prompt is too long (max 4000 chars)");
  }

  const model = process.env.OPENAI_IMAGE_MODEL || "dall-e-3";
  const isDallE = model.startsWith("dall-e");

  const body: Record<string, unknown> = {
    model,
    prompt: trimmedPrompt,
    n: 1,
    size: isDallE ? "1792x1024" : "1536x1024",
  };
  if (isDallE) {
    body.response_format = "b64_json";
    body.quality = "standard";
  }

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(
      `OpenAI image generation failed (${response.status}): ${errText.slice(0, 200)}`,
    );
  }

  const json = (await response.json()) as {
    data?: { b64_json?: string; url?: string }[];
  };
  const item = json.data?.[0];
  if (!item) throw new Error("OpenAI returned no image data");

  let buf: Buffer;
  if (item.b64_json) {
    buf = Buffer.from(item.b64_json, "base64");
  } else if (item.url) {
    const imgRes = await fetch(item.url);
    if (!imgRes.ok) throw new Error("Failed to fetch generated image URL");
    buf = Buffer.from(await imgRes.arrayBuffer());
  } else {
    throw new Error("OpenAI image response missing b64_json and url");
  }

  return saveImageFromBuffer(buf, "png");
}
