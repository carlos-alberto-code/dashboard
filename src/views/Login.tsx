import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from "../components/context/AuthContext.tsx";
import {TextInput, PasswordInput, Button, Alert, Title} from '@mantine/core';

const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await login(username, password);
            navigate('/');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-white">
            <div className="hidden lg:flex lg:w-2/3 relative overflow-hidden">
                <img
                    src="/imagen.png"
                    alt="UVM"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="w-full lg:w-1/3 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <Title order={2}>
                        Inicio de sesión
                    </Title>

                    <form onSubmit={handleSubmit}>
                        {error && (
                            <Alert
                                variant="light"
                                color="red"
                                className="mb-6"
                            >
                                {error}
                            </Alert>
                        )}

                        <div className="mb-6">
                            <TextInput
                                label="Correo Institucional"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                withAsterisk={false}
                                placeholder="A940983456@my.uvm.edu.mx"
                            />
                        </div>

                        <div className="mb-8">
                            <PasswordInput
                                label="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                withAsterisk={false}
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            fullWidth
                            color="red"
                            variant="filled"
                        >
                            {isLoading ? 'Verificando...' : 'Iniciar sesión'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;