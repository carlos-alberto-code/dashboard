import { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import { login as loginService, logout as logoutService, getUserSession } from '../services/authService';

interface User {
  name: string;
  username: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (username: string, password?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = getUserSession();
    if (session) {
      setCurrentUser(session);
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password?: string) => {
    const user = await loginService(username, password);
    setCurrentUser(user);
  };

  const logout = () => {
    logoutService();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};