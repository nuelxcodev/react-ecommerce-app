import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiLogoGooglePlus } from "react-icons/bi";
import { BsFacebook, BsLinkedin } from "react-icons/bs";
import { useAuth } from "../../utils/Auth";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";

function Loginform() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectpath = location.state?.path || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginApi = (data) => {
    axios.post("http://localhost:8080/api/login", data).then((response) => {
      if (response.data.status === "success") {
        const decode = jwtDecode(response.data.token);
        auth.login(decode);
        navigate(redirectpath, { replace: true });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(loginApi)}>
      <h1>Sign in</h1>
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
      <span>or use your account</span>
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
      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <a href="#">Forgot your password?</a>
      <button type="submit">Sign In</button>
    </form>
  );
}

export default Loginform;
