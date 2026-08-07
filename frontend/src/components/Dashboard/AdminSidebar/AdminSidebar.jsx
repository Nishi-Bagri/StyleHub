import "./AdminSidebar.css";

import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaBox,
  FaTags,
  FaShoppingCart,
  FaUsers,
  FaCreditCard,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <h2>Admin Panel</h2>

      <NavLink to="/admin/dashboard" end>
        <FaHome />
        Dashboard
      </NavLink>

      <NavLink to="/admin/dashboard/products">
        <FaBox />
        Products
      </NavLink>

      <NavLink to="/admin/dashboard/categories">
        <FaTags />
        Categories
      </NavLink>

      <NavLink to="/admin/dashboard/orders">
        <FaShoppingCart />
        Orders
      </NavLink>

      <NavLink to="/admin/dashboard/users">
        <FaUsers />
        Users
      </NavLink>

      <NavLink to="/admin/dashboard/payments">
        <FaCreditCard />
        Payments
      </NavLink>

      <NavLink to="/admin/dashboard/reports">
        <FaChartBar />
        Reports
      </NavLink>

      <NavLink to="/admin/dashboard/settings">
        <FaCog />
        Settings
      </NavLink>

      <NavLink to="/">
        <FaSignOutAlt />
        Logout
      </NavLink>
    </aside>
  );
};

export default AdminSidebar;