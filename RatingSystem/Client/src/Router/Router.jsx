// src/router.js
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../Components/ProtectedRoute";

import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import StorePortal from "../pages/StorePortal";
import AdminDashboard from "../pages/AdminDashboard";
import StoreOwnerDashboard from "../pages/StoreOwnerDashboard";
import WelcomePortal from "../Pages/WelcomePortal";
import AuthLayout from "../Pages/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePortal />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup/:userType",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/stores",
    element: <StorePortal />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/owner",
    element: (
      <ProtectedRoute roles={["STORE_OWNER"]}>
        <StoreOwnerDashboard />
      </ProtectedRoute>
    ),
  },
]);

export default router;
