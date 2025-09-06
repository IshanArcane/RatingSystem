import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import AuthContext from "../Context/authContext";
import authService from "../Services/authService";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import { Label } from "../Components/ui/label";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setUser(data.user);
      if (data.user.role === "STORE_OWNER") {
        navigate("/owner");
      } else if (data.user.role === "USER") {
        navigate("/stores");
      } else if (data.user.role === "ADMIN") {
        navigate("/admin");
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-2">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-4 mb-4">
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
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            variant="default"
            disabled={isPending}
            className="w-full rounded-2xl"
            type="submit"
          >
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </CardFooter>

        {isError && (
          <p className="text-red-500 text-sm mt-2">
            {error.info?.message ||
              "Login failed. Please check your credentials and try again."}
          </p>
        )}
      </form>
    </>
  );
};

export default Login;
