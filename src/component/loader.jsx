import React from "react";

const LoadingSpinner = () => {
  return (
    <div
      className={`w-7 h-7 border-4 border-t-4 border-blue-500 border-t-transparent rounded-full animate-spin`}
    ></div>
  );
};

export default LoadingSpinner;
