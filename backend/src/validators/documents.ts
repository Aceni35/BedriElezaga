import { z } from "zod";
import { DOCUMENT_CATEGORIES } from "../models/Document.js";

const baseShape = {
  name: z.string().min(1).max(255).trim(),
  fileKey: z.string().min(1),
  contentType: z.string().min(1).max(150),
  size: z.coerce.number().int().nonnegative(),
  category: z.enum(DOCUMENT_CATEGORIES),
};

export const createDocumentSchema = z.object(baseShape);
export const updateDocumentSchema = z.object(baseShape).partial();

export const listDocumentsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  category: z.enum(DOCUMENT_CATEGORIES).optional(),
  search: z.string().min(1).max(200).optional(),
  sort: z.string().default("-createdAt"),
});

export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;
export type UpdateDocumentInput = z.infer<typeof updateDocumentSchema>;
export type ListDocumentsQuery = z.infer<typeof listDocumentsQuerySchema>;
