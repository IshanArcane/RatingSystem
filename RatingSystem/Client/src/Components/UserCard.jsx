import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../Components/ui/card";
import { Button } from "../Components/ui/button";

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <Card className="border-2 rounded-2xl shadow-md p-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {user.name} ({user.role})
          <div className="space-x-2">
            <Button
              className="px-5 rounded-2xl"
              variant="ghost"
              size="sm"
              onClick={onEdit}
            >
              Edit
            </Button>
            <Button
              className="px-5 rounded-2xl"
              variant="destructive"
              size="sm"
              onClick={onDelete}
            >
              Delete
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Email: {user.email}</p>
        <p>Address: {user.address}</p>
      </CardContent>
    </Card>
  );
};

export default UserCard;
