import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { isValidObjectId } from "mongoose";
import { Staff, type StaffDoc } from "../models/Staff.js";
import { BadRequestError } from "../errors/index.js";
import { CustomError } from "../errors/CustomError.js";
import { deleteObject, publicUrlFor } from "../helpers/r2.js";
import {
  createStaffSchema,
  listStaffQuerySchema,
  updateStaffSchema,
} from "../validators/staff.js";

function toResponse(doc: StaffDoc) {
  return {
    id: doc._id,
    fullName: doc.fullName,
    category: doc.category,
    position: doc.position,
    description: doc.description ?? null,
    memberSince: doc.memberSince,
    email: doc.email ?? null,
    phone: doc.phone ?? null,
    picture: { key: doc.pictureKey, url: publicUrlFor(doc.pictureKey) },
    file: doc.fileKey ? { key: doc.fileKey, url: publicUrlFor(doc.fileKey) } : null,
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
  return new CustomError("Staff member not found", StatusCodes.NOT_FOUND);
}

export const listStaff: RequestHandler = async (req, res) => {
  const parsed = listStaffQuerySchema.safeParse(req.query);
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
    filter.$or = [{ fullName: rx }, { position: rx }];
  }

  const [items, total] = await Promise.all([
    Staff.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit),
    Staff.countDocuments(filter),
  ]);

  res.status(StatusCodes.OK).json({
    count: items.length,
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    items: items.map(toResponse),
  });
};

export const getStaff: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) throw notFound();
  const doc = await Staff.findById(id);
  if (!doc) throw notFound();
  res.status(StatusCodes.OK).json(toResponse(doc));
};

export const createStaff: RequestHandler = async (req, res) => {
  const parsed = createStaffSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new BadRequestError(
      "Validation failed",
      parsed.error.flatten().fieldErrors
    );
  }
  const doc = await Staff.create(parsed.data);
  res.status(StatusCodes.CREATED).json(toResponse(doc));
};

export const updateStaff: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) throw notFound();

  const parsed = updateStaffSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new BadRequestError(
      "Validation failed",
      parsed.error.flatten().fieldErrors
    );
  }

  const doc = await Staff.findById(id);
  if (!doc) throw notFound();

  const data = parsed.data;
  const orphans: string[] = [];
  if (data.pictureKey && data.pictureKey !== doc.pictureKey) {
    orphans.push(doc.pictureKey);
    doc.pictureKey = data.pictureKey;
  }
  if (data.fileKey !== undefined && data.fileKey !== doc.fileKey) {
    if (doc.fileKey) orphans.push(doc.fileKey);
    doc.fileKey = data.fileKey;
  }
  if (data.fullName !== undefined) doc.fullName = data.fullName;
  if (data.category !== undefined) doc.category = data.category;
  if (data.position !== undefined) doc.position = data.position;
  if (data.description !== undefined) doc.description = data.description;
  if (data.memberSince !== undefined) doc.memberSince = data.memberSince;
  if (data.email !== undefined) doc.email = data.email;
  if (data.phone !== undefined) doc.phone = data.phone;

  await doc.save();
  if (orphans.length) await Promise.all(orphans.map(safeDeleteKey));

  res.status(StatusCodes.OK).json(toResponse(doc));
};

export const deleteStaff: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) throw notFound();

  const doc = await Staff.findByIdAndDelete(id);
  if (!doc) throw notFound();

  await safeDeleteKey(doc.pictureKey);
  if (doc.fileKey) await safeDeleteKey(doc.fileKey);

  res.status(StatusCodes.NO_CONTENT).send();
};
