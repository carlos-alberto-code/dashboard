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