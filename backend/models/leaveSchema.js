import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    empId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employees",
      required: true,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    reasonType: {
      type: String,
      enum: ["sick", "casual", "paid"],
      default: "casual",
    },
    status: {
      type: String,
      enum: ["applied", "pending", "approved", "rejected"],
      default: "pending",
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Leave = mongoose.model("leaves", leaveSchema);
export default Leave;
