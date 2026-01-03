import Employee from "../models/empSchema.js";
import { cloudinary } from "../middleware/upload.js";

// Upload employee image
export const uploadEmployeeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.json({
      message: "Image uploaded successfully",
      imageUrl: req.file.path,
      public_id: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update employee image
export const updateEmployeeImage = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (req.file) {
      // delete old image from cloudinary
      if (employee.image?.public_id) {
        await cloudinary.uploader.destroy(employee.image.public_id);
      }

      employee.image = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    await employee.save();

    res.json({
      message: "Image updated successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove employee image
export const removeEmployeeImage = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (employee.image?.public_id) {
      await cloudinary.uploader.destroy(employee.image.public_id);
    }

    employee.image = null;
    await employee.save();

    res.json({
      message: "Image removed successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
