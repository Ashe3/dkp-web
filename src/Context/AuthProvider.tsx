import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../hooks/useAuth';

type User = {
  id: number;
  username: string;
  role: string;
};

export type AuthContextType = {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoaded: boolean;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        setUser(decoded);
      } catch {
        localStorage.removeItem('token');
      }
    }
    setIsLoaded(true);
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode<User>(token);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user, isLoaded }}
    >
      {children}
    </AuthContext.Provider>
  );
};
