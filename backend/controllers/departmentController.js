import Department from "../models/departmentSchema.js";
import Employee from "../models/empSchema.js";

// Add a new department
export const addDepartment = async (req, res) => {
  try {
    const { name, desc } = req.body;
    const newDepartment = new Department({ name, desc });
    await newDepartment.save();
    res.status(201).json({
      message: "Department added successfully",
      department: newDepartment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
    console.log("error", error);
  }
};

//get all departments
export const getAllDepartments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default page 1
    const limit = 10; // 10 per page
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    let query = {};

    if (search) {
      query = {
        name: { $regex: search, $options: "i" },
      };
    }

    const department = await Department.find(query).skip(skip).limit(limit);
    const total = await Department.countDocuments(query);

    res.json({
      success: true,
      department,
      page,
      totalPages: Math.ceil(total / limit),
      totalEmployees: total,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
    console.log("error", error);
  }
};
//get single department
export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json({ success: true, department });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
    console.log("error", error);
  }
};

//delete department
export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
    console.log("error", error);
  }
};

//update department
export const updateDepartment = async (req, res) => {
  try {
    const { name, desc } = req.body;
    const deptId = req.params.id;

    // 🔍 Check duplicate name (excluding current department)
    const existingDept = await Department.findOne({
      name,
      _id: { $ne: deptId },
    });

    if (existingDept) {
      return res.status(400).json({
        message: "Department name already exists",
      });
    }

    const department = await Department.findByIdAndUpdate(
      deptId,
      { name, desc },
      { new: true, runValidators: true }
    );
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res
      .status(200)
      .json({ message: "Department updated successfully", department });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
    console.log("error", error);
  }
};

// Count of departments and Employees for Dashboard
export const getDepartmentAndEmployeeCount = async (req, res) => {
  try {
    const departmentCount = await Department.countDocuments();
    // Assuming Employee model is imported
    const employeeCount = await Employee.countDocuments();
    res.status(200).json({ departmentCount, employeeCount });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
    console.log("error", error);
  }
};
