import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ManageSalary() {
  const [salary, setSalary] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // Fetch salary list
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_API_URL}salary/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setSalary(res.data.salaries);
      })
      .catch((err) => console.log(err));
  }, [page, search]);

  // Update Status Handler
  const handleStatusChange = (id, newStatus) => {
    const token = sessionStorage.getItem("token");

    axios
      .put(
        `${import.meta.env.VITE_API_URL}salary/salary-status/${id}`,
        { paymentStatus: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        // update UI without reloading
        setSalary((prev) =>
          prev.map((s) =>
            s._id === id ? { ...s, paymentStatus: newStatus } : s
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const pageSize = 10;

  // 1. filter first
  const filteredSalary = salary.filter((s) =>
    s.employeeId?.empId?.toLowerCase().includes(search.toLowerCase())
  );

  // 2. calculate total pages
  const totalPages = Math.ceil(filteredSalary.length / pageSize);

  // 3. paginate AFTER filtering
  const paginatedSalary = filteredSalary.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="p-4 w-full min-h-screen bg-gray-100">
      <h3 className="text-2xl font-bold mb-4">Salary Management</h3>

      {/* Search + Add */}
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Search by Emp ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 w-72 border rounded-lg mt-6"
        />

        <button
          onClick={() => navigate("/addsalary")}
          className="bg-teal-700 text-white w-52 h-12 mt-6 rounded-md"
        >
          Add Salary
        </button>
      </div>

      {/* TABLE */}
      <div className="mt-6 bg-white rounded-lg shadow-md ">
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-gray-50 shadow z-10">
              <tr>
                <th className="p-2">S.no</th>
                <th className="p-2">Emp ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>

            <tbody>
              {paginatedSalary.length > 0 ? (
                paginatedSalary.map((s, index) => (
                  <tr key={s._id} className="border-b">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{s.employeeId?.empId}</td>
                    <td className="p-2">{s.employeeId?.userName}</td>
                    <td className="p-2">
                      <select
                        value={s.paymentStatus}
                        onChange={(e) =>
                          handleStatusChange(s._id, e.target.value)
                        }
                        className="border px-2 py-1 rounded"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                      </select>
                    </td>
                    <td className="p-2">
                      {s.month}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4 text-gray-500">
                    No Data found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-end gap-6 items-center mt-4">
        <p>
          {page} of {totalPages}
        </p>

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          {"<"}
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          {">"}
        </button>
      </div>

    </div>
  );
}

export default ManageSalary;
