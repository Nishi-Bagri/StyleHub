import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import "./Navbar.css";

import { isAuthenticated, logout } from "../../services/authService";

function Navbar() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }

    setLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2 className="logo" onClick={() => navigate("/")}>
        StyleHub
      </h2>

      <ul className="nav-links">
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/shop")}>Shop</li>
        <li>Men</li>
        <li>Women</li>
        <li>Kids</li>
        <li>Sale</li>
      </ul>

      <div className="nav-actions">
        <div className="nav-icon" onClick={() => navigate("/wishlist")}>
          <FaHeart />
        </div>

        <div className="nav-icon" onClick={() => navigate("/cart")}>
          <FaShoppingCart />
        </div>

        {loggedIn ? (
          <div className="account-menu" ref={dropdownRef}>
            <div
              className="account-trigger"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FaUserCircle />
              <FaChevronDown />
            </div>

            {showDropdown && (
              <div className="account-dropdown">
                <div onClick={() => navigate("/user/dashboard")}>Dashboard</div>

                <div onClick={() => navigate("/user/dashboard/profile")}>
                  Profile
                </div>

                <div onClick={() => navigate("/orders")}>My Orders</div>

                <div onClick={() => navigate("/wishlist")}>Wishlist</div>

                <div onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        ) : (
          <button className="signin-btn" onClick={() => navigate("/login")}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
