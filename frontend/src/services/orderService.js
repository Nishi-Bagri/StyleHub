import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/orders";

export const placeOrder = async (orderData) => {

    const token = localStorage.getItem("access");

    const response = await axios.post(
        `${BASE_URL}/place/`,
        orderData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};