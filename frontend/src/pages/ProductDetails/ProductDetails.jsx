import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import { addToCart } from "../../services/cartService";
import { getProduct, getProducts } from "../../services/productService";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  // Success Message State
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const productData = await getProduct(id);
      setProduct(productData);

      const products = await getProducts();

      const related = products.results
        .filter(
          (item) =>
            item.category === productData.category &&
            item.id !== productData.id
        )
        .slice(0, 4);

      setRelatedProducts(related);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await addToCart(product.id, quantity);

      setSuccessMessage(response.message || "Product added to cart successfully!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 2500);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuyNow = async () => {
    try {
      await addToCart(product.id, quantity);
      navigate("/checkout");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="product-details-loading">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-loading">
        Product not found.
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <div className="product-details-card">

        <div className="product-image-section">
          <img
            src={product.image}
            alt={product.name}
            className="product-details-image"
          />
        </div>

        <div className="product-info-section">

          <p className="product-brand">{product.brand}</p>

          <h1>{product.name}</h1>

          <h2 className="product-price">
            ₹{product.price}
          </h2>

          <p className="product-category">
            Category : {product.category_name}
          </p>

          <p className="product-stock">
            {product.stock > 0
              ? `✅ In Stock (${product.stock} available)`
              : "❌ Out of Stock"}
          </p>

          <p className="short-description">
            {product.short_description}
          </p>

          {successMessage && (
            <div className="product-added-message">
              ✓ {successMessage}
            </div>
          )}

          <div className="quantity-section">
            <button onClick={decreaseQuantity}>-</button>

            <span>{quantity}</span>

            <button onClick={increaseQuantity}>+</button>
          </div>

          <button
            className="add-cart-btn"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>

          <button
            className="buy-now-btn"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>

          <Link
            to="/shop"
            className="continue-shopping"
          >
            ← Continue Shopping
          </Link>

        </div>
      </div>

      <div className="description-section">
        <h2>Description</h2>

        <p>{product.description}</p>
      </div>

      <div className="related-products">
        <h2>Related Products</h2>

        <div className="related-grid">
          {relatedProducts.map((item) => (
            <div
              className="related-card"
              key={item.id}
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <h4>{item.name}</h4>

              <p>₹{item.price}</p>

              <Link to={`/products/${item.id}`}>
                View
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProductDetails;