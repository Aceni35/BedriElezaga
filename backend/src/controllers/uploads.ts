import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { randomUUID } from "node:crypto";
import { BadRequestError } from "../errors/index.js";
import { deleteObject, presignUpload, publicUrlFor } from "../helpers/r2.js";
import { classify, signUploadSchema } from "../validators/uploads.js";

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

const FOLDER_BY_KIND = {
  image: "images",
  video: "videos",
  document: "documents",
} as const;

export const signUpload: RequestHandler = async (req, res) => {
  const parsed = signUploadSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new BadRequestError("Validation failed", parsed.error.flatten().fieldErrors);
  }

  const { contentType, size } = parsed.data;
  const kind = classify(contentType)!;
  const folder = FOLDER_BY_KIND[kind];
  const ext = EXT_BY_TYPE[contentType];
  const key = `${folder}/${randomUUID()}.${ext}`;

  const expiresIn = 300;
  const uploadUrl = await presignUpload({ key, contentType, contentLength: size, expiresIn });

  res.status(StatusCodes.OK).json({
    key,
    uploadUrl,
    publicUrl: publicUrlFor(key),
    contentType,
    expiresIn,
  });
};

export const removeUpload: RequestHandler = async (req, res) => {
  const key = (req.body as { key?: unknown })?.key;
  if (typeof key !== "string" || !key) {
    throw new BadRequestError("Missing key");
  }
  await deleteObject(key);
  res.status(StatusCodes.NO_CONTENT).send();
};
