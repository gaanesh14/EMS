import axios from "axios";
import React, { useState, createContext } from "react";

export const PayrollContext = createContext();

export const PayrollProvider = ({ children }) => {
  const API = import.meta.env.VITE_API_URL;
  const token = sessionStorage.getItem("token");

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // @Fetch Salary
  const [salary, setSalary] = useState([]);
  const [page, setPage] = useState(1);
  const [salarySearch, setSalarySearch] = useState("");
  const [totalPages, settotalPages] = useState(1);

  const fetchSalary = async () => {
    try {
      const { data } = await axios.get(`${API}salary/all`, authHeader);
      setSalary(data.salaries);
      settotalPages(data.totalPages);
    } catch (error) {
      console.log("error:", error);
    }
  };

  // @Fetch Leaves
  const [leaves, setLeaves] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [leaveSearch, setLeaveSearch] = useState("");
  const fetchLeaves = async () => {
    try {
      const { data } = await axios.get(
        `${API}leave/all-leaves?page=${page}&limit=10&search=${leaveSearch}&status=${statusFilter}`,
        authHeader
      );
      setLeaves(data.leaves);
      settotalPages(data.totalPages);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <PayrollContext.Provider
      value={{
        // Salary Data
        salary,
        setSalary,
        fetchSalary,
        salarySearch,
        setSalarySearch,

        // Leave Data
        leaves,
        fetchLeaves,   
        leaveSearch,
        setLeaveSearch,
        statusFilter,
        setStatusFilter,

        // Pagination
        page,
        setPage,
        totalPages,
        settotalPages,
      }}
    >
      {children}
    </PayrollContext.Provider>
  );
};
