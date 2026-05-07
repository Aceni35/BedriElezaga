import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('errors.invalidEmail'),
  password: z.string().min(1, 'errors.passwordRequired'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
