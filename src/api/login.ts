import api from "./api.ts";

export interface LoginCredentials {
    email: string;
    contrasena: string;
}

export interface UsuarioAutenticado {
    id: number;
    nombre_completo: string;
    access_token: string;
    token_type: string;
}

export const login = async (credentials: LoginCredentials): Promise<UsuarioAutenticado> => {
    const {data} = await api.post<UsuarioAutenticado>("/auth/login", credentials);
    localStorage.setItem("access_token", data.access_token);
    return data;
};

export const logout = () => {
    localStorage.removeItem("access_token");
};