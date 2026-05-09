import { Schema, model, type HydratedDocument, type InferSchemaType } from "mongoose";

const translatedSchema = new Schema(
  {
    sq: { type: String, required: true, default: "" },
    en: { type: String, required: true, default: "" },
    me: { type: String, required: true, default: "" },
  },
  { _id: false }
);

const ruleSectionSchema = new Schema(
  {
    order: { type: Number, default: 0, index: true },
    title: { type: translatedSchema, required: true },
    items: { type: [translatedSchema], default: [] },
  },
  { timestamps: true }
);

ruleSectionSchema.index({ order: 1, createdAt: 1 });

export type RuleSectionDoc = HydratedDocument<InferSchemaType<typeof ruleSectionSchema>>;
export const RuleSection = model("RuleSection", ruleSectionSchema);
