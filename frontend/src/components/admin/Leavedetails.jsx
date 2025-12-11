import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

function LeaveDetails() {
  const [leave, setLeave] = useState(null);
  const [searchParams] = useSearchParams();
  const leaveId = searchParams.get("id");

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_API_URL}leave/${leaveId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setLeave(res.data.leave);
      })
      .catch((err) => console.log(err));
  }, [leaveId]);

  const handleStatusUpdate = (newStatus) => {
    const token = sessionStorage.getItem("token");

    axios
      .put(
        `${import.meta.env.VITE_API_URL}leave/updateleave/${leaveId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        toast.success(`Leave ${newStatus} successfully`);
        setLeave((prev) => ({ ...prev, status: newStatus }));
        navigate("/manageleaves");
      })
      .catch((err) => toast.error("Error updating leave"));
  };

  if (!leave) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <div className="p-10 w-full bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[80%]">
        <h2 className="text-3xl font-bold text-center mb-6">Leave Details</h2>

        <div className="flex gap-16">
          {/* IMAGE */}
          <div className="flex flex-col items-center">
            <div className="w-72 h-72 rounded-full border-4 border-gray-200 overflow-hidden">
              <img
                src={
                  leave.empId?.image ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* DETAILS */}
          <div className="w-full">
            <Detail label="Name" value={leave.empId?.userName} />
            <Detail label="Employee ID" value={leave.empId?.empId} />
            <Detail label="Leave Type" value={leave.reasonType} />
            <Detail label="Reason" value={leave.description} />
            <Detail label="Department" value={leave.empId?.department} />

            <Detail
              label="Start Date"
              value={new Date(leave.fromDate).toLocaleDateString()}
            />
            <Detail
              label="End Date"
              value={new Date(leave.toDate).toLocaleDateString()}
            />

            {/* SHOW BUTTONS ONLY IF PENDING */}
            <div className="mt-6 flex gap-4">
              {leave.status === "pending" ? (
                <>
                  <button
                    onClick={() => handleStatusUpdate("approved")}
                    className="px-6 py-2 bg-green-600 text-white rounded-md font-semibold"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleStatusUpdate("rejected")}
                    className="px-6 py-2 bg-red-600 text-white rounded-md font-semibold"
                  >
                    Reject
                  </button>
                </>
              ) : leave.status === "approved" ? (
                <span className="px-6 py-2 bg-green-500 text-white rounded-md text-lg font-semibold">
                  Approved
                </span>
              ) : (
                <span className="px-6 py-2 bg-red-500 text-white rounded-md text-lg font-semibold">
                  Rejected
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <p className="mb-4 text-lg">
      <span className="font-semibold">{label}:</span>
      <span className="ml-2 bg-blue-100 px-3 py-1 rounded">{value}</span>
    </p>
  );
}

export default LeaveDetails;
