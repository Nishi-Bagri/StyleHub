import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/accounts/profile/";

const getToken = () => {
    return localStorage.getItem("access");
};

export const getProfile = async () => {

    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    return response.data;
};

export const updateProfile = async (profileData) => {

    const response = await axios.put(API_URL, profileData, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    return response.data;
};