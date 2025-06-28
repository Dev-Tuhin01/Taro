import type { ReactNode } from "react";
import { useAuthStore } from "../Stores/AuthStore";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "parent" | "child" ;
  redirectTo?: string
}

const ProtectedRoute = ({
  children,
  requiredRole,
  redirectTo = "/auth",
} : ProtectedRouteProps) =>{

  const {isAuthenticated, user} = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    const path = user?.role === "parent" ? "/parent": "/child";
    return <Navigate to={path} replace />
  }

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute;