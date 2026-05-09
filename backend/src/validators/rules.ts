import { z } from "zod";

const translatedFieldSchema = z.object({
  sq: z.string().max(500),
  en: z.string().max(500),
  me: z.string().max(500),
});

const nonEmptyTranslated = translatedFieldSchema.refine(
  (v) => v.sq.trim() && v.en.trim() && v.me.trim(),
  { message: "All three languages are required" }
);

export const createRuleSchema = z.object({
  title: nonEmptyTranslated,
  items: z.array(nonEmptyTranslated).min(1).max(50),
  order: z.coerce.number().int().min(0).max(10000).optional(),
});

export const updateRuleSchema = createRuleSchema.partial();

export const translateRequestSchema = z.object({
  source: z.enum(["sq", "en", "me"]),
  texts: z.array(z.string().max(500)).min(1).max(60),
});

export type CreateRuleInput = z.infer<typeof createRuleSchema>;
export type UpdateRuleInput = z.infer<typeof updateRuleSchema>;
export type TranslateRequest = z.infer<typeof translateRequestSchema>;
