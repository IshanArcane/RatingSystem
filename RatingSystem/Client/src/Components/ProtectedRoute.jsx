import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
    return null;
  }
  if (roles && roles.length && !roles.includes(user.role)) {
    navigate("/");
    return null;
  }
  return children;
}
