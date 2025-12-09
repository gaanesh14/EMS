import mongoose from "mongoose";

const salarySchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employees",
      required: true,
    },
    month: {
      type: String,
      required: true,
    }, 
    basicSalary: {
      type: Number,
      required: true,
    },
    bonus: { 
        type: Number, 
        default: 0 },
    deductions: {
      type: Number,
      default: 0,
    },
    netSalary: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Salary = mongoose.model("salaries", salarySchema);
export default Salary;
