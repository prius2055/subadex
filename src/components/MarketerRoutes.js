import { useAuth } from "./authContext";
import { Navigate } from "react-router";

const MarketerRoutes = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "marketer") return <Navigate to="/dashboard" />;

  return children;
};

export default MarketerRoutes;
