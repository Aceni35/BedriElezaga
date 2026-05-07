import { z } from "zod";

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
] as const;

export const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
] as const;

export const ALLOWED_DOC_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
export const MAX_DOC_SIZE = 25 * 1024 * 1024;
export const MAX_VIDEO_SIZE = 500 * 1024 * 1024;

const imageTypes = new Set<string>(ALLOWED_IMAGE_TYPES);
const videoTypes = new Set<string>(ALLOWED_VIDEO_TYPES);
const docTypes = new Set<string>(ALLOWED_DOC_TYPES);

export type UploadKind = "image" | "video" | "document";

export function classify(contentType: string): UploadKind | null {
  if (imageTypes.has(contentType)) return "image";
  if (videoTypes.has(contentType)) return "video";
  if (docTypes.has(contentType)) return "document";
  return null;
}

const maxByKind: Record<UploadKind, number> = {
  image: MAX_IMAGE_SIZE,
  video: MAX_VIDEO_SIZE,
  document: MAX_DOC_SIZE,
};

export const signUploadSchema = z
  .object({
    filename: z.string().min(1).max(255),
    contentType: z.string().min(1),
    size: z.number().int().positive(),
  })
  .superRefine((data, ctx) => {
    const kind = classify(data.contentType);
    if (!kind) {
      ctx.addIssue({
        code: "custom",
        message: "Unsupported content type",
        path: ["contentType"],
      });
      return;
    }
    const max = maxByKind[kind];
    if (data.size > max) {
      ctx.addIssue({
        code: "custom",
        message: `File too large (max ${Math.round(max / 1024 / 1024)} MB)`,
        path: ["size"],
      });
    }
  });

export type SignUploadInput = z.infer<typeof signUploadSchema>;
