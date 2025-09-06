import React from "react";
import Header from "../Components/Header";
import CreateStore from "../Components/CreateStore";
import OwnerStoresList from "../Components/OwnerStoreList";

const StoreOwnerDashboard = () => {
  return (
    <div className="bg-background flex flex-col items-center justify-start mb-8">
      <Header />
      <h1 className="text-3xl font-bold my-2 py-2 px-5 rounded-2xl text-muted-foreground bg-muted">
        Store Owner Dashboard
      </h1>
      <div className="flex justify-center items-center gap-4 w-[100vw] mx-8">
        <CreateStore />
        <div className="w-full max-w-md">
          <h2 className="text-center font-bold mb-2 text-accent-foreground">
            Your Stores
          </h2>
          <OwnerStoresList />
        </div>
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;
