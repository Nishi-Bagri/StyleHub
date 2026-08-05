import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  updateCartItem,
  removeCartItem,
} from "../../services/cartService";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCartItems(data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrease = async (item) => {
    try {
      await updateCartItem(item.id, item.quantity + 1);
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecrease = async (item) => {
    if (item.quantity === 1) return;

    try {
      await updateCartItem(item.id, item.quantity - 1);
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeCartItem(id);
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  const shipping = 0;

  const total = subtotal + shipping;

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // 👇 Add here
  const formatCurrency = (amount) => {
    return Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  if (loading) {
    return <h2>Loading Cart...</h2>;
  }

  return (

      <div className="cart-container">
        <h1>My Cart</h1>

        <p className="cart-count">{cartItems.length} item(s) in your cart</p>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>

            <h2>Your Cart is Empty</h2>

            <p>Looks like you haven't added any products yet.</p>

            <button
              className="continue-shopping-btn"
              onClick={() => navigate("/shop")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-page">
            {/* Left Section - Cart Items */}
            <div className="cart-left">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={`http://127.0.0.1:8000${item.image}`}
                    alt={item.product_name}
                    className="cart-image"
                  />

                  <div className="cart-info">
                    <h4 className="brand">{item.brand}</h4>

                    <h3>{item.product_name}</h3>

                    <p className="price">₹{formatCurrency(item.price)}</p>

                    <div className="quantity-box">
                      <button onClick={() => handleDecrease(item)}>-</button>

                      <span>{item.quantity}</span>

                      <button onClick={() => handleIncrease(item)}>+</button>
                    </div>

                    <p className="subtotal">
                      Subtotal : ₹
                      {formatCurrency(Number(item.price) * item.quantity)}
                    </p>

                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Section - Order Summary */}
            <div className="cart-right">
              <div className="order-summary">
                <h2>Order Summary</h2>

                <div className="summary-row">
                  <span>Items</span>
                  <span>{itemCount}</span>
                </div>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{formatCurrency(subtotal)}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>

                <hr />

                <div className="summary-total">
                  <span>Total</span>
                  <span>₹{formatCurrency(total)}</span>
                </div>

                <button
                  className="checkout-btn"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </button>

                <button
                  className="continue-btn"
                  onClick={() => navigate("/shop")}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default Cart;
