import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

import { getCart } from "../../services/cartService";
import { placeOrder } from "../../services/orderService";

const Checkout = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setError("");

      const data = await getCart();
      setCartItems(data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);

      setError("Unable to load your cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear previous error when the user edits the form
    setError("");
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return "Please enter your full name.";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      return "Please enter a valid 10-digit phone number.";
    }

    if (!formData.address.trim()) {
      return "Please enter your address.";
    }

    if (!formData.city.trim()) {
      return "Please enter your city.";
    }

    if (!formData.state.trim()) {
      return "Please enter your state.";
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      return "Please enter a valid 6-digit pincode.";
    }

    return null;
  };

  const itemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const shipping = 0;
  const total = subtotal + shipping;

  const formatCurrency = (amount) =>
    Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const handlePlaceOrder = async () => {
    setError("");
    setSuccess("");

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setPlacingOrder(true);

      const response = await placeOrder({
        shipping_name: formData.fullName.trim(),
        phone_number: formData.phone,
        shipping_address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode,
      });

      localStorage.setItem("order_id", response.order_id);

      setSuccess(
        "Order created successfully. Redirecting to payment..."
      );

      setTimeout(() => {
        navigate("/payment");
      }, 500);
    } catch (error) {
      console.error("Place order error:", error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError(
          "Unable to place your order. Please try again."
        );
      }
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="checkout-loading">
        <h2>Loading Checkout...</h2>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-left">
        <div className="checkout-card">
          <h2>Shipping Details</h2>

          {error && (
            <div className="checkout-error">
              {error}
            </div>
          )}

          {success && (
            <div className="checkout-success">
              {success}
            </div>
          )}

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="10-digit Phone Number"
            value={formData.phone}
            onChange={handleChange}
            maxLength="10"
          />

          <textarea
            name="address"
            rows="4"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
          />

          <input
            type="text"
            name="pincode"
            placeholder="6-digit Pincode"
            value={formData.pincode}
            onChange={handleChange}
            maxLength="6"
          />
        </div>
      </div>

      <div className="checkout-right">
        <div className="summary-card">
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
            className="place-order-btn"
            onClick={handlePlaceOrder}
            disabled={placingOrder}
          >
            {placingOrder
              ? "Placing Order..."
              : "Place Order"}
          </button>

          <button
            className="back-cart-btn"
            onClick={() => navigate("/cart")}
            disabled={placingOrder}
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;