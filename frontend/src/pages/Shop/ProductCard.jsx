import "./ProductCard.css";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import defaultImage from "../../assets/products/product1.jpg";

import { addToCart } from "../../services/cartService";

import {
  addToWishlist,
  removeFromWishlist,
  checkWishlistStatus,
} from "../../services/wishlistService";

import useRequireAuth from "../../hooks/useRequireAuth";
import AuthRequiredModal from "../../components/AuthRequiredModal/AuthRequiredModal";

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);

  const { showAuthModal, setShowAuthModal, requireAuth } = useRequireAuth();

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) return;

    fetchWishlistStatus();
  }, []);

  const fetchWishlistStatus = async () => {
    try {
      const data = await checkWishlistStatus(product.id);

      setIsWishlisted(data.is_in_wishlist);
      setWishlistId(data.wishlist_id || null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!requireAuth()) return;

    try {
      if (!isWishlisted) {
        const response = await addToWishlist(product.id);

        setIsWishlisted(true);
        setWishlistId(response.wishlist_id);
      } else {
        await removeFromWishlist(wishlistId);

        setIsWishlisted(false);
        setWishlistId(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!requireAuth()) return;

    try {
      const response = await addToCart(product.id, 1);

      alert(response.message);
    } catch (error) {
      console.error(error);
      alert("Unable to add product to cart.");
    }
  };

  return (
    <>
      <div className="product-card">
        <Link to={`/products/${product.id}`} className="product-link">
          <div className="product-card-image">
            <img src={product.image || defaultImage} alt={product.name} />

            <span className="discount-badge">-20%</span>

            <button
              className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
              onClick={handleWishlist}
            >
              {isWishlisted ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>

          <div className="product-card-details">
            <span className="brand">{product.brand}</span>

            <h3 className="product-name">{product.name}</h3>

            <div className="rating">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <span>(4.8)</span>
            </div>

            <div className="price">
              <span className="new-price">₹{product.price}</span>

              <span className="old-price">₹120</span>
            </div>

            <p className="availability">
              {product.stock > 0 ? "✅ In Stock" : "❌ Out of Stock"}
            </p>

            <button className="cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </Link>
      </div>

      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default ProductCard;
