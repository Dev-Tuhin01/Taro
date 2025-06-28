import { type ReactNode } from "react";
import { useAuthStore } from "../Stores/AuthStore";
import { Navigate } from "react-router-dom";

const AUthRedirect = ({children}:{children: ReactNode}) =>{
  
  const {isAuthenticated,user} = useAuthStore();
  if (isAuthenticated && user) {
    const path = user?.role === "parent" ? "/parent": "/child";
    return <Navigate to={path} replace />
  }

  return <>{children}</>
}

export default AUthRedirect;