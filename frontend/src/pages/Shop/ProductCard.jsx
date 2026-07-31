import "./ProductCard.css";
import { FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import defaultImage from "../../assets/products/product1.jpg";

import { addToCart } from "../../services/cartService";

const ProductCard = ({ product }) => {
  const handleAddToCart = async (e) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Prevent click bubbling

    try {
      const response = await addToCart(product.id, 1);

      alert(response.message);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        alert("Please login first.");
      } else {
        alert("Unable to add product to cart.");
      }
    }
  };

  console.log(product.image);

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <div className="product-card-image">
          <img src={product.image || defaultImage} alt={product.name} />

          <span className="discount-badge">-20%</span>

          <button className="wishlist-btn" onClick={(e) => e.preventDefault()}>
            <FaHeart />
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
  );
};

export default ProductCard;
