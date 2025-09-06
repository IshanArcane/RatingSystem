import React, { useContext } from "react";
import ThemeToggle from "./ThemeToggle";
import AuthContext from "../Context/authContext";
import authService from "../Services/authService";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null); // Clear user context after logout
      navigate("/auth/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-[100vw] h-16 flex items-center justify-between px-8 border-8  bg-accent rounded-4xl m-8 shadow-md">
      {/* Left Side - Logo */}
      <h1 className="text-2xl font-bold text-accent-foreground">RateMyStore</h1>

      {/* Right Side - User, Theme Toggle, Logout */}
      <div className="flex items-center space-x-4">
        {user && (
          <span className="font-medium text-accent-foreground">
            Hi, {user.name}
          </span>
        )}
        <ThemeToggle />
        {user && (
          <Button
            variant="destructive"
            onClick={handleLogout}
            className=" font-medium rounded-2xl"
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;