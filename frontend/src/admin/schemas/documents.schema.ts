import { z } from 'zod';
import { DOCUMENT_CATEGORIES } from '../../types/documents';

export const documentFormSchema = z.object({
  name: z.string().trim().min(1, 'errors.nameRequired').max(255, 'errors.max255'),
  category: z.enum(DOCUMENT_CATEGORIES),
});

export type DocumentFormValues = z.infer<typeof documentFormSchema>;
