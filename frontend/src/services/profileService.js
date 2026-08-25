import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/accounts/profile/`;

const getToken = () => {
  return localStorage.getItem("access");
};

export const getProfile = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await axios.put(API_URL, profileData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};
