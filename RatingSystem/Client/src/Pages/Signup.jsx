import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AuthContext from "../Context/authContext";
import authService from "../Services/authService";
import { Label } from "../Components/ui/label";
import { Input } from "../Components/ui/input";
import { Textarea } from "../Components/ui/textarea";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { setUser } = useContext(AuthContext);
  const { userType } = useParams(); // 'user' or 'storeowner'
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      setUser(data.user);
      if (data.user.role === "STORE_OWNER") {
        navigate("/owner");
      } else {
        navigate("/stores");
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      role: userType === "storeowner" ? "STORE_OWNER" : "USER",
    };
    mutate(payload);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-2">
          {userType === "storeowner" ? "Store Owner" : "User"} Sign Up
        </CardTitle>
        <CardDescription>
          Enter your details below to create an account
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Name:</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              minLength="3"
              maxLength="20"
              required
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

          <div className="flex flex-col gap-1">
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              pattern="(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}"
              title="Password must be 8-16 characters long, include at least one uppercase letter and one special character."
              required
            />
          </div>
        </CardContent>

        <Button
          variant="default"
          disabled={isPending}
          className="w-full rounded-2xl"
          type="submit"
        >
          {isPending ? "Signing up..." : "Sign Up"}
        </Button>

        {isError && (
          <p className="text-red-500 text-sm mt-2">
            {error.info?.message ||
              "Failed to create account. Please try again later."}
          </p>
        )}

        {isSuccess && (
          <p className="text-green-600 text-sm mt-2">
            🎉 Account created successfully!
          </p>
        )}

        <CardFooter />
      </form>
    </>
  );
};

export default Signup;
