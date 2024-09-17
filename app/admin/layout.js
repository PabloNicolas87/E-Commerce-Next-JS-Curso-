'use client';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/authContext';
import LoginPage from '../login/page';
import NotFound from '../not-found';

const AdminLayout = ({ children }) => {
    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Suponiendo que el estado user puede inicializarse con más detalle o ser nulo/undefined inicialmente
        if (user !== undefined) {
            setIsLoading(false);
        }
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>;  // Puedes cambiar esto por cualquier componente de carga que prefieras
    }

    if (!user.logged) {
        return <LoginPage />;
    } else if (user.role !== 'admin') {
        return <NotFound />;
    }

    return <div>{children}</div>;
};

export default AdminLayout;
