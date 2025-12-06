import mongoose from "mongoose";

const empSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee",
    },
    designation: {
      type: String,
    },
    empId: {
      type: String,
    },
    dob: {
      //type:Date,
      type: String,
      createdAt: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    maritalStatus: {
      type: String,
      enum: ["Married","Un Married", "Single"],
    },
    department: {
      type: String,
      enum: ["Logistics", "HR", "IT"],
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("employees", empSchema);
export default Employee;
