import api from "./api.ts";
import type {LoginCredentials, LoginRespuesta} from "../types/login.ts";

export const login = async (credentials: LoginCredentials): Promise<LoginRespuesta> => {
    const {loginData}: LoginCredentials = await api.post<LoginRespuesta>("/auth/login", credentials);
    localStorage.setItem("access_token", loginData.access_token);
    return loginData;
};

export const logout = () => {
    localStorage.removeItem("access_token");
};