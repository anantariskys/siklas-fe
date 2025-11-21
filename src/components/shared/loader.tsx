import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
}

export const Loader: React.FC<LoaderProps> = ({ size = "md" }) => {
  const sizeMap = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeMap[size]} border-gray-300 border-t-primary rounded-full animate-spin`}
      ></div>
    </div>
  );
};
