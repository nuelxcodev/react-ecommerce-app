import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../component/loader";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { apicall } from "../../utils/Authapicalls";
import { useAuth } from "../../utils/Auth";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const redirectPath = location.state?.path || "/";
  const [err, setApiErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [isOTPActive, setIsOTPActive] = useState(false);
  const [isForgotPasswordActive, setIsForgotPasswordActive] = useState(false);
  const [otp, setOtp] = useState(new Array(5).fill(""));
  const [successMessage, setSuccessMessage] = useState("");
  const [otpemail, setotpemail] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleToggleSignUp = () => {
    setIsSignUpActive(!isSignUpActive);
    setApiErr("");
    reset({ email: "", password: "" });
  };

  const handleToggleForgotPassword = () => {
    setIsForgotPasswordActive(!isForgotPasswordActive);
    setApiErr("");
    reset({ email: "", password: "" });
  };

  const onsumbit = async (data) => {
    await apicall({
      apiroute: isSignUpActive
        ? "register"
        : isForgotPasswordActive
        ? "resetpassword"
        : isOTPActive
        ? "Otpverification"
        : "login",
      apidata: isOTPActive ? { otp:data, email: otpemail } : data,
      setIsOTPActive,
      setIsLoading,
      setApiErr,
      setSuccessMessage,
    }).then((data) => {
      auth.login(data);
      data && navigate(redirectPath, { replace: true });
    });
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen md:w-[70%] h-[300px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row w-full max-w-6xl md:bg-neutral-300 rounded-lg shadow-2xl overflow-hidden"
      >
        {/* Left Section: Branding */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-r from-pink-900 via-pink-500 md:to-neutral-300 to-white p-10 text-white">
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-extrabold">Welcome to Nuelmart</h1>
            <p className="text-lg">
              Discover the power of our e-commerce dashboard to streamline your
              business operations.
            </p>
          </div>
        </div>

        {/* Right Section: Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {isOTPActive
                ? "Enter OTP"
                : isForgotPasswordActive
                ? "Forgot Password"
                : isSignUpActive
                ? "Create an Account"
                : "Welcome Back"}
            </h2>

            <p className="text-sm text-gray-600">
              {/* Error Message */}
              {isOTPActive
                ? "Check your email for the OTP code."
                : isForgotPasswordActive
                ? "Enter your email to reset your password."
                : isSignUpActive
                ? "Register to get started"
                : "Login to access your account"}
            </p>
            {successMessage && (
              <p className="text-green-500 text-center mt-4 text-sm">
                {successMessage}
              </p>
            )}
            {err && (
              <p className="text-red-500 text-center mt-4 text-sm">{err}</p>
            )}
          </div>

          <motion.div
            key={
              isOTPActive
                ? "otp"
                : isForgotPasswordActive
                ? "forgot"
                : isSignUpActive
                ? "register"
                : "login"
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isOTPActive ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onsumbit(otp.join(""));
                }}
                className="space-y-4"
              >
                <div className="flex justify-center gap-2 mb-6">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      className="w-12 h-12 border border-gray-300 rounded text-center text-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ))}
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-all shadow-md"
                >
                  {isLoading ? (
                    <div className=" w-full flex justify-center items-center">
                      <LoadingSpinner />
                    </div>
                  ) : (
                    "Verify OTP"
                  )}
                </button>
              </form>
            ) : isForgotPasswordActive ? (
              <form onSubmit={handleSubmit(onsumbit)} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full bg-gray-100 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-all shadow-md"
                >
                  {isLoading ? (
                    <div className=" w-full flex justify-center items-center">
                      <LoadingSpinner />
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>
            ) : isSignUpActive ? (
              // register user form
              <form onSubmit={handleSubmit(onsumbit)} className="space-y-4">
                <input
                  type="text"
                  placeholder="Username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  className="w-full bg-gray-100 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full bg-gray-100 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full bg-gray-100 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-all shadow-md"
                >
                  {isLoading ? (
                    <div className=" w-full flex justify-center items-center">
                      <LoadingSpinner />
                    </div>
                  ) : (
                    "Register"
                  )}
                </button>
              </form>
            ) : (
              // user login form
              <form onSubmit={handleSubmit(onsumbit)} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full bg-gray-100 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-gray-100 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  {...register("password", {
                    required: "password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-all shadow-md"
                >
                  {isLoading ? (
                    <div className=" w-full flex justify-center items-center">
                      <LoadingSpinner />
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Toggle Buttons */}
          <div className="mt-6 text-center">
            {!isOTPActive && !isForgotPasswordActive && (
              <button
                onClick={handleToggleSignUp}
                className="text-pink-500 hover:text-pink-600 font-medium text-sm"
              >
                {isSignUpActive
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign Up"}
              </button>
            )}
            {!isSignUpActive && !isOTPActive && (
              <button
                onClick={handleToggleForgotPassword}
                className="block mt-4 text-gray-500 hover:text-gray-600 text-sm"
              >
                {isForgotPasswordActive ? "Back to login" : "Forgot Password?"}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
