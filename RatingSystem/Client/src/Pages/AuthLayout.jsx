import { Card } from "../Components/ui/card";
import Header from "../Components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className=" bg-background flex flex-col items-center justify-start">
      <Header />
      <Card className="w-[400px] mt-2 p-6 rounded-2xl shadow-md">
        <Outlet />
      </Card>
    </div>
  );
};

export default AuthLayout;
