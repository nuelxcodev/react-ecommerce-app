import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../component/loader";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const navigate = useNavigate();
  const [errormessage, seterror] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/reset-password-verification`,
        {
          password: data.password,
          token,
        }
      );
      if (res.data.nextStep) {
        navigate(`/${res.data.nextStep}`);
      }
      console.log(res);
    } catch (error) {
      seterror(error.response.data.message)
    } finally {
      setIsLoading(false);
    }
  };

  const password = watch("password", ""); // Watch password field for validation

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Reset Your Password
        </h1>
        <p className={errormessage ? "text-red-500" : "text-neutral-500"}>
          {errormessage ? errormessage : "Nuelmart"}{" "}
        </p>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          {/* New Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-1"
          >
            {isLoading ? <LoadingSpinner /> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
