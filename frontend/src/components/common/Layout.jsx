import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAuth } from "../hooks/useAuth";

function Layout() {
  const { role } = useAuth();

  // Block rendering only until role is loaded
  if (role === null) {
    return <div className="p-6"> Loading....</div>;
  }

  return (
    <div className="max-h-screen overflow-y-hidden flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
