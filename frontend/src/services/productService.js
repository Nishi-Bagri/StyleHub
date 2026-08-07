import api from "./api";

// Get Products
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

  return response.data.results || response.data;
};

// Get Single Product
export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}/`);
  return response.data;
};

// Authorization Header
const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("access")}`,
});

// Create Product
export const createProduct = async (productData) => {
  const formData = new FormData();

  Object.keys(productData).forEach((key) => {
    if (productData[key] !== null && productData[key] !== "") {
      formData.append(key, productData[key]);
    }
  });

  const response = await api.post("/products/", formData, {
    headers: {
      ...getAuthHeader(),
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Update Product
export const updateProduct = async (id, productData) => {
  const formData = new FormData();

  Object.keys(productData).forEach((key) => {
    if (productData[key] !== null && productData[key] !== "") {
      formData.append(key, productData[key]);
    }
  });

  const response = await api.put(`/products/${id}/`, formData, {
    headers: {
      ...getAuthHeader(),
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Delete Product
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}/`, {
    headers: getAuthHeader(),
  });

  return response.data;
};