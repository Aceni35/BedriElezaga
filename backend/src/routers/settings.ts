import { Router } from "express";
import { checkAuth } from "../middleware/auth.js";
import { getSettings, updateSettings } from "../controllers/settings.js";

export const settingsRouter = Router();

settingsRouter.get("/", getSettings);
settingsRouter.patch("/", checkAuth, updateSettings);
