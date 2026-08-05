import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getOrders } from "../../services/orderService";

import "./Orders.css";

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();

      console.log(response.results);
      console.log(response.results[0]);

      setOrders(response.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status.toUpperCase()) {
      case "DELIVERED":
        return "status delivered";

      case "PAID":
        return "status paid";

      case "PROCESSING":
        return "status processing";

      case "PENDING":
        return "status pending";

      case "CANCELLED":
        return "status cancelled";

      default:
        return "status";
    }
  };

  if (loading) {
    return (
      <div className="orders-page">
        <h2>Loading Orders...</h2>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <h1>My Orders</h1>

          <p>Track all your purchases in one place.</p>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <h2>No Orders Yet</h2>

            <p>You haven't placed any orders yet.</p>

            <button className="shop-btn" onClick={() => navigate("/shop")}>
              Continue Shopping
            </button>
          </div>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-image">
                <img
                  src={order.order_items?.[0]?.product_image}
                  alt={order.order_items?.[0]?.product_name || "Product"}
                />
              </div>

              <div className="order-details">
                <h3>{order.order_items?.[0].product_name}</h3>

                <p>
                  Order #<strong>{order.id}</strong>
                </p>

                <p>{new Date(order.order_date).toLocaleDateString()}</p>
              </div>

              <div className="order-status">
                <span className={getStatusClass(order.status)}>
                  {order.status}
                </span>
              </div>

              <div className="order-price">₹{order.total_amount}</div>

              <div>
                <button
                  className="details-btn"
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
