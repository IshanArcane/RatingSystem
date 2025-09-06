import React from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../Components/ui/tabs";
import UsersTab from "../Components/UsersTab";
import StoresTab from "../Components/StoresTab";
import Header from "../Components/Header";

const AdminDashboard = () => {
  return (
    <div className="bg-background flex flex-col items-center justify-start mb-8">
      <Header />
      <h1 className="text-3xl font-bold my-2 py-2 px-5 rounded-2xl text-muted-foreground bg-muted">
        Admin Dashboard
      </h1>
      <Tabs defaultValue="users" className="w-[90vw]">
        <TabsList className="mb-4 w-full rounded-2xl bg-muted p-1">
          <TabsTrigger className="rounded-2xl w-[50%]" value="users">
            Users
          </TabsTrigger>
          <TabsTrigger className="rounded-2xl w-[50%]" value="stores">
            Stores
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UsersTab />
        </TabsContent>

        <TabsContent value="stores">
          <StoresTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
