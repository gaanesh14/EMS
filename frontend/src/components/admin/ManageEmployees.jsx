import React,{useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { useData } from "../common/DataProvider";

export default function ManageEmployees() {

  const navigate = useNavigate()

  const {  
        employees,
        page,
        totalPages,
        loading,
        empSearch,
        setEmpSearch,
        setPage,
        fetchEmployees,
        deleteEmployee} = useData();

    //  console.log("useData test:", useData);
      
      useEffect(() => {
        fetchEmployees();  
      },[page,empSearch])
    
  const handleSearch = (e) => {
  setEmpSearch(e.target.value);
  setPage(1); //  reset pagination
};
  const startIndex = 0; // backend already paginated

  // if (loading) return <div> Loading Employees...</div>

  return (
    <div className="p-4 w-full bg-gray-100 min-h-screen">
      {/* Heading */}
      <div className="font-bold items-center justify-center">
        <h3 className="text-2xl text-black">Manage Employees</h3>
      </div>

      {/* Search + Add Button */}
      <div className="flex justify-between">
        <input
          className="mt-6 p-3 w-72 border rounded-lg"
          type="text"
          placeholder="Search By EmpName/empID"
          value={empSearch}
          onChange={handleSearch}
        />

        <button
          onClick={() => navigate('/addemployee')}
          className="bg-teal-700 text-white w-52 h-[20] mt-6 rounded-md font-semibold"
        >
          Add New Employee
        </button>
      </div>

      {/* Table */}
      <div className="mt-4 bg-white rounded-lg shadow-md p-4">
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white shadow z-10">
              <tr className="border-b">
                <th className="p-2">S No</th>
                <th className="p-2">E_ID</th>
                <th className="p-2">Image</th>
                <th className="p-2 pl-12">Name</th>
                <th className="p-2">Department</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {employees.length > 0 ? (
                employees.map((emp, index) => (
                  <tr key={emp._id} className="border-b">
                    <td className="p-3">{startIndex + index + 1}</td>
                    <td className="p-3">{emp.empId || "N/A"}</td>
                    <td className="p-2">
                      <img
                        src={
                          emp.image
                            ? `${emp.image?.url}`
                            : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        className="w-10 h-10 rounded-full border"
                        alt="emp"
                      />
                    </td>
                    <td className="p-3 pl-14">{emp.userName}</td>
                    <td className="p-3">{emp.department}</td>

                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => navigate(`/employeeprofile/${emp._id}`)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        View
                      </button>

                      <button
                        onClick={() => navigate(`/editemployee/${emp._id}`)}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteEmployee(emp._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No Employees Found
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
          Rows per page: <b>10</b>
        </p>

        <p>
          {startIndex + 1}-{startIndex + employees.length} of {employees.length}
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
