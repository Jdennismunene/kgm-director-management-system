import express from "express";
import cors from "cors";
import path from "path";

import prisma from "./lib/prisma.js";

import childRoutes from "./routes/childRoute.js";
import branchRoutes from "./routes/branchRoute.js";
import gradeRoutes from "./routes/gradeRoute.js";
import parentRoutes from "./routes/parentRoute.js";
import attendanceRoutes from "./routes/attendanceRoute.js";
import lessonRoutes from "./routes/lessonRoute.js";
import discipleshipRoutes from "./routes/discipleshipRoute.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import noteRoutes from "./routes/noteRoute.js";
import documentRoutes from "./routes/documentRoute.js";
import historyRoutes from "./routes/historyRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

// =====================================================
// SERVE UPLOADED DOCUMENTS
// =====================================================
// Makes files inside:
// uploads/documents/
// accessible through:
// /uploads/documents/filename
//
// Example:
// http://localhost:5000/uploads/documents/example.png
// =====================================================

app.use("/uploads", express.static(path.resolve("uploads")));

// =====================================================
// ROOT
// =====================================================

app.get("/", (_req, res) => {
  res.json({
    message: "KGM Sunday School API is running",
  });
});

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      message: "Database connection successful",
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// =====================================================
// API ROUTES
// =====================================================

app.use("/api/children", childRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api", discipleshipRoutes);
app.use("/api", paymentRoutes);
app.use("/api", noteRoutes);
app.use("/api", documentRoutes);
app.use("/api", historyRoutes);

// =====================================================
// SERVER
// =====================================================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`KGM server running on http://localhost:${PORT}`);
});