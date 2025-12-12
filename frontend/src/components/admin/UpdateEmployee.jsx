import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { toast } from "sonner";

function UpdateEmployee() {
  const [mail, setmail] = useState("");
  const [doj, setDoj] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [empId, setEmpId] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  // Update Department
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}department/all`
      );
      setDepartments(data.department);
    };
    fetchDepartments();
  }, [department]);

  // get data from backend
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_API_URL}employee/single/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const emp = res.data.user;

        // PREFILL THE FORM
        setmail(emp.email); // FIX: email, not mail
        setDoj(emp.doj);
        setGender(emp.gender);
        setMaritalStatus(emp.maritalStatus);
        setEmpId(emp.empId);
        setDesignation(emp.designation);
        setDepartment(emp.department);
        setRole(emp.role); // if you stored role
      })
      .catch((err) => console.log("Fetch Error:", err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!mail || !empId || !designation || !department || !role) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");

      const updatedData = await axios.put(
        `${import.meta.env.VITE_API_URL}employee/edit/${id}`, // employee id from params
        {
          email: mail,
          doj,
          gender,
          maritalStatus,
          empId,
          designation,
          department,
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Employee Updated:", updatedData.data);

      toast.success("Employee updated successfully");
      navigate("/employees");
    } catch (error) {
      console.log("Update Error:", error);
      toast.error(error.response?.data?.message || "Error updating employee");
    }
  };
  const closeButton = () => {
    navigate("/employees");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
      <div className="bg-white w-full max-w-4xl shadow-xl rounded-xl p-8">
        <div className="flex justify-between mb-6 border-b pb-2">
          <h2 className="text-2xl font-bold text-gray-700 ">Edit Employee</h2>
          <button
            onClick={closeButton}
            className="h-6 w-6 text-2xl -mt-4 hover:bg-red-500 rounded-lg"
          >
            <MdClose />
          </button>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Employee ID */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">
              Employee ID
            </label>
            <input
              type="text"
              placeholder="Insert ID"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            />
          </div>

          {/* DOJ */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">
              Date Of Joining
            </label>
            <input
              type="date"
              value={doj}
              onChange={(e) => setDoj(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            />
          </div>
          {/* Department */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            >
              {departments.map((dept) => (
                <option key={dept._id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            >
              <option value="">Select Gender</option>
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
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            >
              <option value="">Select Status</option>
              <option value="Married">Married</option>
              <option value="Single">Single</option>
            </select>
          </div>

          {/* Designation */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">
              Designation
            </label>
            <input
              type="text"
              placeholder="Designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="Insert Mail"
              value={mail}
              onChange={(e) => setmail(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            />
          </div>

          {/* {Role} */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            >
              <option value="">Select Role</option>
              <option value="admin"> Admin </option>
              <option value="employee"> Employee </option>
            </select>
          </div>
        </form>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleUpdate}
            type="submit"
            className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md w-full"
          >
            Update Employee
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateEmployee;
