import React from "react";
import { useAuth } from "./AuthContext";

export default function Navbar() {
  const { user, role } = useAuth();   // ⭐ use role + employee from context

  if (!user) return null; // no navbar if not logged in (optional)

  const displayName = user?.userName;
  const displayEmail = user?.email;

const displayImage = user?.image
  ? `http://localhost:5000/${user?.image}`
  : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <nav className="bg-white shadow-md border-b px-8 py-4 flex justify-between items-center">
      {/* LOGO / TITLE */}
      <div className="text-2xl font-bold text-teal-700 tracking-wide">
        Employee Management System
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">
        {/* USER PROFILE */}
        <div className="flex items-center gap-3">
          {/* Profile Image */}
          <img
            src={displayImage}
            className="w-12 h-12 rounded-full border shadow-sm object-cover"
            alt="profile"
          />

          {/* TEXT */}
          <div className="text-right">
            <p className="font-semibold text-gray-700">
              {displayName}
            </p>
            <span className="text-sm text-gray-500">
              {displayEmail}
            </span>
            <span className="text-xs text-blue-500 uppercase">
              ({role})
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
