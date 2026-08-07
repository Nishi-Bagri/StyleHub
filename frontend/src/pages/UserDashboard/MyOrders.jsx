import "./MyOrders.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getOrders } from "../../services/orderService";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const data = await getOrders();

      console.log("Orders API:", data);

      setOrders(data.results);
    } catch (err) {
      console.error(err);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <h2>Loading Orders...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (orders.length === 0) {
    return (
      <div className="my-orders">
        <h2>My Orders</h2>
        <p>You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <div className="order-header">
            <h3>Order #{order.id}</h3>

            <span className={`status ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </div>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(order.order_date).toLocaleDateString()}
          </p>

          <p>
            <strong>Total:</strong> ₹{order.total_amount}
          </p>

          <h4>Products</h4>

          <div className="order-products">
            {order.order_items.map((item) => (
              <div className="product-row" key={item.id}>
                <img src={item.product_image} alt={item.product_name} />

                <div>
                  <p>{item.product_name}</p>

                  <p>Qty: {item.quantity}</p>

                  <p>₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <Link to={`/orders/${order.id}`} className="view-details-btn">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
