import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function ManageDepartments() {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  //const itemsPerPage = 10;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get(`${import.meta.env.VITE_API_URL}department/all?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("departments data:", res.data);
        setDepartments(res.data.department);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.log(err));
  }, [page]);

  const filtered = departments.filter((dep) =>
    dep.name.toLowerCase().includes(search.toLowerCase())
  );

  const startIndex = 0;
  const paginated = filtered;
  // const startIndex = (page - 1) * itemsPerPage;
  // const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_API_URL}department/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Department deleted successfully:");
      toast.success("Department Deleted successfully");
      setDepartments((prev) => prev.filter((dep) => dep._id !== id));
    } catch (error) {
      console.log("Delete Error:", error);
      toast.error(error.response?.data?.message || "Error Deleting Department");
    }
  };

  return (
    <div className="p-8 w-full bg-gray-100 min-h-screen">
      <div className="font-bold">
        <h3 className="text-2xl">Manage Departments</h3>
      </div>

      <div className="flex justify-between">
        <input
          className="mt-6 p-3 w-72 h-12 border rounded-lg"
          placeholder="Search By Department"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => navigate("/adddepartment")}
          className="text-white bg-teal-700 w-52 h-12 mt-6 rounded-md font-semibold"
        >
          Add New Department
        </button>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-md p-4">
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white shadow z-10">
              <tr className="border-b">
                <th className="p-3">S No</th>
                <th className="p-3">Department</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {paginated.length > 0 ? (
                paginated.map((dep, index) => (
                  <tr key={dep._id} className="border-b">
                    <td className="p-3">{startIndex + index + 1}</td>
                    <td className="p-3">{dep.name}</td>

                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => navigate(`/editdepartment/${dep._id}`)}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(dep._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-3 text-center">
                    No departments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-between items-center p-4">
          <p>Rows per page: 10</p>
          <p>
            {startIndex + 1}-{startIndex + paginated.length} of{" "}
            {filtered.length}
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
    </div>
  );
}
