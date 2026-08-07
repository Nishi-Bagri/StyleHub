import { useEffect, useState } from "react";

import { getOrders } from "../../services/orderService";
import { getCart } from "../../services/cartService";
import { getWishlist } from "../../services/wishlistService";

import { FaBox, FaHeart, FaShoppingCart, FaRupeeSign } from "react-icons/fa";

import DashboardCard from "../../components/Dashboard/DashboardCard/DashboardCard";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    orders: 0,
    wishlist: 0,
    cart: 0,
    totalSpent: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const ordersData = await getOrders();
      const cartData = await getCart();
      const wishlistData = await getWishlist();

      const orders = ordersData.results || [];

      const totalSpent = orders.reduce(
        (sum, order) => sum + Number(order.total_amount),
        0,
      );

      setStats({
        orders: orders.length,
        wishlist: wishlistData.length,
        cart: cartData.length,
        totalSpent,
      });

      setRecentOrders(orders.slice(0, 3));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <>
      <h1>Welcome Back 👋</h1>

      <p>Manage your account from one place.</p>

      <div className="dashboard-cards">
        <DashboardCard
          title="Orders"
          value={stats.orders}
          icon={<FaBox />}
          color="#3B82F6"
        />

        <DashboardCard
          title="Wishlist"
          value={stats.wishlist}
          icon={<FaHeart />}
          color="#EF4444"
        />

        <DashboardCard
          title="Cart"
          value={stats.cart}
          icon={<FaShoppingCart />}
          color="#10B981"
        />

        <DashboardCard
          title="Total Spent"
          value={`₹${stats.totalSpent.toFixed(2)}`}
          icon={<FaRupeeSign />}
          color="#F59E0B"
        />
      </div>

      <div className="recent-orders">
        <h2>Recent Orders</h2>

        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>

                <td className={order.status.toLowerCase()}>{order.status}</td>

                <td>₹{order.total_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DashboardHome;
