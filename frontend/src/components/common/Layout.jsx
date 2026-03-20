import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAuth } from "../hooks/useAuth";
import IdelTimeout from "../../pages/IdelTimeout";

function Layout() {
  // const navigate = useNavigate();
  const { role } = useAuth();
  const token = sessionStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  //  if (role === false) {
  //   return <Navigate to="/login" replace />;
  //   // window.location.replace("/login");
  //   return null;
  // }
  // // Block rendering only until role is loaded
  // if (role === null) {
  //   // window.location.replace("/login");
  //   return <div className="p-6"> Loading....</div>;
  // }

  return (
    <div className="max-h-screen overflow-y-hidden flex">
      <IdelTimeout />
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
