import { useAuth } from "../hooks/useAuth";

export default function MyProfile() {
  const { user } = useAuth();

  const imageUrl = user?.image
    ? `${user.image?.url}`
    : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <div className="p-8 bg-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">My Profile</h1>

      <div className="bg-gray-50 shadow-lg rounded-xl p-8 flex gap-10 items-start max-w-2xl">
        {/* LEFT — Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src={imageUrl}
            alt="profile"
            className="w-40 h-40 rounded-full border shadow-md object-cover"
          />
          <p className="mt-4 text-lg font-semibold text-gray-700">
            {user?.userName}
          </p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        {/* RIGHT — Profile Details */}
        <div className="border-l pl-10 flex-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Personal Details
          </h2>

          <div className="grid  md:grid-cols-1 gap-4 text-gray-700">
            <p>
              <strong>Full Name:</strong> {user?.userName}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Role:</strong> {user?.role}
            </p>
            <p>
              <strong>Employee ID:</strong> {user?.empId || "N/A"}
            </p>
            <p>
              <strong>Designation:</strong> {user?.designation || "N/A"}
            </p>
            <p>
              <strong>Department:</strong> {user?.department || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
