import { z } from "zod";

export const updateSettingsSchema = z.object({
  directorName: z.string().max(200).trim().optional(),
  timetableKey: z.string().max(500).optional(),
  rulesKey: z.string().max(500).optional(),
});

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
