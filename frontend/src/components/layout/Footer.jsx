import "./Footer.css";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-container">

                {/* Brand */}

                <div className="footer-column">

                    <h2 className="footer-logo">
                        StyleHub
                    </h2>

                    <p className="footer-description">
                        Elevate your wardrobe with timeless fashion,
                        premium quality, and effortless elegance.
                        Discover styles curated for every occasion.
                    </p>

                </div>

                {/* Quick Links */}

                <div className="footer-column">

                    <h3>Quick Links</h3>

                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/shop">Shop</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>

                </div>

                {/* Customer Care */}

                <div className="footer-column">

                    <h3>Customer Care</h3>

                    <ul>
                        <li><a href="/">FAQ</a></li>
                        <li><a href="/">Shipping</a></li>
                        <li><a href="/">Returns</a></li>
                        <li><a href="/">Privacy Policy</a></li>
                    </ul>

                </div>

                {/* Contact */}

                <div className="footer-column">

                    <h3>Contact</h3>

                    <p>Email</p>
                    <span>support@stylehub.com</span>

                    <p>Phone</p>
                    <span>+1 (800) 123-4567</span>

                    <div className="social-icons">

                        <a href="#">
                            <FaFacebookF />
                        </a>

                        <a href="#">
                            <FaInstagram />
                        </a>

                        <a href="#">
                            <FaTwitter />
                        </a>

                        <a href="#">
                            <FaLinkedinIn />
                        </a>

                    </div>

                </div>

            </div>

            <div className="footer-bottom">

                <p>
                    © {new Date().getFullYear()} StyleHub.
                    All Rights Reserved.
                </p>

            </div>

        </footer>
    );
};

export default Footer;