import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useState } from "react";



export async function apicall({
  apidata,
  apiroute,
  setIsLoading,
  setApiErr,
  setSuccessMessage,
  setIsOTPActive,
  setotpemail
}) {
  setApiErr("");
  setIsLoading(true);

  console.log(apidata, apiroute)
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/${apiroute}`,
      apidata
    );
    setSuccessMessage(response.data.message);
    console.log(response);
    if (response.data.token) {
      return jwtDecode(response.data.token);
    }
    if (response.data.nextstep) setIsOTPActive(true);
    if (response.data.email) setotpemail(email)
  } catch (error) {
    if (error.response) {
      if (error.response.data.otpsent) {
        setIsOTPActive(true);
        setotpemail(error.response.data.email)
      }
      setApiErr(error.response.data.message); // Server error
    } else {
      setApiErr("An unexpected error occurred. Please try again."); // Network error
    }
  } finally {
    setIsLoading(false);
  }
}
