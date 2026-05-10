import { z } from "zod";
import { GALLERY_SECTIONS } from "../models/Gallery.js";

const STAFF_CATEGORIES_SET = new Set([
  "school_bodies",
  "directorate",
  "administration",
  "professional_associates",
  "teachers",
  "assistants",
  "maintenance",
]);

const ABOUT_CATEGORIES_SET = new Set(["history", "mission"]);

const STUDENTS_CATEGORIES_SET = new Set(["orari", "rregullorja"]);

const HOME_CATEGORIES_SET = new Set(["image1", "image2", "image3"]);

const CATEGORIES_BY_SECTION: Record<string, Set<string>> = {
  staff: STAFF_CATEGORIES_SET,
  about: ABOUT_CATEGORIES_SET,
  students: STUDENTS_CATEGORIES_SET,
  home: HOME_CATEGORIES_SET,
};

export const upsertGallerySchema = z.object({
  pictureKey: z.string().min(1).max(500),
});

export const galleryParams = z
  .object({
    section: z.enum(GALLERY_SECTIONS),
    category: z.string().min(1).max(80),
  })
  .superRefine((data, ctx) => {
    const allowed = CATEGORIES_BY_SECTION[data.section];
    if (!allowed || !allowed.has(data.category)) {
      ctx.addIssue({
        code: "custom",
        message: `Invalid category for section ${data.section}`,
        path: ["category"],
      });
    }
  });

export const gallerySectionParam = z.object({
  section: z.enum(GALLERY_SECTIONS),
});

export type UpsertGalleryInput = z.infer<typeof upsertGallerySchema>;
