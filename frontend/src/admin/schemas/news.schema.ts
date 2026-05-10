import { z } from 'zod';
import { NEWS_CATEGORIES } from '../../types/news';

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '').trim();

export const newsFormSchema = z
  .object({
    title: z.string().trim().min(1, 'errors.titleRequired').max(200, 'errors.max200'),
    category: z.enum(NEWS_CATEGORIES),
    publishedAt: z.string().min(1, 'errors.dateRequired'),
    editorMode: z.enum(['paragraphs', 'tiptap']),
    paragraphs: z.array(z.object({ text: z.string() })).default([]),
    bodyHtml: z.string().default(''),
  })
  .superRefine((data, ctx) => {
    if (data.editorMode === 'tiptap') {
      if (stripHtml(data.bodyHtml).length === 0) {
        ctx.addIssue({
          code: 'custom',
          message: 'errors.atLeastOneParagraph',
          path: ['bodyHtml'],
        });
      }
      return;
    }
    const hasParagraph = data.paragraphs.some((p) => p.text.trim().length > 0);
    if (!hasParagraph) {
      ctx.addIssue({
        code: 'custom',
        message: 'errors.atLeastOneParagraph',
        path: ['paragraphs'],
      });
    }
  });

export type NewsFormValues = z.infer<typeof newsFormSchema>;
