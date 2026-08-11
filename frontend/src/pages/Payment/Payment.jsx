import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";

import stripePromise from "../../stripe";
import { createPaymentIntent } from "../../services/paymentService";
import CheckoutForm from "./CheckoutForm";
import "./Payment.css";
import { getOrder } from "../../services/orderService";

const Payment = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [order, setOrder] = useState(null);

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

      const orderResponse = await getOrder(orderId);

      console.log(orderResponse);

      setOrder(orderResponse);
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

  console.log("Order Data:", order);
  console.log("Order Items:", order?.order_items);

  return (
    <div className="payment-page">

      {/* =========================================
          PAGE TITLE
      ========================================= */}

      <section className="payment-title">
        <h1>Complete Your Purchase</h1>

        <p>
          Securely pay for your order using Stripe.
        </p>
      </section>

      {/* =========================================
          PAYMENT LAYOUT
      ========================================= */}

      <section className="payment-layout">

        {/* =====================================
            PAYMENT CARD
        ===================================== */}

        <div className="payment-card">

          <h2>Payment Details</h2>

          <p>
            Enter your card details to complete your
            payment securely.
          </p>

          {clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{ clientSecret }}
            >
              <CheckoutForm clientSecret={clientSecret} />
            </Elements>
          )}

          {/* =================================
              SECURITY
          ================================= */}

          <div className="payment-security">

            <p>🔒 Secure Payment</p>

            <p>Powered by Stripe</p>

            <div className="card-brands">
              <span>Visa</span>
              <span>Mastercard</span>
              <span>RuPay</span>
            </div>

          </div>

          {/* =================================
              BACK BUTTON
          ================================= */}

          <button
            className="back-btn"
            onClick={() => navigate("/checkout")}
          >
            ← Back to Checkout
          </button>

        </div>

        {/* =====================================
            ORDER SUMMARY
        ===================================== */}

        <div className="summary-card">

          <h2>Order Summary</h2>

          {/* Products */}

          {order?.order_items?.map((item) => (
            <div
              className="summary-product"
              key={item.id}
            >
              <img
                src={item.product_image}
                alt={item.product_name}
                className="summary-image"
              />

              <div className="summary-info">

                <h4>
                  {item.product_name}
                </h4>

                <p>
                  Qty : {item.quantity}
                </p>

                <p>
                  ₹{item.price}
                </p>

              </div>
            </div>
          ))}

          {/* Subtotal */}

          <div className="summary-row">
            <span>Subtotal</span>

            <span>
              ₹{order?.total_amount}
            </span>
          </div>

          {/* Shipping */}

          <div className="summary-row">
            <span>Shipping</span>

            <span>FREE</span>
          </div>

          {/* Tax */}

          <div className="summary-row">
            <span>Tax</span>

            <span>Included</span>
          </div>

          <hr />

          {/* Total */}

          <div className="summary-total">

            <span>Total</span>

            <span>
              ₹{order?.total_amount}
            </span>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Payment;