import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

import {
    isAuthenticated,
    logout,
} from "../../services/authService";

function Navbar() {

    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState(
        isAuthenticated()
    );

    useEffect(() => {
        setLoggedIn(isAuthenticated());
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

            <h2
                className="logo"
                onClick={() => navigate("/")}
            >
                StyleHub
            </h2>

            <ul className="nav-links">

                <li onClick={() => navigate("/")}>
                    Home
                </li>

                <li onClick={() => navigate("/shop")}>
                    Shop
                </li>

                <li>Men</li>

                <li>Women</li>

                <li>Kids</li>

                <li>Sale</li>

            </ul>

            {loggedIn ? (

                <button
                    className="signin-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            ) : (

                <button
                    className="signin-btn"
                    onClick={() => navigate("/login")}
                >
                    Sign In
                </button>

            )}

        </nav>
    );
}

export default Navbar;