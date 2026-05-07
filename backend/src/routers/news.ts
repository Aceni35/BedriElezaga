import { Router } from "express";
import { checkAuth } from "../middleware/auth.js";
import {
  createNews,
  deleteNews,
  getNews,
  listNews,
  updateNews,
} from "../controllers/news.js";

export const newsRouter = Router();

newsRouter.get("/", listNews);
newsRouter.get("/:id", getNews);
newsRouter.post("/", checkAuth, createNews);
newsRouter.patch("/:id", checkAuth, updateNews);
newsRouter.delete("/:id", checkAuth, deleteNews);
