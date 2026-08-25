import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/accounts/change-password/`;

export const changePassword = async (passwordData) => {
  const token = localStorage.getItem("access");

  const response = await axios.put(API_URL, passwordData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};