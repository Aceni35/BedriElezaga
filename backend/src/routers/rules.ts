import { Router } from "express";
import { checkAuth } from "../middleware/auth.js";
import {
  createRule,
  deleteRule,
  listRules,
  translateRules,
  updateRule,
} from "../controllers/rules.js";

export const rulesRouter = Router();

rulesRouter.get("/", listRules);
rulesRouter.post("/translate", checkAuth, translateRules);
rulesRouter.post("/", checkAuth, createRule);
rulesRouter.patch("/:id", checkAuth, updateRule);
rulesRouter.delete("/:id", checkAuth, deleteRule);
