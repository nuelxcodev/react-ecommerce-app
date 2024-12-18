
/* eslint-disable no-unused-vars */
import { CiLock, CiMail } from "react-icons/ci";
import { BiX } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const loginApi = (data) => {
  //   // Example API login request
  //   console.log(data);
  //   // axios.post('http://localhost:8080/api/login', data).then(response => {
  //   //   // Handle login success
  //   // });
  // };

  const loginApi = (data) => {
    //     // axios
    //     //   .post("http://localhost:8080/api/login", data)
    
    //     //   .then((respose) => {
    //     //     if (respose.data.status === "success") {
    //     //       const decode = jwtDecode(respose.data.token);
    //     //       auth.login(decode);
    //     //       navigate(redirectpath, { replace: true });
    //     //     }
    //     //   });
    //   };
    //   // const googlelogin = useGoogleLogin({
    //   //   onSuccess: (codeRespnse) => {
    //   //     console.log(codeRespnse);
    //   //   ,
    //   // });
      
  }
  const handleSignUp = () => {
    setIsRightPanelActive(true);
  };

  const handleSignIn = () => {
    setIsRightPanelActive(false);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-900">
      <div
        className={`relative bg-white rounded-lg shadow-lg w-full max-w-4xl min-h-[480px] overflow-hidden ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
      >
        {/* Background Section */}
        <div
          className="absolute top-0 left-0 lg:flex hidden w-1/2 h-full bg-gray-500 bg-cover bg-no-repeat items-center justify-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="z-10 text-center text-white px-8">
            <h1 className="text-4xl font-bold">Welcome Back!</h1>
            <p className="text-lg mt-2">Login to access your account.</p>
          </div>
        </div>

        {/* Sign In Section */}
        <div
          className={`absolute inset-0 lg:w-1/2 w-full flex items-center justify-center text-center transition-transform duration-500 ${
            isRightPanelActive ? "translate-x-full" : ""
          }`}
        >
          <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="text-right">
              <BiX
                size={30}
                onClick={() => navigate("/")}
                className="cursor-pointer text-gray-400"
              />
            </div>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white">NUELMAT</h1>
              <p className="text-gray-400">Login</p>
            </div>
            <form
              onSubmit={handleSubmit((data) => loginApi(data))}
              className="space-y-6"
            >
              <button
                type="button"
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg"
              >
                Login with Google
              </button>
              <div className="relative">
                <CiMail size={20} className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  {...register("username")}
                  placeholder="Username/Email"
                  className="w-full pl-10 p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <CiLock size={20} className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Password"
                  className="w-full pl-10 p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="submit"
                value="Login"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg cursor-pointer"
              />
            </form>
            <div className="mt-4 text-gray-400">
              <a href="/forgottenpassword" className="underline hover:text-white">
                Forgot Password?
              </a>
            </div>
            <div className="mt-2 text-gray-400">
              <span>Don’t have an account? </span>
              <a
                onClick={handleSignUp}
                className="underline hover:text-white cursor-pointer"
              >
                Register
              </a>
            </div>
          </div>
        </div>

        {/* Sign Up Section */}
        <div
          className={`absolute inset-0 lg:w-1/2 w-full flex items-center justify-center text-center bg-gray-800 transition-transform duration-500 ${
            isRightPanelActive ? "" : "-translate-x-full"
          }`}
        >
          <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-white">NUELMAT</h1>
            <p className="text-gray-400 mb-8">Register</p>
            <form className="space-y-6">
              <div className="relative">
                <CiMail size={20} className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full pl-10 p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <CiLock size={20} className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="submit"
                value="Sign Up"
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg cursor-pointer"
              />
            </form>
            <div className="mt-2 text-gray-400">
              <span>Already have an account? </span>
              <a
                onClick={handleSignIn}
                className="underline hover:text-white cursor-pointer"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
