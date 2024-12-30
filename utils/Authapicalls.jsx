import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import axios from "axios";

// this function decode token gotten from api
export async function decodeAuth(data) {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";

  const decode = jwtDecode(data);
  auth.login(decode);
  navigate(redirectPath, { replace: true });
}

export async function apicall({
  apidata,
  apiroute,
  setIsLoading,
  setApiErr,
  setSuccessMessage,
  setIsOTPActive,
}) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/${apiroute}`,
      apidata
    );
    setSuccessMessage(response.data.message);
    if (response.data.token) decodeAuth(response.data.token);
    if (response.data.nextstep) setIsOTPActive(true);
  } catch (error) {
    if (error.response) {
      setApiErr(error.response.data.message); // Server error
    } else {
      setApiErr("An unexpected error occurred. Please try again."); // Network error
    }
  } finally {
    setIsLoading(false);
  }
}
