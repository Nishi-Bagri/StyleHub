import "./ProductCard.css";
import { FaHeart, FaStar } from "react-icons/fa";
import defaultImage from "../../assets/products/product1.jpg";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image || defaultImage} alt={product.name} />

        <span className="discount-badge">-20%</span>

        <button className="wishlist-btn">
          <FaHeart />
        </button>
      </div>

      <div className="product-details">
        <span className="brand">{product.category?.name || "Fashion"}</span>

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
          <span className="new-price">
    ₹{product.price}
</span>

          <span className="old-price">₹120</span>
        </div>

        <button className="cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
