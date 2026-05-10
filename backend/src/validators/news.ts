import { z } from "zod";
import { ATTACHMENT_KINDS, NEWS_CATEGORIES } from "../models/News.js";

const KEY_PREFIX_BY_KIND = {
  image: "images/",
  video: "videos/",
} as const;

const attachmentSchema = z
  .object({
    kind: z.enum(ATTACHMENT_KINDS),
    key: z.string().min(1),
  })
  .superRefine((a, ctx) => {
    const prefix = KEY_PREFIX_BY_KIND[a.kind];
    if (!a.key.startsWith(prefix)) {
      ctx.addIssue({
        code: "custom",
        message: `Attachment key must start with "${prefix}" for kind "${a.kind}"`,
        path: ["key"],
      });
    }
  });

const baseShape = {
  title: z.string().min(1).max(200).trim(),
  body: z.array(z.string()).optional(),
  bodyHtml: z.string().max(200_000).optional(),
  coverImageKey: z
    .string()
    .min(1)
    .refine((k) => k.startsWith("images/"), {
      message: "Cover image must be an image upload",
    }),
  category: z.enum(NEWS_CATEGORIES),
  publishedAt: z.coerce.date().optional(),
  attachments: z.array(attachmentSchema).max(50).optional(),
};

function hasBodyContent(data: { body?: string[]; bodyHtml?: string }): boolean {
  const paragraphCount = (data.body ?? []).filter((p) => p && p.trim().length > 0).length;
  const htmlText = (data.bodyHtml ?? "").replace(/<[^>]*>/g, "").trim();
  return paragraphCount > 0 || htmlText.length > 0;
}

export const createNewsSchema = z.object(baseShape).superRefine((data, ctx) => {
  if (!hasBodyContent(data)) {
    ctx.addIssue({
      code: "custom",
      message: "Article body is required (provide either paragraphs or bodyHtml)",
      path: ["body"],
    });
  }
});

export const updateNewsSchema = z.object(baseShape).partial().superRefine((data, ctx) => {
  if (data.body === undefined && data.bodyHtml === undefined) return;
  if (!hasBodyContent({ body: data.body, bodyHtml: data.bodyHtml })) {
    ctx.addIssue({
      code: "custom",
      message: "Article body cannot be empty",
      path: ["body"],
    });
  }
});

export const listNewsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
  category: z.enum(NEWS_CATEGORIES).optional(),
  search: z.string().min(1).max(200).optional(),
  sort: z.string().default("-publishedAt"),
});

export type CreateNewsInput = z.infer<typeof createNewsSchema>;
export type UpdateNewsInput = z.infer<typeof updateNewsSchema>;
export type ListNewsQuery = z.infer<typeof listNewsQuerySchema>;
