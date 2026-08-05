import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/orders";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  },
});

export const placeOrder = async (orderData) => {
  const response = await axios.post(
    `${BASE_URL}/place/`,
    orderData,
    getAuthHeader()
  );

  return response.data;
};

export const getOrder = async (orderId) => {
    const response = await axios.get(
        `${BASE_URL}/${orderId}/`,
        getAuthHeader()
    );

    return response.data;
};

export const getOrders = async () => {
    const response = await axios.get(
        `${BASE_URL}/history/`,
        getAuthHeader()
    );

    return response.data;
};

export const cancelOrder = async (orderId) => {
  const response = await axios.patch(
    `${BASE_URL}/${orderId}/cancel/`,
    {},
    getAuthHeader()
  );

  return response.data;
};