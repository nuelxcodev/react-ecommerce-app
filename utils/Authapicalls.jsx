import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";


export async function apicall({
  apidata,
  apiroute,
  setIsLoading,
  setApiErr,
  setSuccessMessage,
  setIsOTPActive,
  setotpemail,
}) {
 
  setApiErr(""); // Clear any previous error
  setSuccessMessage(""); // Clear any previous success message
  setIsLoading(true); // Set loading to true

  try {
    // Make API request
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/${apiroute}`,
      apidata
    );

    // Handle success response
    setSuccessMessage(response.data.message);
    console.log(response);

    if (response.data.token) {
      return jwtDecode(response.data.token);
    }

    if (response.data.success) {
      setIsOTPActive(true);
      setotpemail(response.data.email);
      return;
    }
  } catch (error) {
    if (error.response) {
      setApiErr(error.response.data.message || "Server error occurred.");
    } else {
      setApiErr("An unexpected error occurred. Please try again.");
    }
  } finally {
    setIsLoading(false);
  }
}
