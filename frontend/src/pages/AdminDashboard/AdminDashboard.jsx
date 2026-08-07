import "./AdminDashboard.css";

import { Outlet } from "react-router-dom";

import AdminSidebar from "../../components/Dashboard/AdminSidebar/AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;