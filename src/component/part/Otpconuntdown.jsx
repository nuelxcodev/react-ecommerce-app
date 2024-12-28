import React, { useState, useEffect } from "react";

const CountdownTimer = ({ onExpire, onResend }) => {
  const [timeLeft, setTimeLeft] = useState(60); // Initialize with 60 seconds
  const [resendDisabled, setResendDisabled] = useState(true); // Disable resend button initially

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup the interval on unmount
    } else {
      setResendDisabled(false); // Enable the resend button when timer expires
      if (onExpire) onExpire(); // Call `onExpire` when timer ends
    }
  }, [timeLeft, onExpire]);

  const handleResend = () => {
    if (onResend) onResend(); // Trigger the resend callback
    setTimeLeft(60); // Reset the timer
    setResendDisabled(true); // Disable the resend button again
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="countdown-timer text-center text-lg font-bold">
      <p>Time Left: {formatTime(timeLeft)}</p>
      <button
        onClick={handleResend}
        disabled={resendDisabled}
        className={`mt-4 px-4 py-2 rounded ${
          resendDisabled
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {resendDisabled ? "Wait to Resend OTP" : "Resend OTP"}
      </button>
    </div>
  );
};

export default CountdownTimer;
