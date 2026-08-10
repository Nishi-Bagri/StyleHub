import api from "./api";


export const createPaymentIntent = async (orderId) => {
  const response = await api.post(
    "/payments/create-intent/",
    {
      order_id: orderId,
    }
  );

  return response.data;
};


export const confirmPayment = async (paymentIntentId) => {
  const response = await api.post(
    "/payments/confirm/",
    {
      payment_intent_id: paymentIntentId,
    }
  );

  return response.data;
};