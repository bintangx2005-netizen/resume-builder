import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoleRoute({ children, role }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
