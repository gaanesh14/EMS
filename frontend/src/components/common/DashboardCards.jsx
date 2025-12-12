import React from "react";
import { FaUsers, FaBuilding, FaMoneyCheckAlt } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FcLeave, FcDisapprove, FcApprove } from "react-icons/fc";
import { MdOutlinePendingActions } from "react-icons/md";

export default function DashboardCards() {
  const [counts, setCounts] = useState({
    employeeCount: 0,
    departmentCount: 0,
  });
  const [stats, setStats] = useState({
    totalLeaves: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}department/count`,
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
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };
    fetchCounts();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_API_URL}leave/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setStats(res.data); // contains {totalLeaves, pending, approved, rejected}
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="grid grid-cols-3 gap-6 mt-6">
        {/* Employees */}
        <div className="bg-white shadow-md p-6 rounded-lg border-l-8 border-teal-500">
          <div className="text-3xl">
            <FaUsers className="text-purple-800" />
          </div>
          <h3 className="text-lg font-semibold mt-2">
            <Link to="/employees"> Total Employees </Link>
          </h3>
          <p className="text-2xl font-bold"> {counts.employeeCount} </p>
        </div>

        {/* Departments */}
        <div className="bg-white shadow-md p-6 rounded-lg border-l-8 border-violet-500">
          <div className="text-3xl">
            <FaBuilding className="text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold mt-2">
            <Link to="/department"> Total Departments </Link>
          </h3>
          <p className="text-2xl font-bold"> {counts.departmentCount} </p>
        </div>
        {/* {salary} */}
        <div className="bg-white shadow-md p-6 rounded-lg border-l-8 border-gray-500">
          <div className="text-3xl">
            <FaMoneyCheckAlt />
          </div>
          <h3 className="text-lg font-semibold mt-2">
            <Link to='/managesalary'> Salary  </Link>
          </h3>
          <p className="text-2xl font-bold"> $10000 </p>
        </div>
      </div>
      <h2 className="text-3xl font-bold p-3 mt-6 flex justify-center items-center">
        {" "}
        Leave Details{" "}
      </h2>
      <div className="grid grid-cols-2 gap-6 mt-4">
        <div className="bg-white shadow-md p-6 rounded-lg border-l-8 border-blue-500">
          <div className="text-3xl">
            <FcLeave />
          </div>
          <h3 className="text-lg font-semibold mt-2">
            <Link to="/manageleaves"> Leaves Applied </Link>
          </h3>
          <p className="text-2xl font-bold"> {stats.totalLeaves} </p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg border-l-8 border-green-500">
          <div className="text-3xl">
            <FcApprove />
          </div>
          <h3 className="text-lg font-semibold mt-2">
            <Link to="/manageleaves"> Leaves Approved </Link>
          </h3>
          <p className="text-2xl font-bold"> {stats.approved} </p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg border-l-8 border-yellow-500">
          <div className="text-3xl">
            <MdOutlinePendingActions />
          </div>
          <h3 className="text-lg font-semibold mt-2">
            <Link to="/manageleaves"> Leaves Pending </Link>
          </h3>
          <p className="text-2xl font-bold"> {stats.pending} </p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg border-l-8 border-red-500">
          <div className="text-3xl">
            <FcDisapprove />
          </div>
          <h3 className="text-lg font-semibold mt-2">
            <Link to="/manageleaves"> Leaves Rejected </Link>
          </h3>
          <p className="text-2xl font-bold"> {stats.rejected} </p>
        </div>
      </div>
    </div>
  );
}
