import { Router } from "express";
import { checkAuth } from "../middleware/auth.js";
import { removeUpload, signUpload } from "../controllers/uploads.js";

export const uploadsRouter = Router();

uploadsRouter.use(checkAuth);
uploadsRouter.post("/sign", signUpload);
uploadsRouter.delete("/", removeUpload);
