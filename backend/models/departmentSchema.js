import mongoose from "mongoose";
const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim:true
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Department = mongoose.model("department", departmentSchema);
export default Department;
