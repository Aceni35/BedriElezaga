import { Schema, model, type InferSchemaType, type Types } from "mongoose";

export const STAFF_CATEGORIES = [
  "school_bodies",
  "directorate",
  "administration",
  "professional_associates",
  "teachers",
  "assistants",
  "maintenance",
] as const;
export type StaffCategory = (typeof STAFF_CATEGORIES)[number];

const staffSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    category: { type: String, enum: STAFF_CATEGORIES, required: true },
    position: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    memberSince: { type: Number, required: true, min: 1900, max: 2100 },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    pictureKey: { type: String, required: true },
    fileKey: { type: String, default: "" },
  },
  { timestamps: true }
);

staffSchema.index({ category: 1, fullName: 1 });

export type StaffDoc = InferSchemaType<typeof staffSchema> & { _id: Types.ObjectId };
export const Staff = model("Staff", staffSchema);
