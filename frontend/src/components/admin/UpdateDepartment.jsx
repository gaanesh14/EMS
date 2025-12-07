import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

function UpdateDepartment() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    // const id = window.location.pathname.split("/").pop(); // get id from URL
    axios
      .get(`${import.meta.env.VITE_API_URL}department/single/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const dep = res.data.department;
        // PREFILL THE FORM
        setName(dep.name);
        setDesc(dep.desc);
      })
      .catch((err) => console.log("Fetch Error:", err));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}department/edit/${id}`,
        {
          name,
          desc,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("updated Department data");
      toast.success("Department Data updated successfully!");
      navigate("/department");
    } catch (error) {
      toast.error(" Department not updated");
      console.log("error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center p-8 ">
      <div className="bg-white w-full max-w-lg shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 pb-2 border-b text-center">
          Edit Department
        </h2>

        <form onSubmit={handleUpdate} className="flex flex-col gap-6">
          {/* Department Name */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">
              Department Name
            </label>
            <input
              type="text"
              placeholder="Insert Dept.name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-600 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Write something..."
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              Update Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateDepartment;
