import React, { useState, useEffect } from "react";
import axios from "axios";

function Salarypage() {
  const [salaries, setSalaries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_API_URL}salary/mysalary`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSalaries(res.data.salaries))
      .catch((err) => console.log(err));
  }, []);

  const filteredSalaries = salaries.filter((item) =>
    item.employeeId?.empId?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 w-full min-h-screen bg-gray-100">
      <h2 className="text-2xl text-black flex justify-center">
        {" "}
        Salary Histroy
      </h2>
      <div className="flex justify-end">
        <input
          className="mt-6 p-3 w-72 border rounded-lg"
          type="text"
          placeholder="Search By EMP ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mt-4 bg-white rounded-lg shadow-md">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr className="border-b">
              <th className="p-2"> S.NO </th>
              <th className="p-2"> Emp ID </th>
              <th className="p-2"> Salary </th>
              <th className="p-2"> Allowance </th>
              <th className="p-2"> Deduction </th>
              <th className="p-2"> Total </th>
              <th className="p-2"> Pay Date </th>
            </tr>
          </thead>
          <tbody>
            {filteredSalaries.length > 0 ? (
              filteredSalaries.map((s, i) => (
                <tr className="border-b" key={s._id}>
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">{s.employeeId?.empId || "N/A"}</td>
                  <td className="p-2">{s.basicSalary}</td>
                  <td className="p-2">{s.bonus}</td>
                  <td className="p-2">{s.deductions}</td>
                  <td className="p-2">{s.netSalary}</td>
                  <td className="p-2">{s.month}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  {" "}
                  No Data found{" "}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Salarypage;
