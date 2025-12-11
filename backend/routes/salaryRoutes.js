import express from "express";
import {
  addSalary,
  getAllSalary,
  getEmployeesByDepartment,
  getMySalary,
  updateSalaryStatus,
} from "../controllers/salaryController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

//@ GET EMP Salary
router.get("/mysalary", protect, getMySalary);

// admin

// GET EMP BY Department
router.get("/employees", protect, isAdmin, getEmployeesByDepartment);
// POST ADD Salary
router.post("/add-salary", protect, isAdmin, addSalary);
router.put("/salary-status/:id", protect, isAdmin, updateSalaryStatus);
router.get("/all", protect, isAdmin, getAllSalary);

export default router;
