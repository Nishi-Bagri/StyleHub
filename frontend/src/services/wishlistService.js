import api from "./api";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  },
});

export const getWishlist = async () => {
  const response = await api.get(
    "/wishlist/",
    getAuthHeader()
  );

  return response.data;
};

export const addToWishlist = async (productId) => {
  const response = await api.post(
    `/wishlist/add/${productId}/`,
    {},
    getAuthHeader()
  );

  return response.data;
};

export const removeFromWishlist = async (wishlistId) => {
  const response = await api.delete(
    `/wishlist/remove/${wishlistId}/`,
    getAuthHeader()
  );

  return response.data;
};

export const checkWishlistStatus = async (productId) => {
  const response = await api.get(
    `/wishlist/status/${productId}/`,
    getAuthHeader()
  );

  return response.data;
};