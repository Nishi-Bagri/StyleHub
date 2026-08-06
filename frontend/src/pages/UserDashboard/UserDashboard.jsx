import "./UserDashboard.css";

import { Outlet } from "react-router-dom";

import UserSidebar from "../../components/Dashboard/UserSidebar/UserSidebar";

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <UserSidebar />

      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;