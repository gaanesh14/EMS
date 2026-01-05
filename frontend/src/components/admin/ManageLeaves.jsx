import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePayroll } from "../hooks/usePayroll";

function ManageLeaves() {
  const navigate = useNavigate();
  const {
    leaves,
    fetchLeaves,
    leaveSearch,
    setLeaveSearch,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    totalPages,
  } = usePayroll();

  useEffect(() => {
    fetchLeaves();
  }, [page, leaveSearch, statusFilter]);

  return (
    <div className="p-4 w-full min-h-screen bg-gray-100">
      <h3 className="text-2xl font-bold text-center mb-4">Manage Leaves</h3>

      {/* Search + Status Filters */}
      <div className="flex justify-between items-center mb-4">
        <input
          className="p-3 w-72 border rounded-lg"
          type="text"
          placeholder="Search By Leave Type"
          value={leaveSearch}
          onChange={(e) => setLeaveSearch(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            onClick={() => setStatusFilter("pending")}
            className={`px-4 py-2 rounded-md text-white font-semibold ${
              statusFilter === "pending" ? "bg-teal-900" : "bg-teal-700"
            }`}
          >
            Pending
          </button>

          <button
            onClick={() => setStatusFilter("approved")}
            className={`px-4 py-2 rounded-md text-white font-semibold ${
              statusFilter === "approved" ? "bg-teal-900" : "bg-teal-700"
            }`}
          >
            Approved
          </button>

          <button
            onClick={() => setStatusFilter("rejected")}
            className={`px-4 py-2 rounded-md text-white font-semibold ${
              statusFilter === "rejected" ? "bg-teal-900" : "bg-teal-700"
            }`}
          >
            Rejected
          </button>

          <button
            onClick={() => setStatusFilter("")}
            className="px-4 py-2 rounded-md bg-gray-600 text-white font-semibold"
          >
            Clear
          </button>
        </div>
      </div>

      {/* LEAVES TABLE */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-gray-50 shadow z-10">
              <tr className="border-b">
                <th className="p-2">S.no</th>
                <th className="p-2">Emp ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Leave Type</th>
                <th className="p-2">Department</th>
                <th className="p-2">Days</th>
                <th className="p-2">Status</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {leaves.length > 0 ? (
                leaves.map((leave, index) => (
                  <tr key={leave._id} className="border-b">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{leave.empId?.empId || "N/A"}</td>
                    <td className="p-2">{leave.empId?.userName}</td>
                    <td className="p-2 capitalize">{leave.reasonType}</td>
                    <td className="p-2">{leave.empId?.department}</td>
                    <td className="p-2">
                      {/* Calculate day difference */}
                      {Math.ceil(
                        (new Date(leave.toDate) - new Date(leave.fromDate)) /
                          (1000 * 60 * 60 * 24)
                      ) + 1}
                    </td>

                    {/* STATUS BADGE */}
                    <td className="p-2">
                      <span
                        className={`px-3 py-1 rounded text-white capitalize ${
                          leave.status === "approved"
                            ? "bg-green-600"
                            : leave.status === "rejected"
                            ? "bg-red-600"
                            : "bg-yellow-500"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>

                    <td className="p-2">
                      <button
                        onClick={() =>
                          navigate(`/leavedetails?id=${leave?._id}`)
                        }
                        className="px-3 py-1 bg-teal-700 text-white rounded-md"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4 text-gray-500">
                    No leaves found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center p-4">
        <p>
          Rows per page: <b>10</b>
        </p>

        <div className="flex items-center gap-3">
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
    </div>
  );
}

export default ManageLeaves;
