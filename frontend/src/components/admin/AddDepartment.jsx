import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";

function AddDepartment() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const createdData = await axios.post(
        `${import.meta.env.VITE_API_URL}department/add`,
        {
          name,
          desc,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Department added", createdData);
      toast.success("Department added successfully");
      navigate("/department");
    } catch (error) {
      toast.error(" Department not added");
      console.log("error:", error);
    }
  };

  const closeButton = () => {
    navigate("/department");
  };
  return (
    <div className="flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-lg shadow-xl rounded-xl p-8">
        <div className="flex justify-between mb-6 border-b pb-2">
          <h2 className="text-2xl font-bold text-gray-700 ">Add Department</h2>
          <button
            onClick={closeButton}
            className="h-6 w-6 text-2xl -mt-4 hover:bg-red-500 rounded-lg"
          >
            <MdClose />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
              Add Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDepartment;
