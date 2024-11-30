"use client";
import React from "react";

type HeadingProps = {
  heading1: string;
  heading2: string;
};

const Heading = ({ heading1, heading2 }: HeadingProps) => {
  const gradientBackground = {
    background: `linear-gradient(90deg, #d9d9d9, #ffffff, #e6e6e6)`, // Gradient metallic
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent", // Clips the text to show the gradient
  };

  return (
    <div className="flex items-start space-y-4 max-w-full px-4 md:px-0">
      {/* Upper Text */}
      <h1
        style={gradientBackground}
        className="text-xl md:text-xl font-normal tracking-tight break-words text-left"
      >
        {heading1}
      </h1>

      {/* Lower Text */}
      <h1
        style={gradientBackground}
        className="text-xl md:text-xl font-bold tracking-tight break-words text-left"
      >
        {heading2}
      </h1>
    </div>
  );
};

export default Heading;
