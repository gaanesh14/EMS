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
import Leavepage from "./components/employee/Leavepage";
import Salarypage from "./components/employee/Salarypage";
import ApplyLeave from "./components/employee/ApplyLeave";
import ManageLeaves from "./components/admin/ManageLeaves";
import ManageSalary from "./components/admin/ManageSalary";
import Leavedetails from "./components/admin/Leavedetails";
import AddSalary from "./components/admin/AddSalary";

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
    <Route path="/leave" element={<Leavepage/>}/>
    <Route path="/salary" element={<Salarypage/>}/>
    <Route path="/applyleave" element={<ApplyLeave/>}/>

    {/* ADMIN ONLY */}
    <Route path="/employees" element={<AdminRoute><ManageEmployees /></AdminRoute>} />
    <Route path="/addemployee" element={<AdminRoute><AddEmployees /></AdminRoute>} />
    <Route path="/editemployee/:id" element={<AdminRoute><UpdateEmployee /></AdminRoute>} />
    <Route path="/employeeprofile/:id" element={<AdminRoute><EmployeeProfile /></AdminRoute>} />

    <Route path="/department" element={<AdminRoute><ManageDepartments /></AdminRoute>} />
    <Route path="/adddepartment" element={<AdminRoute><AddDepartment /></AdminRoute>} />
    <Route path="/editdepartment/:id" element={<AdminRoute><UpdateDepartment /></AdminRoute>} />

    <Route path="/manageleaves" element={<AdminRoute><ManageLeaves/></AdminRoute>}/>
    <Route path="/managesalary" element={<AdminRoute><ManageSalary/></AdminRoute>}/>
    <Route path="/leavedetails" element={<AdminRoute><Leavedetails/></AdminRoute>}/>
    <Route path="/addsalary" element={<AdminRoute><AddSalary/></AdminRoute>}/>

    <Route path="/chatbot" element={<AdminRoute><Chatbot /></AdminRoute>} />
    <Route path='/settings' element={<AdminRoute><ChangePassword/></AdminRoute>} />
  </Route>
</Routes>

    </BrowserRouter>
  );
}

export default App;