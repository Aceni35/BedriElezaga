import { z } from 'zod';
import { STAFF_CATEGORIES } from '../../types/staff';

const currentYear = new Date().getFullYear();

export const staffFormSchema = z.object({
  fullName: z.string().trim().min(1, 'errors.nameRequired').max(120, 'errors.max120'),
  category: z.enum(STAFF_CATEGORIES),
  position: z.string().trim().min(1, 'errors.positionRequired').max(120, 'errors.max120'),
  description: z.string().trim().max(2000, 'errors.max2000').optional(),
  memberSince: z.coerce
    .number({ invalid_type_error: 'errors.invalidYear' } as never)
    .int('errors.invalidYear')
    .min(1900, 'errors.yearMin1900')
    .max(currentYear, 'errors.yearMaxNow'),
  email: z
    .string()
    .trim()
    .max(200, 'errors.max200')
    .email('errors.invalidEmail')
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .trim()
    .min(3, 'errors.phoneTooShort')
    .max(40, 'errors.max40')
    .optional()
    .or(z.literal('')),
});

export type StaffFormValues = z.infer<typeof staffFormSchema>;
