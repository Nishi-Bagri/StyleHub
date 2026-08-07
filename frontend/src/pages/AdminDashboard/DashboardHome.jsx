import { FaBox, FaUsers, FaShoppingCart, FaRupeeSign } from "react-icons/fa";

import DashboardCard from "../../components/Dashboard/DashboardCard/DashboardCard";

const DashboardHome = () => {
  return (
    <>
      <h1>Admin Dashboard</h1>

      <p>Manage your store from one place.</p>

      <div className="dashboard-cards">
        <DashboardCard
          title="Products"
          value="0"
          icon={<FaBox />}
          color="#3B82F6"
        />

        <DashboardCard
          title="Orders"
          value="0"
          icon={<FaShoppingCart />}
          color="#10B981"
        />

        <DashboardCard
          title="Users"
          value="0"
          icon={<FaUsers />}
          color="#EF4444"
        />

        <DashboardCard
          title="Revenue"
          value="₹0"
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
              <th>Customer</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No recent orders.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DashboardHome;