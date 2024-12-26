/* eslint-disable no-unused-vars */
import { CiLock, CiMail } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { BiLogoGooglePlus, BiX } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuth } from "../../utils/Auth";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { BsFacebook, BsLinkedin } from "react-icons/bs";
import Loginform from "./Loginform";
import OTPForm from "../component/OTPform";
import LoadingSpinner from "../component/loader";

function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const redirectpath = location.state?.path || "/";
  const [err, setApierr] = useState("");
  const [otpsent, setcotpsent] = useState({
    message: "",
    open: false,
  });
  const [isloading, setisloading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const RegisterApi = (data) => {
    setisloading(true);
    axios.post("http://localhost:8080/api/register", data).then((response) => {
      if (response.status === 200) {
        setcotpsent({
          message: response.data.message,
          open: true,
        });
        setisloading(false);
      }
    });
  };

  console.log(otpsent);

  useEffect(() => {
    const container = document.getElementById("auth-container");

    const handleSignUpClick = () => {
      container.classList.add("right-panel-active");
    };

    const handleSignInClick = () => {
      container.classList.remove("right-panel-active");
    };

    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");

    if (signUpButton) signUpButton.onclick = handleSignUpClick;
    if (signInButton) signInButton.onclick = handleSignInClick;

    return () => {
      if (signUpButton) signUpButton.onclick = null;
      if (signInButton) signInButton.onclick = null;
    };
  }, []);

  return (
    <div className="auth-cont">
      <div className="auth-container" id="auth-container">
        <div className="form-container sign-up-container">
          {otpsent.open ? (
            <OTPForm />
          ) : isloading ? (
            <LoadingSpinner />
          ) : (
            <form onSubmit={handleSubmit(RegisterApi)}>
              <h1>Create Account</h1>
              {err && <p>{err}</p>}
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
              <span>or use your email for registration</span>
              <input
                type="text"
                placeholder="Username"
                {...register("username", { required: "Name is required" })}
              />
              {errors.name && <p>{errors.name.message}</p>}
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
              <button type="submit">Sign Up</button>
            </form>
          )}

          {/* <OTPForm/> */}
        </div>

        <div className="form-container sign-in-container">
          <Loginform />
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
