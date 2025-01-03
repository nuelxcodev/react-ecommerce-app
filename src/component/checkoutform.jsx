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

const CheckoutForm = ({ onfail, onsuccess, message }) => {
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

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error) {
        onfail();
        message(error.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        onsuccess();
      }
    } catch (error) {
      onfail();
      message(error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full rounded-lg">
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

const PaymentForm = ({ data, isFailure, isSuccesful, setmessage }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [retry, setRetry] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchClientSecret = () => {
    fetch(`${apiUrl}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: data.price, email: data.email }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) =>
        console.error("Failed to fetch client secret:", { error: err, data })
      );
  };

  useEffect(() => {
    fetchClientSecret();
  }, [data]);

  useEffect(() => {
    if (retry) {
      fetchClientSecret();
      setRetry(false);
    }
  }, [retry]);

  if (!clientSecret) {
    return (
      <div className="text-center mt-4">
        Loading...
        <button onClick={() => setRetry(true)} className="mt-4 text-blue-600">
          Retry
        </button>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm
        onsuccess={isSuccesful}
        onfail={isFailure}
        message={setmessage}
      />
    </Elements>
  );
};

export default PaymentForm;
