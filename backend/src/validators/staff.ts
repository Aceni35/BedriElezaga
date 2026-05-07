import { z } from "zod";
import { STAFF_CATEGORIES } from "../models/Staff.js";

const baseShape = {
  fullName: z.string().min(1).max(120).trim(),
  category: z.enum(STAFF_CATEGORIES),
  position: z.string().min(1).max(120).trim(),
  description: z.string().max(2000).trim().optional(),
  memberSince: z.coerce.number().int().min(1900).max(2100),
  email: z.string().email().max(200).optional().or(z.literal("")).transform((v) => (v ? v : undefined)),
  phone: z.string().min(3).max(40).trim().optional(),
  pictureKey: z.string().min(1),
};

export const createStaffSchema = z.object(baseShape);
export const updateStaffSchema = z.object(baseShape).partial();

export const listStaffQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  category: z.enum(STAFF_CATEGORIES).optional(),
  search: z.string().min(1).max(200).optional(),
  sort: z.string().default("fullName"),
});

export type CreateStaffInput = z.infer<typeof createStaffSchema>;
export type UpdateStaffInput = z.infer<typeof updateStaffSchema>;
export type ListStaffQuery = z.infer<typeof listStaffQuerySchema>;
