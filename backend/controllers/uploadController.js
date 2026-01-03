import { v2 as cloudinary } from "cloudinary";
import Employee from "../models/empSchema.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "employees" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        stream.end(req.file.buffer);
      });

    const result = await streamUpload();

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        image: {
          url: result.secure_url,
          public_id: result.public_id,
        },
      },
      { new: true }
    );

    res.json({ employee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

// @Remove Image
export const removeImage = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (employee?.image?.public_id) {
      await cloudinary.uploader.destroy(employee.image.public_id);
    }

    employee.image = null;
    await employee.save();

    res.json({ employee });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};


