import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Wishlist.css";

import {
  getWishlist,
  removeFromWishlist,
} from "../../services/wishlistService";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const data = await getWishlist();
      setWishlist(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (wishlistId) => {
    try {
      await removeFromWishlist(wishlistId);

      setWishlist((prev) => prev.filter((item) => item.id !== wishlistId));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <h2>Loading Wishlist...</h2>;
  }

  return (
    <div className="wishlist-page">
      <h1>My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <h2>Your wishlist is empty ❤️</h2>

          <Link to="/shop">Continue Shopping</Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div className="wishlist-card" key={item.id}>
              <img
                src={`http://127.0.0.1:8000${item.product_image}`}
                alt={item.product_name}
              />

              <h3>{item.product_name}</h3>

              <p>₹{item.product_price}</p>

              <div className="wishlist-actions">
                <Link to={`/products/${item.product}`}>View Product</Link>

                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
