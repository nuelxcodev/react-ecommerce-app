import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Load Stripe with your public key
const stripePromise = loadStripe(
  "pk_test_51OnjLOGCknDHbRO0MqNNpOjnETiX8PHh5MbVd7VeofJQQDr9p3quNWqLpkkP1h1npjBsvq8hhIVnpMT4erEQP8uA00gHcD4PV3"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe has not loaded yet.");
      return;
    }

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "${process.env.CLIENT_URI}/checkout/success", // Redirect URL after successful payment
      },
    });

    if (error) {
      console.error("Payment failed:", error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4  rounded-lg">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-3 px-4 text-white font-semibold rounded-lg ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

const PaymentForm = ({ data }) => {
  const [clientSecret, setClientSecret] = useState("");

  console.log(data);

  useEffect(() => {
    // Fetch client secret from server (ensure the server is correctly configured)
    fetch(`${process.env.API_URI}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: data.price, email: data.email}), // Replace with dynamic amount
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error("Failed to fetch client secret:", err));
  }, []);

  if (!clientSecret) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentForm;
