export interface LoginCredentials {
    email: string;
    contrasena: string;
}

export interface UsuarioLeido {
    id: number;
    nombre_completo: string;
}

export interface LoginRespuesta {
    access_token: string;
    token_type: string;
    usuario: UsuarioLeido;
}