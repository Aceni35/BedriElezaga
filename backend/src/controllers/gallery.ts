import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Gallery, type GalleryDoc } from "../models/Gallery.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { deleteObject, publicUrlFor } from "../helpers/r2.js";
import { upsertGallerySchema, galleryParams } from "../validators/gallery.js";

function toResponse(doc: GalleryDoc) {
  return {
    section: doc.section,
    category: doc.category,
    picture: { key: doc.pictureKey, url: publicUrlFor(doc.pictureKey) },
    updatedAt: (doc as unknown as { updatedAt: Date }).updatedAt,
  };
}

async function safeDeleteKey(key: string) {
  await deleteObject(key).catch((err) => {
    console.error(`Failed to delete R2 object ${key}:`, err);
  });
}

export const listGallery: RequestHandler = async (req, res) => {
  const filter: Record<string, unknown> = {};
  const sectionParam = req.query.section;
  if (typeof sectionParam === "string") {
    filter.section = sectionParam;
  }
  const items = await Gallery.find(filter);
  res.status(StatusCodes.OK).json({ items: items.map(toResponse) });
};

export const upsertGallery: RequestHandler = async (req, res) => {
  const params = galleryParams.safeParse(req.params);
  if (!params.success) {
    throw new BadRequestError("Invalid params", params.error.flatten().fieldErrors);
  }
  const body = upsertGallerySchema.safeParse(req.body);
  if (!body.success) {
    throw new BadRequestError("Validation failed", body.error.flatten().fieldErrors);
  }

  const { section, category } = params.data;
  const existing = await Gallery.findOne({ section, category });
  let orphanKey: string | null = null;
  let doc: GalleryDoc;
  if (existing) {
    if (existing.pictureKey && existing.pictureKey !== body.data.pictureKey) {
      orphanKey = existing.pictureKey;
    }
    existing.pictureKey = body.data.pictureKey;
    await existing.save();
    doc = existing;
  } else {
    doc = await Gallery.create({
      section,
      category,
      pictureKey: body.data.pictureKey,
    });
  }

  if (orphanKey) await safeDeleteKey(orphanKey);
  res.status(StatusCodes.OK).json(toResponse(doc));
};

export const deleteGallery: RequestHandler = async (req, res) => {
  const params = galleryParams.safeParse(req.params);
  if (!params.success) {
    throw new BadRequestError("Invalid params", params.error.flatten().fieldErrors);
  }

  const { section, category } = params.data;
  const doc = await Gallery.findOneAndDelete({ section, category });
  if (!doc) throw new NotFoundError("Gallery entry not found");
  await safeDeleteKey(doc.pictureKey);
  res.status(StatusCodes.NO_CONTENT).send();
};
