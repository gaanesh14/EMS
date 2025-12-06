import React, { useEffect, useState } from "react";
import DashboardCards from "./Dashboardcards";
import { useAuth } from "./AuthContext";

export default function Dashboard() {
  const [stats, setStats] = useState({
    employees: 0,
    departments: 0,
    salary: 0,
  });

  const { role, user } = useAuth();
  //console.log("Dashboard role:", role);
  console.log("Dashboard user:", user);

  if (!role) {
    return <div className="p-6"> Loading....</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        {role === "admin" ? "Admin Dashboard" : "Employee Dashboard"}
      </h1>

      {role === "admin" ? (
        // Admin view: show cards (you can keep DashboardCards component)
        <DashboardCards />
      ) : (
        // Employee view: show personal summary
        <div className="mt-6 bg-white p-6 shadow rounded">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome, {user?.userName}
          </h2>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Role:</strong> {user?.role}
          </p>
          {/* add other fields you store like designation/department */}
        </div>
      )}
    </div>
  );
}
