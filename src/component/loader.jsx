import React from "react";

const LoadingSpinner = ({ size = "6", color = "blue-500" }) => {
  return (
    <div className=" h-full w-full flex justify-center items-center bg-white">
      <div
        className={`w-${size} h-${size} border-4 border-t-4 border-${color} border-t-transparent rounded-full animate-spin`}
      ></div>
      <p>please wait...</p>
    </div>
  );
};

export default LoadingSpinner;
