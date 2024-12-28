import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiLogoGooglePlus } from "react-icons/bi";
import { BsFacebook, BsLinkedin } from "react-icons/bs";
import { useAuth } from "../../utils/Auth";
import {jwtDecode} from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";

function LoginForm() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";
  const [isResetPassword, setIsResetPassword] = useState(false); // Toggle reset password mode
  const [resetMessage, setResetMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginApi = async (data) => {
    try {
      const response = await axios.post(`${process.env.API_URI}/login`, data);
      const decode = jwtDecode(response.data.token);
      auth.login(decode);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred during login.");
    }
  };

  const resetPasswordApi = async (data) => {
    console.log(data)
    try {
      const response = await axios.post(
        `${process.env.API_URI}/resetpassword`,
        { email: data.email }
      );
      setResetMessage(response.data.message);
    } catch (error) {
      setResetMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(isResetPassword ? resetPasswordApi : loginApi)}
    >
      <h1>{isResetPassword ? "Reset Password" : "Sign In"}</h1>

      {!isResetPassword && (
        <div className="social-container">
          <a href="#" className="social">
            <BsFacebook size={20} />
          </a>
          <a href="#" className="social">
            <BiLogoGooglePlus size={20} />
          </a>
          <a href="#" className="social">
            <BsLinkedin size={20} />
          </a>
        </div>
      )}

      <span>{isResetPassword ? "Enter your email to reset password" : "or use your account"}</span>

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
      />
      {errors.email && <p>{errors.email.message}</p>}

      {!isResetPassword && (
        <>
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </>
      )}

      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setIsResetPassword(!isResetPassword);
          setResetMessage(""); // Clear previous reset messages
        }}
      >
        {isResetPassword ? "Back to Login" : "Forgot your password?"}
      </a>

      <button type="submit">{isResetPassword ? "Reset Password" : "Sign In"}</button>

      {resetMessage && <p>{resetMessage}</p>}
    </form>
  );
}

export default LoginForm;
