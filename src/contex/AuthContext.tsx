import { createContext } from 'react';
import { User } from '../utils/types';

type AuthContextType = {
    user?: User;
    updateAuthUser: (data: User) => void;
};

export const AuthContext = createContext<AuthContextType>({
    updateAuthUser: () => {},
});