import { FaUsers, FaBuilding, FaHome } from "react-icons/fa";
import { GrUserSettings } from "react-icons/gr";
import { TbMessageChatbot } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

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

      <Link
        to="/dashboard"
        className="flex items-center gap-3 hover:bg-teal-700 p-3 rounded-lg"
      >
        <FaHome className="" /> Dashboard
      </Link>

      {/* {Admin only} */}
      {role === "admin" && (
        <>
          <Link
            to="/employees"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-700"
          >
            <FaUsers /> Employees
          </Link>

          <Link
            to="/department"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-700"
          >
            <FaBuilding /> Departments
          </Link>
        </>
      )}
      {role === "employee" && (
        <>
          <Link
            to="/myprofile"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-700"
          >
            <FaUsers /> Employee Profile
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-700"
          >
            <GrUserSettings /> Settings
          </Link>
        </>
      )}

      {/* // common links */}
      <Link
        to="/chatbot"
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-700"
      >
        <TbMessageChatbot /> AI Assistant
      </Link>

      <button
        onClick={logOut}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-700"
      >
        <MdLogout /> Logout
      </button>
    </div>
  );
}

export default Sidebar;
