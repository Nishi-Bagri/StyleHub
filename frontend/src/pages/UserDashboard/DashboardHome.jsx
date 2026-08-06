import {
  FaBox,
  FaHeart,
  FaShoppingCart,
  FaRupeeSign,
} from "react-icons/fa";

import DashboardCard from "../../components/Dashboard/DashboardCard/DashboardCard";

const DashboardHome = () => {
  return (
    <>
      <h1>Welcome Back 👋</h1>

      <p>Manage your account from one place.</p>

      <div className="dashboard-cards">
        <DashboardCard
          title="Orders"
          value="12"
          icon={<FaBox />}
          color="#3B82F6"
        />

        <DashboardCard
          title="Wishlist"
          value="5"
          icon={<FaHeart />}
          color="#EF4444"
        />

        <DashboardCard
          title="Cart"
          value="3"
          icon={<FaShoppingCart />}
          color="#10B981"
        />

        <DashboardCard
          title="Total Spent"
          value="₹24,999"
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
            <tr>
              <td>#1025</td>
              <td className="delivered">Delivered</td>
              <td>₹1,299</td>
            </tr>

            <tr>
              <td>#1024</td>
              <td className="shipped">Shipped</td>
              <td>₹899</td>
            </tr>

            <tr>
              <td>#1023</td>
              <td className="processing">Processing</td>
              <td>₹2,499</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DashboardHome;