import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { Link } from "react-router-dom";
import register from "../assets/bgregister.jpg";

function Register() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation
    if (!userName) return toast.error("Username is required");
    if (!email) return toast.error("Email is required");
    if (!password) return toast.error("Password is required");

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}auth/register`, {
        userName,
        email,
        password,
      });
     // console.log("clicked");
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registartion failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col items-center">
      {/* HEADER WITH BACKGROUND IMAGE */}
      <div
        className="w-full h-64 bg-cover bg-center flex flex-col items-center justify-center"
        style={{ backgroundImage: `url(${register})` }}
      >
        <h2 className="text-4xl font-bold text-white drop-shadow-md">
          Employee Management System
        </h2>
        <p className="text-white text-lg drop-shadow-md mt-2">
          Create a new account to get started
        </p>
      </div>

      {/* REGISTER FORM */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6 -mt-16"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800">Register</h2>
          <p className="text-gray-500 mt-1">Hey There 👋 let's get started</p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Username</label>
            <input
              type="text"
              value={userName}
              placeholder="Enter your name"
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-600 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-200"
        >
          Register
        </button>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <span className="text-blue-600 font-medium hover:underline">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;
