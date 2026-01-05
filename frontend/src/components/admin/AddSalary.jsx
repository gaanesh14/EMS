import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";

function AddSalary() {
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const [basicSalary, setBasicSalary] = useState("");
  const [bonus, setBonus] = useState("");
  const [allowance, setAllowance] = useState("");
  const [deductions, setDeductions] = useState("");
  const [month, setMonth] = useState("");

  const navigate = useNavigate()

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
  }, []);

  // Fetch Employees based on department
  useEffect(() => {
    if (!department) return;
    const token = sessionStorage.getItem("token");

    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }salary/employees?department=${department}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => setEmployees(res.data.employees))
      .catch((err) => console.log(err));
  }, [department]);

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    axios
      .post(
        `${import.meta.env.VITE_API_URL}salary/add-salary`,
        {
          employeeId,
          month,
          basicSalary,
          bonus,
          deductions,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => toast.success("Salary added successfully"))
      navigate('/managesalary')
      .catch((err) => toast.error(err.response?.data?.message || "Error"));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 overflow-y-hidden">
      <div className="bg-white w-full max-w-4xl shadow-xl rounded-xl p-8">
        <div className="flex justify-between mb-6 border-b pb-2">
          <h2 className="text-2xl font-bold text-gray-700 ">Add Salary</h2>
          <button
              onClick={() => navigate('/managesalary')}
            className="h-6 w-6 text-2xl -mt-4 hover:bg-red-500 rounded-lg"
          >
            <MdClose />
          </button>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* {department} */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Select department</option>
               {departments.map((dept) => (
                 <option key={dept._id} value={dept.name}> 
                    {dept.name}
                 </option>
               ))}
            </select>
          </div>

          {/* {employee} */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1"> Employee </label>
            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              <option value="">Select Employee</option>

              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.userName} ({emp.empId})
                </option>
              ))}
            </select>
          </div>

          {/* Basic Salary */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">
              Basic salary
            </label>
            <input
              type="text"
              pattern="[0-9]*"
              placeholder="Salary"
              value={basicSalary}
              onChange={(e) => setBasicSalary(e.target.value.replace(/[^0-9]/g,''))}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Allowance */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">Allowance</label>
            <input
              type="text"
              pattern="[0-9]*"
              placeholder="allloance"
              value={allowance}
              onChange={(e) => setAllowance(e.target.value.replace(/[^0-9]/g,''))}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          {/* {Deduction} */}

          {/* Designation */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">Deduction</label>
            <input
              type="text"
              pattern="[0-9]*"
              placeholder="dedution"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value.replace(/[^0-9]/g,''))}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* DOP */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">Pay Date</label>
            <input
              type="date"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
        </form>

        {/* Submit */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 shadow-md"
          >
            Add Salary
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSalary;
