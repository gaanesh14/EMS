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
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    password: {
      type: String,
      required: function () {
        return this.authProvider === "local";
      },
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
    doj: {
      type:Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    maritalStatus: {
      type: String,
      enum: ["Married", "Un Married", "Single"],
    },
    department: {
      //type: mongoose.Schema.Types.ObjectId,
      type:String,
      //ref:"department"
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
