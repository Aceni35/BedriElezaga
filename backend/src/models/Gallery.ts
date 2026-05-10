import { Schema, model, type InferSchemaType, type Types } from "mongoose";

export const GALLERY_SECTIONS = ["staff", "about", "students", "home"] as const;
export type GallerySection = (typeof GALLERY_SECTIONS)[number];

const gallerySchema = new Schema(
  {
    section: { type: String, enum: GALLERY_SECTIONS, required: true },
    category: { type: String, required: true },
    pictureKey: { type: String, required: true },
  },
  { timestamps: true }
);

gallerySchema.index({ section: 1, category: 1 }, { unique: true });

export type GalleryDoc = InferSchemaType<typeof gallerySchema> & { _id: Types.ObjectId };
export const Gallery = model("Gallery", gallerySchema);
