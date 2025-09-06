import React from "react";
import Header from "../Components/Header";
import AboutContent from "../Components/AboutContent";
import AuthCard from "../Components/AuthCard";

function WelcomePortal() {
  return (
    <div className="h-[100vh] bg-background flex flex-col items-center justify-start">
      <Header />
      <div className="flex flex-row justify-around mx-8 gap-4">
        <AboutContent />
        <AuthCard />
      </div>
    </div>
  );
}

export default WelcomePortal;
