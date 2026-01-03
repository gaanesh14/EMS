import {
  createEmployee,
  singleEmployeeDetails,
  updateEmployee,
  deleteEmployee,
  getEmployees,
} from "../controllers/empController.js";
import { chatWithAI } from "../controllers/chatController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import express from "express";


const router = express.Router();

// only employees can access
router.get("/single/:id", protect, singleEmployeeDetails);
router.get("/", protect, getEmployees);

// only admins can access
router.post("/add", protect, isAdmin, createEmployee);
router.put("/edit/:id", protect, isAdmin, updateEmployee);
router.delete("/delete/:id", protect, isAdmin, deleteEmployee);

// Chat with AI
router.post("/chat", protect, chatWithAI);
export default router;
