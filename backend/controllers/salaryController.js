import Salary from "../models/salarySchema.js";
import Employee from "../models/empSchema.js";

//  @ get Employee by Department
export const getEmployeesByDepartment = async (req, res) => {
  try {
    const { department } = req.query;

    if (!department) {
      return res
        .status(400)
        .json({ success: false, message: "Department is required" });
    }

    const employees = await Employee.find(
      { department },
      "userName empId email department designation"
    );

    res.status(200).json({ success: true, employees });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @ ADD Salary for Employee
export const addSalary = async (req, res) => {
  try {
    const { employeeId, month, basicSalary, bonus, deductions } = req.body;

    if (!employeeId || !month || !basicSalary) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    const netSalary =
      Number(basicSalary) + Number(bonus || 0) - Number(deductions || 0);

    const salary = await Salary.create({
      employeeId,
      month,
      basicSalary,
      bonus,
      deductions,
      netSalary,
      paymentStatus: "Pending",
    });

    res.status(201).json({ success: true, salary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log("error:", error);
  }
};

// @ get Emp salary
export const getMySalary = async (req, res) => {
  try {
    const salaries = await Salary.find({ employeeId: req.user.id }).populate("employeeId","empId username").sort({
      createdAt: -1,
    });

    res.status(200).json({ success: true, salaries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSalaryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    if (!["Paid", "Pending"].includes(paymentStatus)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const updated = await Salary.findByIdAndUpdate(
      id,
      { paymentStatus },
      { new: true }
    );

    res.json({ success: true, updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllSalary = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    let query = {};

    // Search by emp ID (employee.empId)
    if (search) {
      query = { "employee.empId": { $regex: search, $options: "i" } };
    }

    const salaries = await Salary.find()
      .populate("employeeId", "userName empId department")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Salary.countDocuments();

    res.json({
      success: true,
      salaries,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
