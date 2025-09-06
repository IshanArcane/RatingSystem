import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import adminService from "../Services/adminServices";
import { Button } from "../Components/ui/button";
import UserCard from "./UserCard";
import UserDialog from "./UserDialog";

const UsersTab = () => {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch users
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: () => adminService.list({ page: 1, limit: 20 }),
  });

  // Mutations
  const createUserMutation = useMutation({
    mutationFn: (payload) => adminService.create(payload),
    onSuccess: () => queryClient.invalidateQueries(["adminUsers"]),
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, payload }) => adminService.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries(["adminUsers"]),
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id) => adminService.remove(id),
    onSuccess: () => queryClient.invalidateQueries(["adminUsers"]),
  });

  const handleOpenDialog = (user = null) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          variant="secondary"
          className="rounded-2xl border-2 shadow-md"
          onClick={() => handleOpenDialog()}
        >
          Create User
        </Button>
      </div>
      <div className="grid gap-4 ">
        {data?.data?.length > 0 ? (
          data.data.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={() => handleOpenDialog(user)}
              onDelete={() => deleteUserMutation.mutate(user.id)}
            />
          ))
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>
      <UserDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        selectedUser={selectedUser}
        createUserMutation={createUserMutation}
        updateUserMutation={updateUserMutation}
      />
    </div>
  );
};

export default UsersTab;
