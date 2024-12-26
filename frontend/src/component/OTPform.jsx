import { useState } from "react";

function OTPForm() {
  const [otp, setOtp] = useState(new Array(5).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`OTP Submitted: ${otp.join("")}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="optform bg-white shadow-lg p-6 rounded-lg max-w-sm mx-auto text-sm"
    >
      <h1 className="text-2xl font-bold mb-4 text-center">OTP Verification</h1>
      <p className="text-gray-600 mb-6 text-center">
        Please enter the OTP sent to your email address.
      </p>

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
        className="w-full text-white py-2 rounded-lg font-medium transition duration-300"
      >
        Submit OTP
      </button>
    </form>
  );
}

export default OTPForm;
