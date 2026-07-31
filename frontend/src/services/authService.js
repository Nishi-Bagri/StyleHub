import api from "./api";

export const register = async (userData) => {
    const response = await api.post(
        "/accounts/register/",
        userData
    );

    return response.data;
};

export const login = async (username, password) => {
    const response = await api.post("/accounts/login/", {
        username,
        password,
    });

    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    return response.data;
};

export const logout = async () => {
    const refresh = localStorage.getItem("refresh");
    const access = localStorage.getItem("access");

    await api.post(
        "/accounts/logout/",
        {
            refresh,
        },
        {
            headers: {
                Authorization: `Bearer ${access}`,
            },
        }
    );

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
};

export const isAuthenticated = () => {
    return !!localStorage.getItem("access");
};