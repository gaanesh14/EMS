import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function AddEmployees() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // ⭐ Required by backend
  const [empId, setEmpId] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !userName ||
      !email ||
      !password ||
      // !empId ||
      !dob ||
      !gender ||
      !maritalStatus ||
      !designation ||
      !department ||
      !role
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/employee/add",
        {
          userName,
          email,
          password,
         // empId,
          dob,
          gender,
          maritalStatus,
          designation,
          department,
          role,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Employee added successfully!");
      navigate("/employees");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding employee");
      console.log("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 overflow-y-hidden">
      <div className="bg-white w-full max-w-4xl shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-2">
          Add New Employee
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter employee full name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter employee email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="Set login password for employee"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Employee ID */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">
              Employee ID
            </label>
            <input
              type="text"
              placeholder="Enter unique employee ID"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* DOB */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Marital Status */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">
              Marital Status
            </label>
            <select
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Select marital status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>

          {/* Designation */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">
              Designation
            </label>
            <input
              type="text"
              placeholder="Ex: Software Engineer, Manager"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Select department</option>
              <option value="IT">IT</option>
              <option value="Logistics">Logistics</option>
              <option value="HR">Human Resource</option>
            </select>
          </div>
          {/* {role} */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
        </form>

        {/* Submit */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 shadow-md"
          >
            Add Employee
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEmployees;
