import { Schema, model, type InferSchemaType, type Types } from "mongoose";

export const NEWS_CATEGORIES = ["Arritje", "Ngjarje", "Lajme", "Projekte", "Sport", "Tjera"] as const;
export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export const ATTACHMENT_KINDS = ["image", "video"] as const;
export type AttachmentKind = (typeof ATTACHMENT_KINDS)[number];

const attachmentSchema = new Schema(
  {
    kind: { type: String, enum: ATTACHMENT_KINDS, required: true },
    key: { type: String, required: true },
  },
  { _id: false }
);

const newsSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: [String], required: true, default: [] },
    coverImageKey: { type: String, required: true },
    category: { type: String, enum: NEWS_CATEGORIES, required: true },
    author: {
      id: { type: Schema.Types.ObjectId, ref: "User", required: true },
      fullName: { type: String, required: true },
    },
    publishedAt: { type: Date, default: () => new Date() },
    attachments: { type: [attachmentSchema], default: [] },
  },
  { timestamps: true }
);

newsSchema.index({ category: 1, publishedAt: -1 });
newsSchema.index({ title: "text" });

export type NewsDoc = InferSchemaType<typeof newsSchema> & { _id: Types.ObjectId };
export const News = model("News", newsSchema);
