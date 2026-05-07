import { Router } from "express";
import { checkAuth } from "../middleware/auth.js";
import {
  createStaff,
  deleteStaff,
  getStaff,
  listStaff,
  updateStaff,
} from "../controllers/staff.js";

export const staffRouter = Router();

staffRouter.get("/", listStaff);
staffRouter.get("/:id", getStaff);
staffRouter.post("/", checkAuth, createStaff);
staffRouter.patch("/:id", checkAuth, updateStaff);
staffRouter.delete("/:id", checkAuth, deleteStaff);
