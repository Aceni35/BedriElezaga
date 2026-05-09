import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { isValidObjectId } from "mongoose";
import { RuleSection, type RuleSectionDoc } from "../models/Rules.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { translateMany } from "../helpers/translate.js";
import {
  createRuleSchema,
  translateRequestSchema,
  updateRuleSchema,
} from "../validators/rules.js";

function toResponse(doc: RuleSectionDoc) {
  const obj = doc.toObject();
  return {
    id: String(obj._id),
    order: obj.order ?? 0,
    title: obj.title,
    items: obj.items ?? [],
    createdAt: (obj as unknown as { createdAt: Date }).createdAt,
    updatedAt: (obj as unknown as { updatedAt: Date }).updatedAt,
  };
}

export const listRules: RequestHandler = async (_req, res) => {
  const docs = await RuleSection.find().sort({ order: 1, createdAt: 1 });
  res.status(StatusCodes.OK).json({
    items: docs.map(toResponse),
  });
};

export const createRule: RequestHandler = async (req, res) => {
  const parsed = createRuleSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new BadRequestError("Validation failed", parsed.error.flatten().fieldErrors);
  }
  const { title, items, order } = parsed.data;

  let nextOrder = order;
  if (nextOrder === undefined) {
    const last = await RuleSection.findOne().sort({ order: -1 }).select("order").lean();
    nextOrder = last?.order != null ? last.order + 1 : 0;
  }

  const doc = await RuleSection.create({
    order: nextOrder,
    title,
    items,
  });

  res.status(StatusCodes.CREATED).json(toResponse(doc));
};

export const updateRule: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) throw new NotFoundError("Rule not found");

  const parsed = updateRuleSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new BadRequestError("Validation failed", parsed.error.flatten().fieldErrors);
  }
  const data = parsed.data;

  const doc = await RuleSection.findById(id);
  if (!doc) throw new NotFoundError("Rule not found");

  if (data.title !== undefined) doc.title = data.title;
  if (data.items !== undefined) doc.items = data.items as typeof doc.items;
  if (data.order !== undefined) doc.order = data.order;

  await doc.save();
  res.status(StatusCodes.OK).json(toResponse(doc));
};

export const deleteRule: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) throw new NotFoundError("Rule not found");

  const doc = await RuleSection.findByIdAndDelete(id);
  if (!doc) throw new NotFoundError("Rule not found");

  res.status(StatusCodes.NO_CONTENT).send();
};

export const translateRules: RequestHandler = async (req, res) => {
  const parsed = translateRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new BadRequestError("Validation failed", parsed.error.flatten().fieldErrors);
  }
  const { source, texts } = parsed.data;
  const translations = await translateMany(texts, source);
  res.status(StatusCodes.OK).json({ translations });
};
