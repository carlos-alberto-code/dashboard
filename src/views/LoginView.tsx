import {useState} from 'react';
import {login} from '../api/login.ts';
import {useNavigate} from 'react-router-dom';
import type {LoginCredentials} from '../types/login.ts';
import {TextInput, PasswordInput, Button, Alert, Title} from '@mantine/core';

const LoginView = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
        email: '',
        contrasena: '',
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await login(loginCredentials);
            navigate('/');
        } catch (err: unknown) {
            let mensaje = 'Error inesperado';
            if (typeof err === 'object' && err !== null) {
                const anyErr = err as any;
                mensaje = anyErr.response?.data?.detail || anyErr.message || mensaje;
            }
            setError(mensaje);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-white">
            <div className="hidden lg:flex lg:w-2/3 relative overflow-hidden">
                <img src="/imagen.png" alt="UVM" className="w-full h-full object-cover"/>
            </div>
            <div className="w-full lg:w-1/3 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <Title order={2}>Inicio de sesión</Title>
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <Alert variant="light" color="red" className="mb-6">
                                {error}
                            </Alert>
                        )}
                        <div className="mb-6">
                            <TextInput
                                label="Correo Institucional"
                                value={loginCredentials.email}
                                onChange={(e) =>
                                    setLoginCredentials({
                                        ...loginCredentials,
                                        email: e.currentTarget.value,
                                    })
                                }
                                required
                                withAsterisk={false}
                                placeholder="A940983456@my.uvm.edu.mx"
                            />
                        </div>
                        <div className="mb-8">
                            <PasswordInput
                                label="Contraseña"
                                value={loginCredentials.contrasena}
                                onChange={(e) =>
                                    setLoginCredentials({
                                        ...loginCredentials,
                                        contrasena: e.currentTarget.value,
                                    })
                                }
                                placeholder="Tu contraseña"
                                required
                                withAsterisk={false}
                            />
                        </div>
                        <Button type="submit" disabled={isLoading} fullWidth color="red" variant="filled">
                            {isLoading ? 'Verificando...' : 'Iniciar sesión'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginView;
