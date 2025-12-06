import {
  addDepartment,
  updateDepartment,
  getAllDepartments,
  getDepartmentById,
  deleteDepartment,
  getDepartmentAndEmployeeCount,
} from "../controllers/departmentController.js";

import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

//Get all departments
router.get("/all", getAllDepartments);

//Get single department
router.get("/single/:id", getDepartmentById);

// Count Routes
router.get("/count", protect, getDepartmentAndEmployeeCount);

// Admin routes
//Add department
router.post("/add", protect, isAdmin, addDepartment);
//Delete department
router.delete("/delete/:id", protect, isAdmin, deleteDepartment);
//Update department
router.put("/edit/:id", protect, isAdmin, updateDepartment);

export default router;
