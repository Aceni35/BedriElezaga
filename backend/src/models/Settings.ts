import { Schema, model, type HydratedDocument, type InferSchemaType } from "mongoose";

const settingsSchema = new Schema(
  {
    directorName: { type: String, default: "", trim: true },
    timetableKey: { type: String, default: "" },
    rulesKey: { type: String, default: "" },
  },
  { timestamps: true }
);

export type SettingsDoc = HydratedDocument<InferSchemaType<typeof settingsSchema>>;
export const Settings = model("Settings", settingsSchema);
