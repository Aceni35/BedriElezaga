import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { isValidObjectId } from "mongoose";
import { DocumentModel, type DocumentDoc } from "../models/Document.js";
import { BadRequestError } from "../errors/index.js";
import { CustomError } from "../errors/CustomError.js";
import { deleteObject, presignDownload, publicUrlFor } from "../helpers/r2.js";
import {
  createDocumentSchema,
  listDocumentsQuerySchema,
  updateDocumentSchema,
} from "../validators/documents.js";

function toResponse(doc: DocumentDoc) {
  return {
    id: doc._id,
    name: doc.name,
    file: { key: doc.fileKey, url: publicUrlFor(doc.fileKey) },
    contentType: doc.contentType,
    size: doc.size,
    category: doc.category,
    createdAt: (doc as unknown as { createdAt: Date }).createdAt,
    updatedAt: (doc as unknown as { updatedAt: Date }).updatedAt,
  };
}

async function safeDeleteKey(key: string) {
  await deleteObject(key).catch((err) => {
    console.error(`Failed to delete R2 object ${key}:`, err);
  });
}

function notFound(): CustomError {
  return new CustomError("Document not found", StatusCodes.NOT_FOUND);
}

export const listDocuments: RequestHandler = async (req, res) => {
  const parsed = listDocumentsQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    throw new BadRequestError(
      "Invalid query",
      parsed.error.flatten().fieldErrors
    );
  }
  const { page, limit, category, search, sort } = parsed.data;

  const filter: Record<string, unknown> = {};
  if (category) filter.category = category;
  if (search) {
    const rx = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.name = rx;
  }

  const [items, total] = await Promise.all([
    DocumentModel.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit),
    DocumentModel.countDocuments(filter),
  ]);

  res.status(StatusCodes.OK).json({
    count: items.length,
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    items: items.map(toResponse),
  });
};

export const getDocument: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) throw notFound();
  const doc = await DocumentModel.findById(id);
  if (!doc) throw notFound();
  res.status(StatusCodes.OK).json(toResponse(doc));
};

export const downloadDocument: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) throw notFound();
  const doc = await DocumentModel.findById(id);
  if (!doc) throw notFound();

  const ext = doc.fileKey.includes(".") ? doc.fileKey.split(".").pop() : "";
  const filename =
    ext && !doc.name.toLowerCase().endsWith(`.${ext.toLowerCase()}`)
      ? `${doc.name}.${ext}`
      : doc.name;

  const url = await presignDownload({ key: doc.fileKey, filename });
  res.redirect(url);
};

export const createDocument: RequestHandler = async (req, res) => {
  const parsed = createDocumentSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new BadRequestError(
      "Validation failed",
      parsed.error.flatten().fieldErrors
    );
  }
  const doc = await DocumentModel.create(parsed.data);
  res.status(StatusCodes.CREATED).json(toResponse(doc));
};

export const updateDocument: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) throw notFound();

  const parsed = updateDocumentSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new BadRequestError(
      "Validation failed",
      parsed.error.flatten().fieldErrors
    );
  }
  const data = parsed.data;

  const doc = await DocumentModel.findById(id);
  if (!doc) throw notFound();

  let orphanKey: string | null = null;
  if (data.fileKey && data.fileKey !== doc.fileKey) {
    orphanKey = doc.fileKey;
    doc.fileKey = data.fileKey;
  }
  if (data.name !== undefined) doc.name = data.name;
  if (data.contentType !== undefined) doc.contentType = data.contentType;
  if (data.size !== undefined) doc.size = data.size;
  if (data.category !== undefined) doc.category = data.category;

  await doc.save();
  if (orphanKey) await safeDeleteKey(orphanKey);

  res.status(StatusCodes.OK).json(toResponse(doc));
};

export const deleteDocument: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) throw notFound();

  const doc = await DocumentModel.findByIdAndDelete(id);
  if (!doc) throw notFound();

  await safeDeleteKey(doc.fileKey);

  res.status(StatusCodes.NO_CONTENT).send();
};
