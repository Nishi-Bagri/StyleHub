import api from "./api";

export const placeOrder = async (orderData) => {
  const response = await api.post("/orders/place/", orderData);

  return response.data;
};

export const getOrder = async (orderId) => {
  const response = await api.get(`/orders/${orderId}/`);

  return response.data;
};

export const getOrders = async () => {
  const response = await api.get("/orders/history/");

  return response.data;
};

export const cancelOrder = async (orderId) => {
  const response = await api.patch(
    `/orders/${orderId}/cancel/`,
    {}
  );

  return response.data;
};