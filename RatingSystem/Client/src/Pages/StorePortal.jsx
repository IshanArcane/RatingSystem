import React from "react";
import Header from "../Components/Header";
import StoresList from "../Components/StoreList";

const StorePortal = () => {
  return (
    <div className="bg-background flex flex-col items-center justify-start mb-8">
      <Header />
      <h1 className="text-3xl font-bold my-2 py-2 px-5 rounded-2xl text-muted-foreground bg-muted">
        Store Portal
      </h1>
      <StoresList />
    </div>
  );
};

export default StorePortal;
