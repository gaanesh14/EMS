import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Leavepage() {
  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_API_URL}leave/myleave?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        console.log("data:", res.data);
        setLeaves(res.data.leaves);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.log(err));
  }, [page]);

  // Because backend does pagination already:
  const filtered = leaves?.filter((leave) =>
    leave.reasonType?.toLowerCase().includes(search.toLowerCase())
  );
  // Pagination logic on frontend slice
  const startIndex = 0; // backend already paginated
  const paginated = filtered;

  return (
    <div className="p-4 w-full min-h-screen bg-gray-100">
      <div className="font-bold items-center justify-center">
        <h3 className="text-2xl text-black"> Leave Management </h3>
      </div>

      {/* Search + Add Button */}
      <div className="flex justify-between">
        <input
          className="mt-6 p-3 w-72 border rounded-lg"
          type="text"
          placeholder="Search By Leave Type"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => navigate("/applyleave")}
          className="bg-teal-700 text-white w-52 h-[20] mt-6 rounded-md font-semibold"
        >
          Apply Leave
        </button>
      </div>
      {/* {table} */}
      <div className="mt-4 bg-white rounded-lg shadow-md p-4">
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white shadow z-10">
              <tr className="border-b">
                <th className="p-2"> S.no</th>
                <th className="p-2"> Leave Type</th>
                <th className="p-2"> From </th>
                <th className="p-2"> To </th>
                <th className="p-2"> Description </th>
                <th className="p-2"> Apply Date </th>
                <th className="p-2"> Status </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((leave, index) => (
                  <tr key={leave._id} className="border-b">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{leave.reasonType}</td>
                    <td className="p-2">
                      {new Date(leave.fromDate).toLocaleDateString()}
                    </td>
                    <td className="p-2">
                      {new Date(leave.toDate).toLocaleDateString()}
                    </td>
                    <td className="p-2">{leave.description}</td>
                    <td className="p-2">
                      {new Date(leave.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2 capitalize">{leave.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No Leaves Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center p-2">
        <p>
          {filtered.length} of {filtered.length}
        </p>

        <p>
          {startIndex + 1}-{startIndex + paginated.length} of {filtered.length}
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

export default Leavepage;
