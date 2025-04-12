import { createContext, useContext } from 'react';
import { AuthContextType } from '../Context/AuthProvider';
export const AuthContext = createContext<AuthContextType>(null!);

export const useAuth = () => useContext(AuthContext);
