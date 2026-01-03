import { FaUsers, FaBuilding, FaHome, FaMoneyCheck } from "react-icons/fa";
import { FcLeave } from "react-icons/fc";
import { GrUserSettings } from "react-icons/gr";
import { TbMessageChatbot } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, NavLink } from "react-router-dom";

function Sidebar() {
  const { role, syncUser } = useAuth();
  const navigate = useNavigate();

  const logOut = () => {
    sessionStorage.clear();
    syncUser();
    navigate("/login");
  };

  return (
    <div className="w-64 min-h-screen bg-teal-600 text-white p-5 space-y-4">
      <h2 className="text-2xl font-bold text-center mb-8">Employee MS</h2>

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded-lg 
     ${isActive ? "bg-teal-900 text-white" : "hover:bg-teal-700"}`
        }
      >
        <FaHome /> Dashboard
      </NavLink>

      {/* {Admin only} */}
      {role === "admin" && (
        <>
          <NavLink
            to="/employees"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg 
     ${isActive ? "bg-teal-900 text-white" : "hover:bg-teal-700"}`
            }
          >
            <FaUsers /> Employees
          </NavLink>

          <NavLink
            to="/department"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg 
     ${isActive ? "bg-teal-900 text-white" : "hover:bg-teal-700"}`
            }
          >
            <FaBuilding /> Departments
          </NavLink>
        </>
      )}
      {role === "employee" && (
        <>
          <NavLink
            to="/myprofile"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg 
     ${isActive ? "bg-teal-900 text-white" : "hover:bg-teal-700"}`
            }
          >
            <FaUsers /> Employee Profile
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-lg  ${
                isActive ? "bg-teal-900 text-white" : "hover:bg-teal-700"
              }`
            }
          >
            <GrUserSettings /> Settings
          </NavLink>
        </>
      )}

      {/* // common NavLinks */}
      <NavLink
        to="/chatbot"
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded-lg 
     ${isActive ? "bg-teal-900 text-white" : "hover:bg-teal-700"}`
        }
      >
        <TbMessageChatbot /> AI Assistant
      </NavLink>
      <NavLink
        to={role === "admin" ? "/manageleaves" : "/leave"}
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded-lg 
     ${isActive ? "bg-teal-900 text-white" : "hover:bg-teal-700"}`
        }
      >
        <FcLeave /> Leaves
      </NavLink>
      <NavLink
        to={role === "admin" ? "/managesalary" : "/salary"}
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded-lg 
     ${isActive ? "bg-teal-900 text-white" : "hover:bg-teal-700"}`
        }
      >
        <FaMoneyCheck /> Salary
      </NavLink>

      <button
        onClick={logOut}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-teal-700"
      >
        <MdLogout /> Logout
      </button>
    </div>
  );
}

export default Sidebar;
