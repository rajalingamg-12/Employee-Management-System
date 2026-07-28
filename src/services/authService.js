import api from "./api";

export const loginUser = async (email, password) => {

    const params = new URLSearchParams();

    params.append("action", "login");
    params.append("email", email);
    params.append("password", password);

    const response = await api.post("", params);

    return response.data;

};