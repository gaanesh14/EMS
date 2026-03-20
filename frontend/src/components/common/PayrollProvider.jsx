import axios from "axios";
import React, { useState, createContext } from "react";
import APi from "../../utils/api";
export const PayrollContext = createContext();

export const PayrollProvider = ({ children }) => {
  const API = import.meta.env.VITE_API_URL;
  // const token = sessionStorage.getItem("token");

  const authHeader = () => ({
    headers: { Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}` },
  });

  // @Fetch Salary
  const [salary, setSalary] = useState([]);
  const [page, setPage] = useState(1);
  const [salarySearch, setSalarySearch] = useState("");
  const [totalPages, settotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchSalary = async () => {
    setLoading(true);
    try {
      const { data } = await APi.get(`${API}salary/all`, authHeader());
      setSalary(data.salaries);
      settotalPages(data.totalPages);
    } catch (error) {
      console.log("error:", error);
    }finally{
      setLoading(false);
    }
  };

  // @Fetch Leaves
  const [leaves, setLeaves] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [leaveSearch, setLeaveSearch] = useState("");
  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const { data } = await APi.get(
        `${API}leave/all-leaves?page=${page}&limit=10&search=${leaveSearch}&status=${statusFilter}`,
        authHeader()
      );
      setLeaves(data.leaves);
      settotalPages(data.totalPages);
    } catch (error) {
      console.log("error:", error);
    } finally{
      setLoading(false);
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
        loading
      }}
    >
      {children}
    </PayrollContext.Provider>
  );
};
