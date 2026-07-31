import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";

import stripePromise from "../../stripe";
import { createPaymentIntent } from "../../services/paymentService";
import CheckoutForm from "./CheckoutForm";
import "./Payment.css";

const Payment = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetchPaymentIntent();
  }, []);

  const fetchPaymentIntent = async () => {
    try {
      const orderId = localStorage.getItem("order_id");

      if (!orderId) {
        navigate("/cart");
        return;
      }

      const response = await createPaymentIntent(orderId);

      setClientSecret(response.client_secret);
    } catch (error) {
      console.error(error);

      navigate("/cart");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="payment-container">
        <h2>Loading Payment...</h2>
      </div>
    );
  }

  return (
    <div className="payment-page">
      {/* Header */}

      <header className="payment-header">
        <div className="logo">StyleHub</div>

        <div className="checkout-steps">
          <div className="step completed">Cart</div>

          <div className="step completed">Checkout</div>

          <div className="step active">Payment</div>

          <div className="step">Success</div>
        </div>
      </header>

      {/* Title */}

      <section className="payment-title">
        <h1>Complete Your Purchase</h1>

        <p>Securely pay for your order using Stripe.</p>
      </section>

      {/* Main Layout */}

      <section className="payment-layout">
        {/* LEFT */}

        <div className="payment-card">
          <h2>Payment Details</h2>

          <p>Enter your payment information below.</p>

          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm clientSecret={clientSecret} />
            </Elements>
          )}
        </div>

        {/* RIGHT */}

        <div className="summary-card">
          <h2>Order Summary</h2>

          <div className="summary-product">
            <div className="product-image">IMG</div>

            <div>
              <h4>Premium Product</h4>

              <p>Qty : 1</p>
            </div>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹10,498</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>FREE</span>
          </div>

          <div className="summary-row">
            <span>Tax</span>
            <span>Included</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <span>₹10,498</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Payment;
