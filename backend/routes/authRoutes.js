import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  changePassword,
  googleLogin,
  logoutUser,
  refreshToken,
} from "../controllers/authController.js";


const router = express.Router();

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser); // New logout route
router.post("/google", googleLogin); // Google OAuth login route
router.put("/change-password/:id", changePassword); // Placeholder for forgot password route
// Refresh token endpoint should NOT require the access token (it exists to get a new access token).
// The refresh token is validated in the controller.
router.post("/refresh", refreshToken);

export default router;
