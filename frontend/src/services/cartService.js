import api from "./api";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
});

export const addToCart = async (productId, quantity = 1) => {
    const response = await api.post(
        "/cart/add/",
        {
            product_id: productId,
            quantity,
        },
        getAuthHeader()
    );

    return response.data;
};

export const getCart = async () => {
    const response = await api.get(
        "/cart/",
        getAuthHeader()
    );

    return response.data;
};

export const updateCartItem = async (cartItemId, quantity) => {
    const response = await api.patch(
        `/cart/update/${cartItemId}/`,
        { quantity },
        getAuthHeader()
    );

    return response.data;
};

export const removeCartItem = async (cartItemId) => {
    const response = await api.delete(
        `/cart/remove/${cartItemId}/`,
        getAuthHeader()
    );

    return response.data;
};