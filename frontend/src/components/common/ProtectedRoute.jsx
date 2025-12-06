import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = sessionStorage.getItem("token");

  // Block only if NO token
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, ALWAYS allow user into Layout (admin OR employee)
  return children;
}
