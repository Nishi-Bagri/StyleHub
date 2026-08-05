import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getOrder, cancelOrder } from "../../services/orderService";

import "./OrderDetails.css";

const OrderDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await getOrder(id);
      setOrder(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    try {
      const response = await cancelOrder(id);

      setMessage(response.message);

      fetchOrder();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Unable to cancel order.");
    }
  };

  if (loading) {
    return (
      <div className="order-details-page">
        <h2>Loading Order...</h2>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-details-page">
        <h2>Order not found.</h2>
      </div>
    );
  }

  return (
    <div className="order-details-page">
      <div className="order-details-container">
        <h1>Order Details</h1>

        {message && <div className="success-message">{message}</div>}

        {/* Order Information */}

        <div className="order-info">
          <div className="order-info-card">
            <span className="order-info-title">Order ID</span>

            <h3>#{order.id}</h3>
          </div>

          <div className="order-info-card">
            <span className="order-info-title">Status</span>

            <span className={`status-badge ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </div>

          <div className="order-info-card">
            <span className="order-info-title">Order Date</span>

            <h3>{new Date(order.order_date).toLocaleDateString()}</h3>
          </div>

          <div className="order-info-card">
            <span className="order-info-title">Total Amount</span>

            <h3>₹{Number(order.total_amount).toLocaleString("en-IN")}</h3>
          </div>
        </div>

        {/* Products */}

        <h2>Products</h2>

        <div className="order-products-list">
          {order.order_items.map((item) => (
            <div className="order-product-card" key={item.id}>
              <img
                src={item.product_image}
                alt={item.product_name}
                className="order-product-image"
              />

              <div className="order-product-info">
                <h3>{item.product_name}</h3>

                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>

                <p>
                  <strong>Price:</strong> ₹
                  {Number(item.price).toLocaleString("en-IN")}
                </p>

                <p>
                  <strong>Total:</strong> ₹
                  {(item.quantity * Number(item.price)).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}

        <div className="order-actions">
          {order.status.toLowerCase() === "pending" && (
            <button className="cancel-btn" onClick={handleCancelOrder}>
              Cancel Order
            </button>
          )}

          <button
            className="order-back-btn"
            onClick={() => navigate("/orders")}
          >
            ← Back to Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
