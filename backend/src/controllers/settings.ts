import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Settings, type SettingsDoc } from "../models/Settings.js";
import { BadRequestError } from "../errors/index.js";
import { deleteObject, publicUrlFor } from "../helpers/r2.js";
import { updateSettingsSchema } from "../validators/settings.js";

function toResponse(doc: SettingsDoc) {
  return {
    directorName: doc.directorName ?? "",
    timetable: doc.timetableKey
      ? { key: doc.timetableKey, url: publicUrlFor(doc.timetableKey) }
      : null,
    rules: doc.rulesKey
      ? { key: doc.rulesKey, url: publicUrlFor(doc.rulesKey) }
      : null,
    updatedAt: (doc as unknown as { updatedAt: Date }).updatedAt,
  };
}

async function safeDeleteKey(key: string) {
  await deleteObject(key).catch((err) => {
    console.error(`Failed to delete R2 object ${key}:`, err);
  });
}

async function getOrCreateSettings(): Promise<SettingsDoc> {
  let doc = await Settings.findOne();
  if (!doc) doc = await Settings.create({});
  return doc as SettingsDoc;
}

export const getSettings: RequestHandler = async (_req, res) => {
  const doc = await getOrCreateSettings();
  res.status(StatusCodes.OK).json(toResponse(doc));
};

export const updateSettings: RequestHandler = async (req, res) => {
  const parsed = updateSettingsSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new BadRequestError("Validation failed", parsed.error.flatten().fieldErrors);
  }
  const data = parsed.data;
  const doc = await getOrCreateSettings();
  const orphans: string[] = [];

  if (data.directorName !== undefined) doc.directorName = data.directorName;

  if (data.timetableKey !== undefined && data.timetableKey !== doc.timetableKey) {
    if (doc.timetableKey) orphans.push(doc.timetableKey);
    doc.timetableKey = data.timetableKey;
  }

  if (data.rulesKey !== undefined && data.rulesKey !== doc.rulesKey) {
    if (doc.rulesKey) orphans.push(doc.rulesKey);
    doc.rulesKey = data.rulesKey;
  }

  await doc.save();
  if (orphans.length) await Promise.all(orphans.map(safeDeleteKey));

  res.status(StatusCodes.OK).json(toResponse(doc));
};
