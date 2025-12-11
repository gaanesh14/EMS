import express from "express";
import {
  applyLeave,
  getAllLeaves,
  getLeaveById,
  getLeaveStats,
  getMyLeaves,
  updatedLeaveStatus,
} from "../controllers/leaveController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// @employee router
router.post("/apply", protect, applyLeave);
router.get("/myleave", protect, getMyLeaves);
router.get("/stats", protect, getLeaveStats);

// @admin Routes
router.get("/all-leaves", protect, isAdmin, getAllLeaves);
router.get("/:id", protect, isAdmin, getLeaveById);
router.put("/updateleave/:id", protect, isAdmin, updatedLeaveStatus);

export default router;
