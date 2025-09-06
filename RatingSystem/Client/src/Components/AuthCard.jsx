import React from "react";
import { Card, CardFooter, CardHeader, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useNavigate } from "react-router-dom";

const AuthCard = () => {
  const navigate = useNavigate();

  return (
    <Card className="shadow-md rounded-2xl  w-full">
      <CardHeader>
        <h2 className="text-2xl font-bold mb-4"></h2>
        <p className="text-muted-foreground mb-6">
          Please choose an option to get started:
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 mb-4">
        <Button
          variant="default"
          className="w-full rounded-2xl"
          onClick={() => navigate("auth/signup/user")}
        >
          Sign Up as Normal User
        </Button>
        <Button
          variant="secondary"
          className="w-full rounded-2xl"
          onClick={() => navigate("auth/signup/storeowner")}
        >
          Sign Up as Store Owner
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col items-center ">
        <Label htmlFor="login" className="mb-2">
          Already have an account?
        </Label>
        <Button
          id="login"
          variant="ghost"
          className="w-full rounded-2xl underline"
          onClick={() => navigate("auth/login")}
        >
          Login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthCard;
