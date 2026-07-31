import api from "./api";

export const getProducts = async (
    search = "",
    category = "",
    brand = "",
    maxPrice = 50000,
    availability = "",
    ordering = "-created_at"
) => {
    const response = await api.get("/products/", {
        params: {
            search,
            category,
            brand,
            max_price: maxPrice,
            availability,
            ordering,
        },
    });

    return response.data;
};

// Get Single Product
export const getProduct = async (id) => {
    const response = await api.get(`/products/${id}/`);
    return response.data;
};