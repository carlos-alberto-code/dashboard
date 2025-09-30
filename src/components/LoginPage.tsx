import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
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
      <div className="hidden lg:flex w-1/2 bg-red-800 text-white p-12 flex-col justify-start">
        <h1 className="text-3xl font-bold">UVM | Panel de Ruta lince</h1>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Inicio de sesión</h2>
          
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div className="mb-6">
              <label htmlFor="username" className="block text-gray-600 mb-2">
                Usuario
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            <div className="mb-8">
              <label htmlFor="password" className="block text-gray-600 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-700 text-white font-bold py-4 rounded-lg hover:bg-red-800 transition-colors duration-300 disabled:bg-red-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verificando...' : 'Iniciar sesión'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;