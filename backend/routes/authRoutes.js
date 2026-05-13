import express from "express";

import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// REGISTER
// POST /api/auth/register
// ==========================================

router.post("/register", registerUser);

// ==========================================
// LOGIN
// POST /api/auth/login
// ==========================================

router.post("/login", loginUser);

// ==========================================
// GET CURRENT USER
// GET /api/auth/me
// ==========================================

router.get("/me", protect, getMe);

export default router;