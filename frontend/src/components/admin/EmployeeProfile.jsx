import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { MdCloudUpload } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { MdClose } from "react-icons/md";

export default function EmployeeProfile() {
  const [employee, setEmployee] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");

  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const inputRef = React.createRef(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_API_URL}employee/single/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const emp = res.data.user;

        setEmployee(emp);
        setName(emp.userName);
        setMail(emp.email);
        setDob(emp.dob);
        setGender(emp.gender);
        setMaritalStatus(emp.maritalStatus);
        setDesignation(emp.designation);
        setDepartment(emp.department);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!employee) return <p className="p-8">Loading...</p>;

  // Upload Image
  const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setUploading(true);
  setNewImage(URL.createObjectURL(file));

  const formData = new FormData();
  formData.append("image", file);

  const res = await axios.put(
    `${import.meta.env.VITE_API_URL}upload/${employee._id}/upload`,
    formData
  );

  setEmployee(res.data.employee);
  toast.success("Image uploaded!");
  setUploading(false);
};


  // Remove Image
  const removeImage = async () => {
  await axios.put(
    `${import.meta.env.VITE_API_URL}upload/${employee._id}/remove`
  );

  setEmployee(prev => ({ ...prev, image: null }));
  setNewImage(null);

  if (inputRef.current) {
    inputRef.current.value = ""; // KEY FIX
  }

  toast.success("Image removed");
};


  // Close Button
  const closeButton = () => {
    navigate("/employees");
  };

  return (
    <div className="p-10 w-full bg-gray-100 min-h-screen">
      <div className="bg-teal-600 text-white p-4 rounded-lg text-xl flex justify-between">
        Employee Details
        <button
          onClick={closeButton}
          className=" hover:bg-red-600 p-1 rounded-lg"
        >
          <MdClose className="text-2xl" />
        </button>
      </div>

      {uploading && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-white border-t-transparent" />
        </div>
      )}

      <div className="mt-8 bg-white shadow-lg p-10 rounded-xl flex items-center gap-16">
        {/* IMAGE & EDIT BUTTON */}
        <div className="flex flex-col items-center">
          <div className="w-72 h-72 rounded-full border-4 border-gray-200 flex items-center justify-center overflow-hidden">
            <img
              src={
                newImage
                  ? newImage
                  : employee.image?.url || "default-avatar.png"
              }
              className="w-full h-full object-cover"
              alt="employee"
            />
          </div>

          {/* Edit Buttons */}

          <div className="mt-4 ml-[10rem]  w-full flex flex-row items-center gap-4">
            {/* Upload Button */}
            <label className="cursor-pointer bg-blue-500 text-white p-1 rounded-lg flex items-center gap-2">
              <MdCloudUpload size={20} />
              {/* <span>Upload</span> */}
              <input
                type="file"
                ref={inputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>

            {/* Delete Button */}
            <button
              onClick={removeImage}
              className="bg-red-500 text-white p-1.5 rounded-lg flex items-center justify-center"
            >
              <TiDelete size={15} />
            </button>
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div>
          <Detail label="Name" value={employee.userName} />
          <Detail label="Employee ID" value={employee.empId} />
          <Detail label="Date of Joining" value={employee.doj?.split("T")[0]} />
          <Detail label="Gender" value={employee.gender} />
          <Detail label="Department" value={employee.department} />
          <Detail label="Marital Status" value={employee.maritalStatus} />
        </div>
      </div>
    </div>
  );
}

/* Reusable Component for Details */
function Detail({ label, value }) {
  return (
    <p className="mb-4 text-lg">
      <span className="font-semibold mr-2">{label}:</span>
      <span className="bg-blue-100 px-3 py-1 rounded">{value}</span>
    </p>
  );
}
