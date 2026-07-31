import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

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

    if (result.error) {
      setError(result.error.message);

      setLoading(false);
      return;
    }

    if (result.paymentIntent.status === "succeeded") {
      localStorage.removeItem("order_id");

      navigate("/order-success");
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
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="form-group">
        <label className="card-label">Card Number</label>
        <div className="card-input">
          <CardNumberElement options={{ style: elementStyle }} />
        </div>
      </div>

      <div className="form-group">
        <label className="card-label">Expiry Date</label>
        <div className="card-input">
          <CardExpiryElement options={{ style: elementStyle }} />
        </div>
      </div>

      <div className="form-group">
        <label className="card-label">CVV</label>
        <div className="card-input">
          <CardCvcElement options={{ style: elementStyle }} />
        </div>
      </div>

      {error && <p className="payment-error">{error}</p>}

      <button className="pay-btn" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
