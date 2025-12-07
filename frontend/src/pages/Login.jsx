import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../components/common/AuthContext";
import login from "../assets/bglogin.jpeg";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { syncUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation
    if (!email) return toast.error("Email is required");
    if (!password) return toast.error("Password is required");

    try {
      // const token = sessionStorage.getItem("token");
      // const res = await axios.post(`${process.env.API_URL}/auth/login`, {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}auth/login`, {
        email,
        password,
      });
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("role", res.data.user.role);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      sessionStorage.setItem("id", res.data.user.id);
      
      toast.success("Login successful!");
      syncUser();
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col items-center">
      {/* HEADER WITH BACKGROUND IMAGE */}
      <div
        className="w-full h-64 bg-cover bg-center flex flex-col items-center justify-center"
        style={{ backgroundImage: `url(${login})` }}
      >
        <h2 className="text-4xl font-bold text-white drop-shadow-md">
          Employee Management System
        </h2>
        <p className="text-white text-lg drop-shadow-md mt-2">
          Welcome back! Please login to your account
        </p>
      </div>

      {/* Login FORM */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6 -mt-16"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800">LogIn</h2>
          <p className="text-gray-500 mt-1">Hey There 👋 let's get started</p>
        </div>

        <div className="space-y-4">
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
          Log In
        </button>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <span className="text-blue-600 font-medium hover:underline">
            <Link to="/register">Register</Link>
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
