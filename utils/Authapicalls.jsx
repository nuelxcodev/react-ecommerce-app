import { jwtDecode } from "jwt-decode";
import axios from "axios";


export async function apicall({
  apidata,
  apiroute,
  setIsLoading,
  setApiErr,
  setSuccessMessage,
  setIsOTPActive,
}) {
  setApiErr("");
  setIsLoading(true)
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/${apiroute}`,
      apidata
    );
    setSuccessMessage(response.data.message);
    if (response.data.token) {
      return jwtDecode(response.data.token);
    }
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
