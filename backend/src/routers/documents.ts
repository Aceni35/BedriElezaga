import { Router } from "express";
import { checkAuth } from "../middleware/auth.js";
import {
  createDocument,
  deleteDocument,
  downloadDocument,
  getDocument,
  listDocuments,
  updateDocument,
} from "../controllers/documents.js";

export const documentsRouter = Router();

documentsRouter.get("/", listDocuments);
documentsRouter.get("/:id/download", downloadDocument);
documentsRouter.get("/:id", getDocument);
documentsRouter.post("/", checkAuth, createDocument);
documentsRouter.patch("/:id", checkAuth, updateDocument);
documentsRouter.delete("/:id", checkAuth, deleteDocument);
