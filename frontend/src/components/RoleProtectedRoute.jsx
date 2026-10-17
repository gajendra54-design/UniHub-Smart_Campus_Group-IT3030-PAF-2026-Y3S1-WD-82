import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role, isAuthenticated, isLoading } = useAuth();
  const location = useLocation(); // Fixed: Define location hook

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (!user || !isAuthenticated) {
    console.error(
      "🔴 RoleProtectedRoute: No user found. Redirecting to /login.",
    );
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Ensure role matching is exact.
  if (allowedRoles && !allowedRoles.includes(role)) {
    console.error(
      `🔴 RoleProtectedRoute: Access Denied. User role '${role}' is not in allowed list: ${allowedRoles}`,
    );
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
