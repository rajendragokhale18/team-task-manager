import express from "express";

import { generateTasks } from "../controllers/aiController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/generate",
  protect,
  generateTasks
);

export default router;