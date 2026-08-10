import { useState } from "react";

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useNavigate } from "react-router-dom";

import { confirmPayment } from "../../services/paymentService";


const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setError("");


    const cardElement = elements.getElement(CardNumberElement);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });


    /* Stripe Payment Error */

    if (result.error) {
      setError(result.error.message);

      setLoading(false);
      return;
    }


    /* Payment Successful */

    if (result.paymentIntent.status === "succeeded") {
      try {

        // Confirm successful payment with Django backend
        await confirmPayment(result.paymentIntent.id);


        // Go to payment success page
        navigate("/payment-success", {
          state: {
            orderId: localStorage.getItem("order_id"),
            paymentId: result.paymentIntent.id,
            amount: result.paymentIntent.amount / 100,
          },
        });


        localStorage.removeItem("order_id");

      } catch (error) {

        console.error(
          "Payment confirmation failed:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Payment was successful, but order confirmation failed."
        );
      }
    }


    setLoading(false);
  };


  const elementStyle = {
    base: {
      fontSize: "16px",
      color: "#32325d",

      "::placeholder": {
        color: "#aab7c4",
      },
    },

    invalid: {
      color: "#fa755a",
    },
  };


  return (
    <form onSubmit={handleSubmit}>

      {/* Card Number */}

      <div className="form-group">
        <label className="card-label">
          Card Number
        </label>

        <div className="card-input">
          <CardNumberElement
            options={{
              style: elementStyle,
            }}
          />
        </div>
      </div>


      {/* Expiry Date */}

      <div className="form-group">
        <label className="card-label">
          Expiry Date
        </label>

        <div className="card-input">
          <CardExpiryElement
            options={{
              style: elementStyle,
            }}
          />
        </div>
      </div>


      {/* CVV */}

      <div className="form-group">
        <label className="card-label">
          CVV
        </label>

        <div className="card-input">
          <CardCvcElement
            options={{
              style: elementStyle,
            }}
          />
        </div>
      </div>


      {/* Error Message */}

      {error && (
        <p className="payment-error">
          {error}
        </p>
      )}


      {/* Pay Button */}

      <button
        type="submit"
        className="pay-btn"
        disabled={!stripe || loading}
      >
        {loading
          ? "Processing..."
          : "Pay Now"}
      </button>

    </form>
  );
};


export default CheckoutForm;