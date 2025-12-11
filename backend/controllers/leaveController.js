import Leave from "../models/leaveSchema.js";

/// @ Apply Leave
export const applyLeave = async (req, res) => {
  try {
    const { fromDate, toDate, reasonType, description } = req.body;

    const leave = await Leave.create({
      empId: req.user.id,
      fromDate,
      toDate,
      reasonType,
      description,
      status: "pending",
    });
    res
      .status(201)
      .json({ success: true, leave, message: "leave applied successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log("error:", error);
  }
};

/// @Update Leave Apporve or reject leave
export const updatedLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const updateLeave = await Leave.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json({ success: true, updateLeave });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log("error:", error);
  }
};

export const getLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id).populate(
      "empId",
      "userName email department image empId"
    );

    res.status(200).json({ success: true, leave });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @employee Leaves
export const getMyLeaves = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const totalLeaves = await Leave.countDocuments({ empId: req.user.id });

    const leaves = await Leave.find({ empId: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      leaves,
      totalLeaves,
      totalPages: Math.ceil(totalLeaves / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log("error:", error);
  }
};

// get All Leaves admin
export const getAllLeaves = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";
    const status = req.query.status || ""; // <---- status filter

    let query = {};

    // Search filter (leave type)
    if (search) {
      query.reasonType = { $regex: search, $options: "i" };
    }

    // Status filter
    if (status) {
      query.status = status; // pending / approved / rejected
    }

    const totalLeaves = await Leave.countDocuments(query);

    const leaves = await Leave.find(query)
      .populate("empId", "userName email department")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      leaves,
      totalLeaves,
      totalPages: Math.ceil(totalLeaves / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Leave Count controllers
export const getLeaveStats = async (req, res) => {
  try {
    const empId = req.user.id; // employee → filter by user
    const role = req.user.role;

    let query = {};

    // Employees should only get their own counts
    if (role === "employee") {
      query.empId = empId;
    }

    // Admin sees all leaves
    // No additional filter needed for admin

    const totalLeaves = await Leave.countDocuments(query);
    const pending = await Leave.countDocuments({ ...query, status: "pending" });
    const approved = await Leave.countDocuments({
      ...query,
      status: "approved",
    });
    const rejected = await Leave.countDocuments({
      ...query,
      status: "rejected",
    });

    res.status(200).json({
      success: true,
      totalLeaves,
      pending,
      approved,
      rejected,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
