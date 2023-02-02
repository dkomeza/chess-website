import { Navigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";
import { ReactElement } from "react";

export default function PrivateRoute({ children }: { children: ReactElement }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
}
