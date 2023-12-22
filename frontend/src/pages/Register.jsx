/* eslint-disable no-unused-vars */
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BiX } from "react-icons/bi";
import {BrowserRouter, useNavigate} from 'react-router-dom'

function Register() {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const apiregistration = (data) => {
    if (data.password === data.confirmedpassword) {
      document.getElementById("cmfpws").style.border = "none";
      console.log(data);
    } else {
      document.getElementById("cmfpws").style.border = "2px solid red";
      document.getElementById("erro").innerHTML = "password does not match. ";
      document.getElementById("erro").style.color = "red";
    }
  };

  return (
    <div className="container">
      <div className="login-form-container">
      <div className="close" onClick={()=>navigate('/') }>
        <BiX size={30} />
      </div>
        <div className="nuelmat">
          <h1>
            <b>NUELMAT</b>
          </h1>
          <span>register</span>
        </div>
        <form onSubmit={handleSubmit((data) => apiregistration(data))}>
          <div className="username">
            <CiUser size={20} className="icons" />
            <input
              {...register("username")}
              placeholder=" enter new username"
            />
          </div>
          <div className="email">
            <CiMail size={20} className="icons" />
            <input {...register("email")} placeholder="enter your email" />
          </div>
          <div className="password ">
            <CiLock size={20} className="icons" />
            <input {...register("password")} placeholder="enter password" />
          </div>
          <div className="password" id="cmfpws">
            <CiLock size={20} className="icons" />
            <input
              {...register("confirmedpassword")}
              placeholder="confirm password"
            />
          </div>
          <span id="erro"></span>
          <input type="submit" />

          <a href="/forgottenpassword">forgot password?</a>

          <div>
            <span>already have an account? </span>
            <a href="/login">login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
