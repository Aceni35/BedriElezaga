import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { isValidObjectId } from "mongoose";
import { News, type NewsDoc } from "../models/News.js";
import { User } from "../models/User.js";
import { BadRequestError, UnauthorizedError } from "../errors/index.js";
import { CustomError } from "../errors/CustomError.js";
import { deleteObject, publicUrlFor } from "../helpers/r2.js";
import {
  createNewsSchema,
  listNewsQuerySchema,
  updateNewsSchema,
} from "../validators/news.js";

function toResponse(doc: NewsDoc) {
  return {
    id: doc._id,
    title: doc.title,
    body: doc.body ?? [],
    bodyHtml: doc.bodyHtml ?? "",
    coverImage: { key: doc.coverImageKey, url: publicUrlFor(doc.coverImageKey) },
    category: doc.category,
    author: doc.author,
    publishedAt: doc.publishedAt,
    attachments: (doc.attachments ?? []).map((a) => ({
      kind: a.kind,
      key: a.key,
      url: publicUrlFor(a.key),
    })),
    createdAt: (doc as unknown as { createdAt: Date }).createdAt,
    updatedAt: (doc as unknown as { updatedAt: Date }).updatedAt,
  };
}

async function safeDeleteKeys(keys: string[]) {
  await Promise.all(
    keys.map((k) =>
      deleteObject(k).catch((err) => {
        console.error(`Failed to delete R2 object ${k}:`, err);
      })
    )
  );
}

function notFound(): CustomError {
  return new CustomError("News article not found", StatusCodes.NOT_FOUND);
}

export const listNews: RequestHandler = async (req, res) => {
  const parsed = listNewsQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    throw new BadRequestError("Invalid query", parsed.error.flatten().fieldErrors);
  }
  const { page, limit, category, search, sort } = parsed.data;

  const filter: Record<string, unknown> = {};
  if (category) filter.category = category;
  if (search) {
    const rx = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = [{ title: rx }, { body: rx }, { bodyHtml: rx }];
  }

  const [items, total] = await Promise.all([
    News.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit),
    News.countDocuments(filter),
  ]);

  res.status(StatusCodes.OK).json({
    count: items.length,
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    items: items.map(toResponse),
  });
};

export const getNews: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) throw notFound();
  const doc = await News.findById(id);
  if (!doc) throw notFound();
  res.status(StatusCodes.OK).json(toResponse(doc));
};

export const createNews: RequestHandler = async (req, res) => {
  const parsed = createNewsSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new BadRequestError("Validation failed", parsed.error.flatten().fieldErrors);
  }

  const userId = req.user?.userId;
  if (!userId) throw new UnauthorizedError();
  const user = await User.findById(userId).select("firstName lastName");
  if (!user) throw new UnauthorizedError("User not found");

  const data = parsed.data;
  const doc = await News.create({
    title: data.title,
    body: data.body ?? [],
    bodyHtml: data.bodyHtml ?? "",
    coverImageKey: data.coverImageKey,
    category: data.category,
    author: { id: user._id, fullName: `${user.firstName} ${user.lastName}`.trim() },
    publishedAt: data.publishedAt ?? new Date(),
    attachments: data.attachments ?? [],
  });

  res.status(StatusCodes.CREATED).json(toResponse(doc));
};

export const updateNews: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) throw notFound();

  const parsed = updateNewsSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new BadRequestError("Validation failed", parsed.error.flatten().fieldErrors);
  }
  const data = parsed.data;

  const doc = await News.findById(id);
  if (!doc) throw notFound();

  const orphans: string[] = [];

  if (data.coverImageKey && data.coverImageKey !== doc.coverImageKey) {
    orphans.push(doc.coverImageKey);
    doc.coverImageKey = data.coverImageKey;
  }

  if (data.attachments) {
    const oldKeys = new Set((doc.attachments ?? []).map((a) => a.key));
    const newKeys = new Set(data.attachments.map((a) => a.key));
    for (const k of oldKeys) if (!newKeys.has(k)) orphans.push(k);
    doc.attachments = data.attachments as typeof doc.attachments;
  }

  if (data.title !== undefined) doc.title = data.title;
  if (data.body !== undefined) doc.body = data.body;
  if (data.bodyHtml !== undefined) doc.bodyHtml = data.bodyHtml;
  if (data.category !== undefined) doc.category = data.category;
  if (data.publishedAt !== undefined) doc.publishedAt = data.publishedAt;

  await doc.save();
  if (orphans.length) await safeDeleteKeys(orphans);

  res.status(StatusCodes.OK).json(toResponse(doc));
};

export const deleteNews: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) throw notFound();

  const doc = await News.findByIdAndDelete(id);
  if (!doc) throw notFound();

  const keys = [doc.coverImageKey, ...(doc.attachments ?? []).map((a) => a.key)];
  await safeDeleteKeys(keys);

  res.status(StatusCodes.NO_CONTENT).send();
};
