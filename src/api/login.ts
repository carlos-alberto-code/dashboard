import api from "./api.ts";
import type {LoginCredentials, LoginRespuesta} from "../types/login.ts";

export const login = async (credentials: LoginCredentials): Promise<LoginRespuesta> => {
    const {data}: LoginCredentials = await api.post<LoginRespuesta>("/auth/login", credentials);
    localStorage.setItem("access_token", data.access_token);
    return data;
};

export const logout = () => {
    localStorage.removeItem("access_token");
};