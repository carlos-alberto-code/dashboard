import api from "./api.ts";
import type { LoginCredentials, LoginRespuesta } from "../types/login.ts";

export const login = async (credentials: LoginCredentials): Promise<LoginRespuesta> => {
    const response = await api.post<LoginRespuesta>("/auth/login", credentials);
    const loginData: LoginRespuesta = response.data;
    localStorage.setItem("access_token", loginData.access_token);
    return loginData;
    const response = await api.post<LoginRespuesta>("/auth/login", credentials);
    const loginRespuesta: LoginRespuesta = response.data;
    localStorage.setItem("access_token", loginRespuesta.access_token);
    return loginRespuesta;
};

export const logout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
};