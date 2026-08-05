import "./PaymentSuccess.css";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const orderId =
    state?.orderId || localStorage.getItem("order_id") || "SH20260001";

  const paymentId =
    state?.paymentId || "pi_" + Math.random().toString(36).substring(2, 12);

  const amount =
    state?.amount || localStorage.getItem("order_total") || "0";

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedTime = today.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="success-page">

      <div className="success-card">

        {/* Success Icon */}

        <div className="success-icon">
          ✓
        </div>

        {/* Heading */}

        <h1>Payment Successful!</h1>

        <p className="success-message">
          Thank you for shopping with StyleHub.
          <br />
          Your payment has been processed successfully.
        </p>

        {/* Order Information */}

        <div className="success-details">

          <div className="detail-row">
            <span>Order ID</span>
            <strong>{orderId}</strong>
          </div>

          <div className="detail-row">
            <span>Payment ID</span>
            <strong>{paymentId}</strong>
          </div>

          <div className="detail-row">
            <span>Date</span>
            <strong>
              {formattedDate} • {formattedTime}
            </strong>
          </div>

          <div className="detail-row">
            <span>Amount Paid</span>
            <strong>₹{amount}</strong>
          </div>

          <div className="detail-row">
            <span>Estimated Delivery</span>
            <strong>5–7 Business Days</strong>
          </div>

        </div>

        {/* Buttons */}

        <div className="success-buttons">

          <button
            className="invoice-btn"
            onClick={() => alert("Invoice Download Coming Soon")}
          >
            Download Invoice
          </button>

          <button
            className="orders-btn"
            onClick={() => navigate("/orders")}
          >
            View Orders
          </button>

          <button
            className="shop-btn"
            onClick={() => navigate("/shop")}
          >
            Continue Shopping
          </button>

        </div>

      </div>

    </div>
  );
};

export default PaymentSuccess;