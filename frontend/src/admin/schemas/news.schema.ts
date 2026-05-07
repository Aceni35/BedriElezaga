import { z } from 'zod';
import { NEWS_CATEGORIES } from '../../types/news';

export const newsFormSchema = z.object({
  title: z.string().trim().min(1, 'errors.titleRequired').max(200, 'errors.max200'),
  category: z.enum(NEWS_CATEGORIES),
  publishedAt: z.string().min(1, 'errors.dateRequired'),
  paragraphs: z
    .array(z.object({ text: z.string() }))
    .min(1)
    .refine((arr) => arr.some((p) => p.text.trim().length > 0), {
      message: 'errors.atLeastOneParagraph',
    }),
});

export type NewsFormValues = z.infer<typeof newsFormSchema>;
