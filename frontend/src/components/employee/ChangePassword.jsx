import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword) {
      return toast.error("Please fill all fields");
    }

    const provider = sessionStorage.getItem("provider");
    if (provider === "google") {
      return toast.error(
        "You logged in using google password change is not allowed!"
      );
    }

    const id = sessionStorage.getItem("id");
    const token = sessionStorage.getItem("token");

    // if session expired or id missing
    if (!id || !token) {
      toast.error("Session expired. Please log in again.");
      return navigate("/login");
    }
    console.log("Id before axios:", sessionStorage.getItem("id"));

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}auth/change-password/${id}`,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message);
      setOldPassword("");
      setNewPassword("");

      // optional: logout after password change
      sessionStorage.clear();
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-8">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>

      <input
        type="password"
        placeholder="Old Password"
        className="w-full border p-2 rounded mb-3"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="New Password"
        className="w-full border p-2 rounded mb-3"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
      >
        Update Password
      </button>
    </div>
  );
}

export default ChangePassword;
