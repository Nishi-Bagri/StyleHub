import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/payments";

export const createPaymentIntent = async (orderId) => {
    const token = localStorage.getItem("access");

    const response = await axios.post(
        `${BASE_URL}/create-intent/`,
        {
            order_id: orderId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};