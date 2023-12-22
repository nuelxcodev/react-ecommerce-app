/* eslint-disable no-unused-vars */
import { CiLock, CiMail } from "react-icons/ci";
import { useForm } from "react-hook-form";
import {  BiX } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  return (
    <div className="container">

      <div className="login-form-container">
      <div className="close">
        <BiX size={30}  onClick={()=>navigate('/') } />
      </div>
        <div className="nuelmat">
          <h1>
            <b>NUELMAT</b>
          </h1>
          <span>login</span>
        </div>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
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
