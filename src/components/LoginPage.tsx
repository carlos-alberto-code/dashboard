import {useState} from 'react';
import {useAuth} from './context/AuthContext';
import {useNavigate} from 'react-router-dom';
import {TextInput, PasswordInput, Button, Alert, Title} from '@mantine/core';

const LoginPage = () => {
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
                    <Title
                        order={2}
                        style={{
                            fontSize: '1.875rem',
                            fontWeight: 700,
                            marginBottom: '2rem',
                            color: '#1f2937',
                            textAlign: 'center',
                        }}
                    >
                        Inicio de sesión
                    </Title>

                    <form onSubmit={handleSubmit}>
                        {error && (
                            <Alert
                                color="red"
                                variant="light"
                                style={{
                                    backgroundColor: '#fee2e2',
                                    border: '1px solid #f87171',
                                    color: '#b91c1c',
                                    marginBottom: '1.5rem',
                                }}
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
                                placeholder={"A940983456@my.uvm.edu.mx"}
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
                            size="lg"
                            styles={{
                                root: {
                                    backgroundColor: '#b91c1c',
                                    color: '#ffffff',
                                    fontWeight: 700,
                                    paddingTop: '16px',
                                    paddingBottom: '16px',
                                    borderRadius: '8px',
                                    transition: 'background-color 300ms',
                                    '&:hover:not(:disabled)': {
                                        backgroundColor: '#991b1b',
                                    },
                                    '&:disabled': {
                                        backgroundColor: '#f87171',
                                        cursor: 'not-allowed',
                                        color: '#ffffff',
                                    },
                                },
                            }}
                        >
                            {isLoading ? 'Verificando...' : 'Iniciar sesión'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;