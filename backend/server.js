import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
 
import projectRoutes from "./routes/projectRoutes.js";


// FIX FOR NODE 18 + MONGODB UUID ISSUE

 

// ROUTES

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

// ==========================================
// CONFIG
// ==========================================

dotenv.config();

// ==========================================
// EXPRESS APP
// ==========================================

const app = express();

// ==========================================
// MIDDLEWARES
// ==========================================

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ==========================================
// DATABASE CONNECTION
// ==========================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected:", mongoose.connection.host);
  })
  .catch((error) => {
    console.log("❌ MongoDB Error:", error.message);
  });

// ==========================================
// ROUTES
// ==========================================

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);

app.use("/api/ai", aiRoutes);

// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.send("API Running...");
});

// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});