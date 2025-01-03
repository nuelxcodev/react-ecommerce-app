import React, { useEffect } from "react";
import { CgCheck } from "react-icons/cg";
import { useNavigate } from "react-router-dom";


function Success({ email }) {
  const router = useNavigate();
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen bg-neutral-300 text-center p-5 fade-in">
      <div className="bg-lime-400 shadow-lg p-6 rounded-full mb-5 bounce bg-opacity-25">
        <div className="bg-lime-500 bg-opacity-45 p-4 text-white rounded-full flex items-center justify-center">
          <CgCheck size={100} className="text-white" />
        </div>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-3">
        Payment Successful!
      </h1>
      <p className="text-gray-700 max-w-md mb-5">
        Thank you for your purchase! Your order has been successfully processed.
        A confirmation email has been sent to <span className="font-medium">{email || "your email"}</span>.
      </p>
      <button
        className="bg-pink-600 hover:bg-pink-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
        onClick={() => router('/products')}
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default Success;
