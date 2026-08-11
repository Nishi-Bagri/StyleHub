import "./UserSidebar.css";

import { NavLink } from "react-router-dom";

import {
  FaUser,
  FaBox,
  FaHeart,
  FaKey,
} from "react-icons/fa";

const UserSidebar = () => {
  return (
    <aside className="user-sidebar">
      <h2>My Account</h2>

      <NavLink to="/user/dashboard/profile">
        <FaUser />
        Profile
      </NavLink>

      <NavLink to="/user/dashboard/orders">
        <FaBox />
        My Orders
      </NavLink>

      <NavLink to="/user/dashboard/wishlist">
        <FaHeart />
        Wishlist
      </NavLink>

      <NavLink to="/user/dashboard/change-password">
        <FaKey />
        Change Password
      </NavLink>
    </aside>
  );
};

export default UserSidebar;