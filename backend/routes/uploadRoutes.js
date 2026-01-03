import express from "express";
import upload from "../middleware/upload.js";
import {
  uploadEmployeeImage,
  updateEmployeeImage,
  removeEmployeeImage,
} from "../controllers/uploadController.js";

const router = express.Router();

router.put("/:id/upload", upload.single("image"), updateEmployeeImage);
router.put("/:id/remove", removeEmployeeImage);

export default router;
