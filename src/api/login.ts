import api from "./api.ts";
import type {LoginCredentials, UsuarioAutenticado} from "../types/login.ts";

export const login = async (credentials: LoginCredentials): Promise<UsuarioAutenticado> => {
    const {data} = await api.post<UsuarioAutenticado>("/auth/login", credentials);
    localStorage.setItem("access_token", data.access_token);
    return data;
};

export const logout = () => {
    localStorage.removeItem("access_token");
};