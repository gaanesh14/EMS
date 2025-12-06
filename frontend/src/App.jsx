import React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Layout from "./components/common/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ManageDepartments from './components/admin/ManageDepartments';
import ManageEmployees from './components/admin/ManageEmployees';
import Login from './pages/Login';
import Register from './pages/Register'
import Dashboard from "./components/common/Dashboard";
import {Toaster} from 'sonner'
import AddEmployees from "./components/admin/AddEmployees";
import UpdateEmployee from "./components/admin/UpdateEmployee";
import AddDepartment from "./components/admin/AddDepartment";
import UpdateDepartment from "./components/admin/UpdateDepartment";
import EmployeeProfile from "./components/admin/EmployeeProfile";
import AdminRoute from "./components/common/ProtectedRoute";
import MyProfile from "./components/employee/MyProfile";
import Chatbot from "./components/common/ChatBot";
import ChangePassword from "./components/employee/ChangePassword";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

<Routes>
  {/* Public routes */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* Protected + layout wrapper for all authenticated pages */}
  <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
    <Route path="/" element={<Dashboard />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/myprofile" element={<MyProfile />} />

    {/* ADMIN ONLY */}
    <Route path="/employees" element={<AdminRoute><ManageEmployees /></AdminRoute>} />
    <Route path="/addemployee" element={<AdminRoute><AddEmployees /></AdminRoute>} />
    <Route path="/editemployee/:id" element={<AdminRoute><UpdateEmployee /></AdminRoute>} />
    <Route path="/employeeprofile/:id" element={<AdminRoute><EmployeeProfile /></AdminRoute>} />

    <Route path="/department" element={<AdminRoute><ManageDepartments /></AdminRoute>} />
    <Route path="/adddepartment" element={<AdminRoute><AddDepartment /></AdminRoute>} />
    <Route path="/editdepartment/:id" element={<AdminRoute><UpdateDepartment /></AdminRoute>} />

    <Route path="/chatbot" element={<AdminRoute><Chatbot /></AdminRoute>} />
    <Route path='/settings' element={<AdminRoute><ChangePassword/></AdminRoute>} />
  </Route>
</Routes>

    </BrowserRouter>
  );
}

export default App;