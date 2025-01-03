import React, { useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function Failure({ func, message }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen bg-gradient-to-br bg-neutral-300  text-center p-5 fade-in">
      <div className="bg-red-800 shadow-lg bg-opacity-25 p-6 rounded-full mb-5 shake">
        <div className="bg-red-600 p-4 bg-opacity-45 text-white rounded-full flex items-center justify-center">
          <CgClose size={100} className="text-white" />
        </div>
      </div>
      <h1 className="text-2xl font-bold  mb-3">Payment Failed</h1>
      <p className=" max-w-md mb-5">
        {message
          ? message
          : "Oops! Something went wrong with your payment. Please try again or contact support if the issue persists."}
      </p>
      <button
        className="bg-pink-600 hover:bg-pink-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
        onClick={func}
      >
        Retry Payment
      </button>
    </div>
  );
}

export default Failure;
