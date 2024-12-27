import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/Auth";

function OTPForm({ email }) {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectpath = location.state?.path || "/";

  const [otp, setOtp] = useState(new Array(5).fill(""));
  const [loading, setLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(""); // Error message
  const [successMessage, setSuccessMessage] = useState(""); // Success message

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setErrorMessage("");
    setSuccessMessage("");

    const data = {
      otp: otp.join(""),
      email,
    };

    // Validate OTP
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/Otpverification",
        data
      );
      setSuccessMessage(response.data.message); // Display success message
      const decode = jwtDecode(response.data.token);
      auth.login(decode);
      navigate(redirectpath, { replace: true });
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message); // Server error
      } else {
        setErrorMessage("An unexpected error occurred. Please try again."); // Network error
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="otp-form bg-white shadow-lg p-6 rounded-lg max-w-sm mx-auto text-sm"
    >
      <h1 className="text-2xl font-bold mb-4 text-center">OTP Verification</h1>
      <p className="text-gray-600 mb-6 text-center">
        Please enter the OTP sent to your email address.
      </p>

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-600 text-center mb-4">{errorMessage}</div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="text-green-600 text-center mb-4">{successMessage}</div>
      )}

      {/* OTP Inputs */}
      <div className="flex justify-center gap-2 mb-6">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            className="w-12 h-12 border border-gray-300 rounded text-center text-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded-lg font-medium transition duration-300 ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"
        }`}
      >
        {loading ? "Verifying..." : "Submit OTP"}
      </button>
    </form>
  );
}

export default OTPForm;
