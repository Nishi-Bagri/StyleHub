import "./ShopBanner.css";
import { Link } from "react-router-dom";

const ShopBanner = () => {
    return (
        <section className="shop-banner">

            <div className="shop-banner-overlay">

                <span className="shop-tag">
                    STYLEHUB COLLECTION
                </span>

                <h1>Shop Collection</h1>

                <p>
                    Discover timeless fashion crafted with premium quality,
                    elegant designs, and modern trends for every occasion.
                </p>

            </div>

        </section>
    );
};

export default ShopBanner;