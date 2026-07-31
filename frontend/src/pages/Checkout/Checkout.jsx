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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const itemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
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
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill in all shipping details.");
      return;
    }

    try {
      setPlacingOrder(true);

      const response = await placeOrder({
        shipping_name: formData.fullName,
        phone_number: formData.phone,
        shipping_address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      });

      localStorage.setItem("order_id", response.order_id);

      navigate("/payment");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message || "Unable to place order.");
      } else {
        alert("Something went wrong.");
      }
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Checkout...</h2>;
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-page">
        <div className="checkout-left">
          <div className="checkout-card">
            <h2>Shipping Details</h2>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
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
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
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
              {placingOrder ? "Placing Order..." : "Place Order"}
            </button>

            <button
              className="back-cart-btn"
              onClick={() => navigate("/cart")}
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;