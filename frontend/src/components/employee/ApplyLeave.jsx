import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function ApplyLeave() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reasonType, setReasonType] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}leave/apply`,
        {
          fromDate,
          toDate,
          reasonType,
          description,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Leave Applied Successfully!");
      console.log("data:", res);

      navigate("/leave");
    } catch (error) {
      toast.error(error.response?.res?.message || "Error applying leave");
      console.log("Error:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6 w-full flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Request For Leave
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl space-y-5 bg-white shadow-xl p-6 rounded-xl"
      >
        {/* Leave Type */}
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">Leave Type</label>
          <select
            value={reasonType}
            onChange={(e) => setReasonType(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
          >
            <option value="">Select Leave type</option>
            <option value="casual">Casual</option>
            <option value="sick">Sick</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {/* From + To */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col w-1/2">
            <label className="text-gray-600 font-medium mb-1">From:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label className="text-gray-600 font-medium mb-1">To:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
          ></textarea>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="p-3 bg-blue-600 text-white w-full rounded-lg outline-none"
        >
          Apply Leave
        </button>
      </form>
    </div>
  );
}

export default ApplyLeave;
