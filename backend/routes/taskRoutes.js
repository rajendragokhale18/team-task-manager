import express from "express";

import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// ==============================
// CREATE TASK
// ==============================

router.post(
  "/",
  protect,
  createTask
);

// ==============================
// GET ALL TASKS
// ==============================

router.get(
  "/",
  protect,
  getAllTasks
);

// ==============================
// GET SINGLE TASK
// ==============================

router.get(
  "/:id",
  protect,
  getTaskById
);

// ==============================
// UPDATE TASK
// ==============================

router.put(
  "/:id",
  protect,
  updateTask
);

// ==============================
// DELETE TASK
// ==============================

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteTask
);

export default router;