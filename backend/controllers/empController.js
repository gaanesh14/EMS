import Employee from "../models/empSchema.js";
import bcrypt from "bcryptjs";


//  Route @get users
export const getEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default page 1
    const limit = 10; // 10 per page
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    let query = {};

    if (search) {
      query = {
        $or: [
          { userName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { empId: { $regex: search, $options: "i" } }, //  number/string
        ],
      };
    }

    const employees = await Employee.find(query)
      .skip(skip)
      .limit(limit);

    const total = await Employee.countDocuments(query);

    res.json({
      success: true,
      employees,
      page,
      totalPages: Math.ceil(total / limit),
      totalEmployees: total,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @get get single employee Details in profile
export const singleEmployeeDetails = async (req, res) => {
  try {
    const user = await Employee.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log("error", error);
  }
};

// @post creating a new employee

export const createEmployee = async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
      empId,
      doj,
      gender,
      maritalStatus,
      designation,
      department,
    } = req.body;

    // Check email exists
    const exists = await Employee.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // Hash password before saving
    const hashedPass = await bcrypt.hash(password, 10);

    // Create employee
    const employee = await Employee.create({
      userName,
      email,
      password: hashedPass, // hashed password here
      empId,
      doj,
      gender,
      maritalStatus,
      designation,
      department,
      role: "employee",
    });

    res.status(201).json({
      success: true,
      employee,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log("Error creating employee:", error);
  }
};

// @PUT Update Employee
export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "updated Successfully",
      success: true,
      employee,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log("error", error);
  }
};

// @DELETE Employee
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log("error", error);
  }
};
