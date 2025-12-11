import express from "express";
import {
  registerUser,
  loginUser,
  changePassword,
  googleLogin,
} from "../controllers/authController.js";


const router = express.Router();

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleLogin); // Google OAuth login route
router.put("/change-password/:id", changePassword); // Placeholder for forgot password route

export default router;
