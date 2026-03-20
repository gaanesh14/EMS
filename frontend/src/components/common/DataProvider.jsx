import React, { useState, useContext } from "react";
import { DataContext } from "./DataContext";
import APi from "../../utils/Api";
import axios from "axios";
import { toast } from "sonner";


export const DataProvider = ({ children }) => {
  const API = import.meta.env.VITE_API_URL;
  // const token = sessionStorage.getItem("token");

  const authHeader = () => ({
      headers: { 
        Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
    },
  });

  // Employee Data
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [empSearch, setEmpSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const { data } = await APi.get(
        `${API}employee?page=${page}&search=${empSearch}`,
        authHeader()
      );
      setEmployees(data.employees);
      settotalPages(data.totalPages);
    } catch (error) {
      console.log("error:", error);
  } finally{
  setLoading(false);
  };
}

  const deleteEmployee = async (id) => {
    await APi.delete(`${API}employee/delete/${id}`, authHeader());
    setEmployees((prev) => prev.filter((e) => e._id !== id));
    toast.success("Employee deleted Successfully");
  };

  // Fetch Department
  const [department, setDepartment] = useState([]);
  const [depSearch, setDepSearch] = useState("");

  const fetchDepartment = async () => {
    setLoading(true);
    try{
      const { data } = await APi.get(
      `${API}department/all?page=${page}&search=${depSearch}`,
      authHeader()
    );

    setDepartment(data.department);
    settotalPages(data.totalPages);
    }catch(error){
      console.log("error:", error);
    }finally{
      setLoading(false);
    }  
  };

  const deleteDepartment = async (id) => {
    await APi.delete(`${API}department/delete/${id}`, authHeader());
    setDepartment((prev) => prev.filter((e) => e._id != id))
    toast.success("Department deleted Successfully");
  };

  return (
    <DataContext.Provider
      value={{
      // Common 
        page,
        totalPages,
        setPage,
        loading,
        // Employees
        employees,
        fetchEmployees,
        deleteEmployee,
        empSearch,
        setEmpSearch,


        // Department
        department,
        fetchDepartment,
        deleteDepartment,
        depSearch,
        setDepSearch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};




