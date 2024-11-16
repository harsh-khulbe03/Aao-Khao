import { Navigate } from "react-router-dom";
import { useToastContext } from "../context/ToastContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { showToast } = useToastContext();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      showToast("bg-red-500","Access restricted. Please log in first.");
    }
  }, [token, showToast]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
