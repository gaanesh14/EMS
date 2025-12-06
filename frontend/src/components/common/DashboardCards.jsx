import React from "react";
import { FaUsers, FaBuilding } from "react-icons/fa";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function DashboardCards() {
  const [counts, setCounts] = React.useState({
    employeeCount: 0,
    departmentCount: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/department/count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCounts({
          employeeCount: response.data.employeeCount,
          departmentCount: response.data.departmentCount,
        });
        console.log("counts", response.data);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6 mt-6">
      {/* Employees */}
      <div className="bg-white shadow-md p-6 rounded-lg border-l-8 border-green-500">
        <div className="text-3xl">
          <FaUsers className="text-purple-800" />
        </div>
        <h3 className="text-lg font-semibold mt-2">
          <Link to="/employees"> Total Employees </Link>
        </h3>
        <p className="text-2xl font-bold"> {counts.employeeCount} </p>
      </div>

      {/* Departments */}
      <div className="bg-white shadow-md p-6 rounded-lg border-l-8 border-yellow-500">
        <div className="text-3xl">
          <FaBuilding className="text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold mt-2">
          <Link to="/department"> Total Departments </Link>
        </h3>
        <p className="text-2xl font-bold"> {counts.departmentCount} </p>
      </div>

      {/* Salary */}
      {/* <div className="bg-white shadow-md p-6 rounded-lg border-l-8 border-red-500">
        <div className="text-3xl">💰</div>
        <h3 className="text-lg font-semibold mt-2">Monthly Pay</h3>
        <p className="text-2xl font-bold"> 0 </p>
      </div> */}
    </div>
  );
}
