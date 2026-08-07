import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/accounts/change-password/";

export const changePassword = async (passwordData) => {
  const token = localStorage.getItem("access");

  const response = await axios.put(API_URL, passwordData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};