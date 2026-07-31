import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    return (
        <nav className="navbar">

            <h2
                className="logo"
                onClick={() => navigate("/")}
            >
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

            <button
                className="signin-btn"
                onClick={() => navigate("/login")}
            >
                Sign In
            </button>

        </nav>
    );
}

export default Navbar;