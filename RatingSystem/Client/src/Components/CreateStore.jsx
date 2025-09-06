import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../Components/ui/card";
import { Input } from "../Components/ui/input";
import { Textarea } from "../Components/ui/textarea";
import { Label } from "../Components/ui/label";
import { Button } from "../Components/ui/button";
import { useMutation } from "@tanstack/react-query";
import storeService from "../Services/storeService";
import { queryClient } from "../lib/queryClient";

const CreateStore = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  // React Query mutation
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: storeService.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ownerStores"] });
      console.log("Store created:", data);
      // you can show a toast or navigate to /stores
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <Card className="w-[30vw] shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-2">Create Store</CardTitle>
        <CardDescription>
          Enter the store details below to add it to the portal
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Store Name:</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={100}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="address">Address:</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="resize-none h-24"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button
            variant="default"
            className="w-full rounded-2xl"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Store"}
          </Button>

          {isError && (
            <p className="text-red-500 text-sm">
              {error?.message || "Failed to create store. Try again later."}
            </p>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateStore;
