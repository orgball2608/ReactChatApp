import React, { FC } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loader } from './commons/Loader';
export const AuthenticatedRoute: FC<React.PropsWithChildren> = ({ children }) => {
    const location = useLocation();

    const { user, loading } = useAuth();
    if (loading) {
        return <Loader />;
    }
    if (user) return <>{children}</>;
    return <Navigate to="/login" state={{ from: location }} replace />;
};
