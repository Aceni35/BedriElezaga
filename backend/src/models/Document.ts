import { Schema, model, type InferSchemaType, type Types } from "mongoose";

export const DOCUMENT_CATEGORIES = [
  "calendar",
  "form",
  "regulation",
  "curriculum",
  "event",
  "other",
] as const;
export type DocumentCategory = (typeof DOCUMENT_CATEGORIES)[number];

const documentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    fileKey: { type: String, required: true },
    contentType: { type: String, required: true },
    size: { type: Number, required: true, min: 0 },
    category: { type: String, enum: DOCUMENT_CATEGORIES, required: true },
  },
  { timestamps: true }
);

documentSchema.index({ category: 1, createdAt: -1 });
documentSchema.index({ name: "text" });

export type DocumentDoc = InferSchemaType<typeof documentSchema> & { _id: Types.ObjectId };
export const DocumentModel = model("Document", documentSchema);
