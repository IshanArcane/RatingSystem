import React from "react";
import { Card } from "./ui/card";

const AboutContent = () => {
  return (
    <Card className="rounded-2xl">
      <p className="text-lg p-4">
        <span className="text-8xl font-stretch-200% font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          RateMyStore
        </span>
        is a user-friendly web platform designed to connect customers with local
        businesses through transparent ratings and reviews. The application
        allows users to discover registered stores, share their experiences, and
        rate businesses on a scale of 1 to 5.
      </p>
    </Card>
  );
};

export default AboutContent;
