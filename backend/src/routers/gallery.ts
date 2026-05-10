import { Router } from "express";
import { checkAuth } from "../middleware/auth.js";
import { listGallery, upsertGallery, deleteGallery } from "../controllers/gallery.js";

export const galleryRouter = Router();

galleryRouter.get("/", listGallery);
galleryRouter.put("/:section/:category", checkAuth, upsertGallery);
galleryRouter.delete("/:section/:category", checkAuth, deleteGallery);
