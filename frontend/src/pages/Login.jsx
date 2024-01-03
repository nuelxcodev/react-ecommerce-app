/* eslint-disable no-unused-vars */
import { CiLock, CiMail } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { BiX } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuth } from "../../utils/Auth";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const redirectpath = location.state?.path || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginApi = (data) => {
    axios
      .post("http://localhost:8080/api/login", data)

      .then((respose) => {
        if (respose.data.status === "success") {
          const decode = jwtDecode(respose.data.token);
          auth.login(decode);
          navigate(redirectpath, { replace: true });
        }
      });
  };
  const googlelogin = useGoogleLogin({
    onSuccess: (codeRespnse) => {
      console.log(codeRespnse);
    },
  });

  return (
    <div className="container">
      <div className="login-form-container">
        <div className="close">
          <BiX size={30} onClick={() => navigate("/")} />
        </div>
        <div className="nuelmat">
          <h1>
            <b>NUELMAT</b>
          </h1>
          <span>login</span>
        </div>
        <form onSubmit={handleSubmit((data) => loginApi(data))}>
          <div>
            <input
              type="button"
              value="login with google"
              onClick={() => {
                googlelogin();
              }}
            />
          </div>
          <div className="email">
            <CiMail size={20} className="icons" />
            <input {...register("username")} placeholder="username/email" />
          </div>
          <div className="password">
            <CiLock size={20} className="icons" />
            <input {...register("password")} placeholder="password" />
          </div>
          <input type="submit" />

          <a href="/forgottenpassword">forgot password?</a>
          <div>
            <span>do not have account? </span>
            <a href="/register">register</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
